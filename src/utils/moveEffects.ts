import { Move, PokemonType, Weather, Field, Ability } from '../types';
import type { Pokemon, MoveDynamicContext, MoveDynamicProperties } from '../types';

// MoveDynamicResult の代わりに MoveDynamicProperties を使用 (types.ts で定義されている場合)
// もし MoveDynamicResult という名前で使いたい場合は、このファイルの interface 定義をそれに合わせるか、
// types.ts の MoveDynamicProperties を MoveDynamicResult にリネームしてください。
// ここでは、ユーザーが提供したファイル構造に基づき MoveDynamicProperties を想定します。
// interface MoveDynamicResult { // この定義は types.ts に MoveDynamicProperties があるなら不要
//     type?: PokemonType;
//     power?: number;
//     isSpread?: boolean;
// }


const effectHandlers: Record<string, (baseMove: Move, context: MoveDynamicContext) => MoveDynamicProperties> = {
  hexBoost: (baseMove, context) => {
    if (context.uiOptionChecked && baseMove.uiOption && context.uiOptionChecked[baseMove.uiOption.key]) {
      return { power: (baseMove.power || 0) * 2 };
    }
    return {};
  },

  ivyCudgelEffect: (baseMove, context) => {
    if (context.attackerPokemon) {
      const attackerId = context.attackerPokemon.id.toString();
      switch (attackerId) {
        case '1017-w': // オーガポン いどのめん
          return { type: PokemonType.Water };
        case '1017-h': // オーガポン かまどのめん
          return { type: PokemonType.Fire };
        case '1017-c': // オーガポン いしずえのめん
          return { type: PokemonType.Rock };
        default: // オーガポン みどりのめん または 通常のポケモンが使用した場合 (ないはずだが)
          return { type: PokemonType.Grass };
      }
    }
    return {};
  },

  weatherBallEffect: (baseMove, context) => {
    const defaultPower = baseMove.power || 50;
    const defaultType = baseMove.type || PokemonType.Normal;

    switch (context.weather) {
      case 'sun':
      case 'harsh_sunlight':
        return { power: 100, type: PokemonType.Fire };
      case 'rain':
      case 'heavy_rain':
        return { power: 100, type: PokemonType.Water };
      case 'snow': // SVでは「ゆき」
        return { power: 100, type: PokemonType.Ice };
      case 'sandstorm':
        return { power: 100, type: PokemonType.Rock };
      default:
        return { power: defaultPower, type: defaultType };
    }
  },
  expandingForceEffect: (baseMove, context) => {
    const result: MoveDynamicProperties = {};
    if (context.field === Field.Psychic && context.attackerPokemon) {
        const attacker = context.attackerPokemon;
        // 地面にいるかどうかの判定（ひこうタイプ、ふゆう特性などを考慮）
        const isFlyingType = attacker.types.includes(PokemonType.Flying);
        let isLevitating = false;
        if (context.attackerAbility?.id === 'levitate') { // 特性IDは実際の定義に合わせる
            isLevitating = true;
        }
        // 他にも地面にいない状態（でんじふゆう、テレキネシスなど）があれば考慮

        const isGrounded = !isFlyingType && !isLevitating; // 他の要因も追加

        if (isGrounded) {
            result.isSpread = true; // ダブルバトルで範囲化
            // result.power = (baseMove.power || 0) * 1.5; //威力1.5倍の記述はコメントアウト。フィールド効果はcalculator.tsで別途処理される想定
        }
    }
    return result;
  },

  // ▼▼▼ ヘビーボンバー / ヒートスタンプ の威力計算ロジック ▼▼▼
  // dynamicEffectId: "heavySlamHeatCrashPower" など、対応するIDを設定した場合
  heavySlamHeatCrashPower: (baseMove, context) => {
    if (!context.attackerPokemon || !context.defenderPokemon) {
      return { power: 1 }; // データ不足時は最低威力1 (またはエラー処理)
    }

    const attackerWeight = context.attackerPokemon.weight;
    const defenderWeight = context.defenderPokemon.weight;

    if (typeof attackerWeight !== 'number' || typeof defenderWeight !== 'number' || attackerWeight <= 0 || defenderWeight <= 0) {
      return { power: 1 }; // 体重データが不正な場合は威力1
    }

    const ratio = defenderWeight / attackerWeight; // ヘビーボンバー/ヒートスタンプは相手が軽いほど高威力
    let calculatedPower = 0;

    // ヘビーボンバー/ヒートスタンプの威力テーブル
    // (相手の重さ / 自分の重さ) の比率
    if (ratio <= 1/5) {         // 相手の重さが自分の1/5 (20%) 以下
      calculatedPower = 120;
    } else if (ratio <= 1/4) { // 相手の重さが自分の1/4 (25%) 以下
      calculatedPower = 100;
    } else if (ratio <= 1/3) { // 相手の重さが自分の1/3 (33.3%) 以下
      calculatedPower = 80;
    } else if (ratio <= 1/2) { // 相手の重さが自分の1/2 (50%) 以下
      calculatedPower = 60;
    } else {                     // それより重い (相手の重さが自分の半分超)
      calculatedPower = 40;
    }
    // この威力計算は、相手が自分より重いほど威力が下がる技のものです。
    // ユーザーが提供した `weightBasedPower` はこのロジックでした。

    return { power: calculatedPower };
  },
  // ▲▲▲ ここまでがヘビーボンバー / ヒートスタンプのロジック ▲▲▲

  // ▼▼▼ くさむすび / けたぐり の威力計算ロジック ▼▼▼
  // dynamicEffectId: "defenderWeightBasedPowerLowKickGrassKnot" に対応
  defenderWeightBasedPowerLowKickGrassKnot: (baseMove, context) => {
    if (!context.defenderPokemon) {
      // 防御側ポケモン情報がない場合、威力は変更しないか、最低威力にする
      // calculator.ts 側で power:0 の技はダメージ0として扱われる想定なら {} でよい
      // ここでは念のため最低威力1を返す (またはエラー処理)
      return { power: 1 };
    }

    const defenderWeight = context.defenderPokemon.weight;

    if (typeof defenderWeight !== 'number' || defenderWeight < 0) {
      // 体重データが不正な場合
      return { power: 1 }; // 最低威力1
    }

    let calculatedPower = 0;
    // くさむすび / けたぐり の威力テーブル (相手の体重依存)
    if (defenderWeight < 10.0) {         // 0kg以上 9.9kg以下
      calculatedPower = 20;
    } else if (defenderWeight < 25.0) { // 10.0kg以上 24.9kg以下
      calculatedPower = 40;
    } else if (defenderWeight < 50.0) { // 25.0kg以上 49.9kg以下
      calculatedPower = 60;
    } else if (defenderWeight < 100.0) { // 50.0kg以上 99.9kg以下
      calculatedPower = 80;
    } else if (defenderWeight < 200.0) { // 100.0kg以上 199.9kg以下
      calculatedPower = 100;
    } else {                             // 200.0kg以上
      calculatedPower = 120;
    }

    return { power: calculatedPower };
  },
  // ▲▲▲ ここまでがくさむすび / けたぐりのロジック ▲▲▲
};

export function getEffectiveMoveProperties(originalMove: Move | null, context: MoveDynamicContext): Move | null {
  if (!originalMove) {
    return null;
  }

  // 元の技オブジェクトをコピーして変更を加える
  let effectiveMove = { ...originalMove };

  // dynamicEffectId があり、対応するハンドラが存在する場合
  if (originalMove.dynamicEffectId && effectHandlers[originalMove.dynamicEffectId]) {
    const dynamicProps = effectHandlers[originalMove.dynamicEffectId](originalMove, context);

    // ハンドラから返されたプロパティで技情報を更新
    if (dynamicProps.power !== undefined) {
      effectiveMove.power = dynamicProps.power;
    }
    if (dynamicProps.type !== undefined) {
      effectiveMove.type = dynamicProps.type;
    }
    if (dynamicProps.isSpread !== undefined) {
        effectiveMove.isSpread = dynamicProps.isSpread;
    }
    // 他に動的に変更したいプロパティがあればここに追加
  }

  // 最終的に効果が適用された技情報を返す
  return effectiveMove;
}