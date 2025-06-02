import {
    Pokemon, Move, DamageCalculation, StatCalculation, PokemonType, Item, Ability, StatType,
    Field, DisasterState, MoveCategory, Weather, TeraBurstEffectiveType,
    ProtosynthesisBoostTarget, QuarkDriveBoostTarget 
} from '../types';
import { typeEffectiveness } from '../data/typeEffectiveness';
import { calculateFinalMovePower } from '../calculation/finalPowerCalculator';
import { calculateFinalAttack } from '../calculation/finalAttackCalculator'; 
import { calculateFinalDefense } from '../calculation/finalDefenseCalculator'; 
import { calculateMValueQ12, multiplyByQ12AndRound } from '../calculation/mValueCalculator';

export const calculateStat = (
    base: number,
    iv: number,
    ev: number,
    level: number = 50,
    nature: number = 1.0,
    isHP: boolean = false,
    rank: number = 0,
    item: Item | null = null,
    isCriticalHit: boolean = false,
    isAttackStat: boolean = false, 
    isDefenseStat: boolean = false 
): number => {
    let stat: number;
    if (isHP) {
        stat = Math.max(1, Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10);
    } else {
        stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
        stat = Math.floor(stat * nature);

        let effectiveRank = rank;

        if (isCriticalHit) {
            if (isAttackStat && effectiveRank < 0) { 
                effectiveRank = 0;
            } else if (isDefenseStat && effectiveRank > 0) { 
                effectiveRank = 0;
            }
        }

        if (effectiveRank !== 0) {
            const rankMultiplier = effectiveRank > 0
                ? (2 + effectiveRank) / 2
                : 2 / (2 - effectiveRank);
            stat = Math.floor(stat * rankMultiplier);
        }
    }
    return Math.max(1, stat);
};

export const calculateEffectiveness = (moveType: PokemonType, defenderTypes: PokemonType[], isInverseBattle: boolean = false): number => {
    let effectiveness = 1;
    for (const defenderType of defenderTypes) {
        if (defenderType && typeEffectiveness[moveType] && typeEffectiveness[moveType].hasOwnProperty(defenderType)) {
            let currentEffectiveness = typeEffectiveness[moveType][defenderType];
            if (isInverseBattle) {
                if (currentEffectiveness === 0) currentEffectiveness = 2;
                else if (currentEffectiveness === 0.5) currentEffectiveness = 2;
                else if (currentEffectiveness === 0.25) currentEffectiveness = 4;
                else if (currentEffectiveness === 2) currentEffectiveness = 0.5;
                else if (currentEffectiveness === 4) currentEffectiveness = 0.25;
            }
            effectiveness *= currentEffectiveness;
        }
    }
    return effectiveness;
};

interface AttackerEffectiveStats {
    attack: StatCalculation;
    specialAttack: StatCalculation;
    defense: StatCalculation; 
}

export const calculateDamage = (
    attacker: Pokemon,
    defender: Pokemon,
    move: Move,
    attackerStats: AttackerEffectiveStats, 
    defenderStats: { 
        defense: StatCalculation;
        specialDefense: StatCalculation;
        hp: StatCalculation;
    },
    field: Field,
    attackerItem: Item | null = null,
    defenderItem: Item | null = null,
    attackerTeraType: PokemonType | null = null,
    isStellarTeraAttacker: boolean = false,
    level: number = 50,
    isDoubleBattle: boolean = false,
    isBurned: boolean = false,
    hasHelpingHand: boolean = false,
    hasReflect: boolean = false,
    hasLightScreen: boolean = false,
    attackerAbility: Ability | null = null,
    attackerBoostedStat: StatType = null, 
    defenderAbility: Ability | null = null,
    defenderBoostedStat: StatType = null, 
    weather: Weather = 'none',
    disasters: DisasterState = { sword: false, ball: false, vessel: false, talisman: false },
    hasFriendGuard: boolean = false,
    attackerTeraBlastConfig?: {
        actualType: TeraBurstEffectiveType | null;
        actualCategory: MoveCategory | null;
    },
    defenderIsTerastallized?: boolean,
    isAttackerProtosynthesisActive: boolean = false,
    attackerProtosynthesisBoostedStat: ProtosynthesisBoostTarget | null = null,
    isDefenderProtosynthesisActive: boolean = false,
    defenderProtosynthesisBoostedStat: ProtosynthesisBoostTarget | null = null,
    isAttackerQuarkDriveActive: boolean = false,
    attackerQuarkDriveBoostedStat: QuarkDriveBoostTarget | null = null,
    isDefenderQuarkDriveActive: boolean = false,
    defenderQuarkDriveBoostedStat: QuarkDriveBoostTarget | null = null,
    moveUiOptionStates?: { [key: string]: boolean } 
): DamageCalculation => {
    const zeroDamages = Array(16).fill(0);
    const errorReturn = {
        minDamage: 0, maxDamage: 0, critMinDamage: 0, critMaxDamage: 0,
        minPercentage: 0, maxPercentage: 0, critMinPercentage: 0, critMaxPercentage: 0,
        effectiveness: 1, teraBoost: 1, normalDamages: zeroDamages, criticalDamages: zeroDamages,
    };

    if (!move || !attacker || !defender || !attackerStats || !defenderStats || !attackerStats.defense) {
        return errorReturn;
    }

    let moveCategoryForCalc = move.category as MoveCategory;
    let moveTypeForCalc = move.type;
    let movePowerForCalc = move.power;

    if (moveCategoryForCalc === 'status' || movePowerForCalc === 0) {
        return errorReturn;
    }

    // ★ テラパゴス(ステラフォルム)のテラクラスター判定
    const isTerapagosStellarFormUsingStarstorm = attacker.id === "1024-s" && move.id === "terastarstorm";


    const isBodyPress = move.name === 'ボディプレス';
    if (isBodyPress) {
        moveCategoryForCalc = 'physical'; 
    }
    
    let effectiveMoveCategoryTypeForDamageCalc: MoveCategory = moveCategoryForCalc; 

    const isTeraBlastActive = move.isTeraBlast && (attackerTeraType !== null || isStellarTeraAttacker);
    if (isTeraBlastActive && attackerTeraBlastConfig) {
        if (attackerTeraBlastConfig.actualType) {
            moveTypeForCalc = attackerTeraBlastConfig.actualType === 'stellar' ? PokemonType.Normal : attackerTeraBlastConfig.actualType; 
        }
        if (attackerTeraBlastConfig.actualCategory) {
            moveCategoryForCalc = attackerTeraBlastConfig.actualCategory;
        } else if (!isBodyPress) { 
            moveCategoryForCalc = attackerStats.attack.final > attackerStats.specialAttack.final ? 'physical' : 'special';
        }
        if (isStellarTeraAttacker) movePowerForCalc = 100; 
    }
    // effectiveMoveCategoryTypeForDamageCalc は App.tsx 側でテラクラスターのカテゴリが適用された move.category を元に設定される
    effectiveMoveCategoryTypeForDamageCalc = moveCategoryForCalc;


    let baseAttackStat: number;
    let attackingStatInfoForCrit: StatCalculation; 
    let baseStatValueForCritSource: number; 

    if (isBodyPress) {
        baseAttackStat = attackerStats.defense.final;
        attackingStatInfoForCrit = attackerStats.defense;
        baseStatValueForCritSource = attacker.baseStats.defense;
    } else if (effectiveMoveCategoryTypeForDamageCalc === 'physical') {
        baseAttackStat = attackerStats.attack.final;
        attackingStatInfoForCrit = attackerStats.attack;
        baseStatValueForCritSource = attacker.baseStats.attack;
    } else { 
        baseAttackStat = attackerStats.specialAttack.final;
        attackingStatInfoForCrit = attackerStats.specialAttack;
        baseStatValueForCritSource = attacker.baseStats.specialAttack;
    }

    const finalAttackStat = calculateFinalAttack(
        baseAttackStat,
        attackerAbility,
        attackerItem,
        defenderAbility, 
        effectiveMoveCategoryTypeForDamageCalc,
        moveTypeForCalc as PokemonType, 
        disasters,
        isAttackerProtosynthesisActive,
        attackerProtosynthesisBoostedStat,
        isAttackerQuarkDriveActive, 
        attackerQuarkDriveBoostedStat, 
        weather, 
        field,   
        false 
    );

    let baseDefenseStat = effectiveMoveCategoryTypeForDamageCalc === 'physical'
        ? defenderStats.defense.final
        : defenderStats.specialDefense.final;

    const finalDefenseStat = calculateFinalDefense(
        baseDefenseStat,
        defender, 
        defenderItem,
        defenderAbility,
        effectiveMoveCategoryTypeForDamageCalc,
        weather,
        disasters,
        isDefenderProtosynthesisActive,
        defenderProtosynthesisBoostedStat,
        isDefenderQuarkDriveActive, 
        defenderQuarkDriveBoostedStat, 
        false 
    );

    const effectiveAttackRankForCrit = attackingStatInfoForCrit.rank < 0 ? 0 : attackingStatInfoForCrit.rank;
    let critAttackerBaseStat = calculateStat(
        baseStatValueForCritSource, 
        attackingStatInfoForCrit.iv,
        attackingStatInfoForCrit.ev,
        level,
        attackingStatInfoForCrit.nature,
        false, 
        effectiveAttackRankForCrit, 
        attackerItem,
        true, 
        true, 
        false 
    );

    const critFinalAttackStat = calculateFinalAttack(
        critAttackerBaseStat,
        attackerAbility,
        attackerItem,
        defenderAbility,
        effectiveMoveCategoryTypeForDamageCalc,
        moveTypeForCalc as PokemonType,
        disasters,
        isAttackerProtosynthesisActive,
        attackerProtosynthesisBoostedStat,
        isAttackerQuarkDriveActive, 
        attackerQuarkDriveBoostedStat, 
        weather, 
        field,   
        true 
    );

    const defStatForCrit = defenderStats[effectiveMoveCategoryTypeForDamageCalc === 'physical' ? 'defense' : 'specialDefense'];
    const effectiveDefenseRankForCrit = defStatForCrit.rank > 0 ? 0 : defStatForCrit.rank;
    let critDefenderBaseStat = calculateStat(
        defender.baseStats[effectiveMoveCategoryTypeForDamageCalc === 'physical' ? 'defense' : 'specialDefense'], 
        defStatForCrit.iv,
        defStatForCrit.ev,
        level,
        defStatForCrit.nature,
        false, 
        effectiveDefenseRankForCrit, 
        defenderItem,
        true, 
        false, 
        true 
    );

    const critFinalDefenseStat = calculateFinalDefense(
        critDefenderBaseStat,
        defender,
        defenderItem,
        defenderAbility,
        effectiveMoveCategoryTypeForDamageCalc,
        weather,
        disasters,
        isDefenderProtosynthesisActive,
        defenderProtosynthesisBoostedStat,
        isDefenderQuarkDriveActive, 
        defenderQuarkDriveBoostedStat, 
        true 
    );

    const attackerWithGrounded = { ...attacker, isGrounded: true }; 
    const finalMovePower = calculateFinalMovePower(
        attackerWithGrounded, 
        move,
        field,
        attackerItem,
        attackerAbility,
        attackerTeraType,
        hasHelpingHand,
        weather,
        moveUiOptionStates, 
        movePowerForCalc, 
        defender, 
        isStellarTeraAttacker
    );

    const effectiveDefenseStat = Math.max(1, finalDefenseStat);
    let damageInitial = Math.floor((((level * 2 / 5) + 2) * finalMovePower * finalAttackStat / effectiveDefenseStat) / 50) + 2;

    const effectiveCritDefenseStat = Math.max(1, critFinalDefenseStat);
    let critDamageInitial = Math.floor((((level * 2 / 5) + 2) * finalMovePower * critFinalAttackStat / effectiveCritDefenseStat) / 50) + 2;

    let baseDamageForCalc = damageInitial;
    let critBaseDamageForCalc = critDamageInitial;

    if (isDoubleBattle && move.isSpread) { // move.isSpread は moveEffects.ts でテラクラスターの場合にtrueに設定される
        baseDamageForCalc = multiplyByQ12AndRound(baseDamageForCalc, 3072); 
        critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, 3072);
    }

    let weatherDamageMultiplierQ12 = 4096; 
    if (weather === 'sun' || weather === 'harsh_sunlight') {
        if (moveTypeForCalc === PokemonType.Fire) weatherDamageMultiplierQ12 = 6144; 
        else if (moveTypeForCalc === PokemonType.Water) weatherDamageMultiplierQ12 = 2048; 
    } else if (weather === 'rain' || weather === 'heavy_rain') {
        if (moveTypeForCalc === PokemonType.Water) weatherDamageMultiplierQ12 = 6144; 
        else if (moveTypeForCalc === PokemonType.Fire) weatherDamageMultiplierQ12 = 2048; 
    }

    if (weatherDamageMultiplierQ12 !== 4096) {
        baseDamageForCalc = multiplyByQ12AndRound(baseDamageForCalc, weatherDamageMultiplierQ12);
        critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, weatherDamageMultiplierQ12);
    }

    critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, 6144); 

    const randomNumbers = [0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1.00];
    const calculatedDamagesHolder: { nonCrit: number[], crit: number[] } = { nonCrit: [], crit: [] };

    let stabOrStellarMultiplierQ12 = 4096; // 1倍
    const isOriginalTypeMatch = attacker.types.includes(move.type as PokemonType); // 元の技のタイプでSTAB判定

    if (isTerapagosStellarFormUsingStarstorm) {
        // テラパゴス(ステラ)のテラクラスターはタイプ一致ボーナスなし。
        // ステラ補正(1.2倍)は、技タイプがStellarになるため、
        // calculateFinalMovePower内で isStellarTeraAttacker が true の場合の
        // 共通のステラ補正ロジックで適用されることを期待する。
        // もし calculateFinalMovePower でステラ補正が一律にかからない場合、
        // ここで明示的に stabOrStellarMultiplierQ12 = 4915; (1.2倍) とする。
        // 現状の calculateFinalMovePower の実装では、isStellarTeraAttacker が true の場合、
        // move.power に1.2倍の補正がかかる想定（テラバースト以外のステラ技の場合）。
        // テラクラスターも同様の扱いとするならば、ここでは1倍のままでよい。
        // ただし、現状の画像では相性2.0と表示されているので、STAB部分での問題ではない可能性が高い。
        // 期待値から逆算すると、STAB 1.0倍、相性1.0倍、その他の補正で計算されているはず。
        // ステラ補正1.2倍がどこかで適用される必要がある。
        // → PokemonShowdownのダメージ計算式を見ると、ステラの場合、
        //   「タイプ一致の代わりに1.2倍の補正（テラスシェル状態なら2倍）」とある。
        //   テラフォームゼロの場合は、この補正が乗る。
        //   現状はテラスシェル/テラフォームゼロを実装しないので、純粋に1.2倍とする。
        stabOrStellarMultiplierQ12 = 4915; // 1.2倍 (ステラ補正)
    } else if (isStellarTeraAttacker) {
        if (move.isTeraBlast) {
             stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 8192 : 4915;
        } else {
             if (isOriginalTypeMatch) {
                 stabOrStellarMultiplierQ12 = 8192;
             } else {
                 stabOrStellarMultiplierQ12 = 4915;
             }
        }
    } else if (attackerTeraType && attackerTeraType === (moveTypeForCalc as PokemonType)) {
        if (attackerAbility?.id === 'adaptability') {
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 9216 : 8192;
        } else {
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 8192 : 6144;
        }
    } else if (isOriginalTypeMatch) {
        stabOrStellarMultiplierQ12 = attackerAbility?.id === 'adaptability' ? 8192 : 6144;
    }


    const validDefenderTypes = defender.types.filter(type => type != null) as PokemonType[];
    let effectivenessValue = 1;

    if (isTerapagosStellarFormUsingStarstorm) {
        // テラパゴス(ステラ)のテラクラスターのタイプ相性:
        // 相手がテラスタルしている場合は、そのテラスタイプに対して効果抜群(2倍)
        // 相手がテラスタルしていない場合は、どのタイプに対しても等倍(1倍)
        effectivenessValue = defenderIsTerastallized ? 2 : 1; // ★ ロジック修正
    } else {
        effectivenessValue = calculateEffectiveness(moveTypeForCalc as PokemonType, validDefenderTypes);
    }

    // ステラテラバーストの相性処理 (既存のままでテラクラスターには影響しないはず)
    if (move.isTeraBlast && isStellarTeraAttacker && defenderIsTerastallized) {
         if (attackerTeraBlastConfig?.actualType === 'stellar') {
            effectivenessValue = 2;
         }
    }
    const safeEffectivenessValue = isNaN(effectivenessValue) ? 1 : effectivenessValue;


    const mValueQ12ForNonCrit = calculateMValueQ12(
        move,
        isDoubleBattle,
        hasReflect,
        hasLightScreen,
        attackerAbility,
        defenderAbility,
        attackerItem,
        defenderItem,
        safeEffectivenessValue,
        false, 
        hasFriendGuard
    );

    const mValueQ12ForCrit = calculateMValueQ12(
        move,
        isDoubleBattle,
        false, 
        false, 
        attackerAbility,
        defenderAbility,
        attackerItem,
        defenderItem,
        safeEffectivenessValue,
        true, 
        hasFriendGuard
    );


    for (const randomNumber of randomNumbers) {
        let currentNonCritDamage = baseDamageForCalc;
        currentNonCritDamage = Math.floor(currentNonCritDamage * randomNumber); 

        if (stabOrStellarMultiplierQ12 !== 4096) {
            currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, stabOrStellarMultiplierQ12);
        }

        currentNonCritDamage = safeEffectivenessValue === 0 ? 0 : Math.floor(currentNonCritDamage * safeEffectivenessValue);

        if (isBurned && effectiveMoveCategoryTypeForDamageCalc === 'physical' && attackerAbility?.id !== 'guts') {
            currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, 2048); 
        }

        currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, mValueQ12ForNonCrit);
        calculatedDamagesHolder.nonCrit.push(Math.max(0, currentNonCritDamage)); 

        let currentCritDamage = critBaseDamageForCalc;
        currentCritDamage = Math.floor(currentCritDamage * randomNumber); 

        if (stabOrStellarMultiplierQ12 !== 4096) {
            currentCritDamage = multiplyByQ12AndRound(currentCritDamage, stabOrStellarMultiplierQ12);
        }

        currentCritDamage = safeEffectivenessValue === 0 ? 0 : Math.floor(currentCritDamage * safeEffectivenessValue);
        
        currentCritDamage = multiplyByQ12AndRound(currentCritDamage, mValueQ12ForCrit);
        calculatedDamagesHolder.crit.push(Math.max(0, currentCritDamage)); 
    }
    
    const adjustMinDamage = (damages: number[]): number[] => {
        return damages.map(d => {
            if (safeEffectivenessValue === 0 && !isTerapagosStellarFormUsingStarstorm && !(move.isTeraBlast && attackerTeraBlastConfig?.actualType === 'stellar' && defenderIsTerastallized)) {
                return 0;
            }
            return Math.max(1, d);
        });
    };
    
    let adjustedNonCritDamages = calculatedDamagesHolder.nonCrit;
    let adjustedCritDamages = calculatedDamagesHolder.crit;

    if (safeEffectivenessValue > 0 || isTerapagosStellarFormUsingStarstorm || (move.isTeraBlast && attackerTeraBlastConfig?.actualType === 'stellar' && defenderIsTerastallized)) {
        adjustedNonCritDamages = adjustMinDamage(calculatedDamagesHolder.nonCrit);
        adjustedCritDamages = adjustMinDamage(calculatedDamagesHolder.crit);
    } else { 
        adjustedNonCritDamages.fill(0);
        adjustedCritDamages.fill(0);
    }


    const minFinalDamage = Math.min(...adjustedNonCritDamages);
    const maxFinalDamage = Math.max(...adjustedNonCritDamages);
    const critMinFinalDamage = Math.min(...adjustedCritDamages);
    const critMaxFinalDamage = Math.max(...adjustedCritDamages);

    const finalDefenderHP = defenderStats.hp.final > 0 ? defenderStats.hp.final : 1; 
    const minPercentage = Math.max(0, (minFinalDamage / finalDefenderHP) * 100);
    const maxPercentage = Math.max(0, (maxFinalDamage / finalDefenderHP) * 100);
    const critMinPercentage = Math.max(0, (critMinFinalDamage / finalDefenderHP) * 100);
    const critMaxPercentage = Math.max(0, (critMaxFinalDamage / finalDefenderHP) * 100);

    return {
        minDamage: minFinalDamage,
        maxDamage: maxFinalDamage,
        critMinDamage: critMinFinalDamage,
        critMaxDamage: critMaxFinalDamage,
        minPercentage,
        maxPercentage,
        critMinPercentage,
        critMaxPercentage,
        effectiveness: safeEffectivenessValue,
        teraBoost: stabOrStellarMultiplierQ12 / 4096, // STAB or Stellar boost factor
        normalDamages: adjustedNonCritDamages,
        criticalDamages: adjustedCritDamages,
    };
};