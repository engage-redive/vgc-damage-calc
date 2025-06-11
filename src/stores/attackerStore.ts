// src/stores/attackerStore.ts
import { create } from 'zustand';
import {
  AttackerState, Pokemon, Move, Item, Ability, StatCalculation, NatureModifier,
  PokemonType, TeraBurstEffectiveType, MoveCategory, ProtosynthesisBoostTarget,
  AttackerStateSnapshotForLog, StatCalculationSnapshot, MoveDynamicContext, Nature, TeamMember, DefenderState,
} from '../types';
import { pokedex } from '../data/pokedex';
import { moves } from '../data/moves';
import { items } from '../data/items';
import { abilities } from '../data/abilities';
import { natures } from '../data/natures';
import { getEffectiveMoveProperties } from '../utils/moveEffects';
import { useGlobalStateStore } from './globalStateStore';
import { useDefenderStore } from './defenderStore';

// ユーティリティ関数 (変更なし)
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
  // ▼▼▼ ここから追加/変更 ▼▼▼
  const specialDefenseStat = createStat(initialPokemon.baseStats.specialDefense); // 特防も初期化
  // ▲▲▲ ここまで追加/変更 ▲▲▲
  const speedStat = createStat(initialPokemon.baseStats.speed);
  const hpEv = 0;
  const actualMaxHp = calculateHp(initialPokemon.baseStats.hp, 31, hpEv, 50);

  return {
    pokemon: initialPokemon, move: initialMove, effectiveMove: null, item: null, ability: initialAbility,
    attackStat, specialAttackStat, defenseStat, specialDefenseStat, speedStat,
    attackInputValue: attackStat.final.toString(),
    specialAttackInputValue: specialAttackStat.final.toString(),
    defenseInputValue: defenseStat.final.toString(),
    // ▼▼▼ ここから追加/変更 ▼▼▼
    specialDefenseInputValue: specialDefenseStat.final.toString(), // 特防入力値も初期化
    // ▲▲▲ ここまで追加/変更 ▲▲▲
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
  // ▼▼▼ statFieldの型に 'specialDefense' を追加 ▼▼▼
  updateStat: (index: number, statField: 'attack' | 'specialAttack' | 'defense' | 'specialDefense' | 'speed', updates: Partial<StatCalculation>) => void;
  updateStatValue: (index: number, statField: 'attack' | 'specialAttack' | 'defense' | 'specialDefense' | 'speed', value: string) => void;
  updateStatFromInput: (index: number, statField: 'attack' | 'specialAttack' | 'defense' | 'specialDefense' | 'speed') => void;
  // ▲▲▲ ここまで修正 ▲▲▲
  setPokemon: (index: number, pokemon: Pokemon | null) => void;
  setMove: (index: number, move: Move | null) => void;
  recalculateAll: (index: number) => void;
  loadFromSnapshot: (snapshot: AttackerStateSnapshotForLog) => void;
  loadFromTeamMember: (member: TeamMember) => void;
  swapWithDefender: (defenderState: DefenderState) => void;
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

        if (updates.ability !== undefined && updates.ability?.id !== currentAttacker.ability?.id) {
          const newAbilityId = updates.ability?.id;
          
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
      // ▼▼▼ ここから追加/変更 ▼▼▼
      const specialDefenseStat = createStat(pokemon.baseStats.specialDefense, 0); // 特防も初期化
      // ▲▲▲ ここまで追加/変更 ▲▲▲
      const speedStat = createStat(pokemon.baseStats.speed, 0);
      const hpEv = 0;
      const actualMaxHp = calculateHp(pokemon.baseStats.hp, 31, hpEv, 50);

      get().updateAttacker(index, {
          pokemon, ability: initialAbility,
          attackStat, specialAttackStat, defenseStat, specialDefenseStat, speedStat,
          attackInputValue: attackStat.final.toString(),
          specialAttackInputValue: specialAttackStat.final.toString(),
          defenseInputValue: defenseStat.final.toString(),
          // ▼▼▼ ここから追加/変更 ▼▼▼
          specialDefenseInputValue: specialDefenseStat.final.toString(), // 特防入力値も初期化
          // ▲▲▲ ここまで追加/変更 ▲▲▲
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
      const pokemon = pokedex.find(p => String(p.id) === String(snapshot.pokemonId));
      const move = moves.find(m => m.id === snapshot.moveId) || null;
      const item = items.find(i => i.id === snapshot.itemId) || null;
      const ability = abilities.find(a => a.id === snapshot.abilityId) || null;

      if (!pokemon) {
          console.error("Attacker Pokemon not found from snapshot for ID:", snapshot.pokemonId);
          alert("ログの復元に必要な攻撃側のポケモンデータが見つかりませんでした。");
          return;
      }

      const restoreStat = (snap: StatCalculationSnapshot, base: number): StatCalculation => {
          const newStat = { base, iv: snap.iv, ev: snap.ev, nature: snap.nature, rank: snap.rank, final: 0 };
          newStat.final = calculateFinalStatWithRank(base, snap.iv, snap.ev, 50, snap.nature, snap.rank);
          return newStat;
      };

      const attackStat = restoreStat(snapshot.attackStat, pokemon.baseStats.attack);
      const specialAttackStat = restoreStat(snapshot.specialAttackStat, pokemon.baseStats.specialAttack);
      const defenseStat = restoreStat(snapshot.defenseStat, pokemon.baseStats.defense);
      const speedStat = restoreStat(snapshot.speedStat, pokemon.baseStats.speed);
      const actualMaxHp = calculateHp(pokemon.baseStats.hp, 31, snapshot.hpEv, 50);

      const newAttackerState: AttackerState = {
          pokemon, move, item, ability,
          attackStat, specialAttackStat, defenseStat, speedStat,
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
          hasFlowerGift: snapshot.hasFlowerGift || false,
          isEnabled: true,
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
          effectiveMove: null,
          teraBlastDeterminedType: null,
          teraBlastDeterminedCategory: null,
          loadedMoves: null,
      };
      
      set({ attackers: [newAttackerState] });
      get().recalculateAll(0);
  },

  loadFromTeamMember: (member) => {
    const { pokemon, item, ability, teraType, evs, ivs, nature, moves: loadedMoves } = member;
    const natureDetails = nature || undefined;

    const restoreStat = (base: number, ev: number, iv: number, statField: 'attack' | 'specialAttack' | 'defense' | 'specialDefense' | 'speed'): StatCalculation => {
      const natureMod = getNatureModifierValueFromDetails(natureDetails, statField);
      const newStat = { base, ev, iv, nature: natureMod, rank: 0, final: 0 };
      newStat.final = calculateFinalStatWithRank(base, iv, ev, 50, natureMod, 0);
      return newStat;
    };
    
    const attackStat = restoreStat(pokemon.baseStats.attack, evs.attack, ivs.attack, 'attack');
    const specialAttackStat = restoreStat(pokemon.baseStats.specialAttack, evs.specialAttack, ivs.specialAttack, 'specialAttack');
    const defenseStat = restoreStat(pokemon.baseStats.defense, evs.defense, ivs.defense, 'defense');
    // ▼▼▼ ここから追加/変更 ▼▼▼
    const specialDefenseStat = restoreStat(pokemon.baseStats.specialDefense, evs.specialDefense, ivs.specialDefense, 'specialDefense'); // 特防も復元
    // ▲▲▲ ここまで追加/変更 ▲▲▲
    const speedStat = restoreStat(pokemon.baseStats.speed, evs.speed, ivs.speed, 'speed');
    const actualMaxHp = calculateHp(pokemon.baseStats.hp, ivs.hp, evs.hp, 50);

    const newState: Partial<AttackerState> = {
        pokemon,
        item,
        ability,
        loadedMoves: loadedMoves || [null, null, null, null],
        move: loadedMoves?.[0] || null,
        teraType,
        loadedTeraType: teraType,
        isStellar: false,
        hpEv: evs.hp,
        actualMaxHp,
        currentHp: actualMaxHp,
        attackStat,
        specialAttackStat,
        defenseStat,
        specialDefenseStat, // 特防も追加
        speedStat,
        attackInputValue: attackStat.final.toString(),
        specialAttackInputValue: specialAttackStat.final.toString(),
        defenseInputValue: defenseStat.final.toString(),
        specialDefenseInputValue: specialDefenseStat.final.toString(), // 特防入力値も追加
        speedInputValue: speedStat.final.toString(),
        isBurned: false,
        hasHelpingHand: false,
        selectedHitCount: null,
        moveUiOptionStates: {},
        abilityUiFlags: {},
    };

    set(state => {
      const newAttackers = [...state.attackers];
      newAttackers[0] = { ...state.attackers[0], ...newState };
      return { attackers: newAttackers };
    });
    get().recalculateAll(0);
  },

  // ▼▼▼ この関数を全面的に修正 ▼▼▼
  swapWithDefender: (defenderState) => {
    if (!defenderState.pokemon) return;

    // 防御側の状態をまるごと攻撃側の状態として設定
    const { 
      pokemon, item, ability, teraType, isStellar, isBurned, hpStat,
      attackStat, specialAttackStat, defenseStat, specialDefenseStat, speedStat,
      attackInputValue, specialAttackInputValue, defenseInputValue, specialDefenseInputValue, speedInputValue, // InputValueも取得
      hasFlowerGift, protosynthesisBoostedStat, protosynthesisManualTrigger,
      quarkDriveBoostedStat, quarkDriveManualTrigger
    } = defenderState;
    
    const attackerIndex = 0;
    const currentAttacker = get().attackers[attackerIndex];
    const actualMaxHp = calculateHp(pokemon.baseStats.hp, hpStat.iv, hpStat.ev, 50);

    const updatedAttacker: AttackerState = {
        ...currentAttacker,
        pokemon, item, ability, teraType, isStellar, isBurned, hasFlowerGift,
        move: null,
        loadedMoves: null,
        effectiveMove: null,
        hpEv: hpStat.ev,
        actualMaxHp,
        currentHp: actualMaxHp,

        // ▼▼▼ ここからInputValueを直接引き継ぐように修正 ▼▼▼
        attackStat,
        attackInputValue,
        specialAttackStat,
        specialAttackInputValue,
        defenseStat,
        defenseInputValue,
        specialDefenseStat,
        specialDefenseInputValue,
        speedStat,
        speedInputValue,
        // ▲▲▲ ここまで修正 ▲▲▲
        
        hasHelpingHand: false,
        protosynthesisBoostedStat,
        protosynthesisManualTrigger,
        quarkDriveBoostedStat,
        quarkDriveManualTrigger,
        moveUiOptionStates: {},
        abilityUiFlags: {},
        teraBlastDeterminedCategory: null,
        teraBlastDeterminedType: null,
        starstormDeterminedCategory: null,
        photonGeyserDeterminedCategory: null,
        selectedHitCount: null,
    };

    set(state => {
        const newAttackers = [...state.attackers];
        newAttackers[attackerIndex] = updatedAttacker;
        return { attackers: newAttackers };
    });

    get().recalculateAll(attackerIndex);
  },
}));

useGlobalStateStore.subscribe(() => useAttackerStore.getState().attackers.forEach((_, index) => useAttackerStore.getState().recalculateAll(index)));
useDefenderStore.subscribe(() => useAttackerStore.getState().attackers.forEach((_, index) => useAttackerStore.getState().recalculateAll(index)));