import { Ability, Item, DisasterState, MoveCategory, PokemonType, ProtosynthesisBoostTarget, QuarkDriveBoostTarget, Weather, Field } from '../types'; // PokemonType が不足していれば追加

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
    field: Field,
  　abilityUiFlags?: { [key: string]: boolean } // ★ 追加: 特性UIの状態
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
                // こんじょう: 状態異常で物理攻撃1.5倍。やけどの攻撃半減は calculator.ts で別途考慮。
                if (abilityUiFlags?.['guts_active'] && moveCategory === 'physical') {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144); // 1.5倍
                }
                break;
            case 'torrent': // HP1/3以下で水技の攻撃/特攻1.5倍 (指示通り)
                if (abilityUiFlags?.['hp_condition_active'] && moveType === PokemonType.Water) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'overgrow': // HP1/3以下で草技の攻撃/特攻1.5倍 (指示通り)
                if (abilityUiFlags?.['hp_condition_active'] && moveType === PokemonType.Grass) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'blaze': // HP1/3以下で炎技の攻撃/特攻1.5倍 (指示通り)
                if (abilityUiFlags?.['hp_condition_active'] && moveType === PokemonType.Fire) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'swarm': // HP1/3以下で虫技の攻撃/特攻1.5倍 (指示通り)
                if (abilityUiFlags?.['hp_condition_active'] && moveType === PokemonType.Bug) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'flashfire': // もらいび発動中で炎技の攻撃/特攻1.5倍 (指示通り)
                if (abilityUiFlags?.['flash_fire_boost'] && moveType === PokemonType.Fire) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'solarpower': // 日本晴れで特攻1.5倍
                if ((weather === 'sun' || weather === 'harsh_sunlight') && moveCategory === 'special') {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'rockypayload': // 岩技の攻撃/特攻1.5倍 (指示通り)
                if (moveType === PokemonType.Rock) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'steelworker': // 鋼技の攻撃/特攻1.5倍 (指示通り)
                if (moveType === PokemonType.Steel) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'gorillatactics': // 物理攻撃1.5倍
                if (moveCategory === 'physical') {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;
            case 'dragonsmaw': // ドラゴン技の攻撃/特攻1.5倍 (指示通り)
                if (moveType === PokemonType.Dragon) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 6144);
                }
                break;

            // 既存の特性も同様の形式で処理
            case 'transistor':
                if (moveType === PokemonType.Electric) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 5325); // 1.3倍
                }
                break;
            case 'hadronengine':
                if (moveCategory === 'special' && field === Field.Electric) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 5461); // 4/3倍
                }
                break;
            case 'orichalcumpulse':
                if (moveCategory === 'physical' && (weather === 'sun' || weather === 'harsh_sunlight')) {
                    finalAttackCalc = multiplyByQ12AndRound(finalAttackCalc, 5461); // 4/3倍
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