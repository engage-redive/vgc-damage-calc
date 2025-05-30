import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface StatSliderProps {
  label: string;
  value: number; // 現在の確定された努力値 (0, 4, 12, ..., 252 のいずれか)
  max: number;   // スライダーの最大値 (通常は252)
  onChange: (value: number) => void;
  realValue?: number;
  effortValue?: number;
}

const StatSlider: React.FC<StatSliderProps> = ({
  label,
  value, // 親から渡される確定値
  max,
  onChange,
  realValue,
  effortValue
}) => {
  // UI表示用のスライダー値。ドラッグ中は連続的に変化し、
  // props.valueが更新されるとそれに追従する。
  const [displayValue, setDisplayValue] = useState<number>(value);

  // props.value (確定値) が外部（例：親コンポーネントやボタン操作による変更）
  // から変更された場合に、UI表示用の値も同期する。
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  // スライダーの値を最も近い有効な努力値に丸める関数 (変更なし)
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

  // スライダーをドラッグしている途中の処理 (onInput)
  // スライダーの値が変更されるたびにリアルタイムで発火
  const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseInt(e.target.value, 10);
    setDisplayValue(rawValue); // UI上のつまみとバーを滑らかに動かすため、生の値を表示用stateにセット
  };
  
  // スライダーの値が確定したときの処理 (onChange)
  // 通常、マウスのドラッグ操作が完了し、ボタンを離したときに発火
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseInt(e.target.value, 10);
    const validEv = getValidEV(rawValue);
    onChange(validEv); // 丸めた値を親コンポーネントに通知
    // 親コンポーネントで value が更新されると、上記の useEffect により displayValue も更新される
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
    onChange(validatedNextValue); // 親に通知 -> props.value更新 -> useEffectでdisplayValueも更新
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
    onChange(validatedPrevValue); // 親に通知 -> props.value更新 -> useEffectでdisplayValueも更新
  };

  // 進捗バーのパーセンテージを計算 (displayValue に基づく)
  const progressPercent = max > 0 ? (displayValue / max) * 100 : 0;

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="text-white font-medium text-sm">{label}</div>
        {realValue !== undefined && <div className="text-white font-bold">{realValue}</div>}
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
            value={displayValue} // ドラッグ中は生の値を表示し、滑らかな動きを実現
            onInput={handleSliderInput}   // ドラッグ中のリアルタイム更新用
            onChange={handleSliderChange} // ドラッグ終了時の値確定用
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:hover:bg-blue-400 [&::-webkit-slider-thumb]:transition-colors"
            aria-label={`${label} slider`}
          />
          {/* スライダーのトラックの塗りつぶし部分 */}
          <div 
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full pointer-events-none transition-[width] duration-100 ease-out" // 短いトランジションを追加
            style={{ width: `${progressPercent}%` }} // displayValueに基づいて幅を計算
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