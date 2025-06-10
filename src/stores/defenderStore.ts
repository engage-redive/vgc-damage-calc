// src/stores/defenderStore.ts
import { create } from 'zustand';
import {
  DefenderState,
  Pokemon,
  Item,
  Ability,
  StatCalculation,
  NatureModifier,
  PokemonType,
  ProtosynthesisBoostTarget,
  DefenderStateSnapshotForLog,
  StatCalculationSnapshot,
  Nature,
  TeamMember,
} from '../types';
import { pokedex } from '../data/pokedex';
import { items } from '../data/items';
import { abilities } from '../data/abilities';
import { natures } from '../data/natures';
import { useGlobalStateStore } from './globalStateStore';

// ユーティリティ関数
const calculateStat = (base: number, iv: number, ev: number, level: number, nature: NatureModifier, isHp: boolean, rank: number = 0): number => {
    let finalStat: number;
    if (isHp) {
        if (base === 1) return 1;
        finalStat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
    } else {
        let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
        stat = Math.floor(stat * nature);
        if (rank !== 0) {
            const rankMultiplier = rank > 0 ? (2 + rank) / 2 : 2 / (2 - rank);
            stat = Math.floor(stat * rankMultiplier);
        }
        finalStat = stat;
    }
    return Math.max(1, finalStat);
};

const findClosestEv = (target: number, base: number, iv: number, nature: NatureModifier, isHp: boolean, rank: number = 0): number => {
    if (base <= 0 || target <= 0) return 0;
    if (isHp && base === 1) return 0;

    const statAt0 = calculateStat(base, iv, 0, 50, nature, isHp, rank);
    if (target <= statAt0) return 0;
    const statAt252 = calculateStat(base, iv, 252, 50, nature, isHp, rank);
    if (target >= statAt252) return 252;
    
    let closestEv = 0;
    let smallestDiff = Infinity;
    for (let ev = 0; ev <= 252; ev += 4) {
      const calcStat = calculateStat(base, iv, ev, 50, nature, isHp, rank);
      const diff = Math.abs(calcStat - target);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestEv = ev;
      }
    }
    return closestEv;
};

const getNatureModifierValueFromDetails = (natureDetails: Nature | undefined, statField: 'attack' | 'defense' | 'specialDefense' | 'speed'): NatureModifier => {
    if (!natureDetails) return 1.0;
    if (natureDetails.increasedStat === statField) return 1.1;
    if (natureDetails.decreasedStat === statField) return 0.9;
    return 1.0;
};

// 初期状態
const createInitialDefenderState = (): DefenderState => {
  const initialPokemon = pokedex.find(p => p.name === "カイリュー") || pokedex[0];
  const initialAbility = abilities.find(a => a.nameEn.toLowerCase() === initialPokemon.abilities[0].toLowerCase()) || null;

  const createStat = (base: number, isHp = false): StatCalculation => {
    const final = calculateStat(base, 31, 0, 50, 1.0, isHp);
    return { base, iv: 31, ev: 0, nature: 1.0, rank: 0, final };
  };

  const hpStat = createStat(initialPokemon.baseStats.hp, true);
  const defenseStat = createStat(initialPokemon.baseStats.defense);
  const specialDefenseStat = createStat(initialPokemon.baseStats.specialDefense);
  const attackStat = createStat(initialPokemon.baseStats.attack);
  const speedStat = createStat(initialPokemon.baseStats.speed);

  return {
    pokemon: initialPokemon,
    item: null, ability: initialAbility,
    hpStat, defenseStat, specialDefenseStat, attackStat, speedStat,
    hpInputValue: hpStat.final.toString(),
    defenseInputValue: defenseStat.final.toString(),
    specialDefenseInputValue: specialDefenseStat.final.toString(),
    speedInputValue: speedStat.final.toString(),
    hpEv: 0, actualMaxHp: hpStat.final,
    teraType: null, isStellar: false, isBurned: false, hasFlowerGift: false, isEnabled: true,
    protosynthesisBoostedStat: initialAbility?.id === 'protosynthesis' ? 'defense' : null,
    protosynthesisManualTrigger: false,
    quarkDriveBoostedStat: initialAbility?.id === 'quark_drive' ? 'defense' : null,
    quarkDriveManualTrigger: false,
  };
};

// ストアの型定義
interface DefenderStore extends DefenderState {
  defender2Item: Item | null;
  defender2Ability: Ability | null;
  userModifiedTypes: [PokemonType, PokemonType?] | null;
  setDefenderState: (updates: Partial<DefenderState>) => void;
  setPokemon: (pokemon: Pokemon | null) => void;
  updateStat: (statField: 'hp' | 'defense' | 'specialDefense' | 'attack' | 'speed', updates: Partial<StatCalculation>) => void;
  updateStatValue: (statField: 'hp' | 'defense' | 'specialDefense' | 'speed', value: string) => void;
  updateStatFromInput: (statField: 'hp' | 'defense' | 'specialDefense' | 'speed') => void;
  setDefender2Item: (item: Item | null) => void;
  setDefender2Ability: (ability: Ability | null) => void;
  setUserModifiedTypes: (types: [PokemonType, PokemonType?] | null) => void;
  loadFromSnapshot: (snapshot: DefenderStateSnapshotForLog) => void;
  loadFromTeamMember: (member: TeamMember) => void;
}

export const useDefenderStore = create<DefenderStore>((set, get) => ({
  ...createInitialDefenderState(),
  defender2Item: null,
  defender2Ability: null,
  userModifiedTypes: null,

  setDefenderState: (updates) => set(updates),

  setPokemon: (pokemon) => {
    if (!pokemon) {
      set({ pokemon: null, item: null, ability: null, userModifiedTypes: null });
      return;
    }
    const initialAbility = abilities.find(a => a.nameEn.toLowerCase() === pokemon.abilities[0].toLowerCase()) || null;
    const createStat = (base: number, isHp = false): StatCalculation => {
        const final = calculateStat(base, 31, 0, 50, 1.0, isHp);
        return { base, iv: 31, ev: 0, nature: 1.0, rank: 0, final };
    };
    const hpStat = createStat(pokemon.baseStats.hp, true);
    const defenseStat = createStat(pokemon.baseStats.defense);
    const specialDefenseStat = createStat(pokemon.baseStats.specialDefense);
    const attackStat = createStat(pokemon.baseStats.attack);
    const speedStat = createStat(pokemon.baseStats.speed);
    
    set({
      pokemon, ability: initialAbility, item: null, teraType: null,
      hpStat, defenseStat, specialDefenseStat, attackStat, speedStat,
      hpInputValue: hpStat.final.toString(),
      defenseInputValue: defenseStat.final.toString(),
      specialDefenseInputValue: specialDefenseStat.final.toString(),
      speedInputValue: speedStat.final.toString(),
      hpEv: 0, actualMaxHp: hpStat.final, userModifiedTypes: null,
      protosynthesisBoostedStat: initialAbility?.id === 'protosynthesis' ? 'defense' : null,
      quarkDriveBoostedStat: initialAbility?.id === 'quark_drive' ? 'defense' : null,
    });
    useGlobalStateStore.getState().setDefenderIsTerastallized(false);
  },
  
  updateStat: (statField, updates) => {
    set(state => {
      if (!state.pokemon) return state;
      const statKey = `${statField}Stat` as const;
      const newStat = { ...state[statKey], ...updates };
      newStat.final = calculateStat(newStat.base, newStat.iv, newStat.ev, 50, newStat.nature, statField === 'hp', newStat.rank);
      const updatePayload: Partial<DefenderStore> = { [statKey]: newStat, [`${statField}InputValue`]: newStat.final.toString() };
      if (statField === 'hp') {
        updatePayload.hpEv = newStat.ev;
        updatePayload.actualMaxHp = newStat.final;
      }
      return updatePayload;
    });
  },

  updateStatValue: (statField, value) => set({ [`${statField}InputValue`]: value }),

  updateStatFromInput: (statField) => {
    set(state => {
        if (!state.pokemon) return state;
        const statKey = `${statField}Stat` as const;
        const inputValue = parseInt(state[`${statField}InputValue`], 10);
        if (isNaN(inputValue)) return { [`${statField}InputValue`]: state[statKey].final.toString() };
        
        let targetBaseValue = inputValue;
        if (statField !== 'hp') {
            const rankMultiplier = state[statKey].rank !== 0 ? (state[statKey].rank > 0 ? (2 + state[statKey].rank) / 2 : 2 / (2 - state[statKey].rank)) : 1;
            targetBaseValue = Math.round(inputValue / rankMultiplier);
        }
        const newEv = findClosestEv(targetBaseValue, state[statKey].base, state[statKey].iv, state[statKey].nature, statField === 'hp');
        const newStat = { ...state[statKey], ev: newEv };
        newStat.final = calculateStat(newStat.base, newStat.iv, newStat.ev, 50, newStat.nature, statField === 'hp', newStat.rank);
        
        const updatePayload: Partial<DefenderStore> = { [statKey]: newStat, [`${statField}InputValue`]: newStat.final.toString() };
        if (statField === 'hp') {
            updatePayload.hpEv = newEv;
            updatePayload.actualMaxHp = newStat.final;
        }
        return updatePayload;
    });
  },

  setDefender2Item: (item) => set({ defender2Item: item }),
  setDefender2Ability: (ability) => set({ defender2Ability: ability }),
  setUserModifiedTypes: (types) => set({ userModifiedTypes: types }),
  
  loadFromSnapshot: (snapshot) => {
    const pokemon = pokedex.find(p => p.id === snapshot.pokemonId);
    const item = items.find(i => i.id === snapshot.itemId) || null;
    const ability = abilities.find(a => a.id === snapshot.abilityId) || null;
    if (!pokemon) {
        alert("ログの復元に必要な防御側のデータが見つかりませんでした。");
        return;
    }

    const restoreStat = (snap: StatCalculationSnapshot, base: number, isHp = false): StatCalculation => {
        const newStat: StatCalculation = { base, ...snap, final: 0 };
        newStat.final = calculateStat(base, snap.iv, snap.ev, 50, snap.nature, isHp, snap.rank);
        return newStat;
    };

    const hpStat = restoreStat(snapshot.hpStat, pokemon.baseStats.hp, true);
    const defenseStat = restoreStat(snapshot.defenseStat, pokemon.baseStats.defense);
    const specialDefenseStat = restoreStat(snapshot.specialDefenseStat, pokemon.baseStats.specialDefense);
    const attackStat = restoreStat(snapshot.attackStat, pokemon.baseStats.attack);
    const speedStat = restoreStat(snapshot.speedStat, pokemon.baseStats.speed);

    set({
        pokemon, item, ability,
        hpStat, defenseStat, specialDefenseStat, attackStat, speedStat,
        hpInputValue: hpStat.final.toString(),
        defenseInputValue: defenseStat.final.toString(),
        specialDefenseInputValue: specialDefenseStat.final.toString(),
        speedInputValue: speedStat.final.toString(),
        hpEv: snapshot.hpEv,
        actualMaxHp: hpStat.final,
        teraType: snapshot.teraType,
        isStellar: snapshot.isStellar,
        isBurned: snapshot.isBurned,
        hasFlowerGift: snapshot.hasFlowerGift,
        protosynthesisBoostedStat: snapshot.protosynthesisBoostedStat,
        protosynthesisManualTrigger: snapshot.protosynthesisManualTrigger,
        quarkDriveBoostedStat: snapshot.quarkDriveBoostedStat,
        quarkDriveManualTrigger: snapshot.quarkDriveManualTrigger,
        userModifiedTypes: snapshot.userModifiedTypes
    });
  },

  loadFromTeamMember: (member) => {
    const { pokemon, item, ability, teraType, evs, ivs, nature } = member;
    const natureDetails = nature || undefined;

    const restoreStat = (base: number, ev: number, iv: number, statField: 'attack' | 'defense' | 'specialDefense' | 'speed' | 'hp', isHp = false): StatCalculation => {
      const natureMod = isHp ? 1.0 : getNatureModifierValueFromDetails(natureDetails, statField as any);
      const newStat = { base, ev, iv, nature: natureMod, rank: 0, final: 0 };
      newStat.final = calculateStat(base, iv, ev, 50, natureMod, isHp, 0);
      return newStat;
    };

    const hpStat = restoreStat(pokemon.baseStats.hp, evs.hp, ivs.hp, 'hp', true);
    const defenseStat = restoreStat(pokemon.baseStats.defense, evs.defense, ivs.defense, 'defense');
    const specialDefenseStat = restoreStat(pokemon.baseStats.specialDefense, evs.specialDefense, ivs.specialDefense, 'specialDefense');
    const attackStat = restoreStat(pokemon.baseStats.attack, evs.attack, ivs.attack, 'attack');
    const speedStat = restoreStat(pokemon.baseStats.speed, evs.speed, ivs.speed, 'speed');

    const newState: Partial<DefenderState> = {
        pokemon, item, ability, teraType,
        hpStat, defenseStat, specialDefenseStat, attackStat, speedStat,
        hpInputValue: hpStat.final.toString(),
        defenseInputValue: defenseStat.final.toString(),
        specialDefenseInputValue: specialDefenseStat.final.toString(),
        speedInputValue: speedStat.final.toString(),
        hpEv: evs.hp,
        actualMaxHp: hpStat.final,
    };
    
    set(newState);
    get().setUserModifiedTypes(null);
    useGlobalStateStore.getState().setHasReflect(false);
    useGlobalStateStore.getState().setHasLightScreen(false);
  },
}));