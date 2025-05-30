import React, { useState, useRef, useEffect } from 'react';
import { Move, PokemonType } from '../types'; // パスをプロジェクトに合わせて調整
import { Search, X } from 'lucide-react';

// Helper function to convert Katakana to Hiragana
// This function should ideally be in a utils file if used elsewhere.
const toHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => { // Matches Katakana characters (ァ-ヶ)
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  });
};

// 日本語のタイプ名と色の定義 (共通化のため、本来は utils などに定義してインポート)
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

/**
 * Represents a Move.
 * This is an example structure, ensure your actual `Move` type in `../types.ts`
 * includes `nameEn` for optimal Romaji/English search.
 *
 * interface Move {
 *   id: string | number;
 *   name: string;       // Japanese name (e.g., "ワイドフォース")
 *   nameEn?: string;     // English/Romaji name (e.g., "expanding force") - IMPORTANT for Romaji/English search
 *   type: PokemonType;
 *   category: 'physical' | 'special' | 'status';
 *   power?: number | null;
 *   accuracy?: number | null;
 *   pp?: number;
 *   description?: string;
 *   isTeraBlast?: boolean;
 *   // ...other properties
 * }
 */

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected) {
      setInputValue(selected.name);
    } else {
      setInputValue('');
    }
  }, [selected]);

  const searchTermLower = inputValue.toLowerCase();
  const searchTermHiragana = toHiragana(searchTermLower); // Convert search term to Hiragana

  const filteredMoves = moves
    .filter(move => move.category !== 'status') // ステータス技を除外
    .filter(move => {
      if (!searchTermLower) return true; // If search term is empty, show all non-status moves

      const moveNameJp = move.name;
      const moveNameJpLower = moveNameJp.toLowerCase();
      const moveNameJpHiragana = toHiragana(moveNameJp); // Convert move's Japanese name to Hiragana

      // Assuming Move type might have an 'nameEn' field for English/Romaji name
      const moveNameEnLower = (move as any).nameEn?.toLowerCase() || '';

      const typeOriginalJp = getTypeNameJp(move.type);
      const typeNameJpLower = typeOriginalJp.toLowerCase();
      const typeNameJpHiragana = toHiragana(typeOriginalJp); // Convert move's Japanese type name to Hiragana

      const moveTypeRawLower = move.type.toLowerCase(); // English type name

      // 1. Match with Japanese move name (original or hiragana search term)
      if (moveNameJpLower.includes(searchTermLower) || moveNameJpHiragana.includes(searchTermHiragana)) {
        return true;
      }

      // 2. Match with English move name (original search term)
      // This requires 'nameEn' property in your Move data
      if (moveNameEnLower && moveNameEnLower.includes(searchTermLower)) {
        return true;
      }

      // 3. Match with Japanese type name (original or hiragana search term)
      if (typeNameJpLower.includes(searchTermLower) || typeNameJpHiragana.includes(searchTermHiragana)) {
        return true;
      }
      
      // 4. Match with English type name (original search term)
      if (moveTypeRawLower.includes(searchTermLower)) {
          return true;
      }

      // 5. Special case for Tera Blast (original, hiragana, or English search term)
      if (move.isTeraBlast) {
        const teraburstJpLower = "テラバースト".toLowerCase();
        const teraburstJpHiragana = toHiragana("テラバースト"); // "てらばーすと"
        const teraburstEnLower = "terablast".toLowerCase();
        if (
            teraburstJpLower.includes(searchTermLower) || 
            teraburstJpHiragana.includes(searchTermHiragana) ||
            teraburstEnLower.includes(searchTermLower)
        ) {
            return true;
        }
      }
      
      return false;
    });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (selected) {
          setInputValue(selected.name);
        } else {
            setInputValue('');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selected]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (selected) {
          setInputValue(selected.name);
        } else {
            setInputValue('');
        }
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
    if (e.target.value === '') {
        onChange(null);
    }
  };

  const handleMoveSelect = (move: Move) => {
    onChange(move);
    setInputValue(move.name);
    setIsOpen(false);
  };

  const clearInputAndSearch = () => {
    onChange(null);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleTeraCheckboxChange = () => {
    if (disabled || !selected) return;
    onToggleTera();
  };

  const handleStellarCheckboxChange = () => {
    if (disabled || !selected) return;
    onToggleStellar();
  };

  return (
    <div className={`w-full ${disabled ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <label htmlFor={`move-select-input-${label}`} className="block text-sm font-medium text-white">{label}</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`teraType-${label}`}
              checked={currentAttackerTeraType !== null && !isStellar}
              onChange={handleTeraCheckboxChange}
              disabled={disabled || !selected}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <label htmlFor={`teraType-${label}`} className={`text-sm ${disabled || !selected ? 'text-gray-500' : 'text-white'}`}>
              テラスタル
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`stellar-${label}`}
              checked={isStellar}
              onChange={handleStellarCheckboxChange}
              disabled={disabled || !selected}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <label htmlFor={`stellar-${label}`} className={`text-sm ${disabled || !selected ? 'text-gray-500' : 'text-white'}`}>
              ステラ
            </label>
          </div>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id={`move-select-input-${label}`}
            ref={inputRef}
            type="text"
            className={`w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm pl-10 pr-10 py-2 text-left sm:text-sm text-white
              ${disabled ? 'cursor-not-allowed bg-gray-700' : 'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'}`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !disabled && setIsOpen(true)}
            placeholder="わざを検索または選択..."
            disabled={disabled}
            autoComplete="off"
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

        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md overflow-y-auto focus:outline-none ring-1 ring-black ring-opacity-5">
            <ul className="py-1" role="listbox" aria-label={`${label}の候補`}>
              {filteredMoves.length > 0 ? (
                filteredMoves.map((move) => (
                  <li
                    key={move.id}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-4 hover:bg-gray-700 transition-colors group"
                    onClick={() => handleMoveSelect(move)}
                    role="option"
                    aria-selected={selected?.id === move.id}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <span className="text-white font-medium block truncate group-hover:text-white">
                          {move.name}
                        </span>
                        <span className="text-gray-400 text-sm block truncate group-hover:text-gray-300">
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
                  {inputValue ? "該当するわざが見つかりません。" : "検索語を入力してください。"}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p>
            選択中の技: <strong className="text-white">{selected.name}</strong>
            {selected.isTeraBlast && isStellar && <span className="text-xs text-pink-400 ml-1">(ステラ)</span>}
            {selected.isTeraBlast && currentAttackerTeraType && !isStellar && <span className="text-xs text-blue-400 ml-1">({getTypeNameJp(currentAttackerTeraType as string)} テラバースト)</span>}
          </p>
          <p>
            威力: <span className="text-white">{selected.power === undefined || selected.power === null ? '—' : selected.power}</span> |
            命中: <span className="text-white">{selected.accuracy === undefined || selected.accuracy === null ? '—' : selected.accuracy}</span> |
            タイプ: <span className="text-white px-1.5 py-0.5 rounded-md text-xs" style={{backgroundColor: getTypeColor(selected.type), color: '#fff'}}>{getTypeNameJp(selected.type)}</span>
          </p>
          {selected.description && <p className="mt-1 italic text-gray-400">{selected.description}</p>}
        </div>
      )}
    </div>
  );
};

export default MoveSelect;