import React, { useState } from 'react';
import { DamageCalculation, PokemonType, Weather, Field, DisasterState } from '../types'; // MoveCategory は未使用のため削除
import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface AttackerDetailsForModal {
  pokemonId: number;
  pokemonName: string;
  movePower: number;
  offensiveStatValue: number;
  offensiveStatRank: number;
  teraType: PokemonType | null;
  isStellar: boolean;
  item: string | null;
  ability: string | null;
  isBurned: boolean;
  hasHelpingHand: boolean;
}

interface DefenderDetailsForModal {
  pokemonId: number;
  pokemonName: string;
  defensiveStatValue: number;
  defensiveStatRank: number;
  item: string | null;
  ability: string | null;
  hasReflect: boolean;
  hasLightScreen: boolean;
  hasFriendGuard: boolean;
}

interface DamageResultProps {
  result: DamageCalculation | null;
  defenderHP: number;
  isDoubleBattle: boolean;
  onDoubleBattleChange?: (isDouble: boolean) => void;
  combinedResult?: { // この combinedResult の計算が親コンポーネント側で正しく行われる必要がある
    minDamage: number;
    maxDamage: number;
    minPercentage: number;
    maxPercentage: number;
  };
  attackerPokemonName?: string;
  attackerMoveName?: string;
  defenderPokemonName?: string;
  hitCount?: number;
  attackerDetails?: AttackerDetailsForModal;
  defenderDetails?: DefenderDetailsForModal | null;
  weather?: Weather | null;
  field?: Field | null;
  disasters?: DisasterState;
}

const DamageResult: React.FC<DamageResultProps> = ({
  result,
  defenderHP,
  isDoubleBattle,
  onDoubleBattleChange,
  combinedResult, // 親から渡される、計算済みの合計ダメージ
  attackerPokemonName,
  attackerMoveName,
  defenderPokemonName,
  hitCount = 1,
  attackerDetails,
  defenderDetails,
  weather,
  field,
  disasters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCombinedDetailsExpanded, setIsCombinedDetailsExpanded] = useState(true);

  if (!result || !result.normalDamages || !result.criticalDamages) {
    return (
      <div className="p-2 bg-gray-800 rounded-lg text-center text-gray-400">
        計算結果はありません。
      </div>
    );
  }

  const multiHitMinDamage = result.minDamage * hitCount;
  const multiHitMaxDamage = result.maxDamage * hitCount;
  const multiHitMinPercentage = defenderHP > 0 ? (multiHitMinDamage / defenderHP) * 100 : 0;
  const multiHitMaxPercentage = defenderHP > 0 ? (multiHitMaxDamage / defenderHP) * 100 : 0;

  const multiHitCritMinDamage = result.critMinDamage * hitCount;
  const multiHitCritMaxDamage = result.critMaxDamage * hitCount;
  const multiHitCritMinPercentage = defenderHP > 0 ? (multiHitCritMinDamage / defenderHP) * 100 : 0;
  const multiHitCritMaxPercentage = defenderHP > 0 ? (multiHitCritMaxDamage / defenderHP) * 100 : 0;

  // --- ここから変更 ---
  let showCombinedResultSection = false;
  if (combinedResult) {
    // 合計ダメージが現在の攻撃者単体のダメージと一致するかどうかを確認
    // 一致する場合、それは実質的に1体の攻撃者の結果なので合計としては表示しない
    const isCombinedFromThisAttackerOnly =
      combinedResult.minDamage === multiHitMinDamage &&
      combinedResult.maxDamage === multiHitMaxDamage;

    if (!isCombinedFromThisAttackerOnly) {
      showCombinedResultSection = true;
    }
  }
  // --- ここまで変更 ---

  const getDamageColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 75) return 'text-orange-500';
    if (percentage >= 50) return 'text-yellow-500';
    if (percentage >= 25) return 'text-green-500';
    return 'text-gray-400';
  };

  const getDamageBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-600';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-green-500';
    return 'bg-gray-400';
  };

  const formatPercentage = (percentage: number): string => {
    return Math.max(0, percentage).toFixed(2);
  };

  const handleDoubleBattleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const getKOText = (damagesPerSingleHitDistribution: number[], hp: number, currentHitCount: number): string => {
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
        if (confirmedUsagesToKO !== Infinity) return `確定${confirmedUsagesToKO}発以上`;
        return `乱数${minUsagesToKO}発以上`;
    }

    if (minUsagesToKO === confirmedUsagesToKO) {
      return `確定${minUsagesToKO}発`;
    } else {
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

  const disasterMap: { [key in keyof DisasterState]: string } = {
    sword: "わざわいのつるぎ",
    ball: "わざわいのたま",
    vessel: "わざわいのうつわ",
    talisman: "わざわいのおふだ",
  };

  return (
    <div className="p-1 bg-gray-800 rounded-lg transition-all duration-300">
      {/* --- ここから変更 --- */}
      {showCombinedResultSection && combinedResult && (
      // --- ここまで変更 ---
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-white">合計ダメージ</p>
            <button
              onClick={() => setIsCombinedDetailsExpanded(!isCombinedDetailsExpanded)}
              className="text-gray-400 hover:text-white p-1 -m-1"
              aria-label={isCombinedDetailsExpanded ? "合計詳細を折りたたむ" : "合計詳細を展開する"}
            >
              {isCombinedDetailsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          <p className="text-white font-medium mb-2">
            <span className={getDamageColor(combinedResult.minPercentage)}>
              {combinedResult.minDamage}
            </span>
            {' - '}
            <span className={getDamageColor(combinedResult.maxPercentage)}>
              {combinedResult.maxDamage}
            </span>
            <span className="text-sm text-gray-400 ml-2">
              ({formatPercentage(combinedResult.minPercentage)}% - {formatPercentage(combinedResult.maxPercentage)}%)
            </span>
          </p>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full relative">
              <div
                className={`absolute h-full ${getDamageBarColor(combinedResult.minPercentage)}`}
                style={{ width: `${Math.min(100, combinedResult.minPercentage)}%` }}
              />
              <div
                className={`absolute h-full ${getDamageBarColor(combinedResult.maxPercentage)} opacity-50`}
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
        </div>
      )}

      {/* --- ここから変更 --- */}
      {(!showCombinedResultSection || isCombinedDetailsExpanded) && (
      // --- ここまで変更 ---
          <>
            {/* --- ここから変更 --- */}
            <div className={`pt-2 flex items-center justify-between ${showCombinedResultSection ? 'border-t border-gray-700' : ''}`}>
            {/* --- ここまで変更 --- */}
              {attackerPokemonName && attackerMoveName && defenderPokemonName && (
                <div className="mb-2">
                  <p>攻：{attackerPokemonName}:{attackerMoveName} {hitCount > 1 && `${hitCount}回`}</p>
                  <p>防：{defenderPokemonName}</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`doubleBattle-${attackerPokemonName}-${attackerMoveName}`}
                    checked={isDoubleBattle}
                    onChange={handleDoubleBattleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor={`doubleBattle-${attackerPokemonName}-${attackerMoveName}`} className="text-sm text-gray-300">
                    ダブル
                  </label>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm text-blue-400 hover:underline"
                  disabled={!attackerDetails || !defenderDetails}
                >
                  詳細
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <p className="text-sm text-gray-400 mb-1">通常{hitCount > 1 && ` (${hitCount}回)`}</p> 
                <p className="text-white font-medium">
                  <span className={getDamageColor(multiHitMinPercentage)}>
                    {multiHitMinDamage} 
                  </span>
                  {' - '}
                  <span className={getDamageColor(multiHitMaxPercentage)}>
                    {multiHitMaxDamage} 
                  </span>
                  <span className="text-sm text-gray-400 ml-2">
                    ({formatPercentage(multiHitMinPercentage)}% - {formatPercentage(multiHitMaxPercentage)}%) 
                    {' '}{getKOText(result.normalDamages, defenderHP, hitCount)}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-red-400 mb-1">急所{hitCount > 1 && ` (${hitCount}回)`}</p> 
                <p className="text-white font-medium">
                  <span className={getDamageColor(multiHitCritMinPercentage)}>
                    {multiHitCritMinDamage} 
                  </span>
                  {' - '}
                  <span className={getDamageColor(multiHitCritMaxPercentage)}>
                    {multiHitCritMaxDamage} 
                  </span>
                  <span className="text-sm text-gray-400 ml-2">
                    ({formatPercentage(multiHitCritMinPercentage)}% - {formatPercentage(multiHitCritMaxPercentage)}%) 
                    {' '}{getKOText(result.criticalDamages, defenderHP, hitCount)}
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full relative">
                <div
                  className={`absolute h-full ${getDamageBarColor(multiHitMinPercentage)}`} 
                  style={{ width: `${Math.min(100, multiHitMinPercentage)}%` }} 
                />
                <div
                  className={`absolute h-full ${getDamageBarColor(multiHitMaxPercentage)} opacity-50`} 
                  style={{
                    width: `${Math.min(100, Math.max(0, multiHitMaxPercentage - multiHitMinPercentage))}%`, 
                    left: `${Math.min(100, multiHitMinPercentage)}%` 
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>{defenderHP}</span>
            </div>

            {isModalOpen && attackerDetails && defenderDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <h2 className="text-xl font-semibold text-white mb-6 text-center">ダメージ計算詳細</h2>
                  
                  <div className="mb-2">
                    <p>攻：{attackerPokemonName}:{attackerMoveName} {hitCount > 1 && `${hitCount}回`}</p>
                    <p>防：{defenderPokemonName}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-400 mb-1">通常{hitCount > 1 && ` (${hitCount}回)`}</p> 
                    <p className="text-white font-medium">
                      <span className={getDamageColor(multiHitMinPercentage)}>
                        {multiHitMinDamage} 
                      </span>
                      {' - '}
                      <span className={getDamageColor(multiHitMaxPercentage)}>
                        {multiHitMaxDamage} 
                      </span>
                      <span className="text-sm text-gray-400 ml-2">
                        ({formatPercentage(multiHitMinPercentage)}% - {formatPercentage(multiHitMaxPercentage)}%) 
                        {' '}{getKOText(result.normalDamages, defenderHP, hitCount)}
                      </span>
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-red-400 mb-1">急所{hitCount > 1 && ` (${hitCount}回)`}</p> 
                    <p className="text-white font-medium">
                      <span className={getDamageColor(multiHitCritMinPercentage)}>
                        {multiHitCritMinDamage} 
                      </span>
                      {' - '}
                      <span className={getDamageColor(multiHitCritMaxPercentage)}>
                        {multiHitCritMaxDamage} 
                      </span>
                      <span className="text-sm text-gray-400 ml-2">
                        ({formatPercentage(multiHitCritMinPercentage)}% - {formatPercentage(multiHitCritMaxPercentage)}%) 
                        {' '}{getKOText(result.criticalDamages, defenderHP, hitCount)}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-red-400 mb-3 border-b border-gray-700 pb-1">攻撃側: {attackerDetails.pokemonName}</h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>
                          <img 
                            src={`/src/icon/${attackerDetails.pokemonId.toString().padStart(3, '0')}.png`} 
                            alt={attackerDetails.pokemonName} 
                            className="w-12 h-12 inline-block mr-2 mb-1 border border-gray-700 rounded" 
                          />
                        </li>
                        <li>技の威力: <span className="font-semibold text-white">{attackerDetails.movePower}</span></li>
                        <li>攻撃/特攻の値: <span className="font-semibold text-white">{attackerDetails.offensiveStatValue}</span></li>
                        <li>攻撃/特攻ランク: <span className="font-semibold text-white">{attackerDetails.offensiveStatRank >= 0 ? `+${attackerDetails.offensiveStatRank}` : attackerDetails.offensiveStatRank}</span></li>
                        {attackerDetails.teraType && <li>テラスタル: <span className="font-semibold text-white">{attackerDetails.teraType}</span></li>}
                        {attackerDetails.isStellar && <li><span className="font-semibold text-pink-400">ステラ</span></li>}
                        {attackerDetails.item && <li>持ち物: <span className="font-semibold text-white">{attackerDetails.item}</span></li>}
                        {attackerDetails.ability && <li>特性: <span className="font-semibold text-white">{attackerDetails.ability}</span></li>}
                        {attackerDetails.isBurned && <li className="text-red-400 font-semibold">火傷状態</li>}
                        {attackerDetails.hasHelpingHand && <li className="text-green-400 font-semibold">てだすけ</li>}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-blue-400 mb-3 border-b border-gray-700 pb-1">防御側: {defenderDetails.pokemonName}</h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>
                          <img 
                              src={`/src/icon/${defenderDetails.pokemonId.toString().padStart(3, '0')}.png`} 
                              alt={defenderDetails.pokemonName} 
                              className="w-12 h-12 inline-block mr-2 mb-1 border border-gray-700 rounded"
                            />
                        </li>
                        <li>防御/特防の値: <span className="font-semibold text-white">{defenderDetails.defensiveStatValue}</span></li>
                        <li>防御/特防ランク: <span className="font-semibold text-white">{defenderDetails.defensiveStatRank >= 0 ? `+${defenderDetails.defensiveStatRank}` : defenderDetails.defensiveStatRank}</span></li>
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
                        {weather && <li>天候: <span className="font-semibold text-white">{weather}</span></li>}
                        {field && <li>フィールド: <span className="font-semibold text-white">{field}</span></li>}
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

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default DamageResult;