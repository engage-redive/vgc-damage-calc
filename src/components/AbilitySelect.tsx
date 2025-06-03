import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Ability, ProtosynthesisBoostTarget, Pokemon } from '../types'; // Pokemon をインポート
import { ChevronDown } from 'lucide-react';

const PROTOSYNTHESIS_ABILITY_ID = 'protosynthesis';
const QUARK_DRIVE_ABILITY_ID = 'quark_drive';

type BoostableStat = NonNullable<ProtosynthesisBoostTarget>;

export interface SpecialAbilityConfig {
  manualTrigger: boolean;
  boostedStat: ProtosynthesisBoostTarget;
}

interface AbilitySelectProps {
  abilities?: Ability[]; // Made optional with default []
  selected: Ability | null;
  onChange: (ability: Ability | null) => void;
  label: string;
  side: 'attacker' | 'defender';
  protosynthesisConfig?: SpecialAbilityConfig;
  onProtosynthesisConfigChange?: (config: SpecialAbilityConfig) => void;
  quarkDriveConfig?: SpecialAbilityConfig;
  onQuarkDriveConfigChange?: (config: SpecialAbilityConfig) => void;
  selectedPokemon?: Pokemon | null; // ★ 選択中のポケモンをpropsとして追加
  idPrefix?: string; // Optional prefix for generating unique IDs
}

const AbilitySelect: React.FC<AbilitySelectProps> = ({
  abilities = [], // Default to empty array if undefined
  selected,
  onChange,
  label,
  side,
  protosynthesisConfig,
  onProtosynthesisConfigChange,
  quarkDriveConfig,
  onQuarkDriveConfigChange,
  selectedPokemon, // ★ props を受け取る
  idPrefix = 'ability-select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const baseId = useMemo(() => `${idPrefix}-${label.toLowerCase().replace(/\s+/g, '-')}-${side}`, [idPrefix, label, side]);
  const buttonId = `${baseId}-button`;
  const listboxId = `${baseId}-listbox`;
  const getOptionId = (abilityId: string | number) => `${baseId}-option-${abilityId}`;

  const sortedAbilities = useMemo(() => {
    if (!Array.isArray(abilities)) return [];
    let baseFiltered = abilities.filter(ability => ability.side === side || ability.side === 'both');

    if (selectedPokemon && selectedPokemon.abilities && selectedPokemon.abilities.length > 0) {
      const pokemonAbilityNamesEn = new Set(selectedPokemon.abilities.map(name => name.toLowerCase())); // ポケモンの特性名を小文字Setに
       // 元の配列を破壊しないようにコピーしてソート
      return [...baseFiltered].sort((a, b) => {
        const aIsPokemonAbility = pokemonAbilityNamesEn.has(a.nameEn.toLowerCase()); // nameEnで比較
        const bIsPokemonAbility = pokemonAbilityNamesEn.has(b.nameEn.toLowerCase()); // nameEnで比較

        if (aIsPokemonAbility && !bIsPokemonAbility) return -1;
        if (!aIsPokemonAbility && bIsPokemonAbility) return 1;
        // ポケモンの特性同士、またはそうでない特性同士は日本語名でソート
        return a.name.localeCompare(b.name, 'ja');
      });
    }
    // ポケモンが選択されていないか、特性情報がない場合は、日本語名でソート
    return [...baseFiltered].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
  }                                
                                  , [abilities, side, selectedPokemon]);

  const options = useMemo(() => [
    { id: '__no-ability__', name: '特性なし', description: '', side: 'both' as const }, // Placeholder for "No Ability"
    ...sortedAbilities,
  ], [sortedAbilities]);


  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      let initialIndex = 0;
      if (selected) {
        const foundIndex = options.findIndex(opt => opt.id === selected.id);
        if (foundIndex !== -1) initialIndex = foundIndex;
      } else {
         initialIndex = options.findIndex(opt => opt.id === '__no-ability__');
      }
      setHighlightedIndex(initialIndex >=0 ? initialIndex : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen, selected, options]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const listItem = listRef.current.children[highlightedIndex] as HTMLLIElement | undefined;
      listItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex]);


  const handleMainAbilityChange = (ability: Ability | null) => {
    onChange(ability);
    setIsOpen(false);
    buttonRef.current?.focus();

    if (onProtosynthesisConfigChange) {
      if (ability?.id === PROTOSYNTHESIS_ABILITY_ID) {
        const currentBoostedStat = protosynthesisConfig?.boostedStat;
        const currentManualTrigger = protosynthesisConfig?.manualTrigger ?? false;
        const defaultStatForSide = side === 'attacker' ? 'attack' : 'defense';
        const newBoostedStat = currentBoostedStat !== undefined && currentBoostedStat !== null
                                 ? currentBoostedStat
                                 : defaultStatForSide;
        onProtosynthesisConfigChange({
          manualTrigger: currentManualTrigger,
          boostedStat: newBoostedStat,
        });
      }
    }

    if (onQuarkDriveConfigChange) {
      if (ability?.id === QUARK_DRIVE_ABILITY_ID) {
        const currentBoostedStat = quarkDriveConfig?.boostedStat;
        const currentManualTrigger = quarkDriveConfig?.manualTrigger ?? false;
        const defaultStatForSide = side === 'attacker' ? 'attack' : 'defense';
        const newBoostedStat = currentBoostedStat !== undefined && currentBoostedStat !== null
                                 ? currentBoostedStat
                                 : defaultStatForSide;
        onQuarkDriveConfigChange({
          manualTrigger: currentManualTrigger,
          boostedStat: newBoostedStat,
        });
      }
    }
  };

  const handleSelectOption = (option: typeof options[0]) => {
    handleMainAbilityChange(option.id === '__no-ability__' ? null : option as Ability);
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          if (highlightedIndex >= 0 && highlightedIndex < options.length) {
            handleSelectOption(options[highlightedIndex]);
          }
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => (prev - 1 + options.length) % options.length);
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        if (isOpen) setHighlightedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        if (isOpen) setHighlightedIndex(options.length - 1);
        break;
      case 'Tab':
        if (isOpen) setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleManualTriggerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    abilityType: 'protosynthesis' | 'quarkDrive'
  ) => {
    if (abilityType === 'protosynthesis' && onProtosynthesisConfigChange && protosynthesisConfig) {
      onProtosynthesisConfigChange({
        ...protosynthesisConfig,
        manualTrigger: e.target.checked,
      });
    } else if (abilityType === 'quarkDrive' && onQuarkDriveConfigChange && quarkDriveConfig) {
      onQuarkDriveConfigChange({
        ...quarkDriveConfig,
        manualTrigger: e.target.checked,
      });
    }
  };

  const handleBoostedStatChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    abilityType: 'protosynthesis' | 'quarkDrive'
  ) => {
    const value = e.target.value as BoostableStat | "";
    if (abilityType === 'protosynthesis' && onProtosynthesisConfigChange && protosynthesisConfig) {
      onProtosynthesisConfigChange({
        ...protosynthesisConfig,
        boostedStat: value === "" ? null : value,
      });
    } else if (abilityType === 'quarkDrive' && onQuarkDriveConfigChange && quarkDriveConfig) {
      onQuarkDriveConfigChange({
        ...quarkDriveConfig,
        boostedStat: value === "" ? null : value,
      });
    }
  };

  const showProtosynthesisOptions = selected?.id === PROTOSYNTHESIS_ABILITY_ID &&
                                  protosynthesisConfig &&
                                  onProtosynthesisConfigChange;

  const showQuarkDriveOptions = selected?.id === QUARK_DRIVE_ABILITY_ID &&
                                quarkDriveConfig &&
                                onQuarkDriveConfigChange;

  const boostableStats: { value: BoostableStat; label: string }[] = [
    { value: 'attack', label: '攻撃' },
    { value: 'defense', label: '防御' },
    { value: 'specialAttack', label: '特攻' },
    { value: 'specialDefense', label: '特防' },
    { value: 'speed', label: '素早さ' },
  ];

  return (
    <div className="w-full mb-4">
      <label id={`${baseId}-label`} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          className="relative w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${baseId}-label ${buttonId}`}
          aria-controls={isOpen ? listboxId : undefined}
        >
          <span className="block truncate">
            {selected ? selected.name : '特性なし'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md overflow-y-auto focus:outline-none ring-1 ring-black ring-opacity-5">
            <ul
              ref={listRef}
              id={listboxId}
              tabIndex={-1}
              role="listbox"
              aria-labelledby={`${baseId}-label`}
              aria-activedescendant={highlightedIndex >= 0 ? getOptionId(options[highlightedIndex].id) : undefined}
              onKeyDown={handleKeyDown}
              className="py-1"
            >
              {options.map((ability, index) => (
                <li
                  key={ability.id}
                  id={getOptionId(ability.id)}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 transition-colors ${
                    highlightedIndex === index ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                  role="option"
                  aria-selected={
                    ability.id === '__no-ability__' 
                      ? selected === null 
                      : selected?.id === ability.id
                  }
                  onClick={() => handleSelectOption(ability)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex flex-col">
                    <span className={`block truncate text-white ${
                       (ability.id === '__no-ability__' ? selected === null : selected?.id === ability.id) ? 'font-semibold' : 'font-normal'
                    }`}>
                      {ability.name}
                    </span>
                    {ability.id !== '__no-ability__' && ability.description && (
                      <span className="text-gray-400 text-xs mt-0.5">
                        {ability.description}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* こだいかっせい設定UI */}
      {showProtosynthesisOptions && protosynthesisConfig && (
        <div className="mt-3 p-3 border border-yellow-600/50 rounded-md bg-yellow-900/30 space-y-3">
          <p className="text-sm text-yellow-300 -mb-1">こだいかっせい 設定:</p>
          <div>
            <label htmlFor={`${baseId}-protosynthesis-manual-trigger`} className="flex items-center text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                id={`${baseId}-protosynthesis-manual-trigger`}
                className="h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-offset-gray-800"
                checked={protosynthesisConfig.manualTrigger}
                onChange={(e) => handleManualTriggerChange(e, 'protosynthesis')}
                disabled={!onProtosynthesisConfigChange}
              />
              <span className="ml-2">手動で発動する</span>
            </label>
          </div>
          <div>
            <label htmlFor={`${baseId}-protosynthesis-boosted-stat`} className="block text-sm font-medium text-white mb-1">
              上昇させる能力:
            </label>
            <select
              id={`${baseId}-protosynthesis-boosted-stat`}
              value={protosynthesisConfig.boostedStat || ''}
              onChange={(e) => handleBoostedStatChange(e, 'protosynthesis')}
              disabled={!onProtosynthesisConfigChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">選択してください</option>
              {boostableStats.map(stat => (
                <option key={stat.value} value={stat.value}>{stat.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* クォークチャージ設定UI */}
      {showQuarkDriveOptions && quarkDriveConfig && (
        <div className="mt-3 p-3 border border-purple-600/50 rounded-md bg-purple-900/30 space-y-3">
          <p className="text-sm text-purple-300 -mb-1">クォークチャージ 設定:</p>
          <div>
            <label htmlFor={`${baseId}-quarkDrive-manual-trigger`} className="flex items-center text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                id={`${baseId}-quarkDrive-manual-trigger`}
                className="h-4 w-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-400 focus:ring-offset-gray-800"
                checked={quarkDriveConfig.manualTrigger}
                onChange={(e) => handleManualTriggerChange(e, 'quarkDrive')}
                disabled={!onQuarkDriveConfigChange}
              />
              <span className="ml-2">手動で発動する</span>
            </label>
          </div>
          <div>
            <label htmlFor={`${baseId}-quarkDrive-boosted-stat`} className="block text-sm font-medium text-white mb-1">
              上昇させる能力:
            </label>
            <select
              id={`${baseId}-quarkDrive-boosted-stat`}
              value={quarkDriveConfig.boostedStat || ''}
              onChange={(e) => handleBoostedStatChange(e, 'quarkDrive')}
              disabled={!onQuarkDriveConfigChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">選択してください</option>
              {boostableStats.map(stat => (
                <option key={stat.value} value={stat.value}>{stat.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilitySelect;