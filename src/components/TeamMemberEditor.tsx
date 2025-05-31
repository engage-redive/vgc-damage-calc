import React, { useState, useEffect } from 'react';
import { Pokemon, Move, Item, Ability, PokemonType } from '../types';
import { Nature } from '../data/natures';
import { Plus, X, Save } from 'lucide-react';
import Select from 'react-select';
import StatSlider from './TeamEditorSlider';
import { POKEMON_TYPE_NAMES_JP } from '../calculation/pokemonTypesJp';

// (インターフェース、定数、ヘルパー関数 calculateStat, getValidEV, getValidEVFloor は前回のものを流用)
// ... (省略せずに記述する場合はここに前回のコードを挿入) ...
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

  // (handlePokemonChange などの他のハンドラは変更なし)
  // ... (省略せずに記述する場合はここに前回のコードを挿入) ...
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
    
    // このステータスに割り振れる残りの「枠」
    const budgetForThisStat = 508 - otherEvsSum;
    
    // 要求された値は、まず個々のステータスの上限(252)と、全体の予算(budgetForThisStat)で制限
    let targetEv = Math.min(requestedRawValue, 252, budgetForThisStat);
    targetEv = Math.max(0, targetEv); // 0未満にはしない
  
    // 有効な努力値ステップに丸める
    let finalEv = getValidEV(targetEv);
  
    // 丸めた結果、予算を超過した場合は、予算内で最大の有効ステップに調整
    if (finalEv > budgetForThisStat) {
      finalEv = getValidEVFloor(budgetForThisStat);
    }
    
    // ユーザーが値を減らそうとしたが、getValidEVが切り上げた場合 (例: current 12, requested 9 -> getValidEV(9) = 12)
    // この場合は、要求値以下の最大の有効ステップにする
    if (requestedRawValue < currentEvForStat && finalEv > requestedRawValue) {
        finalEv = getValidEVFloor(targetEv); // targetEv は budgetForThisStat 以下のはず
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

  const pokemonOptions = allPokemon.map(p => ({ value: p.id, label: p.name }));
  const itemOptions = allItems.map(i => ({ value: i.nameEn, label: i.name }));
  const pokemonAbilityNames = editedMember.pokemon.abilities || [];
  const filteredAbilityObjects = allAbilities.filter(ability => pokemonAbilityNames.includes(ability.nameEn));
  const abilityOptions = filteredAbilityObjects.map(a => ({ value: a.nameEn, label: a.name }));
  const natureOptions = allNatures.map(n => ({ value: n.name, label: n.name_jp || n.name }));
  const moveOptions = allMoves.map(m => ({ value: m.nameEn, label: m.name }));

  const totalEvs = getTotalEvs();
  const remainingEvs = 508 - totalEvs;

  const selectStylesSlightlyLessCompressed = { /* ... (変更なし) ... */ 
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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-1 sm:p-2">
      <div className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto relative text-[11px]">
        {/* ... (モーダルヘッダーや他の部分は変更なし) ... */}
        <button onClick={onClose} className="absolute top-1.5 right-1.5 text-gray-400 hover:text-white z-10 p-1"> <X className="h-4 w-4" /> </button>
        <h2 className="text-base sm:text-lg font-bold mb-4 sm:mb-4 text-white"> {editedMember.pokemon.name} </h2>

        {/* ポケモン、レベル */}
        <div className="grid grid-cols-[1fr_70px] gap-x-1.5 mb-2">
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">ポケモン</label>
            <Select classNamePrefix="react-select" options={pokemonOptions} value={pokemonOptions.find(opt => opt.value === editedMember.pokemon.id)} onChange={handlePokemonChange} placeholder="ポケモン" isClearable={false} styles={selectStylesSlightlyLessCompressed}/>
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">レベル</label>
            <input type="number" value={editedMember.level} onChange={(e) => setEditedMember(prev => ({ ...prev, level: Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)) }))} className="w-full px-1.5 py-0 h-[30px] bg-gray-700 border border-gray-600 rounded text-white text-[11px] focus:ring-blue-500 focus:border-blue-500 text-center" min="1" max="100"/>
          </div>
        </div>
        {/* わざ */}
        <div className="mb-2">
          <h3 className="text-sm font-semibold mb-1 text-white">わざ</h3>
          <div className="space-y-1">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}> <Select classNamePrefix="react-select" options={moveOptions} value={editedMember.moves[index] ? moveOptions.find(opt => opt.value === editedMember.moves[index]?.nameEn) : null} onChange={(selectedOption) => handleMoveChange(index, selectedOption)} isClearable placeholder={`わざ${index + 1}`} styles={selectStylesSlightlyLessCompressed}/> </div>
            ))}
          </div>
        </div>
        {/* 持ち物、とくせい */}
        <div className="grid grid-cols-2 gap-x-1.5 mb-2">
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">持ち物</label>
            <Select classNamePrefix="react-select" options={itemOptions} value={editedMember.item ? itemOptions.find(opt => opt.value === editedMember.item?.nameEn) : null} onChange={handleItemChange} isClearable placeholder="なし" styles={selectStylesSlightlyLessCompressed}/>
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">とくせい</label>
            <Select classNamePrefix="react-select" options={abilityOptions} value={editedMember.ability ? abilityOptions.find(opt => opt.value === editedMember.ability?.nameEn) : null} onChange={handleAbilityChange} isClearable placeholder={abilityOptions.length === 0 ? "選択不可" : "なし"} isDisabled={abilityOptions.length === 0} styles={selectStylesSlightlyLessCompressed}/>
          </div>
        </div>
        {/* テラス、性格 */}
        <div className="grid grid-cols-2 gap-x-1.5 mb-2.5">
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">テラス</label>
            <Select classNamePrefix="react-select" options={PokemonTypeOptions} value={PokemonTypeOptions.find(opt => opt.value === editedMember.teraType)} onChange={handleTeraTypeChange} placeholder="テラスタイプ" styles={selectStylesSlightlyLessCompressed}/>
          </div>
          <div>
            <label className="block text-gray-300 text-[10px] font-bold mb-0.5">性格</label>
            <Select classNamePrefix="react-select" options={natureOptions} value={editedMember.nature ? natureOptions.find(opt => opt.value === editedMember.nature?.name) : null} onChange={handleNatureChange} isClearable placeholder="なし" styles={selectStylesSlightlyLessCompressed}/>
          </div>
        </div>

        <div className="mb-2.5">
          <h3 className="text-sm font-semibold mb-1 text-white">努力値 (残: {remainingEvs})</h3>
          <div className="space-y-0.5">
            {statKeys.map(stat => {
              const baseStatValue = editedMember.pokemon.baseStats?.[stat] || 50;
              const ivValue = editedMember.ivs[stat];
              const evValue = editedMember.evs[stat]; // 現在の努力値
              const level = editedMember.level;
              let natureModifier = 1.0;
              if (editedMember.nature) {
                if (editedMember.nature.increasedStat === stat) natureModifier = 1.1;
                if (editedMember.nature.decreasedStat === stat) natureModifier = 0.9;
              }
              const actualStat = calculateStat(baseStatValue, ivValue, evValue, level, natureModifier, stat);

              // スライダーが現在操作で到達できる最大値 (actualMaxValue) を計算
              let actualMaxValueForSlider: number;
              if (remainingEvs <= 0) {
                  // 残り努力値が0以下なら、現在の努力値 (evValue) が操作上の上限
                  actualMaxValueForSlider = evValue;
              } else {
                  // 残り努力値がある場合、増やせる上限は 252 と (現在のEV + 残りEV) の小さい方
                  // ただし、これは「目標値」であり、getValidEVで丸められる前の値
                  actualMaxValueForSlider = Math.min(252, evValue + remainingEvs);
              }
              // actualMaxValueForSlider も有効な努力値に丸めておく方が、ユーザーの混乱が少ないかもしれない
              // 例：残りEVが1でevValueが0の場合、actualMaxValueForSliderは1。getValidEV(1)=0。
              // ここでは、スライダーが「どこまで増やせるか」の目安として使うので、getValidEVを通す前の値でよい。
              // StatSlider側でonChange時にこの値を超える要求が来たら、この値にクリップする。
              // 最終的な努力値はhandleEvChange内でgetValidEVされる。

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
                    style={{ touchAction: 'pan-y' }} 
                    >
                    <StatSlider
                      label="" 
                      value={evValue}                 // 現在の努力値
                      fixedMax={252}                // スライダーのバーの全長は常に252
                      actualMaxValue={actualMaxValueForSlider} // 操作上の上限
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
        
        {/* 保存・キャンセルボタン */}
        <div className="mt-3 flex justify-end space-x-1.5 sticky bottom-0 bg-gray-800 py-1.5 -mx-2 sm:-mx-3 px-2 sm:px-3 border-t border-gray-700">
          <button onClick={() => onSave(editedMember)} className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded text-[11px] font-medium" disabled={remainingEvs < 0}> <Save className="h-3.5 w-3.5" /> 保存 </button>
          <button onClick={onClose} className="flex items-center gap-1 px-2.5 py-1 bg-gray-600 hover:bg-gray-700 rounded text-[11px] font-medium"> <X className="h-3.5 w-3.5" /> キャンセル </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberEditor;