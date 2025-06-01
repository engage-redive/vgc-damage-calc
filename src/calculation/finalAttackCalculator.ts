import { Ability, Item, DisasterState, MoveCategory, PokemonType, ProtosynthesisBoostTarget, QuarkDriveBoostTarget, Weather, Field } from '../types';

function applyMultiplierAndRound(currentValue: number, multiplier: number): number {
    const result = (currentValue * multiplier) / 4096;
    return Math.round(result);
}

function multiplyByQ12AndRound(baseValue: number, q12Multiplier: number): number {
    if (q12Multiplier === 4096) {
        return baseValue;
    }
    const intermediateA = baseValue * q12Multiplier;
    let resultB = Math.floor(intermediateA / 4096);
    if ((intermediateA % 4096) > 2048) {
        resultB += 1;
    }
    return resultB;
}

export const calculateFinalAttack = (
    baseAttack: number, // ランク補正済み実数値
    attackerAbility: Ability | null,
    attackerItem: Item | null,
    defenderAbility: Ability | null,
    moveCategory: MoveCategory,
    moveType: PokemonType,
    disasters: DisasterState,
    // こだいかっせい関連引数
    isAttackerProtosynthesisActive: boolean,
    attackerProtosynthesisBoostedStat: ProtosynthesisBoostTarget | null,
    // クォークチャージ関連引数
    isAttackerQuarkDriveActive: boolean,
    attackerQuarkDriveBoostedStat: QuarkDriveBoostTarget | null,
    weather: Weather,
    field: Field
): number => {
    let attackMultiplier = 4096; // 初期値は4096 (1倍)

    // 1. わざわいの影響 (場の効果)
    if (disasters.vessel && moveCategory === 'special' && attackerAbility?.id !== 'vessel_of_ruin') { // わざわいのうつわ所有者は影響なし
        attackMultiplier = applyMultiplierAndRound(attackMultiplier, 3072); // 0.75倍
    }
    if (disasters.talisman && moveCategory === 'physical' && attackerAbility?.id !== 'tablet_of_ruin') { // わざわいのおふだ所有者は影響なし
        attackMultiplier = applyMultiplierAndRound(attackMultiplier, 3072); // 0.75倍
    }

    // 2. 攻撃側の特性による補正
    if (attackerAbility) {
        // こだいかっせい
        if (isAttackerProtosynthesisActive && attackerAbility.id === 'protosynthesis') {
            if (attackerProtosynthesisBoostedStat === 'attack' && moveCategory === 'physical') {
                attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5325); // 1.3倍 (4096 * 1.3 = 5324.8 -> 5325)
            } else if (attackerProtosynthesisBoostedStat === 'specialAttack' && moveCategory === 'special') {
                attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5325); // 1.3倍
            }
        }

        // クォークチャージ
        if (isAttackerQuarkDriveActive && attackerAbility.id === 'quark_drive') {
            if (attackerQuarkDriveBoostedStat === 'attack' && moveCategory === 'physical') {
                attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5325); // 1.3倍 (4096 * 1.3 = 5324.8 -> 5325)
            } else if (attackerQuarkDriveBoostedStat === 'specialAttack' && moveCategory === 'special') {
                attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5325); // 1.3倍
            }
        }

        // 他の攻撃上昇特性をここに追加
switch (attackerAbility.id) {
            case 'guts':
                break;
            case 'transistor':
                // トランジスタ: でんきタイプの攻撃技を使うとき、攻撃/特攻が1.3倍 (5325/4096)
                if (moveType === PokemonType.Electric) { // PokemonType.Electric を使用 (types.ts の enum と比較)
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5325);
                }
                break;

            case 'hadronengine':
                // ハドロンエンジン: 場がエレキフィールド状態の間、特攻が4/3倍 (5461/4096)
                if (moveCategory === 'special' && field === Field.Electric) { // Field.Electric を使用 (types.ts の enum と比較)
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5461);
                }
                break;

            case 'orichalcumpulse':
                // ひひいろのこどう: 場がにほんばれ状態の間、攻撃が4/3倍 (5461/4096)
                // types.ts の Weather 型定義に合わせて 'sun' と 'harsh_sunlight' をチェック
                if (moveCategory === 'physical' && (weather === 'sun' || weather === 'harsh_sunlight')) {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 5461);
                }
                break;
        }
    }

    // 3. 防御側の特性による補正
    if (defenderAbility) {
        switch (defenderAbility.id) {
            case 'thick fat':
                if (moveType === 'fire' || moveType === 'ice') {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 2048); // 0.5倍
                }
                break;
            case 'heatproof':
                if (moveType === 'fire') {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 2048); // 0.5倍
                }
                break;
            case 'water bubble':
                if (moveType === 'fire') {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 2048); // 0.5倍
                }
                break;
            case 'purifying salt':
                if (moveType === 'ghost') {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 2048); // 0.5倍
                }
                break;
        }
    }

    // 4. 攻撃側のアイテムによる補正
    if (attackerItem) {
        switch (attackerItem.name) {
            case 'こだわりハチマキ':
                if (moveCategory === 'physical') {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 6144);
                }
                break;
            case 'こだわりメガネ':
                if (moveCategory === 'special') {
                    attackMultiplier = applyMultiplierAndRound(attackMultiplier, 6144);
                }
                break;
        }
    }

    const finalAttack = multiplyByQ12AndRound(baseAttack, attackMultiplier);
    return finalAttack;
};