import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface StatSliderProps {
  label: string;
  value: number; // 現在の努力値 (0, 4, 12, ..., 252 のいずれか)
  max: number;   // スライダーの最大値 (通常は252)
  onChange: (value: number) => void;
  realValue?: number;
  effortValue?: number; // このPropsは元のコードにありましたが、スライダーの主要な機能とは直接関連しないため、ここでは特に変更していません。
}

const StatSlider: React.FC<StatSliderProps> = ({
  label,
  value,
  max, // ポケモンの努力値の場合、このmaxは252を想定
  onChange,
  realValue,
  effortValue
}) => {
  // スライダーの値を最も近い有効な努力値に丸める関数
  // 有効な値: 0, 4, 12, 20, 28, ..., 252
  const getValidEV = (ev: number): number => {
    const clampedEv = Math.max(0, Math.min(ev, 252)); // まずは0-252の範囲に収める

    if (clampedEv <= 2) return 0; // 0, 1, 2 は 0 に丸める (0と4の中間は2)
    // 248以上は252に丸める (244と252の中間は248)
    // (252 - 8 = 244。 (244+252)/2 = 248)
    if (clampedEv >= 248) return 252;


    // 3 から 247 の間の値を処理
    // 有効な値のシーケンスは 4, 12, 20, ... (つまり 4 + 8n)
    const evAdjusted = clampedEv - 4; // 基準を4に合わせるため調整
    const step = 8;
    // 最も近い8の倍数を探す
    const numSteps = Math.round(evAdjusted / step);
    let result = 4 + numSteps * step;

    // 結果が有効な範囲内にあることを保証
    // (このロジックでは通常発生しないはずだが念のため)
    if (result < 4) result = 4;
    if (result > 252) result = 252;

    return result;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(getValidEV(newValue));
  };

  const handleIncrement = () => {
    if (value >= max) return; // max は通常252

    let nextValue: number;
    if (value === 0) {
      nextValue = 4;
    } else {
      // 現在の値が 4, 12, 20, ... のいずれかなので、次は8を加える
      nextValue = value + 8;
    }
    onChange(Math.min(nextValue, max)); // maxを超えないように
  };

  const handleDecrement = () => {
    if (value <= 0) return;

    let prevValue: number;
    if (value === 4) {
      prevValue = 0;
    } else {
      // 現在の値が 12, 20, ... のいずれかなので、次は8を引く
      // (valueが0や4でないことは上でチェック済み)
      prevValue = value - 8;
    }
    onChange(Math.max(prevValue, 0)); // 0未満にならないように
  };

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
            max={max} // スライダーのUI上の最大値 (努力値では252)
            value={value} // 現在の努力値
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:hover:bg-blue-400 [&::-webkit-slider-thumb]:transition-colors"
            aria-label={`${label} slider`}
          />
          {/* スライダーのトラックの wypełniona część */}
          <div 
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full pointer-events-none"
            style={{ width: `${(value / max) * 100}%` }}
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