import React from 'react';
import { NatureModifier } from '../types';

interface NatureSelectorProps {
  selected: NatureModifier;
  onChange: (nature: NatureModifier) => void;
}

const NatureSelector: React.FC<NatureSelectorProps> = ({ selected, onChange }) => {
  const natures: { value: NatureModifier; label: string }[] = [
    { value: 0.9, label: 'x0.9' },
    { value: 1.0, label: 'x1.0' },
    { value: 1.1, label: 'x1.1' },
  ];

  return (
    <div className="flex space-x-2 my-2">
      {natures.map((nature) => (
        <button
          key={nature.value}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            selected === nature.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onChange(nature.value)}
        >
          {nature.label}
        </button>
      ))}
    </div>
  );
};

export default NatureSelector;