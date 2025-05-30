import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Pokemon } from '../types'; // Make sure Pokemon type might include nameEn: string;
import { ChevronDown, Search } from 'lucide-react';

// Helper function to convert Katakana to Hiragana
// This function should ideally be in a utils file if used elsewhere.
const toHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => { // Matches Katakana characters (ァ-ヶ)
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  });
};

interface PokemonSelectProps {
  pokemon?: Pokemon[]; // Made optional with default []
  selected: Pokemon | null;
  onChange: (pokemon: Pokemon) => void; // Note: Does not allow null, consider if "No Pokemon" is an option
  label: string;
  idPrefix?: string; // Optional prefix for generating unique IDs
}

/**
 * Represents a Pokemon.
 * This is an example structure, ensure your actual `Pokemon` type in `../types.ts`
 * includes `nameEn` for optimal Romaji search.
 *
 * interface Pokemon {
 *   id: string | number;
 *   name: string;       // Japanese name (e.g., "フシギダネ")
 *   nameEn?: string;     // English/Romaji name (e.g., "bulbasaur") - IMPORTANT for Romaji search
 *   types: string[];
 *   // ...other properties
 * }
 */

const PokemonSelect: React.FC<PokemonSelectProps> = ({
  pokemon = [], // Default to empty array if undefined
  selected,
  onChange,
  label,
  idPrefix = 'pokemon-select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const baseId = useMemo(() => `${idPrefix}-${label.toLowerCase().replace(/\s+/g, '-')}`, [idPrefix, label]);
  const buttonId = `${baseId}-button`;
  const listboxId = `${baseId}-listbox`;
  const searchId = `${baseId}-search`;
  const getOptionId = useCallback((pokemonId: string | number) => `${baseId}-option-${pokemonId}`, [baseId]);
  
  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemon;

    const termLower = searchTerm.toLowerCase();
    const termHiragana = toHiragana(termLower); // Convert search term to Hiragana for comparison

    return pokemon.filter(p => {
      const nameLower = p.name.toLowerCase();
      const nameHiragana = toHiragana(p.name); // Convert Pokemon's Japanese name to Hiragana

      // Assuming Pokemon type might have an 'nameEn' field for English/Romaji name
      // e.g., interface Pokemon { ... nameEn?: string; ... } in your types.ts
      const nameEnLower = (p as any).nameEn?.toLowerCase() || '';

      // 1. Match with Japanese name (original search term)
      if (nameLower.includes(termLower)) {
        return true;
      }

      // 2. Match with Romaji/English name (original search term)
      // This requires 'nameEn' property in your Pokemon data for "bado" -> "バドレックス"
      if (nameEnLower && nameEnLower.includes(termLower)) {
        return true;
      }

      // 3. Match with Hiragana version of Japanese name (using Hiragana search term)
      // This helps with "ばど" -> "バドレックス"
      if (nameHiragana.includes(termHiragana)) {
        return true;
      }
      
      return false;
    });
  }, [pokemon, searchTerm]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
      
      if (selected) {
        const selectedIndex = filteredPokemon.findIndex(p => p.id === selected.id);
        setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : (filteredPokemon.length > 0 ? 0 : -1));
      } else {
        setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
      }
    } else {
      setHighlightedIndex(-1);
      // setSearchTerm(''); // Keep search term on close or clear it based on preference
    }
  }, [isOpen, selected, filteredPokemon]);

  useEffect(() => {
    if (isOpen) {
        setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
    }
  }, [searchTerm, isOpen, filteredPokemon]);


  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current && filteredPokemon[highlightedIndex]) {
      const optionId = getOptionId(filteredPokemon[highlightedIndex].id);
      const listItem = listRef.current.querySelector(`#${CSS.escape(optionId)}`) as HTMLLIElement | undefined;
      listItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, highlightedIndex, filteredPokemon, getOptionId]);

  const handleSelectPokemon = (p: Pokemon) => {
    onChange(p);
    setIsOpen(false);
    setSearchTerm(''); // Clear search on select
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ': // Space key
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
        if (isOpen) setIsOpen(false); // Close dropdown on Tab
        break;
      default:
        // Type-ahead: if a character key is pressed and dropdown is closed, open it
        // and potentially set search term.
        if (!isOpen && event.key.length === 1 && event.key.match(/^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF]$/)) { // Alphanumeric, Hiragana, Katakana
            // setIsOpen(true); // Handled by search input focus
            // setSearchTerm(prev => prev + event.key); // This might be too aggressive, focusing search is better
        }
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


  return (
    <div className="w-full">
      <label id={`${baseId}-label`} className="block text-sm font-medium text-white mb-1">
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
          aria-activedescendant={isOpen && highlightedIndex >= 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].id) : undefined}
        >
          <span className="block truncate">
            {selected ? selected.name : 'Select Pokémon'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <div 
            className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md overflow-hidden focus:outline-none ring-1 ring-black ring-opacity-5 flex flex-col"
          >
            <div className="sticky top-0 z-10 bg-gray-800 p-2 border-b border-gray-700">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  ref={searchInputRef}
                  id={searchId}
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-700 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchInputKeyDown}
                  aria-label="Search Pokémon"
                  aria-controls={listboxId}
                  aria-autocomplete="list" // Added for better a11y
                />
              </div>
            </div>

            <ul
              ref={listRef}
              id={listboxId}
              tabIndex={-1} 
              role="listbox"
              aria-labelledby={`${baseId}-label`}
              aria-activedescendant={highlightedIndex >= 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].id) : undefined}
              onKeyDown={handleKeyDown} 
              className="p-2 overflow-y-auto flex-grow"
            >
              {filteredPokemon.length > 0 ? filteredPokemon.map((p, index) => (
                <li
                  key={p.id}
                  id={getOptionId(p.id)}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 rounded-md transition-colors ${
                    highlightedIndex === index ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'
                  }`}
                  role="option"
                  aria-selected={selected?.id === p.id || highlightedIndex === index} // Update aria-selected for highlighted too
                  onClick={() => handleSelectPokemon(p)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center">
                    <span className={`font-medium block truncate ${ // Use text-white from parent or explicitly
                        selected?.id === p.id ? 'font-semibold' : 'font-normal'
                    }`}>
                      {p.name}
                    </span>
                    {/* Assuming Pokemon type has 'types' array like in MoveSelect example */}
                    {(p as any).types && Array.isArray((p as any).types) && (
                      <span className="ml-2 flex-shrink-0 flex">
                        {(p as any).types.map((type: string) => (
                          <span
                            key={type}
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${type.toLowerCase()} text-white mr-1`} // Ensure bg-${type} classes are defined
                          >
                            {type}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </li>
              )) : (
                <li className="text-center py-4 text-gray-400 px-3"> {/* Added px-3 for padding */}
                  No Pokémon found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonSelect;