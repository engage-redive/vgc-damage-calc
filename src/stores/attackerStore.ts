// src/stores/attackerStore.ts
import { create } from 'zustand';
import {
  AttackerState, Pokemon, Move, Item, Ability, StatCalculation, NatureModifier,
  PokemonType, TeraBurstEffectiveType, MoveCategory, ProtosynthesisBoostTarget,
  AttackerStateSnapshotForLog, StatCalculationSnapshot, MoveDynamicContext, Nature, TeamMember,
} from '../types';
import { pokedex } from '../data/pokedex';
import { moves } from '../data/moves';
import { items } from '../data/items';
import { abilities } from '../data/abilities';
import { natures } from '../data/natures';
import { getEffectiveMoveProperties } from '../utils/moveEffects';
import { useGlobalStateStore } from './globalStateStore';
import { useDefenderStore } from './defenderStore';

// (ユーティリティ関数は変更なしのため省略)
const calculateHp = (base: number, iv: number, ev: number, level: number): number => {
  if (base <= 0) return 0;
  if (base === 1) return 1;
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
};
const calculateBaseStatValue = (base: number, iv: number, ev: number, level: number, nature: NatureModifier): number => {
  if (!base || base <= 0) return 0;
  let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
  stat = Math.floor(stat * nature);
  return stat;
};
const calculateFinalStatWithRank = (base: number, iv: number, ev: number, level: number, nature: NatureModifier, rank: number): number => {
  let baseStatVal = calculateBaseStatValue(base, iv, ev, level, nature);
  if (rank !== 0) {
    const rankMultiplier = rank > 0 ? (2 + rank) / 2 : 2 / (2 - rank);
    baseStatVal = Math.floor(baseStatVal * rankMultiplier);
  }
  return baseStatVal;
};
const findClosestEvForBaseValue = (targetBaseValue: number, pokemonSpeciesStat: number, nature: NatureModifier, level: number = 50, iv: number = 31): number => {
  if (pokemonSpeciesStat <= 0 || targetBaseValue <= 0) return 0;
  const statAt0Ev = calculateBaseStatValue(pokemonSpeciesStat, iv, 0, level, nature);
  if (targetBaseValue <= statAt0Ev) return 0;
  const statAt252Ev = calculateBaseStatValue(pokemonSpeciesStat, iv, 252, level, nature);
  if (targetBaseValue >= statAt252Ev) return 252;
  let closestEv = 0;
  let smallestDiff = Infinity;
  for (let ev = 0; ev <= 252; ev += 4) {
    const calculatedStat = calculateBaseStatValue(pokemonSpeciesStat, iv, ev, level, nature);
    const diff = Math.abs(calculatedStat - targetBaseValue);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestEv = ev;
    } else if (diff === smallestDiff) {
      closestEv = Math.min(closestEv, ev);
    }
  }
  return closestEv;
};
const getNatureModifierValueFromDetails = (natureDetails: Nature | undefined, statField: 'attack' | 'specialAttack' | 'defense' | 'speed'): NatureModifier => {
    if (!natureDetails) return 1.0;
    if (natureDetails.increasedStat === statField) return 1.1;
    if (natureDetails.decreasedStat === statField) return 0.9;
    return 1.0;
};
// (ここまでユーティリティ関数)

const createInitialAttackerState = (): AttackerState => {
  const initialPokemon = pokedex.find(p => p.name === "カイリュー") || pokedex[0];
  const initialMove = moves.find(m => m.name === "しんそく") || moves[0];
  const initialAbility = abilities.find(a => a.nameEn.toLowerCase() === initialPokemon.abilities[0].toLowerCase()) || null;

  const createStat = (base: number, ev: number = 0): StatCalculation => {
    const final = calculateFinalStatWithRank(base, 31, ev, 50, 1.0, 0);
    return { base, iv: 31, ev, nature: 1.0, rank: 0, final };
  };

  const attackStat = createStat(initialPokemon.baseStats.attack, 252);
  const specialAttackStat = createStat(initialPokemon.baseStats.specialAttack);
  const defenseStat = createStat(initialPokemon.baseStats.defense);
  const speedStat = createStat(initialPokemon.baseStats.speed);
  const hpEv = 0;
  const actualMaxHp = calculateHp(initialPokemon.baseStats.hp, 31, hpEv, 50);

  return {
    pokemon: initialPokemon, move: initialMove, effectiveMove: null, item: null, ability: initialAbility,
    attackStat, specialAttackStat, defenseStat, speedStat,
    attackInputValue: attackStat.final.toString(),
    specialAttackInputValue: specialAttackStat.final.toString(),
    defenseInputValue: defenseStat.final.toString(),
    speedInputValue: speedStat.final.toString(),
    hpEv, actualMaxHp, currentHp: actualMaxHp,
    teraType: null, loadedTeraType: null, isStellar: false, isBurned: false, hasHelpingHand: false, hasFlowerGift: false, isEnabled: true,
    teraBlastUserSelectedCategory: 'auto', teraBlastDeterminedType: null, teraBlastDeterminedCategory: null,
    starstormDeterminedCategory: null, photonGeyserDeterminedCategory: null, selectedHitCount: null,
    protosynthesisBoostedStat: initialAbility?.id === 'protosynthesis' ? 'attack' : null,
    protosynthesisManualTrigger: false,
    quarkDriveBoostedStat: initialAbility?.id === 'quark_drive' ? 'attack' : null,
    quarkDriveManualTrigger: false,
    moveUiOptionStates: {}, abilityUiFlags: {}, loadedMoves: null,
  };
};

interface AttackerStore {
  attackers: AttackerState[];
  updateAttacker: (index: number, updates: Partial<AttackerState>) => void;
  setAttackers: (attackers: AttackerState[]) => void;
  addAttacker: () => void;
  removeAttacker: (index: number) => void;
  updateStat: (index: number, statField: 'attack' | 'specialAttack' | 'defense' | 'speed', updates: Partial<StatCalculation>) => void;
  updateStatValue: (index: number, statField: 'attack' | 'specialAttack' | 'defense' | 'speed', value: string) => void;
  updateStatFromInput: (index: number, statField: 'attack' | 'specialAttack' | 'defense' | 'speed') => void;
  setPokemon: (index: number, pokemon: Pokemon | null) => void;
  setMove: (index: number, move: Move | null) => void;
  recalculateAll: (index: number) => void;
  loadFromSnapshot: (snapshot: AttackerStateSnapshotForLog) => void;
  loadFromTeamMember: (member: TeamMember) => void;
}

export const useAttackerStore = create<AttackerStore>((set, get) => ({
    attackers: [createInitialAttackerState()],

    setAttackers: (attackers) => set({ attackers }),

    updateAttacker: (index, updates) => {
      set(state => {
        const newAttackers = [...state.attackers];
        const currentAttacker = newAttackers[index];
        if (!currentAttacker) return state;

        const newAttacker = { ...currentAttacker, ...updates };

        // 特性が変更された場合の処理
        if (updates.ability !== undefined && updates.ability?.id !== currentAttacker.ability?.id) {
          const newAbilityId = updates.ability?.id;
          
          // 関連する状態をリセット
          newAttacker.abilityUiFlags = {};
          
          if (newAbilityId === 'protosynthesis') {
            newAttacker.protosynthesisBoostedStat = 'attack';
            newAttacker.protosynthesisManualTrigger = false;
          } else {
            newAttacker.protosynthesisBoostedStat = null;
            newAttacker.protosynthesisManualTrigger = false;
          }

          if (newAbilityId === 'quark_drive') {
            newAttacker.quarkDriveBoostedStat = 'attack';
            newAttacker.quarkDriveManualTrigger = false;
          } else {
            newAttacker.quarkDriveBoostedStat = null;
            newAttacker.quarkDriveManualTrigger = false;
          }
        }

        newAttackers[index] = newAttacker;
        return { attackers: newAttackers };
      });
      get().recalculateAll(index);
    },

    addAttacker: () => {
      set(state => {
        if (state.attackers.length < 2) {
          return { attackers: [...state.attackers, createInitialAttackerState()] };
        }
        return state;
      });
    },

    removeAttacker: (index) => {
      set(state => ({
        attackers: state.attackers.filter((_, i) => i !== index)
      }));
    },

    updateStat: (index, statField, updates) => {
      set(state => {
        const newAttackers = [...state.attackers];
        const attacker = newAttackers[index];
        if (!attacker || !attacker.pokemon) return state;
        const statKey = `${statField}Stat` as const;
        const newStat = { ...attacker[statKey], ...updates };
        newStat.final = calculateFinalStatWithRank(attacker.pokemon.baseStats[statField], newStat.iv, newStat.ev, 50, newStat.nature, newStat.rank);
        newAttackers[index] = { ...attacker, [statKey]: newStat, [`${statField}InputValue`]: newStat.final.toString() };
        return { attackers: newAttackers };
      });
      get().recalculateAll(index);
    },

    updateStatValue: (index, statField, value) => {
      set(state => {
        const newAttackers = [...state.attackers];
        if(newAttackers[index]) {
            newAttackers[index] = { ...newAttackers[index], [`${statField}InputValue`]: value };
        }
        return { attackers: newAttackers };
      });
    },

    updateStatFromInput: (index, statField) => {
      set(state => {
        const newAttackers = [...state.attackers];
        const attacker = newAttackers[index];
        if (!attacker || !attacker.pokemon) return state;
        const statKey = `${statField}Stat` as const;
        const inputValueKey = `${statField}InputValue` as const;
        const stat = attacker[statKey];
        const inputValueStr = attacker[inputValueKey];
        const baseStat = attacker.pokemon.baseStats[statField];
        let targetFinalValue = parseInt(inputValueStr, 10);
        let newEv = stat.ev;
        if (!isNaN(targetFinalValue) && targetFinalValue >= 0) {
          const rankMultiplier = stat.rank !== 0 ? (stat.rank > 0 ? (2 + stat.rank) / 2 : 2 / (2 - stat.rank)) : 1;
          const targetBaseStatValue = Math.floor(targetFinalValue / rankMultiplier);
          newEv = findClosestEvForBaseValue(targetBaseStatValue, baseStat, stat.nature, 50, stat.iv);
        }
        const newStat = { ...stat, ev: newEv };
        newStat.final = calculateFinalStatWithRank(baseStat, newStat.iv, newEv, 50, newStat.nature, newStat.rank);
        newAttackers[index] = { ...attacker, [statKey]: newStat, [inputValueKey]: newStat.final.toString() };
        return { attackers: newAttackers };
      });
      get().recalculateAll(index);
    },

    setPokemon: (index, pokemon) => {
      if (!pokemon) {
          get().updateAttacker(index, { pokemon: null, move: null, item: null, ability: null, loadedMoves: null });
          get().recalculateAll(index);
          return;
      }
      const initialAbility = abilities.find(a => a.nameEn.toLowerCase() === pokemon.abilities[0].toLowerCase()) || null;
      const createStat = (base: number, ev: number = 0): StatCalculation => {
          const final = calculateFinalStatWithRank(base, 31, ev, 50, 1.0, 0);
          return { base, iv: 31, ev, nature: 1.0, rank: 0, final };
      };
      const attackStat = createStat(pokemon.baseStats.attack, 252);
      const specialAttackStat = createStat(pokemon.baseStats.specialAttack, 0);
      const defenseStat = createStat(pokemon.baseStats.defense, 0);
      const speedStat = createStat(pokemon.baseStats.speed, 0);
      const hpEv = 0;
      const actualMaxHp = calculateHp(pokemon.baseStats.hp, 31, hpEv, 50);

      get().updateAttacker(index, {
          pokemon, ability: initialAbility,
          attackStat, specialAttackStat, defenseStat, speedStat,
          attackInputValue: attackStat.final.toString(),
          specialAttackInputValue: specialAttackStat.final.toString(),
          defenseInputValue: defenseStat.final.toString(),
          speedInputValue: speedStat.final.toString(),
          hpEv, actualMaxHp, currentHp: actualMaxHp,
          move: null, item: null, teraType: null, loadedTeraType: null, isStellar: false, 
          moveUiOptionStates: {}, abilityUiFlags: {}, loadedMoves: null,
      });
    },

    setMove: (index, move) => {
      const attacker = get().attackers[index];
      if (!attacker) return;
      const newMoveUiOptionStates = { ...attacker.moveUiOptionStates };
      if (move?.isRankBasedPower && newMoveUiOptionStates['rankBasedPowerValue'] === undefined) {
        newMoveUiOptionStates['rankBasedPowerValue'] = 20;
      } else if (!move?.isRankBasedPower) {
        delete newMoveUiOptionStates['rankBasedPowerValue'];
      }
      let newSelectedHitCount: number | null = null;
      if (move && typeof move.multihit === 'number') newSelectedHitCount = move.multihit;
      else if (move && move.multihit === '2-5') newSelectedHitCount = 2;
      get().updateAttacker(index, { move, moveUiOptionStates: newMoveUiOptionStates, selectedHitCount: newSelectedHitCount });
    },
    
    recalculateAll: (index) => {
      set(state => {
        const newAttackers = [...state.attackers];
        const attacker = newAttackers[index];
        if (!attacker || !attacker.pokemon || !attacker.move) {
            if(attacker && attacker.effectiveMove !== null) {
                newAttackers[index] = { ...attacker, effectiveMove: null };
                return { attackers: newAttackers };
            }
            return state;
        };
        let updatedAttacker = { ...attacker };
        const { weather, field } = useGlobalStateStore.getState();
        const { pokemon: defenderPokemon } = useDefenderStore.getState();
        const moveContext: MoveDynamicContext = { attackerPokemon: attacker.pokemon, defenderPokemon: defenderPokemon, attackerAbility: attacker.ability, weather, field, uiOptionChecked: attacker.moveUiOptionStates };
        updatedAttacker.effectiveMove = getEffectiveMoveProperties(attacker.move, moveContext);
        if (updatedAttacker.effectiveMove?.isTeraBlast) {
            let determinedCategory: MoveCategory | null = updatedAttacker.effectiveMove.category as MoveCategory;
            const isTerastallized = attacker.teraType !== null || attacker.isStellar;
            if (isTerastallized) {
                if (attacker.teraBlastUserSelectedCategory === 'physical') determinedCategory = MoveCategory.Physical;
                else if (attacker.teraBlastUserSelectedCategory === 'special') determinedCategory = MoveCategory.Special;
                else determinedCategory = attacker.attackStat.final >= attacker.specialAttackStat.final ? MoveCategory.Physical : MoveCategory.Special;
            }
            updatedAttacker.teraBlastDeterminedCategory = determinedCategory;
        }
        if (updatedAttacker.effectiveMove?.id === "terastarstorm" && attacker.pokemon?.id === "1024-s") {
            updatedAttacker.starstormDeterminedCategory = attacker.attackStat.final > attacker.specialAttackStat.final ? MoveCategory.Physical : MoveCategory.Special;
        } else {
            updatedAttacker.starstormDeterminedCategory = null;
        }
        if (updatedAttacker.effectiveMove?.id === "photongeyser") {
            updatedAttacker.photonGeyserDeterminedCategory = attacker.attackStat.final > attacker.specialAttackStat.final ? MoveCategory.Physical : MoveCategory.Special;
        } else {
            updatedAttacker.photonGeyserDeterminedCategory = null;
        }
        newAttackers[index] = updatedAttacker;
        return { attackers: newAttackers };
      });
    },
    loadFromSnapshot: (snapshot) => {
    // スナップショットのIDを元に、各データを検索
    const pokemon = pokedex.find(p => String(p.id) === String(snapshot.pokemonId));
    const move = moves.find(m => m.id === snapshot.moveId) || null;
    const item = items.find(i => i.id === snapshot.itemId) || null;
    const ability = abilities.find(a => a.id === snapshot.abilityId) || null;

    if (!pokemon) {
        console.error("Attacker Pokemon not found from snapshot for ID:", snapshot.pokemonId);
        alert("ログの復元に必要な攻撃側のポケモンデータが見つかりませんでした。");
        return;
    }

    // スナップショットから能力値を復元するヘルパー関数
    const restoreStat = (snap: StatCalculationSnapshot, base: number): StatCalculation => {
        const newStat = { base, iv: snap.iv, ev: snap.ev, nature: snap.nature, rank: snap.rank, final: 0 };
        newStat.final = calculateFinalStatWithRank(base, snap.iv, snap.ev, 50, snap.nature, snap.rank);
        return newStat;
    };

    // 各能力値を復元
    const attackStat = restoreStat(snapshot.attackStat, pokemon.baseStats.attack);
    const specialAttackStat = restoreStat(snapshot.specialAttackStat, pokemon.baseStats.specialAttack);
    const defenseStat = restoreStat(snapshot.defenseStat, pokemon.baseStats.defense);
    const speedStat = restoreStat(snapshot.speedStat, pokemon.baseStats.speed);

    // HPを再計算
    const actualMaxHp = calculateHp(pokemon.baseStats.hp, 31, snapshot.hpEv, 50);

    // スナップショットを元に、新しいAttackerStateオブジェクトを完全に再構築
    const newAttackerState: AttackerState = {
        pokemon,
        move,
        item,
        ability,
        attackStat,
        specialAttackStat,
        defenseStat,
        speedStat,
        attackInputValue: attackStat.final.toString(),
        specialAttackInputValue: specialAttackStat.final.toString(),
        defenseInputValue: defenseStat.final.toString(),
        speedInputValue: speedStat.final.toString(),
        hpEv: snapshot.hpEv,
        actualMaxHp,
        currentHp: snapshot.currentHp,
        teraType: snapshot.teraType,
        loadedTeraType: snapshot.loadedTeraType,
        isStellar: snapshot.isStellar,
        isBurned: snapshot.isBurned,
        hasHelpingHand: snapshot.hasHelpingHand,
        hasFlowerGift: snapshot.hasFlowerGift || false, // 念のためフォールバック
        isEnabled: true, // ロードした計算は常に有効化
        teraBlastUserSelectedCategory: snapshot.teraBlastUserSelectedCategory,
        starstormDeterminedCategory: snapshot.starstormDeterminedCategory,
        photonGeyserDeterminedCategory: snapshot.photonGeyserDeterminedCategory,
        selectedHitCount: snapshot.selectedHitCount,
        protosynthesisBoostedStat: snapshot.protosynthesisBoostedStat,
        protosynthesisManualTrigger: snapshot.protosynthesisManualTrigger,
        quarkDriveBoostedStat: snapshot.quarkDriveBoostedStat,
        quarkDriveManualTrigger: snapshot.quarkDriveManualTrigger,
        moveUiOptionStates: snapshot.moveUiOptionStates || {},
        abilityUiFlags: snapshot.abilityUiFlags || {},
        // 以下のプロパティは再計算時に設定される
        effectiveMove: null,
        teraBlastDeterminedType: null,
        teraBlastDeterminedCategory: null,
        loadedMoves: null,
    };
    
    // ストアのattackers配列を、ロードしたポケモン1体のみを含む新しい配列で上書きする
    set({ attackers: [newAttackerState] });

    // 変更をUIに反映させるために、派生ステート（effectiveMoveなど）の再計算をトリガー
    get().recalculateAll(0);
},
  loadFromTeamMember: (member) => {
    // 現在この機能は直接使用されていませんが、
    // 型エラーを防ぐためにプレースホルダーとして実装します。
    // 必要に応じて、チームメンバーから攻撃側を設定するロジックをここに記述します。
    console.log("loadFromTeamMember called with:", member);
},
// ▲▲▲ ここまで追加 ▲▲▲

})); // <-- この閉じ括弧が正しく解釈されるようになります

useGlobalStateStore.subscribe(() => useAttackerStore.getState().attackers.forEach((_, index) => useAttackerStore.getState().recalculateAll(index)));
useDefenderStore.subscribe(() => useAttackerStore.getState().attackers.forEach((_, index) => useAttackerStore.getState().recalculateAll(index)));