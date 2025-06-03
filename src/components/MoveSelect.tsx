// MoveSelect.tsx
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Move, PokemonType } from '../types'; // パスをプロジェクトに合わせて調整
import { Search, X } from 'lucide-react';

// Helper function to convert Katakana to Hiragana
const toHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => { // Matches Katakana characters (ァ-ヶ)
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  });
};

// 日本語のタイプ名と色の定義
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
  const typeKey = (typeof type === 'string' ? type.toLowerCase() : type.toString().toLowerCase()) as keyof typeof TYPE_NAME_JP;
  return TYPE_NAME_JP[typeKey] || typeKey.toString();
};

const getTypeColor = (type: PokemonType | string): string => {
  const typeKey = (typeof type === 'string' ? type.toLowerCase() : type.toString().toLowerCase()) as keyof typeof TYPE_COLORS;
  return TYPE_COLORS[typeKey] || '#777777';
};

interface MoveSelectProps {
  moves: Move[];
  selected: Move | null;
  onChange: (move: Move | null) => void;
  label: string;
  onToggleTera: () => void;
  currentAttackerTeraType: PokemonType | null;
  isStellar: boolean;
  onToggleStellar: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  loadedMoves?: (Move | null)[] | null; // チームからロードされた技
}

const MoveSelect: React.FC<MoveSelectProps> = ({
  moves,
  selected,
  onChange,
  label,
  onToggleTera,
  currentAttackerTeraType,
  isStellar,
  onToggleStellar,
  disabled = false,
  className,
  placeholder = "わざを検索または選択...",
  loadedMoves,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const pcDropdownRef = useRef<HTMLDivElement>(null);
  const mobileViewRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);


  const baseId = useMemo(() => `move-select-${label.toLowerCase().replace(/\s+/g, '-')}`, [label]);
  const getOptionId = useCallback((moveId: string | number) => `${baseId}-option-${moveId}`, [baseId]);

  useEffect(() => {
    if (selected) {
      setInputValue(selected.name);
    } else {
      setInputValue('');
    }
  }, [selected]);

  const filteredMoves = useMemo(() => {
    const searchTermLower = inputValue.toLowerCase();
    const searchTermHiragana = toHiragana(searchTermLower);

    const nonStatusMoves = moves.filter(move => move.category !== 'status');

    let results: Move[];

    // フィルター関数
    const filterFn = (move: Move) => {
        if (!searchTermLower) return true;

        const moveNameJp = move.name;
        const moveNameJpLower = moveNameJp.toLowerCase();
        const moveNameJpHiragana = toHiragana(moveNameJp);
        const moveNameEnLower = (move as any).nameEn?.toLowerCase() || '';
        const typeOriginalJp = getTypeNameJp(move.type);
        const typeNameJpLower = typeOriginalJp.toLowerCase();
        const typeNameJpHiragana = toHiragana(typeOriginalJp);
        const moveTypeRawLower = move.type.toLowerCase();

        if (moveNameJpLower.includes(searchTermLower) || moveNameJpHiragana.includes(searchTermHiragana)) return true;
        if (moveNameEnLower && moveNameEnLower.includes(searchTermLower)) return true;
        if (typeNameJpLower.includes(searchTermLower) || typeNameJpHiragana.includes(searchTermHiragana)) return true;
        if (moveTypeRawLower.includes(searchTermLower)) return true;

        if (move.isTeraBlast) {
          const teraburstJpLower = "テラバースト".toLowerCase();
          const teraburstJpHiragana = toHiragana("テラバースト");
          const teraburstEnLower = "terablast".toLowerCase();
          if (teraburstJpLower.includes(searchTermLower) || teraburstJpHiragana.includes(searchTermHiragana) || teraburstEnLower.includes(searchTermLower)) {
            return true;
          }
        }
        return false;
    };

    if (searchTermLower) {
        // 検索語がある場合はまずフィルター
        results = nonStatusMoves.filter(filterFn);
    } else {
        // 検索語がない場合は全技
        results = [...nonStatusMoves];
    }
    
    // ソート処理: loadedMoves に含まれる技を先頭に
    if (loadedMoves && loadedMoves.length > 0) {
        const validLoadedMoves = loadedMoves.filter(m => m !== null) as Move[];
        const loadedMoveIdsInOrder = validLoadedMoves.map(m => m.id);
        const loadedMoveIdSet = new Set(loadedMoveIdsInOrder);

        results.sort((a, b) => {
            const aIsLoaded = loadedMoveIdSet.has(a.id);
            const bIsLoaded = loadedMoveIdSet.has(b.id);

            if (aIsLoaded && !bIsLoaded) return -1;
            if (!aIsLoaded && bIsLoaded) return 1;
            
            if (aIsLoaded && bIsLoaded) {
                // 両方 loaded の場合、loadedMoves 内の順序を維持
                const indexOfA = loadedMoveIdsInOrder.indexOf(a.id);
                const indexOfB = loadedMoveIdsInOrder.indexOf(b.id);
                return indexOfA - indexOfB;
            }
            
            // loaded ではない技同士は名前順 (日本語基準)
            return a.name.localeCompare(b.name, 'ja');
        });
    } else {
        // loadedMoves がない場合は名前順 (日本語基準)
        results.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    }

    return results;
  }, [moves, inputValue, loadedMoves]);

  useEffect(() => {
    if (!isOpen || disabled) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (pcDropdownRef.current && !pcDropdownRef.current.contains(target) &&
          inputRef.current && !inputRef.current.contains(target)) {
        if (typeof window !== 'undefined' && window.innerWidth >= 640) {
          setIsOpen(false);
          if (selected) setInputValue(selected.name); else setInputValue('');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, selected, disabled]);

  useEffect(() => {
    if (isOpen && !disabled) {
        const focusDelay = (typeof window !== 'undefined' && window.innerWidth < 640) ? 100 : 0;
        setTimeout(() => {
            inputRef.current?.focus();
        }, focusDelay);
        setHighlightedIndex(filteredMoves.length > 0 ? 0 : -1);
    } else {
        setHighlightedIndex(-1);
    }
  }, [isOpen, disabled, filteredMoves]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current && filteredMoves[highlightedIndex]) {
      const optionId = getOptionId(filteredMoves[highlightedIndex].id);
      const listItem = listRef.current.querySelector(`#${CSS.escape(optionId)}`) as HTMLLIElement | undefined;
      listItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex, filteredMoves, getOptionId]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen && !disabled) {
      setIsOpen(true);
    }
    if (e.target.value === '') {
      onChange(null);
    }
    setHighlightedIndex(filteredMoves.length > 0 ? 0 : -1);
  };

  const handleMoveSelect = (move: Move) => {
    onChange(move);
    setInputValue(move.name);
    setIsOpen(false);

    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }, 0);
    }
  };

  const clearInputAndSearch = () => {
    onChange(null);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen && !disabled) {
      setIsOpen(true);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredMoves.length) {
          handleMoveSelect(filteredMoves[highlightedIndex]);
        } else if (isOpen && filteredMoves.length === 1) {
          handleMoveSelect(filteredMoves[0]);
        } else if (!isOpen && inputValue && filteredMoves.length > 0) {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (filteredMoves.length > 0) {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev => (prev + 1) % filteredMoves.length);
            listRef.current?.focus();
          }
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (filteredMoves.length > 0) {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex(prev => (prev - 1 + filteredMoves.length) % filteredMoves.length);
            listRef.current?.focus();
          }
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          if (selected) setInputValue(selected.name); else setInputValue('');
        }
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredMoves.length) {
          handleMoveSelect(filteredMoves[highlightedIndex]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (filteredMoves.length > 0) {
          setHighlightedIndex(prev => (prev + 1) % filteredMoves.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (filteredMoves.length > 0) {
          setHighlightedIndex(prev => (prev - 1 + filteredMoves.length) % filteredMoves.length);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        if (selected) setInputValue(selected.name); else setInputValue('');
        inputRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            inputRef.current?.focus();
        }
        break;
    }
  };

  const renderMoveItems = () => (
    <>
      {filteredMoves.length > 0 ? (
        filteredMoves.map((move, index) => (
          <li
            key={move.id}
            id={getOptionId(move.id)}
            className={`cursor-pointer select-none relative py-2.5 sm:py-2 pl-3 pr-4 transition-colors group rounded-md
              ${highlightedIndex === index ? 'bg-gray-700 text-white' : 'text-white hover:bg-gray-700'}`}
            onClick={() => handleMoveSelect(move)}
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                setHighlightedIndex(index);
              }
            }}
            role="option"
            aria-selected={selected?.id === move.id || highlightedIndex === index}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <span className={`font-medium block truncate`}>
                  {move.name}
                </span>
                <span className={`text-sm block truncate ${highlightedIndex === index ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'}`}>
                  {move.category === "physical" ? "物理" : move.category === "special" ? "特殊" : "変化"} | 威力: {move.power === undefined || move.power === null ? '—' : move.power}
                </span>
              </div>
              <span
                className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white self-center"
                style={{ backgroundColor: getTypeColor(move.type) }}
              >
                {getTypeNameJp(move.type)}
              </span>
            </div>
          </li>
        ))
      ) : (
        <li className="text-center py-4 text-gray-400 px-3">
          {inputValue ? "該当するわざが見つかりません。" : "検索語を入力または選択してください。"}
        </li>
      )}
    </>
  );

  const renderSearchInputComponent = (isMobileModalInput = false) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
            id={isMobileModalInput ? `move-select-input-${label}-mobile-modal` : `move-select-input-${label}`}
            ref={inputRef}
            type="text"
            className={`w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm pl-10 pr-10 py-2.5 text-left sm:text-sm text-white
            ${disabled ? 'cursor-not-allowed bg-gray-700 placeholder-gray-500' : 'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'}`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              if (!disabled && !isOpen) {
                if (typeof window !== 'undefined' && window.innerWidth < 640 && !isMobileModalInput) {
                  if (!selected) setInputValue(''); // 選択されていない場合のみクリア
                }
                setIsOpen(true);
              }
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            aria-autocomplete="list"
            aria-controls={isOpen ? `move-select-listbox-${label}` : undefined}
            aria-expanded={isOpen}
            aria-activedescendant={isOpen && highlightedIndex >= 0 && filteredMoves[highlightedIndex] ? getOptionId(filteredMoves[highlightedIndex].id) : undefined}
        />
        {inputValue && !disabled && (
        <button
            type="button"
            onClick={clearInputAndSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
            aria-label="入力をクリアして再検索"
        >
            <X className="h-4 w-4" />
        </button>
        )}
    </div>
  );

  return (
    <div className={`w-full ${className || ''} ${disabled ? 'opacity-70' : ''}`}>
      {/* Label is handled by AttackerPanel's grid */}
      {/* <label htmlFor={`move-select-input-${label}`} className="block text-sm font-medium text-white mb-1 sm:mb-2">{label}</label> */}

      <div className="relative">
        {renderSearchInputComponent()}

        {isOpen && !disabled && (
          <>
            {/* Mobile View Modal */}
            <div
              ref={mobileViewRef}
              className={`
                fixed inset-0 z-50 flex flex-col bg-gray-900
                sm:hidden
              `}
            >
              <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800 shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    if (selected) setInputValue(selected.name); else setInputValue('');
                    if (inputRef.current) {
                       setTimeout(() => inputRef.current?.blur(), 0);
                    }
                  }}
                  className="p-1 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-label="閉じる"
                >
                  <X className="h-6 w-6" />
                </button>
                <h2 className="text-lg font-semibold text-white">{label || 'わざを選択'}</h2>
                <div className="w-8"></div> {/* Spacer */}
              </div>

              <div className="p-3 border-b border-gray-700 bg-gray-800">
                {renderSearchInputComponent(true)}
              </div>

              <ul
                ref={listRef}
                id={`move-select-listbox-${label}-mobile`}
                tabIndex={-1}
                role="listbox"
                aria-label={`${label || 'わざ'}の候補（モバイル）`}
                aria-activedescendant={highlightedIndex >= 0 && filteredMoves[highlightedIndex] ? getOptionId(filteredMoves[highlightedIndex].id) : undefined}
                onKeyDown={handleListKeyDown}
                className="flex-grow overflow-y-auto p-2 space-y-1"
              >
                {renderMoveItems()}
              </ul>
            </div>

            {/* PC View Dropdown */}
            <div
              ref={pcDropdownRef}
              className={`
                absolute z-40 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md ring-1 ring-black ring-opacity-5 flex flex-col
                hidden sm:flex
                overflow-hidden
              `}
            >
              <ul
                ref={listRef}
                id={`move-select-listbox-${label}-pc`}
                tabIndex={-1}
                role="listbox"
                aria-label={`${label || 'わざ'}の候補（PC）`}
                aria-activedescendant={highlightedIndex >= 0 && filteredMoves[highlightedIndex] ? getOptionId(filteredMoves[highlightedIndex].id) : undefined}
                onKeyDown={handleListKeyDown}
                className="p-2 overflow-y-auto flex-grow space-y-1"
              >
                {renderMoveItems()}
              </ul>
            </div>
          </>
        )}
      </div>

      {selected && !disabled && (
        <div className="mt-2 flex flex-wrap items-center justify-start gap-x-3 gap-y-1 text-xs text-gray-300">
          <div className="flex items-center">
            <span className="mr-1">威力:</span>
            <span className="text-white font-medium mr-2">{selected.power === undefined || selected.power === null ? '—' : selected.power}</span>
            <span className="mr-1">|</span>

            <span
              className="px-1.5 py-0.5 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: getTypeColor(selected.type) }}
            >
              {getTypeNameJp(selected.type)}
            </span>
          </div>

          <label htmlFor={`terastal-toggle-${baseId}`} className="flex items-center cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              id={`terastal-toggle-${baseId}`}
              checked={currentAttackerTeraType !== null && !isStellar}
              onChange={() => !disabled && !isStellar && onToggleTera()}
              disabled={disabled || isStellar}
              className="w-3.5 h-3.5 rounded border-gray-500 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800 disabled:opacity-50"
            />
            <span className={`ml-1.5 ${disabled || isStellar ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300'}`}>
              テラスタル
            </span>
          </label>

          <label htmlFor={`stellar-toggle-${baseId}`} className="flex items-center cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              id={`stellar-toggle-${baseId}`}
              checked={isStellar}
              onChange={() => !disabled && onToggleStellar()}
              disabled={disabled}
              className="w-3.5 h-3.5 rounded border-gray-500 bg-gray-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800 disabled:opacity-50"
            />
            <span className={`ml-1.5 ${disabled ? 'text-gray-500 cursor-not-allowed' : 'text-gray-300'}`}>
              ステラ
            </span>
          </label>

            {selected.isTeraBlast && isStellar && <span className="text-pink-400">(ステラ)</span>}
            {selected.isTeraBlast && currentAttackerTeraType && !isStellar && <span className="text-blue-400">({getTypeNameJp(currentAttackerTeraType)} テラバースト)</span>}

        </div>
      )}
      {selected && selected.description && !disabled && (
          <p className="mt-1 text-xs italic text-gray-400">{selected.description}</p>
      )}
    </div>
  );
};

export default MoveSelect;