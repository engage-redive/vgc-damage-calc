import React, { useState, useRef, useEffect } from 'react';
import { Pokemon } from '../types';
import { ChevronDown, Search } from 'lucide-react';

interface PokemonSelectProps {
  pokemon: Pokemon[];
  selected: Pokemon | null;
  onChange: (pokemon: Pokemon) => void;
  label: string;
}

const PokemonSelect: React.FC<PokemonSelectProps> = ({ 
  pokemon, 
  selected, 
  onChange, 
  label 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const filteredPokemon = searchTerm
    ? pokemon.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : pokemon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="relative w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">
            {selected ? selected.name : 'Select Pokémon'}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-80 rounded-md overflow-auto focus:outline-none">
            <div className="sticky top-0 z-10 bg-gray-800 p-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-700 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <ul className="p-2">
              {filteredPokemon.map((p) => (
                <li
                  key={p.id}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 rounded-md hover:bg-gray-700 transition-colors"
                  onClick={() => {
                    onChange(p);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <div className="flex items-center">
                    <span className="text-white font-medium block truncate">
                      {p.name}
                    </span>
                    <span className="ml-2 flex-shrink-0 flex">
                      {p.types.map((type) => (
                        <span
                          key={type}
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-${type} text-white mr-1`}
                        >
                          {type}
                        </span>
                      ))}
                    </span>
                  </div>
                </li>
              ))}
              {filteredPokemon.length === 0 && (
                <li className="text-center py-4 text-gray-400">
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