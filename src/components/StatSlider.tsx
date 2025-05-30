import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface StatSliderProps {
  label: string;
  value: number; // 現在の確定された努力値 (0, 4, 12, ..., 252 のいずれか)
  max: number;   // スライダーの最大値 (通常は252)
  onChange: (value: number) => void;
  realValue?: number;
  effortValue?: number;
  className?: string; // TeamMemberEditorから渡されるクラス名を受け取るため追加
}

const StatSlider: React.FC<StatSliderProps> = ({
  label,
  value, // 親から渡される確定値
  max,
  onChange,
  realValue,
  effortValue,
  className, // propsから受け取る
}) => {
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const getValidEV = (ev: number): number => {
    const clampedEv = Math.max(0, Math.min(ev, 252));
    if (clampedEv <= 2) return 0;
    if (clampedEv >= 248) return 252;

    const evAdjusted = clampedEv - 4;
    const step = 8;
    const numSteps = Math.round(evAdjusted / step);
    let result = 4 + numSteps * step;

    if (result < 4) result = 4;
    if (result > 252) result = 252;
    return result;
  };

  const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseInt(e.target.value, 10);
    setDisplayValue(rawValue);
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseInt(e.target.value, 10);
    const validEv = getValidEV(rawValue);
    onChange(validEv);
  };

  const handleIncrement = () => {
    if (value >= max) return;
    let nextValue: number;
    if (value === 0) {
      nextValue = 4;
    } else {
      nextValue = value + 8;
    }
    const validatedNextValue = Math.min(nextValue, max);
    onChange(validatedNextValue);
  };

  const handleDecrement = () => {
    if (value <= 0) return;
    let prevValue: number;
    if (value === 4) {
      prevValue = 0;
    } else {
      prevValue = value - 8;
    }
    const validatedPrevValue = Math.max(prevValue, 0);
    onChange(validatedPrevValue);
  };

  const progressPercent = max > 0 ? (displayValue / max) * 100 : 0;

  // 親から渡された className をルートの div に適用
  return (
    <div className={`w-full mb-4 ${className || ''}`}> {/* ★ 修正: className を適用 */}
      <div className="flex justify-between items-center mb-1">
        <div className="text-white font-medium text-sm">{label}</div>
        {/* ★ 修正: realValue を表示する div に 'stat-slider__real-value-display' クラスを追加 */}
        {realValue !== undefined && (
          <div className="text-white font-bold stat-slider__real-value-display">{realValue}</div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="p-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          aria-label={`Decrement ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max={max}
            value={displayValue}
            onInput={handleSliderInput}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:hover:bg-blue-400 [&::-webkit-slider-thumb]:transition-colors"
            aria-label={`${label} slider`}
          />
          <div 
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full pointer-events-none transition-[width] duration-100 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <button
          onClick={handleIncrement}
          className="p-1 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          aria-label={`Increment ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>0</span>
        {effortValue !== undefined && <span className="text-white font-bold">{effortValue}</span>}
        <span>{max}</span>
      </div>
    </div>
  );
};

export default StatSlider;