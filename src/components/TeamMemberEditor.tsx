import React, { useState, useEffect } from 'react';
import { Pokemon, Move, Item, Ability, PokemonType } from '../types';
import { Nature } from '../data/natures';
import { Plus, X, Save, ClipboardCopy } from 'lucide-react'; // ClipboardCopy をインポート
import Select from 'react-select';
import StatSlider from './TeamEditorSlider';
import { POKEMON_TYPE_NAMES_JP } from '../calculation/pokemonTypesJp';

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

// ひらがなをカタカナに変換する関数
const hiraganaToKatakana = (str: string): string => {
  if (!str) return ''; // nullやundefined、空文字の場合はそのまま返す
  return str.replace(/[\u3041-\u3096]/g, (match) => { // \u3041-\u3096 はひらがなの範囲
    const charCode = match.charCodeAt(0) + 0x60; // カタカナのコードポイントに変換
    return String.fromCharCode(charCode);
  });
};

// react-select のカスタムフィルター関数
// ラベルと入力の両方をカタカナに変換して比較
const customSelectFilter = (
  option: { label: string; value: any; data?: any }, // react-selectのoption型
  rawInput: string
): boolean => {
  const inputValue = rawInput.trim();
  if (!inputValue) {
    return true; // 入力が空の場合はすべてのオプションを表示
  }

  // 検索文字列（入力値）をカタカナに変換し、小文字化（英字混在なども考慮）
  const katakanaInputValue = hiraganaToKatakana(inputValue).toLowerCase();
  // オプションのラベルもカタカナに変換し、小文字化
  const katakanaOptionLabel = hiraganaToKatakana(option.label).toLowerCase();

  // オプションのカタカナ化ラベルが、入力のカタカナ化文字列を含むかチェック
  return katakanaOptionLabel.includes(katakanaInputValue);
};


const PokemonTypeOptions = (Object.keys(POKEMON_TYPE_NAMES_JP) as PokemonType[]).map(type => ({
  value: type,
  label: POKEMON_TYPE_NAMES_JP[type]
}));

const statKeys: (keyof TeamMember['evs'])[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];

const baseStatLabels: Record<keyof TeamMember['evs'], string> = {
  hp: 'H',
  attack: 'A',
  defense: 'B',
  specialAttack: 'C',
  specialDefense: 'D',
  speed: 'S',
};

// Helper function to capitalize first letter of a string (TeamManager.tsx から移植)
const capitalize = (s: string) => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
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

const getValidEV = (ev: number): number => {
  const clampedEv = Math.max(0, Math.min(ev, 252));
  if (clampedEv === 0) return 0;
  if (clampedEv < 4) return 0;
  if (clampedEv >= 248) return 252;

  const evAdjusted = clampedEv - 4;
  const step = 8;
  const numSteps = Math.round(evAdjusted / step);
  let result = 4 + numSteps * step;

  if (result < 4) result = 4;
  if (result > 244) result = 244;

  return result;
};

const getValidEVFloor = (limit: number): number => {
  if (limit < 0) return 0;
  for (let val = Math.floor(limit); val >= 0; val--) {
    if (getValidEV(val) === val) {
      return val;
    }
  }
  return 0;
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
          : (newPokemon.types.includes(prev.teraType) ? prev.teraType : newPokemon.types[0] || prev.teraType),
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

  const handleEvChange = (stat: keyof TeamMember['evs'], requestedRawValue: number) => {
    const currentEvForStat = editedMember.evs[stat];
    const totalCurrentEvs = getTotalEvs();
    const otherEvsSum = totalCurrentEvs - currentEvForStat;

    const budgetForThisStat = 508 - otherEvsSum;

    let targetEv = Math.min(requestedRawValue, 252, budgetForThisStat);
    targetEv = Math.max(0, targetEv);

    let finalEv = getValidEV(targetEv);

    if (finalEv > budgetForThisStat) {
      finalEv = getValidEVFloor(budgetForThisStat);
    }

    if (requestedRawValue < currentEvForStat && finalEv > requestedRawValue) {
        finalEv = getValidEVFloor(targetEv);
    }

    if (finalEv !== currentEvForStat) {
      setEditedMember(prev => ({
        ...prev,
        evs: {
          ...prev.evs,
          [stat]: finalEv,
        },
      }));
    } else if (requestedRawValue === 0 && currentEvForStat !== 0 && finalEv === 0) {
       setEditedMember(prev => ({
        ...prev,
        evs: {
          ...prev.evs,
          [stat]: 0,
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
      if (nature.increasedStat === statKey) label += '↑';
      if (nature.decreasedStat === statKey) label += '↓';
    }
    return label;
  };

  // --- コピー機能のためのハンドラ ---
  const handleCopyToClipboardCurrentMember = () => {
    const { pokemon, item, ability, level, teraType, evs, nature, ivs, moves: memberMoves } = editedMember;

    const statOrder: (keyof TeamMember['evs'])[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
    const statShorthands: { [key in keyof TeamMember['evs']]: string } = {
      hp: 'HP', attack: 'Atk', defense: 'Def',
      specialAttack: 'SpA', specialDefense: 'SpD', speed: 'Spe'
    };

    const lines: string[] = [];

    let line1 = pokemon.nameEn || pokemon.name;
    if (item) {
      line1 += ` @ ${item.nameEn || item.name}`;
    }
    lines.push(line1);

    if (ability) {
      lines.push(`Ability: ${ability.nameEn || ability.name}`);
    }
    lines.push(`Level: ${level}`);
    lines.push(`Tera Type: ${capitalize(teraType)}`);

    const evStrings: string[] = [];
    statOrder.forEach(stat => {
      if (evs[stat] > 0) {
        evStrings.push(`${evs[stat]} ${statShorthands[stat]}`);
      }
    });
    if (evStrings.length > 0) {
      lines.push(`EVs: ${evStrings.join(' / ')}`);
    }

    if (nature) {
      lines.push(`${capitalize(nature.nameEn || nature.name)} Nature`);
    }

    const ivStrings: string[] = [];
    statOrder.forEach(stat => {
      if (ivs[stat] < 31) {
        ivStrings.push(`${ivs[stat]} ${statShorthands[stat]}`);
      }
    });
    if (ivStrings.length > 0) {
      lines.push(`IVs: ${ivStrings.join(' / ')}`);
    }

    memberMoves.forEach(move => {
      if (move) {
        lines.push(`- ${move.nameEn || move.name}`);
      }
    });

    const textToCopy = lines.join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // 必要であれば成功時のフィードバックをここに (例: トースト通知)
        // alert('コピーしました！'); // シンプルなアラート
      })
      .catch(err => {
        console.error('クリップボードへのコピーに失敗しました:', err);
        alert('クリップボードへのコピーに失敗しました。');
      });
  };
  // --- ここまでコピー機能のためのハンドラ ---


  const pokemonOptions = allPokemon.map(p => ({ value: p.id, label: p.name }));
  const itemOptions = allItems.map(i => ({ value: i.nameEn, label: i.name }));
  const pokemonAbilityNames = editedMember.pokemon.abilities || [];
  const filteredAbilityObjects = allAbilities.filter(ability => pokemonAbilityNames.includes(ability.nameEn));
  const abilityOptions = filteredAbilityObjects.map(a => ({ value: a.nameEn, label: a.name }));
  const natureOptions = allNatures.map(n => ({ value: n.name, label: n.name_jp || n.name }));
  const moveOptions = allMoves.map(m => ({ value: m.nameEn, label: m.name }));

  const totalEvs = getTotalEvs();
  const remainingEvs = 508 - totalEvs;

  const selectStylesSlightlyLessCompressed = {
    control: (base: any) => ({ ...base, backgroundColor: '#374151', borderColor: '#4B5563', color: 'white', minHeight: '30px', height: '30px', boxShadow: 'none', '&:hover': { borderColor: '#6B7280' } }),
    singleValue: (base: any) => ({ ...base, color: 'white', fontSize: '0.75rem' }),
    input: (base: any) => ({ ...base, color: 'white', margin: '0', padding: '0 2px', fontSize: '0.75rem' }),
    placeholder: (base: any) => ({ ...base, color: '#9CA3AF', fontSize: '0.75rem' }),
    menu: (base: any) => ({ ...base, backgroundColor: '#374151', zIndex: 20 }),
    option: (base: any, state: any) => ({ ...base, backgroundColor: state.isFocused ? '#4B5563' : '#374151', color: 'white', padding: '4px 8px', fontSize: '0.75rem'}),
    valueContainer: (base: any) => ({ ...base, padding: '0 6px', height: '30px' }),
    indicatorsContainer: (base: any) => ({ ...base, height: '30px', padding: '0 4px'}),
    dropdownIndicator: (base: any) => ({ ...base, padding: '4px'}),
    clearIndicator: (base: any) => ({ ...base, padding: '4px'}),
  };


  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[95vh] overflow-y-auto relative text-[12px]">
        {/* モーダルヘッダー */}
        <div className="flex justify-between items-center mb-1 sticky top-0 bg-gray-800 py-1 -mx-1 sm:-mx-1 px-1 sm:px-1 border-b border-gray-700 z-10">
          <h6 className="text-lg font-semibold text-white">ポケモン編集</h6>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ポケモン、レベル */}
        <div className="grid grid-cols-[1fr_70px] gap-x-1 mb-1">
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">ポケモン</label>
            <Select
              classNamePrefix="react-select"
              options={pokemonOptions}
              value={pokemonOptions.find(opt => opt.value === editedMember.pokemon.id)}
              onChange={handlePokemonChange}
              placeholder="ポケモン"
              isClearable={false}
              styles={selectStylesSlightlyLessCompressed}
              filterOption={customSelectFilter}
            />
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">レベル</label>
            <input type="number" value={editedMember.level} onChange={(e) => setEditedMember(prev => ({ ...prev, level: Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)) }))} className="w-full px-1.5 py-0 h-[30px] bg-gray-700 border border-gray-600 rounded text-white text-[11px] focus:ring-blue-500 focus:border-blue-500 text-center" min="1" max="100"/>
          </div>
        </div>
        {/* わざ */}
        <div className="mb-1">
          <label className="block text-gray-300 text-[10px] font-bold mb-0.5">わざ</label>
          <div className="space-y-1">
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
                  filterOption={customSelectFilter}
                />
              </div>
            ))}
          </div>
        </div>
        {/* 持ち物、とくせい */}
        <div className="grid grid-cols-2 gap-x-1.5 mb-1">
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
              filterOption={customSelectFilter}
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
              filterOption={customSelectFilter}
            />
          </div>
        </div>
        {/* テラス、性格 */}
        <div className="grid grid-cols-2 gap-x-1.5 mb-2">
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">テラス</label>
            <Select
              classNamePrefix="react-select"
              options={PokemonTypeOptions}
              value={PokemonTypeOptions.find(opt => opt.value === editedMember.teraType)}
              onChange={handleTeraTypeChange}
              placeholder="テラスタイプ"
              styles={selectStylesSlightlyLessCompressed}
              filterOption={customSelectFilter}
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
              filterOption={customSelectFilter}
            />
          </div>
        </div>

        <div className="mb-2">
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
              let actualMaxValueForSlider: number;
              if (remainingEvs <= 0 && evValue === 0) { //残り0で現在値も0なら増やせない
                  actualMaxValueForSlider = 0;
              } else if (remainingEvs <= 0) { //残り0だが現在値があるなら、そこが上限
                  actualMaxValueForSlider = evValue;
              }
               else {
                  actualMaxValueForSlider = Math.min(252, evValue + remainingEvs);
              }

              return (
                <div key={stat} className="grid grid-cols-[20px_40px_1fr_18px] items-center gap-x-2 py-1.5">
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
                  <div className="flex-1 mx-0.5 h-5 flex items-center min-w-0"
                    style={{ touchAction: 'pan-y' }}  // 修正点1: touch-action を適用
                    >
                    <StatSlider
                      label=""
                      value={evValue}
                      fixedMax={252}
                      actualMaxValue={actualMaxValueForSlider}
                      onChange={(requestedValue) => handleEvChange(stat, requestedValue)}
                      sliderHeight="h-2.5"
                      className="hide-stat-slider-real-value"
                    />
                  </div>
                  <span className="text-[11px] text-white text-right tabular-nums font-medium">{actualStat}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 保存・キャンセル・コピーボタン */}
        <div className="flex justify-end sticky bottom-0 gap-3 bg-gray-800 py-1 -mx-1 sm:-mx-1 px-1 sm:px-1 border-t border-gray-700 z-10">
          <button
            onClick={handleCopyToClipboardCurrentMember}
            className="flex items-center gap-1 px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-[11px] font-medium"
            title="現在の情報をShowdown形式でコピー"
          >
            <ClipboardCopy className="h-3.5 w-3.5" /> コピー
          </button>
          <button onClick={() => onSave(editedMember)} className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-medium" disabled={remainingEvs < 0}>
            <Save className="h-3.5 w-3.5" /> 保存
          </button>
          <button onClick={onClose} className="flex items-center gap-1 px-2.5 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-[11px] font-medium">
            <X className="h-3.5 w-3.5" /> キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberEditor;