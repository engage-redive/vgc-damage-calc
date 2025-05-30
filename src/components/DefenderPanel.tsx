import React, { useState, useEffect, useRef } from 'react';
import { Pokemon, StatCalculation, NatureModifier, Item, Ability, PokemonType, DefenderState, ProtosynthesisBoostTarget } from '../types'; // ProtosynthesisBoostTarget は quarkDrive にも流用
import PokemonSelect from './PokemonSelect';
import ItemSelect from './ItemSelect';
import AbilitySelect from './AbilitySelect';
import StandardDefensiveStatInputs from './defenderSpecific/StandardDefensiveStatInputs';

const ALL_POKEMON_TYPES = ["normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"] as const;
const LEVEL = 50;

// 日本語のタイプ名と色の定義 (AttackerPanel.tsx と共通)
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
  if (!type) return ''; // タイプがない場合は空文字を返す
  const typeKey = (typeof type === 'string' ? type.toLowerCase() : type.toString().toLowerCase()) as keyof typeof TYPE_NAME_JP;
  return TYPE_NAME_JP[typeKey] || typeKey.toString();
};

const getTypeColor = (type: PokemonType | string): string => {
  if (!type) return '#777777'; // タイプがない場合はデフォルト色
  const typeKey = (typeof type === 'string' ? type.toLowerCase() : type.toString().toLowerCase()) as keyof typeof TYPE_COLORS;
  return TYPE_COLORS[typeKey] || '#777777';
};


interface DefenderPanelProps {
  pokemonList: Pokemon[];
  items: Item[];
  abilities: Ability[];
  defenderState: DefenderState;
  onDefenderStateChange: (updates: Partial<DefenderState>) => void;

  hasReflect: boolean;
  onReflectChange: (value: boolean) => void;
  hasLightScreen: boolean;
  onLightScreenChange: (value: boolean) => void;
  hasFriendGuard: boolean;
  onFriendGuardChange: (value: boolean) => void;

  currentTypes: [PokemonType, PokemonType?];
  onTypeChange: (types: [PokemonType, PokemonType?]) => void;
  isTerastallized: boolean;
  onIsTerastallizedChange: (value: boolean) => void;

  userConfigurableBaseTypes: [PokemonType, PokemonType?];
  onUserConfigurableBaseTypesChange: (types: [PokemonType, PokemonType?]) => void;

  showDefender2: boolean;
  defender2Item: Item | null;
  onDefender2ItemChange: (item: Item | null) => void;
  defender2Ability: Ability | null;
  onDefender2AbilityChange: (ability: Ability | null) => void;
}

const DefenderPanel: React.FC<DefenderPanelProps> = ({
  pokemonList,
  items,
  abilities,
  defenderState,
  onDefenderStateChange,
  hasReflect, onReflectChange,
  hasLightScreen, onLightScreenChange,
  hasFriendGuard, onFriendGuardChange,
  currentTypes, onTypeChange,
  isTerastallized, onIsTerastallizedChange,
  userConfigurableBaseTypes, onUserConfigurableBaseTypesChange,
  showDefender2, defender2Item, onDefender2ItemChange, defender2Ability, onDefender2AbilityChange,
}) => {
  const [showType1Dropdown, setShowType1Dropdown] = useState(false);
  const [showType2Dropdown, setShowType2Dropdown] = useState(false);
  const type1DropdownRef = useRef<HTMLDivElement>(null);
  const type2DropdownRef = useRef<HTMLDivElement>(null);

  const {
    pokemon: selectedPokemon,
    item: selectedItem,
    ability: selectedAbility,
    hpStat,
    defenseStat,
    specialDefenseStat,
    hpInputValue,
    defenseInputValue,
    specialDefenseInputValue,
    protosynthesisBoostedStat,
    protosynthesisManualTrigger,
    quarkDriveBoostedStat,
    quarkDriveManualTrigger
  } = defenderState;

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const calculateBaseStatValue = (
    base: number,
    iv: number,
    ev: number,
    level: number,
    nature: NatureModifier,
    isHpStat: boolean = false
  ): number => {
    if (!base || base <= 0) return 0;

    if (isHpStat) {
      if (base === 1) return 1;
      return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * LEVEL) / 100) + LEVEL + 10;
    } else {
      let stat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
      stat = Math.floor(stat * nature);
      return stat;
    }
  };

  useEffect(() => {
    if (selectedPokemon) {
      if (defenderState.hpInputValue !== hpStat.final.toString()) {
        onDefenderStateChange({ hpInputValue: hpStat.final.toString() });
      }
    } else if (defenderState.hpInputValue !== "") {
       onDefenderStateChange({ hpInputValue: "" });
    }
  }, [selectedPokemon, hpStat.final, defenderState.hpInputValue, onDefenderStateChange]);

  useEffect(() => {
    if (selectedPokemon) {
      if (defenderState.defenseInputValue !== defenseStat.final.toString()) {
        onDefenderStateChange({ defenseInputValue: defenseStat.final.toString() });
      }
    } else if (defenderState.defenseInputValue !== "") {
      onDefenderStateChange({ defenseInputValue: "" });
    }
  }, [selectedPokemon, defenseStat.final, defenderState.defenseInputValue, onDefenderStateChange]);

  useEffect(() => {
    if (selectedPokemon) {
      if (defenderState.specialDefenseInputValue !== specialDefenseStat.final.toString()) {
        onDefenderStateChange({ specialDefenseInputValue: specialDefenseStat.final.toString() });
      }
    } else if (defenderState.specialDefenseInputValue !== "") {
      onDefenderStateChange({ specialDefenseInputValue: "" });
    }
  }, [selectedPokemon, specialDefenseStat.final, defenderState.specialDefenseInputValue, onDefenderStateChange]);

  const findClosestEvForBaseValue = (
    targetBaseValue: number,
    pokemonSpeciesStat: number,
    nature: NatureModifier,
    iv: number = 31,
    isHp: boolean = false
  ): number => {
    if (pokemonSpeciesStat <= 0) return 0;
    let closestEv = 0;
    let smallestDiff = Infinity;
    for (let ev = 0; ev <= 252; ev += 4) {
      let calculatedStat;
      if (isHp) {
        if (pokemonSpeciesStat === 1) { calculatedStat = 1; }
        else { calculatedStat = Math.floor(((2 * pokemonSpeciesStat + iv + Math.floor(ev / 4)) * LEVEL) / 100) + LEVEL + 10; }
      } else {
        let stat = Math.floor(((2 * pokemonSpeciesStat + iv + Math.floor(ev / 4)) * LEVEL) / 100) + 5;
        stat = Math.floor(stat * nature);
        calculatedStat = stat;
      }
      const diff = Math.abs(calculatedStat - targetBaseValue);
      if (diff < smallestDiff) { smallestDiff = diff; closestEv = ev; }
      else if (diff === smallestDiff) { closestEv = Math.min(closestEv, ev); }
    }
    return closestEv;
  };

  const handleHpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onDefenderStateChange({ hpInputValue: newValue });
    const value = parseInt(newValue, 10);
    if (selectedPokemon && !isNaN(value) && value >= 0) {
      const closestEv = findClosestEvForBaseValue(value, selectedPokemon.baseStats.hp, hpStat.nature, hpStat.iv, true);
      onDefenderStateChange({ hpStat: { ...hpStat, ev: closestEv }, hpEv: closestEv });
    }
  };

  const handleDefenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onDefenderStateChange({ defenseInputValue: newValue });
    const value = parseInt(newValue, 10);
    if (selectedPokemon && !isNaN(value) && value >= 0) {
      const closestEv = findClosestEvForBaseValue(value, selectedPokemon.baseStats.defense, defenseStat.nature, defenseStat.iv);
      onDefenderStateChange({ defenseStat: { ...defenseStat, ev: closestEv } });
    }
  };

  const handleSpecialDefenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onDefenderStateChange({ specialDefenseInputValue: newValue });
    const value = parseInt(newValue, 10);
    if (selectedPokemon && !isNaN(value) && value >= 0) {
      const closestEv = findClosestEvForBaseValue(value, selectedPokemon.baseStats.specialDefense, specialDefenseStat.nature, specialDefenseStat.iv);
      onDefenderStateChange({ specialDefenseStat: { ...specialDefenseStat, ev: closestEv } });
    }
  };

  const handleHpInputBlur = () => {
    if (selectedPokemon) {
      if (hpInputValue !== hpStat.final.toString()) { onDefenderStateChange({ hpInputValue: hpStat.final.toString() }); }
    } else if (hpInputValue !== "") { onDefenderStateChange({ hpInputValue: "" }); }
  };

  const handleDefenseInputBlur = () => {
    if (selectedPokemon) {
      if (defenseInputValue !== defenseStat.final.toString()) { onDefenderStateChange({ defenseInputValue: defenseStat.final.toString() }); }
    } else if (defenseInputValue !== "") { onDefenderStateChange({ defenseInputValue: "" }); }
  };

  const handleSpecialDefenseInputBlur = () => {
    if (selectedPokemon) {
      if (specialDefenseInputValue !== specialDefenseStat.final.toString()) { onDefenderStateChange({ specialDefenseInputValue: specialDefenseStat.final.toString() }); }
    } else if (specialDefenseInputValue !== "") { onDefenderStateChange({ specialDefenseInputValue: "" }); }
  };

  const handleHpEvChangeDirect = (ev: number) => {
    let validEv = Math.floor(ev / 4) * 4; validEv = Math.max(0, Math.min(validEv, 252));
    onDefenderStateChange({ hpStat: { ...hpStat, ev: validEv }, hpEv: validEv });
  };
  const handleDefenseEvChangeDirect = (ev: number) => {
    let validEv = Math.floor(ev / 4) * 4; validEv = Math.max(0, Math.min(validEv, 252));
    onDefenderStateChange({ defenseStat: { ...defenseStat, ev: validEv } });
  };
  const handleSpecialDefenseEvChangeDirect = (ev: number) => {
    let validEv = Math.floor(ev / 4) * 4; validEv = Math.max(0, Math.min(validEv, 252));
    onDefenderStateChange({ specialDefenseStat: { ...specialDefenseStat, ev: validEv } });
  };
  const handleDefenseNatureChangeDirect = (nature: NatureModifier) => onDefenderStateChange({ defenseStat: { ...defenseStat, nature } });
  const handleSpecialDefenseNatureChangeDirect = (nature: NatureModifier) => onDefenderStateChange({ specialDefenseStat: { ...specialDefenseStat, nature } });
  const handleDefenseRankChangeDirect = (rank: number) => onDefenderStateChange({ defenseStat: { ...defenseStat, rank } });
  const handleSpecialDefenseRankChangeDirect = (rank: number) => onDefenderStateChange({ specialDefenseStat: { ...specialDefenseStat, rank } });

  const handleProtosynthesisBoostedStatChangeForDefender = (stat: ProtosynthesisBoostTarget | null) => {
    onDefenderStateChange({ protosynthesisBoostedStat: stat });
  };
  const handleProtosynthesisManualTriggerChangeForDefender = (isActive: boolean) => {
    onDefenderStateChange({ protosynthesisManualTrigger: isActive });
  };

  const handleQuarkDriveBoostedStatChangeForDefender = (stat: ProtosynthesisBoostTarget | null) => {
    onDefenderStateChange({ quarkDriveBoostedStat: stat });
  };
  const handleQuarkDriveManualTriggerChangeForDefender = (isActive: boolean) => {
    onDefenderStateChange({ quarkDriveManualTrigger: isActive });
  };

  const handleAbilityChangeForDefender = (ability: Ability | null) => {
    onDefenderStateChange({ ability });
  };

  const hpBaseValueForDisplay = selectedPokemon ? calculateBaseStatValue(selectedPokemon.baseStats.hp, hpStat.iv, hpStat.ev, LEVEL, hpStat.nature, true) : 0;
  const defenseBaseValueForDisplay = selectedPokemon ? calculateBaseStatValue(selectedPokemon.baseStats.defense, defenseStat.iv, defenseStat.ev, LEVEL, defenseStat.nature) : 0;
  const specialDefenseBaseValueForDisplay = selectedPokemon ? calculateBaseStatValue(selectedPokemon.baseStats.specialDefense, specialDefenseStat.iv, specialDefenseStat.ev, LEVEL, specialDefenseStat.nature) : 0;

  const handleSelectType1 = (newType: PokemonType) => {
    if (isTerastallized) {
      onTypeChange([newType]);
      onDefenderStateChange({ isStellar: false });
    } else {
      const currentType2 = userConfigurableBaseTypes[1];
      const newType2 = newType === currentType2 ? undefined : currentType2;
      onUserConfigurableBaseTypesChange([newType, newType2]);
    }
    setShowType1Dropdown(false);
  };

  const handleSelectType2 = (newType?: PokemonType) => {
    if (!isTerastallized) {
      onUserConfigurableBaseTypesChange([userConfigurableBaseTypes[0], newType]);
    }
    setShowType2Dropdown(false);
  };

  const handleResetTypes = () => {
    if (selectedPokemon) {
      onUserConfigurableBaseTypesChange([selectedPokemon.types[0], selectedPokemon.types[1] || undefined]);
    } else {
      onUserConfigurableBaseTypesChange([ALL_POKEMON_TYPES[0], undefined]);
    }
    onIsTerastallizedChange(false);
    onDefenderStateChange({ teraType: null, isStellar: false });
  };

  const handleTerastallizedToggle = (checked: boolean) => {
    onIsTerastallizedChange(checked);
    if (checked) {
      if (!defenderState.teraType && userConfigurableBaseTypes[0]) {
        onTypeChange([userConfigurableBaseTypes[0]]);
        onDefenderStateChange({ isStellar: false });
      }
    } else {
      onDefenderStateChange({ teraType: null, isStellar: false });
    }
  };

  const type1ButtonText = getTypeNameJp(currentTypes[0]) || 'タイプ1';
  const type2ButtonText = getTypeNameJp(currentTypes[1]) || (isTerastallized ? '' : 'タイプ2');

  const availableTypesForType1 = ALL_POKEMON_TYPES.filter(t => isTerastallized || t !== userConfigurableBaseTypes[1]);
  const availableTypesForType2 = ALL_POKEMON_TYPES.filter(t => t !== userConfigurableBaseTypes[0]);

  const isProtosynthesisSelectedOnDefender = selectedAbility?.id === 'protosynthesis' && defenderState.isEnabled && selectedPokemon;
  const isQuarkDriveSelectedOnDefender = selectedAbility?.id === 'quark_drive' && defenderState.isEnabled && selectedPokemon;

  return (
    <div className="bg-gray-900 p-1 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">防御側</h2>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">防御側</h3>
        </div>

        {selectedPokemon && (
          <div className="flex items-center gap-3 mb-3">
            <img src={`/icon/${selectedPokemon.id.toString().padStart(3, '0')}.png`} alt={selectedPokemon.name} className="w-8 h-8" />
            <div className="flex flex-col"> {/* タイプと種族値を縦に並べるコンテナ */}
              <div className="flex gap-1"> {/* タイプ表示 */}
                {selectedPokemon.types.map((type, typeIndex) => (
                  <span
                    key={typeIndex}
                    className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {getTypeNameJp(type)}
                  </span>
                ))}
              </div>
              {/* 種族値表示 */}
              <div className="text-sm font-mono text-gray-300 mt-1">
                H{selectedPokemon.baseStats.hp} A{selectedPokemon.baseStats.attack} B{selectedPokemon.baseStats.defense} C{selectedPokemon.baseStats.specialAttack} D{selectedPokemon.baseStats.specialDefense} S{selectedPokemon.baseStats.speed}
              </div>
            </div>
          </div>
        )}

        <PokemonSelect
          pokemon={pokemonList}
          selected={selectedPokemon}
          onChange={(p) => {
            onDefenderStateChange({ pokemon: p });
          }}
          label="ポケモン"
        />

        {selectedPokemon && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">タイプ</label>
            <div className="flex items-center space-x-2">
              <div className="relative w-1/2" ref={type1DropdownRef}>
                <button
                  onClick={() => setShowType1Dropdown(!showType1Dropdown)}
                  className="w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
                >
                  {type1ButtonText}
                  <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${showType1Dropdown ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                {showType1Dropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    {(isTerastallized ? ALL_POKEMON_TYPES : availableTypesForType1).map((t) => (
                      <div key={`type1-${t}`} onClick={() => handleSelectType1(t)} className="px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                        {getTypeNameJp(t)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative w-1/2" ref={type2DropdownRef}>
                <button
                  onClick={() => setShowType2Dropdown(!showType2Dropdown)}
                  className={`w-full bg-gray-700 border border-gray-600 text-white py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center ${isTerastallized ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isTerastallized}
                >
                  {type2ButtonText}
                  <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${showType2Dropdown ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
                {showType2Dropdown && !isTerastallized && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div onClick={() => handleSelectType2(undefined)} className="px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">なし</div>
                    {availableTypesForType2.map((t) => (
                      <div key={`type2-${t}`} onClick={() => handleSelectType2(t)} className="px-4 py-2 text-sm text-white hover:bg-gray-600 cursor-pointer">
                        {getTypeNameJp(t)}
                      </div>
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
        <div className="mt-6">
          <ItemSelect items={items} selected={selectedItem} onChange={(item) => onDefenderStateChange({ item })} label="持ち物" side="defender" disabled={!selectedPokemon} />
        </div>

        <div className="mt-6">
          <AbilitySelect abilities={abilities} selected={selectedAbility} onChange={handleAbilityChangeForDefender} label="特性" side="defender" />
        </div>
        {isProtosynthesisSelectedOnDefender && (
            <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <h5 className="text-sm font-semibold text-yellow-400 mb-2">こだいかっせい 設定</h5>
              <div className="mb-2">
                <label htmlFor="proto-stat-defender" className="block text-xs font-medium text-gray-300 mb-1">上昇する能力:</label>
                <select
                  id="proto-stat-defender"
                  value={protosynthesisBoostedStat || ''}
                  onChange={(e) => handleProtosynthesisBoostedStatChangeForDefender(e.target.value as ProtosynthesisBoostTarget | null)}
                  className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  disabled={!defenderState.isEnabled}
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
                  id="proto-manual-defender"
                  checked={!!protosynthesisManualTrigger}
                  onChange={(e) => handleProtosynthesisManualTriggerChangeForDefender(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700"
                  disabled={!defenderState.isEnabled}
                />
                <label htmlFor="proto-manual-defender" className="text-xs text-gray-300">手動で発動させる</label>
              </div>
            </div>
          )}
          {isQuarkDriveSelectedOnDefender && (
            <div className="mt-4 p-3 bg-gray-700 rounded-md">
              <h5 className="text-sm font-semibold text-purple-400 mb-2">クォークチャージ 設定</h5>
              <div className="mb-2">
                <label htmlFor="quark-stat-defender" className="block text-xs font-medium text-gray-300 mb-1">上昇する能力:</label>
                <select
                  id="quark-stat-defender"
                  value={quarkDriveBoostedStat || ''}
                  onChange={(e) => handleQuarkDriveBoostedStatChangeForDefender(e.target.value as ProtosynthesisBoostTarget | null)}
                  className="w-full bg-gray-800 border border-gray-600 text-white py-1.5 px-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  disabled={!defenderState.isEnabled}
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
                  id="quark-manual-defender"
                  checked={!!quarkDriveManualTrigger}
                  onChange={(e) => handleQuarkDriveManualTriggerChangeForDefender(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-700"
                  disabled={!defenderState.isEnabled}
                />
                <label htmlFor="quark-manual-defender" className="text-xs text-gray-300">手動で発動させる</label>
              </div>
            </div>
          )}

        <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" id="defender1Terastallized" checked={isTerastallized} onChange={(e) => handleTerastallizedToggle(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" disabled={!selectedPokemon} />
            <label htmlFor="defender1Terastallized" className={`text-sm ${!selectedPokemon ? 'text-gray-500' : 'text-white'}`}>テラスタル</label>
        </div>
      </div>

       {showDefender2 && selectedPokemon && (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">防御側 2体目用</h3>
          </div>

          <div className="text-sm text-white mb-2">{selectedPokemon.name}</div>

          <div className="flex items-center gap-3 mb-3">
            <img src={`/icon/${selectedPokemon.id.toString().padStart(3, '0')}.png`} alt={selectedPokemon.name} className="w-8 h-8" />
            <div className="flex flex-col">
              <div className="flex gap-1">
                {currentTypes[0] && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getTypeColor(currentTypes[0]) }}
                  >
                    {getTypeNameJp(currentTypes[0])}
                  </span>
                )}
                {currentTypes[1] && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getTypeColor(currentTypes[1]) }}
                  >
                    {getTypeNameJp(currentTypes[1])}
                  </span>
                )}
                {(!currentTypes[0] && !currentTypes[1]) && (
                    <span className="text-xs text-gray-400">タイプなし</span>
                )}
              </div>
              <div className="text-sm font-mono text-gray-300 mt-1">
                H{selectedPokemon.baseStats.hp} A{selectedPokemon.baseStats.attack} B{selectedPokemon.baseStats.defense} C{selectedPokemon.baseStats.specialAttack} D{selectedPokemon.baseStats.specialDefense} S{selectedPokemon.baseStats.speed}
              </div>
            </div>
          </div>

            {isTerastallized && (<div className="mt-2 text-sm text-yellow-400">(防御側1のテラスタル状態を共有)</div>)}
          <div className="mt-6">
            <ItemSelect items={items} selected={defender2Item} onChange={onDefender2ItemChange} label="持ち物(2体目用)" side="defender" disabled={!selectedPokemon} />
          </div>
          <div className="mt-6">
            <AbilitySelect abilities={abilities} selected={defender2Ability} onChange={onDefender2AbilityChange} label="Ability (防御側2)" side="defender" />
          </div>
          <p className="text-xs text-gray-400 mt-3">※ 防御側2の能力値・ランク・バトル状態は防御側1と共通です。</p>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">能力値設定</h3></div>
        <StandardDefensiveStatInputs
          selectedPokemon={selectedPokemon}
          hpStat={hpStat} defenseStat={defenseStat} specialDefenseStat={specialDefenseStat}
          hpInputValue={hpInputValue} defenseInputValue={defenseInputValue} specialDefenseInputValue={specialDefenseInputValue}
          onHpEvChange={handleHpEvChangeDirect} onDefenseEvChange={handleDefenseEvChangeDirect} onSpecialDefenseEvChange={handleSpecialDefenseEvChangeDirect}
          onDefenseNatureChange={handleDefenseNatureChangeDirect} onSpecialDefenseNatureChange={handleSpecialDefenseNatureChangeDirect}
          onDefenseRankChange={handleDefenseRankChangeDirect} onSpecialDefenseRankChange={handleSpecialDefenseRankChangeDirect}
          onHpInputChange={handleHpInputChange} onDefenseInputChange={handleDefenseInputChange} onSpecialDefenseInputChange={handleSpecialDefenseInputChange}
          onHpInputBlur={handleHpInputBlur} onDefenseInputBlur={handleDefenseInputBlur} onSpecialDefenseInputBlur={handleSpecialDefenseInputBlur}
          hpBaseValueForDisplay={hpBaseValueForDisplay} defenseBaseValueForDisplay={defenseBaseValueForDisplay} specialDefenseBaseValueForDisplay={specialDefenseBaseValueForDisplay}
        />
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">バトル状態 (防御側共通)</h3></div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="reflect" checked={hasReflect} onChange={(e) => onReflectChange(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
            <label htmlFor="reflect" className="text-sm text-white">リフレクター</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="lightScreen" checked={hasLightScreen} onChange={(e) => onLightScreenChange(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
            <label htmlFor="lightScreen" className="text-sm text-white">ひかりのかべ</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="friendGuard" checked={hasFriendGuard} onChange={(e) => onFriendGuardChange(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900" />
            <label htmlFor="friendGuard" className="text-sm text-white">フレンドガード</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefenderPanel;