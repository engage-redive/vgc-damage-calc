import { Pokemon, PokemonType } from '../types';

// Sample Pokémon data for demonstration purposes
export const samplePokemon: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: ["grass", "poison"],
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45
    },
    abilities: ["Overgrow", "Chlorophyll"],
    height: 0.7,
    weight: 6.9
  },
  {
    id: 4,
    name: "Charmander",
    types: ["fire"],
    baseStats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65
    },
    abilities: ["Blaze", "Solar Power"],
    height: 0.6,
    weight: 8.5
  },
  {
    id: 7,
    name: "Squirtle",
    types: ["water"],
    baseStats: {
      hp: 44,
      attack: 48,
      defense: 65,
      specialAttack: 50,
      specialDefense: 64,
      speed: 43
    },
    abilities: ["Torrent", "Rain Dish"],
    height: 0.5,
    weight: 9.0
  },
  {
    id: 25,
    name: "Pikachu",
    types: ["electric"],
    baseStats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90
    },
    abilities: ["Static", "Lightning Rod"],
    height: 0.4,
    weight: 6.0
  },
  {
    id: 94,
    name: "Gengar",
    types: ["ghost", "poison"],
    baseStats: {
      hp: 60,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110
    },
    abilities: ["Cursed Body"],
    height: 1.5,
    weight: 40.5
  },
  {
    id: 149,
    name: "Dragonite",
    types: ["dragon", "flying"],
    baseStats: {
      hp: 91,
      attack: 134,
      defense: 95,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80
    },
    abilities: ["Inner Focus", "Multiscale"],
    height: 2.2,
    weight: 210.0
  }
];

export const sampleMoves = [
  {
    id: 1,
    name: "Tackle",
    type: "normal" as PokemonType,
    category: "physical" as const,
    power: 40,
    accuracy: 100,
    pp: 35,
    description: "A physical attack in which the user charges and slams into the target with its whole body."
  },
  {
    id: 2,
    name: "Ember",
    type: "fire" as PokemonType,
    category: "special" as const,
    power: 40,
    accuracy: 100,
    pp: 25,
    description: "The target is attacked with small flames. This may also leave the target with a burn."
  },
  {
    id: 3,
    name: "Water Gun",
    type: "water" as PokemonType,
    category: "special" as const,
    power: 40,
    accuracy: 100,
    pp: 25,
    description: "The target is blasted with a forceful shot of water."
  },
  {
    id: 4,
    name: "Thunderbolt",
    type: "electric" as PokemonType,
    category: "special" as const,
    power: 90,
    accuracy: 100,
    pp: 15,
    description: "A strong electric blast crashes down on the target. This may also leave the target with paralysis."
  },
  {
    id: 5,
    name: "Psychic",
    type: "psychic" as PokemonType,
    category: "special" as const,
    power: 90,
    accuracy: 100,
    pp: 10,
    description: "The target is hit by a strong telekinetic force. This may also lower the target's Sp. Def stat."
  },
  {
    id: 6,
    name: "Earthquake",
    type: "ground" as PokemonType,
    category: "physical" as const,
    power: 100,
    accuracy: 100,
    pp: 10,
    description: "The user sets off an earthquake that strikes every Pokémon around it."
  },
  {
    id: 7,
    name: "Ice Beam",
    type: "ice" as PokemonType,
    category: "special" as const,
    power: 90,
    accuracy: 100,
    pp: 10,
    description: "The target is struck with an icy-cold beam of energy. This may also leave the target frozen."
  },
  {
    id: 8,
    name: "Close Combat",
    type: "fighting" as PokemonType,
    category: "physical" as const,
    power: 120,
    accuracy: 100,
    pp: 5,
    description: "The user fights the target up close without guarding itself. This also lowers the user's Defense and Sp. Def stats."
  },
  {
    id: 9,
    name: "Moonblast",
    type: "fairy" as PokemonType,
    category: "special" as const,
    power: 95,
    accuracy: 100,
    pp: 15,
    description: "Borrowing the power of the moon, the user attacks the target. This may also lower the target's Sp. Atk stat."
  }
];