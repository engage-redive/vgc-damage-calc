import { Move, PokemonType, Weather, Field, Ability } from '../types';
import type { Pokemon, MoveDynamicContext, MoveDynamicProperties } from '../types';

interface MoveDynamicResult {
    type?: PokemonType;
    power?: number;
    isSpread?: boolean;
}


const effectHandlers: Record<string, (baseMove: Move, context: MoveDynamicContext) => MoveDynamicResult> = {
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
        case '1017-w':
          return { type: PokemonType.Water };
        case '1017-h':
          return { type: PokemonType.Fire };
        case '1017-c':
          return { type: PokemonType.Rock };
        default:
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
      case 'snow':
        return { power: 100, type: PokemonType.Ice };
      case 'sandstorm':
        return { power: 100, type: PokemonType.Rock };
      default:
        return { power: defaultPower, type: defaultType };
    }
  },
  expandingForceEffect: (baseMove, context) => {
    const result: MoveDynamicResult = {};
    if (context.field === Field.Psychic && context.attackerPokemon) {
        const attacker = context.attackerPokemon;
        const isFlyingType = attacker.types.includes(PokemonType.Flying);

        let isLevitating = false;
        if (context.attackerAbility?.id === 'levitate') {
            isLevitating = true;
        }

        const isGrounded = !isFlyingType && !isLevitating;

        if (isGrounded) {
            result.isSpread = true;
        }
    }
    return result;
  },

  // ▼▼▼ ヘビーボンバー / ヒートスタンプ の威力計算ロジック ▼▼▼
  weightBasedPower: (baseMove, context) => {
    if (!context.attackerPokemon || !context.defenderPokemon) {
      return {}; // 攻撃側または防御側のポケモン情報がない場合は威力を変更しない
    }

    const attackerWeight = context.attackerPokemon.weight;
    const defenderWeight = context.defenderPokemon.weight;

    if (typeof attackerWeight !== 'number' || typeof defenderWeight !== 'number' || attackerWeight <= 0 || defenderWeight <= 0) {
      return {}; // 体重データが不正な場合は威力を変更しない (実質威力0のまま)
    }

    const ratio = defenderWeight / attackerWeight;
    let calculatedPower = 0;

    if (ratio <= 1/5) { // 相手の重さが自分の1/5以下
      calculatedPower = 120;
    } else if (ratio <= 1/4) { // 相手の重さが自分の1/4以下
      calculatedPower = 100;
    } else if (ratio <= 1/3) { // 相手の重さが自分の1/3以下
      calculatedPower = 80;
    } else if (ratio <= 1/2) { // 相手の重さが自分の1/2以下
      calculatedPower = 60;
    } else { // それより重い
      calculatedPower = 40;
    }

    return { power: calculatedPower };
  },
  // ▲▲▲ ここまでが追加したロジック ▲▲▲
};

export function getEffectiveMoveProperties(originalMove: Move | null, context: MoveDynamicContext): Move | null {
  if (!originalMove) {
    return null;
  }

  let effectiveMove = { ...originalMove };

  if (originalMove.dynamicEffectId && effectHandlers[originalMove.dynamicEffectId]) {
    const dynamicProps = effectHandlers[originalMove.dynamicEffectId](originalMove, context);

    if (dynamicProps.power !== undefined) {
      effectiveMove.power = dynamicProps.power;
    }
    if (dynamicProps.type !== undefined) {
      effectiveMove.type = dynamicProps.type;
    }
    if (dynamicProps.isSpread !== undefined) {
        effectiveMove.isSpread = dynamicProps.isSpread;
    }
  }
  return effectiveMove;
}