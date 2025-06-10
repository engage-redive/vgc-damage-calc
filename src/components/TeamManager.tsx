// src/components/TeamManager.tsx

import React, { useState, useEffect } from 'react';
import { Pokemon, Move, Item, Ability, PokemonType, TeamMemberForAttackerLoad, TeamMemberForDefenderLoad } from '../types';
import { Nature } from '../data/natures';
import { Plus, X, Copy as CopyIcon, UploadCloud, ArrowLeft } from 'lucide-react';
import TeamMemberCard from '../types/TeamMemberCard';
import TeamMemberEditor from './TeamMemberEditor';
import { TeamMember, Team, useTeamStore } from '../stores/teamStore';
import { useAttackerStore } from '../stores/attackerStore';
import { useDefenderStore } from '../stores/defenderStore';

interface TeamManagerProps {
  pokemon: Pokemon[];
  moves: Move[];
  items: Item[];
  abilities: Ability[];
  natures: Nature[];
}

type View = 'list' | 'editTeam';

const capitalize = (s: string) => {
  if (typeof s !== 'string' || s.length === 0) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const TeamManager: React.FC<TeamManagerProps> = ({
  pokemon, moves, items, abilities, natures
}) => {
  const { teams, createTeam, deleteTeam, updateTeamName, addMemberToTeam, updateMemberInTeam, deleteMemberFromTeam } = useTeamStore();
  const { loadFromTeamMember: loadAsAttacker } = useAttackerStore();
  const { loadFromTeamMember: loadAsDefender } = useDefenderStore();

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [currentView, setCurrentView] = useState<View>('list');
  const [isNewMember, setIsNewMember] = useState(false);
  
  const selectedTeam = teams.find(t => t.id === selectedTeamId) || null;

  useEffect(() => {
    if (useTeamStore.getState().hydrated && teams.length === 0) {
      createTeam();
    }
  }, [teams, createTeam]);

  const handleCreateTeam = () => {
    const newTeamId = createTeam();
    setSelectedTeamId(newTeamId);
    setCurrentView('editTeam');
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeamId(team.id);
    setCurrentView('editTeam');
  };

  const handleReturnToList = () => {
    setCurrentView('list');
    setSelectedTeamId(null);
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
    const resolvedNature = parsedNatureNameEnOrJp ? natures.find(n => n.name.toLowerCase() === parsedNatureNameEnOrJp!.toLowerCase() || n.nameEn.toLowerCase() === parsedNatureNameEnOrJp!.toLowerCase() || n.name_jp.toLowerCase() === parsedNatureNameEnOrJp!.toLowerCase()) : null;
    const resolvedMoves = parsedMoveNamesEnOrJp.map(name => moves.find(m => m.name.toLowerCase() === name.toLowerCase() || (m.nameEn || '').toLowerCase() === name.toLowerCase()) || null);
    while (resolvedMoves.length < 4) resolvedMoves.push(null);
    if (!parsedTeraType) parsedTeraType = resolvedPokemon.types[0];

    return { id: `${Date.now()}-${Math.random()}`, pokemon: resolvedPokemon, level: parsedLevel, item: resolvedItem, ability: resolvedAbility, teraType: parsedTeraType!, nature: resolvedNature, evs: parsedEVs, ivs: parsedIVs, moves: resolvedMoves.slice(0, 4) as (Move | null)[] };
  };

  const handleParseAndAddMultipleMembers = () => {
    if (!selectedTeamId || importText.trim() === '') return;
    const pokemonTexts = importText.split(/\n\n+/).filter(text => text.trim() !== '');
    pokemonTexts.forEach((text) => {
      const member = parseSinglePokemon(text);
      if (member) {
        addMemberToTeam(selectedTeamId, member);
      }
    });
    setImportText('');
  };

  const createDefaultTeamMember = (): TeamMember => {
    const defaultPokemon = pokemon[0];
    return {
      id: `new-${Date.now().toString()}`,
      pokemon: defaultPokemon,
      level: 50, item: null, ability: null,
      teraType: defaultPokemon.types[0] || 'normal',
      nature: natures.find(n => n.name === 'がんばりや') || null,
      evs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
      ivs: { hp: 31, attack: 31, defense: 31, specialAttack: 31, specialDefense: 31, speed: 31 },
      moves: [null, null, null, null],
    };
  };

  const handleAddNewMember = () => {
    if (!selectedTeam || selectedTeam.members.length >= 6) return;
    setEditingMember(createDefaultTeamMember());
    setIsNewMember(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsNewMember(false);
  };

  const handleSaveEditedMember = (updatedMemberData: TeamMember) => {
    if (!selectedTeamId) return;
    if (isNewMember) {
      addMemberToTeam(selectedTeamId, updatedMemberData);
    } else {
      updateMemberInTeam(selectedTeamId, updatedMemberData);
    }
    setEditingMember(null);
    setIsNewMember(false);
  };
  
  const handleCloseEditor = () => {
    setEditingMember(null);
    setIsNewMember(false);
  };

  const handleSendToDefender = (member: TeamMember) => {
    loadAsDefender(member);
    // ▼▼▼ この2行を追加 ▼▼▼
    const event = new CustomEvent('switchToDamageTab');
    window.dispatchEvent(event);
  };
  const handleSendToAttacker = (member: TeamMember) => {
    loadAsAttacker(member);
    // ダメージ計算タブに切り替える
    const event = new CustomEvent('switchToDamageTab');
    window.dispatchEvent(event);
  };

  const handleDeleteMemberFromTeam = (memberId: string) => {
    if (!selectedTeamId) return;
    deleteMemberFromTeam(selectedTeamId, memberId);
  };

  const handleCopyToClipboard = (member: TeamMember) => {
    const { pokemon, item, ability, level, teraType, evs, nature, ivs, moves: memberMoves } = member;
    const statOrder: (keyof TeamMember['evs'])[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'];
    const statShorthands: { [key in keyof TeamMember['evs']]: string } = { hp: 'HP', attack: 'Atk', defense: 'Def', specialAttack: 'SpA', specialDefense: 'SpD', speed: 'Spe' };
    const lines: string[] = [];
    let line1 = pokemon.nameEn || pokemon.name;
    if (item) line1 += ` @ ${item.nameEn || item.name}`;
    lines.push(line1);
    if (ability) lines.push(`Ability: ${ability.nameEn || ability.name}`);
    lines.push(`Level: ${level}`);
    lines.push(`Tera Type: ${capitalize(teraType)}`);
    const evStrings: string[] = [];
    statOrder.forEach(stat => { if (evs[stat] > 0) evStrings.push(`${evs[stat]} ${statShorthands[stat]}`); });
    if (evStrings.length > 0) lines.push(`EVs: ${evStrings.join(' / ')}`);
    if (nature) lines.push(`${capitalize(nature.nameEn || nature.name)} Nature`);
    const ivStrings: string[] = [];
    statOrder.forEach(stat => { if (ivs[stat] < 31) ivStrings.push(`${ivs[stat]} ${statShorthands[stat]}`); });
    if (ivStrings.length > 0) lines.push(`IVs: ${ivStrings.join(' / ')}`);
    memberMoves.forEach(move => { if (move) lines.push(`- ${move.nameEn || move.name}`); });
    navigator.clipboard.writeText(lines.join('\n')).catch(err => console.error('クリップボードへのコピーに失敗しました:', err));
  };

  const renderTeamList = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleCreateTeam} className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"><Plus className="h-4 w-4" />新しいチーム</button>
      </div>
      {teams.length === 0 ? (
        <div className="text-center py-12"><p className="text-gray-400 mb-4">チームがありません。</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map(team => (
            <div key={team.id} className="bg-gray-800 rounded-lg p-3 border-2 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => handleSelectTeam(team)}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-semibold truncate" title={team.name}>{team.name}</h3>
                <div className="flex items-center space-x-1">
                  <button onClick={(e) => { e.stopPropagation(); alert('チーム全体のコピー機能は未実装です'); }} className="p-1 hover:bg-gray-700 rounded-full transition-colors"><CopyIcon className="h-3 w-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteTeam(team.id); }} className="p-1 hover:bg-gray-700 rounded-full transition-colors text-red-500 hover:text-red-400"><X className="h-3 w-3" /></button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {team.members.slice(0, 6).map((member) => (
                  <div key={member.id} className="relative aspect-square bg-gray-700 rounded overflow-hidden">
                    <img src={`/icon/${member.pokemon.id.toString().padStart(3, '0')}.png`} alt={member.pokemon.name} className="w-full h-full object-contain"/>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 6 - team.members.length) }).map((_, index) => (
                  <div key={`empty-${index}`} className="bg-gray-700 rounded aspect-square flex items-center justify-center"><Plus className="h-5 w-5 text-gray-500" /></div>
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
          <div></div> {/* Spacer */}
        </div>
        {selectedTeam.members.length < 6 && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">ポケモンをテキストで追加（最大6匹まで一度に追加可能）</h3>
            <p className="text-sm text-gray-400 mb-3">各ポケモンの情報を空行で区切ってください。複数匹を一度に追加できます。</p>
            <textarea
              className="w-full h-40 p-3 bg-gray-700 border border-gray-600 rounded text-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
              placeholder={`複数匹の例（空行で区切る）:\n\nSquirtle @ Assault Vest\n...`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500">残り追加可能数: {6 - selectedTeam.members.length}匹</p>
              <button onClick={handleParseAndAddMultipleMembers} disabled={selectedTeam.members.length >= 6 || importText.trim() === ''} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"><UploadCloud className="h-4 w-4" />テキストからチームに追加</button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {selectedTeam.members.map((member) => (
            <div key={member.id} className="relative group">
              <TeamMemberCard member={member} onClick={() => handleEditMember(member)} />
              <div className="absolute top-1 right-1 flex flex-col items-end space-y-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                <button onClick={(e) => { e.stopPropagation(); handleDeleteMemberFromTeam(member.id); }} className="p-1.5 bg-red-600 hover:bg-red-700 rounded-full text-white flex items-center justify-center w-5 h-5" title={`${member.pokemon.name} をチームから削除`}><X className="h-4 w-4" /></button>
                <button onClick={(e) => { e.stopPropagation(); handleSendToAttacker(member); }} className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 min-w-[60px] text-center" title={`${member.pokemon.name} を攻撃側として計算ツールに送る`}>攻撃側へ</button>
                <button onClick={(e) => { e.stopPropagation(); handleSendToDefender(member); }} className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 min-w-[60px] text-center" title={`${member.pokemon.name} を防御側として計算ツールに送る`}>防御側へ</button>
              </div>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 6 - selectedTeam.members.length) }).map((_, index) => (
            <div key={`empty-slot-${index}`} className="bg-gray-800 p-3 rounded-lg shadow border border-dashed border-gray-600 flex flex-col items-center justify-center min-h-[230px] cursor-pointer hover:border-blue-500 transition-colors" onClick={handleAddNewMember} title="ポケモンを追加"><Plus className="h-10 w-10 text-gray-500 mb-2" /><span className="text-gray-400 text-sm">ポケモンを追加</span></div>
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