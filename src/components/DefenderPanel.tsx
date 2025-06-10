import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Pokemon, StatCalculation, NatureModifier, Item, Ability, PokemonType, DefenderState, ProtosynthesisBoostTarget } from '../types';
import PokemonSelect from './PokemonSelect';
import ItemSelect from './ItemSelect';
import AbilitySelect from './AbilitySelect';
import StatSlider from './StatSlider';
import RankSelector from './RankSelector';
import { useGlobalStateStore } from '../stores/globalStateStore';
import { useDefenderStore } from '../stores/defenderStore';

const ALL_POKEMON_TYPES = ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"] as const;
const LEVEL = 50;
const PROTOSYNTHESIS_ABILITY_ID = 'protosynthesis';
const QUARK_DRIVE_ABILITY_ID = 'quark_drive';
import { getTypeColor, getTypeNameJp } from '../utils/uiHelpers';


interface DefenderPanelProps {
  pokemonList: Pokemon[];
  items: Item[];
  abilities: Ability[];
  showDefender2: boolean; 
}

const DefenderPanel: React.FC<DefenderPanelProps> = ({
  pokemonList,
  items,
  abilities,
  showDefender2,
}) => {
  const { 
    hasReflect, setHasReflect, 
    hasLightScreen, setHasLightScreen, 
    hasFriendGuard, setHasFriendGuard, 
    defenderIsTerastallized, setDefenderIsTerastallized 
  } = useGlobalStateStore();
  
  const {
    pokemon: selectedPokemon, item: selectedItem, ability: selectedAbility,
    hpStat, defenseStat, specialDefenseStat,
    hpInputValue, defenseInputValue, specialDefenseInputValue,
    protosynthesisBoostedStat, protosynthesisManualTrigger,
    quarkDriveBoostedStat, quarkDriveManualTrigger,
    defender2Item, defender2Ability, userModifiedTypes,
    setPokemon, updateStat, updateStatValue, updateStatFromInput,
    setDefenderState, setDefender2Item, setDefender2Ability, setUserModifiedTypes
  } = useDefenderStore();

  const [showType1Dropdown, setShowType1Dropdown] = useState(false);
  const [showType2Dropdown, setShowType2Dropdown] = useState(false);
  const type1DropdownRef = useRef<HTMLDivElement>(null);
  const type2DropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (type1DropdownRef.current && !type1DropdownRef.current.contains(event.target as Node)) {
        setShowType1Dropdown(false);
      }
      if (type2DropdownRef.current && !type2DropdownRef.current.contains(event.target as Node)) {
        setShowType2Dropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateBaseStatValue = (base: number, iv: number, ev: number, level: number, nature: NatureModifier, isHpStat: boolean = false): number => {
    if (!base || base <= 0) return 0;
    if (isHpStat) {
      if (base === 1) return 1;
      return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
    }
    let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    return Math.floor(stat * nature);
  };
  
  const handleHpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => updateStatValue('hp', e.target.value);
  const handleDefenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => updateStatValue('defense', e.target.value);
  const handleSpecialDefenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => updateStatValue('specialDefense', e.target.value);

  const handleHpInputBlur = () => updateStatFromInput('hp');
  const handleDefenseInputBlur = () => updateStatFromInput('defense');
  const handleSpecialDefenseInputBlur = () => updateStatFromInput('specialDefense');
  
  const handleHpEvChangeDirect = (ev: number) => updateStat('hp', { ev });
  const handleDefenseEvChangeDirect = (ev: number) => updateStat('defense', { ev });
  const handleSpecialDefenseEvChangeDirect = (ev: number) => updateStat('specialDefense', { ev });
  
  const handleDefenseNatureChangeDirect = (nature: NatureModifier) => updateStat('defense', { nature });
  const handleSpecialDefenseNatureChangeDirect = (nature: NatureModifier) => updateStat('specialDefense', { nature });

  const handleDefenseRankChangeDirect = (rank: number) => updateStat('defense', { rank });
  const handleSpecialDefenseRankChangeDirect = (rank: number) => updateStat('specialDefense', { rank });

  const handleProtosynthesisBoostedStatChangeForDefender = (stat: ProtosynthesisBoostTarget | null) => setDefenderState({ protosynthesisBoostedStat: stat });
  const handleProtosynthesisManualTriggerChangeForDefender = (isActive: boolean) => setDefenderState({ protosynthesisManualTrigger: isActive });
  const handleQuarkDriveBoostedStatChangeForDefender = (stat: ProtosynthesisBoostTarget | null) => setDefenderState({ quarkDriveBoostedStat: stat });
  const handleQuarkDriveManualTriggerChangeForDefender = (isActive: boolean) => setDefenderState({ quarkDriveManualTrigger: isActive });
  const handleAbilityChangeForDefender = (ability: Ability | null) => setDefenderState({ ability });

  const isProtosynthesisSelectedOnDefender = selectedAbility?.id === PROTOSYNTHESIS_ABILITY_ID && selectedPokemon;
  const isQuarkDriveSelectedOnDefender = selectedAbility?.id === QUARK_DRIVE_ABILITY_ID && selectedPokemon;

  const hpBaseValueForDisplay = selectedPokemon ? calculateBaseStatValue(selectedPokemon.baseStats.hp, hpStat.iv, hpStat.ev, LEVEL, hpStat.nature, true) : 0;
  const defenseBaseValueForDisplay = selectedPokemon ? calculateBaseStatValue(selectedPokemon.baseStats.defense, defenseStat.iv, defenseStat.ev, LEVEL, defenseStat.nature) : 0;
  const specialDefenseBaseValueForDisplay = selectedPokemon ? calculateBaseStatValue(selectedPokemon.baseStats.specialDefense, specialDefenseStat.iv, specialDefenseStat.ev, LEVEL, specialDefenseStat.nature) : 0;

  const currentTypes: [PokemonType, PokemonType?] = useMemo(() => {
    if (defenderIsTerastallized && selectedPokemon && selectedPokemon.teraType) return [selectedPokemon.teraType];
    if (userModifiedTypes) return userModifiedTypes;
    if (selectedPokemon) return [selectedPokemon.types[0], selectedPokemon.types[1] || undefined];
    return [PokemonType.Normal];
  }, [selectedPokemon, defenderIsTerastallized, userModifiedTypes]);

  const handleSelectType1 = (newType: PokemonType) => {
    if (defenderIsTerastallized) {
      setDefenderState({ teraType: newType, isStellar: false });
    } else {
      const currentType2 = userModifiedTypes ? userModifiedTypes[1] : (selectedPokemon?.types[1] || undefined);
      const newType2 = newType === currentType2 ? undefined : currentType2;
      setUserModifiedTypes([newType, newType2]);
    }
    setShowType1Dropdown(false);
  };

  const handleSelectType2 = (newType?: PokemonType) => {
    if (!defenderIsTerastallized) {
      const currentType1 = userModifiedTypes ? userModifiedTypes[0] : (selectedPokemon?.types[0] || PokemonType.Normal);
      setUserModifiedTypes([currentType1, newType]);
    }
    setShowType2Dropdown(false);
  };

  const handleResetTypes = () => {
    setUserModifiedTypes(null);
    setDefenderIsTerastallized(false);
    setDefenderState({ teraType: null, isStellar: false });
  };

  const handleTerastallizedToggle = (checked: boolean) => {
    setDefenderIsTerastallized(checked);
    if (checked) {
      if (!selectedPokemon?.teraType && currentTypes[0]) {
        setDefenderState({ teraType: currentTypes[0], isStellar: false });
      }
    } else {
      setDefenderState({ teraType: null, isStellar: false });
    }
  };

  const type1ButtonText = getTypeNameJp(currentTypes[0]) || 'タイプ1';
  const type2ButtonText = getTypeNameJp(currentTypes[1]) || (defenderIsTerastallized ? '' : 'タイプ2');

  const userConfigurableBaseTypes: [PokemonType, PokemonType?] = userModifiedTypes ?? (selectedPokemon ? [selectedPokemon.types[0], selectedPokemon.types[1] || undefined] : [PokemonType.Normal, undefined]);
  const availableTypesForType1 = ALL_POKEMON_TYPES.filter(t => defenderIsTerastallized || t !== userConfigurableBaseTypes[1]);
  const availableTypesForType2 = ALL_POKEMON_TYPES.filter(t => t !== userConfigurableBaseTypes[0]);

  return (
    <div className="bg-gray-900 p-1 rounded-lg shadow-lg">
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">防御側</h3>
        </div>
        {selectedPokemon && (
          <div className="flex items-center gap-3 mb-3">
            <img src={`/icon/${selectedPokemon.id.toString().padStart(3, '0')}.png`} alt={selectedPokemon.name} className="w-8 h-8" />
            <div className="flex flex-col">
              <div className="flex gap-1">
                {selectedPokemon.types.map((type, typeIndex) => (
                  <span key={typeIndex} className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: getTypeColor(type) }}>
                    {getTypeNameJp(type)}
                  </span>
                ))}
              </div>
              <div className="text-sm font-mono text-gray-300 mt-1">
                H{selectedPokemon.baseStats.hp} A{selectedPokemon.baseStats.attack} B{selectedPokemon.baseStats.defense} C{selectedPokemon.baseStats.specialAttack} D{selectedPokemon.baseStats.specialDefense} S{selectedPokemon.baseStats.speed}
              </div>
            </div>
          </div>
        )}

        <PokemonSelect pokemon={pokemonList} selected={selectedPokemon} onChange={(p) => setPokemon(p)} label="ポケモン" />

        {selectedPokemon && (
          <div className="mt-4">
            <div className="flex items-center mb-1">
              <label className="text-sm font-medium text-gray-300 mr-2">タイプ</label>
              <input type="checkbox" id="defender1Terastallized" checked={defenderIsTerastallized} onChange={(e) => handleTerastallizedToggle(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" disabled={!selectedPokemon} />
              <label htmlFor="defender1Terastallized" className={`ml-1 text-sm ${!selectedPokemon ? 'text-gray-500' : 'text-white'}`}>テラスタル</label>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-1/2" ref={type1DropdownRef}>
                <button onClick={() => setShowType1Dropdown(!showType1Dropdown)} className="w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center">
                  {type1ButtonText}
                  <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${showType1Dropdown ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                {showType1Dropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    {availableTypesForType1.map((t) => (
                      <div key={`type1-${t}`} onClick={() => handleSelectType1(t)} className="px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">{getTypeNameJp(t)}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative w-1/2" ref={type2DropdownRef}>
                <button onClick={() => setShowType2Dropdown(!showType2Dropdown)} className={`w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center ${defenderIsTerastallized ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={defenderIsTerastallized}>
                  {type2ButtonText}
                  <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${showType2Dropdown ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                {showType2Dropdown && !defenderIsTerastallized && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div onClick={() => handleSelectType2(undefined)} className="px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">なし</div>
                    {availableTypesForType2.map((t) => (
                      <div key={`type2-${t}`} onClick={() => handleSelectType2(t)} className="px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">{getTypeNameJp(t)}</div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={handleResetTypes} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900" title="タイプをリセット">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v4a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 bg-slate-700 rounded-lg mt-1.5 mb-1.5 shadow">
          <span className="text-sm font-medium text-gray-300 whitespace-nowrap pl-1 w-20">持ち物</span>
          <div className="w-full"><ItemSelect items={items} selected={selectedItem} onChange={(item) => setDefenderState({ item })} label="" side="defender" disabled={!selectedPokemon} /></div>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 bg-slate-700 rounded-lg mt-1.5 mb-1.5 shadow">
          <span className="text-sm font-medium text-gray-300 whitespace-nowrap pl-1 w-20">特性</span>
          <div className="w-full"><AbilitySelect abilities={abilities} selected={selectedAbility} onChange={handleAbilityChangeForDefender} label="" side="defender" selectedPokemon={selectedPokemon} disabled={!selectedPokemon} onProtosynthesisConfigChange={isProtosynthesisSelectedOnDefender ? (config) => setDefenderState({ protosynthesisManualTrigger: config.manualTrigger, protosynthesisBoostedStat: config.boostedStat }) : undefined} onQuarkDriveConfigChange={isQuarkDriveSelectedOnDefender ? (config) => setDefenderState({ quarkDriveManualTrigger: config.manualTrigger, quarkDriveBoostedStat: config.boostedStat }) : undefined} /></div>
        </div>
        {isProtosynthesisSelectedOnDefender && (
          <div className="mt-4 p-3 bg-gray-700 rounded-md">
            <h5 className="text-sm font-semibold text-yellow-400 mb-2">こだいかっせい 設定</h5>
            <div className="mb-2"><label htmlFor="proto-stat-defender" className="block text-xs font-medium text-gray-300 mb-1">上昇する能力:</label><select id="proto-stat-defender" value={protosynthesisBoostedStat || ''} onChange={(e) => handleProtosynthesisBoostedStatChangeForDefender(e.target.value as ProtosynthesisBoostTarget | null)} className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" disabled={!selectedPokemon}><option value="" disabled>選択してください</option><option value="attack">こうげき</option><option value="defense">ぼうぎょ</option><option value="specialAttack">とくこう</option><option value="specialDefense">とくぼう</option><option value="speed">すばやさ</option></select></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="proto-manual-defender" checked={!!protosynthesisManualTrigger} onChange={(e) => handleProtosynthesisManualTriggerChangeForDefender(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700" disabled={!selectedPokemon} /><label htmlFor="proto-manual-defender" className="text-xs text-gray-300">手動で発動させる</label></div>
          </div>
        )}
        {isQuarkDriveSelectedOnDefender && (
          <div className="mt-4 p-3 bg-gray-700 rounded-md">
            <h5 className="text-sm font-semibold text-purple-400 mb-2">クォークチャージ 設定</h5>
            <div className="mb-2"><label htmlFor="quark-stat-defender" className="block text-xs font-medium text-gray-300 mb-1">上昇する能力:</label><select id="quark-stat-defender" value={quarkDriveBoostedStat || ''} onChange={(e) => handleQuarkDriveBoostedStatChangeForDefender(e.target.value as ProtosynthesisBoostTarget | null)} className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" disabled={!selectedPokemon}><option value="" disabled>選択してください</option><option value="attack">こうげき</option><option value="defense">ぼうぎょ</option><option value="specialAttack">とくこう</option><option value="specialDefense">とくぼう</option><option value="speed">すばやさ</option></select></div>
            <div className="flex items-center gap-2"><input type="checkbox" id="quark-manual-defender" checked={!!quarkDriveManualTrigger} onChange={(e) => handleQuarkDriveManualTriggerChangeForDefender(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700" disabled={!selectedPokemon} /><label htmlFor="quark-manual-defender" className="text-xs text-gray-300">手動で発動させる</label></div>
          </div>
        )}
      </div>

      {showDefender2 && selectedPokemon && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">防御側 2体目用</h3>
          <div className="text-sm text-white mb-2">{selectedPokemon.name}</div>
          <div className="flex items-center gap-3 mb-3">
            <img src={`/icon/${selectedPokemon.id.toString().padStart(3, '0')}.png`} alt={selectedPokemon.name} className="w-8 h-8" />
            <div className="flex flex-col">
              <div className="flex gap-1">
                {currentTypes[0] && <span className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: getTypeColor(currentTypes[0]) }}>{getTypeNameJp(currentTypes[0])}</span>}
                {currentTypes[1] && <span className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: getTypeColor(currentTypes[1]) }}>{getTypeNameJp(currentTypes[1])}</span>}
                {(!currentTypes[0] && !currentTypes[1]) && <span className="text-xs text-gray-400">タイプなし</span>}
              </div>
              <div className="text-sm font-mono text-gray-300 mt-1">H{selectedPokemon.baseStats.hp} A{selectedPokemon.baseStats.attack} B{selectedPokemon.baseStats.defense} C{selectedPokemon.baseStats.specialAttack} D{selectedPokemon.baseStats.specialDefense} S{selectedPokemon.baseStats.speed}</div>
            </div>
          </div>
          {defenderIsTerastallized && <div className="mt-2 text-sm text-yellow-400">(防御側1のテラスタル状態を共有)</div>}
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 bg-slate-700 rounded-lg mt-1.5 mb-1.5 shadow">
            <span className="text-sm font-medium text-gray-300 whitespace-nowrap pl-1 w-20">持ち物</span>
            <div className="w-full"><ItemSelect items={items} selected={defender2Item} onChange={setDefender2Item} label="" side="defender" disabled={!selectedPokemon} /></div>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 bg-slate-700 rounded-lg mt-1.5 mb-1.5 shadow">
            <span className="text-sm font-medium text-gray-300 whitespace-nowrap pl-1 w-20">特性</span>
            <div className="w-full"><AbilitySelect abilities={abilities} selected={defender2Ability} onChange={setDefender2Ability} label="" side="defender" selectedPokemon={selectedPokemon} disabled={!selectedPokemon} /></div>
          </div>
          <p className="text-xs text-gray-400 mt-3">※ 防御側2の能力値・ランク・バトル状態は防御側1と共通です。</p>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1"><label htmlFor="hp-input-defender" className="text-white font-medium">HP</label><input id="hp-input-defender" type="number" inputMode="numeric" pattern="[0-9]*" value={hpInputValue} onChange={handleHpInputChange} onBlur={handleHpInputBlur} className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg" disabled={!selectedPokemon} min="0" /></div>
            <StatSlider value={hpStat.ev} onChange={handleHpEvChangeDirect} max={252} step={4} currentStat={hpBaseValueForDisplay} baseStat={selectedPokemon?.baseStats.hp} disabled={!selectedPokemon} />
            <div className="flex justify-end items-start mt-2"><div className="text-right"><span className="text-sm text-gray-400">努力値: {hpStat.ev}</span><div className="flex gap-1 mt-1 justify-end"><button onClick={() => handleHpEvChangeDirect(0)} className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors" disabled={!selectedPokemon}>0</button><button onClick={() => handleHpEvChangeDirect(252)} className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors" disabled={!selectedPokemon}>252</button></div></div></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1"><label htmlFor="def-input-defender" className="text-white font-medium">ぼうぎょ</label><input id="def-input-defender" type="number" inputMode="numeric" pattern="[0-9]*" value={defenseInputValue} onChange={handleDefenseInputChange} onBlur={handleDefenseInputBlur} className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg" disabled={!selectedPokemon} min="0" /></div>
            <StatSlider value={defenseStat.ev} onChange={handleDefenseEvChangeDirect} max={252} step={4} currentStat={defenseBaseValueForDisplay} baseStat={selectedPokemon?.baseStats.defense} disabled={!selectedPokemon} />
            <div className="flex justify-between items-start mt-2">
              <div><label className="text-sm text-gray-400">性格補正</label><div className="flex gap-1 mt-1">{[0.9, 1.0, 1.1].map((n) => (<button key={n} onClick={() => handleDefenseNatureChangeDirect(n as NatureModifier)} className={`px-3 py-1 text-xs rounded-md transition-colors ${defenseStat.nature === n ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-600 hover:bg-gray-500'}`} disabled={!selectedPokemon}>x{n.toFixed(1)}</button>))}</div></div>
              <div className="text-right"><span className="text-sm text-gray-400">努力値: {defenseStat.ev}</span><div className="flex gap-1 mt-1 justify-end"><button onClick={() => handleDefenseEvChangeDirect(0)} className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors" disabled={!selectedPokemon}>0</button><button onClick={() => handleDefenseEvChangeDirect(252)} className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors" disabled={!selectedPokemon}>252</button></div></div>
            </div>
            <div className="mt-4"><RankSelector value={defenseStat.rank} onChange={handleDefenseRankChangeDirect} label="ぼうぎょランク" disabled={!selectedPokemon} /></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1"><label htmlFor="spd-input-defender" className="text-white font-medium">とくぼう</label><input id="spd-input-defender" type="number" inputMode="numeric" pattern="[0-9]*" value={specialDefenseInputValue} onChange={handleSpecialDefenseInputChange} onBlur={handleSpecialDefenseInputBlur} className="w-24 bg-gray-700 text-white text-center p-1 rounded-md text-lg" disabled={!selectedPokemon} min="0" /></div>
            <StatSlider value={specialDefenseStat.ev} onChange={handleSpecialDefenseEvChangeDirect} max={252} step={4} currentStat={specialDefenseBaseValueForDisplay} baseStat={selectedPokemon?.baseStats.specialDefense} disabled={!selectedPokemon} />
            <div className="flex justify-between items-start mt-2">
              <div><label className="text-sm text-gray-400">性格補正</label><div className="flex gap-1 mt-1">{[0.9, 1.0, 1.1].map((n) => (<button key={n} onClick={() => handleSpecialDefenseNatureChangeDirect(n as NatureModifier)} className={`px-3 py-1 text-xs rounded-md transition-colors ${specialDefenseStat.nature === n ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-600 hover:bg-gray-500'}`} disabled={!selectedPokemon}>x{n.toFixed(1)}</button>))}</div></div>
              <div className="text-right"><span className="text-sm text-gray-400">努力値: {specialDefenseStat.ev}</span><div className="flex gap-1 mt-1 justify-end"><button onClick={() => handleSpecialDefenseEvChangeDirect(0)} className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors" disabled={!selectedPokemon}>0</button><button onClick={() => handleSpecialDefenseEvChangeDirect(252)} className="w-12 py-1 text-xs rounded-md bg-gray-600 hover:bg-gray-500 transition-colors" disabled={!selectedPokemon}>252</button></div></div>
            </div>
            <div className="mt-4"><RankSelector value={specialDefenseStat.rank} onChange={handleSpecialDefenseRankChangeDirect} label="とくぼうランク" disabled={!selectedPokemon} /></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2"><input type="checkbox" id="reflect" checked={hasReflect} onChange={(e) => setHasReflect(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" /><label htmlFor="reflect" className="text-sm text-white">リフレクター</label></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="lightScreen" checked={hasLightScreen} onChange={(e) => setHasLightScreen(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" /><label htmlFor="lightScreen" className="text-sm text-white">ひかりのかべ</label></div>
          <div className="flex items-center gap-2"><input type="checkbox" id="friendGuard" checked={hasFriendGuard} onChange={(e) => setHasFriendGuard(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" /><label htmlFor="friendGuard" className="text-sm text-white">フレンドガード</label></div>
        </div>
      </div>
    </div>
  );
};

export default DefenderPanel;