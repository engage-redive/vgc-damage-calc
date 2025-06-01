import React from 'react';
import { Weather, Field, DisasterState } from '../types';
import { Cloud, Sun, CloudRain, Wind, Snowflake, Zap, Flower2, Brain, Cloud as Cloud2 } from 'lucide-react';

interface WeatherFieldProps {
  weather: Weather;
  field: Field;
  onWeatherChange: (weather: Weather) => void;
  onFieldChange: (field: Field) => void;
  disasters?: DisasterState;
  onDisasterChange?: (disasters: DisasterState) => void;
}

const WeatherField: React.FC<WeatherFieldProps> = ({
  weather,
  field,
  onWeatherChange,
  onFieldChange,
  disasters = { sword: false, ball: false, vessel: false, talisman: false },
  onDisasterChange = () => {},
}) => {
  const weathers: { value: Weather; label: string; icon: React.ReactNode }[] = [
    { value: 'none', label: 'なし', icon: <Cloud className="w-4 h-4" /> },
    { value: 'sun', label: 'はれ', icon: <Sun className="w-4 h-4" /> },
    { value: 'rain', label: 'あめ', icon: <CloudRain className="w-4 h-4" /> },
    { value: 'sandstorm', label: 'すな', icon: <Wind className="w-4 h-4" /> },
    { value: 'snow', label: 'ゆき', icon: <Snowflake className="w-4 h-4" /> }
  ];

  const fields: { value: Field; label: string; icon: React.ReactNode }[] = [
    { value: 'none', label: 'なし', icon: <Cloud2 className="w-4 h-4" /> },
    { value: 'electric', label: 'エレキ', icon: <Zap className="w-4 h-4" /> },
    { value: 'grassy', label: 'グラス', icon: <Flower2 className="w-4 h-4" /> },
    { value: 'psychic', label: 'サイコ', icon: <Brain className="w-4 h-4" /> },
    { value: 'misty', label: 'ミスト', icon: <Cloud className="w-4 h-4" /> }
  ];

  // 画像パスを修正
  const disasterButtons: { key: keyof DisasterState; label: string; icon: string }[] = [
    { key: 'sword', label: '剣：防御▼', icon: '/icon/1002.png' },
    { key: 'ball', label: '玉：特防▼', icon: '/icon/1004.png' },
    { key: 'talisman', label: '札：攻撃▼', icon: '/icon/1001.png' },
    { key: 'vessel', label: '器：特攻▼', icon: '/icon/1003.png' },
  ];

  const handleDisasterToggle = (key: keyof DisasterState) => {
    onDisasterChange({
      ...disasters,
      [key]: !disasters[key]
    });
  };

  return (
    <div className="bg-gray-900 p-1 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-3">天候</h3>
          <div className="flex flex-wrap gap-2">
            {weathers.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => onWeatherChange(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  weather === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-medium mb-3">フィールド</h3>
          <div className="flex flex-wrap gap-2">
            {fields.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => onFieldChange(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  field === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white font-medium mb-3">災い</h3>
        <div className="flex flex-wrap gap-2">
          {disasterButtons.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => handleDisasterToggle(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                disasters[key]
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <img src={icon} alt={label} className="w-4 h-4"  />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherField;