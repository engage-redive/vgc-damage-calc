import React, { useState, useEffect } from 'react';
import { pokedex } from './data/pokedex';
import { moves } from './data/moves';
import { items } from './data/items';
import { abilities } from './data/abilities';
import { natures } from './data/natures';
import {
    Pokemon,
    Move,
    StatCalculation,
    DamageCalculation,
    NatureModifier,
    PokemonType,
    Item,
    Ability,
    DisasterState,
    Weather,
    Field,
    Nature,
    MoveCategory,
    DefenderState,
    ProtosynthesisBoostTarget,
    AttackerState,
    TeamMemberForAttackerLoad,
    TeamMemberForDefenderLoad,
    MoveDynamicContext,
} from './types';
import { calculateStat, calculateDamage } from './utils/calculator';
import { getEffectiveMoveProperties } from './utils/moveEffects';
import AttackerPanel from './components/AttackerPanel';
import DefenderPanel from './components/DefenderPanel';
import DamageResult from './components/DamageResult';
import WeatherField from './components/WeatherField';
import TeamManager from './components/TeamManager';
import { ArrowRightLeft, Calculator, Users, Zap, Shield } from 'lucide-react';

const HP_DEPENDENT_MOVE_NAMES = ["ふんか", "しおふき"];

type TabType = 'damage' | 'team';
type MobileViewMode = 'attacker' | 'defender';

const calculateHpForApp = (base: number, iv: number, ev: number, level: number): number => {
  if (base <= 0) return 0;
  if (base === 1) return 1;
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
};

const initialPokedexPokemon = pokedex.find(p => p.name === "カイリュー") || pokedex[0];

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('damage');
    const [mobileViewMode, setMobileViewMode] = useState<MobileViewMode>('attacker');
    const [isDoubleBattle, setIsDoubleBattle] = useState(false);
    const [weather, setWeather] = useState<Weather>('none');
    const [field, setField] = useState<Field>('none');
    const [disasters, setDisasters] = useState<DisasterState>({
        sword: false, ball: false, vessel: false, talisman: false
    });
    const [hasReflect, setHasReflect] = useState(false);
    const [hasLightScreen, setHasLightScreen] = useState(false);
    const [hasFriendGuard, setHasFriendGuard] = useState(false);
    const [defenderIsTerastallized, setDefenderIsTerastallized] = useState(false);
    const [damageResults, setDamageResults] = useState<(DamageCalculation | null)[]>([]);

    const [defender2Item, setDefender2Item] = useState<Item | null>(null);
    const [defender2Ability, setDefender2Ability] = useState<Ability | null>(null);

    const initialMove = moves.find(m => m.name === "しんそく") || moves.find(m => m.id === "extremespeed") || moves[0];


    const initialAttackStatForApp: StatCalculation = {
        base: initialPokedexPokemon.baseStats.attack,
        iv: 31, ev: 0, nature: 1.0 as NatureModifier, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.attack, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialSpecialAttackStatForApp: StatCalculation = {
        base: initialPokedexPokemon.baseStats.specialAttack,
        iv: 31, ev: 0, nature: 1.0 as NatureModifier, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.specialAttack, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialDefenseStatForApp: StatCalculation = {
        base: initialPokedexPokemon.baseStats.defense,
        iv: 31, ev: 0, nature: 1.0 as NatureModifier, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.defense, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialSpeedStatForApp: StatCalculation = { 
        base: initialPokedexPokemon.baseStats.speed,
        iv: 31, ev: 0, nature: 1.0 as NatureModifier, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.speed, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialDefaultHpBase = initialPokedexPokemon.baseStats.hp || 0;
    const initialDefaultHpEv = 0;
    const initialDefaultActualMaxHp = calculateHpForApp(initialDefaultHpBase, 31, initialDefaultHpEv, 50);


    const defaultInitialAttackerState: AttackerState = {
        pokemon: initialPokedexPokemon,
        move: initialMove,
        effectiveMove: null,
        item: null,
        ability: null,
        attackStat: initialAttackStatForApp,
        specialAttackStat: initialSpecialAttackStatForApp,
        defenseStat: initialDefenseStatForApp,
        speedStat: initialSpeedStatForApp,
        attackInputValue: initialAttackStatForApp.final.toString(),
        specialAttackInputValue: initialSpecialAttackStatForApp.final.toString(),
        defenseInputValue: initialDefenseStatForApp.final.toString(),
        speedInputValue: initialSpeedStatForApp.final.toString(),
        hpEv: initialDefaultHpEv,
        actualMaxHp: initialDefaultActualMaxHp,
        currentHp: initialDefaultActualMaxHp,
        teraType: null,
        isStellar: false,
        isBurned: false,
        hasHelpingHand: false,
        hasFlowerGift: false,
        isEnabled: true,
        teraBlastUserSelectedCategory: 'auto',
        teraBlastDeterminedType: null,
        teraBlastDeterminedCategory: null,
        selectedHitCount: null,
        protosynthesisBoostedStat: null,
        protosynthesisManualTrigger: false,
        quarkDriveBoostedStat: null,
        quarkDriveManualTrigger: false,
        moveUiOptionStates: {},
    };

    const [activeAttackers, setActiveAttackers] = useState<AttackerState[]>([defaultInitialAttackerState]);

    const initialDefenderHpStat: StatCalculation = {
        base: initialPokedexPokemon.baseStats.hp, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.hp, 31, 0, 50, 1.0, true, 0, null)
    };
    const initialDefenderDefenseStat: StatCalculation = {
        base: initialPokedexPokemon.baseStats.defense, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.defense, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialDefenderSpecialDefenseStat: StatCalculation = {
        base: initialPokedexPokemon.baseStats.specialDefense, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.specialDefense, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialDefenderAttackStatForFoulPlay: StatCalculation = {
        base: initialPokedexPokemon.baseStats.attack, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.attack, 31, 0, 50, 1.0, false, 0, null)
    };
    const initialDefenderSpeedStat: StatCalculation = { 
        base: initialPokedexPokemon.baseStats.speed, iv: 31, ev: 0, nature: 1.0, rank: 0,
        final: calculateStat(initialPokedexPokemon.baseStats.speed, 31, 0, 50, 1.0, false, 0, null)
    };


    const initialDefaultDefenderState: DefenderState = {
        pokemon: initialPokedexPokemon,
        item: null,
        ability: null,
        hpStat: initialDefenderHpStat,
        defenseStat: initialDefenderDefenseStat,
        specialDefenseStat: initialDefenderSpecialDefenseStat,
        attackStat: initialDefenderAttackStatForFoulPlay,
        speedStat: initialDefenderSpeedStat,
        hpInputValue: initialDefenderHpStat.final.toString(),
        defenseInputValue: initialDefenderDefenseStat.final.toString(),
        specialDefenseInputValue: initialDefenderSpecialDefenseStat.final.toString(),
        speedInputValue: initialDefenderSpeedStat.final.toString(),
        hpEv: 0,
        actualMaxHp: initialDefenderHpStat.final,
        teraType: null,
        isStellar: false,
        isBurned: false,
        hasFlowerGift: false,
        isEnabled: true,
        protosynthesisBoostedStat: null,
        protosynthesisManualTrigger: false,
        quarkDriveBoostedStat: null,
        quarkDriveManualTrigger: false,
    };

    const [defenderState, setDefenderState] = useState<DefenderState>(initialDefaultDefenderState);
    const [defenderUserModifiedTypes, setDefenderUserModifiedTypes] = useState<[PokemonType, PokemonType?] | null>(null);

    const getInitialDefenderTypesBasedOnState = (): [PokemonType, PokemonType?] => {
        if (defenderState.pokemon) {
            if (defenderIsTerastallized && defenderState.teraType) {
                return [defenderState.teraType];
            }
            if (defenderUserModifiedTypes) {
                return defenderUserModifiedTypes;
            }
            return [defenderState.pokemon.types[0], defenderState.pokemon.types[1] || undefined];
        }
        return [PokemonType.Normal];
    };
    const [defenderCurrentTypes, setDefenderCurrentTypes] = useState<[PokemonType, PokemonType?]>(getInitialDefenderTypesBasedOnState());


    const calculateCombinedDamage = (
        results: (DamageCalculation | null)[],
        attackers: AttackerState[]
    ): {
        minDamage: number; maxDamage: number; minPercentage: number; maxPercentage: number;
    } | null => {
        const validEntries = results
            .map((result, index) => ({ result, attacker: attackers[index] }))
            .filter(entry => entry.result !== null && entry.attacker !== undefined && entry.attacker.isEnabled);

        const validCalculations = validEntries.map(entry => entry.result as DamageCalculation);
        const validAttackers = validEntries.map(entry => entry.attacker);

        if (validCalculations.length === 0 || !defenderState.hpStat.final || defenderState.hpStat.final === 0) {
            return null;
        }

        let combinedMin = 0;
        let combinedMax = 0;

        validCalculations.forEach((result, index) => {
            const attackerState = validAttackers[index];
            if (!attackerState || !attackerState.move) return;

            const hitCount = attackerState.selectedHitCount ||
                             (attackerState.move.multihit === '2-5' ? 1 :
                             (typeof attackerState.move.multihit === 'number' ? attackerState.move.multihit : 1));

            combinedMin += result.minDamage * hitCount;
            combinedMax += result.maxDamage * hitCount;
        });

        if (combinedMin === 0 && combinedMax === 0 && validCalculations.length > 0) {

        } else if (validCalculations.length === 0) {
            return null;
        }

        const combinedMinPercentage = (combinedMin / defenderState.hpStat.final) * 100;
        const combinedMaxPercentage = (combinedMax / defenderState.hpStat.final) * 100;

        return {
            minDamage: Math.floor(combinedMin),
            maxDamage: Math.floor(combinedMax),
            minPercentage: combinedMinPercentage,
            maxPercentage: combinedMaxPercentage
        };
    };

    const handleDefenderStateChange = (updates: Partial<DefenderState>) => {
        setDefenderState(prev => {
            let newState = { ...prev };
            let recomputeHp = false;
            let recomputeDefense = false;
            let recomputeSpecialDefense = false;
            let recomputeSpeed = false;
            let recomputeAttack = false; // for Foul Play
    
            if (updates.pokemon && updates.pokemon !== prev.pokemon) {
                const newPokemon = updates.pokemon;
                newState.pokemon = newPokemon;
                // Initialize stats
                newState.hpStat = { base: newPokemon.baseStats.hp, iv: 31, ev: 0, nature: 1.0, rank: 0, final: 0 };
                newState.defenseStat = { base: newPokemon.baseStats.defense, iv: 31, ev: 0, nature: 1.0, rank: 0, final: 0 };
                newState.specialDefenseStat = { base: newPokemon.baseStats.specialDefense, iv: 31, ev: 0, nature: 1.0, rank: 0, final: 0 };
                newState.attackStat = { base: newPokemon.baseStats.attack, iv: 31, ev: 0, nature: 1.0, rank: 0, final: 0 };
                newState.speedStat = { base: newPokemon.baseStats.speed, iv: 31, ev: 0, nature: 1.0, rank: 0, final: 0 };
    
                newState.hpEv = 0;
                newState.item = null;
                newState.ability = null;
                newState.teraType = null;
                newState.isStellar = false;
                newState.isBurned = false;
                newState.hasFlowerGift = false;
                setDefenderIsTerastallized(false);
                setDefenderUserModifiedTypes(null);
                newState.protosynthesisBoostedStat = null;
                newState.protosynthesisManualTrigger = false;
                newState.quarkDriveBoostedStat = null;
                newState.quarkDriveManualTrigger = false;
    
                recomputeHp = recomputeDefense = recomputeSpecialDefense = recomputeAttack = recomputeSpeed = true;
            } else {
                // Apply direct inputValue updates first (from onChange)
                if (updates.hpInputValue !== undefined) newState.hpInputValue = updates.hpInputValue;
                if (updates.defenseInputValue !== undefined) newState.defenseInputValue = updates.defenseInputValue;
                if (updates.specialDefenseInputValue !== undefined) newState.specialDefenseInputValue = updates.specialDefenseInputValue;
                if (updates.speedInputValue !== undefined) newState.speedInputValue = updates.speedInputValue;
    
                // Apply stat updates (from onBlur, sliders, buttons)
                if (updates.hpStat) {
                    newState.hpStat = { ...newState.hpStat, ...updates.hpStat };
                    recomputeHp = true;
                }
                if (updates.defenseStat) {
                    newState.defenseStat = { ...newState.defenseStat, ...updates.defenseStat };
                    recomputeDefense = true;
                }
                if (updates.specialDefenseStat) {
                    newState.specialDefenseStat = { ...newState.specialDefenseStat, ...updates.specialDefenseStat };
                    recomputeSpecialDefense = true;
                }
                if (updates.attackStat) { // Foul Play
                    newState.attackStat = { ...newState.attackStat, ...updates.attackStat };
                    recomputeAttack = true;
                }
                if (updates.speedStat) {
                    newState.speedStat = { ...newState.speedStat, ...updates.speedStat };
                    recomputeSpeed = true;
                }
    
                // hpEv is a special case as it can be updated directly from slider
                if (updates.hpEv !== undefined && newState.hpStat.ev !== updates.hpEv) {
                    newState.hpStat.ev = updates.hpEv;
                    recomputeHp = true;
                }
                newState.hpEv = newState.hpStat.ev; // Sync hpEv with hpStat.ev
    
                // Other direct updates that might require stat re-computation
                let itemChanged = false;
                if (updates.item !== undefined && updates.item !== prev.item) {
                     newState.item = updates.item;
                     itemChanged = true;
                }
                if (updates.ability !== undefined && updates.ability !== prev.ability) {
                    newState.ability = updates.ability;
                    // Protosynthesis/Quark Drive logic
                    if (updates.ability?.id === 'protosynthesis' && prev.ability?.id !== 'protosynthesis') {
                        newState.protosynthesisBoostedStat = 'defense';
                        newState.protosynthesisManualTrigger = false;
                    } else if (updates.ability?.id !== 'protosynthesis' && prev.ability?.id === 'protosynthesis') {
                        newState.protosynthesisBoostedStat = null;
                        newState.protosynthesisManualTrigger = false;
                    }
                    if (updates.ability?.id === 'quark_drive' && prev.ability?.id !== 'quark_drive') {
                        newState.quarkDriveBoostedStat = 'defense';
                        newState.quarkDriveManualTrigger = false;
                    } else if (updates.ability?.id !== 'quark_drive' && prev.ability?.id === 'quark_drive') {
                        newState.quarkDriveBoostedStat = null;
                        newState.quarkDriveManualTrigger = false;
                    }
                    // Ability might affect stats if calculateStat considers it (e.g. Guts, etc.)
                    // For simplicity, assume item is the main external factor for now
                    // or recompute all if ability change can affect base calculation
                }

                if (itemChanged) { // If item changed, all stats might need recomputing if item affects them
                    recomputeHp = recomputeDefense = recomputeSpecialDefense = recomputeAttack = recomputeSpeed = true;
                }

                if (updates.teraType !== undefined) newState.teraType = updates.teraType;
                if (updates.isStellar !== undefined) newState.isStellar = updates.isStellar;
                if (updates.isBurned !== undefined) {
                     newState.isBurned = updates.isBurned;
                     // Burn affects physical attack stat if Guts is not active
                     // Assuming calculateStat handles burn via attacker context for damage calc,
                     // defender's own burn status doesn't change its base stats directly for display
                }
                if (updates.hasFlowerGift !== undefined) newState.hasFlowerGift = updates.hasFlowerGift; // May affect stats under sun
                
                if (updates.protosynthesisBoostedStat !== undefined) newState.protosynthesisBoostedStat = updates.protosynthesisBoostedStat;
                if (updates.protosynthesisManualTrigger !== undefined) newState.protosynthesisManualTrigger = updates.protosynthesisManualTrigger;
                if (updates.quarkDriveBoostedStat !== undefined) newState.quarkDriveBoostedStat = updates.quarkDriveBoostedStat;
                if (updates.quarkDriveManualTrigger !== undefined) newState.quarkDriveManualTrigger = updates.quarkDriveManualTrigger;
            }
    
            // Recalculate final stats and update corresponding inputValues if needed
            if (recomputeHp) {
                newState.hpStat.final = calculateStat(newState.hpStat.base, newState.hpStat.iv, newState.hpStat.ev, 50, newState.hpStat.nature, true, newState.hpStat.rank, newState.item);
                newState.actualMaxHp = newState.hpStat.final;
                // Only update inputValue if it wasn't the source of an onChange event from its own input field,
                // or if a stat property (EV, nature, rank, item) affecting the final value changed.
                if (!(updates.hpInputValue !== undefined && !updates.hpStat && !updates.item)) {
                     newState.hpInputValue = newState.hpStat.final.toString();
                }
            }
            if (recomputeDefense) {
                newState.defenseStat.final = calculateStat(newState.defenseStat.base, newState.defenseStat.iv, newState.defenseStat.ev, 50, newState.defenseStat.nature, false, newState.defenseStat.rank, newState.item);
                if (!(updates.defenseInputValue !== undefined && !updates.defenseStat && !updates.item)) {
                    newState.defenseInputValue = newState.defenseStat.final.toString();
                }
            }
            if (recomputeSpecialDefense) {
                newState.specialDefenseStat.final = calculateStat(newState.specialDefenseStat.base, newState.specialDefenseStat.iv, newState.specialDefenseStat.ev, 50, newState.specialDefenseStat.nature, false, newState.specialDefenseStat.rank, newState.item);
                if (!(updates.specialDefenseInputValue !== undefined && !updates.specialDefenseStat && !updates.item)) {
                    newState.specialDefenseInputValue = newState.specialDefenseStat.final.toString();
                }
            }
            if (recomputeAttack) { // For Foul Play display or other uses
                newState.attackStat.final = calculateStat(newState.attackStat.base, newState.attackStat.iv, newState.attackStat.ev, 50, newState.attackStat.nature, false, newState.attackStat.rank, newState.item);
                // No inputValue for attackStat on defender panel currently.
            }
            if (recomputeSpeed) {
                newState.speedStat.final = calculateStat(newState.speedStat.base, newState.speedStat.iv, newState.speedStat.ev, 50, newState.speedStat.nature, false, newState.speedStat.rank, newState.item);
                if (!(updates.speedInputValue !== undefined && !updates.speedStat && !updates.item)) {
                     newState.speedInputValue = newState.speedStat.final.toString();
                }
            }
            return newState;
        });
    };

    const handleDefenderOffensiveStatChange = (updates: Partial<Pick<StatCalculation, 'ev' | 'rank'>>) => {
        handleDefenderStateChange({ attackStat: { ...defenderState.attackStat, ...updates } });
    };

    const handleDefenderTeraTypeChange = (types: [PokemonType, PokemonType?]) => {
        if (types[0]) {
             handleDefenderStateChange({ teraType: types[0], isStellar: false });
        }
    };

    const handleDefenderBaseTypesChange = (newTypes: [PokemonType, PokemonType?]) => {
        setDefenderUserModifiedTypes(newTypes);
    };

    const handleAttackersStateUpdate = (updatedAttackers: AttackerState[]) => {
        setActiveAttackers(updatedAttackers);
        if (updatedAttackers.length < 2 || !updatedAttackers[1]?.isEnabled) {
            setDefender2Item(null);
            setDefender2Ability(null);
        }
    };

    const handleDoubleBattleChange = (isDouble: boolean) => setIsDoubleBattle(isDouble);

    const getNatureModifierValueFromDetails = (natureDetails: Nature | undefined, statField: 'attack' | 'specialAttack' | 'defense' | 'specialDefense' | 'speed'): NatureModifier => {
        if (!natureDetails) return 1.0;
        if (natureDetails.increasedStat === statField) return 1.1;
        if (natureDetails.decreasedStat === statField) return 0.9;
        return 1.0;
    };


    const handleLoadTeamMemberAsDefender = (member: TeamMemberForDefenderLoad) => {
        if (!member || !member.pokemon) return;

        const natureDetails = member.nature ? natures.find(n => n.nameEn.toLowerCase() === member.nature?.nameEn?.toLowerCase()) : undefined;

        const defNatureMod = getNatureModifierValueFromDetails(natureDetails, 'defense');
        const spDefNatureMod = getNatureModifierValueFromDetails(natureDetails, 'specialDefense');
        const attackNatureMod = getNatureModifierValueFromDetails(natureDetails, 'attack');
        const speedNatureMod = getNatureModifierValueFromDetails(natureDetails, 'speed');


        const loadedHpStat: StatCalculation = { base: member.pokemon.baseStats.hp, iv: member.ivs.hp, ev: member.evs.hp, nature: 1.0, rank: 0, final: 0 };
        const loadedDefenseStat: StatCalculation = { base: member.pokemon.baseStats.defense, iv: member.ivs.defense, ev: member.evs.defense, nature: defNatureMod, rank: 0, final: 0 };
        const loadedSpecialDefenseStat: StatCalculation = { base: member.pokemon.baseStats.specialDefense, iv: member.ivs.specialDefense, ev: member.evs.specialDefense, nature: spDefNatureMod, rank: 0, final: 0 };
        const loadedAttackStat: StatCalculation = { base: member.pokemon.baseStats.attack, iv: member.ivs.attack, ev: member.evs.attack, nature: attackNatureMod, rank: 0, final: 0 };
        const loadedSpeedStat: StatCalculation = { base: member.pokemon.baseStats.speed, iv: member.ivs.speed, ev: member.evs.speed, nature: speedNatureMod, rank: 0, final: 0 };


        const memberTeraType = member.teraType.toLowerCase() as PokemonType;

        const newDefenderStateChanges: Partial<DefenderState> = {
            pokemon: member.pokemon, // This will trigger full recompute in handleDefenderStateChange
            item: member.item,
            ability: member.ability,
            // Let pokemon change handler in handleDefenderStateChange set up initial stats based on new base,
            // then apply loaded EVs, IVs, nature.
            // Or, more directly:
            hpStat: loadedHpStat, // Will be re-calculated with item in handleDefenderStateChange
            defenseStat: loadedDefenseStat,
            specialDefenseStat: loadedSpecialDefenseStat,
            attackStat: loadedAttackStat,
            speedStat: loadedSpeedStat,
            hpEv: member.evs.hp, // Will sync with hpStat.ev
            teraType: memberTeraType,
            isStellar: false, // Default, can be overridden if member has stellar
            hasFlowerGift: false, // Default
            isEnabled: true, // Default
            isBurned: false, // Default
            protosynthesisBoostedStat: member.protosynthesisBoostedStat ?? null,
            protosynthesisManualTrigger: member.protosynthesisManualTrigger ?? false,
            quarkDriveBoostedStat: member.quarkDriveBoostedStat ?? null,
            quarkDriveManualTrigger: member.quarkDriveManualTrigger ?? false,
        };

        setDefenderUserModifiedTypes(null); 
        // Call handleDefenderStateChange to process these updates, which will also calculate final stats and inputValues.
        // It's important that handleDefenderStateChange can handle setting all these at once after a pokemon change.
        handleDefenderStateChange(newDefenderStateChanges); 

        const primaryPokemonType = member.pokemon.types[0].toLowerCase() as PokemonType;
        let shouldBeTerastallized = false;
        if (memberTeraType) {
            if (member.pokemon.types.length === 1 && memberTeraType !== primaryPokemonType) {
                shouldBeTerastallized = true;
            } else if (member.pokemon.types.length > 1 && memberTeraType !== primaryPokemonType && (!member.pokemon.types[1] || memberTeraType !== member.pokemon.types[1].toLowerCase())) {
                 shouldBeTerastallized = true;
            }
        }
        setDefenderIsTerastallized(shouldBeTerastallized);

        setHasReflect(false);
        setHasLightScreen(false);
        setActiveTab('damage');
        setMobileViewMode('defender');
        window.scrollTo(0, 0);
    };

    const handleLoadTeamMemberAsAttacker = (member: TeamMemberForAttackerLoad) => {
        if (!member || !member.pokemon) return;

        const natureDetails = member.nature ? natures.find(n =>
            n.nameEn && member.nature?.nameEn &&
            n.nameEn.toLowerCase() === member.nature.nameEn.toLowerCase()
        ) : undefined;

        const loadedAttackStat: StatCalculation = {
            base: member.pokemon.baseStats.attack, iv: member.ivs.attack, ev: member.evs.attack,
            nature: getNatureModifierValueFromDetails(natureDetails, 'attack'), rank: 0,
            final: calculateStat(member.pokemon.baseStats.attack, member.ivs.attack, member.evs.attack, member.level, getNatureModifierValueFromDetails(natureDetails, 'attack'), false, 0, member.item)
        };
        const loadedSpecialAttackStat: StatCalculation = {
            base: member.pokemon.baseStats.specialAttack, iv: member.ivs.specialAttack, ev: member.evs.specialAttack,
            nature: getNatureModifierValueFromDetails(natureDetails, 'specialAttack'), rank: 0,
            final: calculateStat(member.pokemon.baseStats.specialAttack, member.ivs.specialAttack, member.evs.specialAttack, member.level, getNatureModifierValueFromDetails(natureDetails, 'specialAttack'), false, 0, member.item)
        };
        const loadedDefenseStat: StatCalculation = {
            base: member.pokemon.baseStats.defense, iv: member.ivs.defense, ev: member.evs.defense,
            nature: getNatureModifierValueFromDetails(natureDetails, 'defense'), rank: 0,
            final: calculateStat(member.pokemon.baseStats.defense, member.ivs.defense, member.evs.defense, member.level, getNatureModifierValueFromDetails(natureDetails, 'defense'), false, 0, member.item)
        };
        const loadedSpeedStat: StatCalculation = { 
            base: member.pokemon.baseStats.speed, iv: member.ivs.speed, ev: member.evs.speed,
            nature: getNatureModifierValueFromDetails(natureDetails, 'speed'), rank: 0,
            final: calculateStat(member.pokemon.baseStats.speed, member.ivs.speed, member.evs.speed, member.level, getNatureModifierValueFromDetails(natureDetails, 'speed'), false, 0, member.item)
        };
        const loadedHpEv = member.evs.hp;
        const loadedActualMaxHp = calculateHpForApp(member.pokemon.baseStats.hp, member.ivs.hp, loadedHpEv, member.level);

        const newAttacker: AttackerState = {
            pokemon: member.pokemon,
            move: member.moves[0] || null,
            effectiveMove: null,
            item: member.item,
            ability: member.ability,
            attackStat: loadedAttackStat,
            specialAttackStat: loadedSpecialAttackStat,
            defenseStat: loadedDefenseStat,
            speedStat: loadedSpeedStat, 
            attackInputValue: loadedAttackStat.final.toString(),
            specialAttackInputValue: loadedSpecialAttackStat.final.toString(),
            defenseInputValue: loadedDefenseStat.final.toString(),
            speedInputValue: loadedSpeedStat.final.toString(), 
            hpEv: loadedHpEv,
            actualMaxHp: loadedActualMaxHp,
            currentHp: loadedActualMaxHp,
            teraType: member.teraType,
            isStellar: false,
            isBurned: false,
            hasHelpingHand: false,
            hasFlowerGift: false,
            isEnabled: true,
            teraBlastUserSelectedCategory: 'auto',
            teraBlastDeterminedType: null,
            teraBlastDeterminedCategory: null,
            selectedHitCount: (member.moves[0] && typeof member.moves[0].multihit === 'number' && member.moves[0].multihit > 1) ? member.moves[0].multihit : null,
            protosynthesisBoostedStat: member.protosynthesisBoostedStat ?? null,
            protosynthesisManualTrigger: member.protosynthesisManualTrigger ?? false,
            quarkDriveBoostedStat: member.quarkDriveBoostedStat ?? null,
            quarkDriveManualTrigger: member.quarkDriveManualTrigger ?? false,
            moveUiOptionStates: {},
        };

        setActiveAttackers(prevAttackers => {
            const updatedAttackers = [...prevAttackers];
            if (updatedAttackers.length === 0) {
                return [newAttacker];
            }
            updatedAttackers[0] = newAttacker;
            return updatedAttackers;
        });

        setActiveTab('damage');
        setMobileViewMode('attacker');
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (defenderState.pokemon) {
            if (defenderIsTerastallized && defenderState.teraType) {
                setDefenderCurrentTypes([defenderState.teraType]);
            } else if (defenderUserModifiedTypes) {
                setDefenderCurrentTypes(defenderUserModifiedTypes);
            } else {
                setDefenderCurrentTypes([defenderState.pokemon.types[0], defenderState.pokemon.types[1] || undefined]);
            }
        } else {
            setDefenderCurrentTypes([PokemonType.Normal]);
        }
    }, [defenderState.pokemon, defenderState.teraType, defenderIsTerastallized, defenderUserModifiedTypes]);


useEffect(() => {
    const newDamageResults = activeAttackers.map((attackerState, index) => {
        if (!attackerState.isEnabled || !attackerState.pokemon || !defenderState.pokemon || !attackerState.move || !defenderCurrentTypes.length) {
            if (attackerState.effectiveMove !== null) {
                 setActiveAttackers(prev => {
                    const newAttackers = [...prev];
                    if (newAttackers[index]) {
                        newAttackers[index] = { ...newAttackers[index], effectiveMove: null };
                    }
                    return newAttackers;
                });
            }
            return null;
        }

        const moveContext: MoveDynamicContext = {
            attackerPokemon: attackerState.pokemon,
            defenderPokemon: defenderState.pokemon,
            attackerAbility: attackerState.ability,
            weather: weather,
            field: field,
            uiOptionChecked: attackerState.moveUiOptionStates,
        };
        let moveForCalc = getEffectiveMoveProperties(attackerState.move, moveContext);

        const currentAttackerState = activeAttackers[index];
        if (currentAttackerState &&
            (JSON.stringify(currentAttackerState.effectiveMove) !== JSON.stringify(moveForCalc))) {
            setActiveAttackers(prev => {
                const newAttackers = [...prev];
                if (newAttackers[index]) {
                    newAttackers[index] = { ...newAttackers[index], effectiveMove: moveForCalc };
                }
                return newAttackers;
            });
        }

            if (!moveForCalc) {
                return null;
            }

            if (HP_DEPENDENT_MOVE_NAMES.includes(moveForCalc.name) && attackerState.actualMaxHp > 0) {
                const basePower = moveForCalc.power || 0;
                const calculatedPower = Math.floor((basePower * attackerState.currentHp) / attackerState.actualMaxHp);
                moveForCalc.power = Math.max(1, calculatedPower);
            }

            const attackerTeraBlastConfig = {
                actualType: attackerState.teraBlastDeterminedType,
                actualCategory: attackerState.teraBlastDeterminedCategory,
            };

            const currentDefenderItem = index === 1 && activeAttackers.length > 1 && activeAttackers[1]?.isEnabled ? defender2Item : defenderState.item;
            const currentDefenderAbility = index === 1 && activeAttackers.length > 1 && activeAttackers[1]?.isEnabled ? defender2Ability : defenderState.ability;

            const attackerIsProtosynthesis = attackerState.ability?.id === 'protosynthesis';
            const attackerHasBoosterEnergy = attackerState.item?.name === 'ブーストエナジー';
            const isSunActiveForAttacker = weather === 'sun' || weather === 'harsh_sunlight';
            const isAttackerProtosynthesisActive = attackerIsProtosynthesis &&
                                                  attackerState.protosynthesisBoostedStat !== null &&
                                                  (attackerHasBoosterEnergy || isSunActiveForAttacker || attackerState.protosynthesisManualTrigger);

            const attackerIsQuarkDrive = attackerState.ability?.id === 'quark_drive';
            const isElectricFieldActiveForAttacker = field === 'electric';
            const isAttackerQuarkDriveActive = attackerIsQuarkDrive &&
                                               attackerState.quarkDriveBoostedStat !== null &&
                                               (attackerHasBoosterEnergy || isElectricFieldActiveForAttacker || attackerState.quarkDriveManualTrigger);

            const defenderIsProtosynthesisForCalc = currentDefenderAbility?.id === 'protosynthesis';
            const defenderHasBoosterEnergyForCalc = currentDefenderItem?.name === 'ブーストエナジー';
            const isSunActiveForDefender = weather === 'sun' || weather === 'harsh_sunlight';
            const isDefenderProtosynthesisActive = defenderIsProtosynthesisForCalc &&
                                                  defenderState.protosynthesisBoostedStat !== null &&
                                                  (defenderHasBoosterEnergyForCalc || isSunActiveForDefender || defenderState.protosynthesisManualTrigger);

            const defenderIsQuarkDriveForCalc = currentDefenderAbility?.id === 'quark_drive';
            const isElectricFieldActiveForDefender = field === 'electric';
            const isDefenderQuarkDriveActive = defenderIsQuarkDriveForCalc &&
                                               defenderState.quarkDriveBoostedStat !== null &&
                                               (defenderHasBoosterEnergyForCalc || isElectricFieldActiveForDefender || defenderState.quarkDriveManualTrigger);


            const attackerStatsForCalc: { attack: StatCalculation; specialAttack: StatCalculation; defense: StatCalculation; speed: StatCalculation; } = { 
                attack: attackerState.attackStat,
                specialAttack: attackerState.specialAttackStat,
                defense: attackerState.defenseStat,
                speed: attackerState.speedStat, 
            };

            return calculateDamage(
                attackerState.pokemon,
                { ...defenderState.pokemon!, types: defenderCurrentTypes },
                moveForCalc,
                attackerStatsForCalc,
                { defense: defenderState.defenseStat, specialDefense: defenderState.specialDefenseStat, hp: defenderState.hpStat, speed: defenderState.speedStat }, 
                field,
                attackerState.item,
                currentDefenderItem,
                attackerState.teraType,
                attackerState.isStellar,
                50,
                isDoubleBattle,
                attackerState.isBurned,
                attackerState.hasHelpingHand,
                hasReflect,
                hasLightScreen,
                attackerState.ability,
                null, // attacker2Ability - not relevant for single attacker damage line
                currentDefenderAbility,
                null, // defender2Ability - handled by currentDefenderAbility logic above for this line
                weather,
                disasters,
                hasFriendGuard,
                attackerTeraBlastConfig,
                defenderIsTerastallized,
                isAttackerProtosynthesisActive,
                attackerState.protosynthesisBoostedStat,
                isDefenderProtosynthesisActive,
                defenderState.protosynthesisBoostedStat,
                isAttackerQuarkDriveActive,
                attackerState.quarkDriveBoostedStat,
                isDefenderQuarkDriveActive,
                defenderState.quarkDriveBoostedStat
            );
        });
        setDamageResults(newDamageResults);
    }, [
        activeAttackers, defenderState,
        defenderCurrentTypes,
        isDoubleBattle, hasReflect, hasLightScreen, weather, field,
        disasters, hasFriendGuard, defenderIsTerastallized, defender2Item, defender2Ability
    ]);

    const userConfigurableBaseTypesForDefender: [PokemonType, PokemonType?] =
        defenderUserModifiedTypes ??
        (defenderState.pokemon
            ? [defenderState.pokemon.types[0], defenderState.pokemon.types[1] || undefined]
            : [PokemonType.Normal, undefined]
        );


    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {activeTab === 'damage' && (
                <div
                    className="md:hidden fixed top-0 left-0 w-full bg-gray-900 shadow-md z-20 flex items-stretch border-b border-gray-700"
                    style={{ height: '56px' }}
                >
                    <button
                        onClick={() => setMobileViewMode('attacker')}
                        className={`flex-1 flex items-center justify-center px-2 py-1 transition-colors text-sm relative focus:outline-none ${
                            mobileViewMode === 'attacker' ? 'text-red-400' : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        <Zap size={18} /> <span className="ml-1">攻撃</span>
                        {mobileViewMode === 'attacker' && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setMobileViewMode('defender')}
                        className={`flex-1 flex items-center justify-center px-2 py-1 transition-colors text-sm relative focus:outline-none ${mobileViewMode === 'defender' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                    >
                        <Shield size={18} /> <span className="ml-1">防御</span>
                        {mobileViewMode === 'defender' && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>
                        )}
                    </button>
                </div>
            )}

            <header className={`w-full ${activeTab === 'damage' ? 'md:pt-0 pt-[56px]' : 'pt-0'}`}>
                <div className="max-w-7xl mx-auto py-2 md:py-4 px-2 md:px-8">
                    <div className="hidden md:flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">ポケモンツール</h1>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => alert("ポケモン入れ替え機能は現在無効です。")}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm"
                            >
                                <ArrowRightLeft className="h-4 w-4" />
                                Swap
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-2 md:space-x-4">
                        <button
                            onClick={() => {
                                setActiveTab('damage');
                                setMobileViewMode('attacker');
                            }}
                            className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                                activeTab === 'damage'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <Calculator className="h-4 w-4 md:h-5 md:w-5" />
                            ダメージ計算
                        </button>
                        <button
                            onClick={() => setActiveTab('team')}
                            className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                                activeTab === 'team'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <Users className="h-4 w-4 md:h-5 md:w-5" />
                            チーム管理
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto w-full flex-grow px-1 md:px-10 pb-[calc(80vh-4rem)] pt-2 md:pt-6">
                <div style={{ display: activeTab === 'damage' ? 'block' : 'none' }}>
                    <div className="md:hidden space-y-2">
                        {mobileViewMode === 'attacker' && (
                            <AttackerPanel
                                pokemon={pokedex}
                                moves={moves}
                                items={items}
                                abilities={abilities}
                                attackers={activeAttackers}
                                onSetAttackers={handleAttackersStateUpdate}
                                defenderAttackStatForFoulPlay={defenderState.attackStat}
                                onDefenderOffensiveStatChange={handleDefenderOffensiveStatChange}
                            />
                        )}
                        {mobileViewMode === 'defender' && (
                            <DefenderPanel
                                pokemonList={pokedex}
                                items={items}
                                abilities={abilities}
                                defenderState={defenderState}
                                onDefenderStateChange={handleDefenderStateChange}
                                hasReflect={hasReflect}
                                onReflectChange={setHasReflect}
                                hasLightScreen={hasLightScreen}
                                onLightScreenChange={setHasLightScreen}
                                hasFriendGuard={hasFriendGuard}
                                onFriendGuardChange={setHasFriendGuard}
                                currentTypes={defenderCurrentTypes}
                                onTypeChange={handleDefenderTeraTypeChange}
                                isTerastallized={defenderIsTerastallized}
                                onIsTerastallizedChange={setDefenderIsTerastallized}
                                userConfigurableBaseTypes={userConfigurableBaseTypesForDefender}
                                onUserConfigurableBaseTypesChange={handleDefenderBaseTypesChange}
                                showDefender2={activeAttackers.length > 1 && activeAttackers[1]?.isEnabled === true}
                                defender2Item={defender2Item}
                                onDefender2ItemChange={setDefender2Item}
                                defender2Ability={defender2Ability}
                                onDefender2AbilityChange={setDefender2Ability}
                            />
                        )}
                    </div>

                    <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                        <AttackerPanel
                            pokemon={pokedex}
                            moves={moves}
                            items={items}
                            abilities={abilities}
                            attackers={activeAttackers}
                            onSetAttackers={handleAttackersStateUpdate}
                            defenderAttackStatForFoulPlay={defenderState.attackStat}
                            onDefenderOffensiveStatChange={handleDefenderOffensiveStatChange}
                        />
                        <DefenderPanel
                            pokemonList={pokedex}
                            items={items}
                            abilities={abilities}
                            defenderState={defenderState}
                            onDefenderStateChange={handleDefenderStateChange}
                            hasReflect={hasReflect}
                            onReflectChange={setHasReflect}
                            hasLightScreen={hasLightScreen}
                            onLightScreenChange={setHasLightScreen}
                            hasFriendGuard={hasFriendGuard}
                            onFriendGuardChange={setHasFriendGuard}
                            currentTypes={defenderCurrentTypes}
                            onTypeChange={handleDefenderTeraTypeChange}
                            isTerastallized={defenderIsTerastallized}
                            onIsTerastallizedChange={setDefenderIsTerastallized}
                            userConfigurableBaseTypes={userConfigurableBaseTypesForDefender}
                            onUserConfigurableBaseTypesChange={handleDefenderBaseTypesChange}
                            showDefender2={activeAttackers.length > 1 && activeAttackers[1]?.isEnabled === true}
                            defender2Item={defender2Item}
                            onDefender2ItemChange={setDefender2Item}
                            defender2Ability={defender2Ability}
                            onDefender2AbilityChange={setDefender2Ability}
                        />
                    </div>
                    <div className="mt-6">
                        <WeatherField
                            weather={weather}
                            field={field}
                            onWeatherChange={setWeather}
                            onFieldChange={setField}
                            disasters={disasters}
                            onDisasterChange={setDisasters}
                        />
                    </div>
                </div>
                <div style={{ display: activeTab === 'team' ? 'block' : 'none' }}>
                    <TeamManager
                        pokemon={pokedex}
                        moves={moves}
                        items={items}
                        abilities={abilities}
                        natures={natures}
                        onLoadAsDefender={handleLoadTeamMemberAsDefender}
                        onLoadAsAttacker={handleLoadTeamMemberAsAttacker}
                    />
                </div>
            </main>

            <div style={{ display: activeTab === 'damage' ? 'block' : 'none' }}>
                <footer className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 shadow-lg z-10 max-h-[calc(80vh-4rem)] overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="space-y-4 p-4">
                            {(() => {
                                const enabledAttackers = activeAttackers.filter(a => a.isEnabled);
                                const enabledDamageResults = damageResults.filter((_, i) => activeAttackers[i]?.isEnabled);

                                const combinedResultsForDisplay =
                                    enabledAttackers.length > 0 &&
                                    enabledDamageResults.every(r => r !== null)
                                    ? calculateCombinedDamage(enabledDamageResults, enabledAttackers)
                                    : null;

                                return damageResults.map((result, index) => {
                                    const attacker = activeAttackers[index];
                                    if (!attacker?.isEnabled || !result || !attacker.pokemon || !attacker.move) {
                                        return null;
                                    }

                                    const passCombinedResult = (index === 0 && enabledAttackers.length > 0) ? combinedResultsForDisplay : undefined;

                                    const moveContextForDisplay: MoveDynamicContext = {
                                        attackerPokemon: attacker.pokemon,
                                        weather: weather,
                                        uiOptionChecked: attacker.moveUiOptionStates,
                                        // defenderPokemon, attackerAbility, field may not be needed here if moveForCalc is already resolved
                                    };
                                    let moveUsedInCalc = attacker.effectiveMove || getEffectiveMoveProperties(attacker.move, moveContextForDisplay);

                                    if (!moveUsedInCalc) { // Fallback if effectiveMove is somehow null
                                        moveUsedInCalc = { ...attacker.move };
                                        if(moveUsedInCalc.power === undefined) moveUsedInCalc.power = 0;
                                    }


                                    if (HP_DEPENDENT_MOVE_NAMES.includes(moveUsedInCalc.name) && attacker.actualMaxHp > 0) {
                                        // Re-calculate power based on currentHp for display if it was dynamic
                                        // This logic should ideally use the power value that was actually used in the calculation
                                        // For simplicity, we recalculate here, assuming attacker.currentHp reflects state at calculation time
                                        const basePowerForDisplay = moves.find(m => m.id === attacker.move?.id)?.power || 0; // Original base power
                                        moveUsedInCalc.power = Math.max(1, Math.floor((basePowerForDisplay * attacker.currentHp) / attacker.actualMaxHp));
                                    }


                                    const isFoulPlay = attacker.move.name === "イカサマ";

                                    const attackerDetails = {
                                        pokemonId: attacker.pokemon.id,
                                        pokemonName: attacker.pokemon.name,
                                        movePower: moveUsedInCalc.power,
                                        moveType: moveUsedInCalc.type,
                                        offensiveStatValue: 0,
                                        offensiveStatRank: 0,
                                        teraType: attacker.teraType,
                                        isStellar: attacker.isStellar,
                                        item: attacker.item?.name || null,
                                        ability: attacker.ability?.name || null,
                                        isBurned: attacker.isBurned,
                                        hasHelpingHand: attacker.hasHelpingHand,
                                    };

                                    let defenderDefensiveStatValue = 0;
                                    let defenderDefensiveStatRank = 0;

                                    const moveCategoryForDisplay = attacker.teraBlastDeterminedCategory || attacker.move.category as MoveCategory;

                                    if (isFoulPlay) {
                                        attackerDetails.offensiveStatValue = defenderState.attackStat.final;
                                        attackerDetails.offensiveStatRank = defenderState.attackStat.rank;
                                        defenderDefensiveStatValue = defenderState.defenseStat.final;
                                        defenderDefensiveStatRank = defenderState.defenseStat.rank;
                                    } else if (attacker.move.name === "ボディプレス") {
                                        attackerDetails.offensiveStatValue = attacker.defenseStat.final;
                                        attackerDetails.offensiveStatRank = attacker.defenseStat.rank;
                                        defenderDefensiveStatValue = defenderState.defenseStat.final;
                                        defenderDefensiveStatRank = defenderState.defenseStat.rank;
                                    } else if (moveCategoryForDisplay === 'physical') {
                                        attackerDetails.offensiveStatValue = attacker.attackStat.final;
                                        attackerDetails.offensiveStatRank = attacker.attackStat.rank;
                                        defenderDefensiveStatValue = defenderState.defenseStat.final;
                                        defenderDefensiveStatRank = defenderState.defenseStat.rank;
                                    } else if (moveCategoryForDisplay === 'special') {
                                        attackerDetails.offensiveStatValue = attacker.specialAttackStat.final;
                                        attackerDetails.offensiveStatRank = attacker.specialAttackStat.rank;
                                        defenderDefensiveStatValue = defenderState.specialDefenseStat.final;
                                        defenderDefensiveStatRank = defenderState.specialDefenseStat.rank;
                                    }

                                    const defenderDetails = defenderState.pokemon ? {
                                        pokemonId: defenderState.pokemon.id,
                                        pokemonName: defenderState.pokemon.name,
                                        defensiveStatValue: defenderDefensiveStatValue,
                                        defensiveStatRank: defenderDefensiveStatRank,
                                        item: (index === 1 && activeAttackers.length > 1 && activeAttackers[1]?.isEnabled ? defender2Item?.name : defenderState.item?.name) || null,
                                        ability: (index === 1 && activeAttackers.length > 1 && activeAttackers[1]?.isEnabled ? defender2Ability?.name : defenderState.ability?.name) || null,
                                        hasReflect: hasReflect && moveCategoryForDisplay === 'physical',
                                        hasLightScreen: hasLightScreen && moveCategoryForDisplay === 'special',
                                        hasFriendGuard: hasFriendGuard,
                                    } : null;

                                    const currentHitCount = attacker.selectedHitCount ||
                                                        (attacker.move.multihit === '2-5' ? 1 :
                                                        (typeof attacker.move.multihit === 'number' ? attacker.move.multihit : 1));

                                    return (
                                        <DamageResult
                                            key={`attacker-result-${index}-${attacker.pokemon.id}-${attacker.move.id}`}
                                            result={result}
                                            defenderHP={defenderState.hpStat.final}
                                            isDoubleBattle={isDoubleBattle}
                                            onDoubleBattleChange={handleDoubleBattleChange}
                                            combinedResult={passCombinedResult}
                                            attackerPokemonName={attacker.pokemon.name}
                                            attackerMoveName={attacker.move.name}
                                            defenderPokemonName={defenderState.pokemon?.name}
                                            hitCount={currentHitCount}
                                            attackerDetails={attackerDetails}
                                            defenderDetails={defenderDetails}
                                            weather={weather !== 'none' ? weather : null}
                                            field={field !== 'none' ? field : null}
                                            disasters={disasters}
                                        />
                                    );
                                });
                            })()}
                            {(!activeAttackers.length || activeAttackers.every(attacker => !attacker.isEnabled)) && (
                                <div className="p-4 bg-gray-800 rounded-lg text-center text-gray-400">
                                    攻撃側が設定されていません。
                                </div>
                            )}
                            {activeAttackers.length > 0 && activeAttackers.some(attacker => attacker.isEnabled) && !damageResults.some(result => result !== null) && (
                                <div className="p-4 bg-gray-800 rounded-lg text-center text-gray-400">
                                    有効な攻撃側の計算結果がありません。
                                </div>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;