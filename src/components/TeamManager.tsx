import React, { useState, useEffect } from 'react';
import { Pokemon, Move, Item, Ability, PokemonType } from '../types';
import { Nature } from '../data/natures';
// ClipboardCopy アイコンを追加
import { Plus, X, Copy as CopyIcon, FileDown, FileUp, UploadCloud, SendToBack, Send, ArrowLeft, ClipboardCopy } from 'lucide-react';
import TeamMemberCard from '../types/TeamMemberCard';
import TeamMemberEditor from './TeamMemberEditor';
import { TeamMemberForDefenderLoad, TeamMemberForAttackerLoad } from '../App';

// TeamMember 型定義 (TeamMemberCard.tsx と Nature 型を natures.ts のものに合わせる)
interface TeamMember {
  id: string;
  pokemon: Pokemon;
  level: number;
  item: Item | null;
  ability: Ability | null;
  teraType: PokemonType;
  nature: Nature | null;
  evs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  ivs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  moves: (Move | null)[];
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

interface TeamManagerProps {
  pokemon: Pokemon[];
  moves: Move[];
  items: Item[];
  abilities: Ability[];
  natures: Nature[];
  onLoadAsDefender?: (member: TeamMemberForDefenderLoad) => void;
  onLoadAsAttacker?: (member: TeamMemberForAttackerLoad) => void;
}

type View = 'list' | 'editTeam';

// Helper function to capitalize first letter of a string
const capitalize = (s: string) => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};


const TeamManager: React.FC<TeamManagerProps> = ({
  pokemon, moves, items, abilities, natures, onLoadAsDefender, onLoadAsAttacker
}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [importText, setImportText] = useState('');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');
  const [isNewMember, setIsNewMember] = useState(false);

  useEffect(() => {
    try {
      const savedTeams = localStorage.getItem('pokemonTeams');
      if (savedTeams) {
        const parsedTeams: Team[] = JSON.parse(savedTeams);
        const hydratedTeams = parsedTeams.map(team => ({
          ...team,
          members: team.members.map(member => ({
            ...member,
            pokemon: pokemon.find(p => p.id === member.pokemon.id) || pokemon[0],
            item: member.item ? items.find(i => i.nameEn === member.item!.nameEn) || null : null,
            ability: member.ability ? abilities.find(a => a.nameEn === member.ability!.nameEn) || null : null,
            nature: member.nature ? natures.find(n => n.nameEn === (member.nature as Nature).nameEn || n.name === (member.nature as Nature).name) || null : null,
            moves: member.moves.map(m => m ? moves.find(mv => mv.nameEn === m!.nameEn || mv.name === m!.name) || null : null)
          }))
        }));
        setTeams(hydratedTeams);
        if (hydratedTeams.length === 0) {
          const initialTeam: Team = { id: Date.now().toString(), name: 'チーム1', members: [] };
          setTeams([initialTeam]);
        }
      } else {
        const initialTeam: Team = { id: Date.now().toString(), name: 'チーム1', members: [] };
        setTeams([initialTeam]);
      }
    } catch (error) {
      console.error("localStorage からチームの読み込みに失敗しました:", error);
      const initialTeam: Team = { id: Date.now().toString(), name: 'チーム1', members: [] };
      setTeams([initialTeam]);
    }
  }, [pokemon, moves, items, abilities, natures]);

  useEffect(() => {
    try {
      localStorage.setItem('pokemonTeams', JSON.stringify(teams));
    } catch (error) {
      console.error("localStorage へのチームの保存に失敗しました:", error);
    }
  }, [teams]);

  const handleCreateTeam = () => {
    const newTeamId = Date.now().toString();
    const newTeam: Team = { id: newTeamId, name: `チーム ${teams.length + 1}`, members: [] };
    setTeams([...teams, newTeam]);
    setSelectedTeam(newTeam);
    setCurrentView('editTeam');
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setCurrentView('editTeam');
  };

  const handleReturnToList = () => {
    setCurrentView('list');
    setSelectedTeam(null);
  };

  const statShorthandToKey = (shorthand: string): keyof TeamMember['evs'] | null => {
    const map: { [key: string]: keyof TeamMember['evs'] } = {
      'hp': 'hp', 'atk': 'attack', 'def': 'defense', 'spa': 'specialAttack', 'spd': 'specialDefense', 'spe': 'speed',
      'attack': 'attack', 'defense': 'defense', 'sp. atk': 'specialAttack', 'special attack': 'specialAttack',
      'sp. def': 'specialDefense', 'special defense': 'specialDefense', 'speed': 'speed'
    };
    return map[shorthand.toLowerCase()] || null;
  };

  const parseSinglePokemon = (pokemonText: string): TeamMember | null => {
    const lines = pokemonText.trim().split('\n');
    let parsedPokemonNameEnOrJp: string | undefined;
    let parsedItemNameEnOrJp: string | undefined;
    let parsedAbilityNameEnOrJp: string | undefined;
    let parsedTeraType: PokemonType | undefined;
    let parsedLevel: number = 50;
    const parsedEVs: TeamMember['evs'] = { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 };
    const parsedIVs: TeamMember['ivs'] = { hp: 31, attack: 31, defense: 31, specialAttack: 31, specialDefense: 31, speed: 31 };
    let parsedNatureNameEnOrJp: string | undefined;
    const parsedMoveNamesEnOrJp: string[] = [];

    lines.forEach(line => {
      const l = line.trim();
      if (l.startsWith('- ')) {
        if (parsedMoveNamesEnOrJp.length < 4) parsedMoveNamesEnOrJp.push(l.substring(2).trim());
      } else if (l.includes('@')) {
        const parts = l.split('@').map(p => p.trim());
        parsedPokemonNameEnOrJp = parts[0].replace(/\s*\([^)]*\)\s*$/, '').trim();
        if (parts.length > 1) parsedItemNameEnOrJp = parts[1];
      } else if (l.toLowerCase().startsWith('ability:')) parsedAbilityNameEnOrJp = l.substring('ability:'.length).trim();
      else if (l.toLowerCase().startsWith('tera type:')) parsedTeraType = l.substring('tera type:'.length).trim().toLowerCase() as PokemonType;
      else if (l.toLowerCase().startsWith('level:')) parsedLevel = parseInt(l.substring('level:'.length).trim(), 10) || 50;
      else if (l.toLowerCase().startsWith('evs:')) {
        const evString = l.substring('evs:'.length).trim();
        evString.split(' / ').forEach(part => {
          const match = part.trim().match(/(\d+)\s+(HP|Atk|Def|SpA|SpD|Spe)/i);
          if (match) {
            const value = parseInt(match[1], 10);
            const statKey = statShorthandToKey(match[2]);
            if (statKey) parsedEVs[statKey] = value;
          }
        });
      } else if (l.toLowerCase().endsWith(' nature')) parsedNatureNameEnOrJp = l.substring(0, l.toLowerCase().indexOf(' nature')).trim();
      else if (l.toLowerCase().startsWith('ivs:')) {
        const ivString = l.substring('ivs:'.length).trim();
        ivString.split(' / ').forEach(part => {
          const match = part.trim().match(/(\d+)\s+(HP|Atk|Def|SpA|SpD|Spe)/i);
          if (match) {
            const value = parseInt(match[1], 10);
            const statKey = statShorthandToKey(match[2]);
            if (statKey) parsedIVs[statKey] = value;
          }
        });
      } else if (!parsedPokemonNameEnOrJp && l.length > 0 && !l.includes(':') && !l.endsWith('Nature') && !l.includes('/') && !l.startsWith('Trait:') && !l.startsWith('Happiness:')) {
        parsedPokemonNameEnOrJp = l.replace(/\s*\([^)]*\)\s*$/, '').trim();
      }
    });

    if (!parsedPokemonNameEnOrJp) return null;

    const resolvedPokemon = pokemon.find(p => p.name.toLowerCase() === parsedPokemonNameEnOrJp!.toLowerCase() || (p.nameEn || '').toLowerCase() === parsedPokemonNameEnOrJp!.toLowerCase());
    if (!resolvedPokemon) {
      console.warn(`ポケモン "${parsedPokemonNameEnOrJp}" が見つかりません。`);
      return null;
    }

    const resolvedItem = parsedItemNameEnOrJp ? items.find(i => i.name.toLowerCase() === parsedItemNameEnOrJp!.toLowerCase() || (i.nameEn || '').toLowerCase() === parsedItemNameEnOrJp!.toLowerCase()) : null;
    let resolvedAbility = parsedAbilityNameEnOrJp ? abilities.find(a => a.name.toLowerCase() === parsedAbilityNameEnOrJp!.toLowerCase() || (a.nameEn || '').toLowerCase() === parsedAbilityNameEnOrJp!.toLowerCase()) : null;
    if (!resolvedAbility && resolvedPokemon.abilities.length > 0) {
      const firstAbilityName = resolvedPokemon.abilities[0];
      resolvedAbility = abilities.find(a => (a.nameEn || '').toLowerCase() === firstAbilityName.toLowerCase()) || abilities.find(a => a.name.toLowerCase() === firstAbilityName.toLowerCase()) || null;
    }
    const resolvedNature = parsedNatureNameEnOrJp
        ? natures.find(n =>
            n.name.toLowerCase() === parsedNatureNameEnOrJp!.toLowerCase() ||
            n.nameEn.toLowerCase() === parsedNatureNameEnOrJp!.toLowerCase() ||
            n.name_jp.toLowerCase() === parsedNatureNameEnOrJp!.toLowerCase()
          )
        : null;
    const resolvedMoves = parsedMoveNamesEnOrJp.map(name => moves.find(m => m.name.toLowerCase() === name.toLowerCase() || (m.nameEn || '').toLowerCase() === name.toLowerCase()) || null);
    while (resolvedMoves.length < 4) resolvedMoves.push(null);
    if (!parsedTeraType) parsedTeraType = resolvedPokemon.types[0];

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      pokemon: resolvedPokemon,
      level: parsedLevel,
      item: resolvedItem,
      ability: resolvedAbility,
      teraType: parsedTeraType!,
      nature: resolvedNature,
      evs: parsedEVs,
      ivs: parsedIVs,
      moves: resolvedMoves.slice(0, 4) as (Move | null)[],
    };
  };

  const handleParseAndAddMultipleMembers = () => {
    if (!selectedTeam || importText.trim() === '') return;
    const pokemonTexts = importText.split(/\n\n+/).filter(text => text.trim() !== '');
    const newMembers: TeamMember[] = [];
    const errors: string[] = [];

    pokemonTexts.forEach((pokemonText, index) => {
      const member = parseSinglePokemon(pokemonText);
      if (member) newMembers.push(member);
      else errors.push(`${index + 1}番目のポケモンの解析に失敗しました`);
    });

    if (errors.length > 0) alert(`以下のエラーが発生しました:\n${errors.join('\n')}`);

    if (newMembers.length > 0) {
      const remainingSlots = 6 - selectedTeam.members.length;
      const membersToAdd = newMembers.slice(0, remainingSlots);
      if (newMembers.length > remainingSlots) {
        alert(`チームに空きがあるのは${remainingSlots}匹分です。最初の${remainingSlots}匹のみ追加されます。`);
      }
      const updatedTeam = { ...selectedTeam, members: [...selectedTeam.members, ...membersToAdd] };
      setTeams(teams.map(team => team.id === selectedTeam.id ? updatedTeam : team));
      setSelectedTeam(updatedTeam);
      setImportText('');
    }
  };

  const createDefaultTeamMember = (): TeamMember => {
    const defaultPokemon = pokemon[0] || { id: 0, name: '不明', nameEn: 'Unknown', types: ['normal' as PokemonType], abilities: [], baseStats: { hp:50, attack:50, defense:50, specialAttack:50, specialDefense:50, speed:50 } };
    return {
      id: `new-${Date.now().toString()}`,
      pokemon: defaultPokemon,
      level: 50,
      item: null,
      ability: null,
      teraType: defaultPokemon.types[0] || 'normal',
      nature: null,
      evs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
      ivs: { hp: 31, attack: 31, defense: 31, specialAttack: 31, specialDefense: 31, speed: 31 },
      moves: [null, null, null, null],
    };
  };

  const handleAddNewMember = () => {
    if (!selectedTeam || selectedTeam.members.length >= 6) return;
    const newMemberTemplate = createDefaultTeamMember();
    setEditingMember(newMemberTemplate);
    setIsNewMember(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsNewMember(false);
  };

  const handleSaveEditedMember = (updatedMemberData: TeamMember) => {
    if (!selectedTeam) return;
    let finalMemberData = { ...updatedMemberData };
    let updatedMembers;
    if (isNewMember) {
      updatedMembers = [...selectedTeam.members, finalMemberData];
    } else {
      updatedMembers = selectedTeam.members.map(m => (m.id === finalMemberData.id ? finalMemberData : m));
    }
    if (updatedMembers.length > 6) {
        alert("チームメンバーは最大6匹までです。");
        updatedMembers = updatedMembers.slice(0, 6);
    }
    const updatedTeam = { ...selectedTeam, members: updatedMembers };
    setTeams(teams.map((team) => (team.id === selectedTeam.id ? updatedTeam : team)));
    setSelectedTeam(updatedTeam);
    setEditingMember(null);
    setIsNewMember(false);
  };

  const handleCloseEditor = () => {
    setEditingMember(null);
    setIsNewMember(false);
  };

  const handleSendToDefender = (member: TeamMember) => {
    if (onLoadAsDefender && member.nature) {
      const memberDataForDefenderLoad: TeamMemberForDefenderLoad = {
        pokemon: member.pokemon, item: member.item, ability: member.ability, teraType: member.teraType,
        nature: { nameEn: member.nature.nameEn }, evs: member.evs, ivs: member.ivs,
      };
      onLoadAsDefender(memberDataForDefenderLoad);
    } else if (onLoadAsDefender) {
        onLoadAsDefender({
            pokemon: member.pokemon, item: member.item, ability: member.ability, teraType: member.teraType,
            nature: null, evs: member.evs, ivs: member.ivs,
        });
    }
  };

  const handleSendToAttacker = (member: TeamMember) => {
    if (onLoadAsAttacker && member.nature) {
      const memberDataForAttackerLoad: TeamMemberForAttackerLoad = {
        pokemon: member.pokemon, item: member.item, ability: member.ability, teraType: member.teraType,
        nature: { nameEn: member.nature.nameEn }, evs: member.evs, ivs: member.ivs,
        moves: member.moves.slice(0, 4) as (Move | null)[], level: member.level,
      };
      onLoadAsAttacker(memberDataForAttackerLoad);
    } else if (onLoadAsAttacker) {
        onLoadAsAttacker({
            pokemon: member.pokemon, item: member.item, ability: member.ability, teraType: member.teraType,
            nature: null, evs: member.evs, ivs: member.ivs,
            moves: member.moves.slice(0, 4) as (Move | null)[], level: member.level,
        });
    }
  };

  const handleDeleteMemberFromTeam = (memberId: string) => {
    if (!selectedTeam) return;
    const updatedMembers = selectedTeam.members.filter(m => m.id !== memberId);
    const updatedTeam = { ...selectedTeam, members: updatedMembers };
    setSelectedTeam(updatedTeam);
    setTeams(teams.map(t => t.id === selectedTeam.id ? updatedTeam : t));
  };

  const handleCopyToClipboard = (member: TeamMember) => {
    const { pokemon, item, ability, level, teraType, evs, nature, ivs, moves: memberMoves } = member;

    const statOrder: (keyof TeamMember['evs'])[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
    const statShorthands: { [key in keyof TeamMember['evs']]: string } = {
      hp: 'HP', attack: 'Atk', defense: 'Def',
      specialAttack: 'SpA', specialDefense: 'SpD', speed: 'Spe'
    };

    const lines: string[] = [];

    // Line 1: PokemonName @ ItemName
    let line1 = pokemon.nameEn || pokemon.name;
    if (item) {
      line1 += ` @ ${item.nameEn || item.name}`;
    }
    lines.push(line1);

    // Line 2: Ability: AbilityName
    if (ability) {
      lines.push(`Ability: ${ability.nameEn || ability.name}`);
    }

    // Line 3: Level: LevelValue
    lines.push(`Level: ${level}`);

    // Line 4: Tera Type: TeraTypeName
    lines.push(`Tera Type: ${capitalize(teraType)}`);

    // Line 5: EVs
    const evStrings: string[] = [];
    statOrder.forEach(stat => {
      if (evs[stat] > 0) {
        evStrings.push(`${evs[stat]} ${statShorthands[stat]}`);
      }
    });
    if (evStrings.length > 0) {
      lines.push(`EVs: ${evStrings.join(' / ')}`);
    }

    // Line 6: NatureName Nature
    if (nature) {
      lines.push(`${capitalize(nature.nameEn || nature.name)} Nature`);
    }

    // Line 7: IVs
    const ivStrings: string[] = [];
    statOrder.forEach(stat => {
      if (ivs[stat] < 31) { // Showdown format typically shows IVs if they are NOT 31
        ivStrings.push(`${ivs[stat]} ${statShorthands[stat]}`);
      }
    });
    if (ivStrings.length > 0) {
      lines.push(`IVs: ${ivStrings.join(' / ')}`);
    }

    // Line 8+: Moves
    memberMoves.forEach(move => {
      if (move) {
        lines.push(`- ${move.nameEn || move.name}`);
      }
    });

    const textToCopy = lines.join('\n');

    navigator.clipboard.writeText(textToCopy)
      .catch(err => {
        console.error('クリップボードへのコピーに失敗しました:', err);
        alert('クリップボードへのコピーに失敗しました。');
      });
  };


  const renderTeamList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={handleCreateTeam}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            新しいチーム
          </button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">チームがありません。自動的に「チーム1」が作成されます。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map(team => (
            <div
              key={team.id}
              className="bg-gray-800 rounded-lg p-3 border-2 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => handleSelectTeam(team)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-semibold truncate" title={team.name}>{team.name}</h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); alert('チーム全体のコピー機能は未実装です'); }} // 以前は CopyIcon だった
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <CopyIcon className="h-3 w-3" /> 
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTeams = teams.filter(t => t.id !== team.id);
                      setTeams(newTeams);
                      if (newTeams.length === 0) {
                        const newInitialTeam: Team = { id: Date.now().toString(), name: 'チーム1', members: [] };
                        setTeams([newInitialTeam]);
                        if (selectedTeam?.id === team.id) handleReturnToList();
                      } else if (selectedTeam?.id === team.id) {
                        setSelectedTeam(newTeams[0]);
                        setCurrentView('list');
                      }
                    }}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors text-red-500 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {team.members.slice(0, 6).map((member, index) => (
                  <div key={member.id || index} className="relative aspect-square bg-gray-700 rounded overflow-hidden">
                    <img
                      src={`/icon/${member.pokemon.id.toString().padStart(3, '0')}.png`}
                      alt={member.pokemon.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 6 - team.members.length) }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="bg-gray-700 rounded aspect-square flex items-center justify-center"
                  >
                    <Plus className="h-5 w-5 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );


  const renderTeamEdit = () => {
    if (!selectedTeam) return null;

    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleReturnToList}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            チーム一覧に戻る
          </button>
          <h2 className="text-xl font-bold">{selectedTeam.name}</h2>
          <div></div>
        </div>

        {selectedTeam.members.length < 6 && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">ポケモンをテキストで追加（最大6匹まで一度に追加可能）</h3>
            <p className="text-sm text-gray-400 mb-3">
              各ポケモンの情報を空行で区切ってください。複数匹を一度に追加できます。
            </p>
            <textarea
              className="w-full h-40 p-3 bg-gray-700 border border-gray-600 rounded text-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
              placeholder={`複数匹の例（空行で区切る）:\n\nSquirtle @ Assault Vest\nLevel: 50\nAbility: Torrent\nTera Type: Water\nEVs: 252 HP / 4 Def / 252 SpA\nQuiet Nature\nIVs: 0 Atk\n- Water Gun\n- Ice Beam\n- Blizzard\n- Surf\n\nCharmander @ Life Orb\n...`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500">
                残り追加可能数: {6 - selectedTeam.members.length}匹
              </p>
              <button
                onClick={handleParseAndAddMultipleMembers}
                disabled={selectedTeam.members.length >= 6 || importText.trim() === ''}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UploadCloud className="h-4 w-4" />
                テキストからチームに追加
              </button>
            </div>
          </div>
        )}
         {selectedTeam.members.length >= 6 && !importText &&(
          <p className="text-center text-yellow-500 my-4">チームメンバーが一杯です（最大6匹）。</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {selectedTeam.members.map((member) => (
            <div key={member.id} className="relative group">
              <TeamMemberCard member={member} onClick={() => handleEditMember(member)} />
              <div className="absolute top-1 right-1 flex flex-col space-y-1 z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteMemberFromTeam(member.id); }}
                  className="p-1 bg-red-600 hover:bg-red-700 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title={`${member.pokemon.name} をチームから削除`}
                >
                  <X className="h-3 w-3" />
                </button>
                                  {onLoadAsAttacker && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSendToAttacker(member); }}
                      className="p-1 bg-green-600 hover:bg-green-700 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title={`${member.pokemon.name} を攻撃側として計算ツールに送る`}
                    >
                      <Send className="h-3 w-3" />
                    </button>
                  )}
                 {onLoadAsDefender && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSendToDefender(member); }}
                      className="p-1 bg-blue-600 hover:bg-blue-700 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title={`${member.pokemon.name} を防御側として計算ツールに送る`}
                    >
                      <SendToBack className="h-3 w-3" />
                    </button>
                  )}

                  {/* === ここから追加 === */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopyToClipboard(member); }}
                    className="p-1 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title={`${member.pokemon.name} の情報をコピー`}
                  >
                    <ClipboardCopy className="h-3 w-3" />
                  </button>
                  {/* === ここまで追加 === */}
              </div>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 6 - selectedTeam.members.length) }).map((_, index) => (
            <div
              key={`empty-slot-${index}`}
              className="bg-gray-800 p-3 rounded-lg shadow border border-dashed border-gray-600 flex flex-col items-center justify-center min-h-[230px] cursor-pointer hover:border-blue-500 transition-colors"
              onClick={handleAddNewMember}
              title="ポケモンを追加"
            >
              <Plus className="h-10 w-10 text-gray-500 mb-2" />
              <span className="text-gray-400 text-sm">ポケモンを追加</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="p-6">
      {currentView === 'list' && renderTeamList()}
      {currentView === 'editTeam' && renderTeamEdit()}

      {editingMember && (
        <TeamMemberEditor
          member={editingMember}
          allPokemon={pokemon}
          allMoves={moves}
          allItems={items}
          allAbilities={abilities}
          allNatures={natures}
          onSave={handleSaveEditedMember}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default TeamManager;