import { Pokemon, Move, Item, Ability, PokemonType, Field, Weather } from '../types'; // パスを確認してください

// 五捨五超入 (0.5を超える場合に切り上げ)
function multiplyByQ12AndRound(baseValue: number, q12Multiplier: number): number {
    if (q12Multiplier === 4096) { // 1倍なら何もしない
        return baseValue;
    }
    const intermediateA = baseValue * q12Multiplier;
    let resultB = Math.floor(intermediateA / 4096);
    if ((intermediateA % 4096) > 2048) { // 剰余が2048 (0.5 * 4096) より大きければ切り上げ
        resultB += 1;
    }
    return resultB;
}

// 四捨五入 (0.5は切り上げ)
function roundHalfUp(value: number): number {
    return Math.round(value);
}

interface EffectContext {
    attacker: Pokemon & { isGrounded: boolean };
    move: Move;
    field: Field;
    attackerItem: Item | null;
    attackerAbility: Ability | null;
    basePowerForTechnician: number; // テクニシャン判定用の、補正前の基本威力
    // isTeraAndMoveTypeMatch は EffectContext内では直接使わない想定 (60化ルールの判定は外で行うため)
    // もしスキン特性などで技タイプが変わる前に参照したいなどのケースがあれば別途必要
    isTeraAndMoveTypeMatch: boolean; // ダミーまたはスキン特性等で使う可能性を考慮して残す
    hasHelpingHand: boolean;
}

// powerCorrectionEffects は前回提示いただいたものをそのまま使用すると仮定します。
// 例として一部のみ記載。実際には前回ご提示の完全なリストを使用してください。
const powerCorrectionEffects: {
    id: string;
    name: string;
    q12Value: number;
    condition: (ctx: EffectContext) => boolean;
}[] = [
    {
        id: 'technician',
        name: 'テクニシャン',
        q12Value: 6144, // 1.5倍
        condition: (ctx) => ctx.attackerAbility?.id === 'technician' && ctx.basePowerForTechnician <= 60
    },
    {
        id: 'skin_ability',
        name: 'スキン系特性',
        q12Value: 4915,
        condition: (ctx) => (ctx.attackerAbility?.id === 'pixilate' || ctx.attackerAbility?.id === 'refrigerate' || ctx.attackerAbility?.id === 'aerilate' || ctx.attackerAbility?.id === 'normalize') && false // 'normalize' は実際には威力上昇しないので注意。デモ用にfalse
    },
    {
        id: 'reckless',
        name: 'すてみ',
        q12Value: 4915,
        condition: (ctx) => ctx.attackerAbility?.id === 'reckless' && (ctx.move.recoil || ctx.move.hasHighJumpKickRecoil) // hasHighJumpKickRecoilも考慮
    },
    {
        id: 'iron fist',
        name: 'てつのこぶし',
        q12Value: 4915,
        condition: (ctx) => ctx.attackerAbility?.id === 'iron_fist' && ctx.move.isPunch // 'iron fist' -> 'iron_fist' (idはスネークケースが多いと仮定)
    },
    {
        id: 'tough_claws',
        name: 'かたいツメ',
        q12Value: 5325,
        condition: (ctx) => ctx.attackerAbility?.id === 'tough_claws' && ctx.move.makesContact
    },
    {
        id: 'punk_rock',
        name: 'パンクロック',
        q12Value: 5325,
        condition: (ctx) => ctx.attackerAbility?.id === 'punk_rock' && ctx.move.isSoundBased
    },
    {
        id: 'strong_jaw',
        name: 'がんじょうあご',
        q12Value: 6144,
        condition: (ctx) => ctx.attackerAbility?.id === 'strong_jaw' && ctx.move.isBiting
    },
    {
        id: 'mega_launcher',
        name: 'メガランチャー',
        q12Value: 6144,
        condition: (ctx) => ctx.attackerAbility?.id === 'mega_launcher' && ctx.move.isPulseAura
    },
    {
        id: 'sheer force',
        name: 'ちからずく',
        q12Value: 5325,
        condition: (ctx) => ctx.attackerAbility?.id === 'sheer_force' && ctx.move.hasSecondaryEffect && !ctx.move.affectedBySheerForceNegative // 'sheer force' -> 'sheer_force'
    },
    {
        id: 'choice_band_specs',
        name: 'ハチマキ・メガネ類',
        q12Value: 6144,
        condition: (ctx) => (ctx.attackerItem?.id === 'choice_band' && ctx.move.category === 'physical') || (ctx.attackerItem?.id === 'choice_specs' && ctx.move.category === 'special')
    },
    {
        id: 'type_enhancing_item',
        name: 'プレートなど',
        q12Value: 4915,
        condition: (ctx) => ctx.attackerItem?.typeEnhance === ctx.move.type
    },
      {
        id: 'ogerpon_mask',
        name: '仮面', // 効果の内容を示す名前
        q12Value: 4915, // 1.2倍 (4096 * 1.2 ≒ 4915)
        condition: (ctx) => {
            const maskIds = ["cornerstonemask", "hearthflamemask", "wellspringmask"];
            return ctx.attackerItem?.id !== undefined && maskIds.includes(ctx.attackerItem.id);
        }
    },
    {
        id: 'normalgem',
        name: 'ノーマルジュエル',
        q12Value: 5325, // 1.3倍に修正 (SVでは1.3倍)
        condition: (ctx) => ctx.attackerItem?.id === 'normalgem' && ctx.move.type === 'normal'
    },
  {
    id: 'knock_off_item_boost', // Unique ID
    name: 'はたきおとす (持ち物あり時)',
    q12Value: 6144, // 1.5倍 (4096 * 1.5)
    condition: (ctx) =>
        ctx.move.id === 'knockoff' &&
        ctx.moveUiOptions?.['knockOffBoostEnabled'] === true
},
      {
        id: 'helping_hand_power',
        name: 'てだすけ',
        q12Value: 6144,
        condition: (ctx) => ctx.hasHelpingHand
    },
      {
        id: 'expanding_force_psychic_field_boost',
        name: 'ワイドフォース (サイコフィールド時威力UP)',
        q12Value: 6144, // 1.5倍
        condition: (ctx) => ctx.move.id === 'expandingforce' && ctx.field === Field.Psychic // Field Enumを使用
    },
    {
        id: 'electric_terrain',
        name: 'エレキフィールド(電気技)',
        q12Value: 5325, // 1.3倍に修正 (SVでは1.3倍)
        condition: (ctx) => {
            const isAttackerFlyingType = ctx.attacker.types.includes(PokemonType.Flying); // PokemonType.Flying を使用
            const isAttackerLevitating = ctx.attackerAbility?.id === 'levitate';
            const isAttackerGroundedForFieldEffect = !isAttackerFlyingType && !isAttackerLevitating;
            return ctx.field === 'electric' && ctx.move.type === PokemonType.Electric && isAttackerGroundedForFieldEffect; // PokemonType.Electric を使用
        }
    },
    {
        id: 'grassy_terrain_grass',
        name: 'グラスフィールド(草技)',
        q12Value: 5325, // 1.3倍に修正 (SVでは1.3倍)
        condition: (ctx) => {
            const isAttackerFlyingType = ctx.attacker.types.includes(PokemonType.Flying);
            const isAttackerLevitating = ctx.attackerAbility?.id === 'levitate';
            const isAttackerGroundedForFieldEffect = !isAttackerFlyingType && !isAttackerLevitating;
            return ctx.field === 'grassy' && ctx.move.type === PokemonType.Grass && isAttackerGroundedForFieldEffect; // PokemonType.Grass を使用
        }
    },
    {
        id: 'grassy_terrain_eq', // 地震、地ならし、マグニチュード
        name: 'グラスフィールド(地震等半減)',
        q12Value: 2048,
        condition: (ctx) => {
            // 接地判定は防御側だが、ここでは攻撃技の威力補正なので攻撃側を参照
            const isAttackerFlyingType = ctx.attacker.types.includes(PokemonType.Flying);
            const isAttackerLevitating = ctx.attackerAbility?.id === 'levitate';
            const isAttackerGroundedForFieldEffect = !isAttackerFlyingType && !isAttackerLevitating;
            const affectedMoves = ['じしん', 'マグニチュード', 'じならし']; // IDではなく名前で判定する場合
            // もし move.id が数値なら、それに対応するIDで判定 (例: move.id === 89 (じしん))
            return ctx.field === 'grassy' && (affectedMoves.includes(ctx.move.name)) && isAttackerGroundedForFieldEffect;
        }
    },
    {
        id: 'psychic_terrain',
        name: 'サイコフィールド(エスパー技)',
        q12Value: 5325, // 1.3倍に修正 (SVでは1.3倍)
        condition: (ctx) => {
            const isAttackerFlyingType = ctx.attacker.types.includes(PokemonType.Flying);
            const isAttackerLevitating = ctx.attackerAbility?.id === 'levitate';
            const isAttackerGroundedForFieldEffect = !isAttackerFlyingType && !isAttackerLevitating;
            return ctx.field === 'psychic' && ctx.move.type === PokemonType.Psychic && isAttackerGroundedForFieldEffect; // PokemonType.Psychic を使用
        }
    },
    {
        id: 'misty_terrain',
        name: 'ミストフィールド(ドラゴン技半減)',
        q12Value: 2048,
        condition: (ctx) => {
            // 接地判定は防御側だが、ここでは攻撃技の威力補正なので攻撃側を参照
            const isAttackerFlyingType = ctx.attacker.types.includes(PokemonType.Flying);
            const isAttackerLevitating = ctx.attackerAbility?.id === 'levitate';
            const isAttackerGroundedForFieldEffect = !isAttackerFlyingType && !isAttackerLevitating;
            return ctx.field === 'misty' && ctx.move.type === PokemonType.Dragon && isAttackerGroundedForFieldEffect; // PokemonType.Dragon を使用
        }
    },
    // 以下、calculator.tsのcalculateMValueQ12 にあったが威力補正と思われるものを移動・追加
    // 晴れ・雨による炎・水技の威力変動は calculator.ts 側で処理されているためここでは不要
    // アナライズ
    {
        id: 'analytic',
        name: 'アナライズ',
        q12Value: 5325, // 1.3倍
        condition: (ctx) => ctx.attackerAbility?.id === 'analytic' // 実際には行動順の最後に攻撃した場合という条件が必要
    },
    // 蓄電、避雷針、貯水、呼び水（特性発動時の無効化と能力上昇は別処理）
    // ソーラービーム（晴れ以外で威力半減）
    {
        id: 'solar_beam_no_sun',
        name: 'ソーラービーム(非晴天)',
        q12Value: 2048, // 0.5倍
        condition: (ctx) => (ctx.move.id === 'solar_beam' || ctx.move.id === 'solar_blade') && // IDで判定する場合
                            !(ctx.weather === 'sun' || ctx.weather === 'harsh_sunlight')
    },
    // フラワーギフト（晴れ時、味方の攻撃・特防1.5倍）は攻撃力/防御力補正なのでここでは扱わない
    // テラスタル時のタイプ一致技60未満→60化はメインロジックで処理
    // オーラブレイク、ダークオーラ、フェアリーオーラ
    {
        id: 'aura_break_dark_aura',
        name: 'オーラブレイク(ダークオーラ影響)',
        q12Value: 3072, // 0.75倍 (ダークオーラが1.33倍なので、その打ち消し)
        condition: (ctx) => ctx.attackerAbility?.id === 'aura_break' && ctx.move.type === PokemonType.Dark // 実際には相手のダークオーラを考慮
    },
    {
        id: 'aura_break_fairy_aura',
        name: 'オーラブレイク(フェアリーオーラ影響)',
        q12Value: 3072, // 0.75倍
        condition: (ctx) => ctx.attackerAbility?.id === 'aura_break' && ctx.move.type === PokemonType.Fairy // 実際には相手のフェアリーオーラを考慮
    },
    {
        id: 'dark_aura',
        name: 'ダークオーラ',
        q12Value: 5461, // 1.333...倍 (4/3倍) -> 5461/4096 ≒ 1.33325
        condition: (ctx) => ctx.attackerAbility?.id === 'dark_aura' && ctx.move.type === PokemonType.Dark
    },
    {
        id: 'fairy_aura',
        name: 'フェアリーオーラ',
        q12Value: 5461, // 1.333...倍 (4/3倍)
        condition: (ctx) => ctx.attackerAbility?.id === 'fairy_aura' && ctx.move.type === PokemonType.Fairy
    },
    // 親子愛 (2回目の攻撃は0.25倍) は別処理
    // バッテリー
    {
        id: 'battery',
        name: 'バッテリー',
        q12Value: 5325, // 1.3倍
        condition: (ctx) => ctx.attackerAbility?.id === 'battery' && ctx.move.category === 'special' // 実際には味方の特性
    },
    // パワースポット
    {
        id: 'power_spot',
        name: 'パワースポット',
        q12Value: 5325, // 1.3倍
        condition: (ctx) => ctx.attackerAbility?.id === 'power_spot' // 実際には味方の特性
    },
    // স্টিลワーカー、鋼の精神
    {
        id: 'steely_spirit',
        name: 'はがねのせいしん',
        q12Value: 6144, // 1.5倍
        condition: (ctx) => ctx.attackerAbility?.id === 'steely_spirit' && ctx.move.type === PokemonType.Steel // 実際には味方の特性
    },
];
export function calculateFinalMovePower(
    attacker: Pokemon & { isGrounded: boolean }, // isGrounded は呼び出し元(App.tsxやcalculator.ts)で適切に設定
    move: Move,
    field: Field,
    attackerItem: Item | null,
    attackerAbility: Ability | null,
    teraType: PokemonType | null,       // 通常のテラスタイプ (attackerState.teraType)
    hasHelpingHand: boolean,
    weather: Weather,  
    moveUiOptionStates: { [key: string]: boolean } | undefined, // ★ ADD THIS PARAMETER
    baseMovePowerOverride?: number,    // 変動後の技威力 (例: テラバースト(ステラ)の威力100など)
    defender?: Pokemon,                // もふもふ等の防御側依存の威力補正用
    isStellarTeraAttacker?: boolean    // ステラ状態か (attackerState.isStellar)
): number {
    // 1. 技の初期基本威力を決定
    let initialBasePower = baseMovePowerOverride !== undefined ? baseMovePowerOverride : move.power;
    if (initialBasePower === 0) return 1; // 威力0の技は基本的に計算対象外だが、万が一のため1を返す (または呼び出し元で処理)

    // テクニシャン判定用に、全ての補正をかける前の基本威力を保持
    const basePowerForTechnicianOriginal = initialBasePower;

    // 2. 「威力補正値」の計算 (グラスフィールド、テクニシャン、持ち物など)
    //    複数の補正がある場合、補正倍率同士を先に合成し、その過程で「四捨五入」
    let powerMultiplierQ12 = 4096; // 初期値は1倍 (4096/4096)

    const effectContext: EffectContext = {
        attacker,
        move,
        field,
        attackerItem,
        attackerAbility,
        basePowerForTechnician: basePowerForTechnicianOriginal, // テクニシャン判定には補正前の威力を使う
        isTeraAndMoveTypeMatch: (teraType !== null && teraType === move.type) || // 通常テラス一致
                                (isStellarTeraAttacker === true && attacker.types.includes(move.type)), // ステラで元タイプ一致 (スキン特性等での変化前の技タイプを見るべきか注意)
        hasHelpingHand,
        moveUiOptions: moveUiOptionStates // ★ SET IT HERE
    };

    for (const effect of powerCorrectionEffects) {
        if (effect.condition(effectContext)) {
            powerMultiplierQ12 = roundHalfUp((powerMultiplierQ12 * effect.q12Value) / 4096);
        }
    }

    // 例: もふもふ (炎技の威力2倍) - これは防御側の特性なので、通常は防御側の補正で処理されるべきだが、
    // もし攻撃技の威力自体を変動させるルールならここに記述
    if (defender?.abilities.some(ability => ability.id === 'fluffy') && move.type === PokemonType.Fire) { // defender.abilities が Ability[] 型と仮定
        powerMultiplierQ12 = roundHalfUp((powerMultiplierQ12 * 8192) / 4096); // 2倍
    }

    // 3. 初期基本威力に、合成した「威力補正値」を適用し、「五捨五超入」
    let powerAfterCorrections = multiplyByQ12AndRound(initialBasePower, powerMultiplierQ12);

    // 4. 「威力60化ルール」の適用
    //    テラスタル状態（通常またはステラ）で、そのテラスタイプ（ステラの場合は技のタイプと見なす）と
    //    技のタイプが一致する場合、補正適用後の威力が60未満なら60に引き上げる。
    let finalPower = powerAfterCorrections;

    let shouldApply60Rule = false;
    if (isStellarTeraAttacker === true) {
        // ステラ状態の場合: 技のタイプが攻撃側の元々のタイプに含まれていれば、
        // そのタイプにテラスタルしていると見なして60化の対象とする。
        // (スキン特性などで技タイプが変化する場合、変化「前」のタイプで判定するか「後」かで挙動が変わる。
        //  ここでは move.type (getEffectiveMoveProperties で変化後の可能性もある) を使う前提)
        if (attacker.types.includes(move.type)) { // move.type は getEffectiveMoveProperties を通った後のタイプ
            shouldApply60Rule = true;
        }
        // ステラテラバーストの場合は威力が100になるが、それは baseMovePowerOverride で渡ってくる想定。
        // なので、ここではテラバースト以外の技の60化を考える。
    } else if (teraType !== null && teraType === move.type) {
        // 通常のテラスタルで、テラスタイプと技のタイプが一致する場合
        shouldApply60Rule = true;
    }

    if (shouldApply60Rule && finalPower < 60 && move.multihit === undefined && !move.isTeraBlast) {
        // 連続技でなく、テラバーストでもない場合 (テラバーストは別途威力が決まるため)
        finalPower = 60;
    }
    // テラバースト(ステラ)は威力100、テラバースト(通常テラス)は威力80。
    // これらは baseMovePowerOverride で calculator.ts から渡される想定のため、
    // ここでの60化ロジックはテラバーストには適用しない。

    // 5. 特定の技に対する最終的な威力変動 (例: しおづけ)
    //    これらの処理が威力60化ルールの後か前かは技ごとに確認が必要。
    //    一般的には、特性・アイテム・フィールド・60化などの後にかかることが多い。
    if (move.id === 'salt_cure' && defender && (defender.types.includes(PokemonType.Water) || defender.types.includes(PokemonType.Steel))) {
        finalPower = Math.floor(finalPower * 2); // しおづけの威力2倍は単純に2倍して切り捨てが多い (要確認)
    }
    // 他の技特有の変動があればここに追加 (例: プレゼント、はきだす等)

    // 6. 最終威力が1未満の場合は1にする
    if (finalPower < 1) {
        finalPower = 1;
    }

    return Math.floor(finalPower); // ダメージ計算式本体で使われる最終威力は整数 (切り捨て)
}