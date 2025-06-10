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

// ユーティリティ関数
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

// 初期状態を生成する関数
const createInitialAttackerState = (): AttackerState => {
  const initialPokemon = pokedex.find(p => p.name === "カイリュー") || pokedex[0];
  const initialMove = moves.find(m => m.name === "しんそく") || moves[0];
  const initialAbility = abilities.find(a => a.nameEn.toLowerCase() === initialPokemon.abilities[0].toLowerCase()) || null;

  const createStat = (base: number, ev: number = 0): StatCalculation => {
    const final = calculateBaseStatValue(base, 31, ev, 50, 1.0);
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

// ストアの型定義
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

export const useAttackerStore = create<AttackerStore>((set, get) => {
  const store: AttackerStore = {
    attackers: [createInitialAttackerState()],

    setAttackers: (attackers) => set({ attackers }),

    updateAttacker: (index, updates) => {
      set(state => {
        const newAttackers = [...state.attackers];
        if (newAttackers[index]) {
          newAttackers[index] = { ...newAttackers[index], ...updates };
        }
        return { attackers: newAttackers };
      });
      if (updates.teraType !== undefined || updates.isStellar !== undefined || updates.teraBlastUserSelectedCategory !== undefined || updates.ability !== undefined) {
          get().recalculateAll(index);
      }
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
      get().updateAttacker(index, { [`${statField}InputValue`]: value });
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
          const final = calculateBaseStatValue(base, 31, ev, 50, 1.0);
          return { base, iv: 31, ev, nature: 1.0, rank: 0, final };
      };
      const attackStat = createStat(pokemon.baseStats.attack, 252);
      const specialAttackStat = createStat(pokemon.baseStats.specialAttack, 252);
      const defenseStat = createStat(pokemon.baseStats.defense);
      const speedStat = createStat(pokemon.baseStats.speed);
      const hpEv = 0;
      const actualMaxHp = calculateHp(pokemon.baseStats.hp, 31, hpEv, 50);

      const updates: Partial<AttackerState> = {
          pokemon, ability: initialAbility,
          attackStat, specialAttackStat, defenseStat, speedStat,
          attackInputValue: attackStat.final.toString(),
          specialAttackInputValue: specialAttackStat.final.toString(),
          defenseInputValue: defenseStat.final.toString(),
          speedInputValue: speedStat.final.toString(),
          hpEv, actualMaxHp, currentHp: actualMaxHp,
          move: null, item: null, teraType: null, loadedTeraType: null, isStellar: false, 
          moveUiOptionStates: {}, abilityUiFlags: {}, loadedMoves: null,
          protosynthesisBoostedStat: initialAbility?.id === 'protosynthesis' ? 'attack' : null,
          quarkDriveBoostedStat: initialAbility?.id === 'quark_drive' ? 'attack' : null,
      };
      get().updateAttacker(index, updates);
      get().recalculateAll(index);
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
      get().recalculateAll(index);
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
      const pokemon = pokedex.find(p => p.id === snapshot.pokemonId);
      const move = moves.find(m => m.id === snapshot.moveId);
      const item = items.find(i => i.id === snapshot.itemId) || null;
      const ability = abilities.find(a => a.id === snapshot.abilityId) || null;
      if (!pokemon || !move) { alert("ログの復元に必要な攻撃側のデータが見つかりませんでした。"); return; }
      const restoreStat = (snap: StatCalculationSnapshot, base: number): StatCalculation => {
          const newStat: StatCalculation = { base, ...snap, final: 0 };
          newStat.final = calculateFinalStatWithRank(base, snap.iv, snap.ev, 50, snap.nature, snap.rank);
          return newStat;
      };
      const attackStat = restoreStat(snapshot.attackStat, pokemon.baseStats.attack);
      const specialAttackStat = restoreStat(snapshot.specialAttackStat, pokemon.baseStats.specialAttack);
      const defenseStat = restoreStat(snapshot.defenseStat, pokemon.baseStats.defense);
      const speedStat = restoreStat(snapshot.speedStat, pokemon.baseStats.speed);
      const actualMaxHp = calculateHp(pokemon.baseStats.hp, snapshot.hpEv, snapshot.hpEv, 50);
      const newAttackerState: AttackerState = {
          pokemon, move, item, ability,
          attackStat, specialAttackStat, defenseStat, speedStat,
          attackInputValue: attackStat.final.toString(), specialAttackInputValue: specialAttackStat.final.toString(),
          defenseInputValue: defenseStat.final.toString(), speedInputValue: speedStat.final.toString(),
          hpEv: snapshot.hpEv, currentHp: Math.min(snapshot.currentHp, actualMaxHp), actualMaxHp: actualMaxHp,
          teraType: snapshot.teraType, loadedTeraType: snapshot.loadedTeraType, isStellar: snapshot.isStellar,
          isBurned: snapshot.isBurned, hasHelpingHand: snapshot.hasHelpingHand, hasFlowerGift: snapshot.hasFlowerGift,
          isEnabled: true, teraBlastUserSelectedCategory: snapshot.teraBlastUserSelectedCategory,
          starstormDeterminedCategory: snapshot.starstormDeterminedCategory, photonGeyserDeterminedCategory: snapshot.photonGeyserDeterminedCategory,
          selectedHitCount: snapshot.selectedHitCount, protosynthesisBoostedStat: snapshot.protosynthesisBoostedStat,
          protosynthesisManualTrigger: snapshot.protosynthesisManualTrigger, quarkDriveBoostedStat: snapshot.quarkDriveBoostedStat,
          quarkDriveManualTrigger: snapshot.quarkDriveManualTrigger, moveUiOptionStates: snapshot.moveUiOptionStates || {},
          abilityUiFlags: snapshot.abilityUiFlags || {}, effectiveMove: null, teraBlastDeterminedType: null,
          teraBlastDeterminedCategory: null, loadedMoves: null,
      };
      set(state => {
          const newAttackers = [...state.attackers];
          newAttackers[0] = newAttackerState;
          if (newAttackers.length > 1) {
              const defaultState = createInitialAttackerState();
              newAttackers[1] = { ...defaultState, isEnabled: false };
          }
          return { attackers: newAttackers };
      });
      get().recalculateAll(0);
    },

    loadFromTeamMember: (member) => {
      const { pokemon, item, ability, moves, evs, ivs, nature, level } = member;
      const natureDetails = nature || undefined;

      const restoreStat = (base: number, ev: number, iv: number, statField: 'attack' | 'specialAttack' | 'defense' | 'speed'): StatCalculation => {
        const natureMod = getNatureModifierValueFromDetails(natureDetails, statField);
        const newStat = { base, ev, iv, nature: natureMod, rank: 0, final: 0 };
        newStat.final = calculateFinalStatWithRank(base, iv, ev, level, natureMod, 0);
        return newStat;
      };

      const attackStat = restoreStat(pokemon.baseStats.attack, evs.attack, ivs.attack, 'attack');
      const specialAttackStat = restoreStat(pokemon.baseStats.specialAttack, evs.specialAttack, ivs.specialAttack, 'specialAttack');
      const defenseStat = restoreStat(pokemon.baseStats.defense, evs.defense, ivs.defense, 'defense');
      const speedStat = restoreStat(pokemon.baseStats.speed, evs.speed, ivs.speed, 'speed');
      const actualMaxHp = calculateHp(pokemon.baseStats.hp, ivs.hp, evs.hp, level);

      const newAttackerState: AttackerState = {
          pokemon, item, ability,
          move: moves[0] || null,
          attackStat, specialAttackStat, defenseStat, speedStat,
          hpEv: evs.hp,
          actualMaxHp,
          currentHp: actualMaxHp,
          attackInputValue: attackStat.final.toString(),
          specialAttackInputValue: specialAttackStat.final.toString(),
          defenseInputValue: defenseStat.final.toString(),
          speedInputValue: speedStat.final.toString(),
          teraType: member.teraType,
          loadedTeraType: member.teraType,
          isStellar: false, isBurned: false, hasHelpingHand: false, hasFlowerGift: false, isEnabled: true,
          effectiveMove: null, teraBlastDeterminedType: null, teraBlastDeterminedCategory: null,
          starstormDeterminedCategory: null, photonGeyserDeterminedCategory: null, selectedHitCount: null,
          protosynthesisBoostedStat: null, protosynthesisManualTrigger: false, quarkDriveBoostedStat: null, quarkDriveManualTrigger: false,
          moveUiOptionStates: {}, abilityUiFlags: {}, loadedMoves: moves,
      };

      set(state => ({ attackers: [newAttackerState, ...state.attackers.slice(1)] }));
      get().recalculateAll(0);
    },
  };

  useGlobalStateStore.subscribe(() => get().attackers.forEach((_, index) => get().recalculateAll(index)));
  useDefenderStore.subscribe(() => get().attackers.forEach((_, index) => get().recalculateAll(index)));

  return store;
});