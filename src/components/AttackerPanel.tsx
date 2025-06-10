import React, { useCallback, useMemo } from 'react';
import { Pokemon, Move, StatCalculation, NatureModifier, PokemonType, Item, Ability, TeraBurstEffectiveType, MoveCategory, ProtosynthesisBoostTarget, AttackerState } from '../types';
import PokemonSelect from './PokemonSelect';
import MoveSelect from './MoveSelect';
import StatSlider from './StatSlider';
import ItemSelect from './ItemSelect';
import AbilitySelect from './AbilitySelect';
import TeraBlastOptions from '../calculation/TeraBlastOptions';
import { Plus, X } from 'lucide-react';
import BodyPressDefenseInputs from './moveSpecific/BodyPressDefenseInputs';
import HpDependentPowerInputs from './moveSpecific/HpDependentPowerInputs';
import FoulPlayDisplay from './moveSpecific/FoulPlayDisplay';
import RankSelector from './RankSelector';
import HitCountSelect from '../calculation/HitCountSelect';
import { useAttackerStore } from '../stores/attackerStore';
import { useDefenderStore } from '../stores/defenderStore';
import { getTypeColor, getTypeNameJp } from '../utils/uiHelpers'; 

interface AttackerPanelProps {
  pokemon: Pokemon[];
  moves: Move[];
  items: Item[];
  abilities: Ability[];
}

const AttackerPanel: React.FC<AttackerPanelProps> = ({
  pokemon: pokemonList,
  moves,
  items,
  abilities,
}) => {
  const { 
    attackers, addAttacker, removeAttacker, updateAttacker, 
    updateStat, updateStatValue, updateStatFromInput, setPokemon, setMove 
  } = useAttackerStore();
  
  const { attackStat: defenderAttackStat, updateStat: updateDefenderStat } = useDefenderStore();
  
  const handleDefenderOffensiveStatChange = useCallback((updates: Partial<Pick<StatCalculation, 'ev' | 'rank'>>) => {
    updateDefenderStat('attack', updates);
  }, [updateDefenderStat]);
  
  // ▼▼▼ 全てのハンドラ関数をここに定義 ▼▼▼
  const toggleAttacker = (index: number) => updateAttacker(index, { isEnabled: !attackers[index].isEnabled });
  const handlePokemonChange = (pokemon: Pokemon | null, index: number) => setPokemon(index, pokemon);
  const handleItemChange = (item: Item | null, index: number) => updateAttacker(index, { item });
  const handleAbilityChange = (ability: Ability | null, index: number) => updateAttacker(index, { ability, abilityUiFlags: {} });
  
  const handleHitCountChange = (count: number | null, index: number) => updateAttacker(index, { selectedHitCount: count });
  const handleCurrentHpChange = (newCurrentHp: number, index: number) => updateAttacker(index, { currentHp: newCurrentHp });
  const handleHpEvChange = (ev: number, index: number) => {
    const validEv = Math.max(0, Math.min(Math.floor(ev / 4) * 4, 252));
    updateAttacker(index, { hpEv: validEv });
  };
  
  const handleAttackEvChange = (ev: number, index: number) => updateStat(index, 'attack', { ev: Math.max(0, Math.min(Math.floor(ev / 4) * 4, 252)) });
  const handleSpecialAttackEvChange = (ev: number, index: number) => updateStat(index, 'specialAttack', { ev: Math.max(0, Math.min(Math.floor(ev / 4) * 4, 252)) });
  const handleDefenseEvChange = (ev: number, index: number) => updateStat(index, 'defense', { ev: Math.max(0, Math.min(Math.floor(ev / 4) * 4, 252)) });
  const handleSpeedEvChange = (ev: number, index: number) => updateStat(index, 'speed', { ev: Math.max(0, Math.min(Math.floor(ev / 4) * 4, 252)) });

  const handleAttackNatureChange = (nature: NatureModifier, index: number) => updateStat(index, 'attack', { nature });
  const handleSpecialAttackNatureChange = (nature: NatureModifier, index: number) => updateStat(index, 'specialAttack', { nature });
  const handleDefenseNatureChange = (nature: NatureModifier, index: number) => updateStat(index, 'defense', { nature });
  const handleSpeedNatureChange = (nature: NatureModifier, index: number) => updateStat(index, 'speed', { nature });

  const handleAttackRankChange = (rank: number, index: number) => updateStat(index, 'attack', { rank });
  const handleSpecialAttackRankChange = (rank: number, index: number) => updateStat(index, 'specialAttack', { rank });
  const handleDefenseRankChange = (rank: number, index: number) => updateStat(index, 'defense', { rank });
  const handleSpeedRankChange = (rank: number, index: number) => updateStat(index, 'speed', { rank });

  const handleBurnChange = (burned: boolean, index: number) => updateAttacker(index, { isBurned: burned });
  const handleHelpingHandChange = (helped: boolean, index: number) => updateAttacker(index, { hasHelpingHand: helped });
  
  const handleAttackInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => updateStatValue(index, 'attack', e.target.value);
  const handleSpecialAttackInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => updateStatValue(index, 'specialAttack', e.target.value);
  const handleDefenseInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => updateStatValue(index, 'defense', e.target.value);
  const handleSpeedInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => updateStatValue(index, 'speed', e.target.value);
  
  const handleAttackInputBlur = (index: number) => updateStatFromInput(index, 'attack');
  const handleSpecialAttackInputBlur = (index: number) => updateStatFromInput(index, 'specialAttack');
  const handleDefenseInputBlur = (index: number) => updateStatFromInput(index, 'defense');
  const handleSpeedInputBlur = (index: number) => updateStatFromInput(index, 'speed');
  
  const handleProtosynthesisBoostedStatChange = (stat: ProtosynthesisBoostTarget | null, index: number) => updateAttacker(index, { protosynthesisBoostedStat: stat });
  const handleProtosynthesisManualTriggerChange = (isActive: boolean, index: number) => updateAttacker(index, { protosynthesisManualTrigger: isActive });
  const handleQuarkDriveBoostedStatChange = (stat: ProtosynthesisBoostTarget | null, index: number) => updateAttacker(index, { quarkDriveBoostedStat: stat });
  const handleQuarkDriveManualTriggerChange = (isActive: boolean, index: number) => updateAttacker(index, { quarkDriveManualTrigger: isActive });
  // ▲▲▲ 全てのハンドラ関数をここに定義 ▲▲▲

  const handleToggleTera = (attackerIndex: number) => {
    const attacker = attackers[attackerIndex];
    if (!attacker.pokemon || !attacker.move) return;
    const newTeraType = attacker.teraType === null ? attacker.move.type : null;
    updateAttacker(attackerIndex, { teraType: newTeraType, isStellar: false });
  };
  
  const handleToggleStellar = (attackerIndex: number) => {
    const attacker = attackers[attackerIndex];
    if (!attacker.pokemon) return;
    const newIsStellar = !attacker.isStellar;
    updateAttacker(attackerIndex, { isStellar: newIsStellar, teraType: newIsStellar ? null : attacker.teraType });
  };

  const handleTeraBlastCategorySelect = (category: 'physical' | 'special' | 'auto', index: number) => {
    updateAttacker(index, { teraBlastUserSelectedCategory: category });
  };

  const handleRankBasedPowerChange = (power: number, index: number) => {
    updateAttacker(index, { moveUiOptionStates: { ...attackers[index].moveUiOptionStates, 'rankBasedPowerValue': power }});
  };

  const rankBasedPowerOptions = useMemo(() => {
    const options = [];
    for (let i = 20; i <= 860; i += 20) {
      options.push(i);
    }
    return options;
  }, []);

  const calculateBaseStatValue = (base: number, iv: number, ev: number, level: number, nature: NatureModifier): number => {
    if (!base || base <= 0) return 0;
    let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    stat = Math.floor(stat * nature);
    return stat;
  };

  const renderAttackerSection = (attacker: AttackerState, index: number) => {
    const attackBaseValueForDisplay = attacker.attackStat && attacker.pokemon ? calculateBaseStatValue(attacker.pokemon.baseStats.attack, attacker.attackStat.iv, attacker.attackStat.ev || 0, 50, attacker.attackStat.nature) : 0;
    const specialAttackBaseValueForDisplay = attacker.specialAttackStat && attacker.pokemon ? calculateBaseStatValue(attacker.pokemon.baseStats.specialAttack, attacker.specialAttackStat.iv, attacker.specialAttackStat.ev || 0, 50, attacker.specialAttackStat.nature) : 0;
    const defenseBaseValueForDisplay = attacker.defenseStat && attacker.pokemon ? calculateBaseStatValue(attacker.pokemon.baseStats.defense, attacker.defenseStat.iv, attacker.defenseStat.ev || 0, 50, attacker.defenseStat.nature) : 0;

    const showTeraBlastSettings = attacker.move?.isTeraBlast && (attacker.teraType !== null || attacker.isStellar) && attacker.isEnabled;
    const showStarstormCategoryInfo = attacker.move?.id === "terastarstorm" && attacker.pokemon?.id === "1024-s" && attacker.starstormDeterminedCategory && attacker.isEnabled;
    const showPhotonGeyserCategoryInfo = attacker.move?.id === "photongeyser" && attacker.photonGeyserDeterminedCategory && attacker.isEnabled;
    const isProtosynthesisSelected = attacker.ability?.id === 'protosynthesis' && attacker.isEnabled && attacker.pokemon;
    const isQuarkDriveSelected = attacker.ability?.id === 'quark_drive' && attacker.isEnabled && attacker.pokemon;

    const moveName = attacker.move?.name;
    let currentStatInputsToRender = null;
    let hpEvSliderToShow = null;
    let hpDependentInputsToShow = null;
    let defenderAttackControlsToShow = null;

    const showRankBasedPowerSelect = attacker.move?.isRankBasedPower && attacker.isEnabled && attacker.pokemon;
    const selectedRankBasedPower = attacker.moveUiOptionStates?.['rankBasedPowerValue'] as number | undefined ?? 20;


      const attackInputsJsx = attacker.pokemon ? (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-white font-medium">こうげき</label>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={attacker.attackInputValue}
              onChange={(e) => handleAttackInputChange(e, index)}
              onBlur={() => handleAttackInputBlur(index)}
              className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg"
              disabled={!attacker.isEnabled || !attacker.pokemon}
              min="0"
            />
          </div>
          <StatSlider
            value={attacker.attackStat?.ev || 0}
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
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${(attacker.attackStat?.nature || 1.0) === n ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-600 hover:bg-gray-500'}`}
                    disabled={!attacker.isEnabled || !attacker.pokemon}
                  >
                    x{n.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">努力値: {attacker.attackStat?.ev || 0}</span>
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
              value={attacker.attackStat?.rank || 0}
              onChange={(rank) => handleAttackRankChange(rank, index)}
              label="こうげきランク"
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          </div>
        </div>
      ) : null;

      const specialAttackInputsJsx = attacker.pokemon ? (
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-white font-medium">とくこう</label>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={attacker.specialAttackInputValue}
              onChange={(e) => handleSpecialAttackInputChange(e, index)}
              onBlur={() => handleSpecialAttackInputBlur(index)}
              className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg"
              disabled={!attacker.isEnabled || !attacker.pokemon}
              min="0"
            />
          </div>
          <StatSlider
            value={attacker.specialAttackStat?.ev || 0}
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
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${(attacker.specialAttackStat?.nature || 1.0) === n ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-600 hover:bg-gray-500'}`}
                    disabled={!attacker.isEnabled || !attacker.pokemon}
                  >
                    x{n.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">努力値: {attacker.specialAttackStat?.ev || 0}</span>
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
              value={attacker.specialAttackStat?.rank || 0}
              onChange={(rank) => handleSpecialAttackRankChange(rank, index)}
              label="とくこうランク"
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          </div>
        </div>
      ) : null;

      let attackSectionContent = null;
      let specialAttackSectionContent = null;

      const selectedMove = attacker.move;
      const isTeraBurstSelected = selectedMove?.isTeraBlast;
      const isStarstormSelectedByTerapagosStellar = selectedMove?.id === "terastarstorm" && attacker.pokemon?.id === "1024-s";
      const isPhotonGeyserSelected = selectedMove?.id === "photongeyser";


      if (isTeraBurstSelected || isStarstormSelectedByTerapagosStellar || isPhotonGeyserSelected) {
          attackSectionContent = attackInputsJsx;
          specialAttackSectionContent = specialAttackInputsJsx;
      } else if (selectedMove) {
          const moveCategory = selectedMove.category;
          if (moveCategory === MoveCategory.Physical) {
              attackSectionContent = attackInputsJsx;
          } else if (moveCategory === MoveCategory.Special) {
              specialAttackSectionContent = specialAttackInputsJsx;
          }
      } else {
          attackSectionContent = attackInputsJsx;
          specialAttackSectionContent = specialAttackInputsJsx;
      }

      if (attackSectionContent && specialAttackSectionContent) {
          currentStatInputsToRender = (
              <div className="space-y-6">
                  {attackSectionContent}
                  {specialAttackSectionContent}
              </div>
          );
      } else if (attackSectionContent) {
          currentStatInputsToRender = attackSectionContent;
      } else if (specialAttackSectionContent) {
          currentStatInputsToRender = specialAttackSectionContent;
      } else {
          currentStatInputsToRender = null; // Or a placeholder if nothing is selected
      }

    if (moveName === "イカサマ") {
      currentStatInputsToRender = <FoulPlayDisplay />;
      hpEvSliderToShow = null;
      hpDependentInputsToShow = null;
      defenderAttackControlsToShow = (
        <>
          <div className="mt-3">
            <StatSlider
              label="相手のこうげき努力値"
              // ▼▼▼ ここを修正 ▼▼▼
              value={defenderAttackStat.ev}
              max={252}
              step={4}
              onChange={(newEv) => handleDefenderOffensiveStatChange({ ev: Math.max(0, Math.min(Math.floor(newEv / 4) * 4, 252)) })}
              disabled={!attacker.isEnabled || !attacker.pokemon || defenderAttackStat.base === 0}
              currentStat={defenderAttackStat.final}
              baseStat={defenderAttackStat.base}
            />
          </div>
          <div className="mt-3">
            <RankSelector
              // ▼▼▼ ここを修正 ▼▼▼
              value={defenderAttackStat.rank}
              onChange={(newRank) => handleDefenderOffensiveStatChange({ rank: newRank })}
              label="相手のこうげきランク"
              disabled={!attacker.isEnabled || !attacker.pokemon || defenderAttackStat.base === 0}
            />
          </div>
          </>
        );
      } else if ((moveName === "ふんか" || moveName === "しおふき") && attacker.move) {
        hpDependentInputsToShow = (
          <HpDependentPowerInputs
            actualMaxHp={attacker.actualMaxHp}
            currentHp={attacker.currentHp}
            baseMovePower={attacker.move.power || 150} // Use original base power for display
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
      } else if (moveName === "ボディプレス") {
        currentStatInputsToRender = (
          <BodyPressDefenseInputs
            attacker={attacker}
            index={index}
            defenseBaseValueForDisplay={defenseBaseValueForDisplay}
            onDefenseInputChange={handleDefenseInputChange}
            onDefenseInputBlur={() => handleDefenseInputBlur(index)}
            onDefenseEvChange={(ev) => handleDefenseEvChange(ev, index)}
            onDefenseNatureChange={(nature) => handleDefenseNatureChange(nature, index)}
            onDefenseRankChange={(rank) => handleDefenseRankChange(rank, index)}
          />
        );
      }

    return (
      <div key={index} className={`bg-gray-800 rounded-lg p-4 mb-4 ${!attacker.isEnabled ? 'opacity-60' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h5 className="text-lg font-semibold text-white">攻撃側 {index + 1}</h5>
            <div className="flex items-center">
              <input type="checkbox" checked={attacker.isEnabled} onChange={() => toggleAttacker(index)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
              <span className="ml-2 text-sm text-gray-300">有効</span>
            </div>
          </div>
          {attackers.length > 1 && (
            <button onClick={() => removeAttacker(index)} className="text-gray-400 hover:text-red-500 transition-colors">
              <X className="h-5 w-5" /><span className="text-sm sr-only">削除</span>
            </button>
          )}
        </div>
        <div className={`${!attacker.isEnabled ? 'pointer-events-none' : ''}`}>
           {attacker.pokemon && (
             <div className="flex items-center gap-3 mb-3">
               <img src={`/icon/${attacker.pokemon.id.toString().padStart(3, '0')}.png`} alt={attacker.pokemon.name} className="w-8 h-8 object-contain" />
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

          <PokemonSelect pokemon={pokemonList} selected={attacker.pokemon} onChange={(p) => handlePokemonChange(p, index)} label="" disabled={!attacker.isEnabled}/>

 <div className="my-4">
            <MoveSelect
                moves={moves}
                selected={attacker.effectiveMove ? attacker.effectiveMove : attacker.move}
                onChange={(m) => setMove(index, m)} // ★★★ ここを修正 ★★★
                label="わざ"
                onToggleTera={() => handleToggleTera(index)}
                currentAttackerTeraType={attacker.teraType}
                isStellar={attacker.isStellar}
                onToggleStellar={() => handleToggleStellar(index)}
                disabled={!attacker.isEnabled || !attacker.pokemon}
                loadedMoves={attacker.loadedMoves}
            />
          </div>

          {showRankBasedPowerSelect && (
            <div className="mt-3 p-3 bg-gray-700/50 rounded-md">
              <label htmlFor={`rank-power-select-${index}`} className="block text-sm font-medium text-gray-300 mb-1">
                技威力 ({attacker.move?.name})
              </label>
              <select
                id={`rank-power-select-${index}`}
                value={selectedRankBasedPower}
                onChange={(e) => handleRankBasedPowerChange(parseInt(e.target.value, 10), index)}
                className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                disabled={!attacker.isEnabled}
              >
                {rankBasedPowerOptions.map(powerValue => (
                  <option key={powerValue} value={powerValue}>
                    {powerValue}
                  </option>
                ))}
              </select>
            </div>
          )}


          {attacker.move && typeof attacker.move.multihit === 'number' && attacker.move.multihit > 1 && attacker.isEnabled && attacker.pokemon && (
            <HitCountSelect
              label="ヒット回数"
              maxHits={attacker.move.multihit}
              selectedCount={attacker.selectedHitCount}
              onChange={(count) => handleHitCountChange(count, index)}
              disabled={!attacker.isEnabled || !attacker.pokemon}
            />
          )}
          {attacker.move && attacker.move.multihit === '2-5' && attacker.isEnabled && attacker.pokemon && (
             <HitCountSelect
              label="ヒット回数 (2-5回)"
              maxHits={5}
              minHits={2}
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
                      updateAttacker(index, { moveUiOptionStates: newUiOptionStates });
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
                onTeraTypeChange={(type) => {
                    updateAttacker(index, { teraType: type, isStellar: type === null ? attacker.isStellar : false });
                }}
                onCategorySelect={(cat) => handleTeraBlastCategorySelect(cat, index)}
            />
          )}

          {showStarstormCategoryInfo && (
            <div className="mt-2 text-sm text-gray-300">
                テラクラスター計算カテゴリ: <span className="font-semibold text-white">{attacker.starstormDeterminedCategory === MoveCategory.Physical ? '物理' : '特殊'}</span>
            </div>
          )}

          {showPhotonGeyserCategoryInfo && (
            <div className="mt-2 text-sm text-gray-300">
                フォトンゲイザー計算カテゴリ: <span className="font-semibold text-white">{attacker.photonGeyserDeterminedCategory === MoveCategory.Physical ? '物理' : '特殊'}</span>
            </div>
          )}
          
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 bg-slate-700  rounded-lg mt-1.5 mb-1.5 shadow">
            <span className="text-sm font-medium text-gray-300 whitespace-nowrap pl-1 w-20">持ち物</span>
            <div className="w-full">
              <ItemSelect
                items={items}
                selected={attacker.item}
                onChange={(i) => handleItemChange(i, index)}
                label=""
                side="attacker"
                disabled={!attacker.isEnabled || !attacker.pokemon}
              />
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 bg-slate-700  rounded-lg mt-1.5　mb-1.5　shadow">
            <span className="text-sm font-medium text-gray-300 whitespace-nowrap pl-1 w-20">特性</span>
            <div className="w-full">
              <AbilitySelect
                abilities={abilities}
                selected={attacker.ability}
                onChange={(a) => handleAbilityChange(a, index)}
                label=""
                side="attacker"
                selectedPokemon={attacker.pokemon}
                disabled={!attacker.isEnabled || !attacker.pokemon}
                 protosynthesisConfig={ isProtosynthesisSelected ? {
                    manualTrigger: attacker.protosynthesisManualTrigger,
                    boostedStat: attacker.protosynthesisBoostedStat,
                } : undefined}
                onProtosynthesisConfigChange={isProtosynthesisSelected ? (config) => {
                  updateAttacker(index, {
                    protosynthesisManualTrigger: config.manualTrigger,
                    protosynthesisBoostedStat: config.boostedStat,
                  });
                } : undefined}
                quarkDriveConfig={isQuarkDriveSelected ? {
                  manualTrigger: attacker.quarkDriveManualTrigger,
                  boostedStat: attacker.quarkDriveBoostedStat,
                } : undefined}
                onQuarkDriveConfigChange={isQuarkDriveSelected ? (config) => {
                  updateAttacker(index, {
                    quarkDriveManualTrigger: config.manualTrigger,
                    quarkDriveBoostedStat: config.boostedStat,
                  });
                } : undefined}
              />
            </div>
          </div>
          {attacker.ability?.uiTriggers && attacker.isEnabled && attacker.pokemon && (
            <div className="mt-3 p-3 bg-gray-700/50 rounded-md space-y-2">
              <h5 className="text-sm font-semibold text-gray-300 mb-1">{attacker.ability.name} 追加設定</h5>
              {attacker.ability.uiTriggers.map(trigger => (
                <div key={trigger.key}>
                  {trigger.type === 'checkbox' && (
                    <label htmlFor={`ability-flag-${index}-${trigger.key}`} className="flex items-center text-xs text-gray-200 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`ability-flag-${index}-${trigger.key}`}
                        checked={!!attacker.abilityUiFlags?.[trigger.key]}
                        onChange={(e) => {
                          const newFlags = { ...(attacker.abilityUiFlags || {}), [trigger.key]: e.target.checked };
                          updateAttacker(index, { abilityUiFlags: newFlags });
                        }}
                        className="w-3.5 h-3.5 rounded border-gray-500 bg-gray-800 text-blue-500 mr-1.5 focus:ring-blue-500 focus:ring-offset-gray-900"
                      />
                      {trigger.label}
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}


          {isProtosynthesisSelected && (
            <div className="mt-4 p-3 bg-gray-700 ">
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">こだいかっせい 設定</h5>
              <div className="mb-1">
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


          {hpDependentInputsToShow && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">威力計算用HP設定</h4>
              {hpDependentInputsToShow}
              {hpEvSliderToShow}
            </div>
          )}

          <div className="mt-6">
            {currentStatInputsToRender}
            {defenderAttackControlsToShow}
          </div>

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
    <div className="bg-gray-900 rounded-lg shadow-lg">
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