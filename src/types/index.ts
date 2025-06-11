export interface Pokemon {
  id: string | number;
  name: string;
  types: PokemonType[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  abilities: string[]; // 特性名(日本語)の配列
  height: number;
  weight: number;
}

export const enum PokemonType {
  Normal = 'normal',
  Fire = 'fire',
  Water = 'water',
  Electric = 'electric',
  Grass = 'grass',
  Ice = 'ice',
  Fighting = 'fighting',
  Poison = 'poison',
  Ground = 'ground',
  Flying = 'flying',
  Psychic = 'psychic',
  Bug = 'bug',
  Rock = 'rock',
  Ghost = 'ghost',
  Dragon = 'dragon',
  Dark = 'dark',
  Steel = 'steel',
  Fairy = 'fairy',
  Stellar = 'stellar', // ステラタイプを追加
}

export const enum MoveCategory {
  Physical = 'physical',
  Special = 'special',
  Status = 'status'
}

export type TeraBurstEffectiveType = PokemonType | 'stellar';

export type Weather = 'none' | 'sun' | 'rain' | 'sandstorm' | 'snow' | 'harsh_sunlight' | 'heavy_rain';

export const enum Field {
  None = 'none',
  Electric = 'electric',
  Grassy = 'grassy',
  Psychic = 'psychic',
  Misty = 'misty'
}

export interface DisasterState {
  sword: boolean;
  ball: boolean;
  vessel: boolean;
  talisman: boolean;
}

export interface MoveDynamicContext {
  attackerPokemon?: Pokemon | null;
  defenderPokemon?: Pokemon | null;
  attackerAbility?: Ability | null;
  weather?: Weather;
  field?: Field;
  uiOptionChecked?: { [key: string]: boolean };
}

export interface MoveDynamicProperties {
  type?: PokemonType;
  power?: number;
  isSpread?: boolean;
}

export interface MoveUiOption {
  type: 'checkbox';
  label: string;
  key: string;
}

export interface Move {
  id: string;
  name: string;
  type: PokemonType;
  category: MoveCategory;
  power: number;
  accuracy: number;
  pp: number;
  description?: string;
  isSpread?: boolean;
  recoil?: boolean;
  hasHighJumpKickRecoil?: boolean;
  isPunch?: boolean;
  isSlash?: boolean;
  makesContact?: boolean;
  isSoundBased?: boolean;
  isBiting?: boolean;
  isPulseAura?: boolean;
  hasSecondaryEffect?: boolean;
  affectedBySheerForceNegative?: boolean;
  isTeraBlast?: boolean;
  multihit?: number | "2-5";
  uiOption?: MoveUiOption;
  dynamicEffectId?: string;
  isRankBasedPower?: boolean; // ★ 追加: アシストパワー/つけあがるのような威力変動技かを示すフラグ
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  effect: {
    type: 'multiplier' | 'none';
    stat?: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'hp' | 'damage';
    value?: number;
    side: 'attacker' | 'defender' | 'both';
  };
  typeEnhance?: PokemonType;
}

export interface DamageCalculation {
  minDamage: number;
  maxDamage: number;
  critMinDamage: number;
  critMaxDamage: number;
  minPercentage: number;
  maxPercentage: number;
  critMinPercentage: number;
  critMaxPercentage: number;
  effectiveness: number;
  teraBoost: number;
  normalDamages: number[];
  criticalDamages: number[];
}

export type NatureModifier = 0.9 | 1.0 | 1.1;

export interface StatCalculation {
  base: number;
  iv: number;
  ev: number;
  nature: NatureModifier;
  rank: number;
  final: number;
}

export interface BattleStats {
  hp: StatCalculation;
  attack: StatCalculation;
  defense: StatCalculation;
  specialAttack: StatCalculation;
  specialDefense: StatCalculation;
  speed: StatCalculation;
}

export type ProtosynthesisBoostTarget = 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;
export type QuarkDriveBoostTarget = 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;

// --- AttackerStateとDefenderStateのスナップショット用インターフェース (IDで保存) ---
export interface StatCalculationSnapshot {
  iv: number;
  ev: number;
  nature: NatureModifier;
  rank: number;
  // base と final はロード時に再計算するため不要
}

export interface AttackerStateSnapshotForLog {
  pokemonId: string | number | null;
  moveId: string | null;
  itemId: string | null;
  abilityId: string | null;
  attackStat: StatCalculationSnapshot;
  specialAttackStat: StatCalculationSnapshot;
  defenseStat: StatCalculationSnapshot;
  speedStat: StatCalculationSnapshot;
  hpEv: number;
  currentHp: number;
  // actualMaxHp はロード時に再計算
  teraType: PokemonType | null;
  loadedTeraType: PokemonType | null; // ★ 追加
  isStellar: boolean;
  isBurned: boolean;
  hasHelpingHand: boolean;
  hasFlowerGift: boolean; // 念のため追加
  teraBlastUserSelectedCategory: 'physical' | 'special' | 'auto';
  starstormDeterminedCategory: MoveCategory | null; // ★ テラクラスター用カテゴリ
  photonGeyserDeterminedCategory: MoveCategory | null; // ★ フォトンゲイザー用カテゴリ
  selectedHitCount: number | null;
  protosynthesisBoostedStat: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger: boolean;
  quarkDriveBoostedStat: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger: boolean;
  moveUiOptionStates: { [key: string]: boolean };
}

export interface DefenderStateSnapshotForLog {
  pokemonId: string | number | null;
  itemId: string | null;
  abilityId: string | null;
  hpStat: StatCalculationSnapshot;
  defenseStat: StatCalculationSnapshot;
  specialDefenseStat: StatCalculationSnapshot;
  attackStat: StatCalculationSnapshot; // イカサマ用
  speedStat: StatCalculationSnapshot;
  hpEv: number;
  // actualMaxHp はロード時に再計算
  teraType: PokemonType | null;
  isStellar: boolean; // DefenderStateには元々あったが、ログに含めるように明示
  isBurned: boolean; // DefenderStateには元々あったが、ログに含めるように明示
  hasFlowerGift: boolean; // 念のため追加
  userModifiedTypes: [PokemonType, PokemonType?] | null; // ユーザーが手動変更したタイプ
  // isEnabled は常に true としてロードされるため不要
  protosynthesisBoostedStat: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger: boolean;
  quarkDriveBoostedStat: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger: boolean;
}

export interface GlobalStatesSnapshotForLog {
    isDoubleBattle: boolean;
    weather: Weather;
    field: Field;
    disasters: DisasterState;
    hasReflect: boolean;
    hasLightScreen: boolean;
    hasFriendGuard: boolean;
    defenderIsTerastallized: boolean;
}

// --- ここまでスナップショット用インターフェース ---


export interface AttackerState {
  pokemon: Pokemon | null;
  move: Move | null;
  effectiveMove: Move | null;
  item: Item | null;
  ability: Ability | null;
  attackStat: StatCalculation;
  specialAttackStat: StatCalculation;
  defenseStat: StatCalculation;
  // ▼▼▼ ここから追加/変更 ▼▼▼
  specialDefenseStat: StatCalculation; // 特防情報を追加
  // ▲▲▲ ここまで追加/変更 ▲▲▲
  speedStat: StatCalculation;
  attackInputValue: string;
  specialAttackInputValue: string;
  defenseInputValue: string;
  // ▼▼▼ ここから追加/変更 ▼▼▼
  specialDefenseInputValue: string; // 特防入力値も追加
  // ▲▲▲ ここまで追加/変更 ▲▲▲
  speedInputValue: string;
  hpEv: number;
  actualMaxHp: number;
  currentHp: number;
  teraType: PokemonType | null;
  loadedTeraType: PokemonType | null; // ★ 追加
  isStellar: boolean;
  isBurned: boolean;
  hasHelpingHand: boolean;
  hasFlowerGift: boolean;
  isEnabled: boolean;
  teraBlastUserSelectedCategory: 'physical' | 'special' | 'auto';
  teraBlastDeterminedType: TeraBurstEffectiveType | null; // テラバーストの実際のタイプ
  teraBlastDeterminedCategory: MoveCategory | null; // テラバーストの実際のカテゴリ
  starstormDeterminedCategory: MoveCategory | null; // ★ テラクラスターの実際のカテゴリ
  selectedHitCount: number | null; // 連続技の選択回数
  protosynthesisBoostedStat: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger: boolean;
  quarkDriveBoostedStat: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger: boolean;
  moveUiOptionStates: { [key: string]: any }; // ★ 任意の値を保存できるように any に変更 (もしくはより具体的な型を指定)
  loadedMoves?: (Move | null)[] | null; // ★ チーム
  abilityUiFlags: { [key: string]: boolean }; // ★追加: 特性固有UIの状態 (例: { 'guts_active': true })
  photonGeyserDeterminedCategory: MoveCategory | null; // ★
}

export interface DefenderState {
  pokemon: Pokemon | null;
  item: Item | null;
  ability: Ability | null;
  hpStat: StatCalculation;
  defenseStat: StatCalculation;
  specialDefenseStat: StatCalculation;
  attackStat: StatCalculation;
  // ▼▼▼ ここから追加/変更 ▼▼▼
  specialAttackStat: StatCalculation; // 特攻情報を追加
  // ▲▲▲ ここまで追加/変更 ▲▲▲
  speedStat: StatCalculation;
  hpInputValue: string;
  defenseInputValue: string;
  specialDefenseInputValue: string;
  // ▼▼▼ ここから追加/変更 ▼▼▼
  specialAttackInputValue: string; // 特攻入力値も追加
  // ▲▲▲ ここまで追加/変更 ▲▲▲
  speedInputValue: string;
  hpEv: number; // HP努力値 (hpStat.evと同期)
  actualMaxHp: number; // 実際の最大HP (hpStat.finalと同期)
  teraType: PokemonType | null;
  isStellar: boolean;
  isBurned: boolean;
  hasFlowerGift: boolean;
  isEnabled: boolean; // 常にtrueだが型定義としては保持
  protosynthesisBoostedStat: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger: boolean;
  quarkDriveBoostedStat: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger: boolean;
}

export interface TeamMemberForAttackerLoad {
  pokemon: Pokemon;
  item: Item | null;
  ability: Ability | null;
  teraType: PokemonType;
  nature: { nameEn: string; } | null;
  evs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  ivs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  moves: (Move | null)[];
  level: number;
  protosynthesisBoostedStat?: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger?: boolean;
  quarkDriveBoostedStat?: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger?: boolean;
}

export interface TeamMemberForDefenderLoad {
  pokemon: Pokemon;
  item: Item | null;
  ability: Ability | null;
  teraType: PokemonType;
  nature: { nameEn: string; } | null;
  evs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  ivs: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; };
  protosynthesisBoostedStat?: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger?: boolean;
  quarkDriveBoostedStat?: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger?: boolean;
}

export interface AbilityUiTrigger {
  key: string; // AttackerStateのabilityUiFlagsのキーと対応 (例: 'guts_active')
  label: string; // チェックボックスのラベル
  type: 'checkbox'; // 現状はチェックボックスのみ想定
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  side: 'attacker' | 'defender' | 'both';
  uiTriggers?: AbilityUiTrigger[]; // ★追加
}

export type StatType = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;

export interface Nature {
  name: string;
  nameEn: string;
  increasedStat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;
  decreasedStat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;
}

export interface AttackerDetailsForModal {
  pokemonId: number | string;
  pokemonName: string;
  movePower: number;
  moveCategory?: MoveCategory;
  offensiveStatValue: number;
  offensiveStatRank: number;
  teraType: PokemonType | null;
  isStellar: boolean;
  item: string | null;
  ability: string | null;
  isBurned: boolean;
  hasHelpingHand: boolean;
  displayTypes: [PokemonType, PokemonType?] | ['stellar'];
}

export interface DefenderDetailsForModal {
  pokemonId: number | string;
  pokemonName: string;
  maxHp?: number;
  defensiveStatValue: number;
  defensiveStatType?: 'defense' | 'specialDefense';
  defensiveStatRank: number;
  item: string | null;
  ability: string | null;
  hasReflect: boolean;
  hasLightScreen: boolean;
  hasFriendGuard: boolean;
  displayTypes: [PokemonType, PokemonType?];
}

export interface LoggedDamageEntry {
  id: string;
  timestamp: number;
  attackerDetails: AttackerDetailsForModal; // モーダル表示用の既存情報
  defenderDetails: DefenderDetailsForModal; // モーダル表示用の既存情報
  result: DamageCalculation;
  defenderOriginalHP: number; // モーダル表示用 (defenderStateSnapshot.hpStat から再計算可能)
  attackerPokemonName: string; // モーダル表示用
  attackerMoveName: string; // モーダル表示用
  defenderPokemonName: string; // モーダル表示用
  hitCount: number; // モーダル表示用 (attackerStateSnapshot.selectedHitCount から取得可能)

  // --- 計算再現用のスナップショット情報 ---
  attackerStateSnapshot: AttackerStateSnapshotForLog;
  defenderStateSnapshot: DefenderStateSnapshotForLog;
  globalStatesSnapshot: GlobalStatesSnapshotForLog;

  // isDoubleBattle, weather, field, disasters は globalStatesSnapshot に移動
  // これらは元々モーダル表示用にも使われていたが、再現時には globalStatesSnapshot から取得
}