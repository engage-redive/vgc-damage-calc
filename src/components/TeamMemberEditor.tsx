import React, { useState, useEffect } from 'react';
import { Pokemon, Move, Item, Ability, PokemonType } from '../types';
import { Nature } from '../data/natures'; // Nature型は increasedStat/decreasedStat を持つ
import { Plus, X, Save } from 'lucide-react';
import Select from 'react-select';
import StatSlider from './StatSlider';

interface TeamMember {
  id: string;
  pokemon: Pokemon; // Pokemon型には abilities: string[], baseStats: Record<string, number> が含まれることを想定
  level: number;
  item: Item | null;
  ability: Ability | null;
  teraType: PokemonType;
  nature: Nature | null; // Nature型には increasedStat?: string, decreasedStat?: string が含まれることを想定
  evs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  ivs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: (Move | null)[];
}

interface TeamMemberEditorProps {
  member: TeamMember;
  allPokemon: Pokemon[];
  allMoves: Move[];
  allItems: Item[];
  allAbilities: Ability[];
  allNatures: Nature[]; // Nature型が性格補正情報(increasedStat/decreasedStat)を持つことを期待
  onSave: (updatedMember: TeamMember) => void;
  onClose: () => void;
}

const PokemonTypeOptions = Object.values(PokemonType).map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }));

const statKeys: (keyof TeamMember['evs'])[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
const baseStatLabels: Record<keyof TeamMember['evs'], string> = {
  hp: 'HP',
  attack: '攻撃',
  defense: '防御',
  specialAttack: '特攻',
  specialDefense: '特防',
  speed: '素早さ',
};

// 実数値計算関数
const calculateStat = (
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureModifier: number,
  statName: keyof TeamMember['evs']
): number => {
  if (statName === 'hp') {
    if (base === 1) return 1; // 例: ヌケニン
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 10;
  } else {
    const rawStat = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5;
    return Math.floor(rawStat * natureModifier);
  }
};

const TeamMemberEditor: React.FC<TeamMemberEditorProps> = ({
  member,
  allPokemon,
  allMoves,
  allItems,
  allAbilities,
  allNatures,
  onSave,
  onClose,
}) => {
  const [editedMember, setEditedMember] = useState<TeamMember>(member);

  useEffect(() => {
    setEditedMember(member);
  }, [member]);

  const handlePokemonChange = (selectedOption: any) => {
    const newPokemon = allPokemon.find(p => p.id === selectedOption.value);
    if (newPokemon) {
      const currentAbilityNameEn = editedMember.ability?.nameEn;
      const newPokemonAvailableAbilities = newPokemon.abilities || [];

      let newAbility = editedMember.ability;
      if (currentAbilityNameEn && !newPokemonAvailableAbilities.includes(currentAbilityNameEn)) {
        newAbility = null;
      }
      const pokemonAbilities = allAbilities.filter(ability => newPokemon.abilities.includes(ability.nameEn));
      if (pokemonAbilities.length === 1) {
        newAbility = pokemonAbilities[0];
      }

      setEditedMember(prev => ({
        ...prev,
        pokemon: newPokemon,
        ability: newAbility,
        teraType: (prev.teraType === prev.pokemon.types[0] && newPokemon.types.length > 0)
          ? newPokemon.types[0]
          : prev.teraType,
      }));
    }
  };

  const handleItemChange = (selectedOption: any) => {
    const newItem = selectedOption ? allItems.find(i => i.nameEn === selectedOption.value) : null;
    setEditedMember(prev => ({ ...prev, item: newItem }));
  };

  const handleAbilityChange = (selectedOption: any) => {
    const newAbility = selectedOption ? allAbilities.find(a => a.nameEn === selectedOption.value) : null;
    setEditedMember(prev => ({ ...prev, ability: newAbility }));
  };

  const handleNatureChange = (selectedOption: any) => {
    // selectedOption.value が Nature の英語名 (n.name) であることを期待
    const newNature = selectedOption ? allNatures.find(n => n.name === selectedOption.value) : null;
    setEditedMember(prev => ({ ...prev, nature: newNature }));
  };

  const handleTeraTypeChange = (selectedOption: any) => {
    setEditedMember(prev => ({ ...prev, teraType: selectedOption.value }));
  };

  const handleMoveChange = (index: number, selectedOption: any) => {
    const newMove = selectedOption ? allMoves.find(m => m.nameEn === selectedOption.value) : null;
    setEditedMember(prev => {
      const newMoves = [...prev.moves];
      newMoves[index] = newMove;
      return { ...prev, moves: newMoves };
    });
  };
  
  const getTotalEvs = (): number => {
    return Object.values(editedMember.evs).reduce((sum, val) => sum + val, 0);
  };

  const handleEvChange = (stat: keyof TeamMember['evs'], requestedValue: number) => {
    const currentEvStatValue = editedMember.evs[stat];
    let newEvStatValue = Math.max(0, Math.min(252, requestedValue));

    const otherEvsSum = getTotalEvs() - currentEvStatValue;
    if (otherEvsSum + newEvStatValue > 508) {
      newEvStatValue = 508 - otherEvsSum;
      newEvStatValue = Math.max(0, Math.min(252, newEvStatValue)); 
    }

    if (newEvStatValue !== currentEvStatValue) {
      setEditedMember(prev => ({
        ...prev,
        evs: {
          ...prev.evs,
          [stat]: newEvStatValue,
        },
      }));
    }
  };

  const handleIvChange = (stat: keyof TeamMember['ivs'], value: number) => {
    setEditedMember(prev => ({
      ...prev,
      ivs: {
        ...prev.ivs,
        [stat]: Math.max(0, Math.min(31, value)),
      },
    }));
  };
  
 const getStatLabelWithNature = (statKey: keyof TeamMember['evs'], nature: Nature | null): string => {
    let label = baseStatLabels[statKey];
    if (nature) {
      // Nature型は increasedStat / decreasedStat を持つ
      if (nature.increasedStat === statKey) label += '↑';
      if (nature.decreasedStat === statKey) label += '↓';
    }
    return label;
  };

  const pokemonOptions = allPokemon.map(p => ({ value: p.id, label: p.name }));
  const itemOptions = allItems.map(i => ({ value: i.nameEn, label: i.name }));
  
  const pokemonAbilityNames = editedMember.pokemon.abilities || [];
  const filteredAbilityObjects = allAbilities.filter(ability =>
    pokemonAbilityNames.includes(ability.nameEn)
  );
  const abilityOptions = filteredAbilityObjects.map(a => ({ value: a.nameEn, label: a.name }));
  
  // Nature オプションの value には Nature['name'] (英語名) を使用
  const natureOptions = allNatures.map(n => ({ value: n.name, label: n.name_jp || n.name }));
  const moveOptions = allMoves.map(m => ({ value: m.nameEn, label: m.name }));

  const totalEvs = getTotalEvs();
  const remainingEvs = 508 - totalEvs;

  const selectStyles = {
    control: (base: any) => ({ ...base, backgroundColor: '#374151', borderColor: '#4B5563', color: 'white', minHeight: '38px', height: '38px', boxShadow: 'none', '&:hover': { borderColor: '#6B7280' } }),
    singleValue: (base: any) => ({ ...base, color: 'white' }),
    input: (base: any) => ({ ...base, color: 'white', margin: '0', padding: '0' }),
    placeholder: (base: any) => ({ ...base, color: '#9CA3AF' }),
    menu: (base: any) => ({ ...base, backgroundColor: '#374151', zIndex: 20 }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#4B5563' : '#374151',
      color: 'white',
      padding: '6px 10px',
      fontSize: '0.875rem',
    }),
    valueContainer: (base: any) => ({ ...base, padding: '0 8px', height: '38px' }),
    indicatorsContainer: (base: any) => ({ ...base, height: '38px' }),
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto relative text-sm">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white z-10">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-bold mb-4 text-white">
          ポケモン編集: {editedMember.pokemon.name}
        </h2>

        {/* ポケモン選択 & レベル */}
        <div className="grid grid-cols-3 gap-x-3 mb-3">
          <div className="col-span-2">
            <label className="block text-gray-300 text-xs font-bold mb-1">ポケモン</label>
            <Select
              classNamePrefix="react-select"
              options={pokemonOptions}
              value={pokemonOptions.find(opt => opt.value === editedMember.pokemon.id)}
              onChange={handlePokemonChange}
              placeholder="ポケモンを選択"
              isClearable={false}
              styles={selectStyles}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-xs font-bold mb-1">レベル</label>
            <input
              type="number"
              value={editedMember.level}
              onChange={(e) => setEditedMember(prev => ({ ...prev, level: Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)) }))}
              className="w-full p-2 h-[38px] bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-blue-500 focus:border-blue-500"
              min="1" max="100"
            />
          </div>
        </div>

        {/* わざ */}
        <div className="mb-3">
          <h3 className="text-base font-semibold mb-1 text-white">わざ</h3>
          <div className="space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <Select
                  classNamePrefix="react-select"
                  options={moveOptions}
                  value={editedMember.moves[index] ? moveOptions.find(opt => opt.value === editedMember.moves[index]?.nameEn) : null}
                  onChange={(selectedOption) => handleMoveChange(index, selectedOption)}
                  isClearable
                  placeholder={`わざ ${index + 1}`}
                  styles={selectStyles}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* 持ち物 & 特性 */}
        <div className="grid grid-cols-2 gap-x-3 mb-3">
          <div>
            <label className="block text-gray-300 text-xs font-bold mb-1">持ち物</label>
            <Select
              classNamePrefix="react-select"
              options={itemOptions}
              value={editedMember.item ? itemOptions.find(opt => opt.value === editedMember.item?.nameEn) : null}
              onChange={handleItemChange}
              isClearable
              placeholder="持ち物なし"
              styles={selectStyles}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-xs font-bold mb-1">とくせい</label>
            <Select
              classNamePrefix="react-select"
              options={abilityOptions}
              value={editedMember.ability ? abilityOptions.find(opt => opt.value === editedMember.ability?.nameEn) : null}
              onChange={handleAbilityChange}
              isClearable
              placeholder={abilityOptions.length === 0 ? "選択不可" : "とくせいなし"}
              isDisabled={abilityOptions.length === 0}
              styles={selectStyles}
            />
          </div>
        </div>

        {/* テラスタイプ & 性格 */}
        <div className="grid grid-cols-2 gap-x-3 mb-4">
          <div>
            <label className="block text-gray-300 text-xs font-bold mb-1">テラスタイプ</label>
            <Select
              classNamePrefix="react-select"
              options={PokemonTypeOptions}
              value={PokemonTypeOptions.find(opt => opt.value === editedMember.teraType)}
              onChange={handleTeraTypeChange}
              placeholder="テラスタイプ"
              styles={selectStyles}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-xs font-bold mb-1">性格</label>
            <Select
              classNamePrefix="react-select"
              options={natureOptions}
              // editedMember.nature.name と natureOptions の value (n.name) を比較
              value={editedMember.nature ? natureOptions.find(opt => opt.value === editedMember.nature?.name) : null}
              onChange={handleNatureChange}
              isClearable
              placeholder="性格なし"
              styles={selectStyles}
            />
          </div>
        </div>

        {/* 努力値 (EVs) */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-1 text-white">努力値 (残り: {remainingEvs})</h3>
          <div className="space-y-1">
            {statKeys.map(stat => {
              const baseStatValue = editedMember.pokemon.baseStats?.[stat] || 50;
              const ivValue = editedMember.ivs[stat];
              const evValue = editedMember.evs[stat];
              const level = editedMember.level;
              
              let natureModifier = 1.0;
              if (editedMember.nature) {
                // Nature型は increasedStat / decreasedStat を持つ
                if (editedMember.nature.increasedStat === stat) natureModifier = 1.1;
                if (editedMember.nature.decreasedStat === stat) natureModifier = 0.9;
              }
              const actualStat = calculateStat(baseStatValue, ivValue, evValue, level, natureModifier, stat);

              return (
                <div key={stat} className="grid grid-cols-[minmax(60px,auto)_1fr_minmax(48px,auto)_minmax(36px,auto)] items-center gap-x-2">
                  <label className="text-gray-300 text-xs font-bold whitespace-nowrap">
                    {getStatLabelWithNature(stat, editedMember.nature)}
                  </label>
                  <div className="flex-1">
                    <StatSlider
                      label=""
                      value={evValue}
                      max={252}
                      onChange={(value) => handleEvChange(stat, value)}
                      realValue={evValue}
                    />
                  </div>
                  <input
                    type="number"
                    value={evValue}
                    onChange={(e) => handleEvChange(stat, parseInt(e.target.value, 10) || 0)}
                    className="w-full p-1 h-7 bg-gray-700 border border-gray-600 rounded text-white text-xs text-right focus:ring-blue-500 focus:border-blue-500"
                    min="0" max="252"
                  />
                  <span className="text-sm text-white text-right tabular-nums">
                    {actualStat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* 個体値 (IVs) */}
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-1 text-white">個体値</h3>
          <div className="space-y-1">
            {statKeys.map(stat => (
              <div key={stat} className="grid grid-cols-[minmax(60px,auto)_1fr] items-center gap-x-2">
                <label className="text-gray-300 text-xs font-bold whitespace-nowrap">{baseStatLabels[stat]}</label>
                <input
                  type="number"
                  value={editedMember.ivs[stat]}
                  onChange={(e) => handleIvChange(stat, parseInt(e.target.value, 10) || 0)}
                  className="w-20 p-1 h-7 bg-gray-700 border border-gray-600 rounded text-white text-xs text-right focus:ring-blue-500 focus:border-blue-500"
                  min="0" max="31"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 保存・キャンセルボタン */}
        <div className="mt-5 flex justify-end space-x-3 sticky bottom-0 bg-gray-800 py-3 -mx-4 px-4 border-t border-gray-700">
          <button
            onClick={() => onSave(editedMember)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium"
            disabled={remainingEvs < 0}
          >
            <Save className="h-4 w-4" />
            保存
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm font-medium"
          >
            <X className="h-4 w-4" />
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberEditor;