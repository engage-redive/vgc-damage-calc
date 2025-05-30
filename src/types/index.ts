// types.ts or index.ts

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

export type TeraBurstEffectiveType = PokemonType | 'stellar';

export type Weather = 'none' | 'sun' | 'rain' | 'sandstorm' | 'snow' | 'harsh_sunlight' | 'heavy_rain';

export const enum Field {
  None = 'none',
  Electric = 'electric',
  Grassy = 'grassy',
  Psychic = 'psychic',
  Misty = 'misty'
}

export type MoveCategory = 'physical' | 'special' | 'status';

export interface DisasterState {
  sword: boolean;
  ball: boolean;
  vessel: boolean;
  talisman: boolean;
}

export interface MoveDynamicContext {
  attackerPokemon?: Pokemon | null; // Pokemonオブジェクトを許容
  attackerAbility?: Ability | null; // 追加: ワイドフォースの浮遊判定用
  weather?: Weather;
  field?: Field; // 追加: ワイドフォースのフィールド判定用
  uiOptionChecked?: { [key: string]: boolean };
  // isHexBoosted?: boolean; // uiOptionCheckedに統合
}

export interface MoveDynamicProperties { // もし MoveDynamicResult をグローバルに使うならこの名前
  type?: PokemonType;
  power?: number;
  isSpread?: boolean; // 追加: ワイドフォースの範囲変更用
  // 他に動的に変化する可能性のあるプロパティ
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
  isSpread?: boolean; // 基本的な範囲攻撃技か (ワイドフォースでは動的に変更)
  recoil?: boolean;
  hasHighJumpKickRecoil?: boolean;
  isPunch?: boolean;
  makesContact?: boolean;
  isSoundBased?: boolean;
  isBiting?: boolean;
  isPulseAura?: boolean;
  hasSecondaryEffect?: boolean;
  affectedBySheerForceNegative?: boolean;
  isTeraBlast?: boolean;
  multihit?: number | "2-5"; // 2-5回攻撃を表現できるように修正
  uiOption?: MoveUiOption; // uiOption の型を具体的に定義
  dynamicEffectId?: string; // 追加: 技の動的効果を識別するためのID
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


export interface AttackerState {
  pokemon: Pokemon | null;
  move: Move | null;
  item: Item | null;
  ability: Ability | null;
  attackStat: StatCalculation;
  specialAttackStat: StatCalculation;
  defenseStat: StatCalculation;
  speedStat: StatCalculation;
  attackInputValue: string;
  specialAttackInputValue: string;
  defenseInputValue: string;
  speedInputValue: string;
  hpEv: number;
  actualMaxHp: number;
  currentHp: number;
  teraType: PokemonType | null;
  isStellar: boolean;
  isBurned: boolean;
  hasHelpingHand: boolean;
  hasFlowerGift: boolean;
  isEnabled: boolean;
  teraBlastUserSelectedCategory: 'physical' | 'special' | 'auto';
  teraBlastDeterminedType: TeraBurstEffectiveType | null;
  teraBlastDeterminedCategory: MoveCategory | null;
  selectedHitCount: number | null;
  protosynthesisBoostedStat: ProtosynthesisBoostTarget | null;
  protosynthesisManualTrigger: boolean;
  quarkDriveBoostedStat: QuarkDriveBoostTarget | null;
  quarkDriveManualTrigger: boolean;
  moveUiOptionStates: { [key: string]: boolean }; // 追加
}

export interface DefenderState {
  pokemon: Pokemon | null;
  item: Item | null;
  ability: Ability | null;
  hpStat: StatCalculation;
  defenseStat: StatCalculation;
  specialDefenseStat: StatCalculation;
  attackStat: StatCalculation;
  speedStat: StatCalculation;
  hpInputValue: string;
  defenseInputValue: string;
  specialDefenseInputValue: string;
  speedInputValue: string;
  hpEv: number;
  actualMaxHp: number;
  teraType: PokemonType | null;
  isStellar: boolean;
  isBurned: boolean;
  hasFlowerGift: boolean;
  isEnabled: boolean;
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

export interface Ability {
  id: string;
  name: string;
  description: string;
  side: 'attacker' | 'defender' | 'both';
}
export type StatType = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;

export interface Nature { // types.ts に Nature の定義がなかったので追加
    name: string;
    nameEn: string;
    increasedStat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;
    decreasedStat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | null;
}