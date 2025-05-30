import React, { useState, useEffect } from 'react';
import { Pokemon, Move, Item, Ability, PokemonType } from '../types';
import { Nature } from '../data/natures';
import { Plus, X, Save } from 'lucide-react';
import Select from 'react-select';
import StatSlider from './StatSlider';
// import { PokemonTypeJa } from '../data/pokemonTypes'; // ★ 削除: 代わりに POKEMON_TYPE_NAMES_JP を使用
import { POKEMON_TYPE_NAMES_JP } from '../calculation/pokemonTypesJp'; // ★ 追加: pokemonTypesJp.ts からインポート (パスは環境に合わせて調整してください)

interface TeamMember {
  id: string;
  pokemon: Pokemon;
  level: number;
  item: Item | null;
  ability: Ability | null;
  teraType: PokemonType;
  nature: Nature | null;
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
  allNatures: Nature[];
  onSave: (updatedMember: TeamMember) => void;
  onClose: () => void;
}

// ★ 修正: POKEMON_TYPE_NAMES_JP を使用してテラスタイプラベルを日本語化
const PokemonTypeOptions = (Object.keys(POKEMON_TYPE_NAMES_JP) as PokemonType[]).map(type => ({
  value: type,
  label: POKEMON_TYPE_NAMES_JP[type]
}));

const statKeys: (keyof TeamMember['evs'])[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];

// ★ 修正: ステータスラベルを H, A, B, C, D, S に変更
const baseStatLabels: Record<keyof TeamMember['evs'], string> = {
  hp: 'H',
  attack: 'A',
  defense: 'B',
  specialAttack: 'C',
  specialDefense: 'D',
  speed: 'S',
};

const calculateStat = (
  base: number,
  iv: number,
  ev: number,
  level: number,
  natureModifier: number,
  statName: keyof TeamMember['evs']
): number => {
  if (statName === 'hp') {
    if (base === 1) return 1; // ヌケニン対応
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
        // デフォルトのテラスタイプをポケモンの第一タイプに設定（既に変更されていれば維持）
        teraType: (prev.teraType === prev.pokemon.types[0] && newPokemon.types.length > 0)
          ? newPokemon.types[0]
          : (newPokemon.types.includes(prev.teraType) ? prev.teraType : newPokemon.types[0] || prev.teraType), // ポケモン変更時、元のテラスタイプが新ポケモンにもあれば維持、なければ第1タイプ
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
    let label = baseStatLabels[statKey]; // ★ H,A,B,C,D,S が使われる
    if (nature) {
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
  
  const natureOptions = allNatures.map(n => ({ value: n.name, label: n.name_jp || n.name }));
  const moveOptions = allMoves.map(m => ({ value: m.nameEn, label: m.name }));

  const totalEvs = getTotalEvs();
  const remainingEvs = 508 - totalEvs;

  const selectStylesSlightlyLessCompressed = { // ★ スタイル名を変更 (少し余白を意識)
    control: (base: any) => ({ ...base, backgroundColor: '#374151', borderColor: '#4B5563', color: 'white', minHeight: '30px', height: '30px', boxShadow: 'none', '&:hover': { borderColor: '#6B7280' } }), // 高さを少し増やす
    singleValue: (base: any) => ({ ...base, color: 'white', fontSize: '0.75rem' }), // フォントを少し大きく
    input: (base: any) => ({ ...base, color: 'white', margin: '0', padding: '0 2px', fontSize: '0.75rem' }),
    placeholder: (base: any) => ({ ...base, color: '#9CA3AF', fontSize: '0.75rem' }),
    menu: (base: any) => ({ ...base, backgroundColor: '#374151', zIndex: 20 }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? '#4B5563' : '#374151',
      color: 'white',
      padding: '4px 8px', // パディングを少し増やす
      fontSize: '0.75rem',
    }),
    valueContainer: (base: any) => ({ ...base, padding: '0 6px', height: '30px' }), // パディングを少し増やす
    indicatorsContainer: (base: any) => ({ ...base, height: '30px', padding: '0 4px'}),
    dropdownIndicator: (base: any) => ({ ...base, padding: '4px'}),
    clearIndicator: (base: any) => ({ ...base, padding: '4px'}),
  };
  
  // ★ 全体的なパディングやマージンを調整
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-1 sm:p-2"> {/* 全体パディング少し増 */}
      <div className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto relative text-[11px]"> {/* ベースフォント少し増、パディング少し増、角丸大きく */}
        <button onClick={onClose} className="absolute top-1.5 right-1.5 text-gray-400 hover:text-white z-10 p-1"> {/* 位置とパディング調整 */}
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-white"> {/* フォントサイズとマージン増 */}
          {editedMember.pokemon.name}
        </h2>

        <div className="grid grid-cols-[1fr_70px] gap-x-1.5 mb-2"> {/* gapとマージン増、レベル幅少し増 */}
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">ポケモン</label> {/* フォントとマージン調整 */}
            <Select
              classNamePrefix="react-select"
              options={pokemonOptions}
              value={pokemonOptions.find(opt => opt.value === editedMember.pokemon.id)}
              onChange={handlePokemonChange}
              placeholder="ポケモン"
              isClearable={false}
              styles={selectStylesSlightlyLessCompressed}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">レベル</label>
            <input
              type="number"
              value={editedMember.level}
              onChange={(e) => setEditedMember(prev => ({ ...prev, level: Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)) }))}
              className="w-full px-1.5 py-0 h-[30px] bg-gray-700 border border-gray-600 rounded text-white text-[11px] focus:ring-blue-500 focus:border-blue-500 text-center" // 高さ、フォント、パディング調整
              min="1" max="100"
            />
          </div>
        </div>

        <div className="mb-2"> {/* マージン増 */}
          <h3 className="text-sm font-semibold mb-1 text-white">わざ</h3> {/* フォントとマージン調整 */}
          <div className="space-y-1"> {/* space-y増 */}
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <Select
                  classNamePrefix="react-select"
                  options={moveOptions}
                  value={editedMember.moves[index] ? moveOptions.find(opt => opt.value === editedMember.moves[index]?.nameEn) : null}
                  onChange={(selectedOption) => handleMoveChange(index, selectedOption)}
                  isClearable
                  placeholder={`わざ${index + 1}`}
                  styles={selectStylesSlightlyLessCompressed}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-1.5 mb-2"> {/* gapとマージン増 */}
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">持ち物</label>
            <Select
              classNamePrefix="react-select"
              options={itemOptions}
              value={editedMember.item ? itemOptions.find(opt => opt.value === editedMember.item?.nameEn) : null}
              onChange={handleItemChange}
              isClearable
              placeholder="なし"
              styles={selectStylesSlightlyLessCompressed}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">とくせい</label>
            <Select
              classNamePrefix="react-select"
              options={abilityOptions}
              value={editedMember.ability ? abilityOptions.find(opt => opt.value === editedMember.ability?.nameEn) : null}
              onChange={handleAbilityChange}
              isClearable
              placeholder={abilityOptions.length === 0 ? "選択不可" : "なし"}
              isDisabled={abilityOptions.length === 0}
              styles={selectStylesSlightlyLessCompressed}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-1.5 mb-2.5"> {/* gapとマージン増 */}
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">テラス</label>
            <Select
              classNamePrefix="react-select"
              options={PokemonTypeOptions} // ★ 日本語対応済み
              value={PokemonTypeOptions.find(opt => opt.value === editedMember.teraType)}
              onChange={handleTeraTypeChange}
              placeholder="テラスタイプ"
              styles={selectStylesSlightlyLessCompressed}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">性格</label>
            <Select
              classNamePrefix="react-select"
              options={natureOptions}
              value={editedMember.nature ? natureOptions.find(opt => opt.value === editedMember.nature?.name) : null}
              onChange={handleNatureChange}
              isClearable
              placeholder="なし"
              styles={selectStylesSlightlyLessCompressed}
            />
          </div>
        </div>

        <div className="mb-2.5">
          <h3 className="text-sm font-semibold mb-1 text-white">努力値 (残: {remainingEvs})</h3>
          <div className="space-y-0.5">
            {statKeys.map(stat => {
              const baseStatValue = editedMember.pokemon.baseStats?.[stat] || 50;
              const ivValue = editedMember.ivs[stat];
              const evValue = editedMember.evs[stat];
              const level = editedMember.level;
              
              let natureModifier = 1.0;
              if (editedMember.nature) {
                if (editedMember.nature.increasedStat === stat) natureModifier = 1.1;
                if (editedMember.nature.decreasedStat === stat) natureModifier = 0.9;
              }
              const actualStat = calculateStat(baseStatValue, ivValue, evValue, level, natureModifier, stat);

              return (
                <div key={stat} className="grid grid-cols-[28px_40px_1fr_28px_36px] items-center gap-x-1 py-0.5">
                  <label className="text-gray-300 text-[10px] font-medium whitespace-nowrap pr-0.5 text-center">
                    {getStatLabelWithNature(stat, editedMember.nature)}
                  </label>
                  <input
                    type="number"
                    value={evValue}
                    onChange={(e) => handleEvChange(stat, parseInt(e.target.value, 10) || 0)}
                    className="w-full px-1 py-0 h-5 bg-gray-700 border border-gray-600 rounded text-white text-[10px] text-center focus:ring-blue-500 focus:border-blue-500 tabular-nums"
                    min="0" max="252"
                  />
                  {/* ★ 修正点: StatSliderのコンテナに min-w-0 を追加し、StatSliderに className="w-full" を試す */}
                  <div className="flex-1 mx-0.5 h-5 flex items-center min-w-0">
                    <StatSlider
                      label=""
                      value={evValue}
                      max={252}
                      onChange={(value) => handleEvChange(stat, value)}
                      realValue={evValue} // ★ realValue は元の値を渡し続ける
                      sliderHeight="h-2.5"
                      className="hide-stat-slider-real-value" // ★ カスタムクラス名を追加
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 text-center tabular-nums">
                    {ivValue}
                  </span>
                  <span className="text-[11px] text-white text-right tabular-nums font-medium">
                    {actualStat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        


        <div className="mt-3 flex justify-end space-x-1.5 sticky bottom-0 bg-gray-800 py-1.5 -mx-2 sm:-mx-3 px-2 sm:px-3 border-t border-gray-700"> {/* マージン、space、padding調整 */}
          <button
            onClick={() => onSave(editedMember)}
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded text-[11px] font-medium" // パディング、gap、フォント調整
            disabled={remainingEvs < 0}
          >
            <Save className="h-3.5 w-3.5" /> {/* アイコンサイズ調整 */}
            保存
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-2.5 py-1 bg-gray-600 hover:bg-gray-700 rounded text-[11px] font-medium"
          >
            <X className="h-3.5 w-3.5" />
            キャンセル {/* ｷｬﾝｾﾙ -> キャンセル に */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberEditor;