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
    move: Move, // この move は App.tsx で getEffectiveMoveProperties を通った後の技情報 (威力やタイプが変動しうる)
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
    attackerBoostedStat: StatType = null, // この引数は現状の calculateFinalAttack/Defense では直接使われていない
    defenderAbility: Ability | null = null,
    defenderBoostedStat: StatType = null, // この引数は現状の calculateFinalAttack/Defense では直接使われていない
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

    // --- サイコショック/サイコブレイク判定フラグ ---
    const isPsyshockLike = move.dynamicEffectId === "calcDefForSpecial";
    // --- ここまで ---

    let moveCategoryForCalc = move.category as MoveCategory; // これは技の「全体的な分類」として壁やSTAB判定に使う
    let moveTypeForCalc = move.type;
    let movePowerForCalc = move.power;

    if (moveCategoryForCalc === 'status' || movePowerForCalc === 0) {
        return errorReturn;
    }

    const isTerapagosStellarFormUsingStarstorm = attacker.id === "1024-s" && move.id === "terastarstorm";
    const isBodyPress = move.name === 'ボディプレス'; // move.id === 'bodypress' の方がより堅牢

    if (isBodyPress) {
        moveCategoryForCalc = 'physical'; // ボディプレスは全体的に物理技として扱う
    }

    let effectiveMoveCategoryForDamageCalc: MoveCategory = moveCategoryForCalc; // ダメージ計算の攻防ステータス参照に使われるカテゴリ。テラバーストなどで変動

    const isTeraBlastActive = move.isTeraBlast && (attackerTeraType !== null || isStellarTeraAttacker);
    if (isTeraBlastActive && attackerTeraBlastConfig) {
        if (attackerTeraBlastConfig.actualType) {
            moveTypeForCalc = attackerTeraBlastConfig.actualType === 'stellar' ? PokemonType.Normal : attackerTeraBlastConfig.actualType;
        }
        if (attackerTeraBlastConfig.actualCategory) {
            moveCategoryForCalc = attackerTeraBlastConfig.actualCategory; // 全体的な分類も更新
            effectiveMoveCategoryForDamageCalc = attackerTeraBlastConfig.actualCategory;
        } else if (!isBodyPress) {
            const determinedCategory = attackerStats.attack.final > attackerStats.specialAttack.final ? 'physical' : 'special';
            moveCategoryForCalc = determinedCategory; // 全体的な分類も更新
            effectiveMoveCategoryForDamageCalc = determinedCategory;
        }
        if (isStellarTeraAttacker) movePowerForCalc = 100;
    }
    // テラクラスターのカテゴリは App.tsx 側で move.category に反映されている想定なので、
    // effectiveMoveCategoryForDamageCalc は move.category を元に設定される。
    // もし move.category が更新されていない場合は、ここで再設定が必要。
    // App.tsx の useEffect 内で moveForCalc = { ...moveForCalc, category: attackerState.starstormDeterminedCategory }; されているため、
    // ここで渡ってくる move.category は既に更新済みと仮定。
    effectiveMoveCategoryForDamageCalc = move.category as MoveCategory;


    // --- 攻撃側ステータスと、攻撃計算に使うカテゴリの決定 ---
    let baseAttackStat: number;
    let attackingStatInfoForCrit: StatCalculation;
    let baseStatValueForCritSource: number; // クリティカル時のcalculateStat用
    let categoryForAttackerStatCalc: MoveCategory = effectiveMoveCategoryForDamageCalc; // calculateFinalAttack に渡すカテゴリ

    if (isPsyshockLike) {
        baseAttackStat = attackerStats.specialAttack.final;
        attackingStatInfoForCrit = attackerStats.specialAttack;
        baseStatValueForCritSource = attacker.baseStats.specialAttack;
        categoryForAttackerStatCalc = 'special'; // 「わざわいのうつわ」等を考慮
    } else if (isBodyPress) {
        baseAttackStat = attackerStats.defense.final;
        attackingStatInfoForCrit = attackerStats.defense;
        baseStatValueForCritSource = attacker.baseStats.defense;
        categoryForAttackerStatCalc = 'physical'; // ボディプレスは物理攻撃として計算
    } else if (effectiveMoveCategoryForDamageCalc === 'physical') {
        baseAttackStat = attackerStats.attack.final;
        attackingStatInfoForCrit = attackerStats.attack;
        baseStatValueForCritSource = attacker.baseStats.attack;
        categoryForAttackerStatCalc = 'physical';
    } else { // special
        baseAttackStat = attackerStats.specialAttack.final;
        attackingStatInfoForCrit = attackerStats.specialAttack;
        baseStatValueForCritSource = attacker.baseStats.specialAttack;
        categoryForAttackerStatCalc = 'special';
    }

    const finalAttackStat = calculateFinalAttack(
        baseAttackStat,
        attackerAbility,
        attackerItem,
        defenderAbility,
        categoryForAttackerStatCalc, // 攻撃計算用のカテゴリ
        moveTypeForCalc as PokemonType,
        disasters,
        isAttackerProtosynthesisActive,
        attackerProtosynthesisBoostedStat,
        isAttackerQuarkDriveActive,
        attackerQuarkDriveBoostedStat,
        weather,
        field
        // false // isCriticalHit は calculateFinalAttack には不要
    );

    // --- 防御側ステータスと、防御計算に使うカテゴリの決定 ---
    let baseDefenseStat: number;
    let categoryForDefenderStatCalc: MoveCategory = effectiveMoveCategoryForDamageCalc; // calculateFinalDefense に渡すカテゴリ
    let defendingStatInfoForCrit: StatCalculation; // クリティカル時のcalculateStat用
    let baseDefStatValueForCritSource: number; // クリティカル時のcalculateStat用

    if (isPsyshockLike) {
        baseDefenseStat = defenderStats.defense.final;
        categoryForDefenderStatCalc = 'physical'; // 「わざわいのつるぎ」等を考慮
        defendingStatInfoForCrit = defenderStats.defense;
        baseDefStatValueForCritSource = defender.baseStats.defense;
    } else if (effectiveMoveCategoryForDamageCalc === 'physical') {
        baseDefenseStat = defenderStats.defense.final;
        categoryForDefenderStatCalc = 'physical';
        defendingStatInfoForCrit = defenderStats.defense;
        baseDefStatValueForCritSource = defender.baseStats.defense;
    } else { // special
        baseDefenseStat = defenderStats.specialDefense.final;
        categoryForDefenderStatCalc = 'special';
        defendingStatInfoForCrit = defenderStats.specialDefense;
        baseDefStatValueForCritSource = defender.baseStats.specialDefense;
    }

    const finalDefenseStat = calculateFinalDefense(
        baseDefenseStat,
        defender,
        defenderItem,
        defenderAbility,
        categoryForDefenderStatCalc, // 防御計算用のカテゴリ
        weather,
        disasters,
        isDefenderProtosynthesisActive,
        defenderProtosynthesisBoostedStat,
        isDefenderQuarkDriveActive,
        defenderQuarkDriveBoostedStat
        // false // isCriticalHit は calculateFinalDefense には不要
    );

    // --- クリティカルヒット時の攻撃側ステータス計算 ---
    const effectiveAttackRankForCrit = attackingStatInfoForCrit.rank < 0 ? 0 : attackingStatInfoForCrit.rank;
    let critAttackerBaseStat: number;

    if (isPsyshockLike) {
        critAttackerBaseStat = calculateStat(
            attacker.baseStats.specialAttack, // 参照元は特攻
            attackingStatInfoForCrit.iv,      // 特攻のIV
            attackingStatInfoForCrit.ev,       // 特攻のEV
            level,
            attackingStatInfoForCrit.nature, // 特攻の性格補正
            false,
            effectiveAttackRankForCrit,
            attackerItem,
            true, // isCriticalHit
            true, // isAttackStat (特攻ランクのマイナスを0にするため)
            false // isDefenseStat
        );
    } else if (isBodyPress) {
        critAttackerBaseStat = calculateStat(
            attacker.baseStats.defense, // ボディプレスは防御を参照
            attackingStatInfoForCrit.iv,  // 防御のIV (attackerStats.defense)
            attackingStatInfoForCrit.ev,   // 防御のEV
            level,
            attackingStatInfoForCrit.nature, // 防御の性格補正
            false,
            effectiveAttackRankForCrit,
            attackerItem,
            true, // isCriticalHit
            true, // isAttackStat (防御ランクのマイナスを0にするため)
            false // isDefenseStat
        );
    } else if (categoryForAttackerStatCalc === 'physical') { // effectiveMoveCategoryTypeForDamageCalc ではなく categoryForAttackerStatCalc を参照
        critAttackerBaseStat = calculateStat(
            attacker.baseStats.attack,
            attackingStatInfoForCrit.iv,
            attackingStatInfoForCrit.ev,
            level,
            attackingStatInfoForCrit.nature,
            false,
            effectiveAttackRankForCrit,
            attackerItem,
            true, // isCriticalHit
            true, // isAttackStat
            false // isDefenseStat
        );
    } else { // special
        critAttackerBaseStat = calculateStat(
            attacker.baseStats.specialAttack,
            attackingStatInfoForCrit.iv,
            attackingStatInfoForCrit.ev,
            level,
            attackingStatInfoForCrit.nature,
            false,
            effectiveAttackRankForCrit,
            attackerItem,
            true, // isCriticalHit
            true, // isAttackStat
            false // isDefenseStat
        );
    }

    const critFinalAttackStat = calculateFinalAttack(
        critAttackerBaseStat,
        attackerAbility,
        attackerItem,
        defenderAbility,
        categoryForAttackerStatCalc, // 通常時と同じ攻撃計算用カテゴリ
        moveTypeForCalc as PokemonType,
        disasters,
        isAttackerProtosynthesisActive,
        attackerProtosynthesisBoostedStat,
        isAttackerQuarkDriveActive,
        attackerQuarkDriveBoostedStat,
        weather,
        field
        // true // isCriticalHit は calculateFinalAttack には不要
    );

    // --- クリティカルヒット時の防御側ステータス計算 ---
    // const defStatForCrit = defenderStats[categoryForDefenderStatCalc === 'physical' ? 'defense' : 'specialDefense']; // 元のコードだが、isPsyshockLike で変わる
    const effectiveDefenseRankForCrit = defendingStatInfoForCrit.rank > 0 ? 0 : defendingStatInfoForCrit.rank;
    let critDefenderBaseStat: number;

    if (isPsyshockLike) {
        critDefenderBaseStat = calculateStat(
            defender.baseStats.defense, // 参照元は防御
            defendingStatInfoForCrit.iv,  // 防御のIV (defenderStats.defense)
            defendingStatInfoForCrit.ev,   // 防御のEV
            level,
            defendingStatInfoForCrit.nature, // 防御の性格補正
            false,
            effectiveDefenseRankForCrit,
            defenderItem,
            true,  // isCriticalHit
            false, // isAttackStat
            true   // isDefenseStat (防御ランクのプラスを0にするため)
        );
    } else if (categoryForDefenderStatCalc === 'physical') {
         critDefenderBaseStat = calculateStat(
            defender.baseStats.defense,
            defendingStatInfoForCrit.iv,
            defendingStatInfoForCrit.ev,
            level,
            defendingStatInfoForCrit.nature,
            false,
            effectiveDefenseRankForCrit,
            defenderItem,
            true, // isCriticalHit
            false, // isAttackStat
            true   // isDefenseStat
        );
    } else { // special
        critDefenderBaseStat = calculateStat(
            defender.baseStats.specialDefense,
            defendingStatInfoForCrit.iv,
            defendingStatInfoForCrit.ev,
            level,
            defendingStatInfoForCrit.nature,
            false,
            effectiveDefenseRankForCrit,
            defenderItem,
            true, // isCriticalHit
            false, // isAttackStat
            true   // isDefenseStat
        );
    }

    const critFinalDefenseStat = calculateFinalDefense(
        critDefenderBaseStat,
        defender,
        defenderItem,
        defenderAbility,
        categoryForDefenderStatCalc, // 通常時と同じ防御計算用カテゴリ
        weather,
        disasters,
        isDefenderProtosynthesisActive,
        defenderProtosynthesisBoostedStat,
        isDefenderQuarkDriveActive,
        defenderQuarkDriveBoostedStat
        // true // isCriticalHit は calculateFinalDefense には不要
    );

    const attackerWithGrounded = { ...attacker, isGrounded: true }; // TODO: isGroundedの正確な判定
    const finalMovePower = calculateFinalMovePower(
        attackerWithGrounded,
        move, // ここで渡す move は getEffectiveMoveProperties を通った後のもの
        field,
        attackerItem,
        attackerAbility,
        attackerTeraType,
        hasHelpingHand,
        weather,
        moveUiOptionStates,
        movePowerForCalc, // 技の基本威力 (テラバースト(ステラ)の100など、変動後の可能性あり)
        defender,
        isStellarTeraAttacker
    );

    // --- ダメージ計算の基本部分 (レベル補正、威力、攻防適用) ---
    // ダメージ=攻撃側のレベル×2÷5+2→切り捨て
    let damageInitial = Math.floor((level * 2 / 5) + 2);
    // 　×最終威力×最終攻撃÷最終防御→切り捨て
    damageInitial = Math.floor(damageInitial * finalMovePower * finalAttackStat / Math.max(1, finalDefenseStat));
    // 　÷50+2→切り捨て
    damageInitial = Math.floor(damageInitial / 50) + 2;

    let critDamageInitial = Math.floor((level * 2 / 5) + 2);
    critDamageInitial = Math.floor(critDamageInitial * finalMovePower * critFinalAttackStat / Math.max(1, critFinalDefenseStat));
    critDamageInitial = Math.floor(critDamageInitial / 50) + 2;

    let baseDamageForCalc = damageInitial;
    let critBaseDamageForCalc = critDamageInitial;

    // ×複数対象3072÷4096→五捨五超入
    if (isDoubleBattle && move.isSpread) { // move.isSpread は moveEffects.ts でテラクラスターの場合にtrueに設定される
        baseDamageForCalc = multiplyByQ12AndRound(baseDamageForCalc, 3072);
        critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, 3072);
    }

    // ×天気弱化 2048÷4096→五捨五超入
    // ×天気強化 6144÷4096→五捨五超入
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

    // ×急所 6144÷4096→五捨五超入
    critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, 6144);

    const randomNumbers = [0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1.00];
    const calculatedDamagesHolder: { nonCrit: number[], crit: number[] } = { nonCrit: [], crit: [] };

    // ×タイプ一致... またはステラ... →五捨五超入
    let stabOrStellarMultiplierQ12 = 4096; // 1倍
    const isOriginalTypeMatch = attacker.types.includes(move.type as PokemonType); // 元の技のタイプでSTAB判定。move.typeは変動後の可能性あり。より厳密には変動前の技データを見るべきだが、現状の引数ではmoveのみ。

    if (isTerapagosStellarFormUsingStarstorm) {
        stabOrStellarMultiplierQ12 = 4915; // 1.2倍 (ステラ補正)
    } else if (isStellarTeraAttacker) {
        if (move.isTeraBlast) { // ステラテラバースト
             stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 8192 : 4915; // 元タイプ一致なら2倍、不一致なら1.2倍
        } else { // ステラ状態でテラバースト以外の技
             if (isOriginalTypeMatch) { // 元タイプ一致技
                 stabOrStellarMultiplierQ12 = 8192; // 2倍 (元のタイプ一致ボーナス + ステラ補正) となるか、純粋にステラ補正のみか。ポケモンの仕様ではSTAB扱いで2倍。
             } else { // 元タイプ不一致技
                 stabOrStellarMultiplierQ12 = 4915; // 1.2倍 (ステラ補正)
             }
        }
    } else if (attackerTeraType && attackerTeraType === (moveTypeForCalc as PokemonType)) { // 通常テラスでタイプ一致
        if (attackerAbility?.id === 'adaptability') {
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 9216 : 8192; // 元々タイプ一致なら2.25倍、テラスで初一致なら2倍
        } else {
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 8192 : 6144; // 元々タイプ一致なら2倍、テラスで初一致なら1.5倍
        }
    } else if (isOriginalTypeMatch) { // テラスなしでタイプ一致
        stabOrStellarMultiplierQ12 = attackerAbility?.id === 'adaptability' ? 8192 : 6144; // 適応力なら2倍、通常1.5倍
    }

    // ×タイプ相性→切り捨て
    const validDefenderTypes = defender.types.filter(type => type != null) as PokemonType[];
    let effectivenessValue = 1;

    if (isTerapagosStellarFormUsingStarstorm) {
        effectivenessValue = defenderIsTerastallized ? 2 : 1;
    } else {
        effectivenessValue = calculateEffectiveness(moveTypeForCalc as PokemonType, validDefenderTypes);
    }
  if (defenderAbility?.id === 'terashell' && effectivenessValue >= 1) {
    // 元の相性が等倍(1)以上の場合、相性を0.5倍(いまひとつ)にする
    effectivenessValue = 0.5;
}

    if (move.isTeraBlast && isStellarTeraAttacker && defenderIsTerastallized) {
         if (attackerTeraBlastConfig?.actualType === 'stellar') { // ステラテラバーストで相手がテラスタル時
            effectivenessValue = 2; // 効果抜群
         }
    }
    const safeEffectivenessValue = isNaN(effectivenessValue) ? 1 : effectivenessValue;

    // ×ダメージの補正値÷4096→五捨五超入 (M値)
    const mValueQ12ForNonCrit = calculateMValueQ12(
        move, // ここで渡す move は category が 'special' (サイコショックの場合)
        isDoubleBattle,
        hasReflect,
        hasLightScreen,
        attackerAbility,
        defenderAbility,
        attackerItem,
        defenderItem,
        safeEffectivenessValue,
        false, // isCriticalHit
        hasFriendGuard
    );

    const mValueQ12ForCrit = calculateMValueQ12(
        move, // ここで渡す move は category が 'special' (サイコショックの場合)
        isDoubleBattle,
        false, // hasReflect (クリティカル時は壁無効)
        false, // hasLightScreen (クリティカル時は壁無効)
        attackerAbility,
        defenderAbility,
        attackerItem,
        defenderItem,
        safeEffectivenessValue,
        true, // isCriticalHit
        hasFriendGuard
    );

    for (const randomNumber of randomNumbers) {
        let currentNonCritDamage = baseDamageForCalc;
        // ×乱数(0.85, 0.86, …… 0.99, 1.00 の何れか)→切り捨て
        currentNonCritDamage = Math.floor(currentNonCritDamage * randomNumber);

        if (stabOrStellarMultiplierQ12 !== 4096) {
            currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, stabOrStellarMultiplierQ12);
        }

        currentNonCritDamage = safeEffectivenessValue === 0 ? 0 : Math.floor(currentNonCritDamage * safeEffectivenessValue);

        // ×やけど 2048÷4096→五捨五超入
        // effectiveMoveCategoryForDamageCalc はテラバースト等で物理になる可能性があるので、それを使う
        // サイコショック系は move.category が 'special' のままなので、この条件には合致しない
        if (isBurned && effectiveMoveCategoryForDamageCalc === 'physical' && attackerAbility?.id !== 'guts') {
            currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, 2048);
        }

        currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, mValueQ12ForNonCrit);
        calculatedDamagesHolder.nonCrit.push(Math.max(0, currentNonCritDamage));

        // クリティカルダメージ計算
        let currentCritDamage = critBaseDamageForCalc;
        currentCritDamage = Math.floor(currentCritDamage * randomNumber); // 乱数はクリティカルダメージにもかかる

        if (stabOrStellarMultiplierQ12 !== 4096) {
            currentCritDamage = multiplyByQ12AndRound(currentCritDamage, stabOrStellarMultiplierQ12);
        }

        currentCritDamage = safeEffectivenessValue === 0 ? 0 : Math.floor(currentCritDamage * safeEffectivenessValue);

        // やけどはクリティカルダメージには影響しないのが一般的
        // if (isBurned && effectiveMoveCategoryForDamageCalc === 'physical' && attackerAbility?.id !== 'guts') {
        //     currentCritDamage = multiplyByQ12AndRound(currentCritDamage, 2048);
        // }

        currentCritDamage = multiplyByQ12AndRound(currentCritDamage, mValueQ12ForCrit);
        calculatedDamagesHolder.crit.push(Math.max(0, currentCritDamage));
    }

    const adjustMinDamage = (damages: number[]): number[] => {
        return damages.map(d => {
            // 相性0倍でもテラパゴス(ステラ)のテラクラスターやステラテラバースト(相手テラス時)は1は保証されるか要確認
            // 通常の相性0倍ならダメージ0。それ以外なら最低1。
            if (safeEffectivenessValue === 0 && !isTerapagosStellarFormUsingStarstorm && !(move.isTeraBlast && attackerTeraBlastConfig?.actualType === 'stellar' && defenderIsTerastallized)) {
                return 0;
            }
            return Math.max(1, d);
        });
    };

    let adjustedNonCritDamages = calculatedDamagesHolder.nonCrit;
    let adjustedCritDamages = calculatedDamagesHolder.crit;

    // 相性0以外、または特定の技なら最低ダメージ1を保証
    if (safeEffectivenessValue > 0 || isTerapagosStellarFormUsingStarstorm || (move.isTeraBlast && attackerTeraBlastConfig?.actualType === 'stellar' && defenderIsTerastallized)) {
        adjustedNonCritDamages = adjustMinDamage(calculatedDamagesHolder.nonCrit);
        adjustedCritDamages = adjustMinDamage(calculatedDamagesHolder.crit);
    } else { // 相性0で、上記の例外ケースでもない場合はダメージ0
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
        teraBoost: stabOrStellarMultiplierQ12 / 4096,
        normalDamages: adjustedNonCritDamages,
        criticalDamages: adjustedCritDamages,
    };
};