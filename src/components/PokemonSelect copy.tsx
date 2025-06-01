import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Pokemon } from '../types';
import { ChevronDown, Search, X } from 'lucide-react';

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
  const pcDropdownRef = useRef<HTMLDivElement>(null);
  const mobileViewRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const baseId = useMemo(() => `${idPrefix}-${label.toLowerCase().replace(/\s+/g, '-')}`, [idPrefix, label]);
  const buttonId = `${baseId}-button`;
  const listboxId = `${baseId}-listbox`;
  const searchId = `${baseId}-search`;

  // ------------------- ▼▼▼ 変更箇所 1 ▼▼▼ -------------------
  // getOptionId: ポケモンの名前を元にユニークなIDを生成
  //名前に含まれる可能性のある空白や括弧をDOM IDに適した形に変換
  const getOptionId = useCallback((pokemonName: string) => {
    const sanitizedName = pokemonName
      .toLowerCase()
      .replace(/\s+/g, '-') // 空白をハイフンに
      .replace(/[()（）]/g, '') // 括弧を除去
      .replace(/[^a-z0-9ぁ-んァ-ンー\-]/gi, ''); // 英数字、ひらがな、カタカナ、ハイフン以外を除去 (より安全に)
    return `${baseId}-option-${sanitizedName}`;
  }, [baseId]);
  // ------------------- ▲▲▲ 変更箇所 1 ▲▲▲ -------------------
  
  // ------------------- ▼▼▼ 変更箇所 2 ▼▼▼ -------------------
  // uniquePokemonList: 重複排除の基準を p.id から p.name に変更
  const uniquePokemonList = useMemo(() => {
    if (!pokemon || pokemon.length === 0) return [];
    const seenNames = new Set<string>(); // id ではなく name で管理
    const result: Pokemon[] = [];
    for (const p of pokemon) {
      // p.name が存在し、かつまだ seenNames にない場合のみ追加
      if (p && typeof p.name !== 'undefined' && !seenNames.has(p.name)) {
        seenNames.add(p.name);
        result.push(p);
      }
    }
    return result;
  }, [pokemon]);
  // ------------------- ▲▲▲ 変更箇所 2 ▲▲▲ -------------------
  
  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return uniquePokemonList;

    const termLower = searchTerm.toLowerCase();
    const termAsHiragana = toHiragana(searchTerm);

    return uniquePokemonList.filter(p => {
      const nameLower = p.name.toLowerCase();
      const nameHiragana = toHiragana(p.name);
      const nameEnLower = (p as any).nameEn?.toLowerCase() || '';
      
      if ((p as any).nameEn) {
        if (nameEnLower.includes(termLower)) {
          return true;
        }
      }
      if (nameHiragana.startsWith(termAsHiragana)) {
        return true;
      }
      return false;
    });
  }, [uniquePokemonList, searchTerm]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (pcDropdownRef.current && !pcDropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        if (window.innerWidth >= 640) { 
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50); 
      
      if (selected) {
        // ------------------- ▼▼▼ 変更箇所 3 (findIndexの比較対象) ▼▼▼ -------------------
        const selectedIndex = filteredPokemon.findIndex(p => p.name === selected.name); // id から name に変更
        // ------------------- ▲▲▲ 変更箇所 3 ▲▲▲ -------------------
        setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : (filteredPokemon.length > 0 ? 0 : -1));
      } else {
        setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
      }
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen, selected, filteredPokemon]);
  
  useEffect(() => {
    if (isOpen) {
        setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
    }
  }, [searchTerm, isOpen, filteredPokemon]);

  useEffect(() => {
    // ------------------- ▼▼▼ 変更箇所 4 (getOptionId の引数) ▼▼▼ -------------------
    if (isOpen && highlightedIndex >= 0 && listRef.current && filteredPokemon.length > 0 && filteredPokemon[highlightedIndex]) {
      const optionId = getOptionId(filteredPokemon[highlightedIndex].name); // .id から .name に変更
      // ------------------- ▲▲▲ 変更箇所 4 ▲▲▲ -------------------
      const listItem = listRef.current.querySelector(`#${CSS.escape(optionId)}`) as HTMLLIElement | undefined;
      listItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex, filteredPokemon, getOptionId]);

  const handleSelectPokemon = (p: Pokemon) => {
    onChange(p);
    setIsOpen(false);
    setSearchTerm('');
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          if (highlightedIndex >= 0 && highlightedIndex < filteredPokemon.length) {
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
        } else if (filteredPokemon.length > 0) {
          setHighlightedIndex(prev => (prev + 1) % filteredPokemon.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (filteredPokemon.length > 0) {
          setHighlightedIndex(prev => (prev - 1 + filteredPokemon.length) % filteredPokemon.length);
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
         if (isOpen && filteredPokemon.length > 0) {
            event.preventDefault();
            setHighlightedIndex(0);
        }
        break;
      case 'End':
        if (isOpen && filteredPokemon.length > 0) {
            event.preventDefault();
            setHighlightedIndex(filteredPokemon.length - 1);
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
     switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredPokemon.length) {
          handleSelectPokemon(filteredPokemon[highlightedIndex]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (filteredPokemon.length > 0) {
          setHighlightedIndex(prev => (prev + 1) % filteredPokemon.length);
          listRef.current?.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (filteredPokemon.length > 0) {
          setHighlightedIndex(prev => (prev - 1 + filteredPokemon.length) % filteredPokemon.length);
          listRef.current?.focus();
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
        // ------------------- ▼▼▼ 変更箇所 5 (key と id, aria-selected) ▼▼▼ -------------------
        <li
          key={p.name} // key を p.name に変更
          id={getOptionId(p.name)} // id を p.name ベースに
          className={`cursor-pointer select-none relative rounded-md transition-colors 
            py-3 sm:py-2 pl-4 sm:pl-3 pr-9
            ${highlightedIndex === index ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}`}
          role="option"
          aria-selected={(selected?.name === p.name) || highlightedIndex === index} // selected の比較も name ベースに
          onClick={() => handleSelectPokemon(p)}
          onMouseEnter={() => setHighlightedIndex(index)}
        >
        {/* ------------------- ▲▲▲ 変更箇所 5 ▲▲▲ ------------------- */}
          <div className="flex items-center">
            <span className={`font-medium block truncate ${(selected?.name === p.name) ? 'font-semibold' : 'font-normal'}`}> {/* selected の比較も name ベースに */}
              {p.name}
            </span>
            {(p as any).types && Array.isArray((p as any).types) && (
              <span className="ml-2 flex-shrink-0 flex">
                {(p as any).types.map((type: string) => (
                  <span
                    key={type}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${type.toLowerCase()} text-white mr-1`}
                  >
                    {type}
                  </span>
                ))}
              </span>
            )}
          </div>
        </li>
      )) : (
        <li className="text-center py-4 text-gray-400 px-3">
          No Pokémon found
        </li>
      )}
    </>
  );

  const renderSearchInput = () => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
      </div>
      <input
        ref={searchInputRef}
        id={searchId}
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-700 bg-gray-700 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchInputKeyDown}
        aria-label="Search Pokémon"
        aria-controls={listboxId}
        aria-autocomplete="list"
      />
    </div>
  );

  return (
    <div className="w-full">
      <label id={`${baseId}-label`} className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <div className="relative">
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
          // ------------------- ▼▼▼ 変更箇所 6 (aria-activedescendant の引数) ▼▼▼ -------------------
          aria-activedescendant={isOpen && highlightedIndex >= 0 && filteredPokemon.length > 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].name) : undefined}
          // ------------------- ▲▲▲ 変更箇所 6 ▲▲▲ -------------------
        >
          <span className="block truncate">
            {selected ? selected.name : 'Select Pokémon'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <>
            {/* Mobile: Fullscreen Search Interface */}
            <div
              ref={mobileViewRef}
              className="fixed inset-0 z-50 flex flex-col bg-gray-900 sm:hidden"
            >
              <div className="flex justify-between items-center p-3 border-b border-gray-700 bg-gray-800 shadow-md">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
                <h2 className="text-lg font-semibold text-white">{label}</h2>
                <div className="w-8"></div>
              </div>
              <div className="p-3 border-b border-gray-700 bg-gray-800">
                {renderSearchInput()}
              </div>
              <ul
                ref={listRef}
                id={listboxId}
                tabIndex={-1}
                role="listbox"
                aria-labelledby={`${baseId}-label`}
                // ------------------- ▼▼▼ 変更箇所 7 (aria-activedescendant の引数) ▼▼▼ -------------------
                aria-activedescendant={highlightedIndex >= 0 && filteredPokemon.length > 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].name) : undefined}
                // ------------------- ▲▲▲ 変更箇所 7 ▲▲▲ -------------------
                onKeyDown={handleKeyDown}
                className="flex-grow overflow-y-auto p-2 space-y-1"
              >
                {renderListItems()}
              </ul>
            </div>

            {/* PC: Dropdown Interface */}
            <div
              ref={pcDropdownRef}
              className="absolute z-40 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md ring-1 ring-black ring-opacity-5 flex-col hidden sm:flex overflow-hidden"
            >
              <div className="sticky top-0 z-10 bg-gray-800 p-2 border-b border-gray-700">
                {renderSearchInput()}
              </div>
              <ul
                ref={listRef} 
                id={listboxId}
                tabIndex={-1}
                role="listbox"
                aria-labelledby={`${baseId}-label`}
                // ------------------- ▼▼▼ 変更箇所 8 (aria-activedescendant の引数) ▼▼▼ -------------------
                aria-activedescendant={highlightedIndex >= 0 && filteredPokemon.length > 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].name) : undefined}
                // ------------------- ▲▲▲ 変更箇所 8 ▲▲▲ -------------------
                onKeyDown={handleKeyDown}
                className="p-2 overflow-y-auto flex-grow space-y-1"
              >
                {renderListItems()}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonSelect;