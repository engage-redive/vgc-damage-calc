import {
    Pokemon, Move, DamageCalculation, StatCalculation, PokemonType, Item, Ability, StatType,
    Field, DisasterState, MoveCategory, Weather, TeraBurstEffectiveType,
    ProtosynthesisBoostTarget, QuarkDriveBoostTarget // QuarkDriveBoostTarget をインポート
} from '../types';
import { typeEffectiveness } from '../data/typeEffectiveness';
import { calculateFinalMovePower } from '../calculation/finalPowerCalculator';
import { calculateFinalAttack } from '../calculation/finalAttackCalculator'; // この関数の定義は変更対象外とします
import { calculateFinalDefense } from '../calculation/finalDefenseCalculator'; // この関数の定義は変更対象外とします
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
    isAttackStat: boolean = false, // この引数は calculateFinalAttack/Defense 内でより適切に扱われるべきかもしれません
    isDefenseStat: boolean = false // この引数は calculateFinalAttack/Defense 内でより適切に扱われるべきかもしれません
): number => {
    let stat: number;
    if (isHP) {
        stat = Math.max(1, Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10);
    } else {
        stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
        stat = Math.floor(stat * nature);

        let effectiveRank = rank;

        // クリティカルヒット時は攻撃側のマイナスランク、防御側のプラスランクを無視
        if (isCriticalHit) {
            if (isAttackStat && effectiveRank < 0) { // isAttackStat は攻撃側のステータス計算時にtrue
                effectiveRank = 0;
            } else if (isDefenseStat && effectiveRank > 0) { // isDefenseStat は防御側のステータス計算時にtrue
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
    defense: StatCalculation; // ボディプレス用
    // speed: StatCalculation; // Protosynthesis/QuarkDrive 用 (calculateDamageの引数で渡すので不要かも)
}

export const calculateDamage = (
    attacker: Pokemon,
    defender: Pokemon,
    move: Move,
    attackerStats: AttackerEffectiveStats, // AttackerState から必要なものだけ抽出した方が良いかもしれない
    defenderStats: { // DefenderState から必要なものだけ抽出した方が良いかもしれない
        defense: StatCalculation;
        specialDefense: StatCalculation;
        hp: StatCalculation;
        // speed: StatCalculation; // Protosynthesis/QuarkDrive 用
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
    attackerBoostedStat: StatType = null, // これはランク補正などで上昇したステータスを指す？Protosynthesis/QuarkDriveとは別のはず
    defenderAbility: Ability | null = null,
    defenderBoostedStat: StatType = null, // 同上
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
    // === Quark Drive Params START ===
    isAttackerQuarkDriveActive: boolean = false,
    attackerQuarkDriveBoostedStat: QuarkDriveBoostTarget | null = null,
    isDefenderQuarkDriveActive: boolean = false,
    defenderQuarkDriveBoostedStat: QuarkDriveBoostTarget | null = null,
    moveUiOptionStates?: { [key: string]: boolean } // ★ ADD THIS PARAMETER
    // === Quark Drive Params END ===
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

    const isBodyPress = move.name === 'ボディプレス';
    if (isBodyPress) {
        moveCategoryForCalc = 'physical'; // ボディプレスは物理技として計算
    }

    // テラバーストのタイプとカテゴリ決定ロジック (既存のまま)
    let effectiveMoveCategoryTypeForDamageCalc: MoveCategory = moveCategoryForCalc; // ダメージ計算で最終的に使う技カテゴリ

    const isTeraBlastActive = move.isTeraBlast && (attackerTeraType !== null || isStellarTeraAttacker);
    if (isTeraBlastActive && attackerTeraBlastConfig) {
        if (attackerTeraBlastConfig.actualType) {
            // ステラの場合はテラスタル前のタイプで計算（STAB判定などで）。ただし技タイプ自体はノーマル扱いになることがあるので注意
            moveTypeForCalc = attackerTeraBlastConfig.actualType === 'stellar' ? 'normal' : attackerTeraBlastConfig.actualType; // 技タイプはノーマル等になる
        }
        if (attackerTeraBlastConfig.actualCategory) {
            moveCategoryForCalc = attackerTeraBlastConfig.actualCategory;
        } else if (!isBodyPress) { // ボディプレスでない場合、攻撃と特攻の高い方
            moveCategoryForCalc = attackerStats.attack.final > attackerStats.specialAttack.final ? 'physical' : 'special';
        }
        if (isStellarTeraAttacker) movePowerForCalc = 100; // ステラテラバーストの威力は100
    }
    effectiveMoveCategoryTypeForDamageCalc = moveCategoryForCalc;


    let baseAttackStat: number;
    let attackingStatInfoForCrit: StatCalculation; // クリティカル時のランク無視のために使用
    let baseStatValueForCritSource: number; // クリティカル時のランク無視のために使用 (素の種族値)

    if (isBodyPress) {
        baseAttackStat = attackerStats.defense.final;
        attackingStatInfoForCrit = attackerStats.defense;
        baseStatValueForCritSource = attacker.baseStats.defense;
    } else if (effectiveMoveCategoryTypeForDamageCalc === 'physical') {
        baseAttackStat = attackerStats.attack.final;
        attackingStatInfoForCrit = attackerStats.attack;
        baseStatValueForCritSource = attacker.baseStats.attack;
    } else { // special
        baseAttackStat = attackerStats.specialAttack.final;
        attackingStatInfoForCrit = attackerStats.specialAttack;
        baseStatValueForCritSource = attacker.baseStats.specialAttack;
    }

    // calculateFinalAttack に quarkDrive 関連の引数を追加
    const finalAttackStat = calculateFinalAttack(
        baseAttackStat,
        attackerAbility,
        attackerItem,
        defenderAbility, // 相手の特性（いかく等）
        effectiveMoveCategoryTypeForDamageCalc,
        moveTypeForCalc as PokemonType, // 技のタイプ
        disasters,
        isAttackerProtosynthesisActive,
        attackerProtosynthesisBoostedStat,
        isAttackerQuarkDriveActive, // New
        attackerQuarkDriveBoostedStat, // New
        weather, // 天候情報を渡す
        field,   // フィールド情報を渡す
        false // isCriticalHit
    );

    let baseDefenseStat = effectiveMoveCategoryTypeForDamageCalc === 'physical'
        ? defenderStats.defense.final
        : defenderStats.specialDefense.final;

    // calculateFinalDefense に quarkDrive 関連の引数を追加
    const finalDefenseStat = calculateFinalDefense(
        baseDefenseStat,
        defender, // defenderのPokemonオブジェクト (わたげ等で参照するため)
        defenderItem,
        defenderAbility,
        effectiveMoveCategoryTypeForDamageCalc,
        weather,
        disasters,
        isDefenderProtosynthesisActive,
        defenderProtosynthesisBoostedStat,
        isDefenderQuarkDriveActive, // New
        defenderQuarkDriveBoostedStat, // New
        false // isCriticalHit
    );

    // クリティカルヒット時の攻撃側ステータス計算
    // 攻撃側のマイナスランクを無視 (ランク0として計算)
    const effectiveAttackRankForCrit = attackingStatInfoForCrit.rank < 0 ? 0 : attackingStatInfoForCrit.rank;
    let critAttackerBaseStat = calculateStat(
        baseStatValueForCritSource, // 対応する種族値
        attackingStatInfoForCrit.iv,
        attackingStatInfoForCrit.ev,
        level,
        attackingStatInfoForCrit.nature,
        false, // isHP
        effectiveAttackRankForCrit, // マイナスランクは0扱い
        attackerItem,
        true, // isCriticalHit = true (calculateStat内部で参照)
        true, // isAttackStat = true (calculateStat内部で参照)
        false // isDefenseStat = false
    );

    // クリティカルヒット時の最終攻撃力 (calculateFinalAttack に quarkDrive 関連の引数を追加)
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
        isAttackerQuarkDriveActive, // New
        attackerQuarkDriveBoostedStat, // New
        weather, // 天候情報を渡す
        field,   // フィールド情報を渡す
        true // isCriticalHit
    );

    // クリティカルヒット時の防御側ステータス計算
    // 防御側のプラスランクを無視 (ランク0として計算)
    const defStatForCrit = defenderStats[effectiveMoveCategoryTypeForDamageCalc === 'physical' ? 'defense' : 'specialDefense'];
    const effectiveDefenseRankForCrit = defStatForCrit.rank > 0 ? 0 : defStatForCrit.rank;
    let critDefenderBaseStat = calculateStat(
        defender.baseStats[effectiveMoveCategoryTypeForDamageCalc === 'physical' ? 'defense' : 'specialDefense'], // 対応する種族値
        defStatForCrit.iv,
        defStatForCrit.ev,
        level,
        defStatForCrit.nature,
        false, // isHP
        effectiveDefenseRankForCrit, // プラスランクは0扱い
        defenderItem,
        true, // isCriticalHit = true
        false, // isAttackStat = false
        true // isDefenseStat = true (calculateStat内部で参照)
    );

    // クリティカルヒット時の最終防御力 (calculateFinalDefense に quarkDrive 関連の引数を追加)
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
        isDefenderQuarkDriveActive, // New
        defenderQuarkDriveBoostedStat, // New
        true // isCriticalHit
    );

    // 技威力最終補正 (既存のまま)
    const attackerWithGrounded = { ...attacker, isGrounded: true }; // フィールド効果のために仮に接地しているとする (エレキフィールド等)
    const finalMovePower = calculateFinalMovePower(
        attackerWithGrounded, // 攻撃側ポケモン (isGroundedプロパティを持つ想定)
        move,
        field,
        attackerItem,
        attackerAbility,
        attackerTeraType,
        hasHelpingHand,
        weather,
      moveUiOptionStates, 
        movePowerForCalc, // テラバースト等で変動後の技威力
        defender, // 防御側ポケモン (もふもふで参照)
        isStellarTeraAttacker
    );


    // ダメージ計算の基本部分 (既存のまま)
    const effectiveDefenseStat = Math.max(1, finalDefenseStat);
    let damageInitial = Math.floor((((level * 2 / 5) + 2) * finalMovePower * finalAttackStat / effectiveDefenseStat) / 50) + 2;

    const effectiveCritDefenseStat = Math.max(1, critFinalDefenseStat);
    let critDamageInitial = Math.floor((((level * 2 / 5) + 2) * finalMovePower * critFinalAttackStat / effectiveCritDefenseStat) / 50) + 2;


    // ダメージ計算の続き (範囲補正、天候補正、急所補正など) (既存のまま)
    let baseDamageForCalc = damageInitial;
    let critBaseDamageForCalc = critDamageInitial;

    // ダブルバトル時の範囲補正 (0.75倍)
    if (isDoubleBattle && move.isSpread) {
        baseDamageForCalc = multiplyByQ12AndRound(baseDamageForCalc, 3072); // 3072/4096 = 0.75
        critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, 3072);
    }

    // 天候補正
    let weatherDamageMultiplierQ12 = 4096; // 1倍
    if (weather === 'sun' || weather === 'harsh_sunlight') {
        if (moveTypeForCalc === PokemonType.Fire) weatherDamageMultiplierQ12 = 6144; // 1.5倍
        else if (moveTypeForCalc === PokemonType.Water) weatherDamageMultiplierQ12 = 2048; // 0.5倍
    } else if (weather === 'rain' || weather === 'heavy_rain') {
        if (moveTypeForCalc === PokemonType.Water) weatherDamageMultiplierQ12 = 6144; // 1.5倍
        else if (moveTypeForCalc === PokemonType.Fire) weatherDamageMultiplierQ12 = 2048; // 0.5倍
    }

    if (weatherDamageMultiplierQ12 !== 4096) {
        baseDamageForCalc = multiplyByQ12AndRound(baseDamageForCalc, weatherDamageMultiplierQ12);
        critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, weatherDamageMultiplierQ12);
    }

    // 急所補正 (1.5倍)
    // 注意: critBaseDamageForCalc は既に急所時の攻撃力・防御力で計算されているため、ここでは急所ランクによる追加補正のみ考慮する
    // 一般的な急所は1.5倍なので、それを適用
    critBaseDamageForCalc = multiplyByQ12AndRound(critBaseDamageForCalc, 6144); // 6144/4096 = 1.5

    // ランダム補正 (0.85 ~ 1.00)
    const randomNumbers = [0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99, 1.00];
    const calculatedDamagesHolder: { nonCrit: number[], crit: number[] } = { nonCrit: [], crit: [] };

    // タイプ一致(STAB) / ステラ補正
    let stabOrStellarMultiplierQ12 = 4096; // 1倍
    const isOriginalTypeMatch = attacker.types.includes(moveTypeForCalc as PokemonType);
    const isOriginalTeraBlastTypeMatch = attacker.types.includes(move.type as PokemonType); // テラバーストの元のタイプ

    if (isStellarTeraAttacker) {
        if (move.isTeraBlast) { // ステラ状態でテラバーストを使用
            // 元のタイプと一致していれば2倍、不一致なら1.2倍 (ステラ専用の仕様)
            stabOrStellarMultiplierQ12 = isOriginalTeraBlastTypeMatch ? 8192 : 4915; // 2倍 or 1.2倍
        } else { // ステラ状態でテラバースト以外の技を使用
            // 元のタイプと一致していれば1.5倍(適応力なら2倍)、不一致なら1.2倍
            // ※ ステラの仕様では、タイプ一致技は1回だけ2倍、それ以外は1.2倍。ここでは簡略化し、一般的なSTABとステラボーナスを別々に考慮する方が良い場合もある。
            //   ここでは、元のタイプ一致なら1.5倍(適応力2倍)のSTAB、それに加えてステラの1.2倍が乗るという解釈ではなく、
            //   ステラ状態の技の扱いとして、元タイプ一致技は1.5倍(適応力2倍)、元タイプ不一致技は1.2倍として扱う。
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch
                ? 8192 // ★変更
                : 4915;
        }
    } else if (attackerTeraType && attackerTeraType === (moveTypeForCalc as PokemonType)) { // テラスタル中かつ技タイプとテラスタイプが一致
        if (attackerAbility?.id === 'adaptability') {
            // 適応力あり: 元タイプ一致なら2.25倍、テラスで初一致なら2倍
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 9216 : 8192;
        } else { // 「てきおうりょく」なし
            // 変更前 (前回提案): stabOrStellarMultiplierQ12 = 6144;
            // 変更後 (今回正しい挙動): 元タイプとテラスタイプが一致する場合は2倍、テラスで初めて一致になった場合は1.5倍
            stabOrStellarMultiplierQ12 = isOriginalTypeMatch ? 8192 : 6144;
        }
    } else if (isOriginalTypeMatch) { // 非テラスタル時、またはテラスタイプと技タイプが不一致だが、元タイプとは一致
        stabOrStellarMultiplierQ12 = attackerAbility?.id === 'adaptability' ? 8192 : 6144; // 2倍 or 1.5倍
    }


    // タイプ相性
    const validDefenderTypes = defender.types.filter(type => type != null) as PokemonType[];
    let effectivenessValue = calculateEffectiveness(moveTypeForCalc as PokemonType, validDefenderTypes);

    // ステラ状態の相手にステラテラバーストを撃つ場合、タイプ相性は常に2倍
    if (move.isTeraBlast && isStellarTeraAttacker && defenderIsTerastallized) {
        effectivenessValue = 2;
    }
    const safeEffectivenessValue = isNaN(effectivenessValue) ? 1 : effectivenessValue;


    // その他補正 (M値) (既存のまま)
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
        false, // isCriticalHit
        hasFriendGuard
    );

    const mValueQ12ForCrit = calculateMValueQ12(
        move,
        isDoubleBattle,
        false, // クリティカル時は壁無効
        false, // クリティカル時は壁無効
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
        currentNonCritDamage = Math.floor(currentNonCritDamage * randomNumber); // ランダム補正

        // タイプ一致/ステラ補正
        if (stabOrStellarMultiplierQ12 !== 4096) {
            currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, stabOrStellarMultiplierQ12);
        }

        // タイプ相性補正
        currentNonCritDamage = safeEffectivenessValue === 0 ? 0 : Math.floor(currentNonCritDamage * safeEffectivenessValue);

        // やけど補正 (物理技で、特性「こんじょう」でない場合)
        if (isBurned && effectiveMoveCategoryTypeForDamageCalc === 'physical' && attackerAbility?.id !== 'guts') {
            currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, 2048); // 0.5倍
        }

        // その他補正 (M値)
        currentNonCritDamage = multiplyByQ12AndRound(currentNonCritDamage, mValueQ12ForNonCrit);
        calculatedDamagesHolder.nonCrit.push(Math.max(0, currentNonCritDamage)); // 最低ダメージは0

        // --- クリティカルダメージ計算 ---
        let currentCritDamage = critBaseDamageForCalc;
        currentCritDamage = Math.floor(currentCritDamage * randomNumber); // ランダム補正

        // タイプ一致/ステラ補正
        if (stabOrStellarMultiplierQ12 !== 4096) {
            currentCritDamage = multiplyByQ12AndRound(currentCritDamage, stabOrStellarMultiplierQ12);
        }

        // タイプ相性補正
        currentCritDamage = safeEffectivenessValue === 0 ? 0 : Math.floor(currentCritDamage * safeEffectivenessValue);

        // やけど補正はクリティカル時には無視されることが多いが、ここでは一貫性のため非急所と同じロジックを適用（必要なら調整）
        // 一般的には急所はやけどの影響を受けないが、ダメージ計算機によっては適用する場合もある。一旦コメントアウト。
        // if (isBurned && effectiveMoveCategoryTypeForDamageCalc === 'physical' && attackerAbility?.id !== 'guts') {
        //     currentCritDamage = multiplyByQ12AndRound(currentCritDamage, 2048);
        // }

        // その他補正 (M値) - クリティカル用
        currentCritDamage = multiplyByQ12AndRound(currentCritDamage, mValueQ12ForCrit);
        calculatedDamagesHolder.crit.push(Math.max(0, currentCritDamage)); // 最低ダメージは0
    }

    // 最低保証ダメージ1 (効果抜群以上、またはステラテラバーストで相手テラスタル時)
    const adjustMinDamage = (damages: number[]): number[] => {
        return damages.map(d => {
            // 効果がない場合は0ダメージのまま
            if (safeEffectivenessValue === 0 && !(move.isTeraBlast && isStellarTeraAttacker && defenderIsTerastallized)) {
                return 0;
            }
            // それ以外で計算結果が0だった場合、1ダメージ保障
            return Math.max(1, d);
        });
    };
    
    let adjustedNonCritDamages = calculatedDamagesHolder.nonCrit;
    let adjustedCritDamages = calculatedDamagesHolder.crit;

    if (safeEffectivenessValue > 0 || (move.isTeraBlast && isStellarTeraAttacker && defenderIsTerastallized)) {
        adjustedNonCritDamages = adjustMinDamage(calculatedDamagesHolder.nonCrit);
        adjustedCritDamages = adjustMinDamage(calculatedDamagesHolder.crit);
    } else { // 効果なしの場合
        adjustedNonCritDamages.fill(0);
        adjustedCritDamages.fill(0);
    }


    const minFinalDamage = Math.min(...adjustedNonCritDamages);
    const maxFinalDamage = Math.max(...adjustedNonCritDamages);
    const critMinFinalDamage = Math.min(...adjustedCritDamages);
    const critMaxFinalDamage = Math.max(...adjustedCritDamages);

    const finalDefenderHP = defenderStats.hp.final > 0 ? defenderStats.hp.final : 1; // 0除算を防ぐ
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