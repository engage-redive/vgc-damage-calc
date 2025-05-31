import React, { useEffect, useCallback } from 'react';
import { Pokemon, Move, StatCalculation, NatureModifier, PokemonType, Item, Ability, TeraBurstEffectiveType, MoveCategory, ProtosynthesisBoostTarget, AttackerState } from '../types'; 
import PokemonSelect from './PokemonSelect';
import MoveSelect from './MoveSelect';
import StatSlider from './StatSlider';
import ItemSelect from './ItemSelect';
import AbilitySelect from './AbilitySelect';
import TeraBlastOptions from '../calculation/TeraBlastOptions'; // パスをプロジェクトに合わせて調整
import { Plus, X } from 'lucide-react';

// StandardOffensiveStatInputs は直接展開するため、インポートを削除
// import StandardOffensiveStatInputs from './moveSpecific/StandardOffensiveStatInputs';
import BodyPressDefenseInputs from './moveSpecific/BodyPressDefenseInputs';
import HpDependentPowerInputs from './moveSpecific/HpDependentPowerInputs';
import FoulPlayDisplay from './moveSpecific/FoulPlayDisplay';
import RankSelector from './RankSelector';
import HitCountSelect from '../calculation/HitCountSelect'; // パスをプロジェクトに合わせて調整

// 日本語のタイプ名と色の定義 (共通化のため、本来は utils などに定義してインポート)
const TYPE_NAME_JP: Record<string, string> = {
  normal: 'ノーマル', fire: 'ほのお', water: 'みず', electric: 'でんき', grass: 'くさ', ice: 'こおり',
  fighting: 'かくとう', poison: 'どく', ground: 'じめん', flying: 'ひこう', psychic: 'エスパー', bug: 'むし',
  rock: 'いわ', ghost: 'ゴースト', dragon: 'ドラゴン', dark: 'あく', steel: 'はがね', fairy: 'フェアリー',
  stellar: 'ステラ',
};

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
  fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD',
  stellar: '#7A7AE6',
};

const getTypeNameJp = (type: PokemonType | string): string => {
  const typeKey = (typeof type === 'string' ? type.toLowerCase() : type.toString().toLowerCase()) as keyof typeof TYPE_NAME_JP;
  return TYPE_NAME_JP[typeKey] || typeKey.toString();
};

const getTypeColor = (type: PokemonType | string): string => {
  const typeKey = (typeof type === 'string' ? type.toLowerCase() : type.toString().toLowerCase()) as keyof typeof TYPE_COLORS;
  return TYPE_COLORS[typeKey] || '#777777';
};


const calculateHp = (base: number, iv: number, ev: number, level: number): number => {
  if (base <= 0) return 0;
  if (base === 1) return 1;
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
};

const calculateBaseStatValue = (
  base: number, iv: number, ev: number, level: number, nature: NatureModifier
): number => {
  if (!base || base <= 0) return 0;
  let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  stat = Math.floor(stat * nature);
  return stat;
};

const calculateFinalStatWithRank = (
  base: number, iv: number, ev: number, level: number, nature: NatureModifier, rank: number
): number => {
  let baseStatVal = calculateBaseStatValue(base, iv, ev, level, nature);
  if (rank !== 0) {
    const rankMultiplier = rank > 0 ? (2 + rank) / 2 : 2 / (2 - rank);
    baseStatVal = Math.floor(baseStatVal * rankMultiplier);
  }
  return baseStatVal;
};

const calculateFinalStatForTeraBlast = (
    pokemonBaseStat: number, statCalc: StatCalculation
): number => {
    if (!pokemonBaseStat) return 0;
    let final = calculateBaseStatValue(pokemonBaseStat, statCalc.iv, statCalc.ev, 50, statCalc.nature);
    if (statCalc.rank !== 0) {
        const rankMultiplier = statCalc.rank > 0 ? (2 + statCalc.rank) / 2 : 2 / (2 - statCalc.rank);
        final = Math.floor(final * rankMultiplier);
    }
    return final;
};

const findClosestEvForBaseValue = (
  targetBaseValue: number, pokemonSpeciesStat: number, nature: NatureModifier,
  level: number = 50, iv: number = 31
): number => {
  if (pokemonSpeciesStat <=0) return 0;
  let closestEv = 0; let smallestDiff = Infinity;
  for (let ev = 0; ev <= 252; ev += 4) {
    const calculatedStat = calculateBaseStatValue(pokemonSpeciesStat, iv, ev, level, nature);
    const diff = Math.abs(calculatedStat - targetBaseValue);
    if (diff < smallestDiff) { smallestDiff = diff; closestEv = ev; }
    else if (diff === smallestDiff) { closestEv = Math.min(closestEv, ev); }
  }
  return closestEv;
};


interface AttackerPanelProps {
  pokemon: Pokemon[];
  moves: Move[];
  items: Item[];
  abilities: Ability[];
  attackers: AttackerState[];
  onSetAttackers: (attackers: AttackerState[]) => void;
  defenderAttackStatForFoulPlay: StatCalculation;
  onDefenderOffensiveStatChange: (updates: Partial<Pick<StatCalculation, 'ev' | 'rank'>>) => void;
}

const AttackerPanel: React.FC<AttackerPanelProps> = ({
  pokemon: pokemonList,
  moves,
  items,
  abilities,
  attackers,
  onSetAttackers,
  defenderAttackStatForFoulPlay,
  onDefenderOffensiveStatChange,
}) => {
   const createNewDefaultAttackerState = (): AttackerState => {
    const defaultPokemon = pokemonList.length > 0 ? pokemonList[0] : null;
    const defaultAttackStatBase = defaultPokemon?.baseStats.attack || 0;
    const defaultSpAttackStatBase = defaultPokemon?.baseStats.specialAttack || 0;
    const defaultDefenseStatBase = defaultPokemon?.baseStats.defense || 0;
    const defaultHpBase = defaultPokemon?.baseStats.hp || 0;
    const initialHpEv = 0;
    const initialActualMaxHp = defaultPokemon ? calculateHp(defaultHpBase, 31, initialHpEv, 50) : 1;

    const defaultAttackStat: StatCalculation = {
        base: defaultAttackStatBase, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateBaseStatValue(defaultAttackStatBase, 31, 0, 50, 1.0)
    };
    const defaultSpecialAttackStat: StatCalculation = {
        base: defaultSpAttackStatBase, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateBaseStatValue(defaultSpAttackStatBase, 31, 0, 50, 1.0)
    };
    const defaultDefenseStat: StatCalculation = {
        base: defaultDefenseStatBase, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateBaseStatValue(defaultDefenseStatBase, 31, 0, 50, 1.0)
    };

    return {
      pokemon: defaultPokemon,
      move: null, item: null, ability: null,
      attackStat: defaultAttackStat,
      specialAttackStat: defaultSpecialAttackStat,
      defenseStat: defaultDefenseStat,
      attackInputValue: defaultAttackStat.final.toString(),
      specialAttackInputValue: defaultSpecialAttackStat.final.toString(),
      defenseInputValue: defaultDefenseStat.final.toString(),
      hpEv: initialHpEv,
      actualMaxHp: initialActualMaxHp,
      currentHp: initialActualMaxHp,
      teraType: null, isStellar: false, isBurned: false,
      hasHelpingHand: false, hasFlowerGift: false, isEnabled: true,
      teraBlastUserSelectedCategory: 'auto',
      teraBlastDeterminedType: null, teraBlastDeterminedCategory: null,
      selectedHitCount: null,
      protosynthesisBoostedStat: null,
      protosynthesisManualTrigger: false,
      quarkDriveBoostedStat: null,
      quarkDriveManualTrigger: false,
      moveUiOptionStates: {},
    };
  };

  useEffect(() => {
    const newAttackersArray = attackers.map(attacker => {
      if (!attacker.move?.isTeraBlast) {
        if (attacker.teraBlastDeterminedType !== null || attacker.teraBlastDeterminedCategory !== null || attacker.teraBlastUserSelectedCategory !== 'auto') {
          return { ...attacker, teraBlastDeterminedType: null, teraBlastDeterminedCategory: null, teraBlastUserSelectedCategory: 'auto' };
        }
        return attacker;
      }

      let determinedType: TeraBurstEffectiveType | null = null;
      let determinedCategory: MoveCategory | null = attacker.move.category as MoveCategory;
      const isTerastallized = attacker.teraType !== null || attacker.isStellar;

      if (isTerastallized) {
        if (attacker.isStellar) determinedType = 'stellar';
        else if (attacker.teraType) determinedType = attacker.teraType;

        if (attacker.teraBlastUserSelectedCategory === 'physical') determinedCategory = 'physical';
        else if (attacker.teraBlastUserSelectedCategory === 'special') determinedCategory = 'special';
        else {
          if (attacker.pokemon) {
            const finalAttackForCompare = calculateFinalStatForTeraBlast(attacker.pokemon.baseStats.attack, attacker.attackStat);
            const finalSpecialAttackForCompare = calculateFinalStatForTeraBlast(attacker.pokemon.baseStats.specialAttack, attacker.specialAttackStat);
            determinedCategory = finalAttackForCompare > finalSpecialAttackForCompare ? 'physical' : 'special';
          } else {
            determinedCategory = attacker.move.category as MoveCategory;
          }
        }
      } else {
        determinedType = PokemonType.Normal; // テラバースト非テラスタル時はノーマルタイプ
        determinedCategory = attacker.move.category as MoveCategory;
      }

      if (attacker.teraBlastDeterminedType !== determinedType || attacker.teraBlastDeterminedCategory !== determinedCategory) {
          return { ...attacker, teraBlastDeterminedType: determinedType, teraBlastDeterminedCategory: determinedCategory };
      }
      return attacker;
    });

    // Check if a deep comparison is needed or if this shallow check is sufficient
    if (JSON.stringify(newAttackersArray) !== JSON.stringify(attackers)) {
        onSetAttackers(newAttackersArray);
    }
  }, [attackers, onSetAttackers]);


  const updateAttackerState = useCallback((index: number, updates: Partial<AttackerState>) => {
    const newAttackers = [...attackers];
    const currentAttacker = newAttackers[index];
    if (!currentAttacker) return;

    let tempAttacker = { ...currentAttacker, ...updates };

    if (updates.pokemon !== undefined && updates.pokemon !== currentAttacker.pokemon) {
        const newPokemon = updates.pokemon;
        const baseAttack = newPokemon?.baseStats.attack || 0;
        const baseSpAttack = newPokemon?.baseStats.specialAttack || 0;
        const baseDefense = newPokemon?.baseStats.defense || 0;
        const baseHp = newPokemon?.baseStats.hp || 0;

        const newActualMaxHp = newPokemon ? calculateHp(baseHp, 31, tempAttacker.hpEv, 50) : 1;
        tempAttacker.actualMaxHp = newActualMaxHp;
        tempAttacker.currentHp = newActualMaxHp;


        tempAttacker.attackStat = {
            base: baseAttack, iv: 31, ev: 0, nature: 1.0, rank: 0,
            final: calculateBaseStatValue(baseAttack, 31, 0, 50, 1.0)
        };
        tempAttacker.specialAttackStat = {
            base: baseSpAttack, iv: 31, ev: 0, nature: 1.0, rank: 0,
            final: calculateBaseStatValue(baseSpAttack, 31, 0, 50, 1.0)
        };
        tempAttacker.defenseStat = {
            base: baseDefense, iv: 31, ev: 0, nature: 1.0, rank: 0,
            final: calculateBaseStatValue(baseDefense, 31, 0, 50, 1.0)
        };

        // ポケモン変更時は関連情報をリセット
        if (updates.move === undefined) tempAttacker.move = null;
        if (updates.ability === undefined) tempAttacker.ability = null;
        if (updates.item === undefined) tempAttacker.item = null;
        tempAttacker.teraType = null; // ポケモン変更時はテラス状態もリセット
        tempAttacker.isStellar = false; // 同上

        tempAttacker.attackInputValue = tempAttacker.attackStat.final.toString();
        tempAttacker.specialAttackInputValue = tempAttacker.specialAttackStat.final.toString();
        tempAttacker.defenseInputValue = tempAttacker.defenseStat.final.toString();

        tempAttacker.protosynthesisBoostedStat = null;
        tempAttacker.protosynthesisManualTrigger = false;
        tempAttacker.quarkDriveBoostedStat = null;
        tempAttacker.quarkDriveManualTrigger = false;
        tempAttacker.moveUiOptionStates = {};
        tempAttacker.selectedHitCount = null;
        tempAttacker.teraBlastUserSelectedCategory = 'auto';
        tempAttacker.teraBlastDeterminedType = null;
        tempAttacker.teraBlastDeterminedCategory = null;

    } else { // ポケモン変更以外のアップデート
        if (updates.hpEv !== undefined && tempAttacker.pokemon) {
          const newActualMaxHp = calculateHp(tempAttacker.pokemon.baseStats.hp, 31, updates.hpEv, 50);
          tempAttacker.actualMaxHp = newActualMaxHp;
          if (tempAttacker.currentHp > newActualMaxHp) {
            tempAttacker.currentHp = newActualMaxHp;
          }
        }
        if (updates.attackStat && tempAttacker.pokemon) { // ポケモンがセットされている場合のみ更新
            tempAttacker.attackStat = { ...currentAttacker.attackStat, ...updates.attackStat };
            tempAttacker.attackStat.final = calculateFinalStatWithRank(
                tempAttacker.pokemon.baseStats.attack,
                tempAttacker.attackStat.iv,
                tempAttacker.attackStat.ev,
                50, // level
                tempAttacker.attackStat.nature,
                tempAttacker.attackStat.rank
            );
            tempAttacker.attackInputValue = tempAttacker.attackStat.final.toString();
        }
        if (updates.specialAttackStat && tempAttacker.pokemon) {
            tempAttacker.specialAttackStat = { ...currentAttacker.specialAttackStat, ...updates.specialAttackStat };
            tempAttacker.specialAttackStat.final = calculateFinalStatWithRank(
                tempAttacker.pokemon.baseStats.specialAttack,
                tempAttacker.specialAttackStat.iv,
                tempAttacker.specialAttackStat.ev,
                50, // level
                tempAttacker.specialAttackStat.nature,
                tempAttacker.specialAttackStat.rank
            );
            tempAttacker.specialAttackInputValue = tempAttacker.specialAttackStat.final.toString();
        }
        if (updates.defenseStat && tempAttacker.pokemon) {
            tempAttacker.defenseStat = { ...currentAttacker.defenseStat, ...updates.defenseStat };
            tempAttacker.defenseStat.final = calculateFinalStatWithRank(
                tempAttacker.pokemon.baseStats.defense,
                tempAttacker.defenseStat.iv,
                tempAttacker.defenseStat.ev,
                50, // level
                tempAttacker.defenseStat.nature,
                tempAttacker.defenseStat.rank
            );
            tempAttacker.defenseInputValue = tempAttacker.defenseStat.final.toString();
        }
    }

    // 特性変更時の処理
    if (updates.ability !== undefined) {
        const prevAbilityId = currentAttacker.ability?.id;
        const newAbilityId = updates.ability?.id;

        if (newAbilityId === 'protosynthesis' && prevAbilityId !== 'protosynthesis') {
            tempAttacker.protosynthesisBoostedStat = 'attack'; // デフォルト
            tempAttacker.protosynthesisManualTrigger = false;
        } else if (newAbilityId !== 'protosynthesis' && prevAbilityId === 'protosynthesis') {
            tempAttacker.protosynthesisBoostedStat = null;
            tempAttacker.protosynthesisManualTrigger = false;
        }

        if (newAbilityId === 'quark_drive' && prevAbilityId !== 'quark_drive') {
            tempAttacker.quarkDriveBoostedStat = 'attack'; // デフォルト
            tempAttacker.quarkDriveManualTrigger = false;
        } else if (newAbilityId !== 'quark_drive' && prevAbilityId === 'quark_drive') {
            tempAttacker.quarkDriveBoostedStat = null;
            tempAttacker.quarkDriveManualTrigger = false;
        }
    }

    // 技変更時の処理
    if (updates.move !== undefined && updates.move?.id !== currentAttacker.move?.id) {
        tempAttacker.moveUiOptionStates = {}; // 技固有オプションの状態をリセット
        if (!updates.move?.isTeraBlast) {
            tempAttacker.teraBlastUserSelectedCategory = 'auto';
            // teraBlastDeterminedType/Category もリセットするならここで
        } else if (updates.move?.isTeraBlast && !currentAttacker.move?.isTeraBlast) {
             tempAttacker.teraBlastUserSelectedCategory = 'auto';
        }
        const newMove = updates.move;
        // 連続攻撃技のヒット数設定
        if (newMove && typeof newMove.multihit === 'number' && newMove.multihit > 1) {
            tempAttacker.selectedHitCount = newMove.multihit;
        } else if (newMove && newMove.multihit === '2-5') {
            tempAttacker.selectedHitCount = 2; // デフォルトで最小ヒット数など (UIで選択させる方が良い)
        }
         else {
            tempAttacker.selectedHitCount = null;
        }
    }

    newAttackers[index] = tempAttacker;
    onSetAttackers(newAttackers);
  }, [attackers, onSetAttackers]);

  const addAttacker = () => {
    if (attackers.length < 2) {
      onSetAttackers([...attackers, createNewDefaultAttackerState()]);
    }
  };

  const removeAttacker = (index: number) => {
    if (attackers.length > 0) { // 最後の攻撃者は削除しないようにするなら length > 1
      onSetAttackers(attackers.filter((_, i) => i !== index));
    }
  };

  const toggleAttacker = (index: number) => updateAttackerState(index, { isEnabled: !attackers[index].isEnabled });
  const handlePokemonChange = (pokemon: Pokemon | null, index: number) => {
    // ポケモン変更時にテラスタイプとステラ状態もリセットする
    updateAttackerState(index, { pokemon, teraType: null, isStellar: false, move: null, item: null, ability: null });
  };
  const handleMoveChange = (move: Move | null, index: number) => updateAttackerState(index, { move });
  const handleHitCountChange = (count: number | null, index: number) => { // null許容に変更
    updateAttackerState(index, { selectedHitCount: count });
  };
  const handleItemChange = (item: Item | null, index: number) => updateAttackerState(index, { item });
  const handleAbilityChange = (ability: Ability | null, index: number) => {
    updateAttackerState(index, { ability });
  };

  const handleProtosynthesisBoostedStatChange = (stat: ProtosynthesisBoostTarget | null, attackerIndex: number) => {
    updateAttackerState(attackerIndex, { protosynthesisBoostedStat: stat });
  };
  const handleProtosynthesisManualTriggerChange = (isActive: boolean, attackerIndex: number) => {
    updateAttackerState(attackerIndex, { protosynthesisManualTrigger: isActive });
  };

  const handleQuarkDriveBoostedStatChange = (stat: ProtosynthesisBoostTarget | null, attackerIndex: number) => {
    updateAttackerState(attackerIndex, { quarkDriveBoostedStat: stat });
  };
  const handleQuarkDriveManualTriggerChange = (isActive: boolean, attackerIndex: number) => {
    updateAttackerState(attackerIndex, { quarkDriveManualTrigger: isActive });
  };


  const handleCurrentHpChange = (newCurrentHp: number, index: number) => {
    updateAttackerState(index, { currentHp: newCurrentHp });
  };
  const handleHpEvChange = (ev: number, index: number) => {
    let validEv = Math.floor(ev / 4) * 4;
    validEv = Math.max(0, Math.min(validEv, 252));
    updateAttackerState(index, { hpEv: validEv });
  };

  const handleAttackEvChange = (ev: number, index: number) => {
    let validEv = Math.floor(ev / 4) * 4;
    validEv = Math.max(0, Math.min(validEv, 252));
    updateAttackerState(index, { attackStat: { ...attackers[index].attackStat, ev: validEv } });
  };
  const handleSpecialAttackEvChange = (ev: number, index: number) => {
    let validEv = Math.floor(ev / 4) * 4;
    validEv = Math.max(0, Math.min(validEv, 252));
    updateAttackerState(index, { specialAttackStat: { ...attackers[index].specialAttackStat, ev: validEv } });
  };
  const handleDefenseEvChange = (ev: number, index: number) => {
    let validEv = Math.floor(ev / 4) * 4;
    validEv = Math.max(0, Math.min(validEv, 252));
    updateAttackerState(index, { defenseStat: { ...attackers[index].defenseStat, ev: validEv } });
  };

  const handleAttackNatureChange = (nature: NatureModifier, index: number) => updateAttackerState(index, { attackStat: { ...attackers[index].attackStat, nature } });
  const handleSpecialAttackNatureChange = (nature: NatureModifier, index: number) => updateAttackerState(index, { specialAttackStat: { ...attackers[index].specialAttackStat, nature } });
  const handleDefenseNatureChange = (nature: NatureModifier, index: number) => updateAttackerState(index, { defenseStat: { ...attackers[index].defenseStat, nature } });
  const handleAttackRankChange = (rank: number, index: number) => updateAttackerState(index, { attackStat: { ...attackers[index].attackStat, rank } });
  const handleSpecialAttackRankChange = (rank: number, index: number) => updateAttackerState(index, { specialAttackStat: { ...attackers[index].specialAttackStat, rank } });
  const handleDefenseRankChange = (rank: number, index: number) => updateAttackerState(index, { defenseStat: { ...attackers[index].defenseStat, rank } });

  // ★ テラスタル状態のトグル処理 (MoveSelectからのイベントを受ける)
  const handleToggleTera = (attackerIndex: number) => {
    const attacker = attackers[attackerIndex];
    if (!attacker.pokemon || !attacker.move) return;

    let newTeraType: PokemonType | null = null;
    let newIsStellar = attacker.isStellar; // ステラ状態は基本維持

    if (attacker.teraType === null && !attacker.isStellar) { // 現在テラスタルもステラもしていない -> 通常テラスタルする
      newIsStellar = false; // 通常テラスタル時はステラを解除
      // オーガポンかつツタこんぼうの場合の特殊処理
      if (attacker.pokemon.name.startsWith("オーガポン") && attacker.move.id === "ivycudgel") {
        const pokemonId = attacker.pokemon.id.toString();
        if (pokemonId.endsWith("-w")) newTeraType = PokemonType.Water;
        else if (pokemonId.endsWith("-h")) newTeraType = PokemonType.Fire;
        else if (pokemonId.endsWith("-c")) newTeraType = PokemonType.Rock;
        else newTeraType = PokemonType.Grass; // みどりのめん
      } else {
        // 通常の技の場合、技の「基本」タイプをテラスタイプとする
        // (getEffectiveMoveProperties を通す前のタイプ)
        newTeraType = attacker.move.type;
      }
    } else { // 現在テラスタルしている、またはステラ状態 -> 解除する (teraType: null, isStellar: false)
      newTeraType = null;
      newIsStellar = false; // 通常テラ・ステラ両方OFF
    }
    updateAttackerState(attackerIndex, { teraType: newTeraType, isStellar: newIsStellar });
  };

  // ★ ステラ状態のトグル処理 (MoveSelectからのイベントを受ける)
  const handleToggleStellar = (attackerIndex: number) => {
    const attacker = attackers[attackerIndex];
    if (!attacker.pokemon || !attacker.move) return;

    const newIsStellar = !attacker.isStellar;
    let newTeraType = attacker.teraType;

    if (newIsStellar) { // ステラをONにする場合
      newTeraType = null; // 通常のテラスタイプは解除
    }
    // ステラをOFFにする場合は、通常のテラスタイプは影響を受けない (既にnullかもしれないし、何かのタイプかもしれない)

    updateAttackerState(attackerIndex, { isStellar: newIsStellar, teraType: newTeraType });
  };


  const handleBurnChange = (burned: boolean, index: number) => updateAttackerState(index, { isBurned: burned });
  const handleHelpingHandChange = (helped: boolean, index: number) => updateAttackerState(index, { hasHelpingHand: helped });
  const handleTeraBlastCategorySelect = (category: 'physical' | 'special' | 'auto', index: number) => updateAttackerState(index, { teraBlastUserSelectedCategory: category });

  const handleAttackInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    const attacker = attackers[index];
    updateAttackerState(index, { attackInputValue: newValue });

    const value = parseInt(newValue, 10);
    if (attacker.pokemon && !isNaN(value) && value >= 0) {
      const closestEv = findClosestEvForBaseValue(value, attacker.pokemon.baseStats.attack, attacker.attackStat.nature);
      if (attacker.attackStat.ev !== closestEv) {
        const newAttackStat: Partial<StatCalculation> = { ...attacker.attackStat, ev: closestEv };
        newAttackStat.final = calculateFinalStatWithRank(
            attacker.pokemon.baseStats.attack,
            newAttackStat.iv || 31,
            newAttackStat.ev || 0,
            50,
            newAttackStat.nature || 1.0,
            newAttackStat.rank || 0
        );
        updateAttackerState(index, {
          // attackInputValue: newValue, // ここで inputValue を再度設定すると入力が飛ぶ可能性
          attackStat: newAttackStat as StatCalculation
        });
      }
    }
  };

  const handleSpecialAttackInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    const attacker = attackers[index];
    updateAttackerState(index, { specialAttackInputValue: newValue });

    const value = parseInt(newValue, 10);
    if (attacker.pokemon && !isNaN(value) && value >= 0) {
      const closestEv = findClosestEvForBaseValue(value, attacker.pokemon.baseStats.specialAttack, attacker.specialAttackStat.nature);
      if (attacker.specialAttackStat.ev !== closestEv) {
        const newSpecialAttackStat: Partial<StatCalculation> = { ...attacker.specialAttackStat, ev: closestEv };
        newSpecialAttackStat.final = calculateFinalStatWithRank(
            attacker.pokemon.baseStats.specialAttack,
            newSpecialAttackStat.iv || 31,
            newSpecialAttackStat.ev || 0,
            50,
            newSpecialAttackStat.nature || 1.0,
            newSpecialAttackStat.rank || 0
        );
        updateAttackerState(index, {
          // specialAttackInputValue: newValue,
          specialAttackStat: newSpecialAttackStat as StatCalculation
        });
      }
    }
  };

  const handleDefenseInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    const attacker = attackers[index];
    updateAttackerState(index, { defenseInputValue: newValue });

    const value = parseInt(newValue, 10);
    if (attacker.pokemon && !isNaN(value) && value >= 0) {
      const closestEv = findClosestEvForBaseValue(value, attacker.pokemon.baseStats.defense, attacker.defenseStat.nature);
      if (attacker.defenseStat.ev !== closestEv) {
         const newDefenseStat: Partial<StatCalculation> = { ...attacker.defenseStat, ev: closestEv };
        newDefenseStat.final = calculateFinalStatWithRank(
            attacker.pokemon.baseStats.defense,
            newDefenseStat.iv || 31,
            newDefenseStat.ev || 0,
            50,
            newDefenseStat.nature || 1.0,
            newDefenseStat.rank || 0
        );
        updateAttackerState(index, {
          // defenseInputValue: newValue,
          defenseStat: newDefenseStat as StatCalculation
        });
      }
    }
  };

  const handleAttackInputBlur = (index: number) => {
    const attacker = attackers[index];
    if (attacker.pokemon) {
        const finalStat = calculateFinalStatWithRank(
            attacker.pokemon.baseStats.attack,
            attacker.attackStat.iv,
            attacker.attackStat.ev,
            50,
            attacker.attackStat.nature,
            attacker.attackStat.rank
        );
        // inputValue が手動で編集された結果と、EVから再計算した値が異なる場合のみ、inputValueを再計算値に更新
        if (parseInt(attacker.attackInputValue, 10) !== finalStat || attacker.attackStat.final !== finalStat) {
            updateAttackerState(index, {
                attackInputValue: finalStat.toString(),
                attackStat: { ...attacker.attackStat, final: finalStat }
            });
        }
    } else if (attacker.attackInputValue !== "") { // ポケモン未選択時は空にする
        updateAttackerState(index, { attackInputValue: "" });
    }
  };

  const handleSpecialAttackInputBlur = (index: number) => {
    const attacker = attackers[index];
    if (attacker.pokemon) {
        const finalStat = calculateFinalStatWithRank(
            attacker.pokemon.baseStats.specialAttack,
            attacker.specialAttackStat.iv,
            attacker.specialAttackStat.ev,
            50,
            attacker.specialAttackStat.nature,
            attacker.specialAttackStat.rank
        );
        if (parseInt(attacker.specialAttackInputValue, 10) !== finalStat || attacker.specialAttackStat.final !== finalStat) {
            updateAttackerState(index, {
                specialAttackInputValue: finalStat.toString(),
                specialAttackStat: { ...attacker.specialAttackStat, final: finalStat }
            });
        }
    } else if (attacker.specialAttackInputValue !== "") {
        updateAttackerState(index, { specialAttackInputValue: "" });
    }
  };

  const handleDefenseInputBlur = (index: number) => {
    const attacker = attackers[index];
    if (attacker.pokemon) {
        const finalStat = calculateFinalStatWithRank(
            attacker.pokemon.baseStats.defense,
            attacker.defenseStat.iv,
            attacker.defenseStat.ev,
            50,
            attacker.defenseStat.nature,
            attacker.defenseStat.rank
        );
        if (parseInt(attacker.defenseInputValue, 10) !== finalStat || attacker.defenseStat.final !== finalStat) {
            updateAttackerState(index, {
                defenseInputValue: finalStat.toString(),
                defenseStat: { ...attacker.defenseStat, final: finalStat }
            });
        }
    } else if (attacker.defenseInputValue !== "") {
        updateAttackerState(index, { defenseInputValue: "" });
    }
  };

  const renderAttackerSection = (attacker: AttackerState, index: number) => {
      const attackBaseValueForDisplay = attacker.attackStat && attacker.pokemon ? calculateBaseStatValue(
          attacker.pokemon.baseStats.attack,
          attacker.attackStat.iv,
          attacker.attackStat.ev || 0,
          50,
          attacker.attackStat.nature
      ) : 0;

      const specialAttackBaseValueForDisplay = attacker.specialAttackStat && attacker.pokemon ? calculateBaseStatValue(
          attacker.pokemon.baseStats.specialAttack,
          attacker.specialAttackStat.iv,
          attacker.specialAttackStat.ev || 0,
          50,
          attacker.specialAttackStat.nature
      ) : 0;

      const defenseBaseValueForDisplay = attacker.defenseStat && attacker.pokemon ? calculateBaseStatValue(
          attacker.pokemon.baseStats.defense,
          attacker.defenseStat.iv,
          attacker.defenseStat.ev || 0,
          50,
          attacker.defenseStat.nature
      ) : 0;

      const showTeraBlastSettings = attacker.move?.isTeraBlast &&
                                (attacker.teraType !== null || attacker.isStellar) &&
                                attacker.isEnabled;

      const isProtosynthesisSelected = attacker.ability?.id === 'protosynthesis' && attacker.isEnabled && attacker.pokemon;
      const isQuarkDriveSelected = attacker.ability?.id === 'quark_drive' && attacker.isEnabled && attacker.pokemon;

      const moveName = attacker.move?.name;
      let statInputsSection;
      let hpEvSliderToShow = null;
      let hpDependentInputsToShow = null;
      let defenderAttackControlsToShow = null;

      // ▼▼▼ StandardOffensiveStatInputs の内容を展開してボタンを追加 ▼▼▼
      const standardStatInputsJsx = (
        <div className="space-y-6">
          {/* こうげきセクション */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-white font-medium">こうげき</label>
              <input
                type="number"
                value={attacker.attackInputValue}
                onChange={(e) => handleAttackInputChange(e, index)}
                onBlur={() => handleAttackInputBlur(index)}
                className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
            </div>
            <StatSlider
              value={attacker.attackStat.ev}
              onChange={(ev) => handleAttackEvChange(ev, index)}
              max={252}
              step={4}
              currentStat={attackBaseValueForDisplay}
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
            <div className="flex justify-between items-start mt-2">
              <div>
                <label className="text-sm text-gray-400">性格補正</label>
                <div className="flex gap-1 mt-1">
                  {[0.9, 1.0, 1.1].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleAttackNatureChange(n as NatureModifier, index)}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${attacker.attackStat.nature === n ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-600 hover:bg-gray-500'}`}
                      disabled={!attacker.isEnabled || !attacker.pokemon}
                    >
                      x{n.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-400">努力値: {attacker.attackStat.ev}</span>
                <div className="flex gap-1 mt-1 justify-end">
                    <button
                        onClick={() => handleAttackEvChange(0, index)}
                        className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
                        disabled={!attacker.isEnabled || !attacker.pokemon}
                    >
                        0
                    </button>
                    <button
                        onClick={() => handleAttackEvChange(252, index)}
                        className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
                        disabled={!attacker.isEnabled || !attacker.pokemon}
                    >
                        252
                    </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <RankSelector
                value={attacker.attackStat.rank}
                onChange={(rank) => handleAttackRankChange(rank, index)}
                label="こうげきランク"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
            </div>
          </div>
  
          {/* とくこうセクション */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-white font-medium">とくこう</label>
              <input
                type="number"
                value={attacker.specialAttackInputValue}
                onChange={(e) => handleSpecialAttackInputChange(e, index)}
                onBlur={() => handleSpecialAttackInputBlur(index)}
                className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
            </div>
            <StatSlider
              value={attacker.specialAttackStat.ev}
              onChange={(ev) => handleSpecialAttackEvChange(ev, index)}
              max={252}
              step={4}
              currentStat={specialAttackBaseValueForDisplay}
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
            <div className="flex justify-between items-start mt-2">
              <div>
                <label className="text-sm text-gray-400">性格補正</label>
                <div className="flex gap-1 mt-1">
                  {[0.9, 1.0, 1.1].map((n) => (
                    <button
                      key={n}
                      onClick={() => handleSpecialAttackNatureChange(n as NatureModifier, index)}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${attacker.specialAttackStat.nature === n ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-600 hover:bg-gray-500'}`}
                      disabled={!attacker.isEnabled || !attacker.pokemon}
                    >
                      x{n.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-400">努力値: {attacker.specialAttackStat.ev}</span>
                <div className="flex gap-1 mt-1 justify-end">
                    <button
                        onClick={() => handleSpecialAttackEvChange(0, index)}
                        className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
                        disabled={!attacker.isEnabled || !attacker.pokemon}
                    >
                        0
                    </button>
                    <button
                        onClick={() => handleSpecialAttackEvChange(252, index)}
                        className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
                        disabled={!attacker.isEnabled || !attacker.pokemon}
                    >
                        252
                    </button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <RankSelector
                value={attacker.specialAttackStat.rank}
                onChange={(rank) => handleSpecialAttackRankChange(rank, index)}
                label="とくこうランク"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
            </div>
          </div>
        </div>
      );
      // ▲▲▲ ここまでが展開した内容 ▲▲▲

      if (moveName === "イカサマ") {
        statInputsSection = <FoulPlayDisplay />;
        hpEvSliderToShow = null;
        hpDependentInputsToShow = null;
        defenderAttackControlsToShow = (
          <>
            <div className="mt-3">
              <StatSlider
                label="相手のこうげき努力値"
                value={defenderAttackStatForFoulPlay.ev}
                max={252}
                step={4}
                onChange={(newEv) => {
                  let validEv = Math.floor(newEv / 4) * 4;
                  validEv = Math.max(0, Math.min(validEv, 252));
                  onDefenderOffensiveStatChange({ ev: validEv });
                }}
                disabled={!attacker.isEnabled || !attacker.pokemon || defenderAttackStatForFoulPlay.base === 0}
                currentStat={defenderAttackStatForFoulPlay.final}
                baseStat={defenderAttackStatForFoulPlay.base}
              />
            </div>
            <div className="mt-3">
              <RankSelector
                value={defenderAttackStatForFoulPlay.rank}
                onChange={(newRank) => onDefenderOffensiveStatChange({ rank: newRank })}
                label="相手のこうげきランク"
                disabled={!attacker.isEnabled || !attacker.pokemon || defenderAttackStatForFoulPlay.base === 0}
              />
            </div>
          </>
        );
      } else if ((moveName === "ふんか" || moveName === "しおふき") && attacker.move) {
        hpDependentInputsToShow = (
          <HpDependentPowerInputs
            actualMaxHp={attacker.actualMaxHp}
            currentHp={attacker.currentHp}
            baseMovePower={attacker.move.power || 150} // 技データにpowerがない場合のフォールバック
            onCurrentHpChange={(newHp) => handleCurrentHpChange(newHp, index)}
            isEnabled={attacker.isEnabled && attacker.pokemon !== null}
          />
        );
        if (attacker.pokemon) {
            hpEvSliderToShow = (
                <div className="mt-3">
                    <StatSlider
                        label="HP 努力値"
                        value={attacker.hpEv}
                        max={252}
                        step={4}
                        onChange={(newEv) => handleHpEvChange(newEv, index)}
                        disabled={!attacker.isEnabled || !attacker.pokemon}
                        currentStat={attacker.actualMaxHp}
                        baseStat={attacker.pokemon.baseStats.hp}
                    />
                </div>
            );
        }
        statInputsSection = standardStatInputsJsx; // 展開したJSXを使用
      } else if (moveName === "ボディプレス") {
        statInputsSection = (
          <BodyPressDefenseInputs
            attacker={attacker}
            index={index}
            defenseBaseValueForDisplay={defenseBaseValueForDisplay}
            onDefenseInputChange={handleDefenseInputChange}
            onDefenseInputBlur={handleDefenseInputBlur}
            onDefenseEvChange={(ev) => handleDefenseEvChange(ev, index)}
            onDefenseNatureChange={(nature) => handleDefenseNatureChange(nature, index)}
            onDefenseRankChange={(rank) => handleDefenseRankChange(rank, index)}
          />
        );
      } else { // 通常の技
        statInputsSection = standardStatInputsJsx; // 展開したJSXを使用
      }

    return (
      <div key={index} className={`bg-gray-800 rounded-lg p-4 mb-4 ${!attacker.isEnabled ? 'opacity-60' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">攻撃側 {index + 1}</h3>
            <div className="flex items-center">
              <input type="checkbox" checked={attacker.isEnabled} onChange={() => toggleAttacker(index)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
              <span className="ml-2 text-sm text-gray-300">有効</span>
            </div>
          </div>
          {attackers.length > 1 && ( // 攻撃者が複数いる場合のみ削除ボタンを表示
            <button onClick={() => removeAttacker(index)} className="text-gray-400 hover:text-red-500 transition-colors">
              <X className="h-5 w-5" /><span className="text-sm sr-only">削除</span>
            </button>
          )}
        </div>
        <div className={`${!attacker.isEnabled ? 'pointer-events-none' : ''}`}>
           {attacker.pokemon && (
             <div className="flex items-center gap-3 mb-3">
               <img src={`/icon/${attacker.pokemon.id.toString().padStart(3, '0')}.png`} alt={attacker.pokemon.name} className="w-8 h-8 object-contain" /> {/* object-contain を追加 */}
               <div className="flex flex-col">
                 <div className="flex gap-1">
                   {attacker.pokemon.types.map((type, typeIndex) => (
                     <span
                       key={typeIndex}
                       className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
                       style={{ backgroundColor: getTypeColor(type) }}
                     >
                       {getTypeNameJp(type)}
                     </span>
                   ))}
                 </div>
                 <div className="text-sm font-mono text-gray-300 mt-1">
                   H{attacker.pokemon.baseStats.hp} A{attacker.pokemon.baseStats.attack} B{attacker.pokemon.baseStats.defense} C{attacker.pokemon.baseStats.specialAttack} D{attacker.pokemon.baseStats.specialDefense} S{attacker.pokemon.baseStats.speed}
                 </div>
               </div>
             </div>
          )}

          <PokemonSelect pokemon={pokemonList} selected={attacker.pokemon} onChange={(p) => handlePokemonChange(p, index)} label="ポケモン" disabled={!attacker.isEnabled}/>

          <div className="my-4">
            <MoveSelect
                moves={moves}
                selected={attacker.move}
                onChange={(m) => handleMoveChange(m, index)}
                label="わざ"
                onToggleTera={() => handleToggleTera(index)} // ★ 変更
                currentAttackerTeraType={attacker.teraType} // ★ 追加
                isStellar={attacker.isStellar}
                onToggleStellar={() => handleToggleStellar(index)} // ★ 変更
                disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          </div>

          {attacker.move && typeof attacker.move.multihit === 'number' && attacker.move.multihit > 1 && attacker.isEnabled && attacker.pokemon && (
            <HitCountSelect
              label="ヒット回数"
              maxHits={attacker.move.multihit} // 技データのmultihit値を直接使用
              selectedCount={attacker.selectedHitCount}
              onChange={(count) => handleHitCountChange(count, index)}
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          )}
          {attacker.move && attacker.move.multihit === '2-5' && attacker.isEnabled && attacker.pokemon && (
             <HitCountSelect
              label="ヒット回数 (2-5回)"
              maxHits={5} // 2-5回技は最大5ヒット
              minHits={2} // 最小2ヒット
              selectedCount={attacker.selectedHitCount}
              onChange={(count) => handleHitCountChange(count, index)}
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          )}


          {attacker.move && attacker.move.uiOption && attacker.isEnabled && attacker.pokemon && (
            <div className="mt-3 p-3 bg-gray-700/50 rounded-md">
              {attacker.move.uiOption.type === 'checkbox' && (
                <label htmlFor={`move-option-${index}-${attacker.move.id}`} className="flex items-center text-sm text-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    id={`move-option-${index}-${attacker.move.id}`}
                    checked={!!attacker.moveUiOptionStates?.[attacker.move.uiOption.key]}
                    onChange={(e) => {
                      if (!attacker.move || !attacker.move.uiOption) return;
                      const key = attacker.move.uiOption.key;
                      const newUiOptionStates = {
                        ...(attacker.moveUiOptionStates || {}),
                        [key]: e.target.checked,
                      };
                      updateAttackerState(index, { moveUiOptionStates: newUiOptionStates });
                    }}
                    className="w-4 h-4 rounded border-gray-500 bg-gray-800 text-blue-500 mr-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                  {attacker.move.uiOption.label}
                </label>
              )}
            </div>
          )}


          {showTeraBlastSettings && attacker.move && (
            <TeraBlastOptions
                teraType={attacker.teraType}
                isStellar={attacker.isStellar}
                userSelectedCategory={attacker.teraBlastUserSelectedCategory}
                determinedCategory={attacker.teraBlastDeterminedCategory}
                isEnabled={attacker.isEnabled}
                onTeraTypeChange={(type) => { // TeraBlastOptions内でテラスタイプを変更する場合のコールバック
                    updateAttackerState(index, { teraType: type, isStellar: type === null ? attacker.isStellar : false });
                }}
                onCategorySelect={(cat) => handleTeraBlastCategorySelect(cat, index)}
            />
          )}

          {hpDependentInputsToShow && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">威力計算用HP設定</h4>
              {hpDependentInputsToShow}
              {hpEvSliderToShow}
            </div>
          )}

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">能力値設定</h4>
            {statInputsSection}
            {defenderAttackControlsToShow}
          </div>

          <div className="mt-6">
            <ItemSelect items={items} selected={attacker.item} onChange={(i) => handleItemChange(i, index)} label="持ち物" side="attacker" disabled={!attacker.isEnabled || !attacker.pokemon} />
          </div>

          <div className="mt-6">
            <AbilitySelect
              abilities={abilities}
              selected={attacker.ability}
              onChange={(a) => handleAbilityChange(a, index)}
              label="特性"
              side="attacker"
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          </div>
          {isProtosynthesisSelected && (
            <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">こだいかっせい 設定</h5>
              <div className="mb-2">
                <label htmlFor={`proto-stat-${index}`} className="block text-xs font-medium text-gray-300 mb-1">上昇する能力:</label>
                <select
                  id={`proto-stat-${index}`}
                  value={attacker.protosynthesisBoostedStat || ''}
                  onChange={(e) => handleProtosynthesisBoostedStatChange(e.target.value as ProtosynthesisBoostTarget | '', index)}
                  className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  disabled={!attacker.isEnabled}
                >
                  <option value="" disabled>選択してください</option>
                  <option value="attack">こうげき</option>
                  <option value="defense">ぼうぎょ</option>
                  <option value="specialAttack">とくこう</option>
                  <option value="specialDefense">とくぼう</option>
                  <option value="speed">すばやさ</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`proto-manual-${index}`}
                  checked={attacker.protosynthesisManualTrigger}
                  onChange={(e) => handleProtosynthesisManualTriggerChange(e.target.checked, index)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700"
                  disabled={!attacker.isEnabled}
                />
                <label htmlFor={`proto-manual-${index}`} className="text-xs text-gray-300">手動で発動させる</label>
              </div>
            </div>
          )}
          {isQuarkDriveSelected && (
            <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <h5 className="text-sm font-semibold text-purple-400 mb-2">クォークチャージ 設定</h5>
              <div className="mb-2">
                <label htmlFor={`quark-stat-${index}`} className="block text-xs font-medium text-gray-300 mb-1">上昇する能力:</label>
                <select
                  id={`quark-stat-${index}`}
                  value={attacker.quarkDriveBoostedStat || ''}
                  onChange={(e) => handleQuarkDriveBoostedStatChange(e.target.value as ProtosynthesisBoostTarget | '', index)}
                  className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  disabled={!attacker.isEnabled}
                >
                  <option value="" disabled>選択してください</option>
                  <option value="attack">こうげき</option>
                  <option value="defense">ぼうぎょ</option>
                  <option value="specialAttack">とくこう</option>
                  <option value="specialDefense">とくぼう</option>
                  <option value="speed">すばやさ</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`quark-manual-${index}`}
                  checked={attacker.quarkDriveManualTrigger}
                  onChange={(e) => handleQuarkDriveManualTriggerChange(e.target.checked, index)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700"
                  disabled={!attacker.isEnabled}
                />
                <label htmlFor={`quark-manual-${index}`} className="text-xs text-gray-300">手動で発動させる</label>
              </div>
            </div>
          )}

           <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`burn-${index}-${attacker.pokemon?.id || 'default'}`}
                checked={attacker.isBurned}
                onChange={(e) => handleBurnChange(e.target.checked, index)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
              <label htmlFor={`burn-${index}-${attacker.pokemon?.id || 'default'}`} className="text-sm text-white">火傷</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`helpingHand-${index}-${attacker.pokemon?.id || 'default'}`}
                checked={attacker.hasHelpingHand}
                onChange={(e) => handleHelpingHandChange(e.target.checked, index)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
              <label htmlFor={`helpingHand-${index}-${attacker.pokemon?.id || 'default'}`} className="text-sm text-white">てだすけ</label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 p-1 rounded-lg shadow-lg">

      {attackers.map((attacker, index) => renderAttackerSection(attacker, index))}
      {attackers.length < 2 && (
        <div className="mt-4 flex justify-end">
          <button onClick={addAttacker} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors text-sm">
            <Plus className="h-4 w-4" /> ポケモンを追加
          </button>
        </div>
      )}
    </div>
  );
};

export default AttackerPanel;