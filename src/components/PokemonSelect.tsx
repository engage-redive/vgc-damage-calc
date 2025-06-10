// PokemonSelect.tsx (修正後)

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Pokemon } from '../types';
import { ChevronDown, Search } from 'lucide-react';
import { getTypeColor, getTypeNameJp } from '../utils/uiHelpers';

const toHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  });
};

interface PokemonSelectProps {
  pokemon?: Pokemon[];
  selected: Pokemon | null;
  onChange: (pokemon: Pokemon) => void;
  label: string;
  idPrefix?: string;
}

const PokemonSelect: React.FC<PokemonSelectProps> = ({
  pokemon = [],
  selected,
  onChange,
  label,
  idPrefix = 'pokemon-select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const baseId = useMemo(() => `${idPrefix}-${label.toLowerCase().replace(/\s+/g, '-')}`, [idPrefix, label]);
  const buttonId = `${baseId}-button`;
  const listboxId = `${baseId}-listbox`;
  const searchId = `${baseId}-search`;

  const getOptionId = useCallback((pokemonName: string) => {
    const sanitizedName = pokemonName.toLowerCase().replace(/[^a-z0-9ぁ-んァ-ンー\-]/gi, '');
    return `${baseId}-option-${sanitizedName}`;
  }, [baseId]);
  
  const uniquePokemonList = useMemo(() => {
    if (!pokemon || pokemon.length === 0) return [];
    const seenNames = new Set<string>();
    return pokemon.filter(p => {
        if (p && typeof p.name !== 'undefined' && !seenNames.has(p.name)) {
            seenNames.add(p.name);
            return true;
        }
        return false;
    });
  }, [pokemon]);
  
  // ▼▼▼ ここを修正しました ▼▼▼
  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return uniquePokemonList;

    const termLower = searchTerm.toLowerCase();
    const termAsHiragana = toHiragana(searchTerm);

    return uniquePokemonList.filter(p => {
      const nameHiragana = toHiragana(p.name);
      const nameEnLower = (p as any).nameEn?.toLowerCase() || '';
      
      // 英語名での部分一致をチェック
      // (例: "caly" で "Calyrex" がヒットする)
      if (nameEnLower && nameEnLower.includes(termLower)) {
        return true;
      }
      
      // 日本語名での前方一致をチェック
      // (例: 「ばどれ」で「バドレックス」がヒットする)
      if (nameHiragana.startsWith(termAsHiragana)) {
        return true;
      }
      
      return false;
    });
  }, [uniquePokemonList, searchTerm]);
  // ▲▲▲ 修正ここまで ▲▲▲

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      
      if (selected) {
        const selectedIndex = filteredPokemon.findIndex(p => p.name === selected.name);
        setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : 0);
      } else {
        setHighlightedIndex(0);
      }
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen]); 

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
    }
  }, [searchTerm, filteredPokemon, isOpen]); // isOpenを依存配列に追加

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current && filteredPokemon[highlightedIndex]) {
      const optionId = getOptionId(filteredPokemon[highlightedIndex].name);
      const listItem = listRef.current.querySelector(`#${CSS.escape(optionId)}`);
      listItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen, filteredPokemon, getOptionId]);

  const handleSelectPokemon = (p: Pokemon) => {
    onChange(p);
    setIsOpen(false);
    setSearchTerm('');
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const listHasItems = filteredPokemon.length > 0;
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          if (listHasItems && highlightedIndex >= 0) {
            handleSelectPokemon(filteredPokemon[highlightedIndex]);
          }
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (listHasItems) {
          setHighlightedIndex(p => (p + 1) % filteredPokemon.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (listHasItems) {
          setHighlightedIndex(p => (p - 1 + filteredPokemon.length) % filteredPokemon.length);
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSearchInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const listHasItems = filteredPokemon.length > 0;
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (listHasItems && highlightedIndex >= 0) {
          handleSelectPokemon(filteredPokemon[highlightedIndex]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (listHasItems) {
          setHighlightedIndex(p => (p + 1) % filteredPokemon.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (listHasItems) {
          setHighlightedIndex(p => (p - 1 + filteredPokemon.length) % filteredPokemon.length);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const renderListItems = () => (
    <>
      {filteredPokemon.length > 0 ? filteredPokemon.map((p, index) => (
        <li
          key={p.id}
          id={getOptionId(p.name)}
          className={`cursor-pointer select-none relative rounded-md transition-colors py-2 pl-3 pr-9 ${highlightedIndex === index ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}`}
          role="option"
          aria-selected={selected?.id === p.id || highlightedIndex === index}
          onClick={() => handleSelectPokemon(p)}
          onMouseEnter={() => setHighlightedIndex(index)}
        >
          <div className="flex items-center justify-between">
            <span className={`font-medium block truncate ${selected?.id === p.id ? 'font-semibold' : 'font-normal'}`}>
              {p.name}
            </span>
            {p.types && (
              <span className="ml-2 flex-shrink-0 flex gap-1">
                {p.types.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {getTypeNameJp(type)}
                  </span>
                ))}
              </span>
            )}
          </div>
        </li>
      )) : (
        <li className="text-center py-4 text-gray-400 px-3">
          該当するポケモンが見つかりません。
        </li>
      )}
    </>
  );

  const renderSearchInput = () => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-4 w-4 text-gray-400" /></div>
      <input
        ref={searchInputRef} id={searchId} type="text"
        className="block w-full pl-10 pr-3 py-2.5 border-gray-700 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
        placeholder="ポケモンを検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchInputKeyDown}
        aria-controls={listboxId}
        aria-autocomplete="list"
      />
    </div>
  );

  return (
    <div className="w-full">
      <label id={`${baseId}-label`} className="block text-sm font-medium text-white mb-1">{label}</label>
      <div className="relative">
        <button
          ref={buttonRef} id={buttonId} type="button"
          className="relative w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-white"
          onClick={() => setIsOpen(!isOpen)} onKeyDown={handleKeyDown}
          aria-haspopup="listbox" aria-expanded={isOpen}
          aria-labelledby={`${baseId}-label ${buttonId}`}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={isOpen && highlightedIndex >= 0 && filteredPokemon.length > 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].name) : undefined}
        >
          <span className="block truncate">{selected ? selected.name : 'ポケモンを選択'}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"><ChevronDown className="h-4 w-4 text-gray-400" /></span>
        </button>

        {isOpen && (
          <div ref={dropdownRef} className="absolute z-40 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md ring-1 ring-black ring-opacity-5 flex flex-col overflow-hidden">
            <div className="sticky top-0 z-10 bg-gray-800 p-2 border-b border-gray-700">
              {renderSearchInput()}
            </div>
            <ul ref={listRef} id={listboxId} tabIndex={-1} role="listbox" onKeyDown={handleKeyDown} className="p-2 overflow-y-auto flex-grow space-y-1"
              aria-labelledby={`${baseId}-label`}
              aria-activedescendant={highlightedIndex >= 0 && filteredPokemon.length > 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].name) : undefined}
            >
              {renderListItems()}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonSelect