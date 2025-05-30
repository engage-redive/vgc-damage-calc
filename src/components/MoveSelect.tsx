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

    return moves
      .filter(move => move.category !== 'status') 
      .filter(move => {
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
      });
  }, [moves, inputValue]);

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
  
  const renderSearchInputComponent = () => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
            id={`move-select-input-${label}`}
            ref={inputRef}
            type="text" 
            className={`w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm pl-10 pr-10 py-2.5 text-left sm:text-sm text-white
            ${disabled ? 'cursor-not-allowed bg-gray-700 placeholder-gray-500' : 'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'}`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              // ユーザーの明示的なフォーカス時（かつリストが閉じてる場合）のみリストを開く
              if (!disabled && !isOpen) {
                // ★★★ ここからが修正点 ★★★
                // スマホの場合、フォーカス時に前回検索した技名が残っていると次の検索がしづらいため、
                // 入力値をクリアして新しい検索を開始できるようにする。
                if (typeof window !== 'undefined' && window.innerWidth < 640) { // Tailwind 'sm' breakpoint (640px)
                  setInputValue('');
                }
                // ★★★ ここまでが修正点 ★★★
                setIsOpen(true);
              }
              // isOpenが既にtrueの場合（例：モーダル内のinputがプログラムでフォーカスされた時）は、
              // inputValueをクリアしたり、setIsOpen(true)を再度呼ぶ必要はない。
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="わざを検索または選択..."
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
    <div className={`w-full ${disabled ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <label htmlFor={`move-select-input-${label}`} className="block text-sm font-medium text-white">{label}</label>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`teraType-${label}`}
              checked={currentAttackerTeraType !== null && !isStellar}
              onChange={() => !disabled && !isStellar && onToggleTera()}
              disabled={disabled || !selected || isStellar}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:opacity-50"
            />
            <label htmlFor={`teraType-${label}`} className={`ml-1.5 sm:ml-2 text-xs sm:text-sm ${disabled || !selected || isStellar ? 'text-gray-500 cursor-not-allowed' : 'text-white cursor-pointer'}`}>
              テラスタル
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`stellar-${label}`}
              checked={isStellar}
              onChange={() => !disabled && onToggleStellar()}
              disabled={disabled || !selected}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:opacity-50"
            />
            <label htmlFor={`stellar-${label}`} className={`ml-1.5 sm:ml-2 text-xs sm:text-sm ${disabled || !selected ? 'text-gray-500 cursor-not-allowed' : 'text-white cursor-pointer'}`}>
              ステラ
            </label>
          </div>
        </div>
      </div>
      
      <div className="relative">
        {renderSearchInputComponent()}

        {isOpen && !disabled && (
          <>
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
                <h2 className="text-lg font-semibold text-white">{label}</h2>
                <div className="w-8"></div> 
              </div>

              <div className="p-3 border-b border-gray-700 bg-gray-800">
                {renderSearchInputComponent()} 
              </div>

              <ul
                ref={listRef} 
                id={`move-select-listbox-${label}-mobile`} 
                tabIndex={-1} 
                role="listbox"
                aria-label={`${label}の候補（モバイル）`}
                aria-activedescendant={highlightedIndex >= 0 && filteredMoves[highlightedIndex] ? getOptionId(filteredMoves[highlightedIndex].id) : undefined}
                onKeyDown={handleListKeyDown}
                className="flex-grow overflow-y-auto p-2 space-y-1"
              >
                {renderMoveItems()}
              </ul>
            </div>

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
                aria-label={`${label}の候補（PC）`}
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

      {selected && (
        <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300 space-y-0.5 sm:space-y-1">
          <p>
            選択中の技: <strong className="text-white">{selected.name}</strong>
            {selected.isTeraBlast && isStellar && <span className="text-pink-400 ml-1">(ステラ)</span>}
            {selected.isTeraBlast && currentAttackerTeraType && !isStellar && <span className="text-blue-400 ml-1">({getTypeNameJp(currentAttackerTeraType as string)} テラバースト)</span>}
          </p>
          <p>
            威力: <span className="text-white">{selected.power === undefined || selected.power === null ? '—' : selected.power}</span> |
            命中: <span className="text-white">{selected.accuracy === undefined || selected.accuracy === null ? '—' : selected.accuracy}</span> |
            タイプ: <span className="text-white px-1.5 py-0.5 rounded-md text-xs" style={{backgroundColor: getTypeColor(selected.type), color: '#fff'}}>{getTypeNameJp(selected.type)}</span>
          </p>
          {selected.description && <p className="mt-1 italic text-gray-400 text-xs">{selected.description}</p>}
        </div>
      )}
    </div>
  );
};

export default MoveSelect;