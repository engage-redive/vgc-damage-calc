import React, { useState } from 'react';
import {
  DamageCalculation,
  PokemonType,
  Weather,
  Field,
  DisasterState,
  AttackerDetailsForModal,
  DefenderDetailsForModal,
  MoveCategory,
} from '../types';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface DamageResultProps {
  result: DamageCalculation | null;
  defenderHP: number;
  isDoubleBattle: boolean;
  onDoubleBattleChange?: (isDouble: boolean) => void;
  combinedResult?: {
    minDamage: number;
    maxDamage: number;
    minPercentage: number;
    maxPercentage: number;
  };
  attackerPokemonName?: string;
  attackerMoveName?: string;
  attackerMoveNameForDisplay?: string;
  defenderPokemonName?: string;
  hitCount?: number;
  attackerDetails?: AttackerDetailsForModal;
  defenderDetails?: DefenderDetailsForModal | null;
  weather?: Weather | null;
  field?: Field | null;
  disasters?: DisasterState;
  resultIdSuffix: string;
  onSaveLog?: () => void;
  // --- App.tsx から渡される新しい props ---
  showIndividualAttackResults: boolean;
  onToggleShowIndividualAttackResults: () => void;
  // --- ここまで ---
}

const TYPE_NAME_JP_MODAL: Record<string, string> = {
  normal: 'ノーマル', fire: 'ほのお', water: 'みず', electric: 'でんき', grass: 'くさ', ice: 'こおり',
  fighting: 'かくとう', poison: 'どく', ground: 'じめん', flying: 'ひこう', psychic: 'エスパー', bug: 'むし',
  rock: 'いわ', ghost: 'ゴースト', dragon: 'ドラゴン', dark: 'あく', steel: 'はがね', fairy: 'フェアリー',
  stellar: 'ステラ',
};

const TYPE_COLORS_MODAL: Record<string, string> = {
  normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C', grass: '#7AC74C', ice: '#96D9D6',
  fighting: '#C22E28', poison: '#A33EA1', ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
  rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746', steel: '#B7B7CE', fairy: '#D685AD',
  stellar: '#7A7AE6',
};

const WEATHER_NAME_JP: Record<string, string> = {
  'none': 'なし',
  'sun': 'はれ',
  'rain': 'あめ',
  'sandstorm': 'すなあらし',
  'snow': 'ゆき',
  'harsh_sunlight': 'おおひでり',
  'heavy_rain': 'おおあめ',
};

const FIELD_NAME_JP: Record<string, string> = {
  'none': 'なし',
  'electric': 'エレキフィールド',
  'grassy': 'グラスフィールド',
  'psychic': 'サイコフィールド',
  'misty': 'ミストフィールド',
};


const getTypeNameJpFromModal = (type: PokemonType | 'stellar' | null | undefined): string => {
  if (!type) return '';
  const typeKey = type.toLowerCase() as keyof typeof TYPE_NAME_JP_MODAL;
  return TYPE_NAME_JP_MODAL[typeKey] || typeKey.toString();
};

const getTypeColorFromModal = (type: PokemonType | 'stellar' | null | undefined): string => {
  if (!type) return '#777777';
  const typeKey = type.toLowerCase() as keyof typeof TYPE_COLORS_MODAL;
  return TYPE_COLORS_MODAL[typeKey] || '#777777';
};


const getHpBarColorByRemainingHp = (remainingPercentage: number) => {
  if (remainingPercentage <= 25) return 'bg-red-500';
  if (remainingPercentage <= 50) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getHpRangeBarColorByRemainingHp = (remainingPercentage: number) => {
  if (remainingPercentage <= 25) return 'bg-red-700';
  if (remainingPercentage <= 50) return 'bg-yellow-700';
  return 'bg-green-700';
};


const DamageResult: React.FC<DamageResultProps> = ({
  result,
  defenderHP,
  isDoubleBattle,
  onDoubleBattleChange,
  combinedResult,
  attackerPokemonName,
  attackerMoveName,
  attackerMoveNameForDisplay,
  defenderPokemonName,
  hitCount = 1,
  attackerDetails,
  defenderDetails,
  weather,
  field,
  disasters,
  resultIdSuffix,
  onSaveLog,
  showIndividualAttackResults, // 親から受け取る
  onToggleShowIndividualAttackResults, // 親から受け取る
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // isCombinedDetailsExpanded を削除し、親の state (showIndividualAttackResults) を使用
  const [isCriticalModeActive, setIsCriticalModeActive] = useState(false);

  if (!result || !result.normalDamages || !result.criticalDamages) {
    return (
      <div className="p-2 bg-gray-800 rounded-lg text-center text-gray-400">
        計算結果はありません。
      </div>
    );
  }

  const multiHitMinDamage = result.minDamage * hitCount;
  const multiHitMaxDamage = result.maxDamage * hitCount;
  const multiHitMinPercentage = defenderHP > 0 ? Math.max(0, (multiHitMinDamage / defenderHP) * 100) : 0;
  const multiHitMaxPercentage = defenderHP > 0 ? Math.max(0, (multiHitMaxDamage / defenderHP) * 100) : 0;

  const multiHitCritMinDamage = result.critMinDamage * hitCount;
  const multiHitCritMaxDamage = result.critMaxDamage * hitCount;
  const multiHitCritMinPercentage = defenderHP > 0 ? Math.max(0, (multiHitCritMinDamage / defenderHP) * 100) : 0;
  const multiHitCritMaxPercentage = defenderHP > 0 ? Math.max(0, (multiHitCritMaxDamage / defenderHP) * 100) : 0;

  const currentDisplayMinPercentage = isCriticalModeActive ? multiHitCritMinPercentage : multiHitMinPercentage;
  const currentDisplayMaxPercentage = isCriticalModeActive ? multiHitCritMaxPercentage : multiHitMaxPercentage;

  const clampedCurrentDisplayMinPercentage = Math.min(100, currentDisplayMinPercentage);
  const clampedCurrentDisplayMaxPercentage = Math.min(100, currentDisplayMaxPercentage);

  const actualRemainingHPMinPercentage = Math.max(0, 100 - clampedCurrentDisplayMaxPercentage);
  const actualRemainingHPMaxPercentage = Math.max(0, 100 - clampedCurrentDisplayMinPercentage);
  
  // combinedResult が渡された場合、それは最初の攻撃者の結果であり、「合計ダメージ」セクションを表示する
  const shouldDisplayCombinedResultSection = !!combinedResult;


  const getDamageColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 75) return 'text-orange-500';
    if (percentage >= 50) return 'text-yellow-500';
    if (percentage >= 25) return 'text-green-500';
    return 'text-white';
  };

  const getOriginalDamageBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-600';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-green-500';
    return 'bg-white';
  };


  const formatPercentage = (percentage: number): string => {
    return Math.max(0, percentage).toFixed(2);
  };

  const handleDoubleBattleChangeFromInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onDoubleBattleChange) {
      onDoubleBattleChange(event.target.checked);
    }
  };

  const calculateKOChance = (damagesPerUsage: number[], hp: number, usagesToTest: number): number => {
    if (usagesToTest <= 0) return 0;
    if (hp <= 0) return 100;

    const validDamages = damagesPerUsage.filter(d => typeof d === 'number' && !isNaN(d));
    if (validDamages.length === 0) return 0;

    if (usagesToTest === 1) {
      let koCount = 0;
      for (const damage of validDamages) {
        if (damage >= hp) koCount++;
      }
      return (koCount / validDamages.length) * 100;
    }
    
    const uniqueDamages: number[] = [];
    const frequencies: number[] = [];

    for (const damage of validDamages) {
      const index = uniqueDamages.indexOf(damage);
      if (index === -1) {
        uniqueDamages.push(damage);
        frequencies.push(1);
      } else {
        frequencies[index]++;
      }
    }
    const totalFrequency = validDamages.length;

    if (usagesToTest === 2) {
      let koProb = 0;
      for (let i = 0; i < uniqueDamages.length; i++) {
        const damage1 = uniqueDamages[i];
        const prob1 = frequencies[i] / totalFrequency;
        for (let j = 0; j < uniqueDamages.length; j++) {
          const damage2 = uniqueDamages[j];
          const prob2 = frequencies[j] / totalFrequency;
          if (damage1 + damage2 >= hp) {
            koProb += prob1 * prob2;
          }
        }
      }
      return koProb * 100;
    }

    if (usagesToTest === 3) {
      let koProb = 0;
      for (let i = 0; i < uniqueDamages.length; i++) {
        const damage1 = uniqueDamages[i];
        const prob1 = frequencies[i] / totalFrequency;
        for (let j = 0; j < uniqueDamages.length; j++) {
          const damage2 = uniqueDamages[j];
          const prob2 = frequencies[j] / totalFrequency;
          for (let k = 0; k < uniqueDamages.length; k++) {
            const damage3 = uniqueDamages[k];
            const prob3 = frequencies[k] / totalFrequency;
            if (damage1 + damage2 + damage3 >= hp) {
              koProb += prob1 * prob2 * prob3;
            }
          }
        }
      }
      return koProb * 100;
    }
            
    let prevProbs: Map<number, number> = new Map();
    prevProbs.set(0, 1); 

    for (let h = 0; h < usagesToTest; h++) { 
      const currentProbs: Map<number, number> = new Map();
      for (const [prevTotal, prevProb] of prevProbs.entries()) {
        for (let i = 0; i < uniqueDamages.length; i++) { 
          const damage = uniqueDamages[i];
          const freq = frequencies[i] / totalFrequency; 
          const newTotal = prevTotal + damage;
          const currentProbForNewTotal = currentProbs.get(newTotal) || 0;
          currentProbs.set(newTotal, currentProbForNewTotal + prevProb * freq);
        }
      }
      prevProbs = currentProbs;
    }

    let koProb = 0;
    for (const [total, prob] of prevProbs.entries()) {
      if (total >= hp) {
        koProb += prob;
      }
    }
    return Math.min(100, koProb * 100);
  };

  const getKOText = (damagesPerSingleHitDistribution: number[], hp: number, currentHitCount: number, showPercentage: boolean = true): string => {
    if (!damagesPerSingleHitDistribution || damagesPerSingleHitDistribution.length !== 16) {
      return "計算不可";
    }
    if (hp <= 0) return "確定1発";

    const damagesPerUsage = damagesPerSingleHitDistribution.map(d => d * currentHitCount);
    const minDamagePerUsage = Math.min(...damagesPerUsage);
    const maxDamagePerUsage = Math.max(...damagesPerUsage);

    if (maxDamagePerUsage <= 0) {
      return "ダメージなし";
    }
    
    const minUsagesToKO = Math.ceil(hp / maxDamagePerUsage);
    const confirmedUsagesToKO = minDamagePerUsage > 0 ? Math.ceil(hp / minDamagePerUsage) : Infinity;

    if (minUsagesToKO === Infinity && confirmedUsagesToKO === Infinity) {
      return "ダメージなし"; 
    }
    
    if (minUsagesToKO > 10 && confirmedUsagesToKO > 10) {
        if (confirmedUsagesToKO !== Infinity) return `確定${confirmedUsagesToKO}発`;
        return `乱数${minUsagesToKO}発`;
    }

    if (minUsagesToKO === confirmedUsagesToKO) {
      return `確定${minUsagesToKO}発`;
    } else {
      if (!showPercentage) {
        return `乱数${minUsagesToKO}発`;
      }
      const koChance = calculateKOChance(damagesPerUsage, hp, minUsagesToKO);
      if (koChance < 0.01 && koChance > 0) {
        return `乱数${minUsagesToKO}発 (<0.01%)`;
      }
      if (koChance > 99.99 && koChance < 100) {
        return `乱数${minUsagesToKO}発 (>99.99%)`;
      }
      return `乱数${minUsagesToKO}発 (${formatPercentage(koChance)}%)`;
    }
  };

  const getCombinedKORangeText = (
    combinedMinDamage: number,
    combinedMaxDamage: number,
    hp: number
  ): string => {
    if (hp <= 0) return "確定1発";
    if (combinedMaxDamage <= 0) return "ダメージなし";

    const minUsagesToKO = Math.ceil(hp / combinedMaxDamage);
    const confirmedUsagesToKO = combinedMinDamage > 0 ? Math.ceil(hp / combinedMinDamage) : Infinity;

    if (minUsagesToKO === Infinity && confirmedUsagesToKO === Infinity) return "ダメージなし";
    if (minUsagesToKO > 10 && confirmedUsagesToKO > 10) {
        if (confirmedUsagesToKO !== Infinity) return `確定${confirmedUsagesToKO}発`;
        return `乱数${minUsagesToKO}発`;
    }
    if (minUsagesToKO === confirmedUsagesToKO) return `確定${minUsagesToKO}発`;
    return `乱数${minUsagesToKO}発`;
  };

  const disasterMap: { [key in keyof DisasterState]: string } = {
    sword: "わざわいのつるぎ",
    ball: "わざわいのたま",
    vessel: "わざわいのうつわ",
    talisman: "わざわいのおふだ",
  };

  const uniqueDoubleBattleId = `doubleBattle-${resultIdSuffix}`;
  const uniqueCriticalModeId = `criticalMode-${resultIdSuffix}`;

  const handleSaveLog = () => {
    if (onSaveLog) {
      onSaveLog();
    }
  };

  const openModalAndSaveLog = () => {
    setIsModalOpen(true);
    handleSaveLog();
  };

  return (
    <div className="p-1 bg-gray-800 rounded-lg transition-all duration-300">
      {shouldDisplayCombinedResultSection && combinedResult && (
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-white">合計ダメージ</p>
            {/* ボタンは combinedResult がある場合 (最初の攻撃者の結果) にのみ表示 */}
            {/* 親から渡された関数を呼び出す */}
            <button
              onClick={onToggleShowIndividualAttackResults}
              className="text-gray-400 hover:text-white p-1 -m-1"
              aria-label={showIndividualAttackResults ? "個別の攻撃結果を非表示にする" : "個別の攻撃結果を表示する"}
            >
              {showIndividualAttackResults ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          {/* 合計ダメージの詳細は常に表示 (combinedResult があれば) */}
          <>
            <p className="text-white font-medium mb-1 text-sm">
              <span className={getDamageColor(combinedResult.minPercentage)}>
                {combinedResult.minDamage}
              </span>
              {' - '}
              <span className={getDamageColor(combinedResult.maxPercentage)}>
                {combinedResult.maxDamage}
              </span>
              <span className="text-xs text-gray-400 ml-1">
                ({formatPercentage(combinedResult.minPercentage)}% - {formatPercentage(combinedResult.maxPercentage)}%)
              </span>
              <span className="text-xs text-gray-300 ml-1 font-semibold">
                {getCombinedKORangeText(combinedResult.minDamage, combinedResult.maxDamage, defenderHP)}
              </span>
            </p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-1">
              <div className="h-full relative">
                <div
                  className={`absolute h-full ${getOriginalDamageBarColor(combinedResult.minPercentage)}`}
                  style={{ width: `${Math.min(100, combinedResult.minPercentage)}%` }}
                />
                <div
                  className={`absolute h-full ${getOriginalDamageBarColor(combinedResult.maxPercentage)} opacity-50`}
                  style={{
                    width: `${Math.max(0, Math.min(100, combinedResult.maxPercentage) - Math.min(100, combinedResult.minPercentage))}%`,
                    left: `${Math.min(100, combinedResult.minPercentage)}%`
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>{defenderHP}</span>
            </div>
          </>
        </div>
      )}

      {/* 個別の攻撃結果セクションの表示条件を親から渡された prop に変更 */}
      {showIndividualAttackResults && result && (
        <div className={`pt-1 ${shouldDisplayCombinedResultSection ? 'border-t border-gray-700 mt-2 pt-2' : ''}`}>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden mb-1">
            <div className="h-full relative">
              {actualRemainingHPMinPercentage > 0 && (
                <div
                  className={`absolute top-0 left-0 h-full ${getHpBarColorByRemainingHp(actualRemainingHPMinPercentage)}`}
                  style={{ width: `${actualRemainingHPMinPercentage}%` }}
                />
              )}
              {actualRemainingHPMaxPercentage > actualRemainingHPMinPercentage && (
                <div
                  className={`absolute top-0 h-full ${getHpRangeBarColorByRemainingHp(actualRemainingHPMinPercentage)}`}
                  style={{
                    left: `${actualRemainingHPMinPercentage}%`,
                    width: `${Math.max(0, actualRemainingHPMaxPercentage - actualRemainingHPMinPercentage)}%`,
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex-grow">
              <div>
                {isCriticalModeActive ? (
                  <div>
                  <p className="text-sm text-red-400 mb-1">急所 {hitCount > 1 && ` (${hitCount}回)`} 
                     {' '}{getKOText(result.criticalDamages, defenderHP, hitCount, true)}
                  </p>  
                  <p className="text-white font-medium">
                    <span className={getDamageColor(multiHitCritMinPercentage)}>{multiHitCritMinDamage}</span>
                    {' - '}
                    <span className={getDamageColor(multiHitCritMaxPercentage)}>{multiHitCritMaxDamage}</span>
                    
                    <span className="text-sm text-white ml-2">
                      ({formatPercentage(multiHitCritMinPercentage)}% - {formatPercentage(multiHitCritMaxPercentage)}%) 
                    </span>
                  </p>
                  </div>
                ) : (
                  <div>
                  <p className="text-sm text-white mb-1">通常 {hitCount > 1 && ` (${hitCount}回)`}
                   {' '}{getKOText(result.normalDamages, defenderHP, hitCount, true)}
                  </p> 
                  <p className="text-white font-medium">
                    <span className={getDamageColor(multiHitMinPercentage)}>{multiHitMinDamage}</span>
                    {' - '}
                    <span className={getDamageColor(multiHitMaxPercentage)}>{multiHitMaxDamage}</span>
                    
                    <span className="text-sm text-white ml-2">
                      ({formatPercentage(multiHitMinPercentage)}% - {formatPercentage(multiHitMaxPercentage)}%) 
                    </span>
                  </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 shrink-0 ml-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={uniqueDoubleBattleId}
                  checked={isDoubleBattle}
                  onChange={handleDoubleBattleChangeFromInput}
                  className="w-3 h-3 md:w-4 md:h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800 focus:ring-1"
                />
                <label htmlFor={uniqueDoubleBattleId} className="ml-1 text-xs md:text-sm text-gray-300">
                  ダブル
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={uniqueCriticalModeId}
                  checked={isCriticalModeActive}
                  onChange={() => setIsCriticalModeActive(!isCriticalModeActive)}
                  className="w-3 h-3 md:w-4 md:h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-offset-gray-800 focus:ring-1"
                />
                <label 
                  htmlFor={uniqueCriticalModeId} 
                  className={`ml-1 text-xs md:text-sm ${isCriticalModeActive ? 'text-red-400 font-semibold' : 'text-gray-300'}`}
                >
                  急所
                </label>
              </div>
              <button
                onClick={openModalAndSaveLog}
                className="text-xs md:text-sm text-blue-400 hover:underline disabled:text-gray-500 disabled:no-underline"
                disabled={!attackerDetails || !defenderDetails}
              >
                詳細
              </button>
            </div>
          </div>

          {isModalOpen && attackerDetails && defenderDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white text-center flex-grow">ダメージ計算詳細</h2>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => setIsModalOpen(false)}
                      aria-label="閉じる"
                    >
                      <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="mb-2">
                  <p>攻：{attackerPokemonName}:{attackerMoveNameForDisplay || attackerMoveName} {hitCount > 1 && `${hitCount}回`}</p>
                  <p>防：{defenderPokemonName}</p>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-400 mb-1">通常{hitCount > 1 && ` (${hitCount}回)`}</p> 
                  <p className="text-white font-medium">
                    <span className={getDamageColor(multiHitMinPercentage)}>{multiHitMinDamage}</span>
                    {' - '}
                    <span className={getDamageColor(multiHitMaxPercentage)}>{multiHitMaxDamage}</span>
                    <span className="text-sm text-gray-400 ml-2">
                      ({formatPercentage(multiHitMinPercentage)}% - {formatPercentage(multiHitMaxPercentage)}%) 
                      {' '}{getKOText(result.normalDamages, defenderHP, hitCount, true)}
                    </span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-red-400 mb-1">急所{hitCount > 1 && ` (${hitCount}回)`}</p> 
                  <p className="text-white font-medium">
                    <span className={getDamageColor(multiHitCritMinPercentage)}>{multiHitCritMinDamage}</span>
                    {' - '}
                    <span className={getDamageColor(multiHitCritMaxPercentage)}>{multiHitCritMaxDamage}</span>
                    <span className="text-sm text-gray-400 ml-2">
                      ({formatPercentage(multiHitCritMinPercentage)}% - {formatPercentage(multiHitCritMaxPercentage)}%) 
                      {' '}{getKOText(result.criticalDamages, defenderHP, hitCount, true)}
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-red-400 mb-3 border-b border-gray-700 pb-1">攻撃側: {attackerDetails.pokemonName}</h3>
                    <div className="flex items-start mb-2">
                        <img 
                          src={`/icon/${attackerDetails.pokemonId.toString().padStart(3, '0')}.png`} 
                          alt={attackerDetails.pokemonName} 
                          className="w-12 h-12 inline-block mr-2 border border-gray-700 rounded" 
                        />
                        <div className="flex flex-col space-y-1">
                            {Array.isArray(attackerDetails.displayTypes) && attackerDetails.displayTypes.map((type, idx) => (
                                type && <span 
                                    key={`attacker-type-${idx}`}
                                    className="px-2 py-0.5 rounded text-xs font-medium text-white"
                                    style={{ backgroundColor: getTypeColorFromModal(type as PokemonType | 'stellar') }}
                                >
                                    {getTypeNameJpFromModal(type as PokemonType | 'stellar')}
                                </span>
                            ))}
                        </div>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>技の威力: <span className="font-semibold text-white">{attackerDetails.movePower}</span></li>
                      {attackerDetails.moveCategory && (
                        <li>技カテゴリ: <span className="font-semibold text-white">
                            {attackerDetails.moveCategory === 'physical' ? '物理' : attackerDetails.moveCategory === 'special' ? '特殊' : '変化'}
                        </span></li>
                      )}
                      <li>攻撃/　特攻の値: <span className="font-semibold text-white">{attackerDetails.offensiveStatValue}</span></li>
                      <li>攻撃/特攻ランク: <span className="font-semibold text-white">{attackerDetails.offensiveStatRank >= 0 ? `+${attackerDetails.offensiveStatRank}` : attackerDetails.offensiveStatRank}</span></li>
                      {attackerDetails.teraType && !attackerDetails.isStellar && <li>テラスタル: <span className="font-semibold text-white">{getTypeNameJpFromModal(attackerDetails.teraType)}</span></li>}
                      {attackerDetails.isStellar && <li>テラスタル: <span className="font-semibold text-pink-400">{getTypeNameJpFromModal(PokemonType.Stellar)}</span></li>}
                      {attackerDetails.item && <li>持ち物: <span className="font-semibold text-white">{attackerDetails.item}</span></li>}
                      {attackerDetails.ability && <li>特性: <span className="font-semibold text-white">{attackerDetails.ability}</span></li>}
                      {attackerDetails.isBurned && <li className="text-red-400 font-semibold">火傷状態</li>}
                      {attackerDetails.hasHelpingHand && <li className="text-green-400 font-semibold">てだすけ</li>}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-blue-400 mb-3 border-b border-gray-700 pb-1">防御側: {defenderDetails.pokemonName}</h3>
                     <div className="flex items-start mb-2">
                        <img 
                            src={`/icon/${defenderDetails.pokemonId.toString().padStart(3, '0')}.png`} 
                            alt={defenderDetails.pokemonName} 
                            className="w-12 h-12 inline-block mr-2 border border-gray-700 rounded"
                        />
                        <div className="flex flex-col space-y-1">
                            {Array.isArray(defenderDetails.displayTypes) && defenderDetails.displayTypes.map((type, idx) => (
                                type && <span 
                                    key={`defender-type-${idx}`}
                                    className="px-2 py-0.5 rounded text-xs font-medium text-white"
                                    style={{ backgroundColor: getTypeColorFromModal(type) }}
                                >
                                    {getTypeNameJpFromModal(type)}
                                </span>
                            ))}
                        </div>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {defenderDetails.maxHp && <li>最大HP: <span className="font-semibold text-white">{defenderDetails.maxHp}</span></li>}
                      <li>防御/特防の値: <span className="font-semibold text-white">{defenderDetails.defensiveStatValue}</span></li>
                      <li>防御/特防ランク: <span className="font-semibold text-white">{defenderDetails.defensiveStatRank >= 0 ? `+${defenderDetails.defensiveStatRank}` : defenderDetails.defensiveStatRank}</span></li>
                      <li>相性: <span className="font-semibold text-white">×{result.effectiveness.toFixed(2)}</span></li>
                      {defenderDetails.item && <li>持ち物: <span className="font-semibold text-white">{defenderDetails.item}</span></li>}
                      {defenderDetails.ability && <li>特性: <span className="font-semibold text-white">{defenderDetails.ability}</span></li>}
                      {defenderDetails.hasReflect && <li className="text-blue-300 font-semibold">リフレクター</li>}
                      {defenderDetails.hasLightScreen && <li className="text-yellow-300 font-semibold">ひかりのかべ</li>}
                      {defenderDetails.hasFriendGuard && <li className="text-purple-300 font-semibold">フレンドガード</li>}
                    </ul>
                  </div>
                </div>

                {(weather || field || (disasters && Object.values(disasters).some(d => d))) && (
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-indigo-400 mb-3">フィールド状態</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {weather && <li>天候: <span className="font-semibold text-white">{WEATHER_NAME_JP[weather as keyof typeof WEATHER_NAME_JP] || weather}</span></li>}
                      {field && <li>フィールド: <span className="font-semibold text-white">{FIELD_NAME_JP[field as keyof typeof FIELD_NAME_JP] || field}</span></li>}
                      {disasters && Object.entries(disasters).map(([key, value]) => 
                        value && <li key={key}>災い: <span className="font-semibold text-red-400">{disasterMap[key as keyof DisasterState]}</span></li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-white font-medium text-sm mb-2">通常ダメージ分布{hitCount > 1 && ` (技1回あたり)`}</h4>
                  <div className="grid grid-cols-8 gap-[2px] text-[10px]">
                    {result.normalDamages.map((damagePerHit, i) => {
                      const factor = 0.85 + i * 0.01;
                      const totalDamage = damagePerHit * hitCount;
                      const percentage = defenderHP > 0 ? (totalDamage / defenderHP) * 100 : 0;
                      return (
                        <div
                          key={`normal-dist-${i}`}
                          className="bg-gray-700 p-[2px] rounded text-center leading-tight"
                        >
                          <div className="text-gray-400">×{factor.toFixed(2)}</div>
                          <div className={getDamageColor(percentage)}>{totalDamage}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-red-400 font-medium text-sm mb-2">急所ダメージ分布{hitCount > 1 && ` (技1回あたり)`}</h4>
                  <div className="grid grid-cols-8 gap-[2px] text-[10px]">
                    {result.criticalDamages.map((damagePerHit, i) => {
                       const factor = 0.85 + i * 0.01;
                       const totalDamage = damagePerHit * hitCount;
                      const percentage = defenderHP > 0 ? (totalDamage / defenderHP) * 100 : 0;
                      return (
                        <div
                          key={`crit-dist-${i}`}
                          className="bg-gray-700 p-[2px] rounded text-center leading-tight"
                        >
                          <div className="text-gray-400">×{factor.toFixed(2)}</div>
                          <div className={getDamageColor(percentage)}>{totalDamage}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        閉じる
                    </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DamageResult;