// src/components/TeamMemberCard.tsx
import React from 'react';
import { PokemonType } from '../types';
import { POKEMON_TYPE_NAMES_JP } from '../calculation/pokemonTypesJp'; // ★ インポート追加

// TeamMember 型定義（TeamManager.tsx と一致させる）
interface TeamMember {
  id: string;
  pokemon: { id: number; name: string; nameEn: string; types: PokemonType[] };
  level: number;
  item: { name: string; nameEn: string } | null;
  ability: { name: string; nameEn: string } | null;
  teraType: PokemonType;
  // nature の型定義を修正し、increasedStat, decreasedStat を追加
  nature: { name_jp: string, nameEn: string, increasedStat?: string | null, decreasedStat?: string | null } | null;
  evs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  ivs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  // moves の型定義を修正し、nameEn を追加
  moves: ({ name: string; type: PokemonType, nameEn: string } | null)[];
}

// ポケモンタイプの色の定義
const PokemonTypeColors: Record<PokemonType, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    stellar: '#75CADD', // 仮の色
};


// TeamMemberCard コンポーネントが受け取るプロパティの型定義
interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void; // ★ 新しく追加するプロパティ: カードがクリックされたときに呼び出される関数
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onClick }) => {
  // 努力値表示のためのヘルパー関数
  const formatStatValue = (value: number, statName: string, isEV: boolean, nature?: { increasedStat?: string | null, decreasedStat?: string | null}) => {
    let suffix = "";
    if (isEV && nature) {
        // 性格補正によって上昇・下降するステータスに '+' または '-' をつける
        if (nature.increasedStat === statName) suffix = "+";
        if (nature.decreasedStat === statName) suffix = "-";
    }
    return `${value}${suffix}`;
  };

  // 努力値の略称マップ
  const evStatShorthands: { [key in keyof TeamMember['evs']]: string } = {
    hp: "HP",
    attack: "Atk",
    defense: "Def",
    specialAttack: "SpA",
    specialDefense: "SpD",
    speed: "Spe"
  };

  // 各ステータス行をレンダリングするヘルパー関数
  const renderStatRow = (statKey: keyof TeamMember['evs'], label: string) => {
    const evValue = member.evs[statKey];
    const MAX_EV = 252;
    const evPercentage = (evValue / MAX_EV) * 100; // 努力値バーの幅計算

    return (
      <div className="flex items-center text-xs mb-0.5">
        <span className="w-10 font-medium text-gray-300">{label}</span>
        <div className="w-16 text-right pr-2 text-white">{evValue > 0 ? formatStatValue(evValue, statKey, true, member.nature as any) : "-"}</div>
        <div className="flex-grow bg-gray-600 h-3 rounded-sm overflow-hidden">
          <div style={{ width: `${evPercentage}%` }} className="h-full bg-yellow-400"></div>
        </div>
      </div>
    );
  };


  return (
    <div
      // ★ ここに onClick ハンドラを追加します
      className="bg-gray-800 p-3 rounded-lg shadow text-sm w-full border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
      onClick={onClick} // クリックされたときに親から渡された onClick 関数を呼び出す
    >
      <div className="flex mb-2">
        <div className="mr-3 flex-shrink-0 relative">
          <img
            src={`/icon/${member.pokemon.id.toString().padStart(3, '0')}.png`}
            alt={member.pokemon.name}
            className="w-16 h-16"
          />
           <span className="absolute -bottom-1 -right-1 text-xs bg-gray-900 bg-opacity-80 px-1.5 py-0.5 rounded text-white border border-gray-600">
            Lv. {member.level}
          </span>
        </div>

        <div className="flex-grow">
          <h3 className="text-base font-bold text-white mb-0.5">{member.pokemon.name}</h3>
          {member.item && (
            <div className="flex items-center">
              <span className="text-gray-300 text-xs bg-gray-700 px-2 py-0.5 rounded">{member.item.name}</span>
            </div>
          )}
          {member.ability && <p className="text-xs text-gray-400 mt-1">とくせい: {member.ability.name}</p>}
           <p className="text-xs text-gray-400 mt-1">
            テラスタイプ:
            <span style={{ backgroundColor: PokemonTypeColors[member.teraType] || '#777', color: 'white', padding: '1px 5px', borderRadius: '3px', marginLeft: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>
              {/* ★ 修正: 日本語表示、見つからない場合は英語大文字 */}
              {POKEMON_TYPE_NAMES_JP[member.teraType] || member.teraType.toUpperCase()}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3">
        {/* 左側: 技 */}
        <div>
            {member.moves.map((move, i) => (
            <div key={i} className="text-xs text-gray-200 bg-gray-700 px-2 py-1 rounded mb-1 h-6 flex items-center truncate">
                {move ? (
                <>
                    <span
                    style={{ backgroundColor: PokemonTypeColors[move.type] || '#777', color: 'white', padding: '1px 4px', borderRadius: '3px', marginRight: '5px', fontSize: '0.6rem', fontWeight: 'bold' }}
                    className="inline-block leading-tight"
                    >
                    {/* ★ 修正: 日本語表示、見つからない場合は英語大文字 */}
                    {POKEMON_TYPE_NAMES_JP[move.type] || move.type.toUpperCase()}
                    </span>
                    {move.name}
                </>
                ) : '-'}
            </div>
            ))}
        </div>

        {/* 右側: ステータス (努力値) */}
        <div className="border border-gray-700 rounded p-1.5">
            <div className="text-center text-xs text-gray-400 mb-1">努力値</div>
            {renderStatRow('hp', 'HP')}
            {renderStatRow('attack', 'Atk')}
            {renderStatRow('defense', 'Def')}
            {renderStatRow('specialAttack', 'SpA')}
            {renderStatRow('specialDefense', 'SpD')}
            {renderStatRow('speed', 'Spe')}
            {member.nature && <p className="text-center text-xs text-gray-300 mt-1">{member.nature.name_jp} 性格</p>}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;