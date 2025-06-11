import React, { useState, useEffect, useMemo } from 'react';
import { pokedex } from './data/pokedex';
import { moves } from './data/moves';
import { items } from './data/items';
import { abilities } from './data/abilities';
import { natures } from './data/natures';
import {
    Pokemon, Move, StatCalculation, DamageCalculation, NatureModifier, PokemonType,
    Item, Ability, DisasterState, Weather, Field, Nature, MoveCategory,
    DefenderState, ProtosynthesisBoostTarget, AttackerState, TeamMemberForAttackerLoad,
    TeamMemberForDefenderLoad, MoveDynamicContext, AttackerDetailsForModal,
    DefenderDetailsForModal, LoggedDamageEntry, AttackerStateSnapshotForLog,
    DefenderStateSnapshotForLog, GlobalStatesSnapshotForLog,
} from './types';
import { calculateDamage } from './utils/calculator';
import AttackerPanel from './components/AttackerPanel';
import DefenderPanel from './components/DefenderPanel';
import DamageResult from './components/DamageResult';
import WeatherField from './components/WeatherField';
import TeamManager from './components/TeamManager';
import HistoryTab from './components/HistoryTab';
import { ArrowRightLeft, Calculator, Users, Shield, History as HistoryIcon } from 'lucide-react';

import { useGlobalStateStore } from './stores/globalStateStore';
import { useAttackerStore } from './stores/attackerStore';
import { useDefenderStore } from './stores/defenderStore';
import { useHistoryStore } from './stores/historyStore';

const HP_DEPENDENT_MOVE_NAMES = ["ふんか", "しおふき"];

type TabType = 'damage' | 'team' | 'history';
type MobileViewMode = 'attacker' | 'defender';

function App() {
    const [activeTab, setActiveTab] = useState<TabType>('damage');
    const [mobileViewMode, setMobileViewMode] = useState<MobileViewMode>('attacker');

    const { isDoubleBattle, weather, field, disasters, hasReflect, hasLightScreen, hasFriendGuard, defenderIsTerastallized } = useGlobalStateStore();
    const { attackers } = useAttackerStore();
    const {
      pokemon: defenderPokemon, item: defenderItem, ability: defenderAbility,
      hpStat: defenderHpStat, defenseStat: defenderDefenseStat, specialDefenseStat: defenderSpecialDefenseStat,
      attackStat: defenderAttackStat, speedStat: defenderSpeedStat,
      userModifiedTypes, defender2Item, defender2Ability,
      protosynthesisBoostedStat: defenderProtosynthesisBoostedStat,
      protosynthesisManualTrigger: defenderProtosynthesisManualTrigger,
      quarkDriveBoostedStat: defenderQuarkDriveBoostedStat,
      quarkDriveManualTrigger: defenderQuarkDriveManualTrigger,
    } = useDefenderStore();
    const { addLog } = useHistoryStore();

    const [damageResults, setDamageResults] = useState<(DamageCalculation | null)[]>([]);
    const [showAllIndividualAttackResults, setShowAllIndividualAttackResults] = useState(true);

    // 履歴からの復元時にダメージ計算タブに切り替える
    useEffect(() => {
        const handleSwitchToDamageTab = () => {
            setActiveTab('damage');
        };

        window.addEventListener('switchToDamageTab', handleSwitchToDamageTab);
        return () => {
            window.removeEventListener('switchToDamageTab', handleSwitchToDamageTab);
        };
    }, []);

    const handleSwap = () => {
        // 参照問題を避けるため、ストアの最新状態をコピー
        const attackerToSwap = JSON.parse(JSON.stringify(useAttackerStore.getState().attackers[0]));
        const defenderToSwap = JSON.parse(JSON.stringify(useDefenderStore.getState()));

        if (!attackerToSwap?.pokemon || !defenderToSwap.pokemon) {
            alert("入れ替えを行うには、攻撃側1と防御側の両方のポケモンが設定されている必要があります。");
            return;
        }

        // 各ストアのswap関数を呼び出す
        useAttackerStore.getState().swapWithDefender(defenderToSwap);
        useDefenderStore.getState().swapWithAttacker(attackerToSwap);

        // グローバルなテラスタル状態を更新
        const attackerWasTerastallized = attackerToSwap.teraType !== null || attackerToSwap.isStellar;
        useGlobalStateStore.getState().setDefenderIsTerastallized(attackerWasTerastallized);
    };

    const defenderCurrentTypes = useMemo((): [PokemonType, PokemonType?] => {
        if (defenderPokemon) {
            if (defenderIsTerastallized && defenderPokemon.teraType) return [defenderPokemon.teraType];
            if (userModifiedTypes) return userModifiedTypes;
            return [defenderPokemon.types[0], defenderPokemon.types[1] || undefined];
        }
        return [PokemonType.Normal];
    }, [defenderPokemon, defenderIsTerastallized, userModifiedTypes]);

    // ダメージ計算useEffect
    useEffect(() => {
        if (!defenderPokemon) {
            setDamageResults([]);
            return;
        }
        const newDamageResults = attackers.map((attackerState, index) => {
            if (!attackerState.isEnabled || !attackerState.pokemon || !attackerState.move) {
                return null;
            }
            
            const isVariablePowerMove = attackerState.move?.variablePowers && attackerState.move.variablePowers.length > 0;

            if (isVariablePowerMove) {
                // --- 威力変動連続技の計算ロジック (最終修正版) ---
                const hitStates = attackerState.variableHitStates || [];
                const activeHits = hitStates.map((checked, i) => checked ? i : -1).filter(i => i !== -1);
                
                if (activeHits.length === 0) return null;
        
                const hitResults: DamageCalculation[] = [];
        
                // 1. 各ヒットのダメージを個別に計算する
                for (const hitIndex of activeHits) {
                    const hitPower = attackerState.move!.variablePowers![hitIndex];
                    let moveForThisHit = { ...attackerState.move!, power: hitPower };
                    
                    if (HP_DEPENDENT_MOVE_NAMES.includes(moveForThisHit.name) && attackerState.actualMaxHp > 0) {
                      const basePower = moves.find(m => m.id === moveForThisHit.id)?.power || 0;
                      moveForThisHit.power = Math.max(1, Math.floor((basePower * attackerState.currentHp) / attackerState.actualMaxHp));
                    }
                    
                    if (attackerState.starstormDeterminedCategory) moveForThisHit.category = attackerState.starstormDeterminedCategory;
                    if (attackerState.photonGeyserDeterminedCategory) moveForThisHit.category = attackerState.photonGeyserDeterminedCategory;

                    const attackerStatsForCalc = {
                        attack: attackerState.move.id === 'foulplay' ? defenderAttackStat : attackerState.attackStat,
                        specialAttack: attackerState.specialAttackStat,
                        defense: attackerState.defenseStat,
                        speed: attackerState.speedStat,
                        abilityUiFlags: attackerState.abilityUiFlags,
                    };
                    const attackerTeraBlastConfig = {
                        actualType: attackerState.teraBlastDeterminedType,
                        actualCategory: attackerState.teraBlastDeterminedCategory,
                    };
                    const currentDefenderItem = index === 1 && attackers[1]?.isEnabled ? defender2Item : defenderItem;
                    const currentDefenderAbility = index === 1 && attackers[1]?.isEnabled ? defender2Ability : defenderAbility;
                    const isAttackerProtosynthesisActive = attackerState.ability?.id === 'protosynthesis' && attackerState.protosynthesisBoostedStat !== null && ((attackerState.item?.name === 'ブーストエナジー') || (weather === 'sun' || weather === 'harsh_sunlight') || attackerState.protosynthesisManualTrigger);
                    const isAttackerQuarkDriveActive = attackerState.ability?.id === 'quark_drive' && attackerState.quarkDriveBoostedStat !== null && ((attackerState.item?.name === 'ブーストエナジー') || field === 'electric' || attackerState.quarkDriveManualTrigger);
                    const isDefenderProtosynthesisActive = currentDefenderAbility?.id === 'protosynthesis' && defenderProtosynthesisBoostedStat !== null && ((currentDefenderItem?.name === 'ブーストエナジー') || (weather === 'sun' || weather === 'harsh_sunlight') || defenderProtosynthesisManualTrigger);
                    const isDefenderQuarkDriveActive = currentDefenderAbility?.id === 'quark_drive' && defenderQuarkDriveBoostedStat !== null && ((currentDefenderItem?.name === 'ブーストエナジー') || field === 'electric' || defenderQuarkDriveManualTrigger);
                    
                    const damageResultForHit = calculateDamage(
                      attackerState.pokemon, { ...defenderPokemon, types: defenderCurrentTypes }, moveForThisHit,
                      attackerStatsForCalc,
                      { defense: defenderDefenseStat, specialDefense: defenderSpecialDefenseStat, hp: defenderHpStat, speed: defenderSpeedStat, attack: defenderAttackStat },
                      field, attackerState.item, currentDefenderItem, attackerState.teraType, attackerState.isStellar, 50,
                      isDoubleBattle, attackerState.isBurned, attackerState.hasHelpingHand, hasReflect, hasLightScreen,
                      attackerState.ability, null, currentDefenderAbility, null, weather, disasters, hasFriendGuard,
                      attackerTeraBlastConfig, defenderIsTerastallized,
                      isAttackerProtosynthesisActive, attackerState.protosynthesisBoostedStat,
                      isDefenderProtosynthesisActive, defenderProtosynthesisBoostedStat,
                      isAttackerQuarkDriveActive, attackerState.quarkDriveBoostedStat,
                      isDefenderQuarkDriveActive, defenderQuarkDriveBoostedStat,
                      attackerState.moveUiOptionStates,
                      attackerState.abilityUiFlags
                    );
                    hitResults.push(damageResultForHit);
                }
                
                // 2. クリーンな初期オブジェクトを作成
                const finalCombinedResult: DamageCalculation = {
                    minDamage: 0, maxDamage: 0, critMinDamage: 0, critMaxDamage: 0,
                    minPercentage: 0, maxPercentage: 0, critMinPercentage: 0, critMaxPercentage: 0,
                    effectiveness: hitResults.length > 0 ? hitResults[0].effectiveness : 1,
                    teraBoost: hitResults.length > 0 ? hitResults[0].teraBoost : 1,
                    normalDamages: Array(16).fill(0),
                    criticalDamages: Array(16).fill(0),
                };

                // 3. 各ヒットの結果を単純な for-of ループで合算する
                for (const res of hitResults) {
                    for (let i = 0; i < 16; i++) {
                        finalCombinedResult.normalDamages[i] += res.normalDamages[i];
                        finalCombinedResult.criticalDamages[i] += res.criticalDamages[i];
                    }
                }
                
                // 4. 合算されたダメージ配列から、最終的な最小/最大ダメージとパーセンテージを再計算する
                if (defenderHpStat.final > 0) {
                    finalCombinedResult.minDamage = Math.min(...finalCombinedResult.normalDamages);
                    finalCombinedResult.maxDamage = Math.max(...finalCombinedResult.normalDamages);
                    finalCombinedResult.critMinDamage = Math.min(...finalCombinedResult.criticalDamages);
                    finalCombinedResult.critMaxDamage = Math.max(...finalCombinedResult.criticalDamages);

                    finalCombinedResult.minPercentage = (finalCombinedResult.minDamage / defenderHpStat.final) * 100;
                    finalCombinedResult.maxPercentage = (finalCombinedResult.maxDamage / defenderHpStat.final) * 100;
                    finalCombinedResult.critMinPercentage = (finalCombinedResult.critMinDamage / defenderHpStat.final) * 100;
                    finalCombinedResult.critMaxPercentage = (finalCombinedResult.critMaxDamage / defenderHpStat.final) * 100;
                }
        
                return finalCombinedResult;

            } else {
                // --- 通常の技の計算ロジック ---
                let moveForCalc = attackerState.effectiveMove || attackerState.move;
                if (!moveForCalc) return null;

                if (attackerState.starstormDeterminedCategory) {
                    moveForCalc = { ...moveForCalc, category: attackerState.starstormDeterminedCategory };
                }
                if (attackerState.photonGeyserDeterminedCategory) {
                    moveForCalc = { ...moveForCalc, category: attackerState.photonGeyserDeterminedCategory };
                }
    
                if (attackerState.move?.isRankBasedPower && attackerState.moveUiOptionStates?.['rankBasedPowerValue'] !== undefined) {
                    moveForCalc.power = attackerState.moveUiOptionStates['rankBasedPowerValue'];
                }
    
                if (HP_DEPENDENT_MOVE_NAMES.includes(moveForCalc.name) && attackerState.actualMaxHp > 0) {
                    const basePower = moves.find(m => m.id === attackerState.move?.id)?.power || 0;
                    moveForCalc.power = Math.max(1, Math.floor((basePower * attackerState.currentHp) / attackerState.actualMaxHp));
                }
    
                const attackerStatsForCalc = {
                    attack: attackerState.move.id === 'foulplay' ? defenderAttackStat : attackerState.attackStat,
                    specialAttack: attackerState.specialAttackStat,
                    defense: attackerState.defenseStat,
                    speed: attackerState.speedStat,
                    abilityUiFlags: attackerState.abilityUiFlags,
                };
    
                const attackerTeraBlastConfig = {
                    actualType: attackerState.teraBlastDeterminedType,
                    actualCategory: attackerState.teraBlastDeterminedCategory,
                };
                
                const currentDefenderItem = index === 1 && attackers[1]?.isEnabled ? defender2Item : defenderItem;
                const currentDefenderAbility = index === 1 && attackers[1]?.isEnabled ? defender2Ability : defenderAbility;
                
                const isAttackerProtosynthesisActive = attackerState.ability?.id === 'protosynthesis' && attackerState.protosynthesisBoostedStat !== null && ((attackerState.item?.name === 'ブーストエナジー') || (weather === 'sun' || weather === 'harsh_sunlight') || attackerState.protosynthesisManualTrigger);
                const isAttackerQuarkDriveActive = attackerState.ability?.id === 'quark_drive' && attackerState.quarkDriveBoostedStat !== null && ((attackerState.item?.name === 'ブーストエナジー') || field === 'electric' || attackerState.quarkDriveManualTrigger);
                
                const isDefenderProtosynthesisActive = currentDefenderAbility?.id === 'protosynthesis' && defenderProtosynthesisBoostedStat !== null && ((currentDefenderItem?.name === 'ブーストエナジー') || (weather === 'sun' || weather === 'harsh_sunlight') || defenderProtosynthesisManualTrigger);
                const isDefenderQuarkDriveActive = currentDefenderAbility?.id === 'quark_drive' && defenderQuarkDriveBoostedStat !== null && ((currentDefenderItem?.name === 'ブーストエナジー') || field === 'electric' || defenderQuarkDriveManualTrigger);
                
                return calculateDamage(
                    attackerState.pokemon, { ...defenderPokemon, types: defenderCurrentTypes }, moveForCalc,
                    attackerStatsForCalc,
                    { defense: defenderDefenseStat, specialDefense: defenderSpecialDefenseStat, hp: defenderHpStat, speed: defenderSpeedStat, attack: defenderAttackStat },
                    field, attackerState.item, currentDefenderItem, attackerState.teraType, attackerState.isStellar, 50,
                    isDoubleBattle, attackerState.isBurned, attackerState.hasHelpingHand, hasReflect, hasLightScreen,
                    attackerState.ability, null, currentDefenderAbility, null, weather, disasters, hasFriendGuard,
                    attackerTeraBlastConfig, defenderIsTerastallized,
                    isAttackerProtosynthesisActive, attackerState.protosynthesisBoostedStat,
                    isDefenderProtosynthesisActive, defenderProtosynthesisBoostedStat,
                    isAttackerQuarkDriveActive, attackerState.quarkDriveBoostedStat,
                    isDefenderQuarkDriveActive, defenderQuarkDriveBoostedStat,
                    attackerState.moveUiOptionStates,
                    attackerState.abilityUiFlags
                );
            }
        });
        setDamageResults(newDamageResults);
    }, [
        attackers, 
        defenderPokemon, defenderItem, defenderAbility, defenderHpStat, defenderDefenseStat, defenderSpecialDefenseStat, defenderAttackStat, defenderSpeedStat,
        defenderCurrentTypes, isDoubleBattle, hasReflect, hasLightScreen, weather, field, disasters, hasFriendGuard, defenderIsTerastallized,
        userModifiedTypes, defender2Item, defender2Ability, moves,
        defenderProtosynthesisBoostedStat,
        defenderProtosynthesisManualTrigger,
        defenderQuarkDriveBoostedStat,
        defenderQuarkDriveManualTrigger,
    ]);
    
    const handleSaveLogEntry = (attackerIdx: number) => {
        const attacker = attackers[attackerIdx];
        const result = damageResults[attackerIdx];
        if (!attacker || !attacker.pokemon || !attacker.move || !result || !defenderPokemon) {
            alert("ログを保存するために必要な情報が不足しています。");
            return;
        }
        
        const isVariablePowerMove = attacker.move?.variablePowers && attacker.move.variablePowers.length > 0;
        let totalHitCount = 1;
        let moveUsedInCalc = attacker.effectiveMove || attacker.move;

        if (isVariablePowerMove) {
            totalHitCount = attacker.variableHitStates?.filter(Boolean).length || 1;
            // 威力変動技の場合、moveUsedInCalc の威力は代表値(1ヒット目)になってしまうため、合計威力などを別途計算するか、
            // ログでは代表値を表示する、などの割り切りが必要。ここでは代表値のままとする。
        } else {
            totalHitCount = attacker.selectedHitCount || (typeof attacker.move.multihit === 'number' ? attacker.move.multihit : 1);
        }
        
        let attackerDisplayTypes: [PokemonType, PokemonType?] | ['stellar'] = attacker.pokemon.types as [PokemonType, PokemonType?];
        if (attacker.isStellar) attackerDisplayTypes = ['stellar'];
        else if (attacker.teraType) attackerDisplayTypes = [attacker.teraType];
        
        let moveCategoryForLog = moveUsedInCalc.category;
        if(attacker.teraBlastDeterminedCategory) moveCategoryForLog = attacker.teraBlastDeterminedCategory;
        else if(attacker.starstormDeterminedCategory) moveCategoryForLog = attacker.starstormDeterminedCategory;
        else if(attacker.photonGeyserDeterminedCategory) moveCategoryForLog = attacker.photonGeyserDeterminedCategory;

        let offensiveStatValue = 0, offensiveStatRank = 0, defensiveStatValue = 0, defensiveStatRank = 0;
        let defensiveStatType: 'defense' | 'specialDefense' = 'defense';
        
        if (attacker.move.id === 'foulplay') {
            offensiveStatValue = defenderAttackStat.final; offensiveStatRank = defenderAttackStat.rank;
            defensiveStatValue = defenderDefenseStat.final; defensiveStatRank = defenderDefenseStat.rank;
            defensiveStatType = 'defense';
        } else if (attacker.move.id === 'bodypress') {
            offensiveStatValue = attacker.defenseStat.final; offensiveStatRank = attacker.defenseStat.rank;
            defensiveStatValue = defenderDefenseStat.final; defensiveStatRank = defenderDefenseStat.rank;
            defensiveStatType = 'defense';
        } else if (moveCategoryForLog === 'physical') {
            offensiveStatValue = attacker.attackStat.final; offensiveStatRank = attacker.attackStat.rank;
            defensiveStatValue = defenderDefenseStat.final; defensiveStatRank = defenderDefenseStat.rank;
            defensiveStatType = 'defense';
        } else {
            offensiveStatValue = attacker.specialAttackStat.final; offensiveStatRank = attacker.specialAttackStat.rank;
            defensiveStatValue = defenderSpecialDefenseStat.final; defensiveStatRank = defenderSpecialDefenseStat.rank;
            defensiveStatType = 'specialDefense';
        }

        const currentDefenderItem = attackerIdx === 1 && attackers[1]?.isEnabled ? defender2Item : defenderItem;
        const currentDefenderAbility = attackerIdx === 1 && attackers[1]?.isEnabled ? defender2Ability : defenderAbility;

        const attackerDetails: AttackerDetailsForModal = { pokemonId: attacker.pokemon.id, pokemonName: attacker.pokemon.name, movePower: moveUsedInCalc.power || 0, moveCategory: moveCategoryForLog, offensiveStatValue, offensiveStatRank, teraType: attacker.teraType, isStellar: attacker.isStellar, item: attacker.item?.name || null, ability: attacker.ability?.name || null, isBurned: attacker.isBurned, hasHelpingHand: attacker.hasHelpingHand, displayTypes: attackerDisplayTypes, };
        const defenderDetails: DefenderDetailsForModal = { pokemonId: defenderPokemon.id, pokemonName: defenderPokemon.name, maxHp: defenderHpStat.final, defensiveStatValue, defensiveStatType, defensiveStatRank, item: currentDefenderItem?.name || null, ability: currentDefenderAbility?.name || null, hasReflect: hasReflect && moveCategoryForLog === 'physical', hasLightScreen: hasLightScreen && moveCategoryForLog === 'special', hasFriendGuard, displayTypes: defenderCurrentTypes, };
        
        const createStatSnapshot = (stat: StatCalculation) => ({ iv: stat.iv, ev: stat.ev, nature: stat.nature, rank: stat.rank });
        const attackerStateSnapshot: AttackerStateSnapshotForLog = { pokemonId: attacker.pokemon.id, moveId: attacker.move.id, itemId: attacker.item?.id || null, abilityId: attacker.ability?.id || null, attackStat: createStatSnapshot(attacker.attackStat), specialAttackStat: createStatSnapshot(attacker.specialAttackStat), defenseStat: createStatSnapshot(attacker.defenseStat), speedStat: createStatSnapshot(attacker.speedStat), hpEv: attacker.hpEv, currentHp: attacker.currentHp, teraType: attacker.teraType, loadedTeraType: attacker.loadedTeraType, isStellar: attacker.isStellar, isBurned: attacker.isBurned, hasHelpingHand: attacker.hasHelpingHand, hasFlowerGift: attacker.hasFlowerGift, teraBlastUserSelectedCategory: attacker.teraBlastUserSelectedCategory, starstormDeterminedCategory: attacker.starstormDeterminedCategory, photonGeyserDeterminedCategory: attacker.photonGeyserDeterminedCategory, selectedHitCount: attacker.selectedHitCount, protosynthesisBoostedStat: attacker.protosynthesisBoostedStat, protosynthesisManualTrigger: attacker.protosynthesisManualTrigger, quarkDriveBoostedStat: attacker.quarkDriveBoostedStat, quarkDriveManualTrigger: attacker.quarkDriveManualTrigger, moveUiOptionStates: attacker.moveUiOptionStates, abilityUiFlags: attacker.abilityUiFlags, variableHitStates: attacker.variableHitStates, isCritical: !!attacker.isCritical };
        const defenderStateSnapshot = { pokemonId: defenderPokemon.id, itemId: currentDefenderItem?.id || null, abilityId: currentDefenderAbility?.id || null, hpStat: createStatSnapshot(defenderHpStat), defenseStat: createStatSnapshot(defenderDefenseStat), specialDefenseStat: createStatSnapshot(defenderSpecialDefenseStat), attackStat: createStatSnapshot(defenderAttackStat), speedStat: createStatSnapshot(defenderSpeedStat), hpEv: defenderHpStat.ev, teraType: defenderPokemon.teraType, isStellar: defenderPokemon.isStellar, isBurned: defenderPokemon.isBurned, hasFlowerGift: defenderPokemon.hasFlowerGift, userModifiedTypes, protosynthesisBoostedStat: defenderPokemon.protosynthesisBoostedStat, protosynthesisManualTrigger: defenderPokemon.protosynthesisManualTrigger, quarkDriveBoostedStat: defenderPokemon.quarkDriveBoostedStat, quarkDriveManualTrigger: defenderPokemon.quarkDriveManualTrigger, };
        const globalStatesSnapshot = { isDoubleBattle, weather, field, disasters: JSON.parse(JSON.stringify(disasters)), hasReflect, hasLightScreen, hasFriendGuard, defenderIsTerastallized, };

        addLog({
            attackerDetails, defenderDetails, result,
            defenderOriginalHP: defenderHpStat.final,
            attackerPokemonName: attacker.pokemon.name,
            attackerMoveName: attacker.move.name,
            defenderPokemonName: defenderPokemon.name,
            hitCount: totalHitCount,
            attackerStateSnapshot, defenderStateSnapshot, globalStatesSnapshot
        });
    };
    
    const calculateCombinedDamage = (results: DamageCalculation[]): { minDamage: number; maxDamage: number; minPercentage: number; maxPercentage: number; } | null => {
        if (results.length === 0 || !defenderHpStat.final || defenderHpStat.final === 0) return null;
        let combinedMin = 0; let combinedMax = 0;
        results.forEach((result, index) => {
            const attackerState = attackers[index];
            if (!attackerState || !attackerState.move) return;

            const isVariablePowerMove = attackerState.move?.variablePowers && attackerState.move.variablePowers.length > 0;
            if (isVariablePowerMove) {
                // 威力変動技の場合、resultは既に合算済みなので、そのまま加算
                combinedMin += result.minDamage;
                combinedMax += result.maxDamage;
            } else {
                const hitCount = attackerState.selectedHitCount || (typeof attackerState.move.multihit === 'number' ? attackerState.move.multihit : 1);
                combinedMin += result.minDamage * hitCount;
                combinedMax += result.maxDamage * hitCount;
            }
        });
        const minPercentage = (combinedMin / defenderHpStat.final) * 100;
        const maxPercentage = (combinedMax / defenderHpStat.final) * 100;
        return { minDamage: Math.floor(combinedMin), maxDamage: Math.floor(combinedMax), minPercentage, maxPercentage };
    };

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
                      <span className="ml-1">攻撃</span>
                        {mobileViewMode === 'attacker' && (<div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>)}
                    </button>
                    <button
                        onClick={() => setMobileViewMode('defender')}
                        className={`flex-1 flex items-center justify-center px-2 py-1 transition-colors text-sm relative focus:outline-none ${mobileViewMode === 'defender' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                    >
                         <span className="ml-1">防御</span>
                        {mobileViewMode === 'defender' && (<div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></div>)}
                    </button>
                </div>
            )}
            <header className={`w-full ${activeTab !== 'damage' ? 'pt-0' : (mobileViewMode === 'attacker' || mobileViewMode === 'defender' ? 'pt-[56px] md:pt-0' : 'pt-0')}`}>
                <div className="max-w-7xl mx-auto py-2 md:py-4 px-2 md:px-8">
                    <div className="hidden md:flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-white">VGC.calc</h1>
                        <button onClick={handleSwap} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm"><ArrowRightLeft className="h-4 w-4" /> Swap</button>
                    </div>
                    <div className="flex space-x-1 md:space-x-2">
                        <button onClick={() => { setActiveTab('damage'); setMobileViewMode('attacker'); }} className={`flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${activeTab === 'damage' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}><Calculator className="h-4 w-4 md:h-5 md:w-5" /> ダメージ計算</button>
                        <button onClick={() => setActiveTab('team')} className={`flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${activeTab === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}><Users className="h-4 w-4 md:h-5 md:w-5" /> チーム管理</button>
                        <button onClick={() => setActiveTab('history')} className={`flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}><HistoryIcon className="h-4 w-4 md:h-5 md:w-5" /> 履歴</button>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto w-full flex-grow px-1 md:px-10 pb-[calc(50vh-4rem)] pt-2 md:pt-6">
                <div style={{ display: activeTab === 'damage' ? 'block' : 'none' }}>
                    <div className="md:hidden space-y-2">
                        {mobileViewMode === 'attacker' && <AttackerPanel pokemon={pokedex} moves={moves} items={items} abilities={abilities} />}
                        {mobileViewMode === 'defender' && <DefenderPanel pokemonList={pokedex} items={items} abilities={abilities} showDefender2={attackers.length > 1 && !!attackers[1]?.isEnabled} />}
                    </div>
                    <div className="hidden md:grid md:grid-cols-2 md:gap-6">
                        <AttackerPanel pokemon={pokedex} moves={moves} items={items} abilities={abilities} />
                        <DefenderPanel pokemonList={pokedex} items={items} abilities={abilities} showDefender2={attackers.length > 1 && !!attackers[1]?.isEnabled} />
                    </div>
                    <div className="mt-6"><WeatherField /></div>
                </div>
                <div style={{ display: activeTab === 'team' ? 'block' : 'none' }}><TeamManager pokemon={pokedex} moves={moves} items={items} abilities={abilities} natures={natures}　/></div>
                <div style={{ display: activeTab === 'history' ? 'block' : 'none' }}><HistoryTab /></div>
            </main>
            <div style={{ display: activeTab === 'damage' ? 'block' : 'none' }}>
                <footer className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 shadow-lg z-10 max-h-[calc(60vh-4rem)] overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <div className="space-y-2.5 p-2.5">
                            {(() => {
                                const enabledAttackers = attackers.filter(a => a.isEnabled);
                                if (enabledAttackers.length === 0) return <div className="p-4 bg-gray-800 rounded-lg text-center text-gray-400">攻撃側が設定されていません。</div>;
                                
                                const enabledDamageResults = damageResults.filter((_, i) => attackers[i]?.isEnabled && attackers[i] !== null);
                                if (enabledDamageResults.length === 0 || enabledDamageResults.every(r => r === null)) return <div className="p-4 bg-gray-800 rounded-lg text-center text-gray-400">有効な計算結果がありません。</div>;
                                
                                const combinedResultsForDisplay = enabledAttackers.length > 1 ? calculateCombinedDamage(enabledDamageResults.filter(r => r !== null) as DamageCalculation[]) : null;

                                return damageResults.map((result, index) => {
                                    const attacker = attackers[index];
                                    if (!attacker?.isEnabled || !result || !attacker.pokemon || !attacker.move || !defenderPokemon) return null;
                                    
                                    const isVariablePowerMove = attacker.move?.variablePowers && attacker.move.variablePowers.length > 0;
                                    let totalHitCount = 1;
                                    
                                    if (isVariablePowerMove) {
                                        totalHitCount = attacker.variableHitStates?.filter(Boolean).length || 1;
                                    } else {
                                        totalHitCount = attacker.selectedHitCount || (typeof attacker.move.multihit === 'number' ? attacker.move.multihit : 1);
                                    }

                                    let moveUsedInCalc = attacker.effectiveMove || attacker.move;
                                    let attackerDisplayTypes: [PokemonType, PokemonType?] | ['stellar'] = attacker.pokemon.types as [PokemonType, PokemonType?];
                                    if (attacker.isStellar) attackerDisplayTypes = ['stellar'];
                                    else if (attacker.teraType) attackerDisplayTypes = [attacker.teraType];
                                    
                                    let moveCategoryForDisplay = moveUsedInCalc.category;
                                    if(attacker.teraBlastDeterminedCategory) moveCategoryForDisplay = attacker.teraBlastDeterminedCategory;
                                    else if(attacker.starstormDeterminedCategory) moveCategoryForDisplay = attacker.starstormDeterminedCategory;
                                    else if(attacker.photonGeyserDeterminedCategory) moveCategoryForDisplay = attacker.photonGeyserDeterminedCategory;

                                    let offensiveStatValue = 0, offensiveStatRank = 0, defensiveStatValue = 0, defensiveStatRank = 0;
                                    let defensiveStatType: 'defense' | 'specialDefense' = 'defense';
                                    
                                    if (attacker.move.id === 'foulplay') {
                                        offensiveStatValue = defenderAttackStat.final; offensiveStatRank = defenderAttackStat.rank;
                                        defensiveStatValue = defenderDefenseStat.final; defensiveStatRank = defenderDefenseStat.rank;
                                        defensiveStatType = 'defense';
                                    } else if (attacker.move.id === 'bodypress') {
                                        offensiveStatValue = attacker.defenseStat.final; offensiveStatRank = attacker.defenseStat.rank;
                                        defensiveStatValue = defenderDefenseStat.final; defensiveStatRank = defenderDefenseStat.rank;
                                        defensiveStatType = 'defense';
                                    } else if (moveCategoryForDisplay === 'physical') {
                                        offensiveStatValue = attacker.attackStat.final; offensiveStatRank = attacker.attackStat.rank;
                                        defensiveStatValue = defenderDefenseStat.final; defensiveStatRank = defenderDefenseStat.rank;
                                        defensiveStatType = 'defense';
                                    } else {
                                        offensiveStatValue = attacker.specialAttackStat.final; offensiveStatRank = attacker.specialAttackStat.rank;
                                        defensiveStatValue = defenderSpecialDefenseStat.final; defensiveStatRank = defenderSpecialDefenseStat.rank;
                                        defensiveStatType = 'specialDefense';
                                    }

                                    const currentDefenderItem = index === 1 && attackers[1]?.isEnabled ? defender2Item : defenderItem;
                                    const currentDefenderAbility = index === 1 && attackers[1]?.isEnabled ? defender2Ability : defenderAbility;

                                    const attackerDetails: AttackerDetailsForModal = { pokemonId: attacker.pokemon.id, pokemonName: attacker.pokemon.name, movePower: moveUsedInCalc.power || 0, moveCategory: moveCategoryForDisplay, offensiveStatValue, offensiveStatRank, teraType: attacker.teraType, isStellar: attacker.isStellar, item: attacker.item?.name || null, ability: attacker.ability?.name || null, isBurned: attacker.isBurned, hasHelpingHand: attacker.hasHelpingHand, displayTypes: attackerDisplayTypes, };
                                    const defenderDetails: DefenderDetailsForModal = { pokemonId: defenderPokemon.id, pokemonName: defenderPokemon.name, maxHp: defenderHpStat.final, defensiveStatValue, defensiveStatType, defensiveStatRank, item: currentDefenderItem?.name || null, ability: currentDefenderAbility?.name || null, hasReflect: hasReflect && moveCategoryForDisplay === 'physical', hasLightScreen: hasLightScreen && moveCategoryForDisplay === 'special', hasFriendGuard, displayTypes: defenderCurrentTypes, };

                                    return (
                                        <DamageResult
                                            key={`result-${index}`}
                                            attackerIndex={index}
                                            result={result}
                                            defenderHP={defenderHpStat.final}
                                            combinedResult={index === 0 && combinedResultsForDisplay ? combinedResultsForDisplay : undefined}
                                            attackerPokemonName={attacker.pokemon.name}
                                            attackerMoveName={attacker.move.name}
                                            attackerMoveNameForDisplay={moveUsedInCalc.name}
                                            defenderPokemonName={defenderPokemon.name}
                                            hitCount={totalHitCount}
                                            attackerDetails={attackerDetails}
                                            defenderDetails={defenderDetails}
                                            weather={weather !== 'none' ? weather : null}
                                            field={field !== 'none' ? field : null}
                                            disasters={disasters}
                                            onSaveLog={() => handleSaveLogEntry(index)}
                                            resultIdSuffix={`${index}`}
                                            isVariablePowerMove={isVariablePowerMove} // Pass this prop
                                            showIndividualAttackResults={showAllIndividualAttackResults}
                                            onToggleShowIndividualAttackResults={() => setShowAllIndividualAttackResults(p => !p)}
                                        />
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;