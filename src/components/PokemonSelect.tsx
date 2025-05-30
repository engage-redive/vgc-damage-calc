import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Pokemon } from '../types'; // Make sure Pokemon type might include nameEn: string;
import { ChevronDown, Search, X } from 'lucide-react';

// Helper function to convert Katakana to Hiragana
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

  // Refs for different UI parts
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pcDropdownRef = useRef<HTMLDivElement>(null); // Ref for PC dropdown
  const mobileViewRef = useRef<HTMLDivElement>(null); // Ref for Mobile fullscreen view
  const listRef = useRef<HTMLUListElement>(null); // Shared list ref
  const searchInputRef = useRef<HTMLInputElement>(null); // Shared search input ref

  const baseId = useMemo(() => `${idPrefix}-${label.toLowerCase().replace(/\s+/g, '-')}`, [idPrefix, label]);
  const buttonId = `${baseId}-button`;
  const listboxId = `${baseId}-listbox`;
  const searchId = `${baseId}-search`; // Common ID for search input, context will differentiate
  const getOptionId = useCallback((pokemonId: string | number) => `${baseId}-option-${pokemonId}`, [baseId]);
  
  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemon;
    const termLower = searchTerm.toLowerCase();
    const termHiragana = toHiragana(termLower);
    return pokemon.filter(p => {
      const nameLower = p.name.toLowerCase();
      const nameHiragana = toHiragana(p.name);
      const nameEnLower = (p as any).nameEn?.toLowerCase() || '';
      return nameLower.includes(termLower) || 
             (nameEnLower && nameEnLower.includes(termLower)) || 
             nameHiragana.includes(termHiragana);
    });
  }, [pokemon, searchTerm]);

  // Handle clicks outside for PC dropdown
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      // Only apply to PC dropdown. Mobile fullscreen is handled by its own close button.
      if (pcDropdownRef.current && !pcDropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        // Check if the window width indicates PC view (Tailwind's sm breakpoint is usually 640px)
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

  // Focus search input and set highlighted index when dropdown/modal opens
  useEffect(() => {
    if (isOpen) {
      // setTimeout is a common trick to ensure focus works after DOM updates & virtual keyboard appears
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50); 
      
      if (selected) {
        const selectedIndex = filteredPokemon.findIndex(p => p.id === selected.id);
        setHighlightedIndex(selectedIndex !== -1 ? selectedIndex : (filteredPokemon.length > 0 ? 0 : -1));
      } else {
        setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
      }
    } else {
      setHighlightedIndex(-1);
      // setSearchTerm(''); // Optionally clear search term on close
    }
  }, [isOpen, selected, filteredPokemon]);
  
  // Reset highlighted index when search term changes while open
  useEffect(() => {
    if (isOpen) {
        setHighlightedIndex(filteredPokemon.length > 0 ? 0 : -1);
    }
  }, [searchTerm, isOpen, filteredPokemon]);

  // Scroll to highlighted item
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
    setSearchTerm('');
    buttonRef.current?.focus();
  };

  // Keyboard navigation for the main button and list (when list itself is focused)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // This handler is primarily for when the button or the list (if focusable) has focus.
    // Search input has its own specific keydown handler.
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
          // On PC, Tab should cycle within the dropdown or close it.
          // For mobile, this behavior might need adjustment if it's a full-screen modal.
          // For now, let it close.
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  // Keyboard navigation specifically for the search input field
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
          listRef.current?.focus(); // Transfer focus to list for further arrow key nav within list items
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (filteredPokemon.length > 0) {
          setHighlightedIndex(prev => (prev - 1 + filteredPokemon.length) % filteredPokemon.length);
          listRef.current?.focus(); // Transfer focus to list
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
          id={getOptionId(p.id)}
          className={`cursor-pointer select-none relative rounded-md transition-colors 
            py-3 sm:py-2 pl-4 sm:pl-3 pr-9  // Adjusted padding for touch / mouse
            ${highlightedIndex === index ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white'}`}
          role="option"
          aria-selected={selected?.id === p.id || highlightedIndex === index}
          onClick={() => handleSelectPokemon(p)}
          onMouseEnter={() => setHighlightedIndex(index)} // Primarily for PC
        >
          <div className="flex items-center">
            <span className={`font-medium block truncate ${selected?.id === p.id ? 'font-semibold' : 'font-normal'}`}>
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
          <>
            {/* Mobile: Fullscreen Search Interface (sm:hidden) */}
            <div
              ref={mobileViewRef}
              className={`
                fixed inset-0 z-50 flex flex-col bg-gray-900  /* Higher z-index, darker bg */
                sm:hidden 
              `}
            >
              {/* Mobile Header */}
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
                <div className="w-8"></div> {/* Spacer to balance the close button, adjust size as needed */}
              </div>

              {/* Mobile Search Input Area (fixed at the top under header) */}
              <div className="p-3 border-b border-gray-700 bg-gray-800">
                {renderSearchInput()}
              </div>

              {/* Mobile Scrollable List Area */}
              <ul
                ref={listRef}
                id={listboxId} // ID for aria-controls
                tabIndex={-1} // Make list focusable for keyboard nav from search input
                role="listbox"
                aria-labelledby={`${baseId}-label`} // Main label for the listbox
                aria-activedescendant={highlightedIndex >= 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].id) : undefined}
                onKeyDown={handleKeyDown} // Allow list itself to handle some keys if focused
                className="flex-grow overflow-y-auto p-2 space-y-1" // space-y for item spacing
              >
                {renderListItems()}
              </ul>
            </div>

            {/* PC: Dropdown Interface (hidden sm:flex) */}
            <div
              ref={pcDropdownRef}
              className={`
                absolute z-40 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md ring-1 ring-black ring-opacity-5 flex flex-col
                hidden sm:flex 
                overflow-hidden 
              `}
            >
              {/* PC Search Input Area (sticky within dropdown) */}
              <div className="sticky top-0 z-10 bg-gray-800 p-2 border-b border-gray-700">
                {renderSearchInput()}
              </div>
              {/* PC Scrollable List Area */}
              <ul
                ref={listRef} // Note: This ref is re-assigned. React handles this by detaching/attaching.
                id={listboxId} // ID for aria-controls
                tabIndex={-1}
                role="listbox"
                aria-labelledby={`${baseId}-label`}
                aria-activedescendant={highlightedIndex >= 0 && filteredPokemon[highlightedIndex] ? getOptionId(filteredPokemon[highlightedIndex].id) : undefined}
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