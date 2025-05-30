import { Pokemon } from '../types';

export const pokedex: Pokemon[] = [
  {
    id: 149,
    name: "カイリュー",
    nameEn: "Dragonite",
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
  },
  {
    "id": 1,
    "name": "フシギダネ",
    "nameEn": "Bulbasaur",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 45,
      "attack": 49,
      "defense": 49,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 45
    },
    "abilities": ["Overgrow", "Chlorophyll"],
    "height": 0.7,
    "weight": 6.9
  },
  {
    "id": 2,
    "name": "フシギソウ",
    "nameEn": "Ivysaur",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 62,
      "defense": 63,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 60
    },
    "abilities": ["Overgrow", "Chlorophyll"],
    "height": 1,
    "weight": 13
  },
  {
    "id": 3,
    "name": "フシギバナ",
    "nameEn": "Venusaur",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 80,
      "attack": 82,
      "defense": 83,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 80
    },
    "abilities": ["Overgrow", "Chlorophyll"],
    "height": 2,
    "weight": 100
  },
  {
    "id": 4,
    "name": "ヒトカゲ",
    "nameEn": "Charmander",
    "types": ["fire"],
    "baseStats": {
      "hp": 39,
      "attack": 52,
      "defense": 43,
      "specialAttack": 60,
      "specialDefense": 50,
      "speed": 65
    },
    "abilities": ["Blaze", "Solar Power"],
    "height": 0.6,
    "weight": 8.5
  },
  {
    "id": 5,
    "name": "リザード",
    "nameEn": "Charmeleon",
    "types": ["fire"],
    "baseStats": {
      "hp": 58,
      "attack": 64,
      "defense": 58,
      "specialAttack": 80,
      "specialDefense": 65,
      "speed": 80
    },
    "abilities": ["Blaze", "Solar Power"],
    "height": 1.1,
    "weight": 19
  },
  {
    "id": 6,
    "name": "リザードン",
    "nameEn": "Charizard",
    "types": ["fire", "flying"],
    "baseStats": {
      "hp": 78,
      "attack": 84,
      "defense": 78,
      "specialAttack": 109,
      "specialDefense": 85,
      "speed": 100
    },
    "abilities": ["Blaze", "Solar Power"],
    "height": 1.7,
    "weight": 90.5
  },
  {
    "id": 7,
    "name": "ゼニガメ",
    "nameEn": "Squirtle",
    "types": ["water"],
    "baseStats": {
      "hp": 44,
      "attack": 48,
      "defense": 65,
      "specialAttack": 50,
      "specialDefense": 64,
      "speed": 43
    },
    "abilities": ["Torrent", "Rain Dish"],
    "height": 0.5,
    "weight": 9
  },
  {
    "id": 8,
    "name": "カメール",
    "nameEn": "Wartortle",
    "types": ["water"],
    "baseStats": {
      "hp": 59,
      "attack": 63,
      "defense": 80,
      "specialAttack": 65,
      "specialDefense": 80,
      "speed": 58
    },
    "abilities": ["Torrent", "Rain Dish"],
    "height": 1,
    "weight": 22.5
  },
  {
    "id": 9,
    "name": "カメックス",
    "nameEn": "Blastoise",
    "types": ["water"],
    "baseStats": {
      "hp": 79,
      "attack": 83,
      "defense": 100,
      "specialAttack": 85,
      "specialDefense": 105,
      "speed": 78
    },
    "abilities": ["Torrent", "Rain Dish"],
    "height": 1.6,
    "weight": 85.5
  },
  {
    "id": 10,
    "name": "キャタピー",
    "nameEn": "Caterpie",
    "types": ["bug"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 35,
      "specialAttack": 20,
      "specialDefense": 20,
      "speed": 45
    },
    "abilities": ["Shield Dust", "Run Away"],
    "height": 0.3,
    "weight": 2.9
  },
  {
    "id": 11,
    "name": "トランセル",
    "nameEn": "Metapod",
    "types": ["bug"],
    "baseStats": {
      "hp": 50,
      "attack": 20,
      "defense": 55,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 30
    },
    "abilities": ["Shed Skin"],
    "height": 0.7,
    "weight": 9.9
  },
  {
    "id": 12,
    "name": "バタフリー",
    "nameEn": "Butterfree",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 45,
      "defense": 50,
      "specialAttack": 90,
      "specialDefense": 80,
      "speed": 70
    },
    "abilities": ["Compound Eyes", "Tinted Lens"],
    "height": 1.1,
    "weight": 32
  },
  {
    "id": 13,
    "name": "ビードル",
    "nameEn": "Weedle",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 40,
      "attack": 35,
      "defense": 30,
      "specialAttack": 20,
      "specialDefense": 20,
      "speed": 50
    },
    "abilities": ["Shield Dust", "Run Away"],
    "height": 0.3,
    "weight": 3.2
  },
  {
    "id": 14,
    "name": "コクーン",
    "nameEn": "Kakuna",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 45,
      "attack": 25,
      "defense": 50,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 35
    },
    "abilities": ["Shed Skin"],
    "height": 0.6,
    "weight": 10
  },
  {
    "id": 15,
    "name": "スピアー",
    "nameEn": "Beedrill",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 40,
      "specialAttack": 45,
      "specialDefense": 80,
      "speed": 75
    },
    "abilities": ["Swarm", "Sniper"],
    "height": 1,
    "weight": 29.5
  },
  {
    "id": 16,
    "name": "ポッポ",
    "nameEn": "Pidgey",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 40,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 56
    },
    "abilities": ["Keen Eye", "Tangled Feet", "Big Pecks"],
    "height": 0.3,
    "weight": 1.8
  },
  {
    "id": 17,
    "name": "ピジョン",
    "nameEn": "Pidgeotto",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 63,
      "attack": 60,
      "defense": 55,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 71
    },
    "abilities": ["Keen Eye", "Tangled Feet", "Big Pecks"],
    "height": 1.1,
    "weight": 30
  },
  {
    "id": 18,
    "name": "ピジョット",
    "nameEn": "Pidgeot",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 83,
      "attack": 80,
      "defense": 75,
      "specialAttack": 70,
      "specialDefense": 70,
      "speed": 101
    },
    "abilities": ["Keen Eye", "Tangled Feet", "Big Pecks"],
    "height": 1.5,
    "weight": 39.5
  },
  {
    "id": 19,
    "name": "コラッタ",
    "nameEn": "Rattata",
    "types": ["normal"],
    "baseStats": {
      "hp": 30,
      "attack": 56,
      "defense": 35,
      "specialAttack": 25,
      "specialDefense": 35,
      "speed": 72
    },
    "abilities": ["Run Away", "Guts", "Hustle"],
    "height": 0.3,
    "weight": 3.5
  },
  {
    "id": 19,
    "name": "コラッタ (アローラのすがた)",
    "nameEn": "Rattata-Alola",
    "types": ["dark", "normal"],
    "baseStats": {
      "hp": 30,
      "attack": 56,
      "defense": 35,
      "specialAttack": 25,
      "specialDefense": 35,
      "speed": 72
    },
    "abilities": ["Gluttony", "Hustle", "Thick Fat"],
    "height": 0.3,
    "weight": 3.8
  },
  {
    "id": 20,
    "name": "ラッタ",
    "nameEn": "Raticate",
    "types": ["normal"],
    "baseStats": {
      "hp": 55,
      "attack": 81,
      "defense": 60,
      "specialAttack": 50,
      "specialDefense": 70,
      "speed": 97
    },
    "abilities": ["Run Away", "Guts", "Hustle"],
    "height": 0.7,
    "weight": 18.5
  },
  {
    "id": 20,
    "name": "ラッタ (アローラのすがた)",
    "nameEn": "Raticate-Alola",
    "types": ["dark", "normal"],
    "baseStats": {
      "hp": 75,
      "attack": 71,
      "defense": 70,
      "specialAttack": 40,
      "specialDefense": 80,
      "speed": 77
    },
    "abilities": ["Gluttony", "Hustle", "Thick Fat"],
    "height": 0.7,
    "weight": 25.5
  },
  {
    "id": 21,
    "name": "オニスズメ",
    "nameEn": "Spearow",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 60,
      "defense": 30,
      "specialAttack": 31,
      "specialDefense": 31,
      "speed": 70
    },
    "abilities": ["Keen Eye", "Sniper"],
    "height": 0.3,
    "weight": 2
  },
  {
    "id": 22,
    "name": "オニドリル",
    "nameEn": "Fearow",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 65,
      "specialAttack": 61,
      "specialDefense": 61,
      "speed": 100
    },
    "abilities": ["Keen Eye", "Sniper"],
    "height": 1.2,
    "weight": 38
  },
  {
    "id": 23,
    "name": "アーボ",
    "nameEn": "Ekans",
    "types": ["poison"],
    "baseStats": {
      "hp": 35,
      "attack": 60,
      "defense": 44,
      "specialAttack": 40,
      "specialDefense": 54,
      "speed": 55
    },
    "abilities": ["Intimidate", "Shed Skin", "Unnerve"],
    "height": 2,
    "weight": 6.9
  },
  {
    "id": 24,
    "name": "アーボック",
    "nameEn": "Arbok",
    "types": ["poison"],
    "baseStats": {
      "hp": 60,
      "attack": 95,
      "defense": 69,
      "specialAttack": 65,
      "specialDefense": 79,
      "speed": 80
    },
    "abilities": ["Intimidate", "Shed Skin", "Unnerve"],
    "height": 3.5,
    "weight": 65
  },
  {
    "id": 25,
    "name": "ピカチュウ",
    "nameEn": "Pikachu",
    "types": ["electric"],
    "baseStats": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 90
    },
    "abilities": ["Static", "Lightning Rod"],
    "height": 0.4,
    "weight": 6
  },
  {
    "id": 26,
    "name": "ライチュウ",
    "nameEn": "Raichu",
    "types": ["electric"],
    "baseStats": {
      "hp": 60,
      "attack": 90,
      "defense": 55,
      "specialAttack": 90,
      "specialDefense": 80,
      "speed": 110
    },
    "abilities": ["Static", "Lightning Rod"],
    "height": 0.8,
    "weight": 30
  },
  {
    "id": 26,
    "name": "ライチュウ (アローラのすがた)",
    "nameEn": "Raichu-Alola",
    "types": ["electric", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 50,
      "specialAttack": 95,
      "specialDefense": 85,
      "speed": 110
    },
    "abilities": ["Surge Surfer"],
    "height": 0.7,
    "weight": 21
  },
  {
    "id": 27,
    "name": "サンド",
    "nameEn": "Sandshrew",
    "types": ["ground"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 85,
      "specialAttack": 20,
      "specialDefense": 30,
      "speed": 40
    },
    "abilities": ["Sand Veil", "Sand Rush"],
    "height": 0.6,
    "weight": 12
  },
  {
    "id": 27,
    "name": "サンド (アローラのすがた)",
    "nameEn": "Sandshrew-Alola",
    "types": ["ice", "steel"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 90,
      "specialAttack": 10,
      "specialDefense": 35,
      "speed": 40
    },
    "abilities": ["Snow Cloak", "Slush Rush"],
    "height": 0.7,
    "weight": 40
  },
  {
    "id": 28,
    "name": "サンドパン",
    "nameEn": "Sandslash",
    "types": ["ground"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 110,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 65
    },
    "abilities": ["Sand Veil", "Sand Rush"],
    "height": 1,
    "weight": 29.5
  },
  {
    "id": 28,
    "name": "サンドパン (アローラのすがた)",
    "nameEn": "Sandslash-Alola",
    "types": ["ice", "steel"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 120,
      "specialAttack": 25,
      "specialDefense": 65,
      "speed": 65
    },
    "abilities": ["Snow Cloak", "Slush Rush"],
    "height": 1.2,
    "weight": 55
  },
  {
    "id": 29,
    "name": "ニドラン♀",
    "nameEn": "Nidoran-F",
    "types": ["poison"],
    "baseStats": {
      "hp": 55,
      "attack": 47,
      "defense": 52,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 41
    },
    "abilities": ["Poison Point", "Rivalry", "Hustle"],
    "height": 0.4,
    "weight": 7
  },
  {
    "id": 30,
    "name": "ニドリーナ",
    "nameEn": "Nidorina",
    "types": ["poison"],
    "baseStats": {
      "hp": 70,
      "attack": 62,
      "defense": 67,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 56
    },
    "abilities": ["Poison Point", "Rivalry", "Hustle"],
    "height": 0.8,
    "weight": 20
  },
  {
    "id": 31,
    "name": "ニドクイン",
    "nameEn": "Nidoqueen",
    "types": ["poison", "ground"],
    "baseStats": {
      "hp": 90,
      "attack": 92,
      "defense": 87,
      "specialAttack": 75,
      "specialDefense": 85,
      "speed": 76
    },
    "abilities": ["Poison Point", "Rivalry", "Sheer Force"],
    "height": 1.3,
    "weight": 60
  },
  {
    "id": 32,
    "name": "ニドラン♂",
    "nameEn": "Nidoran-M",
    "types": ["poison"],
    "baseStats": {
      "hp": 46,
      "attack": 57,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 50
    },
    "abilities": ["Poison Point", "Rivalry", "Hustle"],
    "height": 0.5,
    "weight": 9
  },
  {
    "id": 33,
    "name": "ニドリーノ",
    "nameEn": "Nidorino",
    "types": ["poison"],
    "baseStats": {
      "hp": 61,
      "attack": 72,
      "defense": 57,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 65
    },
    "abilities": ["Poison Point", "Rivalry", "Hustle"],
    "height": 0.9,
    "weight": 19.5
  },
  {
    "id": 34,
    "name": "ニドキング",
    "nameEn": "Nidoking",
    "types": ["poison", "ground"],
    "baseStats": {
      "hp": 81,
      "attack": 102,
      "defense": 77,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 85
    },
    "abilities": ["Poison Point", "Rivalry", "Sheer Force"],
    "height": 1.4,
    "weight": 62
  },
  {
    "id": 35,
    "name": "ピッピ",
    "nameEn": "Clefairy",
    "types": ["fairy"],
    "baseStats": {
      "hp": 70,
      "attack": 45,
      "defense": 48,
      "specialAttack": 60,
      "specialDefense": 65,
      "speed": 35
    },
    "abilities": ["Cute Charm", "Magic Guard", "Friend Guard"],
    "height": 0.6,
    "weight": 7.5
  },
  {
    "id": 36,
    "name": "ピクシー",
    "nameEn": "Clefable",
    "types": ["fairy"],
    "baseStats": {
      "hp": 95,
      "attack": 70,
      "defense": 73,
      "specialAttack": 95,
      "specialDefense": 90,
      "speed": 60
    },
    "abilities": ["Cute Charm", "Magic Guard", "Unaware"],
    "height": 1.3,
    "weight": 40
  },
  {
    "id": 37,
    "name": "ロコン",
    "nameEn": "Vulpix",
    "types": ["fire"],
    "baseStats": {
      "hp": 38,
      "attack": 41,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 65,
      "speed": 65
    },
    "abilities": ["Flash Fire", "Drought"],
    "height": 0.6,
    "weight": 9.9
  },
  {
    "id": 37,
    "name": "ロコン (アローラのすがた)",
    "nameEn": "Vulpix-Alola",
    "types": ["ice"],
    "baseStats": {
      "hp": 38,
      "attack": 41,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 65,
      "speed": 65
    },
    "abilities": ["Snow Cloak", "Snow Warning"],
    "height": 0.6,
    "weight": 9.9
  },
  {
    "id": 38,
    "name": "キュウコン",
    "nameEn": "Ninetales",
    "types": ["fire"],
    "baseStats": {
      "hp": 73,
      "attack": 76,
      "defense": 75,
      "specialAttack": 81,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Flash Fire", "Drought"],
    "height": 1.1,
    "weight": 19.9
  },
  {
    "id": 38,
    "name": "キュウコン (アローラのすがた)",
    "nameEn": "Ninetales-Alola",
    "types": ["ice", "fairy"],
    "baseStats": {
      "hp": 73,
      "attack": 67,
      "defense": 75,
      "specialAttack": 81,
      "specialDefense": 100,
      "speed": 109
    },
    "abilities": ["Snow Cloak", "Snow Warning"],
    "height": 1.1,
    "weight": 19.9
  },
  {
    "id": 39,
    "name": "プリン",
    "nameEn": "Jigglypuff",
    "types": ["normal", "fairy"],
    "baseStats": {
      "hp": 115,
      "attack": 45,
      "defense": 20,
      "specialAttack": 45,
      "specialDefense": 25,
      "speed": 20
    },
    "abilities": ["Cute Charm", "Competitive", "Friend Guard"],
    "height": 0.5,
    "weight": 5.5
  },
  {
    "id": 40,
    "name": "プクリン",
    "nameEn": "Wigglytuff",
    "types": ["normal", "fairy"],
    "baseStats": {
      "hp": 140,
      "attack": 70,
      "defense": 45,
      "specialAttack": 85,
      "specialDefense": 50,
      "speed": 45
    },
    "abilities": ["Cute Charm", "Competitive", "Frisk"],
    "height": 1,
    "weight": 12
  },
  {
    "id": 41,
    "name": "ズバット",
    "nameEn": "Zubat",
    "types": ["poison", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 35,
      "specialAttack": 30,
      "specialDefense": 40,
      "speed": 55
    },
    "abilities": ["Inner Focus", "Infiltrator"],
    "height": 0.8,
    "weight": 7.5
  },
  {
    "id": 42,
    "name": "ゴルバット",
    "nameEn": "Golbat",
    "types": ["poison", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 70,
      "specialAttack": 65,
      "specialDefense": 75,
      "speed": 90
    },
    "abilities": ["Inner Focus", "Infiltrator"],
    "height": 1.6,
    "weight": 55
  },
  {
    "id": 43,
    "name": "ナゾノクサ",
    "nameEn": "Oddish",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 55,
      "specialAttack": 75,
      "specialDefense": 65,
      "speed": 30
    },
    "abilities": ["Chlorophyll", "Run Away"],
    "height": 0.5,
    "weight": 5.4
  },
  {
    "id": 44,
    "name": "クサイハナ",
    "nameEn": "Gloom",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 65,
      "defense": 70,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 40
    },
    "abilities": ["Chlorophyll", "Stench"],
    "height": 0.8,
    "weight": 8.6
  },
  {
    "id": 45,
    "name": "ラフレシア",
    "nameEn": "Vileplume",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 85,
      "specialAttack": 110,
      "specialDefense": 90,
      "speed": 50
    },
    "abilities": ["Chlorophyll", "Effect Spore"],
    "height": 1.2,
    "weight": 18.6
  },
  {
    "id": 46,
    "name": "パラス",
    "nameEn": "Paras",
    "types": ["bug", "grass"],
    "baseStats": {
      "hp": 35,
      "attack": 70,
      "defense": 55,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 25
    },
    "abilities": ["Effect Spore", "Dry Skin", "Damp"],
    "height": 0.3,
    "weight": 5.4
  },
  {
    "id": 47,
    "name": "パラセクト",
    "nameEn": "Parasect",
    "types": ["bug", "grass"],
    "baseStats": {
      "hp": 60,
      "attack": 95,
      "defense": 80,
      "specialAttack": 60,
      "specialDefense": 80,
      "speed": 30
    },
    "abilities": ["Effect Spore", "Dry Skin", "Damp"],
    "height": 1,
    "weight": 29.5
  },
  {
    "id": 48,
    "name": "コンパン",
    "nameEn": "Venonat",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 55,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 55,
      "speed": 45
    },
    "abilities": ["Compound Eyes", "Tinted Lens", "Run Away"],
    "height": 1,
    "weight": 30
  },
  {
    "id": 49,
    "name": "モルフォン",
    "nameEn": "Venomoth",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 70,
      "attack": 65,
      "defense": 60,
      "specialAttack": 90,
      "specialDefense": 75,
      "speed": 90
    },
    "abilities": ["Shield Dust", "Tinted Lens", "Wonder Skin"],
    "height": 1.5,
    "weight": 12.5
  },
  {
    "id": 50,
    "name": "ディグダ",
    "nameEn": "Diglett",
    "types": ["ground"],
    "baseStats": {
      "hp": 10,
      "attack": 55,
      "defense": 25,
      "specialAttack": 35,
      "specialDefense": 45,
      "speed": 95
    },
    "abilities": ["Sand Veil", "Arena Trap", "Sand Force"],
    "height": 0.2,
    "weight": 0.8
  },
  {
    "id": 50,
    "name": "ディグダ (アローラのすがた)",
    "nameEn": "Diglett-Alola",
    "types": ["ground", "steel"],
    "baseStats": {
      "hp": 10,
      "attack": 55,
      "defense": 30,
      "specialAttack": 35,
      "specialDefense": 45,
      "speed": 90
    },
    "abilities": ["Sand Veil", "Tangling Hair", "Sand Force"],
    "height": 0.2,
    "weight": 1
  },
  
  {
    "id": 51,
    "name": "ダグトリオ",
    "nameEn": "Dugtrio",
    "types": ["ground"],
    "baseStats": {
      "hp": 35,
      "attack": 100,
      "defense": 50,
      "specialAttack": 50,
      "specialDefense": 70,
      "speed": 120
    },
    "abilities": ["Sand Veil", "Arena Trap", "Sand Force"],
    "height": 0.7,
    "weight": 33.3
  },
  {
    "id": 52,
    "name": "ニャース",
    "nameEn": "Meowth",
    "types": ["normal"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 35,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 90
    },
    "abilities": ["Pickup", "Technician", "Unnerve"],
    "height": 0.4,
    "weight": 4.2
  },
  {
    "id": 53,
    "name": "ペルシアン",
    "nameEn": "Persian",
    "types": ["normal"],
    "baseStats": {
      "hp": 65,
      "attack": 70,
      "defense": 60,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 115
    },
    "abilities": ["Limber", "Technician", "Unnerve"],
    "height": 1,
    "weight": 32
  },
  {
    "id": 54,
    "name": "コダック",
    "nameEn": "Psyduck",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 52,
      "defense": 48,
      "specialAttack": 65,
      "specialDefense": 50,
      "speed": 55
    },
    "abilities": ["Damp", "Cloud Nine", "Swift Swim"],
    "height": 0.8,
    "weight": 19.6
  },
  {
    "id": 55,
    "name": "ゴルダック",
    "nameEn": "Golduck",
    "types": ["water"],
    "baseStats": {
      "hp": 80,
      "attack": 82,
      "defense": 78,
      "specialAttack": 95,
      "specialDefense": 80,
      "speed": 85
    },
    "abilities": ["Damp", "Cloud Nine", "Swift Swim"],
    "height": 1.7,
    "weight": 76.6
  },
  {
    "id": 56,
    "name": "マンキー",
    "nameEn": "Mankey",
    "types": ["fighting"],
    "baseStats": {
      "hp": 40,
      "attack": 80,
      "defense": 35,
      "specialAttack": 35,
      "specialDefense": 45,
      "speed": 70
    },
    "abilities": ["Vital Spirit", "Anger Point", "Defiant"],
    "height": 0.5,
    "weight": 28
  },
  {
    "id": 57,
    "name": "オコリザル",
    "nameEn": "Primeape",
    "types": ["fighting"],
    "baseStats": {
      "hp": 65,
      "attack": 105,
      "defense": 60,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 95
    },
    "abilities": ["Vital Spirit", "Anger Point", "Defiant"],
    "height": 1,
    "weight": 32
  },
  {
    "id": 58,
    "name": "ガーディ",
    "nameEn": "Growlithe",
    "types": ["fire"],
    "baseStats": {
      "hp": 55,
      "attack": 70,
      "defense": 45,
      "specialAttack": 70,
      "specialDefense": 50,
      "speed": 60
    },
    "abilities": ["Intimidate", "Flash Fire", "Justified"],
    "height": 0.7,
    "weight": 19
  },
  {
    "id": 59,
    "name": "ウインディ",
    "nameEn": "Arcanine",
    "types": ["fire"],
    "baseStats": {
      "hp": 90,
      "attack": 110,
      "defense": 80,
      "specialAttack": 100,
      "specialDefense": 80,
      "speed": 95
    },
    "abilities": ["Intimidate", "Flash Fire", "Justified"],
    "height": 1.9,
    "weight": 155
  },
  {
    "id": 60,
    "name": "ニョロモ",
    "nameEn": "Poliwag",
    "types": ["water"],
    "baseStats": {
      "hp": 40,
      "attack": 50,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 90
    },
    "abilities": ["Water Absorb", "Damp", "Swift Swim"],
    "height": 0.6,
    "weight": 12.4
  },
  {
    "id": 61,
    "name": "ニョロゾ",
    "nameEn": "Poliwhirl",
    "types": ["water"],
    "baseStats": {
      "hp": 65,
      "attack": 65,
      "defense": 65,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 90
    },
    "abilities": ["Water Absorb", "Damp", "Swift Swim"],
    "height": 1,
    "weight": 20
  },
  {
    "id": 62,
    "name": "ニョロボン",
    "nameEn": "Poliwrath",
    "types": ["water", "fighting"],
    "baseStats": {
      "hp": 90,
      "attack": 95,
      "defense": 95,
      "specialAttack": 70,
      "specialDefense": 90,
      "speed": 70
    },
    "abilities": ["Water Absorb", "Damp", "Swift Swim"],
    "height": 1.3,
    "weight": 54
  },
  {
    "id": 63,
    "name": "ケーシィ",
    "nameEn": "Abra",
    "types": ["psychic"],
    "baseStats": {
      "hp": 25,
      "attack": 20,
      "defense": 15,
      "specialAttack": 105,
      "specialDefense": 55,
      "speed": 90
    },
    "abilities": ["Synchronize", "Inner Focus", "Magic Guard"],
    "height": 0.9,
    "weight": 19.5
  },
  {
    "id": 64,
    "name": "ユンゲラー",
    "nameEn": "Kadabra",
    "types": ["psychic"],
    "baseStats": {
      "hp": 40,
      "attack": 35,
      "defense": 30,
      "specialAttack": 120,
      "specialDefense": 70,
      "speed": 105
    },
    "abilities": ["Synchronize", "Inner Focus", "Magic Guard"],
    "height": 1.3,
    "weight": 56.5
  },
  {
    "id": 65,
    "name": "フーディン",
    "nameEn": "Alakazam",
    "types": ["psychic"],
    "baseStats": {
      "hp": 55,
      "attack": 50,
      "defense": 45,
      "specialAttack": 135,
      "specialDefense": 95,
      "speed": 120
    },
    "abilities": ["Synchronize", "Inner Focus", "Magic Guard"],
    "height": 1.5,
    "weight": 48
  },
  {
    "id": 66,
    "name": "ワンリキー",
    "nameEn": "Machop",
    "types": ["fighting"],
    "baseStats": {
      "hp": 70,
      "attack": 80,
      "defense": 50,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 35
    },
    "abilities": ["Guts", "No Guard", "Steadfast"],
    "height": 0.8,
    "weight": 19.5
  },
  {
    "id": 67,
    "name": "ゴーリキー",
    "nameEn": "Machoke",
    "types": ["fighting"],
    "baseStats": {
      "hp": 80,
      "attack": 100,
      "defense": 70,
      "specialAttack": 50,
      "specialDefense": 60,
      "speed": 45
    },
    "abilities": ["Guts", "No Guard", "Steadfast"],
    "height": 1.5,
    "weight": 70.5
  },
  {
    "id": 68,
    "name": "カイリキー",
    "nameEn": "Machamp",
    "types": ["fighting"],
    "baseStats": {
      "hp": 90,
      "attack": 130,
      "defense": 80,
      "specialAttack": 65,
      "specialDefense": 85,
      "speed": 55
    },
    "abilities": ["Guts", "No Guard", "Steadfast"],
    "height": 1.6,
    "weight": 130
  },
  {
    "id": 69,
    "name": "マダツボミ",
    "nameEn": "Bellsprout",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 35,
      "specialAttack": 70,
      "specialDefense": 30,
      "speed": 40
    },
    "abilities": ["Chlorophyll", "Gluttony"],
    "height": 0.7,
    "weight": 4
  },
  {
    "id": 70,
    "name": "ウツドン",
    "nameEn": "Weepinbell",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 50,
      "specialAttack": 85,
      "specialDefense": 45,
      "speed": 55
    },
    "abilities": ["Chlorophyll", "Gluttony"],
    "height": 1,
    "weight": 6.4
  },
  {
    "id": 71,
    "name": "ウツボット",
    "nameEn": "Victreebel",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 80,
      "attack": 105,
      "defense": 65,
      "specialAttack": 100,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Chlorophyll", "Gluttony"],
    "height": 1.7,
    "weight": 15.5
  },
  {
    "id": 72,
    "name": "メノクラゲ",
    "nameEn": "Tentacool",
    "types": ["water", "poison"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 35,
      "specialAttack": 50,
      "specialDefense": 100,
      "speed": 70
    },
    "abilities": ["Clear Body", "Liquid Ooze", "Rain Dish"],
    "height": 0.9,
    "weight": 45.5
  },
  {
    "id": 73,
    "name": "ドククラゲ",
    "nameEn": "Tentacruel",
    "types": ["water", "poison"],
    "baseStats": {
      "hp": 80,
      "attack": 70,
      "defense": 65,
      "specialAttack": 80,
      "specialDefense": 120,
      "speed": 100
    },
    "abilities": ["Clear Body", "Liquid Ooze", "Rain Dish"],
    "height": 1.6,
    "weight": 55
  },
  {
    "id": 74,
    "name": "イシツブテ",
    "nameEn": "Geodude",
    "types": ["rock", "ground"],
    "baseStats": {
      "hp": 40,
      "attack": 80,
      "defense": 100,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 20
    },
    "abilities": ["Rock Head", "Sturdy", "Sand Veil"],
    "height": 0.4,
    "weight": 20
  },
  {
    "id": 75,
    "name": "ゴローン",
    "nameEn": "Graveler",
    "types": ["rock", "ground"],
    "baseStats": {
      "hp": 55,
      "attack": 95,
      "defense": 115,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 35
    },
    "abilities": ["Rock Head", "Sturdy", "Sand Veil"],
    "height": 1,
    "weight": 105
  },
  {
    "id": 76,
    "name": "ゴローニャ",
    "nameEn": "Golem",
    "types": ["rock", "ground"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 130,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 45
    },
    "abilities": ["Rock Head", "Sturdy", "Sand Veil"],
    "height": 1.4,
    "weight": 300
  },
  {
    "id": 77,
    "name": "ポニータ",
    "nameEn": "Ponyta",
    "types": ["fire"],
    "baseStats": {
      "hp": 50,
      "attack": 85,
      "defense": 55,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 90
    },
    "abilities": ["Run Away", "Flash Fire", "Flame Body"],
    "height": 1,
    "weight": 30
  },
  {
    "id": 78,
    "name": "ギャロップ",
    "nameEn": "Rapidash",
    "types": ["fire"],
    "baseStats": {
      "hp": 65,
      "attack": 100,
      "defense": 70,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 105
    },
    "abilities": ["Run Away", "Flash Fire", "Flame Body"],
    "height": 1.7,
    "weight": 95
  },
  {
    "id": 79,
    "name": "ヤドン",
    "nameEn": "Slowpoke",
    "types": ["water", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 65,
      "defense": 65,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 15
    },
    "abilities": ["Oblivious", "Own Tempo", "Regenerator"],
    "height": 1.2,
    "weight": 36
  },
  {
    "id": 80,
    "name": "ヤドラン",
    "nameEn": "Slowbro",
    "types": ["water", "psychic"],
    "baseStats": {
      "hp": 95,
      "attack": 75,
      "defense": 110,
      "specialAttack": 100,
      "specialDefense": 80,
      "speed": 30
    },
    "abilities": ["Oblivious", "Own Tempo", "Regenerator"],
    "height": 1.6,
    "weight": 78.5
  },
  {
    "id": 81,
    "name": "コイル",
    "nameEn": "Magnemite",
    "types": ["electric", "steel"],
    "baseStats": {
      "hp": 25,
      "attack": 35,
      "defense": 70,
      "specialAttack": 95,
      "specialDefense": 55,
      "speed": 45
    },
    "abilities": ["Magnet Pull", "Sturdy", "Analytic"],
    "height": 0.3,
    "weight": 6
  },
  {
    "id": 82,
    "name": "レアコイル",
    "nameEn": "Magneton",
    "types": ["electric", "steel"],
    "baseStats": {
      "hp": 50,
      "attack": 60,
      "defense": 95,
      "specialAttack": 120,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Magnet Pull", "Sturdy", "Analytic"],
    "height": 1,
    "weight": 60
  },
  {
    "id": 83,
    "name": "カモネギ",
    "nameEn": "Farfetch’d",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 52,
      "attack": 90,
      "defense": 55,
      "specialAttack": 58,
      "specialDefense": 62,
      "speed": 60
    },
    "abilities": ["Keen Eye", "Inner Focus", "Defiant"],
    "height": 0.8,
    "weight": 15
  },
  {
    "id": 84,
    "name": "ドードー",
    "nameEn": "Doduo",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 35,
      "attack": 85,
      "defense": 45,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 75
    },
    "abilities": ["Run Away", "Early Bird", "Tangled Feet"],
    "height": 1.4,
    "weight": 39.2
  },
  {
    "id": 85,
    "name": "ドードリオ",
    "nameEn": "Dodrio",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 110,
      "defense": 70,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 110
    },
    "abilities": ["Run Away", "Early Bird", "Tangled Feet"],
    "height": 1.8,
    "weight": 85.2
  },
  {
    "id": 86,
    "name": "パウワウ",
    "nameEn": "Seel",
    "types": ["water"],
    "baseStats": {
      "hp": 65,
      "attack": 45,
      "defense": 55,
      "specialAttack": 45,
      "specialDefense": 70,
      "speed": 45
    },
    "abilities": ["Thick Fat", "Hydration", "Ice Body"],
    "height": 1.1,
    "weight": 90
  },
  {
    "id": 87,
    "name": "ジュゴン",
    "nameEn": "Dewgong",
    "types": ["water", "ice"],
    "baseStats": {
      "hp": 90,
      "attack": 70,
      "defense": 80,
      "specialAttack": 70,
      "specialDefense": 95,
      "speed": 70
    },
    "abilities": ["Thick Fat", "Hydration", "Ice Body"],
    "height": 1.7,
    "weight": 120
  },
  {
    "id": 88,
    "name": "ベトベター",
    "nameEn": "Grimer",
    "types": ["poison"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 25
    },
    "abilities": ["Stench", "Sticky Hold", "Poison Touch"],
    "height": 0.9,
    "weight": 30
  },
  {
    "id": 89,
    "name": "ベトベトン",
    "nameEn": "Muk",
    "types": ["poison"],
    "baseStats": {
      "hp": 105,
      "attack": 105,
      "defense": 75,
      "specialAttack": 65,
      "specialDefense": 100,
      "speed": 50
    },
    "abilities": ["Stench", "Sticky Hold", "Poison Touch"],
    "height": 1.2,
    "weight": 30
  },
  {
    "id": 90,
    "name": "シェルダー",
    "nameEn": "Shellder",
    "types": ["water"],
    "baseStats": {
      "hp": 30,
      "attack": 65,
      "defense": 100,
      "specialAttack": 45,
      "specialDefense": 25,
      "speed": 40
    },
    "abilities": ["Shell Armor", "Skill Link", "Overcoat"],
    "height": 0.3,
    "weight": 4
  },
  {
    "id": 91,
    "name": "パルシェン",
    "nameEn": "Cloyster",
    "types": ["water", "ice"],
    "baseStats": {
      "hp": 50,
      "attack": 95,
      "defense": 180,
      "specialAttack": 85,
      "specialDefense": 45,
      "speed": 70
    },
    "abilities": ["Shell Armor", "Skill Link", "Overcoat"],
    "height": 1.5,
    "weight": 132.5
  },
  {
    "id": 92,
    "name": "ゴース",
    "nameEn": "Gastly",
    "types": ["ghost", "poison"],
    "baseStats": {
      "hp": 30,
      "attack": 35,
      "defense": 30,
      "specialAttack": 100,
      "specialDefense": 35,
      "speed": 80
    },
    "abilities": ["Levitate"],
    "height": 1.3,
    "weight": 0.1
  },
  {
    "id": 93,
    "name": "ゴースト",
    "nameEn": "Haunter",
    "types": ["ghost", "poison"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 45,
      "specialAttack": 115,
      "specialDefense": 55,
      "speed": 95
    },
    "abilities": ["Levitate"],
    "height": 1.6,
    "weight": 0.1
  },
  {
    "id": 94,
    "name": "ゲンガー",
    "nameEn": "Gengar",
    "types": ["ghost", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 65,
      "defense": 60,
      "specialAttack": 130,
      "specialDefense": 75,
      "speed": 110
    },
    "abilities": ["Cursed Body"],
    "height": 1.5,
    "weight": 40.5
  },
  {
    "id": 95,
    "name": "イワーク",
    "nameEn": "Onix",
    "types": ["rock", "ground"],
    "baseStats": {
      "hp": 35,
      "attack": 45,
      "defense": 160,
      "specialAttack": 30,
      "specialDefense": 45,
      "speed": 70
    },
    "abilities": ["Rock Head", "Sturdy", "Weak Armor"],
    "height": 8.8,
    "weight": 210
  },
  {
    "id": 96,
    "name": "スリープ",
    "nameEn": "Drowzee",
    "types": ["psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 48,
      "defense": 45,
      "specialAttack": 43,
      "specialDefense": 90,
      "speed": 42
    },
    "abilities": ["Insomnia", "Forewarn", "Inner Focus"],
    "height": 1,
    "weight": 32.4
  },
  {
    "id": 97,
    "name": "スリーパー",
    "nameEn": "Hypno",
    "types": ["psychic"],
    "baseStats": {
      "hp": 85,
      "attack": 73,
      "defense": 70,
      "specialAttack": 73,
      "specialDefense": 115,
      "speed": 67
    },
    "abilities": ["Insomnia", "Forewarn", "Inner Focus"],
    "height": 1.6,
    "weight": 75.6
  },
  {
    "id": 98,
    "name": "クラブ",
    "nameEn": "Krabby",
    "types": ["water"],
    "baseStats": {
      "hp": 30,
      "attack": 105,
      "defense": 90,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 50
    },
    "abilities": ["Hyper Cutter", "Shell Armor", "Sheer Force"],
    "height": 0.4,
    "weight": 6.5
  },
  {
    "id": 99,
    "name": "キングラー",
    "nameEn": "Kingler",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 130,
      "defense": 115,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 75
    },
    "abilities": ["Hyper Cutter", "Shell Armor", "Sheer Force"],
    "height": 1.3,
    "weight": 60
  },
  {
    "id": 100,
    "name": "ビリリダマ",
    "nameEn": "Voltorb",
    "types": ["electric"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 50,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 100
    },
    "abilities": ["Soundproof", "Static", "Aftermath"],
    "height": 0.5,
    "weight": 10.4
  },
  
  {
    "id": 101,
    "name": "マルマイン",
    "nameEn": "Electrode",
    "types": ["electric"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 70,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 150
    },
    "abilities": ["Soundproof", "Static", "Aftermath"],
    "height": 1.2,
    "weight": 66.6
  },
  {
    "id": 102,
    "name": "タマタマ",
    "nameEn": "Exeggcute",
    "types": ["grass", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 40,
      "defense": 80,
      "specialAttack": 60,
      "specialDefense": 45,
      "speed": 40
    },
    "abilities": ["Chlorophyll", "Harvest"],
    "height": 0.4,
    "weight": 2.5
  },
  {
    "id": 103,
    "name": "ナッシー",
    "nameEn": "Exeggutor",
    "types": ["grass", "psychic"],
    "baseStats": {
      "hp": 95,
      "attack": 95,
      "defense": 85,
      "specialAttack": 125,
      "specialDefense": 75,
      "speed": 55
    },
    "abilities": ["Chlorophyll", "Harvest"],
    "height": 2,
    "weight": 120
  },
  {
    "id": 104,
    "name": "カラカラ",
    "nameEn": "Cubone",
    "types": ["ground"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 95,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 35
    },
    "abilities": ["Rock Head", "Lightning Rod", "Battle Armor"],
    "height": 0.4,
    "weight": 6.5
  },
  {
    "id": 105,
    "name": "ガラガラ",
    "nameEn": "Marowak",
    "types": ["ground"],
    "baseStats": {
      "hp": 60,
      "attack": 80,
      "defense": 110,
      "specialAttack": 50,
      "specialDefense": 80,
      "speed": 45
    },
    "abilities": ["Rock Head", "Lightning Rod", "Battle Armor"],
    "height": 1,
    "weight": 45
  },
  {
    "id": 106,
    "name": "サワムラー",
    "nameEn": "Hitmonlee",
    "types": ["fighting"],
    "baseStats": {
      "hp": 50,
      "attack": 120,
      "defense": 53,
      "specialAttack": 35,
      "specialDefense": 110,
      "speed": 87
    },
    "abilities": ["Limber", "Reckless", "Unburden"],
    "height": 1.5,
    "weight": 49.8
  },
  {
    "id": 107,
    "name": "エビワラー",
    "nameEn": "Hitmonchan",
    "types": ["fighting"],
    "baseStats": {
      "hp": 50,
      "attack": 105,
      "defense": 79,
      "specialAttack": 35,
      "specialDefense": 110,
      "speed": 76
    },
    "abilities": ["Keen Eye", "Iron Fist", "Inner Focus"],
    "height": 1.4,
    "weight": 50.2
  },
  {
    "id": 108,
    "name": "ベロリンガ",
    "nameEn": "Lickitung",
    "types": ["normal"],
    "baseStats": {
      "hp": 90,
      "attack": 55,
      "defense": 75,
      "specialAttack": 60,
      "specialDefense": 75,
      "speed": 30
    },
    "abilities": ["Own Tempo", "Oblivious", "Cloud Nine"],
    "height": 1.2,
    "weight": 65.5
  },
  {
    "id": 109,
    "name": "ドガース",
    "nameEn": "Koffing",
    "types": ["poison"],
    "baseStats": {
      "hp": 40,
      "attack": 65,
      "defense": 95,
      "specialAttack": 60,
      "specialDefense": 45,
      "speed": 35
    },
    "abilities": ["Levitate", "Neutralizing Gas", "Stench"],
    "height": 0.6,
    "weight": 1
  },
  {
    "id": 110,
    "name": "マタドガス",
    "nameEn": "Weezing",
    "types": ["poison"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 120,
      "specialAttack": 85,
      "specialDefense": 70,
      "speed": 60
    },
    "abilities": ["Levitate", "Neutralizing Gas", "Stench"],
    "height": 1.2,
    "weight": 9.5
  },
  {
    "id": 111,
    "name": "サイホーン",
    "nameEn": "Rhyhorn",
    "types": ["ground", "rock"],
    "baseStats": {
      "hp": 80,
      "attack": 85,
      "defense": 95,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 25
    },
    "abilities": ["Lightning Rod", "Rock Head", "Reckless"],
    "height": 1,
    "weight": 115
  },
  {
    "id": 112,
    "name": "サイドン",
    "nameEn": "Rhydon",
    "types": ["ground", "rock"],
    "baseStats": {
      "hp": 105,
      "attack": 130,
      "defense": 120,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 40
    },
    "abilities": ["Lightning Rod", "Rock Head", "Reckless"],
    "height": 1.9,
    "weight": 120
  },
  {
    "id": 113,
    "name": "ラッキー",
    "nameEn": "Chansey",
    "types": ["normal"],
    "baseStats": {
      "hp": 250,
      "attack": 5,
      "defense": 5,
      "specialAttack": 35,
      "specialDefense": 105,
      "speed": 50
    },
    "abilities": ["Natural Cure", "Serene Grace", "Healer"],
    "height": 1.1,
    "weight": 34.6
  },
  {
    "id": 114,
    "name": "モンジャラ",
    "nameEn": "Tangela",
    "types": ["grass"],
    "baseStats": {
      "hp": 65,
      "attack": 55,
      "defense": 115,
      "specialAttack": 100,
      "specialDefense": 40,
      "speed": 60
    },
    "abilities": ["Chlorophyll", "Leaf Guard", "Regenerator"],
    "height": 1,
    "weight": 35
  },
  {
    "id": 115,
    "name": "ガルーラ",
    "nameEn": "Kangaskhan",
    "types": ["normal"],
    "baseStats": {
      "hp": 105,
      "attack": 95,
      "defense": 80,
      "specialAttack": 40,
      "specialDefense": 80,
      "speed": 90
    },
    "abilities": ["Early Bird", "Scrappy", "Inner Focus"],
    "height": 2.2,
    "weight": 80
  },
  {
    "id": 116,
    "name": "タッツー",
    "nameEn": "Horsea",
    "types": ["water"],
    "baseStats": {
      "hp": 30,
      "attack": 40,
      "defense": 70,
      "specialAttack": 70,
      "specialDefense": 25,
      "speed": 60
    },
    "abilities": ["Swift Swim", "Sniper", "Damp"],
    "height": 0.4,
    "weight": 8
  },
  {
    "id": 117,
    "name": "シードラ",
    "nameEn": "Seadra",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 65,
      "defense": 95,
      "specialAttack": 95,
      "specialDefense": 45,
      "speed": 85
    },
    "abilities": ["Poison Point", "Sniper", "Damp"],
    "height": 1.2,
    "weight": 25
  },
  {
    "id": 118,
    "name": "トサキント",
    "nameEn": "Goldeen",
    "types": ["water"],
    "baseStats": {
      "hp": 45,
      "attack": 67,
      "defense": 60,
      "specialAttack": 35,
      "specialDefense": 50,
      "speed": 63
    },
    "abilities": ["Swift Swim", "Water Veil", "Lightning Rod"],
    "height": 0.6,
    "weight": 15
  },
  {
    "id": 119,
    "name": "アズマオウ",
    "nameEn": "Seaking",
    "types": ["water"],
    "baseStats": {
      "hp": 80,
      "attack": 92,
      "defense": 65,
      "specialAttack": 65,
      "specialDefense": 80,
      "speed": 68
    },
    "abilities": ["Swift Swim", "Water Veil", "Lightning Rod"],
    "height": 1.3,
    "weight": 39
  },
  {
    "id": 120,
    "name": "ヒトデマン",
    "nameEn": "Staryu",
    "types": ["water"],
    "baseStats": {
      "hp": 30,
      "attack": 45,
      "defense": 55,
      "specialAttack": 70,
      "specialDefense": 55,
      "speed": 85
    },
    "abilities": ["Illuminate", "Natural Cure", "Analytic"],
    "height": 0.8,
    "weight": 34.5
  },
  {
    "id": 121,
    "name": "スターミー",
    "nameEn": "Starmie",
    "types": ["water", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 75,
      "defense": 85,
      "specialAttack": 100,
      "specialDefense": 85,
      "speed": 115
    },
    "abilities": ["Illuminate", "Natural Cure", "Analytic"],
    "height": 1.1,
    "weight": 80
  },
  {
    "id": 122,
    "name": "バリヤード",
    "nameEn": "Mr. Mime",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 65,
      "specialAttack": 100,
      "specialDefense": 120,
      "speed": 90
    },
    "abilities": ["Soundproof", "Filter", "Technician"],
    "height": 1.3,
    "weight": 54.5
  },
  {
    "id": 123,
    "name": "ストライク",
    "nameEn": "Scyther",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 110,
      "defense": 80,
      "specialAttack": 55,
      "specialDefense": 80,
      "speed": 105
    },
    "abilities": ["Swarm", "Technician", "Steadfast"],
    "height": 1.5,
    "weight": 56
  },
  {
    "id": 124,
    "name": "ルージュラ",
    "nameEn": "Jynx",
    "types": ["ice", "psychic"],
    "baseStats": {
      "hp": 65,
      "attack": 50,
      "defense": 35,
      "specialAttack": 115,
      "specialDefense": 95,
      "speed": 95
    },
    "abilities": ["Oblivious", "Forewarn", "Dry Skin"],
    "height": 1.4,
    "weight": 40.6
  },
  {
    "id": 125,
    "name": "エレブー",
    "nameEn": "Electabuzz",
    "types": ["electric"],
    "baseStats": {
      "hp": 65,
      "attack": 83,
      "defense": 57,
      "specialAttack": 95,
      "specialDefense": 85,
      "speed": 105
    },
    "abilities": ["Static", "Vital Spirit"],
    "height": 1.1,
    "weight": 30
  },
  {
    "id": 126,
    "name": "ブーバー",
    "nameEn": "Magmar",
    "types": ["fire"],
    "baseStats": {
      "hp": 65,
      "attack": 95,
      "defense": 57,
      "specialAttack": 100,
      "specialDefense": 85,
      "speed": 93
    },
    "abilities": ["Flame Body", "Vital Spirit"],
    "height": 1.3,
    "weight": 44.5
  },
  {
    "id": 127,
    "name": "カイロス",
    "nameEn": "Pinsir",
    "types": ["bug"],
    "baseStats": {
      "hp": 65,
      "attack": 125,
      "defense": 100,
      "specialAttack": 55,
      "specialDefense": 70,
      "speed": 85
    },
    "abilities": ["Hyper Cutter", "Mold Breaker", "Moxie"],
    "height": 1.5,
    "weight": 55
  },
  {
    "id": 128,
    "name": "ケンタロス",
    "nameEn": "Tauros",
    "types": ["normal"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 95,
      "specialAttack": 40,
      "specialDefense": 70,
      "speed": 110
    },
    "abilities": ["Intimidate", "Anger Point", "Sheer Force"],
    "height": 1.4,
    "weight": 88.4
  },
  {
    "id": 129,
    "name": "コイキング",
    "nameEn": "Magikarp",
    "types": ["water"],
    "baseStats": {
      "hp": 20,
      "attack": 10,
      "defense": 55,
      "specialAttack": 15,
      "specialDefense": 20,
      "speed": 80
    },
    "abilities": ["Swift Swim", "Rattled"],
    "height": 0.9,
    "weight": 10
  },
  {
    "id": 130,
    "name": "ギャラドス",
    "nameEn": "Gyarados",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 95,
      "attack": 125,
      "defense": 79,
      "specialAttack": 60,
      "specialDefense": 100,
      "speed": 81
    },
    "abilities": ["Intimidate", "Moxie"],
    "height": 6.5,
    "weight": 235
  },
  {
    "id": 131,
    "name": "ラプラス",
    "nameEn": "Lapras",
    "types": ["water", "ice"],
    "baseStats": {
      "hp": 130,
      "attack": 85,
      "defense": 80,
      "specialAttack": 85,
      "specialDefense": 95,
      "speed": 60
    },
    "abilities": ["Water Absorb", "Shell Armor", "Hydration"],
    "height": 2.5,
    "weight": 220
  },
  {
    "id": 132,
    "name": "メタモン",
    "nameEn": "Ditto",
    "types": ["normal"],
    "baseStats": {
      "hp": 48,
      "attack": 48,
      "defense": 48,
      "specialAttack": 48,
      "specialDefense": 48,
      "speed": 48
    },
    "abilities": ["Limber", "Imposter"],
    "height": 0.3,
    "weight": 4
  },
  {
    "id": 133,
    "name": "イーブイ",
    "nameEn": "Eevee",
    "types": ["normal"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 50,
      "specialAttack": 45,
      "specialDefense": 65,
      "speed": 55
    },
    "abilities": ["Run Away", "Adaptability", "Anticipation"],
    "height": 0.3,
    "weight": 6.5
  },
  {
    "id": 134,
    "name": "シャワーズ",
    "nameEn": "Vaporeon",
    "types": ["water"],
    "baseStats": {
      "hp": 130,
      "attack": 65,
      "defense": 60,
      "specialAttack": 110,
      "specialDefense": 95,
      "speed": 65
    },
    "abilities": ["Water Absorb", "Hydration"],
    "height": 1,
    "weight": 29
  },
  {
    "id": 135,
    "name": "サンダース",
    "nameEn": "Jolteon",
    "types": ["electric"],
    "baseStats": {
      "hp": 65,
      "attack": 65,
      "defense": 60,
      "specialAttack": 110,
      "specialDefense": 95,
      "speed": 130
    },
    "abilities": ["Volt Absorb", "Quick Feet"],
    "height": 0.8,
    "weight": 24.5
  },
  {
    "id": 136,
    "name": "ブースター",
    "nameEn": "Flareon",
    "types": ["fire"],
    "baseStats": {
      "hp": 65,
      "attack": 130,
      "defense": 60,
      "specialAttack": 95,
      "specialDefense": 110,
      "speed": 65
    },
    "abilities": ["Flash Fire", "Guts"],
    "height": 0.9,
    "weight": 25
  },
  {
    "id": 137,
    "name": "ポリゴン",
    "nameEn": "Porygon",
    "types": ["normal"],
    "baseStats": {
      "hp": 65,
      "attack": 60,
      "defense": 70,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 40
    },
    "abilities": ["Trace", "Download", "Analytic"],
    "height": 0.8,
    "weight": 36.5
  },
  {
    "id": 138,
    "name": "オムナイト",
    "nameEn": "Omanyte",
    "types": ["rock", "water"],
    "baseStats": {
      "hp": 35,
      "attack": 40,
      "defense": 100,
      "specialAttack": 90,
      "specialDefense": 55,
      "speed": 35
    },
    "abilities": ["Swift Swim", "Shell Armor", "Weak Armor"],
    "height": 0.4,
    "weight": 7.5
  },
  {
    "id": 139,
    "name": "オムスター",
    "nameEn": "Omastar",
    "types": ["rock", "water"],
    "baseStats": {
      "hp": 70,
      "attack": 60,
      "defense": 125,
      "specialAttack": 115,
      "specialDefense": 70,
      "speed": 55
    },
    "abilities": ["Swift Swim", "Shell Armor", "Weak Armor"],
    "height": 1,
    "weight": 35
  },
  {
    "id": 140,
    "name": "カブト",
    "nameEn": "Kabuto",
    "types": ["rock", "water"],
    "baseStats": {
      "hp": 30,
      "attack": 80,
      "defense": 90,
      "specialAttack": 55,
      "specialDefense": 45,
      "speed": 55
    },
    "abilities": ["Swift Swim", "Battle Armor", "Weak Armor"],
    "height": 0.5,
    "weight": 11.5
  },
  {
    "id": 141,
    "name": "カブトプス",
    "nameEn": "Kabutops",
    "types": ["rock", "water"],
    "baseStats": {
      "hp": 60,
      "attack": 115,
      "defense": 105,
      "specialAttack": 65,
      "specialDefense": 70,
      "speed": 80
    },
    "abilities": ["Swift Swim", "Battle Armor", "Weak Armor"],
    "height": 1.3,
    "weight": 40.5
  },
  {
    "id": 142,
    "name": "プテラ",
    "nameEn": "Aerodactyl",
    "types": ["rock", "flying"],
    "baseStats": {
      "hp": 80,
      "attack": 105,
      "defense": 65,
      "specialAttack": 60,
      "specialDefense": 75,
      "speed": 130
    },
    "abilities": ["Rock Head", "Pressure", "Unnerve"],
    "height": 1.8,
    "weight": 59
  },
  {
    "id": 143,
    "name": "カビゴン",
    "nameEn": "Snorlax",
    "types": ["normal"],
    "baseStats": {
      "hp": 160,
      "attack": 110,
      "defense": 65,
      "specialAttack": 65,
      "specialDefense": 110,
      "speed": 30
    },
    "abilities": ["Immunity", "Thick Fat", "Gluttony"],
    "height": 2.1,
    "weight": 460
  },
  {
    "id": 144,
    "name": "フリーザー",
    "nameEn": "Articuno",
    "types": ["ice", "flying"],
    "baseStats": {
      "hp": 90,
      "attack": 85,
      "defense": 100,
      "specialAttack": 95,
      "specialDefense": 125,
      "speed": 85
    },
    "abilities": ["Pressure", "Snow Cloak"],
    "height": 1.7,
    "weight": 55.4
  },
  {
    "id": 145,
    "name": "サンダー",
    "nameEn": "Zapdos",
    "types": ["electric", "flying"],
    "baseStats": {
      "hp": 90,
      "attack": 90,
      "defense": 85,
      "specialAttack": 125,
      "specialDefense": 90,
      "speed": 100
    },
    "abilities": ["Pressure", "Static"],
    "height": 1.6,
    "weight": 52.6
  },
  {
    "id": 146,
    "name": "ファイヤー",
    "nameEn": "Moltres",
    "types": ["fire", "flying"],
    "baseStats": {
      "hp": 90,
      "attack": 100,
      "defense": 90,
      "specialAttack": 125,
      "specialDefense": 85,
      "speed": 90
    },
    "abilities": ["Pressure", "Flame Body"],
    "height": 2,
    "weight": 60
  },
  {
    "id": 147,
    "name": "ミニリュウ",
    "nameEn": "Dratini",
    "types": ["dragon"],
    "baseStats": {
      "hp": 41,
      "attack": 64,
      "defense": 45,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 50
    },
    "abilities": ["Shed Skin", "Marvel Scale"],
    "height": 1.8,
    "weight": 3.3
  },
  {
    "id": 148,
    "name": "ハクリュー",
    "nameEn": "Dragonair",
    "types": ["dragon"],
    "baseStats": {
      "hp": 61,
      "attack": 84,
      "defense": 65,
      "specialAttack": 70,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Shed Skin", "Marvel Scale"],
    "height": 4,
    "weight": 16.5
  },
  {
    "id": 149,
    "name": "カイリュー",
    "nameEn": "Dragonite",
    "types": ["dragon", "flying"],
    "baseStats": {
      "hp": 91,
      "attack": 134,
      "defense": 95,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 80
    },
    "abilities": ["Inner Focus", "Multiscale"],
    "height": 2.2,
    "weight": 210
  },
  {
    "id": 150,
    "name": "ミュウツー",
    "nameEn": "Mewtwo",
    "types": ["psychic"],
    "baseStats": {
      "hp": 106,
      "attack": 110,
      "defense": 90,
      "specialAttack": 154,
      "specialDefense": 90,
      "speed": 130
    },
    "abilities": ["Pressure", "Unnerve"],
    "height": 2,
    "weight": 122
  },
  {
    "id": 151,
    "name": "ミュウ",
    "nameEn": "Mew",
    "types": ["psychic"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Synchronize"],
    "height": 0.4,
    "weight": 4
  },

  {
    "id": 152,
    "name": "チコリータ",
    "nameEn": "Chikorita",
    "types": ["grass"],
    "baseStats": {
      "hp": 45,
      "attack": 49,
      "defense": 65,
      "specialAttack": 49,
      "specialDefense": 65,
      "speed": 45
    },
    "abilities": ["Overgrow", "Leaf Guard"],
    "height": 0.9,
    "weight": 6.4
  },
  {
    "id": 153,
    "name": "ベイリーフ",
    "nameEn": "Bayleef",
    "types": ["grass"],
    "baseStats": {
      "hp": 60,
      "attack": 62,
      "defense": 80,
      "specialAttack": 63,
      "specialDefense": 80,
      "speed": 60
    },
    "abilities": ["Overgrow", "Leaf Guard"],
    "height": 1.2,
    "weight": 15.8
  },
  {
    "id": 154,
    "name": "メガニウム",
    "nameEn": "Meganium",
    "types": ["grass"],
    "baseStats": {
      "hp": 80,
      "attack": 82,
      "defense": 100,
      "specialAttack": 83,
      "specialDefense": 100,
      "speed": 80
    },
    "abilities": ["Overgrow", "Leaf Guard"],
    "height": 1.8,
    "weight": 100.5
  },
  {
    "id": 155,
    "name": "ヒノアラシ",
    "nameEn": "Cyndaquil",
    "types": ["fire"],
    "baseStats": {
      "hp": 39,
      "attack": 52,
      "defense": 43,
      "specialAttack": 60,
      "specialDefense": 50,
      "speed": 65
    },
    "abilities": ["Blaze", "Flash Fire"],
    "height": 0.5,
    "weight": 7.9
  },
  {
    "id": 156,
    "name": "マグマラシ",
    "nameEn": "Quilava",
    "types": ["fire"],
    "baseStats": {
      "hp": 58,
      "attack": 64,
      "defense": 58,
      "specialAttack": 80,
      "specialDefense": 65,
      "speed": 80
    },
    "abilities": ["Blaze", "Flash Fire"],
    "height": 0.9,
    "weight": 19
  },
  {
    "id": 157,
    "name": "バクフーン",
    "nameEn": "Typhlosion",
    "types": ["fire"],
    "baseStats": {
      "hp": 78,
      "attack": 84,
      "defense": 78,
      "specialAttack": 109,
      "specialDefense": 85,
      "speed": 100
    },
    "abilities": ["Blaze", "Flash Fire"],
    "height": 1.7,
    "weight": 79.5
  },
  {
    "id": 158,
    "name": "ワニノコ",
    "nameEn": "Totodile",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 65,
      "defense": 64,
      "specialAttack": 44,
      "specialDefense": 48,
      "speed": 43
    },
    "abilities": ["Torrent", "Sheer Force"],
    "height": 0.6,
    "weight": 9.5
  },
  {
    "id": 159,
    "name": "アリゲイツ",
    "nameEn": "Croconaw",
    "types": ["water"],
    "baseStats": {
      "hp": 65,
      "attack": 80,
      "defense": 80,
      "specialAttack": 59,
      "specialDefense": 63,
      "speed": 58
    },
    "abilities": ["Torrent", "Sheer Force"],
    "height": 1.1,
    "weight": 25
  },
  {
    "id": 160,
    "name": "オーダイル",
    "nameEn": "Feraligatr",
    "types": ["water"],
    "baseStats": {
      "hp": 85,
      "attack": 105,
      "defense": 100,
      "specialAttack": 79,
      "specialDefense": 83,
      "speed": 78
    },
    "abilities": ["Torrent", "Sheer Force"],
    "height": 2.3,
    "weight": 88.8
  },
  {
    "id": 161,
    "name": "オタチ",
    "nameEn": "Sentret",
    "types": ["normal"],
    "baseStats": {
      "hp": 35,
      "attack": 46,
      "defense": 34,
      "specialAttack": 35,
      "specialDefense": 45,
      "speed": 20
    },
    "abilities": ["Run Away", "Keen Eye", "Frisk"],
    "height": 0.8,
    "weight": 6
  },
  {
    "id": 162,
    "name": "オオタチ",
    "nameEn": "Furret",
    "types": ["normal"],
    "baseStats": {
      "hp": 85,
      "attack": 76,
      "defense": 64,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 90
    },
    "abilities": ["Run Away", "Keen Eye", "Frisk"],
    "height": 1.8,
    "weight": 32.5
  },
  {
    "id": 163,
    "name": "ホーホー",
    "nameEn": "Hoothoot",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 30,
      "defense": 30,
      "specialAttack": 36,
      "specialDefense": 56,
      "speed": 50
    },
    "abilities": ["Insomnia", "Keen Eye", "Tinted Lens"],
    "height": 0.7,
    "weight": 21.2
  },
  {
    "id": 164,
    "name": "ヨルノズク",
    "nameEn": "Noctowl",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 100,
      "attack": 50,
      "defense": 50,
      "specialAttack": 86,
      "specialDefense": 96,
      "speed": 70
    },
    "abilities": ["Insomnia", "Keen Eye", "Tinted Lens"],
    "height": 1.6,
    "weight": 40.8
  },
  {
    "id": 165,
    "name": "レディバ",
    "nameEn": "Ledyba",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 20,
      "defense": 30,
      "specialAttack": 40,
      "specialDefense": 80,
      "speed": 55
    },
    "abilities": ["Swarm", "Early Bird", "Rattled"],
    "height": 1,
    "weight": 10.8
  },
  {
    "id": 166,
    "name": "レディアン",
    "nameEn": "Ledian",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 35,
      "defense": 50,
      "specialAttack": 55,
      "specialDefense": 110,
      "speed": 85
    },
    "abilities": ["Swarm", "Early Bird", "Iron Fist"],
    "height": 1.4,
    "weight": 35.6
  },
  {
    "id": 167,
    "name": "イトマル",
    "nameEn": "Spinarak",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 40,
      "attack": 60,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 30
    },
    "abilities": ["Swarm", "Insomnia", "Sniper"],
    "height": 0.5,
    "weight": 8.5
  },
  {
    "id": 168,
    "name": "アリアドス",
    "nameEn": "Ariados",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 70,
      "attack": 90,
      "defense": 70,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 40
    },
    "abilities": ["Swarm", "Insomnia", "Sniper"],
    "height": 1.1,
    "weight": 33.5
  },
  {
    "id": 169,
    "name": "クロバット",
    "nameEn": "Crobat",
    "types": ["poison", "flying"],
    "baseStats": {
      "hp": 85,
      "attack": 90,
      "defense": 80,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 130
    },
    "abilities": ["Inner Focus", "Infiltrator"],
    "height": 1.8,
    "weight": 75
  },
  {
    "id": 170,
    "name": "チョンチー",
    "nameEn": "Chinchou",
    "types": ["water", "electric"],
    "baseStats": {
      "hp": 75,
      "attack": 38,
      "defense": 38,
      "specialAttack": 56,
      "specialDefense": 56,
      "speed": 67
    },
    "abilities": ["Volt Absorb", "Illuminate", "Water Absorb"],
    "height": 0.5,
    "weight": 12
  },
  {
    "id": 171,
    "name": "ランターン",
    "nameEn": "Lanturn",
    "types": ["water", "electric"],
    "baseStats": {
      "hp": 125,
      "attack": 58,
      "defense": 58,
      "specialAttack": 76,
      "specialDefense": 76,
      "speed": 67
    },
    "abilities": ["Volt Absorb", "Illuminate", "Water Absorb"],
    "height": 1.2,
    "weight": 22.5
  },
  {
    "id": 172,
    "name": "ピチュー",
    "nameEn": "Pichu",
    "types": ["electric"],
    "baseStats": {
      "hp": 20,
      "attack": 40,
      "defense": 15,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 60
    },
    "abilities": ["Static", "Lightning Rod"],
    "height": 0.3,
    "weight": 2
  },
  {
    "id": 173,
    "name": "ピィ",
    "nameEn": "Cleffa",
    "types": ["fairy"],
    "baseStats": {
      "hp": 50,
      "attack": 25,
      "defense": 28,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 15
    },
    "abilities": ["Cute Charm", "Magic Guard", "Friend Guard"],
    "height": 0.3,
    "weight": 3
  },
  {
    "id": 174,
    "name": "ププリン",
    "nameEn": "Igglybuff",
    "types": ["normal", "fairy"],
    "baseStats": {
      "hp": 90,
      "attack": 30,
      "defense": 15,
      "specialAttack": 40,
      "specialDefense": 20,
      "speed": 15
    },
    "abilities": ["Cute Charm", "Competitive", "Friend Guard"],
    "height": 0.3,
    "weight": 1
  },
  {
    "id": 175,
    "name": "トゲピー",
    "nameEn": "Togepi",
    "types": ["fairy"],
    "baseStats": {
      "hp": 35,
      "attack": 20,
      "defense": 65,
      "specialAttack": 40,
      "specialDefense": 65,
      "speed": 20
    },
    "abilities": ["Hustle", "Serene Grace", "Super Luck"],
    "height": 0.3,
    "weight": 1.5
  },
  {
    "id": 176,
    "name": "トゲチック",
    "nameEn": "Togetic",
    "types": ["fairy", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 40,
      "defense": 85,
      "specialAttack": 80,
      "specialDefense": 105,
      "speed": 40
    },
    "abilities": ["Hustle", "Serene Grace", "Super Luck"],
    "height": 0.6,
    "weight": 3.2
  },
  {
    "id": 177,
    "name": "ネイティ",
    "nameEn": "Natu",
    "types": ["psychic", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 50,
      "defense": 45,
      "specialAttack": 70,
      "specialDefense": 45,
      "speed": 70
    },
    "abilities": ["Synchronize", "Early Bird", "Magic Bounce"],
    "height": 0.2,
    "weight": 2
  },
  {
    "id": 178,
    "name": "ネイティオ",
    "nameEn": "Xatu",
    "types": ["psychic", "flying"],
    "baseStats": {
      "hp": 65,
      "attack": 75,
      "defense": 70,
      "specialAttack": 95,
      "specialDefense": 70,
      "speed": 95
    },
    "abilities": ["Synchronize", "Early Bird", "Magic Bounce"],
    "height": 1.5,
    "weight": 15
  },
  {
    "id": 179,
    "name": "メリープ",
    "nameEn": "Mareep",
    "types": ["electric"],
    "baseStats": {
      "hp": 55,
      "attack": 40,
      "defense": 40,
      "specialAttack": 65,
      "specialDefense": 45,
      "speed": 35
    },
    "abilities": ["Static", "Plus"],
    "height": 0.6,
    "weight": 7.8
  },
  {
    "id": 180,
    "name": "モココ",
    "nameEn": "Flaaffy",
    "types": ["electric"],
    "baseStats": {
      "hp": 70,
      "attack": 55,
      "defense": 55,
      "specialAttack": 80,
      "specialDefense": 60,
      "speed": 45
    },
    "abilities": ["Static", "Plus"],
    "height": 0.8,
    "weight": 13.3
  },
  {
    "id": 181,
    "name": "デンリュウ",
    "nameEn": "Ampharos",
    "types": ["electric"],
    "baseStats": {
      "hp": 90,
      "attack": 75,
      "defense": 85,
      "specialAttack": 115,
      "specialDefense": 90,
      "speed": 55
    },
    "abilities": ["Static", "Plus"],
    "height": 1.4,
    "weight": 61.5
  },
  {
    "id": 182,
    "name": "キレイハナ",
    "nameEn": "Bellossom",
    "types": ["grass"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 95,
      "specialAttack": 90,
      "specialDefense": 100,
      "speed": 50
    },
    "abilities": ["Chlorophyll", "Healer"],
    "height": 0.4,
    "weight": 5.8
  },
  {
    "id": 183,
    "name": "マリル",
    "nameEn": "Marill",
    "types": ["water", "fairy"],
    "baseStats": {
      "hp": 70,
      "attack": 20,
      "defense": 50,
      "specialAttack": 20,
      "specialDefense": 50,
      "speed": 40
    },
    "abilities": ["Thick Fat", "Huge Power", "Sap Sipper"],
    "height": 0.4,
    "weight": 8.5
  },
  {
    "id": 184,
    "name": "マリルリ",
    "nameEn": "Azumarill",
    "types": ["water", "fairy"],
    "baseStats": {
      "hp": 100,
      "attack": 50,
      "defense": 80,
      "specialAttack": 60,
      "specialDefense": 80,
      "speed": 50
    },
    "abilities": ["Thick Fat", "Huge Power", "Sap Sipper"],
    "height": 0.8,
    "weight": 28.5
  },
  {
    "id": 185,
    "name": "ウソッキー",
    "nameEn": "Sudowoodo",
    "types": ["rock"],
    "baseStats": {
      "hp": 70,
      "attack": 100,
      "defense": 115,
      "specialAttack": 30,
      "specialDefense": 65,
      "speed": 30
    },
    "abilities": ["Sturdy", "Rock Head", "Rattled"],
    "height": 1.2,
    "weight": 38
  },
  {
    "id": 186,
    "name": "ニョロトノ",
    "nameEn": "Politoed",
    "types": ["water"],
    "baseStats": {
      "hp": 90,
      "attack": 75,
      "defense": 75,
      "specialAttack": 90,
      "specialDefense": 100,
      "speed": 70
    },
    "abilities": ["Water Absorb", "Damp", "Drizzle"],
    "height": 1.1,
    "weight": 33.9
  },
  {
    "id": 187,
    "name": "ハネッコ",
    "nameEn": "Hoppip",
    "types": ["grass", "flying"],
    "baseStats": {
      "hp": 35,
      "attack": 35,
      "defense": 40,
      "specialAttack": 35,
      "specialDefense": 55,
      "speed": 50
    },
    "abilities": ["Chlorophyll", "Leaf Guard", "Infiltrator"],
    "height": 0.4,
    "weight": 0.5
  },
  {
    "id": 188,
    "name": "ポポッコ",
    "nameEn": "Skiploom",
    "types": ["grass", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 45,
      "defense": 50,
      "specialAttack": 45,
      "specialDefense": 65,
      "speed": 80
    },
    "abilities": ["Chlorophyll", "Leaf Guard", "Infiltrator"],
    "height": 0.6,
    "weight": 1
  },
  {
    "id": 189,
    "name": "ワタッコ",
    "nameEn": "Jumpluff",
    "types": ["grass", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 55,
      "defense": 70,
      "specialAttack": 55,
      "specialDefense": 95,
      "speed": 110
    },
    "abilities": ["Chlorophyll", "Leaf Guard", "Infiltrator"],
    "height": 0.8,
    "weight": 3
  },
  {
    "id": 190,
    "name": "エイパム",
    "nameEn": "Aipom",
    "types": ["normal"],
    "baseStats": {
      "hp": 55,
      "attack": 70,
      "defense": 55,
      "specialAttack": 40,
      "specialDefense": 55,
      "speed": 85
    },
    "abilities": ["Run Away", "Pickup", "Skill Link"],
    "height": 0.8,
    "weight": 11.5
  },
  {
    "id": 191,
    "name": "ヒマナッツ",
    "nameEn": "Sunkern",
    "types": ["grass"],
    "baseStats": {
      "hp": 30,
      "attack": 30,
      "defense": 30,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 30
    },
    "abilities": ["Chlorophyll", "Solar Power", "Early Bird"],
    "height": 0.3,
    "weight": 1.8
  },
  {
    "id": 192,
    "name": "キマワリ",
    "nameEn": "Sunflora",
    "types": ["grass"],
    "baseStats": {
      "hp": 75,
      "attack": 75,
      "defense": 55,
      "specialAttack": 105,
      "specialDefense": 85,
      "speed": 30
    },
    "abilities": ["Chlorophyll", "Solar Power", "Early Bird"],
    "height": 0.8,
    "weight": 8.5
  },
  {
    "id": 193,
    "name": "ヤンヤンマ",
    "nameEn": "Yanma",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 65,
      "attack": 65,
      "defense": 45,
      "specialAttack": 75,
      "specialDefense": 45,
      "speed": 95
    },
    "abilities": ["Speed Boost", "Compound Eyes", "Frisk"],
    "height": 1.2,
    "weight": 38
  },
  {
    "id": 194,
    "name": "ウパー",
    "nameEn": "Wooper",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 55,
      "attack": 45,
      "defense": 45,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 15
    },
    "abilities": ["Damp", "Water Absorb", "Unaware"],
    "height": 0.4,
    "weight": 8.5
  },
  {
    "id": 195,
    "name": "ヌオー",
    "nameEn": "Quagsire",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 95,
      "attack": 85,
      "defense": 85,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 35
    },
    "abilities": ["Damp", "Water Absorb", "Unaware"],
    "height": 1.4,
    "weight": 75
  },
  {
    "id": 196,
    "name": "エーフィ",
    "nameEn": "Espeon",
    "types": ["psychic"],
    "baseStats": {
      "hp": 65,
      "attack": 65,
      "defense": 60,
      "specialAttack": 130,
      "specialDefense": 95,
      "speed": 110
    },
    "abilities": ["Synchronize", "Magic Bounce"],
    "height": 0.9,
    "weight": 26.5
  },
  {
    "id": 197,
    "name": "ブラッキー",
    "nameEn": "Umbreon",
    "types": ["dark"],
    "baseStats": {
      "hp": 95,
      "attack": 65,
      "defense": 110,
      "specialAttack": 60,
      "specialDefense": 130,
      "speed": 65
    },
    "abilities": ["Synchronize", "Inner Focus"],
    "height": 1,
    "weight": 27
  },
  {
    "id": 198,
    "name": "ヤミカラス",
    "nameEn": "Murkrow",
    "types": ["dark", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 42,
      "specialAttack": 85,
      "specialDefense": 42,
      "speed": 91
    },
    "abilities": ["Insomnia", "Super Luck", "Prankster"],
    "height": 0.5,
    "weight": 2.1
  },
  {
    "id": 199,
    "name": "ヤドキング",
    "nameEn": "Slowking",
    "types": ["water", "psychic"],
    "baseStats": {
      "hp": 95,
      "attack": 75,
      "defense": 80,
      "specialAttack": 100,
      "specialDefense": 110,
      "speed": 30
    },
    "abilities": ["Oblivious", "Own Tempo", "Regenerator"],
    "height": 2,
    "weight": 79.5
  },
  {
    "id": 200,
    "name": "ムウマ",
    "nameEn": "Misdreavus",
    "types": ["ghost"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 60,
      "specialAttack": 85,
      "specialDefense": 85,
      "speed": 85
    },
    "abilities": ["Levitate"],
    "height": 0.7,
    "weight": 1
  },
  
  {
    "id": 201,
    "name": "アンノーン",
    "nameEn": "Unown",
    "types": ["psychic"],
    "baseStats": {
      "hp": 48,
      "attack": 72,
      "defense": 48,
      "specialAttack": 72,
      "specialDefense": 48,
      "speed": 48
    },
    "abilities": ["Levitate"],
    "height": 0.5,
    "weight": 5
  },
  {
    "id": 202,
    "name": "ソーナンス",
    "nameEn": "Wobbuffet",
    "types": ["psychic"],
    "baseStats": {
      "hp": 190,
      "attack": 33,
      "defense": 58,
      "specialAttack": 33,
      "specialDefense": 58,
      "speed": 33
    },
    "abilities": ["Shadow Tag", "Telepathy"],
    "height": 1.3,
    "weight": 28.5
  },
  {
    "id": 203,
    "name": "キリンリキ",
    "nameEn": "Girafarig",
    "types": ["normal", "psychic"],
    "baseStats": {
      "hp": 70,
      "attack": 80,
      "defense": 65,
      "specialAttack": 90,
      "specialDefense": 65,
      "speed": 85
    },
    "abilities": ["Inner Focus", "Early Bird", "Sap Sipper"],
    "height": 1.5,
    "weight": 41.5
  },
  {
    "id": 204,
    "name": "クヌギダマ",
    "nameEn": "Pineco",
    "types": ["bug"],
    "baseStats": {
      "hp": 50,
      "attack": 65,
      "defense": 90,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 15
    },
    "abilities": ["Sturdy", "Overcoat"],
    "height": 0.6,
    "weight": 7.2
  },
  {
    "id": 205,
    "name": "フォレトス",
    "nameEn": "Forretress",
    "types": ["bug", "steel"],
    "baseStats": {
      "hp": 75,
      "attack": 90,
      "defense": 140,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 40
    },
    "abilities": ["Sturdy", "Overcoat"],
    "height": 1.2,
    "weight": 125.8
  },
  {
    "id": 206,
    "name": "ノコッチ",
    "nameEn": "Dunsparce",
    "types": ["normal"],
    "baseStats": {
      "hp": 100,
      "attack": 70,
      "defense": 70,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 45
    },
    "abilities": ["Serene Grace", "Run Away", "Rattled"],
    "height": 1.5,
    "weight": 14
  },
  {
    "id": 207,
    "name": "グライガー",
    "nameEn": "Gligar",
    "types": ["ground", "flying"],
    "baseStats": {
      "hp": 65,
      "attack": 75,
      "defense": 105,
      "specialAttack": 35,
      "specialDefense": 65,
      "speed": 85
    },
    "abilities": ["Hyper Cutter", "Sand Veil", "Immunity"],
    "height": 1.1,
    "weight": 64.8
  },
  {
    "id": 208,
    "name": "ハガネール",
    "nameEn": "Steelix",
    "types": ["steel", "ground"],
    "baseStats": {
      "hp": 75,
      "attack": 85,
      "defense": 200,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 30
    },
    "abilities": ["Rock Head", "Sturdy", "Sheer Force"],
    "height": 9.2,
    "weight": 400
  },
  {
    "id": 209,
    "name": "ブルー",
    "nameEn": "Snubbull",
    "types": ["fairy"],
    "baseStats": {
      "hp": 60,
      "attack": 80,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 30
    },
    "abilities": ["Intimidate", "Run Away", "Rattled"],
    "height": 0.6,
    "weight": 7.8
  },
  {
    "id": 210,
    "name": "グランブル",
    "nameEn": "Granbull",
    "types": ["fairy"],
    "baseStats": {
      "hp": 90,
      "attack": 120,
      "defense": 75,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 45
    },
    "abilities": ["Intimidate", "Quick Feet", "Rattled"],
    "height": 1.4,
    "weight": 48.7
  },
  {
    "id": 211,
    "name": "ハリーセン",
    "nameEn": "Qwilfish",
    "types": ["water", "poison"],
    "baseStats": {
      "hp": 65,
      "attack": 95,
      "defense": 85,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 85
    },
    "abilities": ["Poison Point", "Swift Swim", "Intimidate"],
    "height": 0.5,
    "weight": 3.9
  },
  {
    "id": 212,
    "name": "ハッサム",
    "nameEn": "Scizor",
    "types": ["bug", "steel"],
    "baseStats": {
      "hp": 70,
      "attack": 130,
      "defense": 100,
      "specialAttack": 55,
      "specialDefense": 80,
      "speed": 65
    },
    "abilities": ["Swarm", "Technician", "Light Metal"],
    "height": 1.8,
    "weight": 118
  },
  {
    "id": 213,
    "name": "ツボツボ",
    "nameEn": "Shuckle",
    "types": ["bug", "rock"],
    "baseStats": {
      "hp": 20,
      "attack": 10,
      "defense": 230,
      "specialAttack": 10,
      "specialDefense": 230,
      "speed": 5
    },
    "abilities": ["Sturdy", "Gluttony", "Contrary"],
    "height": 0.6,
    "weight": 20.5
  },
  {
    "id": 214,
    "name": "ヘラクロス",
    "nameEn": "Heracross",
    "types": ["bug", "fighting"],
    "baseStats": {
      "hp": 80,
      "attack": 125,
      "defense": 75,
      "specialAttack": 40,
      "specialDefense": 95,
      "speed": 85
    },
    "abilities": ["Swarm", "Guts", "Moxie"],
    "height": 1.5,
    "weight": 54
  },
  {
    "id": 215,
    "name": "ニューラ",
    "nameEn": "Sneasel",
    "types": ["dark", "ice"],
    "baseStats": {
      "hp": 55,
      "attack": 95,
      "defense": 55,
      "specialAttack": 35,
      "specialDefense": 75,
      "speed": 115
    },
    "abilities": ["Inner Focus", "Keen Eye", "Pickpocket"],
    "height": 0.9,
    "weight": 28
  },
  {
    "id": 216,
    "name": "ヒメグマ",
    "nameEn": "Teddiursa",
    "types": ["normal"],
    "baseStats": {
      "hp": 60,
      "attack": 80,
      "defense": 50,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 40
    },
    "abilities": ["Pickup", "Quick Feet", "Honey Gather"],
    "height": 0.6,
    "weight": 8.8
  },
  {
    "id": 217,
    "name": "リングマ",
    "nameEn": "Ursaring",
    "types": ["normal"],
    "baseStats": {
      "hp": 90,
      "attack": 130,
      "defense": 75,
      "specialAttack": 75,
      "specialDefense": 75,
      "speed": 55
    },
    "abilities": ["Guts", "Quick Feet", "Unnerve"],
    "height": 1.8,
    "weight": 125.8
  },
  {
    "id": 218,
    "name": "マグマッグ",
    "nameEn": "Slugma",
    "types": ["fire"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 40,
      "specialAttack": 70,
      "specialDefense": 40,
      "speed": 20
    },
    "abilities": ["Magma Armor", "Flame Body", "Weak Armor"],
    "height": 0.7,
    "weight": 35
  },
  {
    "id": 219,
    "name": "マグカルゴ",
    "nameEn": "Magcargo",
    "types": ["fire", "rock"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 120,
      "specialAttack": 90,
      "specialDefense": 80,
      "speed": 30
    },
    "abilities": ["Magma Armor", "Flame Body", "Weak Armor"],
    "height": 0.8,
    "weight": 55
  },
  {
    "id": 220,
    "name": "ウリムー",
    "nameEn": "Swinub",
    "types": ["ice", "ground"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 40,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 50
    },
    "abilities": ["Oblivious", "Snow Cloak", "Thick Fat"],
    "height": 0.4,
    "weight": 6.5
  },
  {
    "id": 221,
    "name": "イノムー",
    "nameEn": "Piloswine",
    "types": ["ice", "ground"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 80,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 50
    },
    "abilities": ["Oblivious", "Snow Cloak", "Thick Fat"],
    "height": 1.1,
    "weight": 55.8
  },
  {
    "id": 222,
    "name": "サニーゴ",
    "nameEn": "Corsola",
    "types": ["water", "rock"],
    "baseStats": {
      "hp": 65,
      "attack": 55,
      "defense": 95,
      "specialAttack": 65,
      "specialDefense": 95,
      "speed": 35
    },
    "abilities": ["Hustle", "Natural Cure", "Regenerator"],
    "height": 0.6,
    "weight": 5
  },
  {
    "id": 223,
    "name": "テッポウオ",
    "nameEn": "Remoraid",
    "types": ["water"],
    "baseStats": {
      "hp": 35,
      "attack": 65,
      "defense": 35,
      "specialAttack": 65,
      "specialDefense": 35,
      "speed": 65
    },
    "abilities": ["Hustle", "Sniper", "Moody"],
    "height": 0.6,
    "weight": 12
  },
  {
    "id": 224,
    "name": "オクタン",
    "nameEn": "Octillery",
    "types": ["water"],
    "baseStats": {
      "hp": 75,
      "attack": 105,
      "defense": 75,
      "specialAttack": 105,
      "specialDefense": 75,
      "speed": 45
    },
    "abilities": ["Suction Cups", "Sniper", "Moody"],
    "height": 0.9,
    "weight": 28.5
  },
  {
    "id": 225,
    "name": "デリバード",
    "nameEn": "Delibird",
    "types": ["ice", "flying"],
    "baseStats": {
      "hp": 45,
      "attack": 55,
      "defense": 45,
      "specialAttack": 65,
      "specialDefense": 45,
      "speed": 75
    },
    "abilities": ["Vital Spirit", "Hustle", "Insomnia"],
    "height": 0.9,
    "weight": 16
  },
  {
    "id": 226,
    "name": "マンタイン",
    "nameEn": "Mantine",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 85,
      "attack": 40,
      "defense": 70,
      "specialAttack": 80,
      "specialDefense": 140,
      "speed": 70
    },
    "abilities": ["Swift Swim", "Water Absorb", "Water Veil"],
    "height": 2.1,
    "weight": 220
  },
  {
    "id": 227,
    "name": "エアームド",
    "nameEn": "Skarmory",
    "types": ["steel", "flying"],
    "baseStats": {
      "hp": 65,
      "attack": 80,
      "defense": 140,
      "specialAttack": 40,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Keen Eye", "Sturdy", "Weak Armor"],
    "height": 1.7,
    "weight": 50.5
  },
  {
    "id": 228,
    "name": "デルビル",
    "nameEn": "Houndour",
    "types": ["dark", "fire"],
    "baseStats": {
      "hp": 45,
      "attack": 60,
      "defense": 30,
      "specialAttack": 80,
      "specialDefense": 50,
      "speed": 65
    },
    "abilities": ["Early Bird", "Flash Fire", "Unnerve"],
    "height": 0.6,
    "weight": 10.8
  },
  {
    "id": 229,
    "name": "ヘルガー",
    "nameEn": "Houndoom",
    "types": ["dark", "fire"],
    "baseStats": {
      "hp": 75,
      "attack": 90,
      "defense": 50,
      "specialAttack": 110,
      "specialDefense": 80,
      "speed": 95
    },
    "abilities": ["Early Bird", "Flash Fire", "Unnerve"],
    "height": 1.4,
    "weight": 35
  },
  {
    "id": 230,
    "name": "キングドラ",
    "nameEn": "Kingdra",
    "types": ["water", "dragon"],
    "baseStats": {
      "hp": 75,
      "attack": 95,
      "defense": 95,
      "specialAttack": 95,
      "specialDefense": 95,
      "speed": 85
    },
    "abilities": ["Swift Swim", "Sniper", "Damp"],
    "height": 1.8,
    "weight": 152
  },
  {
    "id": 231,
    "name": "ゴマゾウ",
    "nameEn": "Phanpy",
    "types": ["ground"],
    "baseStats": {
      "hp": 90,
      "attack": 60,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 40
    },
    "abilities": ["Pickup", "Sand Veil"],
    "height": 0.5,
    "weight": 33.5
  },
  {
    "id": 232,
    "name": "ドンファン",
    "nameEn": "Donphan",
    "types": ["ground"],
    "baseStats": {
      "hp": 90,
      "attack": 120,
      "defense": 120,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 50
    },
    "abilities": ["Sturdy", "Sand Veil"],
    "height": 1.1,
    "weight": 120
  },
  {
    "id": 233,
    "name": "ポリゴン２",
    "nameEn": "Porygon2",
    "types": ["normal"],
    "baseStats": {
      "hp": 85,
      "attack": 80,
      "defense": 90,
      "specialAttack": 105,
      "specialDefense": 95,
      "speed": 60
    },
    "abilities": ["Trace", "Download", "Analytic"],
    "height": 0.6,
    "weight": 32.5
  },
  {
    "id": 234,
    "name": "オドシシ",
    "nameEn": "Stantler",
    "types": ["normal"],
    "baseStats": {
      "hp": 73,
      "attack": 95,
      "defense": 62,
      "specialAttack": 85,
      "specialDefense": 65,
      "speed": 85
    },
    "abilities": ["Intimidate", "Frisk", "Sap Sipper"],
    "height": 1.4,
    "weight": 71.2
  },
  {
    "id": 235,
    "name": "ドーブル",
    "nameEn": "Smeargle",
    "types": ["normal"],
    "baseStats": {
      "hp": 55,
      "attack": 20,
      "defense": 35,
      "specialAttack": 20,
      "specialDefense": 45,
      "speed": 75
    },
    "abilities": ["Own Tempo", "Technician", "Moody"],
    "height": 1.2,
    "weight": 58
  },
  {
    "id": 236,
    "name": "バルキー",
    "nameEn": "Tyrogue",
    "types": ["fighting"],
    "baseStats": {
      "hp": 35,
      "attack": 35,
      "defense": 35,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 35
    },
    "abilities": ["Guts", "Steadfast", "Vital Spirit"],
    "height": 0.7,
    "weight": 21
  },
  {
    "id": 237,
    "name": "カポエラー",
    "nameEn": "Hitmontop",
    "types": ["fighting"],
    "baseStats": {
      "hp": 50,
      "attack": 95,
      "defense": 95,
      "specialAttack": 35,
      "specialDefense": 110,
      "speed": 70
    },
    "abilities": ["Intimidate", "Technician", "Steadfast"],
    "height": 1.4,
    "weight": 48
  },
  {
    "id": 238,
    "name": "ムチュール",
    "nameEn": "Smoochum",
    "types": ["ice", "psychic"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 15,
      "specialAttack": 85,
      "specialDefense": 65,
      "speed": 65
    },
    "abilities": ["Oblivious", "Forewarn", "Hydration"],
    "height": 0.4,
    "weight": 6
  },
  {
    "id": 239,
    "name": "エレキッド",
    "nameEn": "Elekid",
    "types": ["electric"],
    "baseStats": {
      "hp": 45,
      "attack": 63,
      "defense": 37,
      "specialAttack": 65,
      "specialDefense": 55,
      "speed": 95
    },
    "abilities": ["Static", "Vital Spirit"],
    "height": 0.6,
    "weight": 23.5
  },
  {
    "id": 240,
    "name": "ブビィ",
    "nameEn": "Magby",
    "types": ["fire"],
    "baseStats": {
      "hp": 45,
      "attack": 75,
      "defense": 37,
      "specialAttack": 70,
      "specialDefense": 55,
      "speed": 83
    },
    "abilities": ["Flame Body", "Vital Spirit"],
    "height": 0.7,
    "weight": 21.4
  },
  {
    "id": 241,
    "name": "ミルタンク",
    "nameEn": "Miltank",
    "types": ["normal"],
    "baseStats": {
      "hp": 95,
      "attack": 80,
      "defense": 105,
      "specialAttack": 40,
      "specialDefense": 70,
      "speed": 100
    },
    "abilities": ["Thick Fat", "Scrappy", "Sap Sipper"],
    "height": 1.2,
    "weight": 75.5
  },
  {
    "id": 242,
    "name": "ハピナス",
    "nameEn": "Blissey",
    "types": ["normal"],
    "baseStats": {
      "hp": 255,
      "attack": 10,
      "defense": 10,
      "specialAttack": 75,
      "specialDefense": 135,
      "speed": 55
    },
    "abilities": ["Natural Cure", "Serene Grace", "Healer"],
    "height": 1.5,
    "weight": 46.8
  },
  {
    "id": 243,
    "name": "ライコウ",
    "nameEn": "Raikou",
    "types": ["electric"],
    "baseStats": {
      "hp": 90,
      "attack": 85,
      "defense": 75,
      "specialAttack": 115,
      "specialDefense": 100,
      "speed": 115
    },
    "abilities": ["Pressure", "Inner Focus"],
    "height": 1.9,
    "weight": 178
  },
  {
    "id": 244,
    "name": "エンテイ",
    "nameEn": "Entei",
    "types": ["fire"],
    "baseStats": {
      "hp": 115,
      "attack": 115,
      "defense": 85,
      "specialAttack": 90,
      "specialDefense": 75,
      "speed": 100
    },
    "abilities": ["Pressure", "Inner Focus"],
    "height": 2.1,
    "weight": 198
  },
  {
    "id": 245,
    "name": "スイクン",
    "nameEn": "Suicune",
    "types": ["water"],
    "baseStats": {
      "hp": 100,
      "attack": 75,
      "defense": 115,
      "specialAttack": 90,
      "specialDefense": 115,
      "speed": 85
    },
    "abilities": ["Pressure", "Inner Focus"],
    "height": 2,
    "weight": 187
  },
  {
    "id": 246,
    "name": "ヨーギラス",
    "nameEn": "Larvitar",
    "types": ["rock", "ground"],
    "baseStats": {
      "hp": 50,
      "attack": 64,
      "defense": 50,
      "specialAttack": 45,
      "specialDefense": 50,
      "speed": 41
    },
    "abilities": ["Guts", "Sand Veil"],
    "height": 0.6,
    "weight": 72
  },
  {
    "id": 247,
    "name": "サナギラス",
    "nameEn": "Pupitar",
    "types": ["rock", "ground"],
    "baseStats": {
      "hp": 70,
      "attack": 84,
      "defense": 70,
      "specialAttack": 65,
      "specialDefense": 70,
      "speed": 51
    },
    "abilities": ["Shed Skin"],
    "height": 1.2,
    "weight": 152
  },
  {
    "id": 248,
    "name": "バンギラス",
    "nameEn": "Tyranitar",
    "types": ["rock", "dark"],
    "baseStats": {
      "hp": 100,
      "attack": 134,
      "defense": 110,
      "specialAttack": 95,
      "specialDefense": 100,
      "speed": 61
    },
    "abilities": ["Sand Stream", "Unnerve"],
    "height": 2,
    "weight": 202
  },
  {
    "id": 249,
    "name": "ルギア",
    "nameEn": "Lugia",
    "types": ["psychic", "flying"],
    "baseStats": {
      "hp": 106,
      "attack": 90,
      "defense": 130,
      "specialAttack": 90,
      "specialDefense": 154,
      "speed": 110
    },
    "abilities": ["Pressure", "Multiscale"],
    "height": 5.2,
    "weight": 216
  },
  {
    "id": 250,
    "name": "ホウオウ",
    "nameEn": "Ho-Oh",
    "types": ["fire", "flying"],
    "baseStats": {
      "hp": 106,
      "attack": 130,
      "defense": 90,
      "specialAttack": 110,
      "specialDefense": 154,
      "speed": 90
    },
    "abilities": ["Pressure", "Regenerator"],
    "height": 3.8,
    "weight": 199
  },
  {
    "id": 251,
    "name": "セレビィ",
    "nameEn": "Celebi",
    "types": ["psychic", "grass"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Natural Cure"],
    "height": 0.6,
    "weight": 5
  },
  
  {
    "id": 252,
    "name": "キモリ",
    "nameEn": "Treecko",
    "types": ["grass"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 35,
      "specialAttack": 65,
      "specialDefense": 55,
      "speed": 70
    },
    "abilities": ["Overgrow", "Unburden"],
    "height": 0.5,
    "weight": 5
  },
  {
    "id": 253,
    "name": "ジュプトル",
    "nameEn": "Grovyle",
    "types": ["grass"],
    "baseStats": {
      "hp": 50,
      "attack": 65,
      "defense": 45,
      "specialAttack": 85,
      "specialDefense": 65,
      "speed": 95
    },
    "abilities": ["Overgrow", "Unburden"],
    "height": 0.9,
    "weight": 21.6
  },
  {
    "id": 254,
    "name": "ジュカイン",
    "nameEn": "Sceptile",
    "types": ["grass"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 65,
      "specialAttack": 105,
      "specialDefense": 85,
      "speed": 120
    },
    "abilities": ["Overgrow", "Unburden"],
    "height": 1.7,
    "weight": 52.2
  },
  {
    "id": 255,
    "name": "アチャモ",
    "nameEn": "Torchic",
    "types": ["fire"],
    "baseStats": {
      "hp": 45,
      "attack": 60,
      "defense": 40,
      "specialAttack": 70,
      "specialDefense": 50,
      "speed": 45
    },
    "abilities": ["Blaze", "Speed Boost"],
    "height": 0.4,
    "weight": 2.5
  },
  {
    "id": 256,
    "name": "ワカシャモ",
    "nameEn": "Combusken",
    "types": ["fire", "fighting"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 60,
      "specialAttack": 85,
      "specialDefense": 60,
      "speed": 55
    },
    "abilities": ["Blaze", "Speed Boost"],
    "height": 0.9,
    "weight": 19.5
  },
  {
    "id": 257,
    "name": "バシャーモ",
    "nameEn": "Blaziken",
    "types": ["fire", "fighting"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 70,
      "specialAttack": 110,
      "specialDefense": 70,
      "speed": 80
    },
    "abilities": ["Blaze", "Speed Boost"],
    "height": 1.9,
    "weight": 52
  },
  {
    "id": 258,
    "name": "ミズゴロウ",
    "nameEn": "Mudkip",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 70,
      "defense": 50,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 40
    },
    "abilities": ["Torrent", "Damp"],
    "height": 0.4,
    "weight": 7.6
  },
  {
    "id": 259,
    "name": "ヌマクロー",
    "nameEn": "Marshtomp",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 70,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 50
    },
    "abilities": ["Torrent", "Damp"],
    "height": 0.7,
    "weight": 28
  },
  {
    "id": 260,
    "name": "ラグラージ",
    "nameEn": "Swampert",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 100,
      "attack": 110,
      "defense": 90,
      "specialAttack": 85,
      "specialDefense": 90,
      "speed": 60
    },
    "abilities": ["Torrent", "Damp"],
    "height": 1.5,
    "weight": 81.9
  },
  {
    "id": 261,
    "name": "ポチエナ",
    "nameEn": "Poochyena",
    "types": ["dark"],
    "baseStats": {
      "hp": 35,
      "attack": 55,
      "defense": 35,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 35
    },
    "abilities": ["Run Away", "Quick Feet", "Rattled"],
    "height": 0.5,
    "weight": 13.6
  },
  {
    "id": 262,
    "name": "グラエナ",
    "nameEn": "Mightyena",
    "types": ["dark"],
    "baseStats": {
      "hp": 70,
      "attack": 90,
      "defense": 70,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 70
    },
    "abilities": ["Intimidate", "Quick Feet", "Moxie"],
    "height": 1,
    "weight": 37
  },
  {
    "id": 263,
    "name": "ジグザグマ",
    "nameEn": "Zigzagoon",
    "types": ["normal"],
    "baseStats": {
      "hp": 38,
      "attack": 30,
      "defense": 41,
      "specialAttack": 30,
      "specialDefense": 41,
      "speed": 60
    },
    "abilities": ["Pickup", "Gluttony", "Quick Feet"],
    "height": 0.4,
    "weight": 17.5
  },
  {
    "id": 264,
    "name": "マッスグマ",
    "nameEn": "Linoone",
    "types": ["normal"],
    "baseStats": {
      "hp": 78,
      "attack": 70,
      "defense": 61,
      "specialAttack": 50,
      "specialDefense": 61,
      "speed": 100
    },
    "abilities": ["Pickup", "Gluttony", "Quick Feet"],
    "height": 0.5,
    "weight": 32.5
  },
  {
    "id": 265,
    "name": "ケムッソ",
    "nameEn": "Wurmple",
    "types": ["bug"],
    "baseStats": {
      "hp": 45,
      "attack": 45,
      "defense": 35,
      "specialAttack": 20,
      "specialDefense": 30,
      "speed": 20
    },
    "abilities": ["Shield Dust", "Run Away"],
    "height": 0.3,
    "weight": 3.6
  },
  {
    "id": 266,
    "name": "カラサリス",
    "nameEn": "Silcoon",
    "types": ["bug"],
    "baseStats": {
      "hp": 50,
      "attack": 35,
      "defense": 55,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 15
    },
    "abilities": ["Shed Skin"],
    "height": 0.6,
    "weight": 10
  },
  {
    "id": 267,
    "name": "アゲハント",
    "nameEn": "Beautifly",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 70,
      "defense": 50,
      "specialAttack": 100,
      "specialDefense": 50,
      "speed": 65
    },
    "abilities": ["Swarm", "Rivalry"],
    "height": 1,
    "weight": 28.4
  },
  {
    "id": 268,
    "name": "マユルド",
    "nameEn": "Cascoon",
    "types": ["bug"],
    "baseStats": {
      "hp": 50,
      "attack": 35,
      "defense": 55,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 15
    },
    "abilities": ["Shed Skin"],
    "height": 0.7,
    "weight": 11.5
  },
  {
    "id": 269,
    "name": "ドクケイル",
    "nameEn": "Dustox",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 70,
      "specialAttack": 50,
      "specialDefense": 90,
      "speed": 65
    },
    "abilities": ["Shield Dust", "Compound Eyes"],
    "height": 1.2,
    "weight": 31.6
  },
  {
    "id": 270,
    "name": "ハスボー",
    "nameEn": "Lotad",
    "types": ["water", "grass"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 30,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 30
    },
    "abilities": ["Swift Swim", "Rain Dish", "Own Tempo"],
    "height": 0.5,
    "weight": 2.6
  },
  {
    "id": 271,
    "name": "ハスブレロ",
    "nameEn": "Lombre",
    "types": ["water", "grass"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 50,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 50
    },
    "abilities": ["Swift Swim", "Rain Dish", "Own Tempo"],
    "height": 1.2,
    "weight": 32.5
  },
  {
    "id": 272,
    "name": "ルンパッパ",
    "nameEn": "Ludicolo",
    "types": ["water", "grass"],
    "baseStats": {
      "hp": 80,
      "attack": 70,
      "defense": 70,
      "specialAttack": 90,
      "specialDefense": 100,
      "speed": 70
    },
    "abilities": ["Swift Swim", "Rain Dish", "Own Tempo"],
    "height": 1.5,
    "weight": 55
  },
  {
    "id": 273,
    "name": "タネボー",
    "nameEn": "Seedot",
    "types": ["grass"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 50,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 30
    },
    "abilities": ["Chlorophyll", "Early Bird", "Pickpocket"],
    "height": 0.5,
    "weight": 4
  },
  {
    "id": 274,
    "name": "コノハナ",
    "nameEn": "Nuzleaf",
    "types": ["grass", "dark"],
    "baseStats": {
      "hp": 70,
      "attack": 70,
      "defense": 40,
      "specialAttack": 60,
      "specialDefense": 40,
      "speed": 60
    },
    "abilities": ["Chlorophyll", "Early Bird", "Pickpocket"],
    "height": 1,
    "weight": 28
  },
  {
    "id": 275,
    "name": "ダーテング",
    "nameEn": "Shiftry",
    "types": ["grass", "dark"],
    "baseStats": {
      "hp": 90,
      "attack": 100,
      "defense": 60,
      "specialAttack": 90,
      "specialDefense": 60,
      "speed": 80
    },
    "abilities": ["Chlorophyll", "Wind Rider", "Pickpocket"],
    "height": 1.3,
    "weight": 59.6
  },
  {
    "id": 276,
    "name": "スバメ",
    "nameEn": "Taillow",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 55,
      "defense": 30,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 85
    },
    "abilities": ["Guts", "Scrappy"],
    "height": 0.3,
    "weight": 2.3
  },
  {
    "id": 277,
    "name": "オオスバメ",
    "nameEn": "Swellow",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 60,
      "specialAttack": 75,
      "specialDefense": 50,
      "speed": 125
    },
    "abilities": ["Guts", "Scrappy"],
    "height": 0.7,
    "weight": 19.8
  },
  {
    "id": 278,
    "name": "キャモメ",
    "nameEn": "Wingull",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 30,
      "specialAttack": 55,
      "specialDefense": 30,
      "speed": 85
    },
    "abilities": ["Keen Eye", "Hydration", "Rain Dish"],
    "height": 0.6,
    "weight": 9.5
  },
  {
    "id": 279,
    "name": "ペリッパー",
    "nameEn": "Pelipper",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 100,
      "specialAttack": 95,
      "specialDefense": 70,
      "speed": 65
    },
    "abilities": ["Keen Eye", "Drizzle", "Rain Dish"],
    "height": 1.2,
    "weight": 28
  },
  {
    "id": 280,
    "name": "ラルトス",
    "nameEn": "Ralts",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 28,
      "attack": 25,
      "defense": 25,
      "specialAttack": 45,
      "specialDefense": 35,
      "speed": 40
    },
    "abilities": ["Synchronize", "Trace", "Telepathy"],
    "height": 0.4,
    "weight": 6.6
  },
  {
    "id": 281,
    "name": "キルリア",
    "nameEn": "Kirlia",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 38,
      "attack": 35,
      "defense": 35,
      "specialAttack": 65,
      "specialDefense": 55,
      "speed": 50
    },
    "abilities": ["Synchronize", "Trace", "Telepathy"],
    "height": 0.8,
    "weight": 20.2
  },
  {
    "id": 282,
    "name": "サーナイト",
    "nameEn": "Gardevoir",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 68,
      "attack": 65,
      "defense": 65,
      "specialAttack": 125,
      "specialDefense": 115,
      "speed": 80
    },
    "abilities": ["Synchronize", "Trace", "Telepathy"],
    "height": 1.6,
    "weight": 48.4
  },
  {
    "id": 283,
    "name": "アメタマ",
    "nameEn": "Surskit",
    "types": ["bug", "water"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 32,
      "specialAttack": 50,
      "specialDefense": 52,
      "speed": 65
    },
    "abilities": ["Swift Swim", "Rain Dish"],
    "height": 0.5,
    "weight": 1.7
  },
  {
    "id": 284,
    "name": "アメモース",
    "nameEn": "Masquerain",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 60,
      "defense": 62,
      "specialAttack": 100,
      "specialDefense": 82,
      "speed": 80
    },
    "abilities": ["Intimidate", "Unnerve"],
    "height": 0.8,
    "weight": 3.6
  },
  {
    "id": 285,
    "name": "キノココ",
    "nameEn": "Shroomish",
    "types": ["grass"],
    "baseStats": {
      "hp": 60,
      "attack": 40,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 60,
      "speed": 35
    },
    "abilities": ["Effect Spore", "Poison Heal", "Quick Feet"],
    "height": 0.4,
    "weight": 4.5
  },
  {
    "id": 286,
    "name": "キノガッサ",
    "nameEn": "Breloom",
    "types": ["grass", "fighting"],
    "baseStats": {
      "hp": 60,
      "attack": 130,
      "defense": 80,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 70
    },
    "abilities": ["Effect Spore", "Poison Heal", "Technician"],
    "height": 1.2,
    "weight": 39.2
  },
  {
    "id": 287,
    "name": "ナマケロ",
    "nameEn": "Slakoth",
    "types": ["normal"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 60,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 30
    },
    "abilities": ["Truant"],
    "height": 0.8,
    "weight": 24
  },
  {
    "id": 288,
    "name": "ヤルキモノ",
    "nameEn": "Vigoroth",
    "types": ["normal"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 80,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 90
    },
    "abilities": ["Vital Spirit"],
    "height": 1.4,
    "weight": 46.5
  },
  {
    "id": 289,
    "name": "ケッキング",
    "nameEn": "Slaking",
    "types": ["normal"],
    "baseStats": {
      "hp": 150,
      "attack": 160,
      "defense": 100,
      "specialAttack": 95,
      "specialDefense": 65,
      "speed": 100
    },
    "abilities": ["Truant"],
    "height": 2,
    "weight": 130.5
  },
  {
    "id": 290,
    "name": "ツチニン",
    "nameEn": "Nincada",
    "types": ["bug", "ground"],
    "baseStats": {
      "hp": 31,
      "attack": 45,
      "defense": 90,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 40
    },
    "abilities": ["Compound Eyes", "Run Away"],
    "height": 0.5,
    "weight": 5.5
  },
  {
    "id": 291,
    "name": "テッカニン",
    "nameEn": "Ninjask",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 61,
      "attack": 90,
      "defense": 45,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 160
    },
    "abilities": ["Speed Boost", "Infiltrator"],
    "height": 0.8,
    "weight": 12
  },
  {
    "id": 292,
    "name": "ヌケニン",
    "nameEn": "Shedinja",
    "types": ["bug", "ghost"],
    "baseStats": {
      "hp": 1,
      "attack": 90,
      "defense": 45,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 40
    },
    "abilities": ["Wonder Guard"],
    "height": 0.8,
    "weight": 1.2
  },
  {
    "id": 293,
    "name": "ゴニョニョ",
    "nameEn": "Whismur",
    "types": ["normal"],
    "baseStats": {
      "hp": 64,
      "attack": 51,
      "defense": 23,
      "specialAttack": 51,
      "specialDefense": 23,
      "speed": 28
    },
    "abilities": ["Soundproof", "Rattled"],
    "height": 0.6,
    "weight": 16.3
  },
  {
    "id": 294,
    "name": "ドゴーム",
    "nameEn": "Loudred",
    "types": ["normal"],
    "baseStats": {
      "hp": 84,
      "attack": 71,
      "defense": 43,
      "specialAttack": 71,
      "specialDefense": 43,
      "speed": 48
    },
    "abilities": ["Soundproof", "Scrappy"],
    "height": 1,
    "weight": 40.5
  },
  {
    "id": 295,
    "name": "バクオング",
    "nameEn": "Exploud",
    "types": ["normal"],
    "baseStats": {
      "hp": 104,
      "attack": 91,
      "defense": 63,
      "specialAttack": 91,
      "specialDefense": 73,
      "speed": 68
    },
    "abilities": ["Soundproof", "Scrappy"],
    "height": 1.5,
    "weight": 84
  },
  {
    "id": 296,
    "name": "マクノシタ",
    "nameEn": "Makuhita",
    "types": ["fighting"],
    "baseStats": {
      "hp": 72,
      "attack": 60,
      "defense": 30,
      "specialAttack": 20,
      "specialDefense": 30,
      "speed": 25
    },
    "abilities": ["Thick Fat", "Guts", "Sheer Force"],
    "height": 1,
    "weight": 86.4
  },
  {
    "id": 297,
    "name": "ハリテヤマ",
    "nameEn": "Hariyama",
    "types": ["fighting"],
    "baseStats": {
      "hp": 144,
      "attack": 120,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 60,
      "speed": 50
    },
    "abilities": ["Thick Fat", "Guts", "Sheer Force"],
    "height": 2.3,
    "weight": 253.8
  },
  {
    "id": 298,
    "name": "ルリリ",
    "nameEn": "Azurill",
    "types": ["normal", "fairy"],
    "baseStats": {
      "hp": 50,
      "attack": 20,
      "defense": 40,
      "specialAttack": 20,
      "specialDefense": 40,
      "speed": 20
    },
    "abilities": ["Thick Fat", "Huge Power", "Sap Sipper"],
    "height": 0.2,
    "weight": 2
  },
  {
    "id": 299,
    "name": "ノズパス",
    "nameEn": "Nosepass",
    "types": ["rock"],
    "baseStats": {
      "hp": 30,
      "attack": 45,
      "defense": 135,
      "specialAttack": 45,
      "specialDefense": 90,
      "speed": 30
    },
    "abilities": ["Sturdy", "Magnet Pull", "Sand Force"],
    "height": 1,
    "weight": 97
  },
  {
    "id": 300,
    "name": "エネコ",
    "nameEn": "Skitty",
    "types": ["normal"],
    "baseStats": {
      "hp": 50,
      "attack": 45,
      "defense": 45,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 50
    },
    "abilities": ["Cute Charm", "Normalize", "Wonder Skin"],
    "height": 0.6,
    "weight": 11
  },
  {
    "id": 301,
    "name": "エネコロロ",
    "nameEn": "Delcatty",
    "types": ["normal"],
    "baseStats": {
      "hp": 70,
      "attack": 65,
      "defense": 65,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 90
    },
    "abilities": ["Cute Charm", "Normalize", "Wonder Skin"],
    "height": 1.1,
    "weight": 32.6
  },
  {
    "id": 302,
    "name": "ヤミラミ",
    "nameEn": "Sableye",
    "types": ["dark", "ghost"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 75,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 50
    },
    "abilities": ["Keen Eye", "Stall", "Prankster"],
    "height": 0.5,
    "weight": 11
  },
  
  {
    "id": 303,
    "name": "クチート",
    "nameEn": "Mawile",
    "types": ["steel", "fairy"],
    "baseStats": {
      "hp": 50,
      "attack": 85,
      "defense": 85,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 50
    },
    "abilities": ["Hyper Cutter", "Intimidate", "Sheer Force"],
    "height": 0.6,
    "weight": 11.5
  },
  {
    "id": 304,
    "name": "ココドラ",
    "nameEn": "Aron",
    "types": ["steel", "rock"],
    "baseStats": {
      "hp": 50,
      "attack": 70,
      "defense": 100,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 30
    },
    "abilities": ["Sturdy", "Rock Head", "Heavy Metal"],
    "height": 0.4,
    "weight": 60
  },
  {
    "id": 305,
    "name": "コドラ",
    "nameEn": "Lairon",
    "types": ["steel", "rock"],
    "baseStats": {
      "hp": 60,
      "attack": 90,
      "defense": 140,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 40
    },
    "abilities": ["Sturdy", "Rock Head", "Heavy Metal"],
    "height": 0.9,
    "weight": 120
  },
  {
    "id": 306,
    "name": "ボスゴドラ",
    "nameEn": "Aggron",
    "types": ["steel", "rock"],
    "baseStats": {
      "hp": 70,
      "attack": 110,
      "defense": 180,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 50
    },
    "abilities": ["Sturdy", "Rock Head", "Heavy Metal"],
    "height": 2.1,
    "weight": 360
  },
  {
    "id": 307,
    "name": "アサナン",
    "nameEn": "Meditite",
    "types": ["fighting", "psychic"],
    "baseStats": {
      "hp": 30,
      "attack": 40,
      "defense": 55,
      "specialAttack": 40,
      "specialDefense": 55,
      "speed": 60
    },
    "abilities": ["Pure Power", "Telepathy"],
    "height": 0.6,
    "weight": 11.2
  },
  {
    "id": 308,
    "name": "チャーレム",
    "nameEn": "Medicham",
    "types": ["fighting", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 75,
      "specialAttack": 60,
      "specialDefense": 75,
      "speed": 80
    },
    "abilities": ["Pure Power", "Telepathy"],
    "height": 1.3,
    "weight": 31.5
  },
  {
    "id": 309,
    "name": "ラクライ",
    "nameEn": "Electrike",
    "types": ["electric"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 40,
      "specialAttack": 65,
      "specialDefense": 40,
      "speed": 65
    },
    "abilities": ["Static", "Lightning Rod", "Minus"],
    "height": 0.6,
    "weight": 15.2
  },
  {
    "id": 310,
    "name": "ライボルト",
    "nameEn": "Manectric",
    "types": ["electric"],
    "baseStats": {
      "hp": 70,
      "attack": 75,
      "defense": 60,
      "specialAttack": 105,
      "specialDefense": 60,
      "speed": 105
    },
    "abilities": ["Static", "Lightning Rod", "Minus"],
    "height": 1.5,
    "weight": 40.2
  },
  {
    "id": 311,
    "name": "プラスル",
    "nameEn": "Plusle",
    "types": ["electric"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 40,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 95
    },
    "abilities": ["Plus", "Lightning Rod"],
    "height": 0.4,
    "weight": 4.2
  },
  {
    "id": 312,
    "name": "マイナン",
    "nameEn": "Minun",
    "types": ["electric"],
    "baseStats": {
      "hp": 60,
      "attack": 40,
      "defense": 50,
      "specialAttack": 75,
      "specialDefense": 85,
      "speed": 95
    },
    "abilities": ["Minus", "Volt Absorb"],
    "height": 0.4,
    "weight": 4.2
  },
  {
    "id": 313,
    "name": "バルビート",
    "nameEn": "Volbeat",
    "types": ["bug"],
    "baseStats": {
      "hp": 65,
      "attack": 73,
      "defense": 75,
      "specialAttack": 47,
      "specialDefense": 85,
      "speed": 85
    },
    "abilities": ["Illuminate", "Swarm", "Prankster"],
    "height": 0.7,
    "weight": 17.7
  },
  {
    "id": 314,
    "name": "イルミーゼ",
    "nameEn": "Illumise",
    "types": ["bug"],
    "baseStats": {
      "hp": 65,
      "attack": 47,
      "defense": 75,
      "specialAttack": 73,
      "specialDefense": 85,
      "speed": 85
    },
    "abilities": ["Oblivious", "Tinted Lens", "Prankster"],
    "height": 0.6,
    "weight": 17.7
  },
  {
    "id": 315,
    "name": "ロゼリア",
    "nameEn": "Roselia",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 50,
      "attack": 60,
      "defense": 45,
      "specialAttack": 100,
      "specialDefense": 80,
      "speed": 65
    },
    "abilities": ["Natural Cure", "Poison Point", "Leaf Guard"],
    "height": 0.3,
    "weight": 2
  },
  {
    "id": 316,
    "name": "ゴクリン",
    "nameEn": "Gulpin",
    "types": ["poison"],
    "baseStats": {
      "hp": 70,
      "attack": 43,
      "defense": 53,
      "specialAttack": 43,
      "specialDefense": 53,
      "speed": 40
    },
    "abilities": ["Liquid Ooze", "Sticky Hold", "Gluttony"],
    "height": 0.4,
    "weight": 10.3
  },
  {
    "id": 317,
    "name": "マルノーム",
    "nameEn": "Swalot",
    "types": ["poison"],
    "baseStats": {
      "hp": 100,
      "attack": 73,
      "defense": 83,
      "specialAttack": 73,
      "specialDefense": 83,
      "speed": 55
    },
    "abilities": ["Liquid Ooze", "Sticky Hold", "Gluttony"],
    "height": 1.7,
    "weight": 80
  },
  {
    "id": 318,
    "name": "キバニア",
    "nameEn": "Carvanha",
    "types": ["water", "dark"],
    "baseStats": {
      "hp": 45,
      "attack": 90,
      "defense": 20,
      "specialAttack": 65,
      "specialDefense": 20,
      "speed": 65
    },
    "abilities": ["Rough Skin", "Speed Boost"],
    "height": 0.8,
    "weight": 20.8
  },
  {
    "id": 319,
    "name": "サメハダー",
    "nameEn": "Sharpedo",
    "types": ["water", "dark"],
    "baseStats": {
      "hp": 70,
      "attack": 120,
      "defense": 40,
      "specialAttack": 95,
      "specialDefense": 40,
      "speed": 95
    },
    "abilities": ["Rough Skin", "Speed Boost"],
    "height": 1.8,
    "weight": 88.8
  },
  {
    "id": 320,
    "name": "ホエルコ",
    "nameEn": "Wailmer",
    "types": ["water"],
    "baseStats": {
      "hp": 130,
      "attack": 70,
      "defense": 35,
      "specialAttack": 70,
      "specialDefense": 35,
      "speed": 60
    },
    "abilities": ["Water Veil", "Oblivious", "Pressure"],
    "height": 2,
    "weight": 130
  },
  {
    "id": 321,
    "name": "ホエルオー",
    "nameEn": "Wailord",
    "types": ["water"],
    "baseStats": {
      "hp": 170,
      "attack": 90,
      "defense": 45,
      "specialAttack": 90,
      "specialDefense": 45,
      "speed": 60
    },
    "abilities": ["Water Veil", "Oblivious", "Pressure"],
    "height": 14.5,
    "weight": 398
  },
  {
    "id": 322,
    "name": "ドンメル",
    "nameEn": "Numel",
    "types": ["fire", "ground"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 40,
      "specialAttack": 65,
      "specialDefense": 45,
      "speed": 35
    },
    "abilities": ["Oblivious", "Simple", "Own Tempo"],
    "height": 0.7,
    "weight": 24
  },
  {
    "id": 323,
    "name": "バクーダ",
    "nameEn": "Camerupt",
    "types": ["fire", "ground"],
    "baseStats": {
      "hp": 70,
      "attack": 100,
      "defense": 70,
      "specialAttack": 105,
      "specialDefense": 75,
      "speed": 40
    },
    "abilities": ["Magma Armor", "Solid Rock", "Anger Point"],
    "height": 1.9,
    "weight": 220
  },
  {
    "id": 324,
    "name": "コータス",
    "nameEn": "Torkoal",
    "types": ["fire"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 140,
      "specialAttack": 85,
      "specialDefense": 70,
      "speed": 20
    },
    "abilities": ["White Smoke", "Drought", "Shell Armor"],
    "height": 0.5,
    "weight": 80.4
  },
  {
    "id": 325,
    "name": "バネブー",
    "nameEn": "Spoink",
    "types": ["psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 25,
      "defense": 35,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 60
    },
    "abilities": ["Thick Fat", "Own Tempo", "Gluttony"],
    "height": 0.7,
    "weight": 30.6
  },
  {
    "id": 326,
    "name": "ブーピッグ",
    "nameEn": "Grumpig",
    "types": ["psychic"],
    "baseStats": {
      "hp": 80,
      "attack": 45,
      "defense": 65,
      "specialAttack": 90,
      "specialDefense": 110,
      "speed": 80
    },
    "abilities": ["Thick Fat", "Own Tempo", "Gluttony"],
    "height": 0.9,
    "weight": 71.5
  },
  {
    "id": 327,
    "name": "パッチール",
    "nameEn": "Spinda",
    "types": ["normal"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 60,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 60
    },
    "abilities": ["Own Tempo", "Tangled Feet", "Contrary"],
    "height": 1.1,
    "weight": 5
  },
  {
    "id": 328,
    "name": "ナックラー",
    "nameEn": "Trapinch",
    "types": ["ground"],
    "baseStats": {
      "hp": 45,
      "attack": 100,
      "defense": 45,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 10
    },
    "abilities": ["Hyper Cutter", "Arena Trap", "Sheer Force"],
    "height": 0.7,
    "weight": 15
  },
  {
    "id": 329,
    "name": "ビブラーバ",
    "nameEn": "Vibrava",
    "types": ["ground", "dragon"],
    "baseStats": {
      "hp": 50,
      "attack": 70,
      "defense": 50,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 70
    },
    "abilities": ["Levitate"],
    "height": 1.1,
    "weight": 15.3
  },
  {
    "id": 330,
    "name": "フライゴン",
    "nameEn": "Flygon",
    "types": ["ground", "dragon"],
    "baseStats": {
      "hp": 80,
      "attack": 100,
      "defense": 80,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 100
    },
    "abilities": ["Levitate"],
    "height": 2,
    "weight": 82
  },
  {
    "id": 331,
    "name": "サボネア",
    "nameEn": "Cacnea",
    "types": ["grass"],
    "baseStats": {
      "hp": 50,
      "attack": 85,
      "defense": 40,
      "specialAttack": 85,
      "specialDefense": 40,
      "speed": 35
    },
    "abilities": ["Sand Veil", "Water Absorb"],
    "height": 0.4,
    "weight": 51.3
  },
  {
    "id": 332,
    "name": "ノクタス",
    "nameEn": "Cacturne",
    "types": ["grass", "dark"],
    "baseStats": {
      "hp": 70,
      "attack": 115,
      "defense": 60,
      "specialAttack": 115,
      "specialDefense": 60,
      "speed": 55
    },
    "abilities": ["Sand Veil", "Water Absorb"],
    "height": 1.3,
    "weight": 77.4
  },
  {
    "id": 333,
    "name": "チルット",
    "nameEn": "Swablu",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 45,
      "attack": 40,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 75,
      "speed": 50
    },
    "abilities": ["Natural Cure", "Cloud Nine"],
    "height": 0.4,
    "weight": 1.2
  },
  {
    "id": 334,
    "name": "チルタリス",
    "nameEn": "Altaria",
    "types": ["dragon", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 70,
      "defense": 90,
      "specialAttack": 70,
      "specialDefense": 105,
      "speed": 80
    },
    "abilities": ["Natural Cure", "Cloud Nine"],
    "height": 1.1,
    "weight": 20.6
  },
  {
    "id": 335,
    "name": "ザングース",
    "nameEn": "Zangoose",
    "types": ["normal"],
    "baseStats": {
      "hp": 73,
      "attack": 115,
      "defense": 60,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 90
    },
    "abilities": ["Immunity", "Toxic Boost"],
    "height": 1.3,
    "weight": 40.3
  },
  {
    "id": 336,
    "name": "ハブネーク",
    "nameEn": "Seviper",
    "types": ["poison"],
    "baseStats": {
      "hp": 73,
      "attack": 100,
      "defense": 60,
      "specialAttack": 100,
      "specialDefense": 60,
      "speed": 65
    },
    "abilities": ["Shed Skin", "Infiltrator"],
    "height": 2.7,
    "weight": 52.5
  },
  {
    "id": 337,
    "name": "ルナトーン",
    "nameEn": "Lunatone",
    "types": ["rock", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 55,
      "defense": 65,
      "specialAttack": 95,
      "specialDefense": 85,
      "speed": 70
    },
    "abilities": ["Levitate"],
    "height": 1,
    "weight": 168
  },
  {
    "id": 338,
    "name": "ソルロック",
    "nameEn": "Solrock",
    "types": ["rock", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 95,
      "defense": 85,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 70
    },
    "abilities": ["Levitate"],
    "height": 1.2,
    "weight": 154
  },
  {
    "id": 339,
    "name": "ドジョッチ",
    "nameEn": "Barboach",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 50,
      "attack": 48,
      "defense": 43,
      "specialAttack": 46,
      "specialDefense": 41,
      "speed": 60
    },
    "abilities": ["Oblivious", "Anticipation", "Hydration"],
    "height": 0.4,
    "weight": 1.9
  },
  {
    "id": 340,
    "name": "ナマズン",
    "nameEn": "Whiscash",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 110,
      "attack": 78,
      "defense": 73,
      "specialAttack": 76,
      "specialDefense": 71,
      "speed": 60
    },
    "abilities": ["Oblivious", "Anticipation", "Hydration"],
    "height": 0.9,
    "weight": 23.6
  },
  {
    "id": 341,
    "name": "ヘイガニ",
    "nameEn": "Corphish",
    "types": ["water"],
    "baseStats": {
      "hp": 43,
      "attack": 80,
      "defense": 65,
      "specialAttack": 50,
      "specialDefense": 35,
      "speed": 35
    },
    "abilities": ["Hyper Cutter", "Shell Armor", "Adaptability"],
    "height": 0.6,
    "weight": 11.5
  },
  {
    "id": 342,
    "name": "シザリガー",
    "nameEn": "Crawdaunt",
    "types": ["water", "dark"],
    "baseStats": {
      "hp": 63,
      "attack": 120,
      "defense": 85,
      "specialAttack": 90,
      "specialDefense": 55,
      "speed": 55
    },
    "abilities": ["Hyper Cutter", "Shell Armor", "Adaptability"],
    "height": 1.1,
    "weight": 32.8
  },
  {
    "id": 343,
    "name": "ヤジロン",
    "nameEn": "Baltoy",
    "types": ["ground", "psychic"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 55,
      "specialAttack": 40,
      "specialDefense": 70,
      "speed": 55
    },
    "abilities": ["Levitate"],
    "height": 0.5,
    "weight": 21.5
  },
  {
    "id": 344,
    "name": "ネンドール",
    "nameEn": "Claydol",
    "types": ["ground", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 70,
      "defense": 105,
      "specialAttack": 70,
      "specialDefense": 120,
      "speed": 75
    },
    "abilities": ["Levitate"],
    "height": 1.5,
    "weight": 108
  },
  {
    "id": 345,
    "name": "リリーラ",
    "nameEn": "Lileep",
    "types": ["rock", "grass"],
    "baseStats": {
      "hp": 66,
      "attack": 41,
      "defense": 77,
      "specialAttack": 61,
      "specialDefense": 87,
      "speed": 23
    },
    "abilities": ["Suction Cups", "Storm Drain"],
    "height": 1,
    "weight": 23.8
  },
  {
    "id": 346,
    "name": "ユレイドル",
    "nameEn": "Cradily",
    "types": ["rock", "grass"],
    "baseStats": {
      "hp": 86,
      "attack": 81,
      "defense": 97,
      "specialAttack": 81,
      "specialDefense": 107,
      "speed": 43
    },
    "abilities": ["Suction Cups", "Storm Drain"],
    "height": 1.5,
    "weight": 60.4
  },
  {
    "id": 347,
    "name": "アノプス",
    "nameEn": "Anorith",
    "types": ["rock", "bug"],
    "baseStats": {
      "hp": 45,
      "attack": 95,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 75
    },
    "abilities": ["Battle Armor", "Swift Swim"],
    "height": 0.7,
    "weight": 12.5
  },
  {
    "id": 348,
    "name": "アーマルド",
    "nameEn": "Armaldo",
    "types": ["rock", "bug"],
    "baseStats": {
      "hp": 75,
      "attack": 125,
      "defense": 100,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 45
    },
    "abilities": ["Battle Armor", "Swift Swim"],
    "height": 1.5,
    "weight": 68.2
  },
  {
    "id": 349,
    "name": "ヒンバス",
    "nameEn": "Feebas",
    "types": ["water"],
    "baseStats": {
      "hp": 20,
      "attack": 15,
      "defense": 20,
      "specialAttack": 10,
      "specialDefense": 55,
      "speed": 80
    },
    "abilities": ["Swift Swim", "Oblivious", "Adaptability"],
    "height": 0.6,
    "weight": 7.4
  },
  {
    "id": 350,
    "name": "ミロカロス",
    "nameEn": "Milotic",
    "types": ["water"],
    "baseStats": {
      "hp": 95,
      "attack": 60,
      "defense": 79,
      "specialAttack": 100,
      "specialDefense": 125,
      "speed": 81
    },
    "abilities": ["Marvel Scale", "Competitive", "Cute Charm"],
    "height": 6.2,
    "weight": 162
  },
  {
    "id": 351,
    "name": "ポワルン",
    "nameEn": "Castform",
    "types": ["normal"],
    "baseStats": {
      "hp": 70,
      "attack": 70,
      "defense": 70,
      "specialAttack": 70,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Forecast"],
    "height": 0.3,
    "weight": 0.8
  },
  {
    "id": 352,
    "name": "カクレオン",
    "nameEn": "Kecleon",
    "types": ["normal"],
    "baseStats": {
      "hp": 60,
      "attack": 90,
      "defense": 70,
      "specialAttack": 60,
      "specialDefense": 120,
      "speed": 40
    },
    "abilities": ["Color Change", "Protean"],
    "height": 1,
    "weight": 22
  },
  {
    "id": 353,
    "name": "カゲボウズ",
    "nameEn": "Shuppet",
    "types": ["ghost"],
    "baseStats": {
      "hp": 44,
      "attack": 75,
      "defense": 35,
      "specialAttack": 63,
      "specialDefense": 33,
      "speed": 45
    },
    "abilities": ["Insomnia", "Frisk", "Cursed Body"],
    "height": 0.6,
    "weight": 2.3
  },
  {
    "id": 354,
    "name": "ジュペッタ",
    "nameEn": "Banette",
    "types": ["ghost"],
    "baseStats": {
      "hp": 64,
      "attack": 115,
      "defense": 65,
      "specialAttack": 83,
      "specialDefense": 63,
      "speed": 65
    },
    "abilities": ["Insomnia", "Frisk", "Cursed Body"],
    "height": 1.1,
    "weight": 12.5
  },
  {
    "id": 355,
    "name": "ヨマワル",
    "nameEn": "Duskull",
    "types": ["ghost"],
    "baseStats": {
      "hp": 20,
      "attack": 40,
      "defense": 90,
      "specialAttack": 30,
      "specialDefense": 90,
      "speed": 25
    },
    "abilities": ["Levitate", "Frisk"],
    "height": 0.8,
    "weight": 15
  },
  {
    "id": 356,
    "name": "サマヨール",
    "nameEn": "Dusclops",
    "types": ["ghost"],
    "baseStats": {
      "hp": 40,
      "attack": 70,
      "defense": 130,
      "specialAttack": 60,
      "specialDefense": 130,
      "speed": 25
    },
    "abilities": ["Pressure", "Frisk"],
    "height": 1.6,
    "weight": 30.6
  },
  {
    "id": 357,
    "name": "トロピウス",
    "nameEn": "Tropius",
    "types": ["grass", "flying"],
    "baseStats": {
      "hp": 99,
      "attack": 68,
      "defense": 83,
      "specialAttack": 72,
      "specialDefense": 87,
      "speed": 51
    },
    "abilities": ["Chlorophyll", "Solar Power", "Harvest"],
    "height": 2,
    "weight": 100
  },
  {
    "id": 358,
    "name": "チリーン",
    "nameEn": "Chimecho",
    "types": ["psychic"],
    "baseStats": {
      "hp": 75,
      "attack": 50,
      "defense": 80,
      "specialAttack": 95,
      "specialDefense": 90,
      "speed": 65
    },
    "abilities": ["Levitate"],
    "height": 0.6,
    "weight": 1
  },
  {
    "id": 359,
    "name": "アブソル",
    "nameEn": "Absol",
    "types": ["dark"],
    "baseStats": {
      "hp": 65,
      "attack": 130,
      "defense": 60,
      "specialAttack": 75,
      "specialDefense": 60,
      "speed": 75
    },
    "abilities": ["Pressure", "Super Luck", "Justified"],
    "height": 1.2,
    "weight": 47
  },
  {
    "id": 360,
    "name": "ソーナノ",
    "nameEn": "Wynaut",
    "types": ["psychic"],
    "baseStats": {
      "hp": 95,
      "attack": 23,
      "defense": 48,
      "specialAttack": 23,
      "specialDefense": 48,
      "speed": 23
    },
    "abilities": ["Shadow Tag", "Telepathy"],
    "height": 0.6,
    "weight": 14
  },
  {
    "id": 361,
    "name": "ユキワラシ",
    "nameEn": "Snorunt",
    "types": ["ice"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 50,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 50
    },
    "abilities": ["Inner Focus", "Ice Body", "Moody"],
    "height": 0.7,
    "weight": 16.8
  },
  {
    "id": 362,
    "name": "オニゴーリ",
    "nameEn": "Glalie",
    "types": ["ice"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 80,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 80
    },
    "abilities": ["Inner Focus", "Ice Body", "Moody"],
    "height": 1.5,
    "weight": 256.5
  },
  {
    "id": 363,
    "name": "タマザラシ",
    "nameEn": "Spheal",
    "types": ["ice", "water"],
    "baseStats": {
      "hp": 70,
      "attack": 40,
      "defense": 50,
      "specialAttack": 55,
      "specialDefense": 50,
      "speed": 25
    },
    "abilities": ["Thick Fat", "Ice Body", "Oblivious"],
    "height": 0.8,
    "weight": 39.5
  },
  {
    "id": 364,
    "name": "トドグラー",
    "nameEn": "Sealeo",
    "types": ["ice", "water"],
    "baseStats": {
      "hp": 90,
      "attack": 60,
      "defense": 70,
      "specialAttack": 75,
      "specialDefense": 70,
      "speed": 45
    },
    "abilities": ["Thick Fat", "Ice Body", "Oblivious"],
    "height": 1.1,
    "weight": 87.6
  },
  {
    "id": 365,
    "name": "トドゼルガ",
    "nameEn": "Walrein",
    "types": ["ice", "water"],
    "baseStats": {
      "hp": 110,
      "attack": 80,
      "defense": 90,
      "specialAttack": 95,
      "specialDefense": 90,
      "speed": 65
    },
    "abilities": ["Thick Fat", "Ice Body", "Oblivious"],
    "height": 1.4,
    "weight": 150.6
  },
  {
    "id": 366,
    "name": "パールル",
    "nameEn": "Clamperl",
    "types": ["water"],
    "baseStats": {
      "hp": 35,
      "attack": 64,
      "defense": 85,
      "specialAttack": 74,
      "specialDefense": 55,
      "speed": 32
    },
    "abilities": ["Shell Armor", "Rattled"],
    "height": 0.4,
    "weight": 52.5
  },
  {
    "id": 367,
    "name": "ハンテール",
    "nameEn": "Huntail",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 104,
      "defense": 105,
      "specialAttack": 94,
      "specialDefense": 75,
      "speed": 52
    },
    "abilities": ["Swift Swim", "Water Veil"],
    "height": 1.7,
    "weight": 27
  },
  {
    "id": 368,
    "name": "サクラビス",
    "nameEn": "Gorebyss",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 84,
      "defense": 105,
      "specialAttack": 114,
      "specialDefense": 75,
      "speed": 52
    },
    "abilities": ["Swift Swim", "Hydration"],
    "height": 1.8,
    "weight": 22.6
  },
  {
    "id": 369,
    "name": "ジーランス",
    "nameEn": "Relicanth",
    "types": ["water", "rock"],
    "baseStats": {
      "hp": 100,
      "attack": 90,
      "defense": 130,
      "specialAttack": 45,
      "specialDefense": 65,
      "speed": 55
    },
    "abilities": ["Swift Swim", "Rock Head", "Sturdy"],
    "height": 1,
    "weight": 23.4
  },
  {
    "id": 370,
    "name": "ラブカス",
    "nameEn": "Luvdisc",
    "types": ["water"],
    "baseStats": {
      "hp": 43,
      "attack": 30,
      "defense": 55,
      "specialAttack": 40,
      "specialDefense": 65,
      "speed": 97
    },
    "abilities": ["Swift Swim", "Hydration"],
    "height": 0.6,
    "weight": 8.7
  },
  {
    "id": 371,
    "name": "タツベイ",
    "nameEn": "Bagon",
    "types": ["dragon"],
    "baseStats": {
      "hp": 45,
      "attack": 75,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 30,
      "speed": 50
    },
    "abilities": ["Rock Head", "Sheer Force"],
    "height": 0.6,
    "weight": 42.1
  },
  {
    "id": 372,
    "name": "コモルー",
    "nameEn": "Shelgon",
    "types": ["dragon"],
    "baseStats": {
      "hp": 65,
      "attack": 95,
      "defense": 100,
      "specialAttack": 60,
      "specialDefense": 50,
      "speed": 50
    },
    "abilities": ["Rock Head", "Overcoat"],
    "height": 1.1,
    "weight": 110.5
  },
  {
    "id": 373,
    "name": "ボーマンダ",
    "nameEn": "Salamence",
    "types": ["dragon", "flying"],
    "baseStats": {
      "hp": 95,
      "attack": 135,
      "defense": 80,
      "specialAttack": 110,
      "specialDefense": 80,
      "speed": 100
    },
    "abilities": ["Intimidate", "Moxie"],
    "height": 1.5,
    "weight": 102.6
  },
  {
    "id": 374,
    "name": "ダンバル",
    "nameEn": "Beldum",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 40,
      "attack": 55,
      "defense": 80,
      "specialAttack": 35,
      "specialDefense": 60,
      "speed": 30
    },
    "abilities": ["Clear Body", "Light Metal"],
    "height": 0.6,
    "weight": 95.2
  },
  {
    "id": 375,
    "name": "メタング",
    "nameEn": "Metang",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 75,
      "defense": 100,
      "specialAttack": 55,
      "specialDefense": 80,
      "speed": 50
    },
    "abilities": ["Clear Body", "Light Metal"],
    "height": 1.2,
    "weight": 202.5
  },
  {
    "id": 376,
    "name": "メタグロス",
    "nameEn": "Metagross",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 80,
      "attack": 135,
      "defense": 130,
      "specialAttack": 95,
      "specialDefense": 90,
      "speed": 70
    },
    "abilities": ["Clear Body", "Light Metal"],
    "height": 1.6,
    "weight": 550
  },
  {
    "id": 377,
    "name": "レジロック",
    "nameEn": "Regirock",
    "types": ["rock"],
    "baseStats": {
      "hp": 80,
      "attack": 100,
      "defense": 200,
      "specialAttack": 50,
      "specialDefense": 100,
      "speed": 50
    },
    "abilities": ["Clear Body", "Sturdy"],
    "height": 1.7,
    "weight": 230
  },
  {
    "id": 378,
    "name": "レジアイス",
    "nameEn": "Regice",
    "types": ["ice"],
    "baseStats": {
      "hp": 80,
      "attack": 50,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 200,
      "speed": 50
    },
    "abilities": ["Clear Body", "Ice Body"],
    "height": 1.8,
    "weight": 175
  },
  {
    "id": 379,
    "name": "レジスチル",
    "nameEn": "Registeel",
    "types": ["steel"],
    "baseStats": {
      "hp": 80,
      "attack": 75,
      "defense": 150,
      "specialAttack": 75,
      "specialDefense": 150,
      "speed": 50
    },
    "abilities": ["Clear Body", "Light Metal"],
    "height": 1.9,
    "weight": 205
  },
  {
    "id": 380,
    "name": "ラティアス",
    "nameEn": "Latias",
    "types": ["dragon", "psychic"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 90,
      "specialAttack": 110,
      "specialDefense": 130,
      "speed": 110
    },
    "abilities": ["Levitate"],
    "height": 1.4,
    "weight": 40
  },
  {
    "id": 381,
    "name": "ラティオス",
    "nameEn": "Latios",
    "types": ["dragon", "psychic"],
    "baseStats": {
      "hp": 80,
      "attack": 90,
      "defense": 80,
      "specialAttack": 130,
      "specialDefense": 110,
      "speed": 110
    },
    "abilities": ["Levitate"],
    "height": 2,
    "weight": 60
  },
  {
    "id": 382,
    "name": "カイオーガ",
    "nameEn": "Kyogre",
    "types": ["water"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 90,
      "specialAttack": 150,
      "specialDefense": 140,
      "speed": 90
    },
    "abilities": ["Drizzle"],
    "height": 4.5,
    "weight": 352
  },
  {
    "id": 383,
    "name": "グラードン",
    "nameEn": "Groudon",
    "types": ["ground"],
    "baseStats": {
      "hp": 100,
      "attack": 150,
      "defense": 140,
      "specialAttack": 100,
      "specialDefense": 90,
      "speed": 90
    },
    "abilities": ["Drought"],
    "height": 3.5,
    "weight": 950
  },
  {
    "id": 384,
    "name": "レックウザ",
    "nameEn": "Rayquaza",
    "types": ["dragon", "flying"],
    "baseStats": {
      "hp": 105,
      "attack": 150,
      "defense": 90,
      "specialAttack": 150,
      "specialDefense": 90,
      "speed": 95
    },
    "abilities": ["Air Lock"],
    "height": 7,
    "weight": 206.5
  },
  {
    "id": 385,
    "name": "ジラーチ",
    "nameEn": "Jirachi",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Serene Grace"],
    "height": 0.3,
    "weight": 1.1
  },
  {
    "id": 386,
    "name": "デオキシス",
    "nameEn": "Deoxys",
    "types": ["psychic"],
    "baseStats": {
      "hp": 50,
      "attack": 150,
      "defense": 50,
      "specialAttack": 150,
      "specialDefense": 50,
      "speed": 150
    },
    "abilities": ["Pressure"],
    "height": 1.7,
    "weight": 60.8
  },
  
  {
    "id": 387,
    "name": "ナエトル",
    "nameEn": "Turtwig",
    "types": ["grass"],
    "baseStats": {
      "hp": 55,
      "attack": 68,
      "defense": 64,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 31
    },
    "abilities": ["Overgrow", "Shell Armor"],
    "height": 0.4,
    "weight": 10.2
  },
  {
    "id": 388,
    "name": "ハヤシガメ",
    "nameEn": "Grotle",
    "types": ["grass"],
    "baseStats": {
      "hp": 75,
      "attack": 89,
      "defense": 85,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 36
    },
    "abilities": ["Overgrow", "Shell Armor"],
    "height": 1.1,
    "weight": 97
  },
  {
    "id": 389,
    "name": "ドダイトス",
    "nameEn": "Torterra",
    "types": ["grass", "ground"],
    "baseStats": {
      "hp": 95,
      "attack": 109,
      "defense": 105,
      "specialAttack": 75,
      "specialDefense": 85,
      "speed": 56
    },
    "abilities": ["Overgrow", "Shell Armor"],
    "height": 2.2,
    "weight": 310
  },
  {
    "id": 390,
    "name": "ヒコザル",
    "nameEn": "Chimchar",
    "types": ["fire"],
    "baseStats": {
      "hp": 44,
      "attack": 58,
      "defense": 44,
      "specialAttack": 58,
      "specialDefense": 44,
      "speed": 61
    },
    "abilities": ["Blaze", "Iron Fist"],
    "height": 0.5,
    "weight": 6.2
  },
  {
    "id": 391,
    "name": "モウカザル",
    "nameEn": "Monferno",
    "types": ["fire", "fighting"],
    "baseStats": {
      "hp": 64,
      "attack": 78,
      "defense": 52,
      "specialAttack": 78,
      "specialDefense": 52,
      "speed": 81
    },
    "abilities": ["Blaze", "Iron Fist"],
    "height": 0.9,
    "weight": 22
  },
  {
    "id": 392,
    "name": "ゴウカザル",
    "nameEn": "Infernape",
    "types": ["fire", "fighting"],
    "baseStats": {
      "hp": 76,
      "attack": 104,
      "defense": 71,
      "specialAttack": 104,
      "specialDefense": 71,
      "speed": 108
    },
    "abilities": ["Blaze", "Iron Fist"],
    "height": 1.2,
    "weight": 55
  },
  {
    "id": 393,
    "name": "ポッチャマ",
    "nameEn": "Piplup",
    "types": ["water"],
    "baseStats": {
      "hp": 53,
      "attack": 51,
      "defense": 53,
      "specialAttack": 61,
      "specialDefense": 56,
      "speed": 40
    },
    "abilities": ["Torrent", "Competitive"],
    "height": 0.4,
    "weight": 5.2
  },
  {
    "id": 394,
    "name": "ポッタイシ",
    "nameEn": "Prinplup",
    "types": ["water"],
    "baseStats": {
      "hp": 64,
      "attack": 66,
      "defense": 68,
      "specialAttack": 81,
      "specialDefense": 76,
      "speed": 50
    },
    "abilities": ["Torrent", "Competitive"],
    "height": 0.8,
    "weight": 23
  },
  {
    "id": 395,
    "name": "エンペルト",
    "nameEn": "Empoleon",
    "types": ["water", "steel"],
    "baseStats": {
      "hp": 84,
      "attack": 86,
      "defense": 88,
      "specialAttack": 111,
      "specialDefense": 101,
      "speed": 60
    },
    "abilities": ["Torrent", "Competitive"],
    "height": 1.7,
    "weight": 84.5
  },
  {
    "id": 396,
    "name": "ムックル",
    "nameEn": "Starly",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 55,
      "defense": 30,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 60
    },
    "abilities": ["Keen Eye", "Reckless"],
    "height": 0.3,
    "weight": 2
  },
  {
    "id": 397,
    "name": "ムクバード",
    "nameEn": "Staravia",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 75,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 80
    },
    "abilities": ["Intimidate", "Reckless"],
    "height": 0.6,
    "weight": 15.5
  },
  {
    "id": 398,
    "name": "ムクホーク",
    "nameEn": "Staraptor",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 85,
      "attack": 120,
      "defense": 70,
      "specialAttack": 50,
      "specialDefense": 60,
      "speed": 100
    },
    "abilities": ["Intimidate", "Reckless"],
    "height": 1.2,
    "weight": 24.9
  },
  {
    "id": 399,
    "name": "ビッパ",
    "nameEn": "Bidoof",
    "types": ["normal"],
    "baseStats": {
      "hp": 59,
      "attack": 45,
      "defense": 40,
      "specialAttack": 35,
      "specialDefense": 40,
      "speed": 31
    },
    "abilities": ["Simple", "Unaware", "Moody"],
    "height": 0.5,
    "weight": 20
  },
  {
    "id": 400,
    "name": "ビーダル",
    "nameEn": "Bibarel",
    "types": ["normal", "water"],
    "baseStats": {
      "hp": 79,
      "attack": 85,
      "defense": 60,
      "specialAttack": 55,
      "specialDefense": 60,
      "speed": 71
    },
    "abilities": ["Simple", "Unaware", "Moody"],
    "height": 1,
    "weight": 31.5
  },
  {
    "id": 401,
    "name": "コロボーシ",
    "nameEn": "Kricketot",
    "types": ["bug"],
    "baseStats": {
      "hp": 37,
      "attack": 25,
      "defense": 41,
      "specialAttack": 25,
      "specialDefense": 41,
      "speed": 25
    },
    "abilities": ["Shed Skin", "Run Away"],
    "height": 0.3,
    "weight": 2.2
  },
  {
    "id": 402,
    "name": "コロトック",
    "nameEn": "Kricketune",
    "types": ["bug"],
    "baseStats": {
      "hp": 77,
      "attack": 85,
      "defense": 51,
      "specialAttack": 55,
      "specialDefense": 51,
      "speed": 65
    },
    "abilities": ["Swarm", "Technician"],
    "height": 1,
    "weight": 25.5
  },
  {
    "id": 403,
    "name": "コリンク",
    "nameEn": "Shinx",
    "types": ["electric"],
    "baseStats": {
      "hp": 45,
      "attack": 65,
      "defense": 34,
      "specialAttack": 40,
      "specialDefense": 34,
      "speed": 45
    },
    "abilities": ["Rivalry", "Intimidate", "Guts"],
    "height": 0.5,
    "weight": 9.5
  },
  {
    "id": 404,
    "name": "ルクシオ",
    "nameEn": "Luxio",
    "types": ["electric"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 49,
      "specialAttack": 60,
      "specialDefense": 49,
      "speed": 60
    },
    "abilities": ["Rivalry", "Intimidate", "Guts"],
    "height": 0.9,
    "weight": 30.5
  },
  {
    "id": 405,
    "name": "レントラー",
    "nameEn": "Luxray",
    "types": ["electric"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 79,
      "specialAttack": 95,
      "specialDefense": 79,
      "speed": 70
    },
    "abilities": ["Rivalry", "Intimidate", "Guts"],
    "height": 1.4,
    "weight": 42
  },
  {
    "id": 406,
    "name": "スボミー",
    "nameEn": "Budew",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 35,
      "specialAttack": 50,
      "specialDefense": 70,
      "speed": 55
    },
    "abilities": ["Natural Cure", "Poison Point", "Leaf Guard"],
    "height": 0.2,
    "weight": 1.2
  },
  {
    "id": 407,
    "name": "ロズレイド",
    "nameEn": "Roserade",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 70,
      "defense": 65,
      "specialAttack": 125,
      "specialDefense": 105,
      "speed": 90
    },
    "abilities": ["Natural Cure", "Poison Point", "Technician"],
    "height": 0.9,
    "weight": 14.5
  },
  {
    "id": 408,
    "name": "ズガイドス",
    "nameEn": "Cranidos",
    "types": ["rock"],
    "baseStats": {
      "hp": 67,
      "attack": 125,
      "defense": 40,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 58
    },
    "abilities": ["Mold Breaker", "Sheer Force"],
    "height": 0.9,
    "weight": 31.5
  },
  {
    "id": 409,
    "name": "ラムパルド",
    "nameEn": "Rampardos",
    "types": ["rock"],
    "baseStats": {
      "hp": 97,
      "attack": 165,
      "defense": 60,
      "specialAttack": 65,
      "specialDefense": 50,
      "speed": 58
    },
    "abilities": ["Mold Breaker", "Sheer Force"],
    "height": 1.6,
    "weight": 102.5
  },
  {
    "id": 410,
    "name": "タテトプス",
    "nameEn": "Shieldon",
    "types": ["rock", "steel"],
    "baseStats": {
      "hp": 30,
      "attack": 42,
      "defense": 118,
      "specialAttack": 42,
      "specialDefense": 88,
      "speed": 30
    },
    "abilities": ["Sturdy", "Soundproof"],
    "height": 0.5,
    "weight": 57
  },
  {
    "id": 411,
    "name": "トリデプス",
    "nameEn": "Bastiodon",
    "types": ["rock", "steel"],
    "baseStats": {
      "hp": 60,
      "attack": 52,
      "defense": 168,
      "specialAttack": 47,
      "specialDefense": 138,
      "speed": 30
    },
    "abilities": ["Sturdy", "Soundproof"],
    "height": 1.3,
    "weight": 149.5
  },
  {
    "id": 412,
    "name": "ミノムッチ (くさきのミノ)",
    "nameEn": "Burmy",
    "types": ["bug"],
    "baseStats": {
      "hp": 40,
      "attack": 29,
      "defense": 45,
      "specialAttack": 29,
      "specialDefense": 45,
      "speed": 36
    },
    "abilities": ["Shed Skin", "Overcoat"],
    "height": 0.2,
    "weight": 3.4
  },
  {
    "id": 413,
    "name": "ミノマダム (くさきのミノ)",
    "nameEn": "Wormadam",
    "types": ["bug", "grass"],
    "baseStats": {
      "hp": 60,
      "attack": 59,
      "defense": 85,
      "specialAttack": 79,
      "specialDefense": 105,
      "speed": 36
    },
    "abilities": ["Anticipation", "Overcoat"],
    "height": 0.5,
    "weight": 6.5
  },
  {
    "id": 414,
    "name": "ガーメイル",
    "nameEn": "Mothim",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 94,
      "defense": 50,
      "specialAttack": 94,
      "specialDefense": 50,
      "speed": 66
    },
    "abilities": ["Swarm", "Tinted Lens"],
    "height": 0.9,
    "weight": 23.3
  },
  {
    "id": 415,
    "name": "ミツハニー",
    "nameEn": "Combee",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 30,
      "attack": 30,
      "defense": 42,
      "specialAttack": 30,
      "specialDefense": 42,
      "speed": 70
    },
    "abilities": ["Honey Gather", "Hustle"],
    "height": 0.3,
    "weight": 5.5
  },
  {
    "id": 416,
    "name": "ビークイン",
    "nameEn": "Vespiquen",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 80,
      "defense": 102,
      "specialAttack": 80,
      "specialDefense": 102,
      "speed": 40
    },
    "abilities": ["Pressure", "Unnerve"],
    "height": 1.2,
    "weight": 38.5
  },
  {
    "id": 417,
    "name": "パチリス",
    "nameEn": "Pachirisu",
    "types": ["electric"],
    "baseStats": {
      "hp": 60,
      "attack": 45,
      "defense": 70,
      "specialAttack": 45,
      "specialDefense": 90,
      "speed": 95
    },
    "abilities": ["Run Away", "Pickup", "Volt Absorb"],
    "height": 0.4,
    "weight": 3.9
  },
  {
    "id": 418,
    "name": "ブイゼル",
    "nameEn": "Buizel",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 65,
      "defense": 35,
      "specialAttack": 60,
      "specialDefense": 30,
      "speed": 85
    },
    "abilities": ["Swift Swim", "Water Veil"],
    "height": 0.7,
    "weight": 29.5
  },
  {
    "id": 419,
    "name": "フローゼル",
    "nameEn": "Floatzel",
    "types": ["water"],
    "baseStats": {
      "hp": 85,
      "attack": 105,
      "defense": 55,
      "specialAttack": 85,
      "specialDefense": 50,
      "speed": 115
    },
    "abilities": ["Swift Swim", "Water Veil"],
    "height": 1.1,
    "weight": 33.5
  },
  {
    "id": 420,
    "name": "チェリンボ",
    "nameEn": "Cherubi",
    "types": ["grass"],
    "baseStats": {
      "hp": 45,
      "attack": 35,
      "defense": 45,
      "specialAttack": 62,
      "specialDefense": 53,
      "speed": 35
    },
    "abilities": ["Chlorophyll"],
    "height": 0.4,
    "weight": 3.3
  },
  {
    "id": 421,
    "name": "チェリム (ネガフォルム)",
    "nameEn": "Cherrim",
    "types": ["grass"],
    "baseStats": {
      "hp": 70,
      "attack": 60,
      "defense": 70,
      "specialAttack": 87,
      "specialDefense": 78,
      "speed": 85
    },
    "abilities": ["Flower Gift"],
    "height": 0.5,
    "weight": 9.3
  },
  {
    "id": 422,
    "name": "カラナクシ (にしのうみ)",
    "nameEn": "Shellos",
    "types": ["water"],
    "baseStats": {
      "hp": 76,
      "attack": 48,
      "defense": 48,
      "specialAttack": 57,
      "specialDefense": 62,
      "speed": 34
    },
    "abilities": ["Sticky Hold", "Storm Drain", "Sand Force"],
    "height": 0.3,
    "weight": 6.3
  },
  {
    "id": 423,
    "name": "トリトドン (にしのうみ)",
    "nameEn": "Gastrodon",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 111,
      "attack": 83,
      "defense": 68,
      "specialAttack": 92,
      "specialDefense": 82,
      "speed": 39
    },
    "abilities": ["Sticky Hold", "Storm Drain", "Sand Force"],
    "height": 0.9,
    "weight": 29.9
  },
  {
    "id": 424,
    "name": "エテボース",
    "nameEn": "Ambipom",
    "types": ["normal"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 66,
      "specialAttack": 60,
      "specialDefense": 66,
      "speed": 115
    },
    "abilities": ["Technician", "Pickup", "Skill Link"],
    "height": 1.2,
    "weight": 20.3
  },
  {
    "id": 425,
    "name": "フワンテ",
    "nameEn": "Drifloon",
    "types": ["ghost", "flying"],
    "baseStats": {
      "hp": 90,
      "attack": 50,
      "defense": 34,
      "specialAttack": 60,
      "specialDefense": 44,
      "speed": 70
    },
    "abilities": ["Aftermath", "Unburden", "Flare Boost"],
    "height": 0.4,
    "weight": 1.2
  },
  {
    "id": 426,
    "name": "フワライド",
    "nameEn": "Drifblim",
    "types": ["ghost", "flying"],
    "baseStats": {
      "hp": 150,
      "attack": 80,
      "defense": 44,
      "specialAttack": 90,
      "specialDefense": 54,
      "speed": 80
    },
    "abilities": ["Aftermath", "Unburden", "Flare Boost"],
    "height": 1.2,
    "weight": 15
  },
  {
    "id": 427,
    "name": "ミミロル",
    "nameEn": "Buneary",
    "types": ["normal"],
    "baseStats": {
      "hp": 55,
      "attack": 66,
      "defense": 44,
      "specialAttack": 44,
      "specialDefense": 56,
      "speed": 85
    },
    "abilities": ["Run Away", "Klutz", "Limber"],
    "height": 0.4,
    "weight": 5.5
  },
  {
    "id": 428,
    "name": "ミミロップ",
    "nameEn": "Lopunny",
    "types": ["normal"],
    "baseStats": {
      "hp": 65,
      "attack": 76,
      "defense": 84,
      "specialAttack": 54,
      "specialDefense": 96,
      "speed": 105
    },
    "abilities": ["Cute Charm", "Klutz", "Limber"],
    "height": 1.2,
    "weight": 33.3
  },
  {
    "id": 429,
    "name": "ムウマージ",
    "nameEn": "Mismagius",
    "types": ["ghost"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 60,
      "specialAttack": 105,
      "specialDefense": 105,
      "speed": 105
    },
    "abilities": ["Levitate"],
    "height": 0.9,
    "weight": 4.4
  },
  {
    "id": 430,
    "name": "ドンカラス",
    "nameEn": "Honchkrow",
    "types": ["dark", "flying"],
    "baseStats": {
      "hp": 100,
      "attack": 125,
      "defense": 52,
      "specialAttack": 105,
      "specialDefense": 52,
      "speed": 71
    },
    "abilities": ["Insomnia", "Super Luck", "Moxie"],
    "height": 0.9,
    "weight": 27.3
  },
  
  {
    "id": 431,
    "name": "ニャルマー",
    "nameEn": "Glameow",
    "types": ["normal"],
    "baseStats": {
      "hp": 49,
      "attack": 55,
      "defense": 42,
      "specialAttack": 42,
      "specialDefense": 37,
      "speed": 85
    },
    "abilities": ["Limber", "Own Tempo", "Keen Eye"],
    "height": 0.5,
    "weight": 3.9
  },
  {
    "id": 432,
    "name": "ブニャット",
    "nameEn": "Purugly",
    "types": ["normal"],
    "baseStats": {
      "hp": 71,
      "attack": 82,
      "defense": 64,
      "specialAttack": 64,
      "specialDefense": 59,
      "speed": 112
    },
    "abilities": ["Thick Fat", "Own Tempo", "Defiant"],
    "height": 1,
    "weight": 43.8
  },
  {
    "id": 433,
    "name": "リーシャン",
    "nameEn": "Chingling",
    "types": ["psychic"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 50,
      "specialAttack": 65,
      "specialDefense": 50,
      "speed": 45
    },
    "abilities": ["Levitate"],
    "height": 0.2,
    "weight": 0.6
  },
  {
    "id": 434,
    "name": "スカンプー",
    "nameEn": "Stunky",
    "types": ["poison", "dark"],
    "baseStats": {
      "hp": 63,
      "attack": 63,
      "defense": 47,
      "specialAttack": 41,
      "specialDefense": 41,
      "speed": 74
    },
    "abilities": ["Stench", "Aftermath", "Keen Eye"],
    "height": 0.4,
    "weight": 19.2
  },
  {
    "id": 435,
    "name": "スカタンク",
    "nameEn": "Skuntank",
    "types": ["poison", "dark"],
    "baseStats": {
      "hp": 103,
      "attack": 93,
      "defense": 67,
      "specialAttack": 71,
      "specialDefense": 61,
      "speed": 84
    },
    "abilities": ["Stench", "Aftermath", "Keen Eye"],
    "height": 1,
    "weight": 38
  },
  {
    "id": 436,
    "name": "ドーミラー",
    "nameEn": "Bronzor",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 57,
      "attack": 24,
      "defense": 86,
      "specialAttack": 24,
      "specialDefense": 86,
      "speed": 23
    },
    "abilities": ["Levitate", "Heatproof", "Heavy Metal"],
    "height": 0.5,
    "weight": 60.5
  },
  {
    "id": 437,
    "name": "ドータクン",
    "nameEn": "Bronzong",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 67,
      "attack": 89,
      "defense": 116,
      "specialAttack": 79,
      "specialDefense": 116,
      "speed": 33
    },
    "abilities": ["Levitate", "Heatproof", "Heavy Metal"],
    "height": 1.3,
    "weight": 187
  },
  {
    "id": 438,
    "name": "ウソハチ",
    "nameEn": "Bonsly",
    "types": ["rock"],
    "baseStats": {
      "hp": 50,
      "attack": 80,
      "defense": 95,
      "specialAttack": 10,
      "specialDefense": 45,
      "speed": 10
    },
    "abilities": ["Sturdy", "Rock Head", "Rattled"],
    "height": 0.5,
    "weight": 15
  },
  {
    "id": 439,
    "name": "マネネ",
    "nameEn": "Mime Jr.",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 20,
      "attack": 25,
      "defense": 45,
      "specialAttack": 70,
      "specialDefense": 90,
      "speed": 60
    },
    "abilities": ["Soundproof", "Filter", "Technician"],
    "height": 0.6,
    "weight": 13
  },
  {
    "id": 440,
    "name": "ピンプク",
    "nameEn": "Happiny",
    "types": ["normal"],
    "baseStats": {
      "hp": 100,
      "attack": 5,
      "defense": 5,
      "specialAttack": 15,
      "specialDefense": 65,
      "speed": 30
    },
    "abilities": ["Natural Cure", "Serene Grace", "Friend Guard"],
    "height": 0.6,
    "weight": 24.4
  },
  {
    "id": 441,
    "name": "ペラップ",
    "nameEn": "Chatot",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 76,
      "attack": 65,
      "defense": 45,
      "specialAttack": 92,
      "specialDefense": 42,
      "speed": 91
    },
    "abilities": ["Keen Eye", "Tangled Feet", "Big Pecks"],
    "height": 0.5,
    "weight": 1.9
  },
  {
    "id": 442,
    "name": "ミカルゲ",
    "nameEn": "Spiritomb",
    "types": ["ghost", "dark"],
    "baseStats": {
      "hp": 50,
      "attack": 92,
      "defense": 108,
      "specialAttack": 92,
      "specialDefense": 108,
      "speed": 35
    },
    "abilities": ["Pressure", "Infiltrator"],
    "height": 1,
    "weight": 108
  },
  {
    "id": 443,
    "name": "フカマル",
    "nameEn": "Gible",
    "types": ["dragon", "ground"],
    "baseStats": {
      "hp": 58,
      "attack": 70,
      "defense": 45,
      "specialAttack": 40,
      "specialDefense": 45,
      "speed": 42
    },
    "abilities": ["Sand Veil", "Rough Skin"],
    "height": 0.7,
    "weight": 20.5
  },
  {
    "id": 444,
    "name": "ガバイト",
    "nameEn": "Gabite",
    "types": ["dragon", "ground"],
    "baseStats": {
      "hp": 68,
      "attack": 90,
      "defense": 65,
      "specialAttack": 50,
      "specialDefense": 55,
      "speed": 82
    },
    "abilities": ["Sand Veil", "Rough Skin"],
    "height": 1.4,
    "weight": 56
  },
  {
    "id": 445,
    "name": "ガブリアス",
    "nameEn": "Garchomp",
    "types": ["dragon", "ground"],
    "baseStats": {
      "hp": 108,
      "attack": 130,
      "defense": 95,
      "specialAttack": 80,
      "specialDefense": 85,
      "speed": 102
    },
    "abilities": ["Sand Veil", "Rough Skin"],
    "height": 1.9,
    "weight": 95
  },
  {
    "id": 446,
    "name": "ゴンベ",
    "nameEn": "Munchlax",
    "types": ["normal"],
    "baseStats": {
      "hp": 135,
      "attack": 85,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 85,
      "speed": 5
    },
    "abilities": ["Pickup", "Thick Fat", "Gluttony"],
    "height": 0.6,
    "weight": 105
  },
  {
    "id": 447,
    "name": "リオル",
    "nameEn": "Riolu",
    "types": ["fighting"],
    "baseStats": {
      "hp": 40,
      "attack": 70,
      "defense": 40,
      "specialAttack": 35,
      "specialDefense": 40,
      "speed": 60
    },
    "abilities": ["Steadfast", "Inner Focus", "Prankster"],
    "height": 0.7,
    "weight": 20.2
  },
  {
    "id": 448,
    "name": "ルカリオ",
    "nameEn": "Lucario",
    "types": ["fighting", "steel"],
    "baseStats": {
      "hp": 70,
      "attack": 110,
      "defense": 70,
      "specialAttack": 115,
      "specialDefense": 70,
      "speed": 90
    },
    "abilities": ["Steadfast", "Inner Focus", "Justified"],
    "height": 1.2,
    "weight": 54
  },
  {
    "id": 449,
    "name": "ヒポポタス",
    "nameEn": "Hippopotas",
    "types": ["ground"],
    "baseStats": {
      "hp": 68,
      "attack": 72,
      "defense": 78,
      "specialAttack": 38,
      "specialDefense": 42,
      "speed": 32
    },
    "abilities": ["Sand Stream", "Sand Force"],
    "height": 0.8,
    "weight": 49.5
  },
  {
    "id": 450,
    "name": "カバルドン",
    "nameEn": "Hippowdon",
    "types": ["ground"],
    "baseStats": {
      "hp": 108,
      "attack": 112,
      "defense": 118,
      "specialAttack": 68,
      "specialDefense": 72,
      "speed": 47
    },
    "abilities": ["Sand Stream", "Sand Force"],
    "height": 2,
    "weight": 300
  },
  {
    "id": 451,
    "name": "スコルピ",
    "nameEn": "Skorupi",
    "types": ["poison", "bug"],
    "baseStats": {
      "hp": 40,
      "attack": 50,
      "defense": 90,
      "specialAttack": 30,
      "specialDefense": 55,
      "speed": 65
    },
    "abilities": ["Battle Armor", "Sniper", "Keen Eye"],
    "height": 0.8,
    "weight": 12
  },
  {
    "id": 452,
    "name": "ドラピオン",
    "nameEn": "Drapion",
    "types": ["poison", "dark"],
    "baseStats": {
      "hp": 70,
      "attack": 90,
      "defense": 110,
      "specialAttack": 60,
      "specialDefense": 75,
      "speed": 95
    },
    "abilities": ["Battle Armor", "Sniper", "Keen Eye"],
    "height": 1.3,
    "weight": 61.5
  },
  {
    "id": 453,
    "name": "グレッグル",
    "nameEn": "Croagunk",
    "types": ["poison", "fighting"],
    "baseStats": {
      "hp": 48,
      "attack": 61,
      "defense": 40,
      "specialAttack": 61,
      "specialDefense": 40,
      "speed": 50
    },
    "abilities": ["Anticipation", "Dry Skin", "Poison Touch"],
    "height": 0.7,
    "weight": 23
  },
  {
    "id": 454,
    "name": "ドクロッグ",
    "nameEn": "Toxicroak",
    "types": ["poison", "fighting"],
    "baseStats": {
      "hp": 83,
      "attack": 106,
      "defense": 65,
      "specialAttack": 86,
      "specialDefense": 65,
      "speed": 85
    },
    "abilities": ["Anticipation", "Dry Skin", "Poison Touch"],
    "height": 1.3,
    "weight": 44.4
  },
  {
    "id": 455,
    "name": "マスキッパ",
    "nameEn": "Carnivine",
    "types": ["grass"],
    "baseStats": {
      "hp": 74,
      "attack": 100,
      "defense": 72,
      "specialAttack": 90,
      "specialDefense": 72,
      "speed": 46
    },
    "abilities": ["Levitate"],
    "height": 1.4,
    "weight": 27
  },
  {
    "id": 456,
    "name": "ケイコウオ",
    "nameEn": "Finneon",
    "types": ["water"],
    "baseStats": {
      "hp": 49,
      "attack": 49,
      "defense": 56,
      "specialAttack": 49,
      "specialDefense": 61,
      "speed": 66
    },
    "abilities": ["Swift Swim", "Storm Drain", "Water Veil"],
    "height": 0.4,
    "weight": 7
  },
  {
    "id": 457,
    "name": "ネオラント",
    "nameEn": "Lumineon",
    "types": ["water"],
    "baseStats": {
      "hp": 69,
      "attack": 69,
      "defense": 76,
      "specialAttack": 69,
      "specialDefense": 86,
      "speed": 91
    },
    "abilities": ["Swift Swim", "Storm Drain", "Water Veil"],
    "height": 1.2,
    "weight": 24
  },
  {
    "id": 458,
    "name": "タマンタ",
    "nameEn": "Mantyke",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 45,
      "attack": 20,
      "defense": 50,
      "specialAttack": 60,
      "specialDefense": 120,
      "speed": 50
    },
    "abilities": ["Swift Swim", "Water Absorb", "Water Veil"],
    "height": 1,
    "weight": 65
  },
  {
    "id": 459,
    "name": "ユキカブリ",
    "nameEn": "Snover",
    "types": ["grass", "ice"],
    "baseStats": {
      "hp": 60,
      "attack": 62,
      "defense": 50,
      "specialAttack": 62,
      "specialDefense": 60,
      "speed": 40
    },
    "abilities": ["Snow Warning", "Soundproof"],
    "height": 1,
    "weight": 50.5
  },
  {
    "id": 460,
    "name": "ユキノオー",
    "nameEn": "Abomasnow",
    "types": ["grass", "ice"],
    "baseStats": {
      "hp": 90,
      "attack": 92,
      "defense": 75,
      "specialAttack": 92,
      "specialDefense": 85,
      "speed": 60
    },
    "abilities": ["Snow Warning", "Soundproof"],
    "height": 2.2,
    "weight": 135.5
  },
  {
    "id": 461,
    "name": "マニューラ",
    "nameEn": "Weavile",
    "types": ["dark", "ice"],
    "baseStats": {
      "hp": 70,
      "attack": 120,
      "defense": 65,
      "specialAttack": 45,
      "specialDefense": 85,
      "speed": 125
    },
    "abilities": ["Pressure", "Pickpocket"],
    "height": 1.1,
    "weight": 34
  },
  {
    "id": 462,
    "name": "ジバコイル",
    "nameEn": "Magnezone",
    "types": ["electric", "steel"],
    "baseStats": {
      "hp": 70,
      "attack": 70,
      "defense": 115,
      "specialAttack": 130,
      "specialDefense": 90,
      "speed": 60
    },
    "abilities": ["Magnet Pull", "Sturdy", "Analytic"],
    "height": 1.2,
    "weight": 180
  },
  {
    "id": 463,
    "name": "ベロベルト",
    "nameEn": "Lickilicky",
    "types": ["normal"],
    "baseStats": {
      "hp": 110,
      "attack": 85,
      "defense": 95,
      "specialAttack": 80,
      "specialDefense": 95,
      "speed": 50
    },
    "abilities": ["Own Tempo", "Oblivious", "Cloud Nine"],
    "height": 1.7,
    "weight": 140
  },
  {
    "id": 464,
    "name": "ドサイドン",
    "nameEn": "Rhyperior",
    "types": ["ground", "rock"],
    "baseStats": {
      "hp": 115,
      "attack": 140,
      "defense": 130,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 40
    },
    "abilities": ["Lightning Rod", "Solid Rock", "Reckless"],
    "height": 2.4,
    "weight": 282.8
  },
  {
    "id": 465,
    "name": "モジャンボ",
    "nameEn": "Tangrowth",
    "types": ["grass"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 125,
      "specialAttack": 110,
      "specialDefense": 50,
      "speed": 50
    },
    "abilities": ["Chlorophyll", "Leaf Guard", "Regenerator"],
    "height": 2,
    "weight": 128.6
  },
  {
    "id": 466,
    "name": "エレキブル",
    "nameEn": "Electivire",
    "types": ["electric"],
    "baseStats": {
      "hp": 75,
      "attack": 123,
      "defense": 67,
      "specialAttack": 95,
      "specialDefense": 85,
      "speed": 95
    },
    "abilities": ["Motor Drive", "Vital Spirit"],
    "height": 1.8,
    "weight": 138.6
  },
  {
    "id": 467,
    "name": "ブーバーン",
    "nameEn": "Magmortar",
    "types": ["fire"],
    "baseStats": {
      "hp": 75,
      "attack": 95,
      "defense": 67,
      "specialAttack": 125,
      "specialDefense": 95,
      "speed": 83
    },
    "abilities": ["Flame Body", "Vital Spirit"],
    "height": 1.6,
    "weight": 68
  },
  {
    "id": 468,
    "name": "トゲキッス",
    "nameEn": "Togekiss",
    "types": ["fairy", "flying"],
    "baseStats": {
      "hp": 85,
      "attack": 50,
      "defense": 95,
      "specialAttack": 120,
      "specialDefense": 115,
      "speed": 80
    },
    "abilities": ["Hustle", "Serene Grace", "Super Luck"],
    "height": 1.5,
    "weight": 38
  },
  {
    "id": 469,
    "name": "メガヤンマ",
    "nameEn": "Yanmega",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 86,
      "attack": 76,
      "defense": 86,
      "specialAttack": 116,
      "specialDefense": 56,
      "speed": 95
    },
    "abilities": ["Speed Boost", "Tinted Lens", "Frisk"],
    "height": 1.9,
    "weight": 51.5
  },
  {
    "id": 470,
    "name": "リーフィア",
    "nameEn": "Leafeon",
    "types": ["grass"],
    "baseStats": {
      "hp": 65,
      "attack": 110,
      "defense": 130,
      "specialAttack": 60,
      "specialDefense": 65,
      "speed": 95
    },
    "abilities": ["Leaf Guard", "Chlorophyll"],
    "height": 1,
    "weight": 25.5
  },
  {
    "id": 471,
    "name": "グレイシア",
    "nameEn": "Glaceon",
    "types": ["ice"],
    "baseStats": {
      "hp": 65,
      "attack": 60,
      "defense": 110,
      "specialAttack": 130,
      "specialDefense": 95,
      "speed": 65
    },
    "abilities": ["Snow Cloak", "Ice Body"],
    "height": 0.8,
    "weight": 25.9
  },
  {
    "id": 472,
    "name": "グライオン",
    "nameEn": "Gliscor",
    "types": ["ground", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 95,
      "defense": 125,
      "specialAttack": 45,
      "specialDefense": 75,
      "speed": 95
    },
    "abilities": ["Hyper Cutter", "Sand Veil", "Poison Heal"],
    "height": 2,
    "weight": 42.5
  },
  {
    "id": 473,
    "name": "マンムー",
    "nameEn": "Mamoswine",
    "types": ["ice", "ground"],
    "baseStats": {
      "hp": 110,
      "attack": 130,
      "defense": 80,
      "specialAttack": 70,
      "specialDefense": 60,
      "speed": 80
    },
    "abilities": ["Oblivious", "Snow Cloak", "Thick Fat"],
    "height": 2.5,
    "weight": 291
  },
  {
    "id": 474,
    "name": "ポリゴンＺ",
    "nameEn": "Porygon-Z",
    "types": ["normal"],
    "baseStats": {
      "hp": 85,
      "attack": 80,
      "defense": 70,
      "specialAttack": 135,
      "specialDefense": 75,
      "speed": 90
    },
    "abilities": ["Adaptability", "Download", "Analytic"],
    "height": 0.9,
    "weight": 34
  },
  {
    "id": 475,
    "name": "エルレイド",
    "nameEn": "Gallade",
    "types": ["psychic", "fighting"],
    "baseStats": {
      "hp": 68,
      "attack": 125,
      "defense": 65,
      "specialAttack": 65,
      "specialDefense": 115,
      "speed": 80
    },
    "abilities": ["Steadfast", "Sharpness", "Justified"],
    "height": 1.6,
    "weight": 52
  },
  {
    "id": 476,
    "name": "ダイノーズ",
    "nameEn": "Probopass",
    "types": ["rock", "steel"],
    "baseStats": {
      "hp": 60,
      "attack": 55,
      "defense": 145,
      "specialAttack": 75,
      "specialDefense": 150,
      "speed": 40
    },
    "abilities": ["Sturdy", "Magnet Pull", "Sand Force"],
    "height": 1.4,
    "weight": 340
  },
  {
    "id": 477,
    "name": "ヨノワール",
    "nameEn": "Dusknoir",
    "types": ["ghost"],
    "baseStats": {
      "hp": 45,
      "attack": 100,
      "defense": 135,
      "specialAttack": 65,
      "specialDefense": 135,
      "speed": 45
    },
    "abilities": ["Pressure", "Frisk"],
    "height": 2.2,
    "weight": 106.6
  },
  {
    "id": 478,
    "name": "ユキメノコ",
    "nameEn": "Froslass",
    "types": ["ice", "ghost"],
    "baseStats": {
      "hp": 70,
      "attack": 80,
      "defense": 70,
      "specialAttack": 80,
      "specialDefense": 70,
      "speed": 110
    },
    "abilities": ["Snow Cloak", "Cursed Body"],
    "height": 1.3,
    "weight": 26.6
  },
  {
    "id": 479,
    "name": "ロトム",
    "nameEn": "Rotom",
    "types": ["electric", "ghost"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 77,
      "specialAttack": 95,
      "specialDefense": 77,
      "speed": 91
    },
    "abilities": ["Levitate"],
    "height": 0.3,
    "weight": 0.3
  },
  {
    "id": 480,
    "name": "ユクシー",
    "nameEn": "Uxie",
    "types": ["psychic"],
    "baseStats": {
      "hp": 75,
      "attack": 75,
      "defense": 130,
      "specialAttack": 75,
      "specialDefense": 130,
      "speed": 95
    },
    "abilities": ["Levitate"],
    "height": 0.3,
    "weight": 0.3
  },
  {
    "id": 481,
    "name": "エムリット",
    "nameEn": "Mesprit",
    "types": ["psychic"],
    "baseStats": {
      "hp": 80,
      "attack": 105,
      "defense": 105,
      "specialAttack": 105,
      "specialDefense": 105,
      "speed": 80
    },
    "abilities": ["Levitate"],
    "height": 0.3,
    "weight": 0.3
  },
  {
    "id": 482,
    "name": "アグノム",
    "nameEn": "Azelf",
    "types": ["psychic"],
    "baseStats": {
      "hp": 75,
      "attack": 125,
      "defense": 70,
      "specialAttack": 125,
      "specialDefense": 70,
      "speed": 115
    },
    "abilities": ["Levitate"],
    "height": 0.3,
    "weight": 0.3
  },
  {
    "id": 483,
    "name": "ディアルガ",
    "nameEn": "Dialga",
    "types": ["steel", "dragon"],
    "baseStats": {
      "hp": 100,
      "attack": 120,
      "defense": 120,
      "specialAttack": 150,
      "specialDefense": 100,
      "speed": 90
    },
    "abilities": ["Pressure", "Telepathy"],
    "height": 5.4,
    "weight": 683
  },
  {
    "id": 484,
    "name": "パルキア",
    "nameEn": "Palkia",
    "types": ["water", "dragon"],
    "baseStats": {
      "hp": 90,
      "attack": 120,
      "defense": 100,
      "specialAttack": 150,
      "specialDefense": 120,
      "speed": 100
    },
    "abilities": ["Pressure", "Telepathy"],
    "height": 4.2,
    "weight": 336
  },
  {
    "id": 485,
    "name": "ヒードラン",
    "nameEn": "Heatran",
    "types": ["fire", "steel"],
    "baseStats": {
      "hp": 91,
      "attack": 90,
      "defense": 106,
      "specialAttack": 130,
      "specialDefense": 106,
      "speed": 77
    },
    "abilities": ["Flash Fire", "Flame Body"],
    "height": 1.7,
    "weight": 430
  },
  {
    "id": 486,
    "name": "レジギガス",
    "nameEn": "Regigigas",
    "types": ["normal"],
    "baseStats": {
      "hp": 110,
      "attack": 160,
      "defense": 110,
      "specialAttack": 80,
      "specialDefense": 110,
      "speed": 100
    },
    "abilities": ["Slow Start"],
    "height": 3.7,
    "weight": 420
  },
  {
    "id": 487,
    "name": "ギラティナ (アナザーフォルム)",
    "nameEn": "Giratina",
    "types": ["ghost", "dragon"],
    "baseStats": {
      "hp": 150,
      "attack": 100,
      "defense": 120,
      "specialAttack": 100,
      "specialDefense": 120,
      "speed": 90
    },
    "abilities": ["Pressure", "Telepathy"],
    "height": 4.5,
    "weight": 750
  },
  {
    "id": 488,
    "name": "クレセリア",
    "nameEn": "Cresselia",
    "types": ["psychic"],
    "baseStats": {
      "hp": 120,
      "attack": 70,
      "defense": 110,
      "specialAttack": 75,
      "specialDefense": 120,
      "speed": 85
    },
    "abilities": ["Levitate"],
    "height": 1.5,
    "weight": 85.6
  },
  {
    "id": 489,
    "name": "フィオネ",
    "nameEn": "Phione",
    "types": ["water"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 80,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 80
    },
    "abilities": ["Hydration"],
    "height": 0.4,
    "weight": 3.1
  },
  {
    "id": 490,
    "name": "マナフィ",
    "nameEn": "Manaphy",
    "types": ["water"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Hydration"],
    "height": 0.3,
    "weight": 1.4
  },
  {
    "id": 491,
    "name": "ダークライ",
    "nameEn": "Darkrai",
    "types": ["dark"],
    "baseStats": {
      "hp": 70,
      "attack": 90,
      "defense": 90,
      "specialAttack": 135,
      "specialDefense": 90,
      "speed": 125
    },
    "abilities": ["Bad Dreams"],
    "height": 1.5,
    "weight": 50.5
  },
  {
    "id": 492,
    "name": "シェイミ",
    "nameEn": "Shaymin",
    "types": ["grass"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Natural Cure"],
    "height": 0.2,
    "weight": 2.1
  },
  {
    "id": 493,
    "name": "アルセウス",
    "nameEn": "Arceus",
    "types": ["normal"],
    "baseStats": {
      "hp": 120,
      "attack": 120,
      "defense": 120,
      "specialAttack": 120,
      "specialDefense": 120,
      "speed": 120
    },
    "abilities": ["Multitype"],
    "height": 3.2,
    "weight": 320
  },
  
  {
    "id": 494,
    "name": "ビクティニ",
    "nameEn": "Victini",
    "types": ["psychic", "fire"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 100,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 100
    },
    "abilities": ["Victory Star"],
    "height": 0.4,
    "weight": 4
  },
  {
    "id": 495,
    "name": "ツタージャ",
    "nameEn": "Snivy",
    "types": ["grass"],
    "baseStats": {
      "hp": 45,
      "attack": 45,
      "defense": 55,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 63
    },
    "abilities": ["Overgrow", "Contrary"],
    "height": 0.6,
    "weight": 8.1
  },
  {
    "id": 496,
    "name": "ジャノビー",
    "nameEn": "Servine",
    "types": ["grass"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 75,
      "specialAttack": 60,
      "specialDefense": 75,
      "speed": 83
    },
    "abilities": ["Overgrow", "Contrary"],
    "height": 0.8,
    "weight": 16
  },
  {
    "id": 497,
    "name": "ジャローダ",
    "nameEn": "Serperior",
    "types": ["grass"],
    "baseStats": {
      "hp": 75,
      "attack": 75,
      "defense": 95,
      "specialAttack": 75,
      "specialDefense": 95,
      "speed": 113
    },
    "abilities": ["Overgrow", "Contrary"],
    "height": 3.3,
    "weight": 63
  },
  {
    "id": 498,
    "name": "ポカブ",
    "nameEn": "Tepig",
    "types": ["fire"],
    "baseStats": {
      "hp": 65,
      "attack": 63,
      "defense": 45,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 45
    },
    "abilities": ["Blaze", "Thick Fat"],
    "height": 0.5,
    "weight": 9.9
  },
  {
    "id": 499,
    "name": "チャオブー",
    "nameEn": "Pignite",
    "types": ["fire", "fighting"],
    "baseStats": {
      "hp": 90,
      "attack": 93,
      "defense": 55,
      "specialAttack": 70,
      "specialDefense": 55,
      "speed": 55
    },
    "abilities": ["Blaze", "Thick Fat"],
    "height": 1,
    "weight": 55.5
  },
  {
    "id": 500,
    "name": "エンブオー",
    "nameEn": "Emboar",
    "types": ["fire", "fighting"],
    "baseStats": {
      "hp": 110,
      "attack": 123,
      "defense": 65,
      "specialAttack": 100,
      "specialDefense": 65,
      "speed": 65
    },
    "abilities": ["Blaze", "Reckless"],
    "height": 1.6,
    "weight": 150
  },
  {
    "id": 501,
    "name": "ミジュマル",
    "nameEn": "Oshawott",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 45,
      "specialAttack": 63,
      "specialDefense": 45,
      "speed": 45
    },
    "abilities": ["Torrent", "Shell Armor"],
    "height": 0.5,
    "weight": 5.9
  },
  {
    "id": 502,
    "name": "フタチマル",
    "nameEn": "Dewott",
    "types": ["water"],
    "baseStats": {
      "hp": 75,
      "attack": 75,
      "defense": 60,
      "specialAttack": 83,
      "specialDefense": 60,
      "speed": 60
    },
    "abilities": ["Torrent", "Shell Armor"],
    "height": 0.8,
    "weight": 24.5
  },
  {
    "id": 503,
    "name": "ダイケンキ",
    "nameEn": "Samurott",
    "types": ["water"],
    "baseStats": {
      "hp": 95,
      "attack": 100,
      "defense": 85,
      "specialAttack": 108,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Torrent", "Shell Armor"],
    "height": 1.5,
    "weight": 94.6
  },
  {
    "id": 504,
    "name": "ミネズミ",
    "nameEn": "Patrat",
    "types": ["normal"],
    "baseStats": {
      "hp": 45,
      "attack": 55,
      "defense": 39,
      "specialAttack": 35,
      "specialDefense": 39,
      "speed": 42
    },
    "abilities": ["Run Away", "Keen Eye", "Analytic"],
    "height": 0.5,
    "weight": 11.6
  },
  {
    "id": 505,
    "name": "ミルホッグ",
    "nameEn": "Watchog",
    "types": ["normal"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 69,
      "specialAttack": 60,
      "specialDefense": 69,
      "speed": 77
    },
    "abilities": ["Illuminate", "Keen Eye", "Analytic"],
    "height": 1.1,
    "weight": 27
  },
  {
    "id": 506,
    "name": "ヨーテリー",
    "nameEn": "Lillipup",
    "types": ["normal"],
    "baseStats": {
      "hp": 45,
      "attack": 60,
      "defense": 45,
      "specialAttack": 25,
      "specialDefense": 45,
      "speed": 55
    },
    "abilities": ["Vital Spirit", "Pickup", "Run Away"],
    "height": 0.4,
    "weight": 4.1
  },
  {
    "id": 507,
    "name": "ハーデリア",
    "nameEn": "Herdier",
    "types": ["normal"],
    "baseStats": {
      "hp": 65,
      "attack": 80,
      "defense": 65,
      "specialAttack": 35,
      "specialDefense": 65,
      "speed": 60
    },
    "abilities": ["Intimidate", "Sand Rush", "Scrappy"],
    "height": 0.9,
    "weight": 14.7
  },
  {
    "id": 508,
    "name": "ムーランド",
    "nameEn": "Stoutland",
    "types": ["normal"],
    "baseStats": {
      "hp": 85,
      "attack": 110,
      "defense": 90,
      "specialAttack": 45,
      "specialDefense": 90,
      "speed": 80
    },
    "abilities": ["Intimidate", "Sand Rush", "Scrappy"],
    "height": 1.2,
    "weight": 61
  },
  {
    "id": 509,
    "name": "チョロネコ",
    "nameEn": "Purrloin",
    "types": ["dark"],
    "baseStats": {
      "hp": 41,
      "attack": 50,
      "defense": 37,
      "specialAttack": 50,
      "specialDefense": 37,
      "speed": 66
    },
    "abilities": ["Limber", "Unburden", "Prankster"],
    "height": 0.4,
    "weight": 10.1
  },
  {
    "id": 510,
    "name": "レパルダス",
    "nameEn": "Liepard",
    "types": ["dark"],
    "baseStats": {
      "hp": 64,
      "attack": 88,
      "defense": 50,
      "specialAttack": 88,
      "specialDefense": 50,
      "speed": 106
    },
    "abilities": ["Limber", "Unburden", "Prankster"],
    "height": 1.1,
    "weight": 37.5
  },
  {
    "id": 511,
    "name": "ヤナップ",
    "nameEn": "Pansage",
    "types": ["grass"],
    "baseStats": {
      "hp": 50,
      "attack": 53,
      "defense": 48,
      "specialAttack": 53,
      "specialDefense": 48,
      "speed": 64
    },
    "abilities": ["Gluttony", "Overgrow"],
    "height": 0.6,
    "weight": 10.5
  },
  {
    "id": 512,
    "name": "ヤナッキー",
    "nameEn": "Simisage",
    "types": ["grass"],
    "baseStats": {
      "hp": 75,
      "attack": 98,
      "defense": 63,
      "specialAttack": 98,
      "specialDefense": 63,
      "speed": 101
    },
    "abilities": ["Gluttony", "Overgrow"],
    "height": 1.1,
    "weight": 30.5
  },
  {
    "id": 513,
    "name": "バオップ",
    "nameEn": "Pansear",
    "types": ["fire"],
    "baseStats": {
      "hp": 50,
      "attack": 53,
      "defense": 48,
      "specialAttack": 53,
      "specialDefense": 48,
      "speed": 64
    },
    "abilities": ["Gluttony", "Blaze"],
    "height": 0.6,
    "weight": 11
  },
  {
    "id": 514,
    "name": "バオッキー",
    "nameEn": "Simisear",
    "types": ["fire"],
    "baseStats": {
      "hp": 75,
      "attack": 98,
      "defense": 63,
      "specialAttack": 98,
      "specialDefense": 63,
      "speed": 101
    },
    "abilities": ["Gluttony", "Blaze"],
    "height": 1,
    "weight": 28
  },
  {
    "id": 515,
    "name": "ヒヤップ",
    "nameEn": "Panpour",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 53,
      "defense": 48,
      "specialAttack": 53,
      "specialDefense": 48,
      "speed": 64
    },
    "abilities": ["Gluttony", "Torrent"],
    "height": 0.6,
    "weight": 13.5
  },
  {
    "id": 516,
    "name": "ヒヤッキー",
    "nameEn": "Simipour",
    "types": ["water"],
    "baseStats": {
      "hp": 75,
      "attack": 98,
      "defense": 63,
      "specialAttack": 98,
      "specialDefense": 63,
      "speed": 101
    },
    "abilities": ["Gluttony", "Torrent"],
    "height": 1,
    "weight": 29
  },
  {
    "id": 517,
    "name": "ムンナ",
    "nameEn": "Munna",
    "types": ["psychic"],
    "baseStats": {
      "hp": 76,
      "attack": 25,
      "defense": 45,
      "specialAttack": 67,
      "specialDefense": 55,
      "speed": 24
    },
    "abilities": ["Forewarn", "Synchronize", "Telepathy"],
    "height": 0.6,
    "weight": 23.3
  },
  {
    "id": 518,
    "name": "ムシャーナ",
    "nameEn": "Musharna",
    "types": ["psychic"],
    "baseStats": {
      "hp": 116,
      "attack": 55,
      "defense": 85,
      "specialAttack": 107,
      "specialDefense": 95,
      "speed": 29
    },
    "abilities": ["Forewarn", "Synchronize", "Telepathy"],
    "height": 1.1,
    "weight": 60.5
  },
  {
    "id": 519,
    "name": "マメパト",
    "nameEn": "Pidove",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 50,
      "attack": 55,
      "defense": 50,
      "specialAttack": 36,
      "specialDefense": 30,
      "speed": 43
    },
    "abilities": ["Big Pecks", "Super Luck", "Rivalry"],
    "height": 0.3,
    "weight": 2.1
  },
  {
    "id": 520,
    "name": "ハトーボー",
    "nameEn": "Tranquill",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 62,
      "attack": 77,
      "defense": 62,
      "specialAttack": 50,
      "specialDefense": 42,
      "speed": 65
    },
    "abilities": ["Big Pecks", "Super Luck", "Rivalry"],
    "height": 0.6,
    "weight": 15
  },
  {
    "id": 521,
    "name": "ケンホロウ",
    "nameEn": "Unfezant",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 80,
      "attack": 115,
      "defense": 80,
      "specialAttack": 65,
      "specialDefense": 55,
      "speed": 93
    },
    "abilities": ["Big Pecks", "Super Luck", "Rivalry"],
    "height": 1.2,
    "weight": 29
  },
  {
    "id": 522,
    "name": "シママ",
    "nameEn": "Blitzle",
    "types": ["electric"],
    "baseStats": {
      "hp": 45,
      "attack": 60,
      "defense": 32,
      "specialAttack": 50,
      "specialDefense": 32,
      "speed": 76
    },
    "abilities": ["Lightning Rod", "Motor Drive", "Sap Sipper"],
    "height": 0.8,
    "weight": 29.8
  },
  {
    "id": 523,
    "name": "ゼブライカ",
    "nameEn": "Zebstrika",
    "types": ["electric"],
    "baseStats": {
      "hp": 75,
      "attack": 100,
      "defense": 63,
      "specialAttack": 80,
      "specialDefense": 63,
      "speed": 116
    },
    "abilities": ["Lightning Rod", "Motor Drive", "Sap Sipper"],
    "height": 1.6,
    "weight": 79.5
  },
  {
    "id": 524,
    "name": "ダンゴロ",
    "nameEn": "Roggenrola",
    "types": ["rock"],
    "baseStats": {
      "hp": 55,
      "attack": 75,
      "defense": 85,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 15
    },
    "abilities": ["Sturdy", "Weak Armor", "Sand Force"],
    "height": 0.4,
    "weight": 18
  },
  {
    "id": 525,
    "name": "ガントル",
    "nameEn": "Boldore",
    "types": ["rock"],
    "baseStats": {
      "hp": 70,
      "attack": 105,
      "defense": 105,
      "specialAttack": 50,
      "specialDefense": 40,
      "speed": 20
    },
    "abilities": ["Sturdy", "Weak Armor", "Sand Force"],
    "height": 0.9,
    "weight": 102
  },
  {
    "id": 526,
    "name": "ギガイアス",
    "nameEn": "Gigalith",
    "types": ["rock"],
    "baseStats": {
      "hp": 85,
      "attack": 135,
      "defense": 130,
      "specialAttack": 60,
      "specialDefense": 80,
      "speed": 25
    },
    "abilities": ["Sturdy", "Sand Stream", "Sand Force"],
    "height": 1.7,
    "weight": 260
  },
  {
    "id": 527,
    "name": "コロモリ",
    "nameEn": "Woobat",
    "types": ["psychic", "flying"],
    "baseStats": {
      "hp": 65,
      "attack": 45,
      "defense": 43,
      "specialAttack": 55,
      "specialDefense": 43,
      "speed": 72
    },
    "abilities": ["Unaware", "Klutz", "Simple"],
    "height": 0.4,
    "weight": 2.1
  },
  {
    "id": 528,
    "name": "ココロモリ",
    "nameEn": "Swoobat",
    "types": ["psychic", "flying"],
    "baseStats": {
      "hp": 67,
      "attack": 57,
      "defense": 55,
      "specialAttack": 77,
      "specialDefense": 55,
      "speed": 114
    },
    "abilities": ["Unaware", "Klutz", "Simple"],
    "height": 0.9,
    "weight": 10.5
  },
  {
    "id": 529,
    "name": "モグリュー",
    "nameEn": "Drilbur",
    "types": ["ground"],
    "baseStats": {
      "hp": 60,
      "attack": 85,
      "defense": 40,
      "specialAttack": 30,
      "specialDefense": 45,
      "speed": 68
    },
    "abilities": ["Sand Rush", "Sand Force", "Mold Breaker"],
    "height": 0.3,
    "weight": 8.5
  },
  {
    "id": 530,
    "name": "ドリュウズ",
    "nameEn": "Excadrill",
    "types": ["ground", "steel"],
    "baseStats": {
      "hp": 110,
      "attack": 135,
      "defense": 60,
      "specialAttack": 50,
      "specialDefense": 65,
      "speed": 88
    },
    "abilities": ["Sand Rush", "Sand Force", "Mold Breaker"],
    "height": 0.7,
    "weight": 40.4
  },
  {
    "id": 531,
    "name": "タブンネ",
    "nameEn": "Audino",
    "types": ["normal"],
    "baseStats": {
      "hp": 103,
      "attack": 60,
      "defense": 86,
      "specialAttack": 60,
      "specialDefense": 86,
      "speed": 50
    },
    "abilities": ["Healer", "Regenerator", "Klutz"],
    "height": 1.1,
    "weight": 31
  },
  {
    "id": 532,
    "name": "ドッコラー",
    "nameEn": "Timburr",
    "types": ["fighting"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 55,
      "specialAttack": 25,
      "specialDefense": 35,
      "speed": 35
    },
    "abilities": ["Guts", "Sheer Force", "Iron Fist"],
    "height": 0.6,
    "weight": 12.5
  },
  {
    "id": 533,
    "name": "ドテッコツ",
    "nameEn": "Gurdurr",
    "types": ["fighting"],
    "baseStats": {
      "hp": 85,
      "attack": 105,
      "defense": 85,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 40
    },
    "abilities": ["Guts", "Sheer Force", "Iron Fist"],
    "height": 1.2,
    "weight": 40
  },
  {
    "id": 534,
    "name": "ローブシン",
    "nameEn": "Conkeldurr",
    "types": ["fighting"],
    "baseStats": {
      "hp": 105,
      "attack": 140,
      "defense": 95,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 45
    },
    "abilities": ["Guts", "Sheer Force", "Iron Fist"],
    "height": 1.4,
    "weight": 87
  },
  {
    "id": 535,
    "name": "オタマロ",
    "nameEn": "Tympole",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 40,
      "speed": 64
    },
    "abilities": ["Swift Swim", "Hydration", "Water Absorb"],
    "height": 0.5,
    "weight": 4.5
  },
  {
    "id": 536,
    "name": "ガマガル",
    "nameEn": "Palpitoad",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 75,
      "attack": 65,
      "defense": 55,
      "specialAttack": 65,
      "specialDefense": 55,
      "speed": 69
    },
    "abilities": ["Swift Swim", "Hydration", "Water Absorb"],
    "height": 0.8,
    "weight": 17
  },
  {
    "id": 537,
    "name": "ガマゲロゲ",
    "nameEn": "Seismitoad",
    "types": ["water", "ground"],
    "baseStats": {
      "hp": 105,
      "attack": 95,
      "defense": 75,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 74
    },
    "abilities": ["Swift Swim", "Poison Touch", "Water Absorb"],
    "height": 1.5,
    "weight": 62
  },
  {
    "id": 538,
    "name": "ナゲキ",
    "nameEn": "Throh",
    "types": ["fighting"],
    "baseStats": {
      "hp": 120,
      "attack": 100,
      "defense": 85,
      "specialAttack": 30,
      "specialDefense": 85,
      "speed": 45
    },
    "abilities": ["Guts", "Inner Focus", "Mold Breaker"],
    "height": 1.3,
    "weight": 55.5
  },
  {
    "id": 539,
    "name": "ダゲキ",
    "nameEn": "Sawk",
    "types": ["fighting"],
    "baseStats": {
      "hp": 75,
      "attack": 125,
      "defense": 75,
      "specialAttack": 30,
      "specialDefense": 75,
      "speed": 85
    },
    "abilities": ["Sturdy", "Inner Focus", "Mold Breaker"],
    "height": 1.4,
    "weight": 51
  },
  {
    "id": 540,
    "name": "クルミル",
    "nameEn": "Sewaddle",
    "types": ["bug", "grass"],
    "baseStats": {
      "hp": 45,
      "attack": 53,
      "defense": 70,
      "specialAttack": 40,
      "specialDefense": 60,
      "speed": 42
    },
    "abilities": ["Swarm", "Chlorophyll", "Overcoat"],
    "height": 0.3,
    "weight": 2.5
  },
  {
    "id": 541,
    "name": "クルマユ",
    "nameEn": "Swadloon",
    "types": ["bug", "grass"],
    "baseStats": {
      "hp": 55,
      "attack": 63,
      "defense": 90,
      "specialAttack": 50,
      "specialDefense": 80,
      "speed": 42
    },
    "abilities": ["Leaf Guard", "Chlorophyll", "Overcoat"],
    "height": 0.5,
    "weight": 7.3
  },
  {
    "id": 542,
    "name": "ハハコモリ",
    "nameEn": "Leavanny",
    "types": ["bug", "grass"],
    "baseStats": {
      "hp": 75,
      "attack": 103,
      "defense": 80,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 92
    },
    "abilities": ["Swarm", "Chlorophyll", "Overcoat"],
    "height": 1.2,
    "weight": 20.5
  },
  {
    "id": 543,
    "name": "フシデ",
    "nameEn": "Venipede",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 30,
      "attack": 45,
      "defense": 59,
      "specialAttack": 30,
      "specialDefense": 39,
      "speed": 57
    },
    "abilities": ["Poison Point", "Swarm", "Speed Boost"],
    "height": 0.4,
    "weight": 5.3
  },
  {
    "id": 544,
    "name": "ホイーガ",
    "nameEn": "Whirlipede",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 40,
      "attack": 55,
      "defense": 99,
      "specialAttack": 40,
      "specialDefense": 79,
      "speed": 47
    },
    "abilities": ["Poison Point", "Swarm", "Speed Boost"],
    "height": 1.2,
    "weight": 58.5
  },
  {
    "id": 545,
    "name": "ペンドラー",
    "nameEn": "Scolipede",
    "types": ["bug", "poison"],
    "baseStats": {
      "hp": 60,
      "attack": 100,
      "defense": 89,
      "specialAttack": 55,
      "specialDefense": 69,
      "speed": 112
    },
    "abilities": ["Poison Point", "Swarm", "Speed Boost"],
    "height": 2.5,
    "weight": 200.5
  },
  {
    "id": 546,
    "name": "モンメン",
    "nameEn": "Cottonee",
    "types": ["grass", "fairy"],
    "baseStats": {
      "hp": 40,
      "attack": 27,
      "defense": 60,
      "specialAttack": 37,
      "specialDefense": 50,
      "speed": 66
    },
    "abilities": ["Prankster", "Infiltrator", "Chlorophyll"],
    "height": 0.3,
    "weight": 0.6
  },
  {
    "id": 547,
    "name": "エルフーン",
    "nameEn": "Whimsicott",
    "types": ["grass", "fairy"],
    "baseStats": {
      "hp": 60,
      "attack": 67,
      "defense": 85,
      "specialAttack": 77,
      "specialDefense": 75,
      "speed": 116
    },
    "abilities": ["Prankster", "Infiltrator", "Chlorophyll"],
    "height": 0.7,
    "weight": 6.6
  },
  {
    "id": 548,
    "name": "チュリネ",
    "nameEn": "Petilil",
    "types": ["grass"],
    "baseStats": {
      "hp": 45,
      "attack": 35,
      "defense": 50,
      "specialAttack": 70,
      "specialDefense": 50,
      "speed": 30
    },
    "abilities": ["Chlorophyll", "Own Tempo", "Leaf Guard"],
    "height": 0.5,
    "weight": 6.6
  },
  {
    "id": 549,
    "name": "ドレディア",
    "nameEn": "Lilligant",
    "types": ["grass"],
    "baseStats": {
      "hp": 70,
      "attack": 60,
      "defense": 75,
      "specialAttack": 110,
      "specialDefense": 75,
      "speed": 90
    },
    "abilities": ["Chlorophyll", "Own Tempo", "Leaf Guard"],
    "height": 1.1,
    "weight": 16.3
  },
  {
    "id": 550,
    "name": "バスラオ (あかすじのすがた)",
    "nameEn": "Basculin",
    "types": ["water"],
    "baseStats": {
      "hp": 70,
      "attack": 92,
      "defense": 65,
      "specialAttack": 80,
      "specialDefense": 55,
      "speed": 98
    },
    "abilities": ["Reckless", "Adaptability", "Mold Breaker"],
    "height": 1,
    "weight": 18
  },
  {
    "id": 551,
    "name": "メグロコ",
    "nameEn": "Sandile",
    "types": ["ground", "dark"],
    "baseStats": {
      "hp": 50,
      "attack": 72,
      "defense": 35,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 65
    },
    "abilities": ["Intimidate", "Moxie", "Anger Point"],
    "height": 0.7,
    "weight": 15.2
  },
  {
    "id": 552,
    "name": "ワルビル",
    "nameEn": "Krokorok",
    "types": ["ground", "dark"],
    "baseStats": {
      "hp": 60,
      "attack": 82,
      "defense": 45,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 74
    },
    "abilities": ["Intimidate", "Moxie", "Anger Point"],
    "height": 1,
    "weight": 33.4
  },
  {
    "id": 553,
    "name": "ワルビアル",
    "nameEn": "Krookodile",
    "types": ["ground", "dark"],
    "baseStats": {
      "hp": 95,
      "attack": 117,
      "defense": 80,
      "specialAttack": 65,
      "specialDefense": 70,
      "speed": 92
    },
    "abilities": ["Intimidate", "Moxie", "Anger Point"],
    "height": 1.5,
    "weight": 96.3
  },
  {
    "id": 554,
    "name": "ダルマッカ",
    "nameEn": "Darumaka",
    "types": ["fire"],
    "baseStats": {
      "hp": 70,
      "attack": 90,
      "defense": 45,
      "specialAttack": 15,
      "specialDefense": 45,
      "speed": 50
    },
    "abilities": ["Hustle", "Inner Focus"],
    "height": 0.6,
    "weight": 37.5
  },
  {
    "id": 555,
    "name": "ヒヒダルマ (ノーマルモード)",
    "nameEn": "Darmanitan",
    "types": ["fire"],
    "baseStats": {
      "hp": 105,
      "attack": 140,
      "defense": 55,
      "specialAttack": 30,
      "specialDefense": 55,
      "speed": 95
    },
    "abilities": ["Sheer Force", "Zen Mode"],
    "height": 1.3,
    "weight": 92.9
  },
  {
    "id": 556,
    "name": "マラカッチ",
    "nameEn": "Maractus",
    "types": ["grass"],
    "baseStats": {
      "hp": 75,
      "attack": 86,
      "defense": 67,
      "specialAttack": 106,
      "specialDefense": 67,
      "speed": 60
    },
    "abilities": ["Water Absorb", "Chlorophyll", "Storm Drain"],
    "height": 1,
    "weight": 28
  },
  {
    "id": 557,
    "name": "イシズマイ",
    "nameEn": "Dwebble",
    "types": ["bug", "rock"],
    "baseStats": {
      "hp": 50,
      "attack": 65,
      "defense": 85,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 55
    },
    "abilities": ["Sturdy", "Shell Armor", "Weak Armor"],
    "height": 0.3,
    "weight": 14.5
  },
  {
    "id": 558,
    "name": "イワパレス",
    "nameEn": "Crustle",
    "types": ["bug", "rock"],
    "baseStats": {
      "hp": 70,
      "attack": 105,
      "defense": 125,
      "specialAttack": 65,
      "specialDefense": 75,
      "speed": 45
    },
    "abilities": ["Sturdy", "Shell Armor", "Weak Armor"],
    "height": 1.4,
    "weight": 200
  },
  {
    "id": 559,
    "name": "ズルッグ",
    "nameEn": "Scraggy",
    "types": ["dark", "fighting"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 70,
      "specialAttack": 35,
      "specialDefense": 70,
      "speed": 48
    },
    "abilities": ["Shed Skin", "Moxie", "Intimidate"],
    "height": 0.6,
    "weight": 11.8
  },
  {
    "id": 560,
    "name": "ズルズキン",
    "nameEn": "Scrafty",
    "types": ["dark", "fighting"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 115,
      "specialAttack": 45,
      "specialDefense": 115,
      "speed": 58
    },
    "abilities": ["Shed Skin", "Moxie", "Intimidate"],
    "height": 1.1,
    "weight": 30
  },
  {
    "id": 561,
    "name": "シンボラー",
    "nameEn": "Sigilyph",
    "types": ["psychic", "flying"],
    "baseStats": {
      "hp": 72,
      "attack": 58,
      "defense": 80,
      "specialAttack": 103,
      "specialDefense": 80,
      "speed": 97
    },
    "abilities": ["Wonder Skin", "Magic Guard", "Tinted Lens"],
    "height": 1.4,
    "weight": 14
  },
  {
    "id": 562,
    "name": "デスマス",
    "nameEn": "Yamask",
    "types": ["ghost"],
    "baseStats": {
      "hp": 38,
      "attack": 30,
      "defense": 85,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 30
    },
    "abilities": ["Mummy"],
    "height": 0.5,
    "weight": 1.5
  },
  {
    "id": 563,
    "name": "デスカーン",
    "nameEn": "Cofagrigus",
    "types": ["ghost"],
    "baseStats": {
      "hp": 58,
      "attack": 50,
      "defense": 145,
      "specialAttack": 95,
      "specialDefense": 105,
      "speed": 30
    },
    "abilities": ["Mummy"],
    "height": 1.7,
    "weight": 76.5
  },
  {
    "id": 564,
    "name": "プロトーガ",
    "nameEn": "Tirtouga",
    "types": ["water", "rock"],
    "baseStats": {
      "hp": 54,
      "attack": 78,
      "defense": 103,
      "specialAttack": 53,
      "specialDefense": 45,
      "speed": 22
    },
    "abilities": ["Solid Rock", "Sturdy", "Swift Swim"],
    "height": 0.7,
    "weight": 16.5
  },
  {
    "id": 565,
    "name": "アバゴーラ",
    "nameEn": "Carracosta",
    "types": ["water", "rock"],
    "baseStats": {
      "hp": 74,
      "attack": 108,
      "defense": 133,
      "specialAttack": 83,
      "specialDefense": 65,
      "speed": 32
    },
    "abilities": ["Solid Rock", "Sturdy", "Swift Swim"],
    "height": 1.2,
    "weight": 81
  },
  {
    "id": 566,
    "name": "アーケン",
    "nameEn": "Archen",
    "types": ["rock", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 112,
      "defense": 45,
      "specialAttack": 74,
      "specialDefense": 45,
      "speed": 70
    },
    "abilities": ["Defeatist"],
    "height": 0.5,
    "weight": 9.5
  },
  {
    "id": 567,
    "name": "アーケオス",
    "nameEn": "Archeops",
    "types": ["rock", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 140,
      "defense": 65,
      "specialAttack": 112,
      "specialDefense": 65,
      "speed": 110
    },
    "abilities": ["Defeatist"],
    "height": 1.4,
    "weight": 32
  },
  {
    "id": 568,
    "name": "ヤブクロン",
    "nameEn": "Trubbish",
    "types": ["poison"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 62,
      "specialAttack": 40,
      "specialDefense": 62,
      "speed": 65
    },
    "abilities": ["Stench", "Sticky Hold", "Aftermath"],
    "height": 0.6,
    "weight": 31
  },
  {
    "id": 569,
    "name": "ダストダス",
    "nameEn": "Garbodor",
    "types": ["poison"],
    "baseStats": {
      "hp": 80,
      "attack": 95,
      "defense": 82,
      "specialAttack": 60,
      "specialDefense": 82,
      "speed": 75
    },
    "abilities": ["Stench", "Weak Armor", "Aftermath"],
    "height": 1.9,
    "weight": 107.3
  },
  {
    "id": 570,
    "name": "ゾロア",
    "nameEn": "Zorua",
    "types": ["dark"],
    "baseStats": {
      "hp": 40,
      "attack": 65,
      "defense": 40,
      "specialAttack": 80,
      "specialDefense": 40,
      "speed": 65
    },
    "abilities": ["Illusion"],
    "height": 0.7,
    "weight": 12.5
  },
  {
    "id": 571,
    "name": "ゾロアーク",
    "nameEn": "Zoroark",
    "types": ["dark"],
    "baseStats": {
      "hp": 60,
      "attack": 105,
      "defense": 60,
      "specialAttack": 120,
      "specialDefense": 60,
      "speed": 105
    },
    "abilities": ["Illusion"],
    "height": 1.6,
    "weight": 81.1
  },
  {
    "id": 572,
    "name": "チラーミィ",
    "nameEn": "Minccino",
    "types": ["normal"],
    "baseStats": {
      "hp": 55,
      "attack": 50,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 75
    },
    "abilities": ["Cute Charm", "Technician", "Skill Link"],
    "height": 0.4,
    "weight": 5.8
  },
  {
    "id": 573,
    "name": "チラチーノ",
    "nameEn": "Cinccino",
    "types": ["normal"],
    "baseStats": {
      "hp": 75,
      "attack": 95,
      "defense": 60,
      "specialAttack": 65,
      "specialDefense": 60,
      "speed": 115
    },
    "abilities": ["Cute Charm", "Technician", "Skill Link"],
    "height": 0.5,
    "weight": 7.5
  },
  {
    "id": 574,
    "name": "ゴチム",
    "nameEn": "Gothita",
    "types": ["psychic"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 50,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 45
    },
    "abilities": ["Frisk", "Competitive", "Shadow Tag"],
    "height": 0.4,
    "weight": 5.8
  },
  {
    "id": 575,
    "name": "ゴチミル",
    "nameEn": "Gothorita",
    "types": ["psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 45,
      "defense": 70,
      "specialAttack": 75,
      "specialDefense": 85,
      "speed": 55
    },
    "abilities": ["Frisk", "Competitive", "Shadow Tag"],
    "height": 0.7,
    "weight": 18
  },
  {
    "id": 576,
    "name": "ゴチルゼル",
    "nameEn": "Gothitelle",
    "types": ["psychic"],
    "baseStats": {
      "hp": 70,
      "attack": 55,
      "defense": 95,
      "specialAttack": 95,
      "specialDefense": 110,
      "speed": 65
    },
    "abilities": ["Frisk", "Competitive", "Shadow Tag"],
    "height": 1.5,
    "weight": 44
  },
  {
    "id": 577,
    "name": "ユニラン",
    "nameEn": "Solosis",
    "types": ["psychic"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 40,
      "specialAttack": 105,
      "specialDefense": 50,
      "speed": 20
    },
    "abilities": ["Overcoat", "Magic Guard", "Regenerator"],
    "height": 0.3,
    "weight": 1
  },
  {
    "id": 578,
    "name": "ダブラン",
    "nameEn": "Duosion",
    "types": ["psychic"],
    "baseStats": {
      "hp": 65,
      "attack": 40,
      "defense": 50,
      "specialAttack": 125,
      "specialDefense": 60,
      "speed": 30
    },
    "abilities": ["Overcoat", "Magic Guard", "Regenerator"],
    "height": 0.6,
    "weight": 8
  },
  {
    "id": 579,
    "name": "ランクルス",
    "nameEn": "Reuniclus",
    "types": ["psychic"],
    "baseStats": {
      "hp": 110,
      "attack": 65,
      "defense": 75,
      "specialAttack": 125,
      "specialDefense": 85,
      "speed": 30
    },
    "abilities": ["Overcoat", "Magic Guard", "Regenerator"],
    "height": 1,
    "weight": 20.1
  },
  {
    "id": 580,
    "name": "コアルヒー",
    "nameEn": "Ducklett",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 62,
      "attack": 44,
      "defense": 50,
      "specialAttack": 44,
      "specialDefense": 50,
      "speed": 55
    },
    "abilities": ["Keen Eye", "Big Pecks", "Hydration"],
    "height": 0.5,
    "weight": 5.5
  },
  {
    "id": 581,
    "name": "スワンナ",
    "nameEn": "Swanna",
    "types": ["water", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 87,
      "defense": 63,
      "specialAttack": 87,
      "specialDefense": 63,
      "speed": 98
    },
    "abilities": ["Keen Eye", "Big Pecks", "Hydration"],
    "height": 1.3,
    "weight": 24.2
  },
  {
    "id": 582,
    "name": "バニプッチ",
    "nameEn": "Vanillite",
    "types": ["ice"],
    "baseStats": {
      "hp": 36,
      "attack": 50,
      "defense": 50,
      "specialAttack": 65,
      "specialDefense": 60,
      "speed": 44
    },
    "abilities": ["Ice Body", "Snow Cloak", "Weak Armor"],
    "height": 0.4,
    "weight": 5.7
  },
  {
    "id": 583,
    "name": "バニリッチ",
    "nameEn": "Vanillish",
    "types": ["ice"],
    "baseStats": {
      "hp": 51,
      "attack": 65,
      "defense": 65,
      "specialAttack": 80,
      "specialDefense": 75,
      "speed": 59
    },
    "abilities": ["Ice Body", "Snow Cloak", "Weak Armor"],
    "height": 1.1,
    "weight": 41
  },
  {
    "id": 584,
    "name": "バイバニラ",
    "nameEn": "Vanilluxe",
    "types": ["ice"],
    "baseStats": {
      "hp": 71,
      "attack": 95,
      "defense": 85,
      "specialAttack": 110,
      "specialDefense": 95,
      "speed": 79
    },
    "abilities": ["Ice Body", "Snow Warning", "Weak Armor"],
    "height": 1.3,
    "weight": 57.5
  },
  {
    "id": 585,
    "name": "シキジカ (はるのすがた)",
    "nameEn": "Deerling",
    "types": ["normal", "grass"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 75
    },
    "abilities": ["Chlorophyll", "Sap Sipper", "Serene Grace"],
    "height": 0.6,
    "weight": 19.5
  },
  {
    "id": 586,
    "name": "メブキジカ (はるのすがた)",
    "nameEn": "Sawsbuck",
    "types": ["normal", "grass"],
    "baseStats": {
      "hp": 80,
      "attack": 100,
      "defense": 70,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 95
    },
    "abilities": ["Chlorophyll", "Sap Sipper", "Serene Grace"],
    "height": 1.9,
    "weight": 92.5
  },
  {
    "id": 587,
    "name": "エモンガ",
    "nameEn": "Emolga",
    "types": ["electric", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 75,
      "defense": 60,
      "specialAttack": 75,
      "specialDefense": 60,
      "speed": 103
    },
    "abilities": ["Static", "Motor Drive"],
    "height": 0.4,
    "weight": 5
  },
  {
    "id": 588,
    "name": "カブルモ",
    "nameEn": "Karrablast",
    "types": ["bug"],
    "baseStats": {
      "hp": 50,
      "attack": 75,
      "defense": 45,
      "specialAttack": 40,
      "specialDefense": 45,
      "speed": 60
    },
    "abilities": ["Swarm", "Shed Skin", "No Guard"],
    "height": 0.5,
    "weight": 5.9
  },
  {
    "id": 589,
    "name": "シュバルゴ",
    "nameEn": "Escavalier",
    "types": ["bug", "steel"],
    "baseStats": {
      "hp": 70,
      "attack": 135,
      "defense": 105,
      "specialAttack": 60,
      "specialDefense": 105,
      "speed": 20
    },
    "abilities": ["Swarm", "Shell Armor", "Overcoat"],
    "height": 1,
    "weight": 33
  },
  {
    "id": 590,
    "name": "タマゲタケ",
    "nameEn": "Foongus",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 69,
      "attack": 55,
      "defense": 45,
      "specialAttack": 55,
      "specialDefense": 55,
      "speed": 15
    },
    "abilities": ["Effect Spore", "Regenerator"],
    "height": 0.2,
    "weight": 1
  },
  {
    "id": 591,
    "name": "モロバレル",
    "nameEn": "Amoonguss",
    "types": ["grass", "poison"],
    "baseStats": {
      "hp": 114,
      "attack": 85,
      "defense": 70,
      "specialAttack": 85,
      "specialDefense": 80,
      "speed": 30
    },
    "abilities": ["Effect Spore", "Regenerator"],
    "height": 0.6,
    "weight": 10.5
  },
  {
    "id": 592,
    "name": "プルリル",
    "nameEn": "Frillish",
    "types": ["water", "ghost"],
    "baseStats": {
      "hp": 55,
      "attack": 40,
      "defense": 50,
      "specialAttack": 65,
      "specialDefense": 85,
      "speed": 40
    },
    "abilities": ["Water Absorb", "Cursed Body", "Damp"],
    "height": 1.2,
    "weight": 33
  },
  {
    "id": 593,
    "name": "ブルンゲル",
    "nameEn": "Jellicent",
    "types": ["water", "ghost"],
    "baseStats": {
      "hp": 100,
      "attack": 60,
      "defense": 70,
      "specialAttack": 85,
      "specialDefense": 105,
      "speed": 60
    },
    "abilities": ["Water Absorb", "Cursed Body", "Damp"],
    "height": 2.2,
    "weight": 135
  },
  {
    "id": 594,
    "name": "ママンボウ",
    "nameEn": "Alomomola",
    "types": ["water"],
    "baseStats": {
      "hp": 165,
      "attack": 75,
      "defense": 80,
      "specialAttack": 40,
      "specialDefense": 45,
      "speed": 65
    },
    "abilities": ["Healer", "Hydration", "Regenerator"],
    "height": 1.2,
    "weight": 31.6
  },
  {
    "id": 595,
    "name": "バチュル",
    "nameEn": "Joltik",
    "types": ["bug", "electric"],
    "baseStats": {
      "hp": 50,
      "attack": 47,
      "defense": 50,
      "specialAttack": 57,
      "specialDefense": 50,
      "speed": 65
    },
    "abilities": ["Compound Eyes", "Unnerve", "Swarm"],
    "height": 0.1,
    "weight": 0.6
  },
  {
    "id": 596,
    "name": "デンチュラ",
    "nameEn": "Galvantula",
    "types": ["bug", "electric"],
    "baseStats": {
      "hp": 70,
      "attack": 77,
      "defense": 60,
      "specialAttack": 97,
      "specialDefense": 60,
      "speed": 108
    },
    "abilities": ["Compound Eyes", "Unnerve", "Swarm"],
    "height": 0.8,
    "weight": 14.3
  },
  {
    "id": 597,
    "name": "テッシード",
    "nameEn": "Ferroseed",
    "types": ["grass", "steel"],
    "baseStats": {
      "hp": 44,
      "attack": 50,
      "defense": 91,
      "specialAttack": 24,
      "specialDefense": 86,
      "speed": 10
    },
    "abilities": ["Iron Barbs"],
    "height": 0.6,
    "weight": 18.8
  },
  {
    "id": 598,
    "name": "ナットレイ",
    "nameEn": "Ferrothorn",
    "types": ["grass", "steel"],
    "baseStats": {
      "hp": 74,
      "attack": 94,
      "defense": 131,
      "specialAttack": 54,
      "specialDefense": 116,
      "speed": 20
    },
    "abilities": ["Iron Barbs", "Anticipation"],
    "height": 1,
    "weight": 110
  },
  {
    "id": 599,
    "name": "ギアル",
    "nameEn": "Klink",
    "types": ["steel"],
    "baseStats": {
      "hp": 40,
      "attack": 55,
      "defense": 70,
      "specialAttack": 45,
      "specialDefense": 60,
      "speed": 30
    },
    "abilities": ["Plus", "Minus", "Clear Body"],
    "height": 0.3,
    "weight": 21
  },
  {
    "id": 600,
    "name": "ギギアル",
    "nameEn": "Klang",
    "types": ["steel"],
    "baseStats": {
      "hp": 60,
      "attack": 80,
      "defense": 95,
      "specialAttack": 70,
      "specialDefense": 85,
      "speed": 50
    },
    "abilities": ["Plus", "Minus", "Clear Body"],
    "height": 0.6,
    "weight": 51
  },
  
  {
    "id": 601,
    "name": "ギギギアル",
    "nameEn": "Klinklang",
    "types": ["steel"],
    "baseStats": {
      "hp": 60,
      "attack": 100,
      "defense": 115,
      "specialAttack": 70,
      "specialDefense": 85,
      "speed": 90
    },
    "abilities": ["Plus", "Minus", "Clear Body"],
    "height": 0.6,
    "weight": 81
  },
  {
    "id": 602,
    "name": "シビシラス",
    "nameEn": "Tynamo",
    "types": ["electric"],
    "baseStats": {
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "specialAttack": 45,
      "specialDefense": 40,
      "speed": 60
    },
    "abilities": ["Levitate"],
    "height": 0.2,
    "weight": 0.3
  },
  {
    "id": 603,
    "name": "シビビール",
    "nameEn": "Eelektrik",
    "types": ["electric"],
    "baseStats": {
      "hp": 65,
      "attack": 85,
      "defense": 70,
      "specialAttack": 75,
      "specialDefense": 70,
      "speed": 40
    },
    "abilities": ["Levitate"],
    "height": 1.2,
    "weight": 22
  },
  {
    "id": 604,
    "name": "シビルドン",
    "nameEn": "Eelektross",
    "types": ["electric"],
    "baseStats": {
      "hp": 85,
      "attack": 115,
      "defense": 80,
      "specialAttack": 105,
      "specialDefense": 80,
      "speed": 50
    },
    "abilities": ["Levitate"],
    "height": 2.1,
    "weight": 80.5
  },
  {
    "id": 605,
    "name": "リグレー",
    "nameEn": "Elgyem",
    "types": ["psychic"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 55,
      "specialAttack": 85,
      "specialDefense": 55,
      "speed": 30
    },
    "abilities": ["Telepathy", "Synchronize", "Analytic"],
    "height": 0.5,
    "weight": 9
  },
  {
    "id": 606,
    "name": "オーベム",
    "nameEn": "Beheeyem",
    "types": ["psychic"],
    "baseStats": {
      "hp": 75,
      "attack": 75,
      "defense": 75,
      "specialAttack": 125,
      "specialDefense": 95,
      "speed": 40
    },
    "abilities": ["Telepathy", "Synchronize", "Analytic"],
    "height": 1,
    "weight": 34.5
  },
  {
    "id": 607,
    "name": "ヒトモシ",
    "nameEn": "Litwick",
    "types": ["ghost", "fire"],
    "baseStats": {
      "hp": 50,
      "attack": 30,
      "defense": 55,
      "specialAttack": 65,
      "specialDefense": 55,
      "speed": 20
    },
    "abilities": ["Flash Fire", "Flame Body", "Infiltrator"],
    "height": 0.3,
    "weight": 3.1
  },
  {
    "id": 608,
    "name": "ランプラー",
    "nameEn": "Lampent",
    "types": ["ghost", "fire"],
    "baseStats": {
      "hp": 60,
      "attack": 40,
      "defense": 60,
      "specialAttack": 95,
      "specialDefense": 60,
      "speed": 55
    },
    "abilities": ["Flash Fire", "Flame Body", "Infiltrator"],
    "height": 0.6,
    "weight": 13
  },
  {
    "id": 609,
    "name": "シャンデラ",
    "nameEn": "Chandelure",
    "types": ["ghost", "fire"],
    "baseStats": {
      "hp": 60,
      "attack": 55,
      "defense": 90,
      "specialAttack": 145,
      "specialDefense": 90,
      "speed": 80
    },
    "abilities": ["Flash Fire", "Flame Body", "Infiltrator"],
    "height": 1,
    "weight": 34.3
  },
  {
    "id": 610,
    "name": "キバゴ",
    "nameEn": "Axew",
    "types": ["dragon"],
    "baseStats": {
      "hp": 46,
      "attack": 87,
      "defense": 60,
      "specialAttack": 30,
      "specialDefense": 40,
      "speed": 57
    },
    "abilities": ["Rivalry", "Mold Breaker", "Unnerve"],
    "height": 0.6,
    "weight": 18
  },
  {
    "id": 611,
    "name": "オノンド",
    "nameEn": "Fraxure",
    "types": ["dragon"],
    "baseStats": {
      "hp": 66,
      "attack": 117,
      "defense": 70,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 67
    },
    "abilities": ["Rivalry", "Mold Breaker", "Unnerve"],
    "height": 1,
    "weight": 36
  },
  {
    "id": 612,
    "name": "オノノクス",
    "nameEn": "Haxorus",
    "types": ["dragon"],
    "baseStats": {
      "hp": 76,
      "attack": 147,
      "defense": 90,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 97
    },
    "abilities": ["Rivalry", "Mold Breaker", "Unnerve"],
    "height": 1.8,
    "weight": 105.5
  },
  {
    "id": 613,
    "name": "クマシュン",
    "nameEn": "Cubchoo",
    "types": ["ice"],
    "baseStats": {
      "hp": 55,
      "attack": 70,
      "defense": 40,
      "specialAttack": 60,
      "specialDefense": 40,
      "speed": 40
    },
    "abilities": ["Snow Cloak", "Slush Rush", "Rattled"],
    "height": 0.5,
    "weight": 8.5
  },
  {
    "id": 614,
    "name": "ツンベアー",
    "nameEn": "Beartic",
    "types": ["ice"],
    "baseStats": {
      "hp": 95,
      "attack": 130,
      "defense": 80,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 50
    },
    "abilities": ["Snow Cloak", "Slush Rush", "Swift Swim"],
    "height": 2.6,
    "weight": 260
  },
  {
    "id": 615,
    "name": "フリージオ",
    "nameEn": "Cryogonal",
    "types": ["ice"],
    "baseStats": {
      "hp": 80,
      "attack": 50,
      "defense": 50,
      "specialAttack": 95,
      "specialDefense": 135,
      "speed": 105
    },
    "abilities": ["Levitate"],
    "height": 1.1,
    "weight": 148
  },
  {
    "id": 616,
    "name": "チョボマキ",
    "nameEn": "Shelmet",
    "types": ["bug"],
    "baseStats": {
      "hp": 50,
      "attack": 40,
      "defense": 85,
      "specialAttack": 40,
      "specialDefense": 65,
      "speed": 25
    },
    "abilities": ["Hydration", "Shell Armor", "Overcoat"],
    "height": 0.4,
    "weight": 7.7
  },
  {
    "id": 617,
    "name": "アギルダー",
    "nameEn": "Accelgor",
    "types": ["bug"],
    "baseStats": {
      "hp": 80,
      "attack": 70,
      "defense": 40,
      "specialAttack": 100,
      "specialDefense": 60,
      "speed": 145
    },
    "abilities": ["Hydration", "Sticky Hold", "Unburden"],
    "height": 0.8,
    "weight": 25.3
  },
  {
    "id": 618,
    "name": "マッギョ",
    "nameEn": "Stunfisk",
    "types": ["ground", "electric"],
    "baseStats": {
      "hp": 109,
      "attack": 66,
      "defense": 84,
      "specialAttack": 81,
      "specialDefense": 99,
      "speed": 32
    },
    "abilities": ["Static", "Limber", "Sand Veil"],
    "height": 0.7,
    "weight": 11
  },
  {
    "id": 619,
    "name": "コジョフー",
    "nameEn": "Mienfoo",
    "types": ["fighting"],
    "baseStats": {
      "hp": 45,
      "attack": 85,
      "defense": 50,
      "specialAttack": 55,
      "specialDefense": 50,
      "speed": 65
    },
    "abilities": ["Inner Focus", "Regenerator", "Reckless"],
    "height": 0.9,
    "weight": 20
  },
  {
    "id": 620,
    "name": "コジョンド",
    "nameEn": "Mienshao",
    "types": ["fighting"],
    "baseStats": {
      "hp": 65,
      "attack": 125,
      "defense": 60,
      "specialAttack": 95,
      "specialDefense": 60,
      "speed": 105
    },
    "abilities": ["Inner Focus", "Regenerator", "Reckless"],
    "height": 1.4,
    "weight": 35.5
  },
  {
    "id": 621,
    "name": "クリムガン",
    "nameEn": "Druddigon",
    "types": ["dragon"],
    "baseStats": {
      "hp": 77,
      "attack": 120,
      "defense": 90,
      "specialAttack": 60,
      "specialDefense": 90,
      "speed": 48
    },
    "abilities": ["Rough Skin", "Sheer Force", "Mold Breaker"],
    "height": 1.6,
    "weight": 139
  },
  {
    "id": 622,
    "name": "ゴビット",
    "nameEn": "Golett",
    "types": ["ground", "ghost"],
    "baseStats": {
      "hp": 59,
      "attack": 74,
      "defense": 50,
      "specialAttack": 35,
      "specialDefense": 50,
      "speed": 35
    },
    "abilities": ["Iron Fist", "Klutz", "No Guard"],
    "height": 1,
    "weight": 92
  },
  {
    "id": 623,
    "name": "ゴルーグ",
    "nameEn": "Golurk",
    "types": ["ground", "ghost"],
    "baseStats": {
      "hp": 89,
      "attack": 124,
      "defense": 80,
      "specialAttack": 55,
      "specialDefense": 80,
      "speed": 55
    },
    "abilities": ["Iron Fist", "Klutz", "No Guard"],
    "height": 2.8,
    "weight": 330
  },
  {
    "id": 624,
    "name": "コマタナ",
    "nameEn": "Pawniard",
    "types": ["dark", "steel"],
    "baseStats": {
      "hp": 45,
      "attack": 85,
      "defense": 70,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 60
    },
    "abilities": ["Defiant", "Inner Focus", "Pressure"],
    "height": 0.5,
    "weight": 10.2
  },
  {
    "id": 625,
    "name": "キリキザン",
    "nameEn": "Bisharp",
    "types": ["dark", "steel"],
    "baseStats": {
      "hp": 65,
      "attack": 125,
      "defense": 100,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 70
    },
    "abilities": ["Defiant", "Inner Focus", "Pressure"],
    "height": 1.6,
    "weight": 70
  },
  {
    "id": 626,
    "name": "バッフロン",
    "nameEn": "Bouffalant",
    "types": ["normal"],
    "baseStats": {
      "hp": 95,
      "attack": 110,
      "defense": 95,
      "specialAttack": 40,
      "specialDefense": 95,
      "speed": 55
    },
    "abilities": ["Reckless", "Sap Sipper", "Soundproof"],
    "height": 1.6,
    "weight": 94.6
  },
  {
    "id": 627,
    "name": "ワシボン",
    "nameEn": "Rufflet",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 83,
      "defense": 50,
      "specialAttack": 37,
      "specialDefense": 50,
      "speed": 60
    },
    "abilities": ["Keen Eye", "Sheer Force", "Hustle"],
    "height": 0.5,
    "weight": 10.5
  },
  {
    "id": 628,
    "name": "ウォーグル",
    "nameEn": "Braviary",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 100,
      "attack": 123,
      "defense": 75,
      "specialAttack": 57,
      "specialDefense": 75,
      "speed": 80
    },
    "abilities": ["Keen Eye", "Sheer Force", "Defiant"],
    "height": 1.5,
    "weight": 41
  },
  {
    "id": 629,
    "name": "バルチャイ",
    "nameEn": "Vullaby",
    "types": ["dark", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 55,
      "defense": 75,
      "specialAttack": 45,
      "specialDefense": 65,
      "speed": 60
    },
    "abilities": ["Big Pecks", "Overcoat", "Weak Armor"],
    "height": 0.5,
    "weight": 9
  },
  {
    "id": 630,
    "name": "バルジーナ",
    "nameEn": "Mandibuzz",
    "types": ["dark", "flying"],
    "baseStats": {
      "hp": 110,
      "attack": 65,
      "defense": 105,
      "specialAttack": 55,
      "specialDefense": 95,
      "speed": 80
    },
    "abilities": ["Big Pecks", "Overcoat", "Weak Armor"],
    "height": 1.2,
    "weight": 39.5
  },
  {
    "id": 631,
    "name": "クイタラン",
    "nameEn": "Heatmor",
    "types": ["fire"],
    "baseStats": {
      "hp": 85,
      "attack": 97,
      "defense": 66,
      "specialAttack": 105,
      "specialDefense": 66,
      "speed": 65
    },
    "abilities": ["Gluttony", "Flash Fire", "White Smoke"],
    "height": 1.4,
    "weight": 58
  },
  {
    "id": 632,
    "name": "アイアント",
    "nameEn": "Durant",
    "types": ["bug", "steel"],
    "baseStats": {
      "hp": 58,
      "attack": 109,
      "defense": 112,
      "specialAttack": 48,
      "specialDefense": 48,
      "speed": 109
    },
    "abilities": ["Swarm", "Hustle", "Truant"],
    "height": 0.3,
    "weight": 33
  },
  {
    "id": 633,
    "name": "モノズ",
    "nameEn": "Deino",
    "types": ["dark", "dragon"],
    "baseStats": {
      "hp": 52,
      "attack": 65,
      "defense": 50,
      "specialAttack": 45,
      "specialDefense": 50,
      "speed": 38
    },
    "abilities": ["Hustle"],
    "height": 0.8,
    "weight": 17.3
  },
  {
    "id": 634,
    "name": "ジヘッド",
    "nameEn": "Zweilous",
    "types": ["dark", "dragon"],
    "baseStats": {
      "hp": 72,
      "attack": 85,
      "defense": 70,
      "specialAttack": 65,
      "specialDefense": 70,
      "speed": 58
    },
    "abilities": ["Hustle"],
    "height": 1.4,
    "weight": 50
  },
  {
    "id": 635,
    "name": "サザンドラ",
    "nameEn": "Hydreigon",
    "types": ["dark", "dragon"],
    "baseStats": {
      "hp": 92,
      "attack": 105,
      "defense": 90,
      "specialAttack": 125,
      "specialDefense": 90,
      "speed": 98
    },
    "abilities": ["Levitate"],
    "height": 1.8,
    "weight": 160
  },
  {
    "id": 636,
    "name": "メラルバ",
    "nameEn": "Larvesta",
    "types": ["bug", "fire"],
    "baseStats": {
      "hp": 55,
      "attack": 85,
      "defense": 55,
      "specialAttack": 50,
      "specialDefense": 55,
      "speed": 60
    },
    "abilities": ["Flame Body", "Swarm"],
    "height": 1.1,
    "weight": 28.8
  },
  {
    "id": 637,
    "name": "ウルガモス",
    "nameEn": "Volcarona",
    "types": ["bug", "fire"],
    "baseStats": {
      "hp": 85,
      "attack": 60,
      "defense": 65,
      "specialAttack": 135,
      "specialDefense": 105,
      "speed": 100
    },
    "abilities": ["Flame Body", "Swarm"],
    "height": 1.6,
    "weight": 46
  },
  {
    "id": 638,
    "name": "コバルオン",
    "nameEn": "Cobalion",
    "types": ["steel", "fighting"],
    "baseStats": {
      "hp": 91,
      "attack": 90,
      "defense": 129,
      "specialAttack": 90,
      "specialDefense": 72,
      "speed": 108
    },
    "abilities": ["Justified"],
    "height": 2.1,
    "weight": 250
  },
  {
    "id": 639,
    "name": "テラキオン",
    "nameEn": "Terrakion",
    "types": ["rock", "fighting"],
    "baseStats": {
      "hp": 91,
      "attack": 129,
      "defense": 90,
      "specialAttack": 72,
      "specialDefense": 90,
      "speed": 108
    },
    "abilities": ["Justified"],
    "height": 1.9,
    "weight": 260
  },
  {
    "id": 640,
    "name": "ビリジオン",
    "nameEn": "Virizion",
    "types": ["grass", "fighting"],
    "baseStats": {
      "hp": 91,
      "attack": 90,
      "defense": 72,
      "specialAttack": 90,
      "specialDefense": 129,
      "speed": 108
    },
    "abilities": ["Justified"],
    "height": 2,
    "weight": 200
  },
  {
    "id": 641,
    "name": "トルネロス (けしんフォルム)",
    "nameEn": "Tornadus",
    "types": ["flying"],
    "baseStats": {
      "hp": 79,
      "attack": 115,
      "defense": 70,
      "specialAttack": 125,
      "specialDefense": 80,
      "speed": 111
    },
    "abilities": ["Prankster", "Defiant"],
    "height": 1.5,
    "weight": 63
  },
  {
    "id": 642,
    "name": "ボルトロス (けしんフォルム)",
    "nameEn": "Thundurus",
    "types": ["electric", "flying"],
    "baseStats": {
      "hp": 79,
      "attack": 115,
      "defense": 70,
      "specialAttack": 125,
      "specialDefense": 80,
      "speed": 111
    },
    "abilities": ["Prankster", "Defiant"],
    "height": 1.5,
    "weight": 61
  },
  {
    "id": 643,
    "name": "レシラム",
    "nameEn": "Reshiram",
    "types": ["dragon", "fire"],
    "baseStats": {
      "hp": 100,
      "attack": 120,
      "defense": 100,
      "specialAttack": 150,
      "specialDefense": 120,
      "speed": 90
    },
    "abilities": ["Turboblaze"],
    "height": 3.2,
    "weight": 330
  },
  {
    "id": 644,
    "name": "ゼクロム",
    "nameEn": "Zekrom",
    "types": ["dragon", "electric"],
    "baseStats": {
      "hp": 100,
      "attack": 150,
      "defense": 120,
      "specialAttack": 120,
      "specialDefense": 100,
      "speed": 90
    },
    "abilities": ["Teravolt"],
    "height": 2.9,
    "weight": 345
  },
  {
    "id": 645,
    "name": "ランドロス (けしんフォルム)",
    "nameEn": "Landorus",
    "types": ["ground", "flying"],
    "baseStats": {
      "hp": 89,
      "attack": 125,
      "defense": 90,
      "specialAttack": 115,
      "specialDefense": 80,
      "speed": 101
    },
    "abilities": ["Sand Force", "Sheer Force"],
    "height": 1.5,
    "weight": 68
  },
  {
    "id": 646,
    "name": "キュレム",
    "nameEn": "Kyurem",
    "types": ["dragon", "ice"],
    "baseStats": {
      "hp": 125,
      "attack": 130,
      "defense": 90,
      "specialAttack": 130,
      "specialDefense": 90,
      "speed": 95
    },
    "abilities": ["Pressure"],
    "height": 3,
    "weight": 325
  },
  {
    "id": 647,
    "name": "ケルディオ (いつものすがた)",
    "nameEn": "Keldeo",
    "types": ["water", "fighting"],
    "baseStats": {
      "hp": 91,
      "attack": 72,
      "defense": 90,
      "specialAttack": 129,
      "specialDefense": 90,
      "speed": 108
    },
    "abilities": ["Justified"],
    "height": 1.4,
    "weight": 48.5
  },
  {
    "id": 648,
    "name": "メロエッタ (ボイスフォルム)",
    "nameEn": "Meloetta",
    "types": ["normal", "psychic"],
    "baseStats": {
      "hp": 100,
      "attack": 77,
      "defense": 77,
      "specialAttack": 128,
      "specialDefense": 128,
      "speed": 90
    },
    "abilities": ["Serene Grace"],
    "height": 0.6,
    "weight": 6.5
  },
  {
    "id": 649,
    "name": "ゲノセクト",
    "nameEn": "Genesect",
    "types": ["bug", "steel"],
    "baseStats": {
      "hp": 71,
      "attack": 120,
      "defense": 95,
      "specialAttack": 120,
      "specialDefense": 95,
      "speed": 99
    },
    "abilities": ["Download"],
    "height": 1.5,
    "weight": 82.5
  },
  {
    "id": 650,
    "name": "ハリマロン",
    "nameEn": "Chespin",
    "types": ["grass"],
    "baseStats": {
      "hp": 56,
      "attack": 61,
      "defense": 65,
      "specialAttack": 48,
      "specialDefense": 45,
      "speed": 38
    },
    "abilities": ["Overgrow", "Bulletproof"],
    "height": 0.4,
    "weight": 9
  },
  {
    "id": 651,
    "name": "ハリボーグ",
    "nameEn": "Quilladin",
    "types": ["grass"],
    "baseStats": {
      "hp": 61,
      "attack": 78,
      "defense": 95,
      "specialAttack": 56,
      "specialDefense": 58,
      "speed": 57
    },
    "abilities": ["Overgrow", "Bulletproof"],
    "height": 0.7,
    "weight": 29
  },
  {
    "id": 652,
    "name": "ブリガロン",
    "nameEn": "Chesnaught",
    "types": ["grass", "fighting"],
    "baseStats": {
      "hp": 88,
      "attack": 107,
      "defense": 122,
      "specialAttack": 74,
      "specialDefense": 75,
      "speed": 64
    },
    "abilities": ["Overgrow", "Bulletproof"],
    "height": 1.6,
    "weight": 90
  },
  {
    "id": 653,
    "name": "フォッコ",
    "nameEn": "Fennekin",
    "types": ["fire"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 40,
      "specialAttack": 62,
      "specialDefense": 60,
      "speed": 60
    },
    "abilities": ["Blaze", "Magician"],
    "height": 0.4,
    "weight": 9.4
  },
  {
    "id": 654,
    "name": "テールナー",
    "nameEn": "Braixen",
    "types": ["fire"],
    "baseStats": {
      "hp": 59,
      "attack": 59,
      "defense": 58,
      "specialAttack": 90,
      "specialDefense": 70,
      "speed": 73
    },
    "abilities": ["Blaze", "Magician"],
    "height": 1,
    "weight": 14.5
  },
  {
    "id": 655,
    "name": "マフォクシー",
    "nameEn": "Delphox",
    "types": ["fire", "psychic"],
    "baseStats": {
      "hp": 75,
      "attack": 69,
      "defense": 72,
      "specialAttack": 114,
      "specialDefense": 100,
      "speed": 104
    },
    "abilities": ["Blaze", "Magician"],
    "height": 1.5,
    "weight": 39
  },
  {
    "id": 656,
    "name": "ケロマツ",
    "nameEn": "Froakie",
    "types": ["water"],
    "baseStats": {
      "hp": 41,
      "attack": 56,
      "defense": 40,
      "specialAttack": 62,
      "specialDefense": 44,
      "speed": 71
    },
    "abilities": ["Torrent", "Protean"],
    "height": 0.3,
    "weight": 7
  },
  {
    "id": 657,
    "name": "ゲコガシラ",
    "nameEn": "Frogadier",
    "types": ["water"],
    "baseStats": {
      "hp": 54,
      "attack": 63,
      "defense": 52,
      "specialAttack": 83,
      "specialDefense": 56,
      "speed": 97
    },
    "abilities": ["Torrent", "Protean"],
    "height": 0.6,
    "weight": 10.9
  },
  {
    "id": 658,
    "name": "ゲッコウガ",
    "nameEn": "Greninja",
    "types": ["water", "dark"],
    "baseStats": {
      "hp": 72,
      "attack": 95,
      "defense": 67,
      "specialAttack": 103,
      "specialDefense": 71,
      "speed": 122
    },
    "abilities": ["Torrent", "Protean", "Battle Bond"],
    "height": 1.5,
    "weight": 40
  },
  {
    "id": 659,
    "name": "ホルビー",
    "nameEn": "Bunnelby",
    "types": ["normal"],
    "baseStats": {
      "hp": 38,
      "attack": 36,
      "defense": 38,
      "specialAttack": 32,
      "specialDefense": 36,
      "speed": 57
    },
    "abilities": ["Pickup", "Cheek Pouch", "Huge Power"],
    "height": 0.4,
    "weight": 5
  },
  {
    "id": 660,
    "name": "ホルード",
    "nameEn": "Diggersby",
    "types": ["normal", "ground"],
    "baseStats": {
      "hp": 85,
      "attack": 56,
      "defense": 77,
      "specialAttack": 50,
      "specialDefense": 77,
      "speed": 78
    },
    "abilities": ["Pickup", "Cheek Pouch", "Huge Power"],
    "height": 1,
    "weight": 42.4
  },
  {
    "id": 661,
    "name": "ヤヤコマ",
    "nameEn": "Fletchling",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 43,
      "specialAttack": 40,
      "specialDefense": 38,
      "speed": 62
    },
    "abilities": ["Big Pecks", "Gale Wings"],
    "height": 0.3,
    "weight": 1.7
  },
  {
    "id": 662,
    "name": "ヒノヤコマ",
    "nameEn": "Fletchinder",
    "types": ["fire", "flying"],
    "baseStats": {
      "hp": 62,
      "attack": 73,
      "defense": 55,
      "specialAttack": 56,
      "specialDefense": 52,
      "speed": 84
    },
    "abilities": ["Flame Body", "Gale Wings"],
    "height": 0.7,
    "weight": 16
  },
  {
    "id": 663,
    "name": "ファイアロー",
    "nameEn": "Talonflame",
    "types": ["fire", "flying"],
    "baseStats": {
      "hp": 78,
      "attack": 81,
      "defense": 71,
      "specialAttack": 74,
      "specialDefense": 69,
      "speed": 126
    },
    "abilities": ["Flame Body", "Gale Wings"],
    "height": 1.2,
    "weight": 24.5
  },
  {
    "id": 664,
    "name": "コフキムシ",
    "nameEn": "Scatterbug",
    "types": ["bug"],
    "baseStats": {
      "hp": 38,
      "attack": 35,
      "defense": 40,
      "specialAttack": 27,
      "specialDefense": 25,
      "speed": 35
    },
    "abilities": ["Shield Dust", "Compound Eyes", "Friend Guard"],
    "height": 0.3,
    "weight": 2.5
  },
  {
    "id": 665,
    "name": "コフーライ",
    "nameEn": "Spewpa",
    "types": ["bug"],
    "baseStats": {
      "hp": 45,
      "attack": 22,
      "defense": 60,
      "specialAttack": 27,
      "specialDefense": 30,
      "speed": 29
    },
    "abilities": ["Shed Skin", "Friend Guard"],
    "height": 0.3,
    "weight": 8.4
  },
  {
    "id": 666,
    "name": "ビビヨン (みやびなもよう)",
    "nameEn": "Vivillon",
    "types": ["bug", "flying"],
    "baseStats": {
      "hp": 80,
      "attack": 52,
      "defense": 50,
      "specialAttack": 90,
      "specialDefense": 50,
      "speed": 89
    },
    "abilities": ["Shield Dust", "Compound Eyes", "Friend Guard"],
    "height": 1.2,
    "weight": 17
  },
  {
    "id": 667,
    "name": "シシコ",
    "nameEn": "Litleo",
    "types": ["fire", "normal"],
    "baseStats": {
      "hp": 62,
      "attack": 50,
      "defense": 58,
      "specialAttack": 73,
      "specialDefense": 54,
      "speed": 72
    },
    "abilities": ["Rivalry", "Unnerve", "Moxie"],
    "height": 0.6,
    "weight": 13.5
  },
  {
    "id": 668,
    "name": "カエンジシ",
    "nameEn": "Pyroar",
    "types": ["fire", "normal"],
    "baseStats": {
      "hp": 86,
      "attack": 68,
      "defense": 72,
      "specialAttack": 109,
      "specialDefense": 66,
      "speed": 106
    },
    "abilities": ["Rivalry", "Unnerve", "Moxie"],
    "height": 1.5,
    "weight": 81.5
  },
  {
    "id": 669,
    "name": "フラベベ (あかいはな)",
    "nameEn": "Flabébé",
    "types": ["fairy"],
    "baseStats": {
      "hp": 44,
      "attack": 38,
      "defense": 39,
      "specialAttack": 61,
      "specialDefense": 79,
      "speed": 42
    },
    "abilities": ["Flower Veil", "Symbiosis"],
    "height": 0.1,
    "weight": 0.1
  },
  {
    "id": 670,
    "name": "フラエッテ (あかいはな)",
    "nameEn": "Floette",
    "types": ["fairy"],
    "baseStats": {
      "hp": 54,
      "attack": 45,
      "defense": 47,
      "specialAttack": 75,
      "specialDefense": 98,
      "speed": 52
    },
    "abilities": ["Flower Veil", "Symbiosis"],
    "height": 0.2,
    "weight": 0.9
  },
  {
    "id": 671,
    "name": "フラージェス (あかいはな)",
    "nameEn": "Florges",
    "types": ["fairy"],
    "baseStats": {
      "hp": 78,
      "attack": 65,
      "defense": 68,
      "specialAttack": 112,
      "specialDefense": 154,
      "speed": 75
    },
    "abilities": ["Flower Veil", "Symbiosis"],
    "height": 1.1,
    "weight": 10
  },
  {
    "id": 672,
    "name": "メェークル",
    "nameEn": "Skiddo",
    "types": ["grass"],
    "baseStats": {
      "hp": 66,
      "attack": 65,
      "defense": 48,
      "specialAttack": 62,
      "specialDefense": 57,
      "speed": 52
    },
    "abilities": ["Sap Sipper", "Grass Pelt"],
    "height": 0.9,
    "weight": 31
  },
  {
    "id": 673,
    "name": "ゴーゴート",
    "nameEn": "Gogoat",
    "types": ["grass"],
    "baseStats": {
      "hp": 123,
      "attack": 100,
      "defense": 62,
      "specialAttack": 97,
      "specialDefense": 81,
      "speed": 68
    },
    "abilities": ["Sap Sipper", "Grass Pelt"],
    "height": 1.7,
    "weight": 91
  },
  {
    "id": 674,
    "name": "ヤンチャム",
    "nameEn": "Pancham",
    "types": ["fighting"],
    "baseStats": {
      "hp": 67,
      "attack": 82,
      "defense": 62,
      "specialAttack": 46,
      "specialDefense": 48,
      "speed": 43
    },
    "abilities": ["Iron Fist", "Mold Breaker", "Scrappy"],
    "height": 0.6,
    "weight": 8
  },
  {
    "id": 675,
    "name": "ゴロンダ",
    "nameEn": "Pangoro",
    "types": ["fighting", "dark"],
    "baseStats": {
      "hp": 95,
      "attack": 124,
      "defense": 78,
      "specialAttack": 69,
      "specialDefense": 71,
      "speed": 58
    },
    "abilities": ["Iron Fist", "Mold Breaker", "Scrappy"],
    "height": 2.1,
    "weight": 136
  },
  {
    "id": 676,
    "name": "トリミアン (やせいのすがた)",
    "nameEn": "Furfrou",
    "types": ["normal"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 60,
      "specialAttack": 65,
      "specialDefense": 90,
      "speed": 102
    },
    "abilities": ["Fur Coat"],
    "height": 1.2,
    "weight": 28
  },
  {
    "id": 677,
    "name": "ニャスパー",
    "nameEn": "Espurr",
    "types": ["psychic"],
    "baseStats": {
      "hp": 62,
      "attack": 48,
      "defense": 54,
      "specialAttack": 63,
      "specialDefense": 60,
      "speed": 68
    },
    "abilities": ["Keen Eye", "Infiltrator", "Own Tempo"],
    "height": 0.3,
    "weight": 3.5
  },
  {
    "id": 678,
    "name": "ニャオニクス (オスのすがた)",
    "nameEn": "Meowstic",
    "types": ["psychic"],
    "baseStats": {
      "hp": 74,
      "attack": 48,
      "defense": 76,
      "specialAttack": 83,
      "specialDefense": 81,
      "speed": 104
    },
    "abilities": ["Keen Eye", "Infiltrator", "Prankster"],
    "height": 0.6,
    "weight": 8.5
  },
  {
    "id": 679,
    "name": "ヒトツキ",
    "nameEn": "Honedge",
    "types": ["steel", "ghost"],
    "baseStats": {
      "hp": 45,
      "attack": 80,
      "defense": 100,
      "specialAttack": 35,
      "specialDefense": 37,
      "speed": 28
    },
    "abilities": ["No Guard"],
    "height": 0.8,
    "weight": 2
  },
  {
    "id": 680,
    "name": "ニダンギル",
    "nameEn": "Doublade",
    "types": ["steel", "ghost"],
    "baseStats": {
      "hp": 59,
      "attack": 110,
      "defense": 150,
      "specialAttack": 45,
      "specialDefense": 49,
      "speed": 35
    },
    "abilities": ["No Guard"],
    "height": 0.8,
    "weight": 4.5
  },
  {
    "id": 681,
    "name": "ギルガルド (シールドフォルム)",
    "nameEn": "Aegislash",
    "types": ["steel", "ghost"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 140,
      "specialAttack": 50,
      "specialDefense": 140,
      "speed": 60
    },
    "abilities": ["Stance Change"],
    "height": 1.7,
    "weight": 53
  },
  {
    "id": 682,
    "name": "シュシュプ",
    "nameEn": "Spritzee",
    "types": ["fairy"],
    "baseStats": {
      "hp": 78,
      "attack": 52,
      "defense": 60,
      "specialAttack": 63,
      "specialDefense": 65,
      "speed": 23
    },
    "abilities": ["Healer", "Aroma Veil"],
    "height": 0.2,
    "weight": 0.5
  },
  {
    "id": 683,
    "name": "フレフワン",
    "nameEn": "Aromatisse",
    "types": ["fairy"],
    "baseStats": {
      "hp": 101,
      "attack": 72,
      "defense": 72,
      "specialAttack": 99,
      "specialDefense": 89,
      "speed": 29
    },
    "abilities": ["Healer", "Aroma Veil"],
    "height": 0.8,
    "weight": 15.5
  },
  {
    "id": 684,
    "name": "ペロッパフ",
    "nameEn": "Swirlix",
    "types": ["fairy"],
    "baseStats": {
      "hp": 62,
      "attack": 48,
      "defense": 66,
      "specialAttack": 59,
      "specialDefense": 57,
      "speed": 49
    },
    "abilities": ["Sweet Veil", "Unburden"],
    "height": 0.4,
    "weight": 3.5
  },
  {
    "id": 685,
    "name": "ペロリーム",
    "nameEn": "Slurpuff",
    "types": ["fairy"],
    "baseStats": {
      "hp": 82,
      "attack": 80,
      "defense": 86,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 72
    },
    "abilities": ["Sweet Veil", "Unburden"],
    "height": 0.8,
    "weight": 5
  },
  {
    "id": 686,
    "name": "マーイーカ",
    "nameEn": "Inkay",
    "types": ["dark", "psychic"],
    "baseStats": {
      "hp": 53,
      "attack": 54,
      "defense": 53,
      "specialAttack": 37,
      "specialDefense": 46,
      "speed": 45
    },
    "abilities": ["Contrary", "Suction Cups", "Infiltrator"],
    "height": 0.4,
    "weight": 3.5
  },
  {
    "id": 687,
    "name": "カラマネロ",
    "nameEn": "Malamar",
    "types": ["dark", "psychic"],
    "baseStats": {
      "hp": 86,
      "attack": 92,
      "defense": 88,
      "specialAttack": 68,
      "specialDefense": 75,
      "speed": 73
    },
    "abilities": ["Contrary", "Suction Cups", "Infiltrator"],
    "height": 1.5,
    "weight": 47
  },
  {
    "id": 688,
    "name": "カメテテ",
    "nameEn": "Binacle",
    "types": ["rock", "water"],
    "baseStats": {
      "hp": 42,
      "attack": 52,
      "defense": 67,
      "specialAttack": 39,
      "specialDefense": 56,
      "speed": 50
    },
    "abilities": ["Tough Claws", "Sniper", "Pickpocket"],
    "height": 0.5,
    "weight": 31
  },
  {
    "id": 689,
    "name": "ガメノデス",
    "nameEn": "Barbaracle",
    "types": ["rock", "water"],
    "baseStats": {
      "hp": 72,
      "attack": 105,
      "defense": 115,
      "specialAttack": 54,
      "specialDefense": 86,
      "speed": 68
    },
    "abilities": ["Tough Claws", "Sniper", "Pickpocket"],
    "height": 1.3,
    "weight": 96
  },
  {
    "id": 690,
    "name": "クズモー",
    "nameEn": "Skrelp",
    "types": ["poison", "water"],
    "baseStats": {
      "hp": 50,
      "attack": 60,
      "defense": 60,
      "specialAttack": 60,
      "specialDefense": 60,
      "speed": 30
    },
    "abilities": ["Poison Point", "Poison Touch", "Adaptability"],
    "height": 0.5,
    "weight": 7.3
  },
  {
    "id": 691,
    "name": "ドラミドロ",
    "nameEn": "Dragalge",
    "types": ["poison", "dragon"],
    "baseStats": {
      "hp": 65,
      "attack": 75,
      "defense": 90,
      "specialAttack": 97,
      "specialDefense": 123,
      "speed": 44
    },
    "abilities": ["Poison Point", "Poison Touch", "Adaptability"],
    "height": 1.8,
    "weight": 81.5
  },
  {
    "id": 692,
    "name": "ウデッポウ",
    "nameEn": "Clauncher",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 53,
      "defense": 62,
      "specialAttack": 58,
      "specialDefense": 63,
      "speed": 44
    },
    "abilities": ["Mega Launcher"],
    "height": 0.5,
    "weight": 8.3
  },
  {
    "id": 693,
    "name": "ブロスター",
    "nameEn": "Clawitzer",
    "types": ["water"],
    "baseStats": {
      "hp": 71,
      "attack": 73,
      "defense": 88,
      "specialAttack": 120,
      "specialDefense": 89,
      "speed": 59
    },
    "abilities": ["Mega Launcher"],
    "height": 1.3,
    "weight": 35.3
  },
  {
    "id": 694,
    "name": "エリキテル",
    "nameEn": "Helioptile",
    "types": ["electric", "normal"],
    "baseStats": {
      "hp": 44,
      "attack": 38,
      "defense": 33,
      "specialAttack": 61,
      "specialDefense": 43,
      "speed": 70
    },
    "abilities": ["Dry Skin", "Sand Veil", "Solar Power"],
    "height": 0.5,
    "weight": 6
  },
  {
    "id": 695,
    "name": "エレザード",
    "nameEn": "Heliolisk",
    "types": ["electric", "normal"],
    "baseStats": {
      "hp": 62,
      "attack": 55,
      "defense": 52,
      "specialAttack": 109,
      "specialDefense": 94,
      "speed": 109
    },
    "abilities": ["Dry Skin", "Sand Veil", "Solar Power"],
    "height": 1,
    "weight": 21
  },
  {
    "id": 696,
    "name": "チゴラス",
    "nameEn": "Tyrunt",
    "types": ["rock", "dragon"],
    "baseStats": {
      "hp": 58,
      "attack": 89,
      "defense": 77,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 48
    },
    "abilities": ["Strong Jaw", "Sturdy"],
    "height": 0.8,
    "weight": 26
  },
  {
    "id": 697,
    "name": "ガチゴラス",
    "nameEn": "Tyrantrum",
    "types": ["rock", "dragon"],
    "baseStats": {
      "hp": 82,
      "attack": 121,
      "defense": 119,
      "specialAttack": 69,
      "specialDefense": 59,
      "speed": 71
    },
    "abilities": ["Strong Jaw", "Rock Head"],
    "height": 2.5,
    "weight": 270
  },
  {
    "id": 698,
    "name": "アマルス",
    "nameEn": "Amaura",
    "types": ["rock", "ice"],
    "baseStats": {
      "hp": 77,
      "attack": 59,
      "defense": 50,
      "specialAttack": 67,
      "specialDefense": 63,
      "speed": 46
    },
    "abilities": ["Refrigerate", "Snow Warning"],
    "height": 1.3,
    "weight": 25.2
  },
  {
    "id": 699,
    "name": "アマルルガ",
    "nameEn": "Aurorus",
    "types": ["rock", "ice"],
    "baseStats": {
      "hp": 123,
      "attack": 77,
      "defense": 72,
      "specialAttack": 99,
      "specialDefense": 92,
      "speed": 58
    },
    "abilities": ["Refrigerate", "Snow Warning"],
    "height": 2.7,
    "weight": 225
  },
  {
    "id": 700,
    "name": "ニンフィア",
    "nameEn": "Sylveon",
    "types": ["fairy"],
    "baseStats": {
      "hp": 95,
      "attack": 65,
      "defense": 65,
      "specialAttack": 110,
      "specialDefense": 130,
      "speed": 60
    },
    "abilities": ["Cute Charm", "Pixilate"],
    "height": 1,
    "weight": 23.5
  },
  
  {
    "id": 701,
    "name": "ルチャブル",
    "nameEn": "Hawlucha",
    "types": ["fighting", "flying"],
    "baseStats": {
      "hp": 78,
      "attack": 92,
      "defense": 75,
      "specialAttack": 74,
      "specialDefense": 63,
      "speed": 118
    },
    "abilities": ["Limber", "Unburden", "Mold Breaker"],
    "height": 0.8,
    "weight": 21.5
  },
  {
    "id": 702,
    "name": "デデンネ",
    "nameEn": "Dedenne",
    "types": ["electric", "fairy"],
    "baseStats": {
      "hp": 67,
      "attack": 58,
      "defense": 57,
      "specialAttack": 81,
      "specialDefense": 67,
      "speed": 101
    },
    "abilities": ["Cheek Pouch", "Pickup", "Plus"],
    "height": 0.2,
    "weight": 2.2
  },
  {
    "id": 703,
    "name": "メレシー",
    "nameEn": "Carbink",
    "types": ["rock", "fairy"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 150,
      "specialAttack": 50,
      "specialDefense": 150,
      "speed": 50
    },
    "abilities": ["Clear Body", "Sturdy"],
    "height": 0.3,
    "weight": 5.7
  },
  {
    "id": 704,
    "name": "ヌメラ",
    "nameEn": "Goomy",
    "types": ["dragon"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 35,
      "specialAttack": 55,
      "specialDefense": 75,
      "speed": 40
    },
    "abilities": ["Sap Sipper", "Hydration", "Gooey"],
    "height": 0.3,
    "weight": 2.8
  },
  {
    "id": 705,
    "name": "ヌメイル",
    "nameEn": "Sliggoo",
    "types": ["dragon"],
    "baseStats": {
      "hp": 68,
      "attack": 75,
      "defense": 53,
      "specialAttack": 83,
      "specialDefense": 113,
      "speed": 60
    },
    "abilities": ["Sap Sipper", "Hydration", "Gooey"],
    "height": 0.8,
    "weight": 17.5
  },
  {
    "id": 706,
    "name": "ヌメルゴン",
    "nameEn": "Goodra",
    "types": ["dragon"],
    "baseStats": {
      "hp": 90,
      "attack": 100,
      "defense": 70,
      "specialAttack": 110,
      "specialDefense": 150,
      "speed": 80
    },
    "abilities": ["Sap Sipper", "Hydration", "Gooey"],
    "height": 2,
    "weight": 150.5
  },
  {
    "id": 707,
    "name": "クレッフィ",
    "nameEn": "Klefki",
    "types": ["steel", "fairy"],
    "baseStats": {
      "hp": 57,
      "attack": 80,
      "defense": 91,
      "specialAttack": 80,
      "specialDefense": 87,
      "speed": 75
    },
    "abilities": ["Prankster", "Magician"],
    "height": 0.2,
    "weight": 3
  },
  {
    "id": 708,
    "name": "ボクレー",
    "nameEn": "Phantump",
    "types": ["ghost", "grass"],
    "baseStats": {
      "hp": 43,
      "attack": 70,
      "defense": 48,
      "specialAttack": 50,
      "specialDefense": 60,
      "speed": 38
    },
    "abilities": ["Natural Cure", "Frisk", "Harvest"],
    "height": 0.4,
    "weight": 7
  },
  {
    "id": 709,
    "name": "オーロット",
    "nameEn": "Trevenant",
    "types": ["ghost", "grass"],
    "baseStats": {
      "hp": 85,
      "attack": 110,
      "defense": 76,
      "specialAttack": 65,
      "specialDefense": 82,
      "speed": 56
    },
    "abilities": ["Natural Cure", "Frisk", "Harvest"],
    "height": 1.5,
    "weight": 71
  },
  {
    "id": 710,
    "name": "バケッチャ (ふつうのサイズ)",
    "nameEn": "Pumpkaboo",
    "types": ["ghost", "grass"],
    "baseStats": {
      "hp": 49,
      "attack": 66,
      "defense": 70,
      "specialAttack": 44,
      "specialDefense": 55,
      "speed": 51
    },
    "abilities": ["Pickup", "Frisk", "Insomnia"],
    "height": 0.4,
    "weight": 5
  },
  {
    "id": 711,
    "name": "パンプジン (ふつうのサイズ)",
    "nameEn": "Gourgeist",
    "types": ["ghost", "grass"],
    "baseStats": {
      "hp": 65,
      "attack": 90,
      "defense": 122,
      "specialAttack": 58,
      "specialDefense": 75,
      "speed": 84
    },
    "abilities": ["Pickup", "Frisk", "Insomnia"],
    "height": 0.9,
    "weight": 12.5
  },
  {
    "id": 712,
    "name": "カチコール",
    "nameEn": "Bergmite",
    "types": ["ice"],
    "baseStats": {
      "hp": 55,
      "attack": 69,
      "defense": 85,
      "specialAttack": 32,
      "specialDefense": 35,
      "speed": 28
    },
    "abilities": ["Own Tempo", "Ice Body", "Sturdy"],
    "height": 1,
    "weight": 99.5
  },
  {
    "id": 713,
    "name": "クレベース",
    "nameEn": "Avalugg",
    "types": ["ice"],
    "baseStats": {
      "hp": 95,
      "attack": 117,
      "defense": 184,
      "specialAttack": 44,
      "specialDefense": 46,
      "speed": 28
    },
    "abilities": ["Own Tempo", "Ice Body", "Sturdy"],
    "height": 2,
    "weight": 505
  },
  {
    "id": 714,
    "name": "オンバット",
    "nameEn": "Noibat",
    "types": ["flying", "dragon"],
    "baseStats": {
      "hp": 40,
      "attack": 30,
      "defense": 35,
      "specialAttack": 45,
      "specialDefense": 40,
      "speed": 55
    },
    "abilities": ["Frisk", "Infiltrator", "Telepathy"],
    "height": 0.5,
    "weight": 8
  },
  {
    "id": 715,
    "name": "オンバーン",
    "nameEn": "Noivern",
    "types": ["flying", "dragon"],
    "baseStats": {
      "hp": 85,
      "attack": 70,
      "defense": 80,
      "specialAttack": 97,
      "specialDefense": 80,
      "speed": 123
    },
    "abilities": ["Frisk", "Infiltrator", "Telepathy"],
    "height": 1.5,
    "weight": 85
  },
  {
    "id": 716,
    "name": "ゼルネアス (アクティブモード)",
    "nameEn": "Xerneas",
    "types": ["fairy"],
    "baseStats": {
      "hp": 126,
      "attack": 131,
      "defense": 95,
      "specialAttack": 131,
      "specialDefense": 98,
      "speed": 99
    },
    "abilities": ["Fairy Aura"],
    "height": 3,
    "weight": 215
  },
  {
    "id": 717,
    "name": "イベルタル",
    "nameEn": "Yveltal",
    "types": ["dark", "flying"],
    "baseStats": {
      "hp": 126,
      "attack": 131,
      "defense": 95,
      "specialAttack": 131,
      "specialDefense": 98,
      "speed": 99
    },
    "abilities": ["Dark Aura"],
    "height": 5.8,
    "weight": 203
  },
  {
    "id": 718,
    "name": "ジガルデ (50%フォルム)",
    "nameEn": "Zygarde",
    "types": ["dragon", "ground"],
    "baseStats": {
      "hp": 108,
      "attack": 100,
      "defense": 121,
      "specialAttack": 81,
      "specialDefense": 95,
      "speed": 95
    },
    "abilities": ["Aura Break", "Power Construct"],
    "height": 5,
    "weight": 305
  },
  {
    "id": 719,
    "name": "ディアンシー",
    "nameEn": "Diancie",
    "types": ["rock", "fairy"],
    "baseStats": {
      "hp": 50,
      "attack": 100,
      "defense": 150,
      "specialAttack": 100,
      "specialDefense": 150,
      "speed": 50
    },
    "abilities": ["Clear Body"],
    "height": 0.7,
    "weight": 8.8
  },
  {
    "id": 720,
    "name": "フーパ (いましめられしフーパ)",
    "nameEn": "Hoopa",
    "types": ["psychic", "ghost"],
    "baseStats": {
      "hp": 80,
      "attack": 110,
      "defense": 60,
      "specialAttack": 150,
      "specialDefense": 130,
      "speed": 70
    },
    "abilities": ["Magician"],
    "height": 0.5,
    "weight": 9
  },
  {
    "id": 721,
    "name": "ボルケニオン",
    "nameEn": "Volcanion",
    "types": ["fire", "water"],
    "baseStats": {
      "hp": 80,
      "attack": 110,
      "defense": 120,
      "specialAttack": 130,
      "specialDefense": 90,
      "speed": 70
    },
    "abilities": ["Water Absorb"],
    "height": 1.7,
    "weight": 195
  },
  {
    "id": 722,
    "name": "モクロー",
    "nameEn": "Rowlet",
    "types": ["grass", "flying"],
    "baseStats": {
      "hp": 68,
      "attack": 55,
      "defense": 55,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 42
    },
    "abilities": ["Overgrow", "Long Reach"],
    "height": 0.3,
    "weight": 1.5
  },
  {
    "id": 723,
    "name": "フクスロー",
    "nameEn": "Dartrix",
    "types": ["grass", "flying"],
    "baseStats": {
      "hp": 78,
      "attack": 75,
      "defense": 75,
      "specialAttack": 70,
      "specialDefense": 70,
      "speed": 52
    },
    "abilities": ["Overgrow", "Long Reach"],
    "height": 0.7,
    "weight": 16
  },
  {
    "id": 724,
    "name": "ジュナイパー",
    "nameEn": "Decidueye",
    "types": ["grass", "ghost"],
    "baseStats": {
      "hp": 78,
      "attack": 107,
      "defense": 75,
      "specialAttack": 100,
      "specialDefense": 100,
      "speed": 70
    },
    "abilities": ["Overgrow", "Long Reach"],
    "height": 1.6,
    "weight": 36.6
  },
  {
    "id": 725,
    "name": "ニャビー",
    "nameEn": "Litten",
    "types": ["fire"],
    "baseStats": {
      "hp": 45,
      "attack": 65,
      "defense": 40,
      "specialAttack": 60,
      "specialDefense": 40,
      "speed": 70
    },
    "abilities": ["Blaze", "Intimidate"],
    "height": 0.4,
    "weight": 4.3
  },
  {
    "id": 726,
    "name": "ニャヒート",
    "nameEn": "Torracat",
    "types": ["fire"],
    "baseStats": {
      "hp": 65,
      "attack": 85,
      "defense": 50,
      "specialAttack": 80,
      "specialDefense": 50,
      "speed": 90
    },
    "abilities": ["Blaze", "Intimidate"],
    "height": 0.7,
    "weight": 25
  },
  {
    "id": 727,
    "name": "ガオガエン",
    "nameEn": "Incineroar",
    "types": ["fire", "dark"],
    "baseStats": {
      "hp": 95,
      "attack": 115,
      "defense": 90,
      "specialAttack": 80,
      "specialDefense": 90,
      "speed": 60
    },
    "abilities": ["Blaze", "Intimidate"],
    "height": 1.8,
    "weight": 83
  },
  {
    "id": 728,
    "name": "アシマリ",
    "nameEn": "Popplio",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 54,
      "defense": 54,
      "specialAttack": 66,
      "specialDefense": 56,
      "speed": 40
    },
    "abilities": ["Torrent", "Liquid Voice"],
    "height": 0.4,
    "weight": 7.5
  },
  {
    "id": 729,
    "name": "オシャマリ",
    "nameEn": "Brionne",
    "types": ["water"],
    "baseStats": {
      "hp": 60,
      "attack": 69,
      "defense": 69,
      "specialAttack": 91,
      "specialDefense": 81,
      "speed": 50
    },
    "abilities": ["Torrent", "Liquid Voice"],
    "height": 0.6,
    "weight": 17.5
  },
  {
    "id": 730,
    "name": "アシレーヌ",
    "nameEn": "Primarina",
    "types": ["water", "fairy"],
    "baseStats": {
      "hp": 80,
      "attack": 74,
      "defense": 74,
      "specialAttack": 126,
      "specialDefense": 116,
      "speed": 60
    },
    "abilities": ["Torrent", "Liquid Voice"],
    "height": 1.8,
    "weight": 44
  },
  {
    "id": 731,
    "name": "ツツケラ",
    "nameEn": "Pikipek",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 35,
      "attack": 75,
      "defense": 30,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 65
    },
    "abilities": ["Keen Eye", "Skill Link", "Pickup"],
    "height": 0.3,
    "weight": 1.2
  },
  {
    "id": 732,
    "name": "ケララッパ",
    "nameEn": "Trumbeak",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 55,
      "attack": 85,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 75
    },
    "abilities": ["Keen Eye", "Skill Link", "Pickup"],
    "height": 0.6,
    "weight": 14.8
  },
  {
    "id": 733,
    "name": "ドデカバシ",
    "nameEn": "Toucannon",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 75,
      "specialAttack": 75,
      "specialDefense": 75,
      "speed": 60
    },
    "abilities": ["Keen Eye", "Skill Link", "Sheer Force"],
    "height": 1.1,
    "weight": 26
  },
  {
    "id": 734,
    "name": "ヤングース",
    "nameEn": "Yungoos",
    "types": ["normal"],
    "baseStats": {
      "hp": 48,
      "attack": 70,
      "defense": 30,
      "specialAttack": 30,
      "specialDefense": 30,
      "speed": 45
    },
    "abilities": ["Stakeout", "Strong Jaw", "Adaptability"],
    "height": 0.4,
    "weight": 6
  },
  {
    "id": 735,
    "name": "デカグース",
    "nameEn": "Gumshoos",
    "types": ["normal"],
    "baseStats": {
      "hp": 88,
      "attack": 110,
      "defense": 60,
      "specialAttack": 55,
      "specialDefense": 60,
      "speed": 45
    },
    "abilities": ["Stakeout", "Strong Jaw", "Adaptability"],
    "height": 0.7,
    "weight": 14.2
  },
  {
    "id": 736,
    "name": "アゴジムシ",
    "nameEn": "Grubbin",
    "types": ["bug"],
    "baseStats": {
      "hp": 47,
      "attack": 62,
      "defense": 45,
      "specialAttack": 55,
      "specialDefense": 45,
      "speed": 46
    },
    "abilities": ["Swarm"],
    "height": 0.4,
    "weight": 4.4
  },
  {
    "id": 737,
    "name": "デンヂムシ",
    "nameEn": "Charjabug",
    "types": ["bug", "electric"],
    "baseStats": {
      "hp": 57,
      "attack": 82,
      "defense": 95,
      "specialAttack": 55,
      "specialDefense": 75,
      "speed": 36
    },
    "abilities": ["Battery"],
    "height": 0.5,
    "weight": 10.5
  },
  {
    "id": 738,
    "name": "クワガノン",
    "nameEn": "Vikavolt",
    "types": ["bug", "electric"],
    "baseStats": {
      "hp": 77,
      "attack": 70,
      "defense": 90,
      "specialAttack": 145,
      "specialDefense": 75,
      "speed": 43
    },
    "abilities": ["Levitate"],
    "height": 1.5,
    "weight": 45
  },
  {
    "id": 739,
    "name": "マケンカニ",
    "nameEn": "Crabrawler",
    "types": ["fighting"],
    "baseStats": {
      "hp": 47,
      "attack": 82,
      "defense": 57,
      "specialAttack": 42,
      "specialDefense": 47,
      "speed": 63
    },
    "abilities": ["Hyper Cutter", "Iron Fist", "Anger Point"],
    "height": 0.6,
    "weight": 7
  },
  {
    "id": 740,
    "name": "ケケンカニ",
    "nameEn": "Crabominable",
    "types": ["fighting", "ice"],
    "baseStats": {
      "hp": 97,
      "attack": 132,
      "defense": 77,
      "specialAttack": 62,
      "specialDefense": 67,
      "speed": 43
    },
    "abilities": ["Hyper Cutter", "Iron Fist", "Anger Point"],
    "height": 1.7,
    "weight": 180
  },
  {
    "id": 741,
    "name": "オドリドリ (まいまいスタイル)",
    "nameEn": "Oricorio",
    "types": ["fire", "flying"],
    "baseStats": {
      "hp": 75,
      "attack": 70,
      "defense": 70,
      "specialAttack": 98,
      "specialDefense": 70,
      "speed": 93
    },
    "abilities": ["Dancer"],
    "height": 0.6,
    "weight": 3.4
  },
  {
    "id": 742,
    "name": "アブリー",
    "nameEn": "Cutiefly",
    "types": ["bug", "fairy"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 40,
      "specialAttack": 55,
      "specialDefense": 40,
      "speed": 84
    },
    "abilities": ["Honey Gather", "Shield Dust", "Sweet Veil"],
    "height": 0.1,
    "weight": 0.2
  },
  {
    "id": 743,
    "name": "アブリボン",
    "nameEn": "Ribombee",
    "types": ["bug", "fairy"],
    "baseStats": {
      "hp": 60,
      "attack": 55,
      "defense": 60,
      "specialAttack": 95,
      "specialDefense": 70,
      "speed": 124
    },
    "abilities": ["Honey Gather", "Shield Dust", "Sweet Veil"],
    "height": 0.2,
    "weight": 0.5
  },
  {
    "id": 744,
    "name": "イワンコ (まひるのすがた)",
    "nameEn": "Rockruff",
    "types": ["rock"],
    "baseStats": {
      "hp": 45,
      "attack": 65,
      "defense": 40,
      "specialAttack": 30,
      "specialDefense": 40,
      "speed": 60
    },
    "abilities": ["Keen Eye", "Vital Spirit", "Steadfast", "Own Tempo"],
    "height": 0.5,
    "weight": 9.2
  },
  {
    "id": 745,
    "name": "ルガルガン (まひるのすがた)",
    "nameEn": "Lycanroc",
    "types": ["rock"],
    "baseStats": {
      "hp": 75,
      "attack": 115,
      "defense": 65,
      "specialAttack": 55,
      "specialDefense": 65,
      "speed": 112
    },
    "abilities": ["Keen Eye", "Sand Rush", "Steadfast"],
    "height": 0.8,
    "weight": 25
  },
  {
    "id": 746,
    "name": "ヨワシ (たんどくのすがた)",
    "nameEn": "Wishiwashi",
    "types": ["water"],
    "baseStats": {
      "hp": 45,
      "attack": 20,
      "defense": 20,
      "specialAttack": 25,
      "specialDefense": 25,
      "speed": 40
    },
    "abilities": ["Schooling"],
    "height": 0.2,
    "weight": 0.3
  },
  {
    "id": 747,
    "name": "ヒドイデ",
    "nameEn": "Mareanie",
    "types": ["poison", "water"],
    "baseStats": {
      "hp": 50,
      "attack": 53,
      "defense": 62,
      "specialAttack": 43,
      "specialDefense": 52,
      "speed": 45
    },
    "abilities": ["Merciless", "Limber", "Regenerator"],
    "height": 0.4,
    "weight": 8
  },
  {
    "id": 748,
    "name": "ドヒドイデ",
    "nameEn": "Toxapex",
    "types": ["poison", "water"],
    "baseStats": {
      "hp": 50,
      "attack": 63,
      "defense": 152,
      "specialAttack": 53,
      "specialDefense": 142,
      "speed": 35
    },
    "abilities": ["Merciless", "Limber", "Regenerator"],
    "height": 0.7,
    "weight": 14.5
  },
  {
    "id": 749,
    "name": "ドロバンコ",
    "nameEn": "Mudbray",
    "types": ["ground"],
    "baseStats": {
      "hp": 70,
      "attack": 100,
      "defense": 70,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 45
    },
    "abilities": ["Own Tempo", "Stamina", "Inner Focus"],
    "height": 1,
    "weight": 110
  },
  {
    "id": 750,
    "name": "バンバドロ",
    "nameEn": "Mudsdale",
    "types": ["ground"],
    "baseStats": {
      "hp": 100,
      "attack": 125,
      "defense": 100,
      "specialAttack": 55,
      "specialDefense": 85,
      "speed": 35
    },
    "abilities": ["Own Tempo", "Stamina", "Inner Focus"],
    "height": 2.5,
    "weight": 920
  },
  {
    "id": 751,
    "name": "シズクモ",
    "nameEn": "Dewpider",
    "types": ["water", "bug"],
    "baseStats": {
      "hp": 38,
      "attack": 40,
      "defense": 52,
      "specialAttack": 40,
      "specialDefense": 72,
      "speed": 27
    },
    "abilities": ["Water Bubble", "Water Absorb"],
    "height": 0.3,
    "weight": 4
  },
  {
    "id": 752,
    "name": "オニシズクモ",
    "nameEn": "Araquanid",
    "types": ["water", "bug"],
    "baseStats": {
      "hp": 68,
      "attack": 70,
      "defense": 92,
      "specialAttack": 50,
      "specialDefense": 132,
      "speed": 42
    },
    "abilities": ["Water Bubble", "Water Absorb"],
    "height": 1.8,
    "weight": 82
  },
  {
    "id": 753,
    "name": "カリキリ",
    "nameEn": "Fomantis",
    "types": ["grass"],
    "baseStats": {
      "hp": 40,
      "attack": 55,
      "defense": 35,
      "specialAttack": 50,
      "specialDefense": 35,
      "speed": 35
    },
    "abilities": ["Leaf Guard", "Contrary"],
    "height": 0.3,
    "weight": 1.5
  },
  {
    "id": 754,
    "name": "ラランテス",
    "nameEn": "Lurantis",
    "types": ["grass"],
    "baseStats": {
      "hp": 70,
      "attack": 105,
      "defense": 90,
      "specialAttack": 80,
      "specialDefense": 90,
      "speed": 45
    },
    "abilities": ["Leaf Guard", "Contrary"],
    "height": 0.9,
    "weight": 18.5
  },
  {
    "id": 755,
    "name": "ネマシュ",
    "nameEn": "Morelull",
    "types": ["grass", "fairy"],
    "baseStats": {
      "hp": 40,
      "attack": 35,
      "defense": 55,
      "specialAttack": 65,
      "specialDefense": 75,
      "speed": 15
    },
    "abilities": ["Illuminate", "Effect Spore", "Rain Dish"],
    "height": 0.2,
    "weight": 1.5
  },
  {
    "id": 756,
    "name": "マシェード",
    "nameEn": "Shiinotic",
    "types": ["grass", "fairy"],
    "baseStats": {
      "hp": 60,
      "attack": 45,
      "defense": 80,
      "specialAttack": 90,
      "specialDefense": 100,
      "speed": 30
    },
    "abilities": ["Illuminate", "Effect Spore", "Rain Dish"],
    "height": 1,
    "weight": 11.5
  },
  {
    "id": 757,
    "name": "ヤトウモリ",
    "nameEn": "Salandit",
    "types": ["poison", "fire"],
    "baseStats": {
      "hp": 48,
      "attack": 44,
      "defense": 40,
      "specialAttack": 71,
      "specialDefense": 40,
      "speed": 77
    },
    "abilities": ["Corrosion", "Oblivious"],
    "height": 0.6,
    "weight": 4.8
  },
  {
    "id": 758,
    "name": "エンニュート",
    "nameEn": "Salazzle",
    "types": ["poison", "fire"],
    "baseStats": {
      "hp": 68,
      "attack": 64,
      "defense": 60,
      "specialAttack": 111,
      "specialDefense": 60,
      "speed": 117
    },
    "abilities": ["Corrosion", "Oblivious"],
    "height": 1.2,
    "weight": 22.2
  },
  {
    "id": 759,
    "name": "ヌイコグマ",
    "nameEn": "Stufful",
    "types": ["normal", "fighting"],
    "baseStats": {
      "hp": 70,
      "attack": 75,
      "defense": 50,
      "specialAttack": 45,
      "specialDefense": 50,
      "speed": 50
    },
    "abilities": ["Fluffy", "Klutz", "Cute Charm"],
    "height": 0.5,
    "weight": 6.8
  },
  {
    "id": 760,
    "name": "キテルグマ",
    "nameEn": "Bewear",
    "types": ["normal", "fighting"],
    "baseStats": {
      "hp": 120,
      "attack": 125,
      "defense": 80,
      "specialAttack": 55,
      "specialDefense": 60,
      "speed": 60
    },
    "abilities": ["Fluffy", "Klutz", "Unnerve"],
    "height": 2.1,
    "weight": 135
  },
  {
    "id": 761,
    "name": "アマカジ",
    "nameEn": "Bounsweet",
    "types": ["grass"],
    "baseStats": {
      "hp": 42,
      "attack": 30,
      "defense": 38,
      "specialAttack": 30,
      "specialDefense": 38,
      "speed": 32
    },
    "abilities": ["Leaf Guard", "Oblivious", "Sweet Veil"],
    "height": 0.3,
    "weight": 3.2
  },
  {
    "id": 762,
    "name": "アママイコ",
    "nameEn": "Steenee",
    "types": ["grass"],
    "baseStats": {
      "hp": 52,
      "attack": 40,
      "defense": 48,
      "specialAttack": 40,
      "specialDefense": 48,
      "speed": 62
    },
    "abilities": ["Leaf Guard", "Oblivious", "Sweet Veil"],
    "height": 0.7,
    "weight": 8.2
  },
  {
    "id": 763,
    "name": "アマージョ",
    "nameEn": "Tsareena",
    "types": ["grass"],
    "baseStats": {
      "hp": 72,
      "attack": 120,
      "defense": 98,
      "specialAttack": 50,
      "specialDefense": 98,
      "speed": 72
    },
    "abilities": ["Leaf Guard", "Queenly Majesty", "Sweet Veil"],
    "height": 1.2,
    "weight": 21.4
  },
  {
    "id": 764,
    "name": "キュワワー",
    "nameEn": "Comfey",
    "types": ["fairy"],
    "baseStats": {
      "hp": 51,
      "attack": 52,
      "defense": 90,
      "specialAttack": 82,
      "specialDefense": 110,
      "speed": 100
    },
    "abilities": ["Flower Veil", "Triage", "Natural Cure"],
    "height": 0.1,
    "weight": 0.3
  },
  {
    "id": 765,
    "name": "ヤレユータン",
    "nameEn": "Oranguru",
    "types": ["normal", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 60,
      "defense": 80,
      "specialAttack": 90,
      "specialDefense": 110,
      "speed": 60
    },
    "abilities": ["Inner Focus", "Telepathy", "Symbiosis"],
    "height": 1.5,
    "weight": 76
  },
  {
    "id": 766,
    "name": "ナゲツケサル",
    "nameEn": "Passimian",
    "types": ["fighting"],
    "baseStats": {
      "hp": 100,
      "attack": 120,
      "defense": 90,
      "specialAttack": 40,
      "specialDefense": 60,
      "speed": 80
    },
    "abilities": ["Receiver", "Defiant"],
    "height": 2,
    "weight": 82.8
  },
  {
    "id": 767,
    "name": "コソクムシ",
    "nameEn": "Wimpod",
    "types": ["bug", "water"],
    "baseStats": {
      "hp": 25,
      "attack": 35,
      "defense": 40,
      "specialAttack": 20,
      "specialDefense": 30,
      "speed": 80
    },
    "abilities": ["Wimp Out"],
    "height": 0.5,
    "weight": 12
  },
  {
    "id": 768,
    "name": "グソクムシャ",
    "nameEn": "Golisopod",
    "types": ["bug", "water"],
    "baseStats": {
      "hp": 75,
      "attack": 125,
      "defense": 140,
      "specialAttack": 60,
      "specialDefense": 90,
      "speed": 40
    },
    "abilities": ["Emergency Exit"],
    "height": 2,
    "weight": 108
  },
  {
    "id": 769,
    "name": "スナバァ",
    "nameEn": "Sandygast",
    "types": ["ghost", "ground"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 80,
      "specialAttack": 70,
      "specialDefense": 45,
      "speed": 15
    },
    "abilities": ["Water Compaction", "Sand Veil"],
    "height": 0.5,
    "weight": 70
  },
  {
    "id": 770,
    "name": "シロデスナ",
    "nameEn": "Palossand",
    "types": ["ghost", "ground"],
    "baseStats": {
      "hp": 85,
      "attack": 75,
      "defense": 110,
      "specialAttack": 100,
      "specialDefense": 75,
      "speed": 35
    },
    "abilities": ["Water Compaction", "Sand Veil"],
    "height": 1.3,
    "weight": 250
  },
  {
    "id": 771,
    "name": "ナマコブシ",
    "nameEn": "Pyukumuku",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 60,
      "defense": 130,
      "specialAttack": 30,
      "specialDefense": 130,
      "speed": 5
    },
    "abilities": ["Innards Out", "Unaware"],
    "height": 0.3,
    "weight": 1.2
  },
  {
    "id": 772,
    "name": "タイプ：ヌル",
    "nameEn": "Type: Null",
    "types": ["normal"],
    "baseStats": {
      "hp": 95,
      "attack": 95,
      "defense": 95,
      "specialAttack": 95,
      "specialDefense": 95,
      "speed": 59
    },
    "abilities": ["Battle Armor"],
    "height": 1.9,
    "weight": 120.5
  },
  {
    "id": 773,
    "name": "シルヴァディ",
    "nameEn": "Silvally",
    "types": ["normal"],
    "baseStats": {
      "hp": 95,
      "attack": 95,
      "defense": 95,
      "specialAttack": 95,
      "specialDefense": 95,
      "speed": 95
    },
    "abilities": ["RKS System"],
    "height": 2.3,
    "weight": 100.5
  },
  {
    "id": 774,
    "name": "メテノ (あかいろのコア)",
    "nameEn": "Minior",
    "types": ["rock", "flying"],
    "baseStats": {
      "hp": 60,
      "attack": 100,
      "defense": 60,
      "specialAttack": 100,
      "specialDefense": 60,
      "speed": 120
    },
    "abilities": ["Shields Down"],
    "height": 0.3,
    "weight": 0.3
  },
  {
    "id": 775,
    "name": "ネッコアラ",
    "nameEn": "Komala",
    "types": ["normal"],
    "baseStats": {
      "hp": 65,
      "attack": 115,
      "defense": 65,
      "specialAttack": 75,
      "specialDefense": 95,
      "speed": 65
    },
    "abilities": ["Comatose"],
    "height": 0.4,
    "weight": 19.9
  },
  {
    "id": 776,
    "name": "バクガメス",
    "nameEn": "Turtonator",
    "types": ["fire", "dragon"],
    "baseStats": {
      "hp": 60,
      "attack": 78,
      "defense": 135,
      "specialAttack": 91,
      "specialDefense": 85,
      "speed": 36
    },
    "abilities": ["Shell Armor"],
    "height": 2,
    "weight": 212
  },
  {
    "id": 777,
    "name": "トゲデマル",
    "nameEn": "Togedemaru",
    "types": ["electric", "steel"],
    "baseStats": {
      "hp": 65,
      "attack": 98,
      "defense": 63,
      "specialAttack": 40,
      "specialDefense": 73,
      "speed": 96
    },
    "abilities": ["Iron Barbs", "Lightning Rod", "Sturdy"],
    "height": 0.3,
    "weight": 3.3
  },
  {
    "id": 778,
    "name": "ミミッキュ (ばけたすがた)",
    "nameEn": "Mimikyu",
    "types": ["ghost", "fairy"],
    "baseStats": {
      "hp": 55,
      "attack": 90,
      "defense": 80,
      "specialAttack": 50,
      "specialDefense": 105,
      "speed": 96
    },
    "abilities": ["Disguise"],
    "height": 0.2,
    "weight": 0.7
  },
  {
    "id": 779,
    "name": "ハギギシリ",
    "nameEn": "Bruxish",
    "types": ["water", "psychic"],
    "baseStats": {
      "hp": 68,
      "attack": 105,
      "defense": 70,
      "specialAttack": 70,
      "specialDefense": 70,
      "speed": 92
    },
    "abilities": ["Dazzling", "Strong Jaw", "Wonder Skin"],
    "height": 0.9,
    "weight": 19
  },
  {
    "id": 780,
    "name": "ジジーロン",
    "nameEn": "Drampa",
    "types": ["normal", "dragon"],
    "baseStats": {
      "hp": 78,
      "attack": 60,
      "defense": 85,
      "specialAttack": 135,
      "specialDefense": 91,
      "speed": 36
    },
    "abilities": ["Berserk", "Sap Sipper", "Cloud Nine"],
    "height": 3,
    "weight": 185
  },
  {
    "id": 781,
    "name": "ダダリン",
    "nameEn": "Dhelmise",
    "types": ["ghost", "grass"],
    "baseStats": {
      "hp": 70,
      "attack": 131,
      "defense": 100,
      "specialAttack": 86,
      "specialDefense": 90,
      "speed": 40
    },
    "abilities": ["Steelworker"],
    "height": 3.9,
    "weight": 210
  },
  {
    "id": 782,
    "name": "ジャラコ",
    "nameEn": "Jangmo-o",
    "types": ["dragon"],
    "baseStats": {
      "hp": 45,
      "attack": 55,
      "defense": 65,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 45
    },
    "abilities": ["Bulletproof", "Soundproof", "Overcoat"],
    "height": 0.6,
    "weight": 29.7
  },
  {
    "id": 783,
    "name": "ジャランゴ",
    "nameEn": "Hakamo-o",
    "types": ["dragon", "fighting"],
    "baseStats": {
      "hp": 55,
      "attack": 75,
      "defense": 90,
      "specialAttack": 65,
      "specialDefense": 70,
      "speed": 65
    },
    "abilities": ["Bulletproof", "Soundproof", "Overcoat"],
    "height": 1.2,
    "weight": 47
  },
  {
    "id": 784,
    "name": "ジャラランガ",
    "nameEn": "Kommo-o",
    "types": ["dragon", "fighting"],
    "baseStats": {
      "hp": 75,
      "attack": 110,
      "defense": 125,
      "specialAttack": 100,
      "specialDefense": 105,
      "speed": 85
    },
    "abilities": ["Bulletproof", "Soundproof", "Overcoat"],
    "height": 1.6,
    "weight": 78.2
  },
  {
    "id": 785,
    "name": "カプ・コケコ",
    "nameEn": "Tapu Koko",
    "types": ["electric", "fairy"],
    "baseStats": {
      "hp": 70,
      "attack": 115,
      "defense": 85,
      "specialAttack": 95,
      "specialDefense": 75,
      "speed": 130
    },
    "abilities": ["Electric Surge", "Telepathy"],
    "height": 1.8,
    "weight": 20.5
  },
  {
    "id": 786,
    "name": "カプ・テテフ",
    "nameEn": "Tapu Lele",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 75,
      "specialAttack": 130,
      "specialDefense": 115,
      "speed": 95
    },
    "abilities": ["Psychic Surge", "Telepathy"],
    "height": 1.2,
    "weight": 18.6
  },
  {
    "id": 787,
    "name": "カプ・ブルル",
    "nameEn": "Tapu Bulu",
    "types": ["grass", "fairy"],
    "baseStats": {
      "hp": 70,
      "attack": 130,
      "defense": 115,
      "specialAttack": 85,
      "specialDefense": 95,
      "speed": 75
    },
    "abilities": ["Grassy Surge", "Telepathy"],
    "height": 1.9,
    "weight": 45.5
  },
  {
    "id": 788,
    "name": "カプ・レヒレ",
    "nameEn": "Tapu Fini",
    "types": ["water", "fairy"],
    "baseStats": {
      "hp": 70,
      "attack": 75,
      "defense": 115,
      "specialAttack": 95,
      "specialDefense": 130,
      "speed": 85
    },
    "abilities": ["Misty Surge", "Telepathy"],
    "height": 1.3,
    "weight": 21.2
  },
  {
    "id": 789,
    "name": "コスモッグ",
    "nameEn": "Cosmog",
    "types": ["psychic"],
    "baseStats": {
      "hp": 43,
      "attack": 29,
      "defense": 31,
      "specialAttack": 29,
      "specialDefense": 31,
      "speed": 37
    },
    "abilities": ["Unaware"],
    "height": 0.2,
    "weight": 0.1
  },
  {
    "id": 790,
    "name": "コスモウム",
    "nameEn": "Cosmoem",
    "types": ["psychic"],
    "baseStats": {
      "hp": 43,
      "attack": 29,
      "defense": 131,
      "specialAttack": 29,
      "specialDefense": 131,
      "speed": 37
    },
    "abilities": ["Sturdy"],
    "height": 0.1,
    "weight": 999.9
  },
  {
    "id": 791,
    "name": "ソルガレオ",
    "nameEn": "Solgaleo",
    "types": ["psychic", "steel"],
    "baseStats": {
      "hp": 137,
      "attack": 137,
      "defense": 107,
      "specialAttack": 113,
      "specialDefense": 89,
      "speed": 97
    },
    "abilities": ["Full Metal Body"],
    "height": 3.4,
    "weight": 230
  },
  {
    "id": 792,
    "name": "ルナアーラ",
    "nameEn": "Lunala",
    "types": ["psychic", "ghost"],
    "baseStats": {
      "hp": 137,
      "attack": 113,
      "defense": 89,
      "specialAttack": 137,
      "specialDefense": 107,
      "speed": 97
    },
    "abilities": ["Shadow Shield"],
    "height": 4,
    "weight": 120
  },
  {
    "id": 793,
    "name": "ウツロイド",
    "nameEn": "Nihilego",
    "types": ["rock", "poison"],
    "baseStats": {
      "hp": 109,
      "attack": 53,
      "defense": 47,
      "specialAttack": 127,
      "specialDefense": 131,
      "speed": 103
    },
    "abilities": ["Beast Boost"],
    "height": 1.2,
    "weight": 55.5
  },
  {
    "id": 794,
    "name": "マッシブーン",
    "nameEn": "Buzzwole",
    "types": ["bug", "fighting"],
    "baseStats": {
      "hp": 107,
      "attack": 139,
      "defense": 139,
      "specialAttack": 53,
      "specialDefense": 53,
      "speed": 79
    },
    "abilities": ["Beast Boost"],
    "height": 2.4,
    "weight": 333.6
  },
  {
    "id": 795,
    "name": "フェローチェ",
    "nameEn": "Pheromosa",
    "types": ["bug", "fighting"],
    "baseStats": {
      "hp": 71,
      "attack": 137,
      "defense": 37,
      "specialAttack": 137,
      "specialDefense": 37,
      "speed": 151
    },
    "abilities": ["Beast Boost"],
    "height": 1.8,
    "weight": 25
  },
  {
    "id": 796,
    "name": "デンジュモク",
    "nameEn": "Xurkitree",
    "types": ["electric"],
    "baseStats": {
      "hp": 83,
      "attack": 89,
      "defense": 71,
      "specialAttack": 173,
      "specialDefense": 71,
      "speed": 83
    },
    "abilities": ["Beast Boost"],
    "height": 3.8,
    "weight": 100
  },
  {
    "id": 797,
    "name": "テッカグヤ",
    "nameEn": "Celesteela",
    "types": ["steel", "flying"],
    "baseStats": {
      "hp": 97,
      "attack": 101,
      "defense": 103,
      "specialAttack": 107,
      "specialDefense": 101,
      "speed": 61
    },
    "abilities": ["Beast Boost"],
    "height": 9.2,
    "weight": 999.9
  },
  {
    "id": 798,
    "name": "カミツルギ",
    "nameEn": "Kartana",
    "types": ["grass", "steel"],
    "baseStats": {
      "hp": 59,
      "attack": 181,
      "defense": 131,
      "specialAttack": 59,
      "specialDefense": 31,
      "speed": 109
    },
    "abilities": ["Beast Boost"],
    "height": 0.3,
    "weight": 0.1
  },
  {
    "id": 799,
    "name": "アクジキング",
    "nameEn": "Guzzlord",
    "types": ["dark", "dragon"],
    "baseStats": {
      "hp": 223,
      "attack": 101,
      "defense": 53,
      "specialAttack": 97,
      "specialDefense": 53,
      "speed": 43
    },
    "abilities": ["Beast Boost"],
    "height": 5.5,
    "weight": 888
  },
  {
    "id": 800,
    "name": "ネクロズマ",
    "nameEn": "Necrozma",
    "types": ["psychic"],
    "baseStats": {
      "hp": 97,
      "attack": 107,
      "defense": 101,
      "specialAttack": 127,
      "specialDefense": 89,
      "speed": 79
    },
    "abilities": ["Prism Armor"],
    "height": 2.4,
    "weight": 230
  },
  {
    "id": 801,
    "name": "マギアナ",
    "nameEn": "Magearna",
    "types": ["steel", "fairy"],
    "baseStats": {
      "hp": 80,
      "attack": 95,
      "defense": 115,
      "specialAttack": 130,
      "specialDefense": 115,
      "speed": 65
    },
    "abilities": ["Soul-Heart"],
    "height": 1,
    "weight": 80.5
  },
  {
    "id": 802,
    "name": "マーシャドー",
    "nameEn": "Marshadow",
    "types": ["fighting", "ghost"],
    "baseStats": {
      "hp": 90,
      "attack": 125,
      "defense": 80,
      "specialAttack": 90,
      "specialDefense": 90,
      "speed": 125
    },
    "abilities": ["Technician"],
    "height": 0.7,
    "weight": 22.2
  },
  {
    "id": 803,
    "name": "ベベノム",
    "nameEn": "Poipole",
    "types": ["poison"],
    "baseStats": {
      "hp": 67,
      "attack": 73,
      "defense": 67,
      "specialAttack": 73,
      "specialDefense": 67,
      "speed": 73
    },
    "abilities": ["Beast Boost"],
    "height": 0.6,
    "weight": 1.8
  },
  {
    "id": 804,
    "name": "アーゴヨン",
    "nameEn": "Naganadel",
    "types": ["poison", "dragon"],
    "baseStats": {
      "hp": 73,
      "attack": 73,
      "defense": 73,
      "specialAttack": 127,
      "specialDefense": 73,
      "speed": 121
    },
    "abilities": ["Beast Boost"],
    "height": 3.6,
    "weight": 150
  },
  {
    "id": 805,
    "name": "ツンデツンデ",
    "nameEn": "Stakataka",
    "types": ["rock", "steel"],
    "baseStats": {
      "hp": 61,
      "attack": 131,
      "defense": 211,
      "specialAttack": 53,
      "specialDefense": 101,
      "speed": 13
    },
    "abilities": ["Beast Boost"],
    "height": 5.5,
    "weight": 820
  },
  {
    "id": 806,
    "name": "ズガドーン",
    "nameEn": "Blacephalon",
    "types": ["fire", "ghost"],
    "baseStats": {
      "hp": 53,
      "attack": 127,
      "defense": 53,
      "specialAttack": 151,
      "specialDefense": 79,
      "speed": 107
    },
    "abilities": ["Beast Boost"],
    "height": 1.8,
    "weight": 13
  },
  {
    "id": 807,
    "name": "ゼラオラ",
    "nameEn": "Zeraora",
    "types": ["electric"],
    "baseStats": {
      "hp": 88,
      "attack": 112,
      "defense": 75,
      "specialAttack": 102,
      "specialDefense": 80,
      "speed": 143
    },
    "abilities": ["Volt Absorb"],
    "height": 1.5,
    "weight": 44.5
  },
  {
    "id": 808,
    "name": "メルタン",
    "nameEn": "Meltan",
    "types": ["steel"],
    "baseStats": {
      "hp": 46,
      "attack": 65,
      "defense": 65,
      "specialAttack": 55,
      "specialDefense": 35,
      "speed": 34
    },
    "abilities": ["Magnet Pull"],
    "height": 0.2,
    "weight": 8
  },
  {
    "id": 809,
    "name": "メルメタル",
    "nameEn": "Melmetal",
    "types": ["steel"],
    "baseStats": {
      "hp": 135,
      "attack": 143,
      "defense": 143,
      "specialAttack": 80,
      "specialDefense": 65,
      "speed": 34
    },
    "abilities": ["Iron Fist"],
    "height": 2.5,
    "weight": 800
  },
  {
    "id": 810,
    "name": "サルノリ",
    "nameEn": "Grookey",
    "types": ["grass"],
    "baseStats": {
      "hp": 50,
      "attack": 65,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 65
    },
    "abilities": ["Overgrow", "Grassy Surge"],
    "height": 0.3,
    "weight": 5
  },
  {
    "id": 811,
    "name": "バチンキー",
    "nameEn": "Thwackey",
    "types": ["grass"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 70,
      "specialAttack": 55,
      "specialDefense": 60,
      "speed": 80
    },
    "abilities": ["Overgrow", "Grassy Surge"],
    "height": 0.7,
    "weight": 14
  },
  {
    "id": 812,
    "name": "ゴリランダー",
    "nameEn": "Rillaboom",
    "types": ["grass"],
    "baseStats": {
      "hp": 100,
      "attack": 125,
      "defense": 90,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 85
    },
    "abilities": ["Overgrow", "Grassy Surge"],
    "height": 2.1,
    "weight": 90
  },
  {
    "id": 813,
    "name": "ヒバニー",
    "nameEn": "Scorbunny",
    "types": ["fire"],
    "baseStats": {
      "hp": 50,
      "attack": 71,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 69
    },
    "abilities": ["Blaze", "Libero"],
    "height": 0.3,
    "weight": 4.5
  },
  {
    "id": 814,
    "name": "ラビフット",
    "nameEn": "Raboot",
    "types": ["fire"],
    "baseStats": {
      "hp": 65,
      "attack": 86,
      "defense": 60,
      "specialAttack": 55,
      "specialDefense": 60,
      "speed": 94
    },
    "abilities": ["Blaze", "Libero"],
    "height": 0.6,
    "weight": 9
  },
  {
    "id": 815,
    "name": "エースバーン",
    "nameEn": "Cinderace",
    "types": ["fire"],
    "baseStats": {
      "hp": 80,
      "attack": 116,
      "defense": 75,
      "specialAttack": 65,
      "specialDefense": 75,
      "speed": 119
    },
    "abilities": ["Blaze", "Libero"],
    "height": 1.4,
    "weight": 33
  },
  {
    "id": 816,
    "name": "メッソン",
    "nameEn": "Sobble",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 40,
      "defense": 40,
      "specialAttack": 70,
      "specialDefense": 40,
      "speed": 70
    },
    "abilities": ["Torrent", "Sniper"],
    "height": 0.3,
    "weight": 4
  },
  {
    "id": 817,
    "name": "ジメレオン",
    "nameEn": "Drizzile",
    "types": ["water"],
    "baseStats": {
      "hp": 65,
      "attack": 60,
      "defense": 55,
      "specialAttack": 95,
      "specialDefense": 55,
      "speed": 90
    },
    "abilities": ["Torrent", "Sniper"],
    "height": 0.7,
    "weight": 11.5
  },
  {
    "id": 818,
    "name": "インテレオン",
    "nameEn": "Inteleon",
    "types": ["water"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 65,
      "specialAttack": 125,
      "specialDefense": 65,
      "speed": 120
    },
    "abilities": ["Torrent", "Sniper"],
    "height": 1.9,
    "weight": 45.2
  },
  {
    "id": 819,
    "name": "ホシガリス",
    "nameEn": "Skwovet",
    "types": ["normal"],
    "baseStats": {
      "hp": 70,
      "attack": 55,
      "defense": 55,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 25
    },
    "abilities": ["Cheek Pouch", "Gluttony"],
    "height": 0.3,
    "weight": 2.5
  },
  {
    "id": 820,
    "name": "ヨクバリス",
    "nameEn": "Greedent",
    "types": ["normal"],
    "baseStats": {
      "hp": 120,
      "attack": 95,
      "defense": 95,
      "specialAttack": 55,
      "specialDefense": 75,
      "speed": 20
    },
    "abilities": ["Cheek Pouch", "Gluttony"],
    "height": 0.6,
    "weight": 6
  },
  {
    "id": 821,
    "name": "ココガラ",
    "nameEn": "Rookidee",
    "types": ["flying"],
    "baseStats": {
      "hp": 38,
      "attack": 47,
      "defense": 35,
      "specialAttack": 33,
      "specialDefense": 35,
      "speed": 57
    },
    "abilities": ["Keen Eye", "Unnerve", "Big Pecks"],
    "height": 0.2,
    "weight": 1.8
  },
  {
    "id": 822,
    "name": "アオガラス",
    "nameEn": "Corvisquire",
    "types": ["flying"],
    "baseStats": {
      "hp": 68,
      "attack": 67,
      "defense": 55,
      "specialAttack": 43,
      "specialDefense": 55,
      "speed": 77
    },
    "abilities": ["Keen Eye", "Unnerve", "Big Pecks"],
    "height": 0.8,
    "weight": 16
  },
  {
    "id": 823,
    "name": "アーマーガア",
    "nameEn": "Corviknight",
    "types": ["flying", "steel"],
    "baseStats": {
      "hp": 98,
      "attack": 87,
      "defense": 105,
      "specialAttack": 53,
      "specialDefense": 85,
      "speed": 67
    },
    "abilities": ["Pressure", "Unnerve", "Mirror Armor"],
    "height": 2.2,
    "weight": 75
  },
  {
    "id": 824,
    "name": "サッチムシ",
    "nameEn": "Blipbug",
    "types": ["bug"],
    "baseStats": {
      "hp": 25,
      "attack": 20,
      "defense": 20,
      "specialAttack": 25,
      "specialDefense": 45,
      "speed": 45
    },
    "abilities": ["Swarm", "Compound Eyes", "Telepathy"],
    "height": 0.4,
    "weight": 8
  },
  {
    "id": 825,
    "name": "レドームシ",
    "nameEn": "Dottler",
    "types": ["bug", "psychic"],
    "baseStats": {
      "hp": 50,
      "attack": 35,
      "defense": 80,
      "specialAttack": 50,
      "specialDefense": 90,
      "speed": 30
    },
    "abilities": ["Swarm", "Compound Eyes", "Telepathy"],
    "height": 0.4,
    "weight": 19.5
  },
  {
    "id": 826,
    "name": "イオルブ",
    "nameEn": "Orbeetle",
    "types": ["bug", "psychic"],
    "baseStats": {
      "hp": 60,
      "attack": 45,
      "defense": 110,
      "specialAttack": 80,
      "specialDefense": 120,
      "speed": 90
    },
    "abilities": ["Swarm", "Frisk", "Telepathy"],
    "height": 0.4,
    "weight": 40.8
  },
  {
    "id": 827,
    "name": "クスネ",
    "nameEn": "Nickit",
    "types": ["dark"],
    "baseStats": {
      "hp": 40,
      "attack": 28,
      "defense": 28,
      "specialAttack": 47,
      "specialDefense": 52,
      "speed": 50
    },
    "abilities": ["Run Away", "Unburden", "Stakeout"],
    "height": 0.6,
    "weight": 8.9
  },
  {
    "id": 828,
    "name": "フォクスライ",
    "nameEn": "Thievul",
    "types": ["dark"],
    "baseStats": {
      "hp": 70,
      "attack": 58,
      "defense": 58,
      "specialAttack": 87,
      "specialDefense": 92,
      "speed": 90
    },
    "abilities": ["Run Away", "Unburden", "Stakeout"],
    "height": 1.2,
    "weight": 19.9
  },
  {
    "id": 829,
    "name": "ヒメンカ",
    "nameEn": "Gossifleur",
    "types": ["grass"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 60,
      "speed": 10
    },
    "abilities": ["Cotton Down", "Regenerator", "Effect Spore"],
    "height": 0.4,
    "weight": 2.2
  },
  {
    "id": 830,
    "name": "ワタシラガ",
    "nameEn": "Eldegoss",
    "types": ["grass"],
    "baseStats": {
      "hp": 60,
      "attack": 50,
      "defense": 90,
      "specialAttack": 80,
      "specialDefense": 120,
      "speed": 60
    },
    "abilities": ["Cotton Down", "Regenerator", "Effect Spore"],
    "height": 0.5,
    "weight": 2.5
  },
  {
    "id": 831,
    "name": "ウールー",
    "nameEn": "Wooloo",
    "types": ["normal"],
    "baseStats": {
      "hp": 42,
      "attack": 40,
      "defense": 55,
      "specialAttack": 40,
      "specialDefense": 45,
      "speed": 48
    },
    "abilities": ["Fluffy", "Run Away", "Bulletproof"],
    "height": 0.6,
    "weight": 6
  },
  {
    "id": 832,
    "name": "バイウールー",
    "nameEn": "Dubwool",
    "types": ["normal"],
    "baseStats": {
      "hp": 72,
      "attack": 80,
      "defense": 100,
      "specialAttack": 60,
      "specialDefense": 90,
      "speed": 88
    },
    "abilities": ["Fluffy", "Steadfast", "Bulletproof"],
    "height": 1.3,
    "weight": 43
  },
  {
    "id": 833,
    "name": "カムカメ",
    "nameEn": "Chewtle",
    "types": ["water"],
    "baseStats": {
      "hp": 50,
      "attack": 64,
      "defense": 50,
      "specialAttack": 38,
      "specialDefense": 38,
      "speed": 44
    },
    "abilities": ["Strong Jaw", "Shell Armor", "Swift Swim"],
    "height": 0.3,
    "weight": 8.5
  },
  {
    "id": 834,
    "name": "カジリガメ",
    "nameEn": "Drednaw",
    "types": ["water", "rock"],
    "baseStats": {
      "hp": 90,
      "attack": 115,
      "defense": 90,
      "specialAttack": 48,
      "specialDefense": 68,
      "speed": 74
    },
    "abilities": ["Strong Jaw", "Shell Armor", "Swift Swim"],
    "height": 1,
    "weight": 115.5
  },
  {
    "id": 835,
    "name": "ワンパチ",
    "nameEn": "Yamper",
    "types": ["electric"],
    "baseStats": {
      "hp": 59,
      "attack": 45,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 26
    },
    "abilities": ["Ball Fetch", "Rattled"],
    "height": 0.3,
    "weight": 13.5
  },
  {
    "id": 836,
    "name": "パルスワン",
    "nameEn": "Boltund",
    "types": ["electric"],
    "baseStats": {
      "hp": 69,
      "attack": 90,
      "defense": 60,
      "specialAttack": 90,
      "specialDefense": 60,
      "speed": 121
    },
    "abilities": ["Strong Jaw", "Competitive"],
    "height": 1,
    "weight": 34
  },
  {
    "id": 837,
    "name": "タンドン",
    "nameEn": "Rolycoly",
    "types": ["rock"],
    "baseStats": {
      "hp": 30,
      "attack": 40,
      "defense": 50,
      "specialAttack": 40,
      "specialDefense": 50,
      "speed": 30
    },
    "abilities": ["Steam Engine", "Heatproof", "Flash Fire"],
    "height": 0.3,
    "weight": 12
  },
  {
    "id": 838,
    "name": "トロッゴン",
    "nameEn": "Carkol",
    "types": ["rock", "fire"],
    "baseStats": {
      "hp": 80,
      "attack": 60,
      "defense": 90,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 50
    },
    "abilities": ["Steam Engine", "Flame Body", "Flash Fire"],
    "height": 1.1,
    "weight": 78
  },
  {
    "id": 839,
    "name": "セキタンザン",
    "nameEn": "Coalossal",
    "types": ["rock", "fire"],
    "baseStats": {
      "hp": 110,
      "attack": 80,
      "defense": 120,
      "specialAttack": 80,
      "specialDefense": 90,
      "speed": 30
    },
    "abilities": ["Steam Engine", "Flame Body", "Flash Fire"],
    "height": 2.8,
    "weight": 310.5
  },
  {
    "id": 840,
    "name": "カジッチュ",
    "nameEn": "Applin",
    "types": ["grass", "dragon"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 80,
      "specialAttack": 40,
      "specialDefense": 40,
      "speed": 20
    },
    "abilities": ["Ripen", "Gluttony", "Bulletproof"],
    "height": 0.2,
    "weight": 0.5
  },
  {
    "id": 841,
    "name": "アップリュー",
    "nameEn": "Flapple",
    "types": ["grass", "dragon"],
    "baseStats": {
      "hp": 70,
      "attack": 110,
      "defense": 80,
      "specialAttack": 95,
      "specialDefense": 60,
      "speed": 70
    },
    "abilities": ["Ripen", "Gluttony", "Hustle"],
    "height": 0.3,
    "weight": 1
  },
  {
    "id": 842,
    "name": "タルップル",
    "nameEn": "Appletun",
    "types": ["grass", "dragon"],
    "baseStats": {
      "hp": 110,
      "attack": 85,
      "defense": 80,
      "specialAttack": 100,
      "specialDefense": 80,
      "speed": 30
    },
    "abilities": ["Ripen", "Gluttony", "Thick Fat"],
    "height": 0.4,
    "weight": 13
  },
  {
    "id": 843,
    "name": "スナヘビ",
    "nameEn": "Silicobra",
    "types": ["ground"],
    "baseStats": {
      "hp": 52,
      "attack": 57,
      "defense": 75,
      "specialAttack": 35,
      "specialDefense": 50,
      "speed": 46
    },
    "abilities": ["Sand Spit", "Shed Skin", "Sand Veil"],
    "height": 2.2,
    "weight": 7.6
  },
  {
    "id": 844,
    "name": "サダイジャ",
    "nameEn": "Sandaconda",
    "types": ["ground"],
    "baseStats": {
      "hp": 72,
      "attack": 107,
      "defense": 125,
      "specialAttack": 65,
      "specialDefense": 70,
      "speed": 71
    },
    "abilities": ["Sand Spit", "Shed Skin", "Sand Veil"],
    "height": 3.8,
    "weight": 65.5
  },
  {
    "id": 845,
    "name": "ウッウ",
    "nameEn": "Cramorant",
    "types": ["flying", "water"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 55,
      "specialAttack": 85,
      "specialDefense": 95,
      "speed": 85
    },
    "abilities": ["Gulp Missile"],
    "height": 0.8,
    "weight": 18
  },
  {
    "id": 846,
    "name": "サシカマス",
    "nameEn": "Arrokuda",
    "types": ["water"],
    "baseStats": {
      "hp": 41,
      "attack": 63,
      "defense": 40,
      "specialAttack": 40,
      "specialDefense": 30,
      "speed": 66
    },
    "abilities": ["Swift Swim", "Propeller Tail"],
    "height": 0.5,
    "weight": 1
  },
  {
    "id": 847,
    "name": "カマスジョー",
    "nameEn": "Barraskewda",
    "types": ["water"],
    "baseStats": {
      "hp": 61,
      "attack": 123,
      "defense": 60,
      "specialAttack": 60,
      "specialDefense": 50,
      "speed": 136
    },
    "abilities": ["Swift Swim", "Propeller Tail"],
    "height": 1.3,
    "weight": 30
  },
  {
    "id": 848,
    "name": "エレズン",
    "nameEn": "Toxel",
    "types": ["electric", "poison"],
    "baseStats": {
      "hp": 40,
      "attack": 38,
      "defense": 35,
      "specialAttack": 54,
      "specialDefense": 35,
      "speed": 40
    },
    "abilities": ["Rattled", "Static", "Klutz"],
    "height": 0.4,
    "weight": 11
  },
  {
    "id": 849,
    "name": "ストリンダー (ハイなすがた)",
    "nameEn": "Toxtricity",
    "types": ["electric", "poison"],
    "baseStats": {
      "hp": 75,
      "attack": 98,
      "defense": 70,
      "specialAttack": 114,
      "specialDefense": 70,
      "speed": 75
    },
    "abilities": ["Punk Rock", "Plus", "Technician"],
    "height": 1.6,
    "weight": 40
  },
  {
    "id": 850,
    "name": "ヤクデ",
    "nameEn": "Sizzlipede",
    "types": ["fire", "bug"],
    "baseStats": {
      "hp": 50,
      "attack": 65,
      "defense": 45,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 45
    },
    "abilities": ["Flash Fire", "White Smoke", "Flame Body"],
    "height": 0.7,
    "weight": 1
  },
  {
    "id": 851,
    "name": "マルヤクデ",
    "nameEn": "Centiskorch",
    "types": ["fire", "bug"],
    "baseStats": {
      "hp": 100,
      "attack": 115,
      "defense": 65,
      "specialAttack": 90,
      "specialDefense": 90,
      "speed": 65
    },
    "abilities": ["Flash Fire", "White Smoke", "Flame Body"],
    "height": 3,
    "weight": 120
  },
  {
    "id": 852,
    "name": "タタッコ",
    "nameEn": "Clobbopus",
    "types": ["fighting"],
    "baseStats": {
      "hp": 50,
      "attack": 68,
      "defense": 60,
      "specialAttack": 50,
      "specialDefense": 50,
      "speed": 32
    },
    "abilities": ["Limber", "Technician"],
    "height": 0.6,
    "weight": 4
  },
  {
    "id": 853,
    "name": "オトスパス",
    "nameEn": "Grapploct",
    "types": ["fighting"],
    "baseStats": {
      "hp": 80,
      "attack": 118,
      "defense": 90,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 42
    },
    "abilities": ["Limber", "Technician"],
    "height": 1.6,
    "weight": 39
  },
  {
    "id": 854,
    "name": "ヤバチャ (がんさくフォルム)",
    "nameEn": "Sinistea",
    "types": ["ghost"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 45,
      "specialAttack": 74,
      "specialDefense": 54,
      "speed": 50
    },
    "abilities": ["Weak Armor", "Cursed Body"],
    "height": 0.1,
    "weight": 0.2
  },
  {
    "id": 855,
    "name": "ポットデス (がんさくフォルム)",
    "nameEn": "Polteageist",
    "types": ["ghost"],
    "baseStats": {
      "hp": 60,
      "attack": 65,
      "defense": 65,
      "specialAttack": 134,
      "specialDefense": 114,
      "speed": 70
    },
    "abilities": ["Weak Armor", "Cursed Body"],
    "height": 0.2,
    "weight": 0.4
  },
  {
    "id": 856,
    "name": "ミブリム",
    "nameEn": "Hatenna",
    "types": ["psychic"],
    "baseStats": {
      "hp": 42,
      "attack": 30,
      "defense": 45,
      "specialAttack": 56,
      "specialDefense": 53,
      "speed": 39
    },
    "abilities": ["Healer", "Anticipation", "Magic Bounce"],
    "height": 0.4,
    "weight": 3.4
  },
  {
    "id": 857,
    "name": "テブリム",
    "nameEn": "Hattrem",
    "types": ["psychic"],
    "baseStats": {
      "hp": 57,
      "attack": 40,
      "defense": 65,
      "specialAttack": 86,
      "specialDefense": 73,
      "speed": 49
    },
    "abilities": ["Healer", "Anticipation", "Magic Bounce"],
    "height": 0.6,
    "weight": 4.8
  },
  {
    "id": 858,
    "name": "ブリムオン",
    "nameEn": "Hatterene",
    "types": ["psychic", "fairy"],
    "baseStats": {
      "hp": 57,
      "attack": 90,
      "defense": 95,
      "specialAttack": 136,
      "specialDefense": 103,
      "speed": 29
    },
    "abilities": ["Healer", "Anticipation", "Magic Bounce"],
    "height": 2.1,
    "weight": 5.1
  },
  {
    "id": 859,
    "name": "ベロバー",
    "nameEn": "Impidimp",
    "types": ["dark", "fairy"],
    "baseStats": {
      "hp": 45,
      "attack": 45,
      "defense": 30,
      "specialAttack": 55,
      "specialDefense": 40,
      "speed": 50
    },
    "abilities": ["Prankster", "Frisk", "Pickpocket"],
    "height": 0.4,
    "weight": 5.5
  },
  {
    "id": 860,
    "name": "ギモー",
    "nameEn": "Morgrem",
    "types": ["dark", "fairy"],
    "baseStats": {
      "hp": 65,
      "attack": 60,
      "defense": 45,
      "specialAttack": 75,
      "specialDefense": 55,
      "speed": 70
    },
    "abilities": ["Prankster", "Frisk", "Pickpocket"],
    "height": 0.8,
    "weight": 12.5
  },
  {
    "id": 861,
    "name": "オーロンゲ",
    "nameEn": "Grimmsnarl",
    "types": ["dark", "fairy"],
    "baseStats": {
      "hp": 95,
      "attack": 120,
      "defense": 65,
      "specialAttack": 95,
      "specialDefense": 75,
      "speed": 60
    },
    "abilities": ["Prankster", "Frisk", "Pickpocket"],
    "height": 1.5,
    "weight": 61
  },
  {
    "id": 862,
    "name": "タチフサグマ",
    "nameEn": "Obstagoon",
    "types": ["dark", "normal"],
    "baseStats": {
      "hp": 93,
      "attack": 90,
      "defense": 101,
      "specialAttack": 60,
      "specialDefense": 81,
      "speed": 95
    },
    "abilities": ["Reckless", "Guts", "Defiant"],
    "height": 1.6,
    "weight": 46
  },
  {
    "id": 863,
    "name": "ニャイキング",
    "nameEn": "Perrserker",
    "types": ["steel"],
    "baseStats": {
      "hp": 70,
      "attack": 110,
      "defense": 100,
      "specialAttack": 50,
      "specialDefense": 60,
      "speed": 50
    },
    "abilities": ["Battle Armor", "Tough Claws", "Steely Spirit"],
    "height": 0.8,
    "weight": 28
  },
  {
    "id": 864,
    "name": "サニゴーン",
    "nameEn": "Cursola",
    "types": ["ghost"],
    "baseStats": {
      "hp": 60,
      "attack": 95,
      "defense": 50,
      "specialAttack": 145,
      "specialDefense": 130,
      "speed": 30
    },
    "abilities": ["Weak Armor", "Perish Body"],
    "height": 1,
    "weight": 0.4
  },
  {
    "id": 865,
    "name": "ネギガナイト",
    "nameEn": "Sirfetch’d",
    "types": ["fighting"],
    "baseStats": {
      "hp": 62,
      "attack": 135,
      "defense": 95,
      "specialAttack": 68,
      "specialDefense": 82,
      "speed": 65
    },
    "abilities": ["Steadfast", "Scrappy"],
    "height": 0.8,
    "weight": 117
  },
  {
    "id": 866,
    "name": "バリコオル",
    "nameEn": "Mr. Rime",
    "types": ["ice", "psychic"],
    "baseStats": {
      "hp": 80,
      "attack": 85,
      "defense": 75,
      "specialAttack": 110,
      "specialDefense": 100,
      "speed": 70
    },
    "abilities": ["Tangled Feet", "Screen Cleaner", "Ice Body"],
    "height": 1.5,
    "weight": 58.2
  },
  {
    "id": 867,
    "name": "デスバーン",
    "nameEn": "Runerigus",
    "types": ["ground", "ghost"],
    "baseStats": {
      "hp": 58,
      "attack": 95,
      "defense": 145,
      "specialAttack": 50,
      "specialDefense": 105,
      "speed": 30
    },
    "abilities": ["Wandering Spirit"],
    "height": 1.6,
    "weight": 66.6
  },
  {
    "id": 868,
    "name": "マホミル",
    "nameEn": "Milcery",
    "types": ["fairy"],
    "baseStats": {
      "hp": 45,
      "attack": 40,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 61,
      "speed": 34
    },
    "abilities": ["Sweet Veil", "Aroma Veil"],
    "height": 0.2,
    "weight": 0.3
  },
  {
    "id": 869,
    "name": "マホイップ (ミルキィバニラ)",
    "nameEn": "Alcremie",
    "types": ["fairy"],
    "baseStats": {
      "hp": 65,
      "attack": 60,
      "defense": 75,
      "specialAttack": 110,
      "specialDefense": 121,
      "speed": 64
    },
    "abilities": ["Sweet Veil", "Aroma Veil"],
    "height": 0.3,
    "weight": 0.5
  },
  {
    "id": 870,
    "name": "タイレーツ",
    "nameEn": "Falinks",
    "types": ["fighting"],
    "baseStats": {
      "hp": 65,
      "attack": 100,
      "defense": 100,
      "specialAttack": 70,
      "specialDefense": 60,
      "speed": 75
    },
    "abilities": ["Battle Armor", "Defiant"],
    "height": 3,
    "weight": 62
  },
  {
    "id": 871,
    "name": "バチンウニ",
    "nameEn": "Pincurchin",
    "types": ["electric"],
    "baseStats": {
      "hp": 48,
      "attack": 101,
      "defense": 95,
      "specialAttack": 91,
      "specialDefense": 85,
      "speed": 15
    },
    "abilities": ["Lightning Rod", "Electric Surge"],
    "height": 0.3,
    "weight": 1
  },
  {
    "id": 872,
    "name": "ユキハミ",
    "nameEn": "Snom",
    "types": ["ice", "bug"],
    "baseStats": {
      "hp": 30,
      "attack": 25,
      "defense": 35,
      "specialAttack": 45,
      "specialDefense": 30,
      "speed": 20
    },
    "abilities": ["Shield Dust", "Ice Scales"],
    "height": 0.3,
    "weight": 3.8
  },
  {
    "id": 873,
    "name": "モスノウ",
    "nameEn": "Frosmoth",
    "types": ["ice", "bug"],
    "baseStats": {
      "hp": 70,
      "attack": 65,
      "defense": 60,
      "specialAttack": 125,
      "specialDefense": 90,
      "speed": 65
    },
    "abilities": ["Shield Dust", "Ice Scales"],
    "height": 1.3,
    "weight": 42
  },
  {
    "id": 874,
    "name": "イシヘンジン",
    "nameEn": "Stonjourner",
    "types": ["rock"],
    "baseStats": {
      "hp": 100,
      "attack": 125,
      "defense": 135,
      "specialAttack": 20,
      "specialDefense": 20,
      "speed": 70
    },
    "abilities": ["Power Spot"],
    "height": 2.5,
    "weight": 520
  },
  {
    "id": 875,
    "name": "コオリッポ (アイスフェイス)",
    "nameEn": "Eiscue",
    "types": ["ice"],
    "baseStats": {
      "hp": 75,
      "attack": 80,
      "defense": 110,
      "specialAttack": 65,
      "specialDefense": 90,
      "speed": 50
    },
    "abilities": ["Ice Face"],
    "height": 1.4,
    "weight": 89
  },
  {
    "id": 876,
    "name": "イエッサン (オスのすがた)",
    "nameEn": "Indeedee",
    "types": ["psychic", "normal"],
    "baseStats": {
      "hp": 60,
      "attack": 65,
      "defense": 55,
      "specialAttack": 105,
      "specialDefense": 95,
      "speed": 95
    },
    "abilities": ["Inner Focus", "Synchronize", "Psychic Surge"],
    "height": 0.9,
    "weight": 28
  },
  {
    "id": 877,
    "name": "モルペコ (まんぷくもよう)",
    "nameEn": "Morpeko",
    "types": ["electric", "dark"],
    "baseStats": {
      "hp": 58,
      "attack": 95,
      "defense": 58,
      "specialAttack": 70,
      "specialDefense": 58,
      "speed": 97
    },
    "abilities": ["Hunger Switch"],
    "height": 0.3,
    "weight": 3
  },
  {
    "id": 878,
    "name": "ゾウドウ",
    "nameEn": "Cufant",
    "types": ["steel"],
    "baseStats": {
      "hp": 72,
      "attack": 80,
      "defense": 49,
      "specialAttack": 40,
      "specialDefense": 49,
      "speed": 40
    },
    "abilities": ["Sheer Force", "Heavy Metal"],
    "height": 1.2,
    "weight": 100
  },
  {
    "id": 879,
    "name": "ダイオウドウ",
    "nameEn": "Copperajah",
    "types": ["steel"],
    "baseStats": {
      "hp": 122,
      "attack": 130,
      "defense": 69,
      "specialAttack": 80,
      "specialDefense": 69,
      "speed": 30
    },
    "abilities": ["Sheer Force", "Heavy Metal"],
    "height": 3,
    "weight": 650
  },
  {
    "id": 880,
    "name": "パッチラゴン",
    "nameEn": "Dracozolt",
    "types": ["electric", "dragon"],
    "baseStats": {
      "hp": 90,
      "attack": 100,
      "defense": 90,
      "specialAttack": 80,
      "specialDefense": 70,
      "speed": 75
    },
    "abilities": ["Volt Absorb", "Hustle", "Sand Rush"],
    "height": 1.8,
    "weight": 190
  },
  {
    "id": 881,
    "name": "パッチルドン",
    "nameEn": "Arctozolt",
    "types": ["electric", "ice"],
    "baseStats": {
      "hp": 90,
      "attack": 100,
      "defense": 90,
      "specialAttack": 90,
      "specialDefense": 80,
      "speed": 55
    },
    "abilities": ["Volt Absorb", "Static", "Slush Rush"],
    "height": 2.3,
    "weight": 150
  },
  {
    "id": 882,
    "name": "ウオノラゴン",
    "nameEn": "Dracovish",
    "types": ["water", "dragon"],
    "baseStats": {
      "hp": 90,
      "attack": 90,
      "defense": 100,
      "specialAttack": 70,
      "specialDefense": 80,
      "speed": 75
    },
    "abilities": ["Water Absorb", "Strong Jaw", "Sand Rush"],
    "height": 2.3,
    "weight": 215
  },
  {
    "id": 883,
    "name": "ウオチルドン",
    "nameEn": "Arctovish",
    "types": ["water", "ice"],
    "baseStats": {
      "hp": 90,
      "attack": 90,
      "defense": 100,
      "specialAttack": 80,
      "specialDefense": 90,
      "speed": 55
    },
    "abilities": ["Water Absorb", "Ice Body", "Slush Rush"],
    "height": 2,
    "weight": 175
  },
  {
    "id": 884,
    "name": "ジュラルドン",
    "nameEn": "Duraludon",
    "types": ["steel", "dragon"],
    "baseStats": {
      "hp": 70,
      "attack": 95,
      "defense": 115,
      "specialAttack": 120,
      "specialDefense": 50,
      "speed": 85
    },
    "abilities": ["Light Metal", "Heavy Metal", "Stalwart"],
    "height": 1.8,
    "weight": 40
  },
  {
    "id": 885,
    "name": "ドラメシヤ",
    "nameEn": "Dreepy",
    "types": ["dragon", "ghost"],
    "baseStats": {
      "hp": 28,
      "attack": 60,
      "defense": 30,
      "specialAttack": 40,
      "specialDefense": 30,
      "speed": 82
    },
    "abilities": ["Clear Body", "Infiltrator", "Cursed Body"],
    "height": 0.5,
    "weight": 2
  },
  {
    "id": 886,
    "name": "ドロンチ",
    "nameEn": "Drakloak",
    "types": ["dragon", "ghost"],
    "baseStats": {
      "hp": 68,
      "attack": 80,
      "defense": 50,
      "specialAttack": 60,
      "specialDefense": 50,
      "speed": 102
    },
    "abilities": ["Clear Body", "Infiltrator", "Cursed Body"],
    "height": 1.4,
    "weight": 11
  },
  {
    "id": 887,
    "name": "ドラパルト",
    "nameEn": "Dragapult",
    "types": ["dragon", "ghost"],
    "baseStats": {
      "hp": 88,
      "attack": 120,
      "defense": 75,
      "specialAttack": 100,
      "specialDefense": 75,
      "speed": 142
    },
    "abilities": ["Clear Body", "Infiltrator", "Cursed Body"],
    "height": 3,
    "weight": 50
  },
  {
    "id": 888,
    "name": "ザシアン (れきせんのゆうしゃ)",
    "nameEn": "Zacian",
    "types": ["fairy"],
    "baseStats": {
      "hp": 92,
      "attack": 120,
      "defense": 115,
      "specialAttack": 80,
      "specialDefense": 115,
      "speed": 138
    },
    "abilities": ["Intrepid Sword"],
    "height": 2.8,
    "weight": 110
  },
  {
    "id": 889,
    "name": "ザマゼンタ (れきせんのゆうしゃ)",
    "nameEn": "Zamazenta",
    "types": ["fighting"],
    "baseStats": {
      "hp": 92,
      "attack": 120,
      "defense": 115,
      "specialAttack": 80,
      "specialDefense": 115,
      "speed": 138
    },
    "abilities": ["Dauntless Shield"],
    "height": 2.9,
    "weight": 210
  },
  {
    "id": 890,
    "name": "ムゲンダイナ",
    "nameEn": "Eternatus",
    "types": ["poison", "dragon"],
    "baseStats": {
      "hp": 140,
      "attack": 85,
      "defense": 95,
      "specialAttack": 145,
      "specialDefense": 95,
      "speed": 130
    },
    "abilities": ["Pressure"],
    "height": 20,
    "weight": 950
  },
  {
    "id": 891,
    "name": "ダクマ",
    "nameEn": "Kubfu",
    "types": ["fighting"],
    "baseStats": {
      "hp": 60,
      "attack": 90,
      "defense": 60,
      "specialAttack": 53,
      "specialDefense": 50,
      "speed": 72
    },
    "abilities": ["Inner Focus"],
    "height": 0.6,
    "weight": 12
  },
  {
    "id": 892,
    "name": "ウーラオス (いちげきのかた)",
    "nameEn": "Urshifu",
    "types": ["fighting", "dark"],
    "baseStats": {
      "hp": 100,
      "attack": 130,
      "defense": 100,
      "specialAttack": 63,
      "specialDefense": 60,
      "speed": 97
    },
    "abilities": ["Unseen Fist"],
    "height": 1.9,
    "weight": 105
  },
  {
    "id": 893,
    "name": "ザルード",
    "nameEn": "Zarude",
    "types": ["dark", "grass"],
    "baseStats": {
      "hp": 105,
      "attack": 120,
      "defense": 105,
      "specialAttack": 70,
      "specialDefense": 95,
      "speed": 105
    },
    "abilities": ["Leaf Guard"],
    "height": 1.8,
    "weight": 70
  },
  {
    "id": 894,
    "name": "レジエレキ",
    "nameEn": "Regieleki",
    "types": ["electric"],
    "baseStats": {
      "hp": 80,
      "attack": 100,
      "defense": 50,
      "specialAttack": 100,
      "specialDefense": 50,
      "speed": 200
    },
    "abilities": ["Transistor"],
    "height": 1.2,
    "weight": 145
  },
  {
    "id": 895,
    "name": "レジドラゴ",
    "nameEn": "Regidrago",
    "types": ["dragon"],
    "baseStats": {
      "hp": 200,
      "attack": 100,
      "defense": 50,
      "specialAttack": 100,
      "specialDefense": 50,
      "speed": 80
    },
    "abilities": ["Dragon's Maw"],
    "height": 2.1,
    "weight": 200
  },
  {
    "id": 896,
    "name": "ブリザポス",
    "nameEn": "Glastrier",
    "types": ["ice"],
    "baseStats": {
      "hp": 100,
      "attack": 145,
      "defense": 130,
      "specialAttack": 65,
      "specialDefense": 110,
      "speed": 30
    },
    "abilities": ["Chilling Neigh"],
    "height": 2.2,
    "weight": 800
  },
  {
    "id": 897,
    "name": "レイスポス",
    "nameEn": "Spectrier",
    "types": ["ghost"],
    "baseStats": {
      "hp": 100,
      "attack": 65,
      "defense": 60,
      "specialAttack": 145,
      "specialDefense": 80,
      "speed": 130
    },
    "abilities": ["Grim Neigh"],
    "height": 2,
    "weight": 44.5
  },
  {
    "id": 898,
    "name": "バドレックス",
    "nameEn": "Calyrex",
    "types": ["psychic", "grass"],
    "baseStats": {
      "hp": 100,
      "attack": 80,
      "defense": 80,
      "specialAttack": 80,
      "specialDefense": 80,
      "speed": 80
    },
    "abilities": ["Unnerve"],
    "height": 1.1,
    "weight": 7.7
  },
  {
    "id": 899,
    "name": "アヤシシ",
    "nameEn": "Wyrdeer",
    "types": ["normal", "psychic"],
    "baseStats": {
      "hp": 103,
      "attack": 105,
      "defense": 72,
      "specialAttack": 105,
      "specialDefense": 75,
      "speed": 65
    },
    "abilities": ["Intimidate", "Frisk", "Sap Sipper"],
    "height": 1.8,
    "weight": 95.1
  },
  {
    "id": 900,
    "name": "バサギリ",
    "nameEn": "Kleavor",
    "types": ["bug", "rock"],
    "baseStats": {
      "hp": 70,
      "attack": 135,
      "defense": 95,
      "specialAttack": 45,
      "specialDefense": 70,
      "speed": 85
    },
    "abilities": ["Swarm", "Sheer Force", "Sharpness"],
    "height": 1.8,
    "weight": 89
  },
  {
    "id": 901,
    "name": "ガチグマ",
    "nameEn": "Ursaluna",
    "types": ["ground", "normal"],
    "baseStats": {
      "hp": 130,
      "attack": 140,
      "defense": 105,
      "specialAttack": 45,
      "specialDefense": 80,
      "speed": 50
    },
    "abilities": ["Guts", "Bulletproof", "Unnerve"],
    "height": 2.4,
    "weight": 290
  },
  {
    "id": 902,
    "name": "イダイトウ (オスのすがた)",
    "nameEn": "Basculegion",
    "types": ["water", "ghost"],
    "baseStats": {
      "hp": 120,
      "attack": 112,
      "defense": 65,
      "specialAttack": 80,
      "specialDefense": 75,
      "speed": 78
    },
    "abilities": ["Swift Swim", "Adaptability", "Mold Breaker"],
    "height": 3,
    "weight": 110
  },
  {
    "id": 903,
    "name": "オオニューラ",
    "nameEn": "Sneasler",
    "types": ["fighting", "poison"],
    "baseStats": {
      "hp": 80,
      "attack": 130,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 80,
      "speed": 120
    },
    "abilities": ["Pressure", "Unburden", "Poison Touch"],
    "height": 1.3,
    "weight": 43
  },
  {
    "id": 904,
    "name": "ハリーマン",
    "nameEn": "Overqwil",
    "types": ["dark", "poison"],
    "baseStats": {
      "hp": 85,
      "attack": 115,
      "defense": 95,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 85
    },
    "abilities": ["Poison Point", "Swift Swim", "Intimidate"],
    "height": 2.5,
    "weight": 60.5
  },
  {
    "id": 905,
    "name": "ラブトロス (けしんフォルム)",
    "nameEn": "Enamorus",
    "types": ["fairy", "flying"],
    "baseStats": {
      "hp": 74,
      "attack": 115,
      "defense": 70,
      "specialAttack": 135,
      "specialDefense": 80,
      "speed": 106
    },
    "abilities": ["Cute Charm", "Contrary"],
    "height": 1.6,
    "weight": 48
  },
  {
    "id": 906,
    "name": "ニャオハ",
    "nameEn": "Sprigatito",
    "types": ["grass"],
    "baseStats": {
      "hp": 40,
      "attack": 61,
      "defense": 54,
      "specialAttack": 45,
      "specialDefense": 45,
      "speed": 65
    },
    "abilities": ["Overgrow", "Protean"],
    "height": 0.4,
    "weight": 4.1
  },
  {
    "id": 907,
    "name": "ニャローテ",
    "nameEn": "Floragato",
    "types": ["grass"],
    "baseStats": {
      "hp": 61,
      "attack": 80,
      "defense": 63,
      "specialAttack": 60,
      "specialDefense": 63,
      "speed": 83
    },
    "abilities": ["Overgrow", "Protean"],
    "height": 0.9,
    "weight": 12.2
  },
  {
    "id": 908,
    "name": "マスカーニャ",
    "nameEn": "Meowscarada",
    "types": ["grass", "dark"],
    "baseStats": {
      "hp": 76,
      "attack": 110,
      "defense": 70,
      "specialAttack": 81,
      "specialDefense": 70,
      "speed": 123
    },
    "abilities": ["Overgrow", "Protean"],
    "height": 1.5,
    "weight": 31.2
  },
  {
    "id": 909,
    "name": "ホゲータ",
    "nameEn": "Fuecoco",
    "types": ["fire"],
    "baseStats": {
      "hp": 67,
      "attack": 45,
      "defense": 59,
      "specialAttack": 63,
      "specialDefense": 40,
      "speed": 36
    },
    "abilities": ["Blaze", "Unaware"],
    "height": 0.4,
    "weight": 9.8
  },
  {
    "id": 910,
    "name": "アチゲータ",
    "nameEn": "Crocalor",
    "types": ["fire"],
    "baseStats": {
      "hp": 81,
      "attack": 55,
      "defense": 78,
      "specialAttack": 90,
      "specialDefense": 58,
      "speed": 49
    },
    "abilities": ["Blaze", "Unaware"],
    "height": 1,
    "weight": 30.7
  },
  {
    "id": 911,
    "name": "ラウドボーン",
    "nameEn": "Skeledirge",
    "types": ["fire", "ghost"],
    "baseStats": {
      "hp": 104,
      "attack": 75,
      "defense": 100,
      "specialAttack": 110,
      "specialDefense": 75,
      "speed": 66
    },
    "abilities": ["Blaze", "Unaware"],
    "height": 1.6,
    "weight": 326.5
  },
  {
    "id": 912,
    "name": "クワッス",
    "nameEn": "Quaxly",
    "types": ["water"],
    "baseStats": {
      "hp": 55,
      "attack": 65,
      "defense": 45,
      "specialAttack": 50,
      "specialDefense": 45,
      "speed": 50
    },
    "abilities": ["Torrent", "Moxie"],
    "height": 0.5,
    "weight": 6.1
  },
  {
    "id": 913,
    "name": "ウェルカモ",
    "nameEn": "Quaxwell",
    "types": ["water"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 65,
      "specialAttack": 65,
      "specialDefense": 60,
      "speed": 65
    },
    "abilities": ["Torrent", "Moxie"],
    "height": 1.2,
    "weight": 21.5
  },
  {
    "id": 914,
    "name": "ウェーニバル",
    "nameEn": "Quaquaval",
    "types": ["water", "fighting"],
    "baseStats": {
      "hp": 85,
      "attack": 120,
      "defense": 80,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 85
    },
    "abilities": ["Torrent", "Moxie"],
    "height": 1.8,
    "weight": 61.9
  },
  {
    "id": 915,
    "name": "グルトン",
    "nameEn": "Lechonk",
    "types": ["normal"],
    "baseStats": {
      "hp": 54,
      "attack": 45,
      "defense": 40,
      "specialAttack": 35,
      "specialDefense": 45,
      "speed": 35
    },
    "abilities": ["Aroma Veil", "Gluttony", "Thick Fat"],
    "height": 0.5,
    "weight": 10.2
  },
  {
    "id": 916,
    "name": "パフュートン (オスのすがた)",
    "nameEn": "Oinkologne",
    "types": ["normal"],
    "baseStats": {
      "hp": 110,
      "attack": 100,
      "defense": 75,
      "specialAttack": 59,
      "specialDefense": 80,
      "speed": 65
    },
    "abilities": ["Lingering Aroma", "Gluttony", "Thick Fat"],
    "height": 1,
    "weight": 120
  },
  {
    "id": 917,
    "name": "タマンチュラ",
    "nameEn": "Tarountula",
    "types": ["bug"],
    "baseStats": {
      "hp": 35,
      "attack": 41,
      "defense": 45,
      "specialAttack": 29,
      "specialDefense": 40,
      "speed": 20
    },
    "abilities": ["Insomnia", "Stakeout"],
    "height": 0.3,
    "weight": 4
  },
  {
    "id": 918,
    "name": "ワナイダー",
    "nameEn": "Spidops",
    "types": ["bug"],
    "baseStats": {
      "hp": 60,
      "attack": 79,
      "defense": 92,
      "specialAttack": 52,
      "specialDefense": 86,
      "speed": 35
    },
    "abilities": ["Insomnia", "Stakeout"],
    "height": 1,
    "weight": 16.5
  },
  {
    "id": 919,
    "name": "マメバッタ",
    "nameEn": "Nymble",
    "types": ["bug"],
    "baseStats": {
      "hp": 33,
      "attack": 46,
      "defense": 40,
      "specialAttack": 21,
      "specialDefense": 25,
      "speed": 45
    },
    "abilities": ["Swarm", "Tinted Lens"],
    "height": 0.2,
    "weight": 1
  },
  {
    "id": 920,
    "name": "エクスレッグ",
    "nameEn": "Lokix",
    "types": ["bug", "dark"],
    "baseStats": {
      "hp": 71,
      "attack": 102,
      "defense": 78,
      "specialAttack": 52,
      "specialDefense": 55,
      "speed": 92
    },
    "abilities": ["Swarm", "Tinted Lens"],
    "height": 1,
    "weight": 17.5
  },
  {
    "id": 921,
    "name": "パモ",
    "nameEn": "Pawmi",
    "types": ["electric"],
    "baseStats": {
      "hp": 45,
      "attack": 50,
      "defense": 20,
      "specialAttack": 40,
      "specialDefense": 25,
      "speed": 60
    },
    "abilities": ["Static", "Natural Cure", "Iron Fist"],
    "height": 0.3,
    "weight": 2.5
  },
  {
    "id": 922,
    "name": "パモット",
    "nameEn": "Pawmo",
    "types": ["electric", "fighting"],
    "baseStats": {
      "hp": 60,
      "attack": 75,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 40,
      "speed": 85
    },
    "abilities": ["Volt Absorb", "Natural Cure", "Iron Fist"],
    "height": 0.4,
    "weight": 6.5
  },
  {
    "id": 923,
    "name": "パーモット",
    "nameEn": "Pawmot",
    "types": ["electric", "fighting"],
    "baseStats": {
      "hp": 70,
      "attack": 115,
      "defense": 70,
      "specialAttack": 70,
      "specialDefense": 60,
      "speed": 105
    },
    "abilities": ["Volt Absorb", "Natural Cure", "Iron Fist"],
    "height": 0.9,
    "weight": 41
  },
  {
    "id": 924,
    "name": "ワッカネズミ",
    "nameEn": "Tandemaus",
    "types": ["normal"],
    "baseStats": {
      "hp": 50,
      "attack": 50,
      "defense": 45,
      "specialAttack": 40,
      "specialDefense": 45,
      "speed": 75
    },
    "abilities": ["Run Away", "Pickup", "Own Tempo"],
    "height": 0.3,
    "weight": 1.8
  },
  {
    "id": 925,
    "name": "イッカネズミ (３びきかぞく)",
    "nameEn": "Maushold",
    "types": ["normal"],
    "baseStats": {
      "hp": 74,
      "attack": 75,
      "defense": 70,
      "specialAttack": 65,
      "specialDefense": 75,
      "speed": 111
    },
    "abilities": ["Friend Guard", "Cheek Pouch", "Technician"],
    "height": 0.3,
    "weight": 2.3
  },
  {
    "id": 926,
    "name": "パピモッチ",
    "nameEn": "Fidough",
    "types": ["fairy"],
    "baseStats": {
      "hp": 37,
      "attack": 55,
      "defense": 70,
      "specialAttack": 30,
      "specialDefense": 55,
      "speed": 65
    },
    "abilities": ["Own Tempo", "Klutz"],
    "height": 0.3,
    "weight": 10.9
  },
  {
    "id": 927,
    "name": "バウッツェル",
    "nameEn": "Dachsbun",
    "types": ["fairy"],
    "baseStats": {
      "hp": 57,
      "attack": 80,
      "defense": 115,
      "specialAttack": 50,
      "specialDefense": 80,
      "speed": 95
    },
    "abilities": ["Well-Baked Body", "Aroma Veil"],
    "height": 0.5,
    "weight": 14.9
  },
  {
    "id": 928,
    "name": "ミニーブ",
    "nameEn": "Smoliv",
    "types": ["grass", "normal"],
    "baseStats": {
      "hp": 41,
      "attack": 35,
      "defense": 45,
      "specialAttack": 58,
      "specialDefense": 51,
      "speed": 30
    },
    "abilities": ["Early Bird", "Harvest"],
    "height": 0.3,
    "weight": 6.5
  },
  {
    "id": 929,
    "name": "オリーニョ",
    "nameEn": "Dolliv",
    "types": ["grass", "normal"],
    "baseStats": {
      "hp": 52,
      "attack": 53,
      "defense": 60,
      "specialAttack": 78,
      "specialDefense": 78,
      "speed": 33
    },
    "abilities": ["Early Bird", "Harvest"],
    "height": 0.6,
    "weight": 11.9
  },
  {
    "id": 930,
    "name": "オリーヴァ",
    "nameEn": "Arboliva",
    "types": ["grass", "normal"],
    "baseStats": {
      "hp": 78,
      "attack": 69,
      "defense": 90,
      "specialAttack": 125,
      "specialDefense": 109,
      "speed": 39
    },
    "abilities": ["Seed Sower", "Harvest"],
    "height": 1.4,
    "weight": 48.2
  },
  {
    "id": 931,
    "name": "イキリンコ (グリーンフェザー)",
    "nameEn": "Squawkabilly",
    "types": ["normal", "flying"],
    "baseStats": {
      "hp": 82,
      "attack": 96,
      "defense": 51,
      "specialAttack": 45,
      "specialDefense": 51,
      "speed": 92
    },
    "abilities": ["Intimidate", "Hustle", "Guts"],
    "height": 0.6,
    "weight": 2.4
  },
  {
    "id": 932,
    "name": "コジオ",
    "nameEn": "Nacli",
    "types": ["rock"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 75,
      "specialAttack": 35,
      "specialDefense": 35,
      "speed": 25
    },
    "abilities": ["Purifying Salt", "Sturdy", "Clear Body"],
    "height": 0.4,
    "weight": 16
  },
  {
    "id": 933,
    "name": "ジオヅム",
    "nameEn": "Naclstack",
    "types": ["rock"],
    "baseStats": {
      "hp": 60,
      "attack": 60,
      "defense": 100,
      "specialAttack": 35,
      "specialDefense": 65,
      "speed": 35
    },
    "abilities": ["Purifying Salt", "Sturdy", "Clear Body"],
    "height": 0.6,
    "weight": 105
  },
  {
    "id": 934,
    "name": "キョジオーン",
    "nameEn": "Garganacl",
    "types": ["rock"],
    "baseStats": {
      "hp": 100,
      "attack": 100,
      "defense": 130,
      "specialAttack": 45,
      "specialDefense": 90,
      "speed": 35
    },
    "abilities": ["Purifying Salt", "Sturdy", "Clear Body"],
    "height": 2.3,
    "weight": 240
  },
  {
    "id": 935,
    "name": "カルボウ",
    "nameEn": "Charcadet",
    "types": ["fire"],
    "baseStats": {
      "hp": 40,
      "attack": 50,
      "defense": 40,
      "specialAttack": 50,
      "specialDefense": 40,
      "speed": 35
    },
    "abilities": ["Flash Fire", "Flame Body"],
    "height": 0.6,
    "weight": 10.5
  },
  {
    "id": 936,
    "name": "グレンアルマ",
    "nameEn": "Armarouge",
    "types": ["fire", "psychic"],
    "baseStats": {
      "hp": 85,
      "attack": 60,
      "defense": 100,
      "specialAttack": 125,
      "specialDefense": 80,
      "speed": 75
    },
    "abilities": ["Flash Fire", "Weak Armor"],
    "height": 1.5,
    "weight": 85
  },
  {
    "id": 937,
    "name": "ソウブレイズ",
    "nameEn": "Ceruledge",
    "types": ["fire", "ghost"],
    "baseStats": {
      "hp": 75,
      "attack": 125,
      "defense": 80,
      "specialAttack": 60,
      "specialDefense": 100,
      "speed": 85
    },
    "abilities": ["Flash Fire", "Weak Armor"],
    "height": 1.6,
    "weight": 62
  },
  {
    "id": 938,
    "name": "ズピカ",
    "nameEn": "Tadbulb",
    "types": ["electric"],
    "baseStats": {
      "hp": 61,
      "attack": 31,
      "defense": 41,
      "specialAttack": 59,
      "specialDefense": 35,
      "speed": 45
    },
    "abilities": ["Own Tempo", "Static", "Damp"],
    "height": 0.3,
    "weight": 0.4
  },
  {
    "id": 939,
    "name": "ハラバリー",
    "nameEn": "Bellibolt",
    "types": ["electric"],
    "baseStats": {
      "hp": 109,
      "attack": 64,
      "defense": 91,
      "specialAttack": 103,
      "specialDefense": 83,
      "speed": 45
    },
    "abilities": ["Electromorphosis", "Static", "Damp"],
    "height": 1.2,
    "weight": 113
  },
  {
    "id": 940,
    "name": "カイデン",
    "nameEn": "Wattrel",
    "types": ["electric", "flying"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 35,
      "specialAttack": 55,
      "specialDefense": 40,
      "speed": 70
    },
    "abilities": ["Wind Power", "Volt Absorb", "Competitive"],
    "height": 0.4,
    "weight": 3.6
  },
  {
    "id": 941,
    "name": "タイカイデン",
    "nameEn": "Kilowattrel",
    "types": ["electric", "flying"],
    "baseStats": {
      "hp": 70,
      "attack": 70,
      "defense": 60,
      "specialAttack": 105,
      "specialDefense": 60,
      "speed": 125
    },
    "abilities": ["Wind Power", "Volt Absorb", "Competitive"],
    "height": 1.4,
    "weight": 38.6
  },
  {
    "id": 942,
    "name": "オラチフ",
    "nameEn": "Maschiff",
    "types": ["dark"],
    "baseStats": {
      "hp": 60,
      "attack": 78,
      "defense": 60,
      "specialAttack": 40,
      "specialDefense": 51,
      "speed": 51
    },
    "abilities": ["Intimidate", "Run Away", "Stakeout"],
    "height": 0.5,
    "weight": 16
  },
  {
    "id": 943,
    "name": "マフィティフ",
    "nameEn": "Mabosstiff",
    "types": ["dark"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 90,
      "specialAttack": 60,
      "specialDefense": 70,
      "speed": 85
    },
    "abilities": ["Intimidate", "Guard Dog", "Stakeout"],
    "height": 1.1,
    "weight": 61
  },
  {
    "id": 944,
    "name": "シルシュルー",
    "nameEn": "Shroodle",
    "types": ["poison", "normal"],
    "baseStats": {
      "hp": 40,
      "attack": 65,
      "defense": 35,
      "specialAttack": 40,
      "specialDefense": 35,
      "speed": 75
    },
    "abilities": ["Unburden", "Pickpocket", "Prankster"],
    "height": 0.2,
    "weight": 0.7
  },
  {
    "id": 945,
    "name": "タギングル",
    "nameEn": "Grafaiai",
    "types": ["poison", "normal"],
    "baseStats": {
      "hp": 63,
      "attack": 95,
      "defense": 65,
      "specialAttack": 80,
      "specialDefense": 72,
      "speed": 110
    },
    "abilities": ["Unburden", "Poison Touch", "Prankster"],
    "height": 0.7,
    "weight": 27.2
  },
  {
    "id": 946,
    "name": "アノクサ",
    "nameEn": "Bramblin",
    "types": ["grass", "ghost"],
    "baseStats": {
      "hp": 40,
      "attack": 65,
      "defense": 30,
      "specialAttack": 45,
      "specialDefense": 35,
      "speed": 60
    },
    "abilities": ["Wind Rider", "Infiltrator"],
    "height": 0.6,
    "weight": 0.6
  },
  {
    "id": 947,
    "name": "アノホラグサ",
    "nameEn": "Brambleghast",
    "types": ["grass", "ghost"],
    "baseStats": {
      "hp": 55,
      "attack": 115,
      "defense": 70,
      "specialAttack": 80,
      "specialDefense": 70,
      "speed": 90
    },
    "abilities": ["Wind Rider", "Infiltrator"],
    "height": 1.2,
    "weight": 6
  },
  {
    "id": 948,
    "name": "ノノクラゲ",
    "nameEn": "Toedscool",
    "types": ["ground", "grass"],
    "baseStats": {
      "hp": 40,
      "attack": 40,
      "defense": 35,
      "specialAttack": 50,
      "specialDefense": 100,
      "speed": 70
    },
    "abilities": ["Mycelium Might"],
    "height": 0.9,
    "weight": 33
  },
  {
    "id": 949,
    "name": "リククラゲ",
    "nameEn": "Toedscruel",
    "types": ["ground", "grass"],
    "baseStats": {
      "hp": 80,
      "attack": 70,
      "defense": 65,
      "specialAttack": 80,
      "specialDefense": 120,
      "speed": 100
    },
    "abilities": ["Mycelium Might"],
    "height": 1.9,
    "weight": 58
  },
  {
    "id": 950,
    "name": "ガケガニ",
    "nameEn": "Klawf",
    "types": ["rock"],
    "baseStats": {
      "hp": 70,
      "attack": 100,
      "defense": 115,
      "specialAttack": 35,
      "specialDefense": 55,
      "speed": 75
    },
    "abilities": ["Anger Shell", "Shell Armor", "Regenerator"],
    "height": 1.3,
    "weight": 79
  },
  {
    "id": 951,
    "name": "カプサイジ",
    "nameEn": "Capsakid",
    "types": ["grass"],
    "baseStats": {
      "hp": 50,
      "attack": 62,
      "defense": 40,
      "specialAttack": 62,
      "specialDefense": 40,
      "speed": 50
    },
    "abilities": ["Chlorophyll", "Insomnia", "Klutz"],
    "height": 0.3,
    "weight": 3
  },
  {
    "id": 952,
    "name": "スコヴィラン",
    "nameEn": "Scovillain",
    "types": ["grass", "fire"],
    "baseStats": {
      "hp": 65,
      "attack": 108,
      "defense": 65,
      "specialAttack": 108,
      "specialDefense": 65,
      "speed": 75
    },
    "abilities": ["Chlorophyll", "Insomnia", "Moody"],
    "height": 0.9,
    "weight": 15
  },
  {
    "id": 953,
    "name": "シガロコ",
    "nameEn": "Rellor",
    "types": ["bug"],
    "baseStats": {
      "hp": 41,
      "attack": 50,
      "defense": 60,
      "specialAttack": 31,
      "specialDefense": 58,
      "speed": 30
    },
    "abilities": ["Compound Eyes", "Shed Skin"],
    "height": 0.2,
    "weight": 1
  },
  {
    "id": 954,
    "name": "ベラカス",
    "nameEn": "Rabsca",
    "types": ["bug", "psychic"],
    "baseStats": {
      "hp": 75,
      "attack": 50,
      "defense": 85,
      "specialAttack": 115,
      "specialDefense": 100,
      "speed": 45
    },
    "abilities": ["Synchronize", "Telepathy"],
    "height": 0.3,
    "weight": 3.5
  },
  {
    "id": 955,
    "name": "ヒラヒナ",
    "nameEn": "Flittle",
    "types": ["psychic"],
    "baseStats": {
      "hp": 30,
      "attack": 35,
      "defense": 30,
      "specialAttack": 55,
      "specialDefense": 30,
      "speed": 75
    },
    "abilities": ["Anticipation", "Frisk", "Speed Boost"],
    "height": 0.2,
    "weight": 1.5
  },
  {
    "id": 956,
    "name": "クエスパトラ",
    "nameEn": "Espathra",
    "types": ["psychic"],
    "baseStats": {
      "hp": 95,
      "attack": 60,
      "defense": 60,
      "specialAttack": 101,
      "specialDefense": 60,
      "speed": 105
    },
    "abilities": ["Opportunist", "Frisk", "Speed Boost"],
    "height": 1.9,
    "weight": 90
  },
  {
    "id": 957,
    "name": "カヌチャン",
    "nameEn": "Tinkatink",
    "types": ["fairy", "steel"],
    "baseStats": {
      "hp": 50,
      "attack": 45,
      "defense": 45,
      "specialAttack": 35,
      "specialDefense": 64,
      "speed": 58
    },
    "abilities": ["Mold Breaker", "Own Tempo", "Pickpocket"],
    "height": 0.4,
    "weight": 8.9
  },
  {
    "id": 958,
    "name": "ナカヌチャン",
    "nameEn": "Tinkatuff",
    "types": ["fairy", "steel"],
    "baseStats": {
      "hp": 65,
      "attack": 55,
      "defense": 55,
      "specialAttack": 45,
      "specialDefense": 82,
      "speed": 78
    },
    "abilities": ["Mold Breaker", "Own Tempo", "Pickpocket"],
    "height": 0.7,
    "weight": 59.1
  },
  {
    "id": 959,
    "name": "デカヌチャン",
    "nameEn": "Tinkaton",
    "types": ["fairy", "steel"],
    "baseStats": {
      "hp": 85,
      "attack": 75,
      "defense": 77,
      "specialAttack": 70,
      "specialDefense": 105,
      "speed": 94
    },
    "abilities": ["Mold Breaker", "Own Tempo", "Pickpocket"],
    "height": 0.7,
    "weight": 112.8
  },
  {
    "id": 960,
    "name": "ウミディグダ",
    "nameEn": "Wiglett",
    "types": ["water"],
    "baseStats": {
      "hp": 10,
      "attack": 55,
      "defense": 25,
      "specialAttack": 35,
      "specialDefense": 25,
      "speed": 95
    },
    "abilities": ["Gooey", "Rattled", "Sand Veil"],
    "height": 1.2,
    "weight": 1.8
  },
  {
    "id": 961,
    "name": "ウミトリオ",
    "nameEn": "Wugtrio",
    "types": ["water"],
    "baseStats": {
      "hp": 35,
      "attack": 100,
      "defense": 50,
      "specialAttack": 50,
      "specialDefense": 70,
      "speed": 120
    },
    "abilities": ["Gooey", "Rattled", "Sand Veil"],
    "height": 1.2,
    "weight": 5.4
  },
  {
    "id": 962,
    "name": "オトシドリ",
    "nameEn": "Bombirdier",
    "types": ["flying", "dark"],
    "baseStats": {
      "hp": 70,
      "attack": 103,
      "defense": 85,
      "specialAttack": 60,
      "specialDefense": 85,
      "speed": 82
    },
    "abilities": ["Big Pecks", "Keen Eye", "Rocky Payload"],
    "height": 1.5,
    "weight": 42.9
  },
  {
    "id": 963,
    "name": "ナミイルカ",
    "nameEn": "Finizen",
    "types": ["water"],
    "baseStats": {
      "hp": 70,
      "attack": 45,
      "defense": 40,
      "specialAttack": 45,
      "specialDefense": 40,
      "speed": 75
    },
    "abilities": ["Water Veil"],
    "height": 1.3,
    "weight": 60.2
  },
  {
    "id": 964,
    "name": "イルカマン (ナイーブフォルム)",
    "nameEn": "Palafin",
    "types": ["water"],
    "baseStats": {
      "hp": 100,
      "attack": 70,
      "defense": 72,
      "specialAttack": 53,
      "specialDefense": 62,
      "speed": 100
    },
    "abilities": ["Zero to Hero"],
    "height": 1.3,
    "weight": 60.2
  },
  {
    "id": 965,
    "name": "ブロロン",
    "nameEn": "Varoom",
    "types": ["steel", "poison"],
    "baseStats": {
      "hp": 45,
      "attack": 70,
      "defense": 63,
      "specialAttack": 30,
      "specialDefense": 45,
      "speed": 47
    },
    "abilities": ["Overcoat", "Slow Start"],
    "height": 1,
    "weight": 35
  },
  {
    "id": 966,
    "name": "ブロロローム",
    "nameEn": "Revavroom",
    "types": ["steel", "poison"],
    "baseStats": {
      "hp": 80,
      "attack": 119,
      "defense": 90,
      "specialAttack": 54,
      "specialDefense": 67,
      "speed": 90
    },
    "abilities": ["Overcoat", "Filter"],
    "height": 1.8,
    "weight": 120
  },
  {
    "id": 967,
    "name": "モトトカゲ",
    "nameEn": "Cyclizar",
    "types": ["dragon", "normal"],
    "baseStats": {
      "hp": 70,
      "attack": 95,
      "defense": 65,
      "specialAttack": 85,
      "specialDefense": 65,
      "speed": 121
    },
    "abilities": ["Shed Skin", "Regenerator"],
    "height": 1.6,
    "weight": 63
  },
  {
    "id": 968,
    "name": "ミミズズ",
    "nameEn": "Orthworm",
    "types": ["steel"],
    "baseStats": {
      "hp": 70,
      "attack": 85,
      "defense": 145,
      "specialAttack": 60,
      "specialDefense": 55,
      "speed": 65
    },
    "abilities": ["Earth Eater", "Sand Veil"],
    "height": 2.5,
    "weight": 310
  },
  {
    "id": 969,
    "name": "キラーメ",
    "nameEn": "Glimmet",
    "types": ["rock", "poison"],
    "baseStats": {
      "hp": 48,
      "attack": 35,
      "defense": 42,
      "specialAttack": 105,
      "specialDefense": 60,
      "speed": 60
    },
    "abilities": ["Toxic Debris", "Corrosion"],
    "height": 0.7,
    "weight": 8
  },
  {
    "id": 970,
    "name": "キラフロル",
    "nameEn": "Glimmora",
    "types": ["rock", "poison"],
    "baseStats": {
      "hp": 83,
      "attack": 55,
      "defense": 90,
      "specialAttack": 130,
      "specialDefense": 81,
      "speed": 86
    },
    "abilities": ["Toxic Debris", "Corrosion"],
    "height": 1.5,
    "weight": 45
  },
  {
    "id": 971,
    "name": "ボチ",
    "nameEn": "Greavard",
    "types": ["ghost"],
    "baseStats": {
      "hp": 50,
      "attack": 61,
      "defense": 60,
      "specialAttack": 30,
      "specialDefense": 55,
      "speed": 34
    },
    "abilities": ["Pickup", "Fluffy"],
    "height": 0.6,
    "weight": 35
  },
  {
    "id": 972,
    "name": "ハカドッグ",
    "nameEn": "Houndstone",
    "types": ["ghost"],
    "baseStats": {
      "hp": 72,
      "attack": 101,
      "defense": 100,
      "specialAttack": 50,
      "specialDefense": 97,
      "speed": 68
    },
    "abilities": ["Sand Rush", "Fluffy"],
    "height": 2,
    "weight": 15
  },
  {
    "id": 973,
    "name": "カラミンゴ",
    "nameEn": "Flamigo",
    "types": ["flying", "fighting"],
    "baseStats": {
      "hp": 82,
      "attack": 115,
      "defense": 74,
      "specialAttack": 75,
      "specialDefense": 64,
      "speed": 90
    },
    "abilities": ["Scrappy", "Tangled Feet", "Costar"],
    "height": 1.6,
    "weight": 37
  },
  {
    "id": 974,
    "name": "アルクジラ",
    "nameEn": "Cetoddle",
    "types": ["ice"],
    "baseStats": {
      "hp": 108,
      "attack": 68,
      "defense": 45,
      "specialAttack": 30,
      "specialDefense": 40,
      "speed": 43
    },
    "abilities": ["Thick Fat", "Snow Cloak", "Sheer Force"],
    "height": 1.2,
    "weight": 45
  },
  {
    "id": 975,
    "name": "ハルクジラ",
    "nameEn": "Cetitan",
    "types": ["ice"],
    "baseStats": {
      "hp": 170,
      "attack": 113,
      "defense": 65,
      "specialAttack": 45,
      "specialDefense": 55,
      "speed": 73
    },
    "abilities": ["Thick Fat", "Slush Rush", "Sheer Force"],
    "height": 4.5,
    "weight": 700
  },
  {
    "id": 976,
    "name": "ミガルーサ",
    "nameEn": "Veluza",
    "types": ["water", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 102,
      "defense": 73,
      "specialAttack": 78,
      "specialDefense": 65,
      "speed": 70
    },
    "abilities": ["Mold Breaker", "Sharpness"],
    "height": 2.5,
    "weight": 90
  },
  {
    "id": 977,
    "name": "ヘイラッシャ",
    "nameEn": "Dondozo",
    "types": ["water"],
    "baseStats": {
      "hp": 150,
      "attack": 100,
      "defense": 115,
      "specialAttack": 65,
      "specialDefense": 65,
      "speed": 35
    },
    "abilities": ["Unaware", "Oblivious", "Water Veil"],
    "height": 12,
    "weight": 220
  },
  {
    "id": 978,
    "name": "シャリタツ (そったすがた)",
    "nameEn": "Tatsugiri",
    "types": ["dragon", "water"],
    "baseStats": {
      "hp": 68,
      "attack": 50,
      "defense": 60,
      "specialAttack": 120,
      "specialDefense": 95,
      "speed": 82
    },
    "abilities": ["Commander", "Storm Drain"],
    "height": 0.3,
    "weight": 8
  },
  {
    "id": 979,
    "name": "コノヨザル",
    "nameEn": "Annihilape",
    "types": ["fighting", "ghost"],
    "baseStats": {
      "hp": 110,
      "attack": 115,
      "defense": 80,
      "specialAttack": 50,
      "specialDefense": 90,
      "speed": 90
    },
    "abilities": ["Vital Spirit", "Inner Focus", "Defiant"],
    "height": 1.2,
    "weight": 56
  },
  {
    "id": 980,
    "name": "ドオー",
    "nameEn": "Clodsire",
    "types": ["poison", "ground"],
    "baseStats": {
      "hp": 130,
      "attack": 75,
      "defense": 60,
      "specialAttack": 45,
      "specialDefense": 100,
      "speed": 20
    },
    "abilities": ["Poison Point", "Water Absorb", "Unaware"],
    "height": 1.8,
    "weight": 223
  },
  {
    "id": 981,
    "name": "リキキリン",
    "nameEn": "Farigiraf",
    "types": ["normal", "psychic"],
    "baseStats": {
      "hp": 120,
      "attack": 90,
      "defense": 70,
      "specialAttack": 110,
      "specialDefense": 70,
      "speed": 60
    },
    "abilities": ["Cud Chew", "Armor Tail", "Sap Sipper"],
    "height": 3.2,
    "weight": 160
  },
  {
    "id": 982,
    "name": "ノココッチ (ふたふしフォルム)",
    "nameEn": "Dudunsparce",
    "types": ["normal"],
    "baseStats": {
      "hp": 125,
      "attack": 100,
      "defense": 80,
      "specialAttack": 85,
      "specialDefense": 75,
      "speed": 55
    },
    "abilities": ["Serene Grace", "Run Away", "Rattled"],
    "height": 3.6,
    "weight": 39.2
  },
  {
    "id": 983,
    "name": "ドドゲザン",
    "nameEn": "Kingambit",
    "types": ["dark", "steel"],
    "baseStats": {
      "hp": 100,
      "attack": 135,
      "defense": 120,
      "specialAttack": 60,
      "specialDefense": 85,
      "speed": 50
    },
    "abilities": ["Defiant", "Supreme Overlord", "Pressure"],
    "height": 2,
    "weight": 120
  },
  {
    "id": 984,
    "name": "イダイナキバ",
    "nameEn": "Great Tusk",
    "types": ["ground", "fighting"],
    "baseStats": {
      "hp": 115,
      "attack": 131,
      "defense": 131,
      "specialAttack": 53,
      "specialDefense": 53,
      "speed": 87
    },
    "abilities": ["Protosynthesis"],
    "height": 2.2,
    "weight": 320
  },
  {
    "id": 985,
    "name": "サケブシッポ",
    "nameEn": "Scream Tail",
    "types": ["fairy", "psychic"],
    "baseStats": {
      "hp": 115,
      "attack": 65,
      "defense": 99,
      "specialAttack": 65,
      "specialDefense": 115,
      "speed": 111
    },
    "abilities": ["Protosynthesis"],
    "height": 1.2,
    "weight": 8
  },
  {
    "id": 986,
    "name": "アラブルタケ",
    "nameEn": "Brute Bonnet",
    "types": ["grass", "dark"],
    "baseStats": {
      "hp": 111,
      "attack": 127,
      "defense": 99,
      "specialAttack": 79,
      "specialDefense": 99,
      "speed": 55
    },
    "abilities": ["Protosynthesis"],
    "height": 1.2,
    "weight": 21
  },
  {
    "id": 987,
    "name": "ハバタクカミ",
    "nameEn": "Flutter Mane",
    "types": ["ghost", "fairy"],
    "baseStats": {
      "hp": 55,
      "attack": 55,
      "defense": 55,
      "specialAttack": 135,
      "specialDefense": 135,
      "speed": 135
    },
    "abilities": ["Protosynthesis"],
    "height": 1.4,
    "weight": 4
  },
  {
    "id": 988,
    "name": "チヲハウハネ",
    "nameEn": "Slither Wing",
    "types": ["bug", "fighting"],
    "baseStats": {
      "hp": 85,
      "attack": 135,
      "defense": 79,
      "specialAttack": 85,
      "specialDefense": 105,
      "speed": 81
    },
    "abilities": ["Protosynthesis"],
    "height": 3.2,
    "weight": 92
  },
  {
    "id": 989,
    "name": "スナノケガワ",
    "nameEn": "Sandy Shocks",
    "types": ["electric", "ground"],
    "baseStats": {
      "hp": 85,
      "attack": 81,
      "defense": 97,
      "specialAttack": 121,
      "specialDefense": 85,
      "speed": 101
    },
    "abilities": ["Protosynthesis"],
    "height": 2.3,
    "weight": 60
  },
  {
    "id": 990,
    "name": "テツノワダチ",
    "nameEn": "Iron Treads",
    "types": ["ground", "steel"],
    "baseStats": {
      "hp": 90,
      "attack": 112,
      "defense": 120,
      "specialAttack": 72,
      "specialDefense": 70,
      "speed": 106
    },
    "abilities": ["Quark Drive"],
    "height": 0.9,
    "weight": 240
  },
  {
    "id": 991,
    "name": "テツノツツミ",
    "nameEn": "Iron Bundle",
    "types": ["ice", "water"],
    "baseStats": {
      "hp": 56,
      "attack": 80,
      "defense": 114,
      "specialAttack": 124,
      "specialDefense": 60,
      "speed": 136
    },
    "abilities": ["Quark Drive"],
    "height": 0.6,
    "weight": 11
  },
  {
    "id": 992,
    "name": "テツノカイナ",
    "nameEn": "Iron Hands",
    "types": ["fighting", "electric"],
    "baseStats": {
      "hp": 154,
      "attack": 140,
      "defense": 108,
      "specialAttack": 50,
      "specialDefense": 68,
      "speed": 50
    },
    "abilities": ["Quark Drive"],
    "height": 1.8,
    "weight": 380.7
  },
  {
    "id": 993,
    "name": "テツノコウベ",
    "nameEn": "Iron Jugulis",
    "types": ["dark", "flying"],
    "baseStats": {
      "hp": 94,
      "attack": 80,
      "defense": 86,
      "specialAttack": 122,
      "specialDefense": 80,
      "speed": 108
    },
    "abilities": ["Quark Drive"],
    "height": 1.3,
    "weight": 111
  },
  {
    "id": 994,
    "name": "テツノドクガ",
    "nameEn": "Iron Moth",
    "types": ["fire", "poison"],
    "baseStats": {
      "hp": 80,
      "attack": 70,
      "defense": 60,
      "specialAttack": 140,
      "specialDefense": 110,
      "speed": 110
    },
    "abilities": ["Quark Drive"],
    "height": 1.2,
    "weight": 36
  },
  {
    "id": 995,
    "name": "テツノイバラ",
    "nameEn": "Iron Thorns",
    "types": ["rock", "electric"],
    "baseStats": {
      "hp": 100,
      "attack": 134,
      "defense": 110,
      "specialAttack": 70,
      "specialDefense": 84,
      "speed": 72
    },
    "abilities": ["Quark Drive"],
    "height": 1.6,
    "weight": 303
  },
  {
    "id": 996,
    "name": "セビエ",
    "nameEn": "Frigibax",
    "types": ["dragon", "ice"],
    "baseStats": {
      "hp": 65,
      "attack": 75,
      "defense": 45,
      "specialAttack": 35,
      "specialDefense": 45,
      "speed": 55
    },
    "abilities": ["Thermal Exchange", "Ice Body"],
    "height": 0.5,
    "weight": 17
  },
  {
    "id": 997,
    "name": "セゴール",
    "nameEn": "Arctibax",
    "types": ["dragon", "ice"],
    "baseStats": {
      "hp": 90,
      "attack": 95,
      "defense": 66,
      "specialAttack": 45,
      "specialDefense": 65,
      "speed": 62
    },
    "abilities": ["Thermal Exchange", "Ice Body"],
    "height": 0.8,
    "weight": 30
  },
  {
    "id": 998,
    "name": "セグレイブ",
    "nameEn": "Baxcalibur",
    "types": ["dragon", "ice"],
    "baseStats": {
      "hp": 115,
      "attack": 145,
      "defense": 92,
      "specialAttack": 75,
      "specialDefense": 86,
      "speed": 87
    },
    "abilities": ["Thermal Exchange", "Ice Body"],
    "height": 2.1,
    "weight": 210
  },
  {
    "id": 999,
    "name": "コレクレー (はこフォルム)",
    "nameEn": "Gimmighoul",
    "types": ["ghost"],
    "baseStats": {
      "hp": 45,
      "attack": 30,
      "defense": 70,
      "specialAttack": 75,
      "specialDefense": 70,
      "speed": 10
    },
    "abilities": ["Rattled"],
    "height": 0.3,
    "weight": 5
  },
  {
    "id": 1000,
    "name": "サーフゴー",
    "nameEn": "Gholdengo",
    "types": ["steel", "ghost"],
    "baseStats": {
      "hp": 87,
      "attack": 60,
      "defense": 95,
      "specialAttack": 133,
      "specialDefense": 91,
      "speed": 84
    },
    "abilities": ["Good as Gold"],
    "height": 1.2,
    "weight": 30
  },
  {
    "id": 1001,
    "name": "チオンジェン",
    "nameEn": "Wo-Chien",
    "types": ["dark", "grass"],
    "baseStats": {
      "hp": 85,
      "attack": 85,
      "defense": 100,
      "specialAttack": 95,
      "specialDefense": 135,
      "speed": 70
    },
    "abilities": ["Tablets of Ruin"],
    "height": 1.5,
    "weight": 74.2
  },
  {
    "id": 1002,
    "name": "パオジアン",
    "nameEn": "Chien-Pao",
    "types": ["dark", "ice"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 80,
      "specialAttack": 90,
      "specialDefense": 65,
      "speed": 135
    },
    "abilities": ["Sword of Ruin"],
    "height": 1.9,
    "weight": 152.2
  },
  {
    "id": 1003,
    "name": "ディンルー",
    "nameEn": "Ting-Lu",
    "types": ["dark", "ground"],
    "baseStats": {
      "hp": 155,
      "attack": 110,
      "defense": 125,
      "specialAttack": 55,
      "specialDefense": 80,
      "speed": 45
    },
    "abilities": ["Vessel of Ruin"],
    "height": 2.7,
    "weight": 699.7
  },
  {
    "id": 1004,
    "name": "イーユイ",
    "nameEn": "Chi-Yu",
    "types": ["dark", "fire"],
    "baseStats": {
      "hp": 55,
      "attack": 80,
      "defense": 80,
      "specialAttack": 135,
      "specialDefense": 120,
      "speed": 100
    },
    "abilities": ["Beads of Ruin"],
    "height": 0.4,
    "weight": 4.9
  },
  {
    "id": 1005,
    "name": "トドロクツキ",
    "nameEn": "Roaring Moon",
    "types": ["dragon", "dark"],
    "baseStats": {
      "hp": 105,
      "attack": 139,
      "defense": 71,
      "specialAttack": 55,
      "specialDefense": 101,
      "speed": 119
    },
    "abilities": ["Protosynthesis"],
    "height": 2,
    "weight": 380
  },
  {
    "id": 1006,
    "name": "テツノブジン",
    "nameEn": "Iron Valiant",
    "types": ["fairy", "fighting"],
    "baseStats": {
      "hp": 74,
      "attack": 130,
      "defense": 90,
      "specialAttack": 120,
      "specialDefense": 60,
      "speed": 116
    },
    "abilities": ["Quark Drive"],
    "height": 1.4,
    "weight": 35
  },
  {
    "id": 1007,
    "name": "コライドン",
    "nameEn": "Koraidon",
    "types": ["fighting", "dragon"],
    "baseStats": {
      "hp": 100,
      "attack": 135,
      "defense": 115,
      "specialAttack": 85,
      "specialDefense": 100,
      "speed": 135
    },
    "abilities": ["Orichalcum Pulse"],
    "height": 2.5,
    "weight": 303
  },
  {
    "id": 1008,
    "name": "ミライドン",
    "nameEn": "Miraidon",
    "types": ["electric", "dragon"],
    "baseStats": {
      "hp": 100,
      "attack": 85,
      "defense": 100,
      "specialAttack": 135,
      "specialDefense": 115,
      "speed": 135
    },
    "abilities": ["Hadron Engine"],
    "height": 3.5,
    "weight": 240
  },
  
  {
    "id": 1009,
    "name": "ウネルミナモ",
    "nameEn": "Walking Wake",
    "types": ["water", "dragon"],
    "baseStats": {
      "hp": 99,
      "attack": 83,
      "defense": 91,
      "specialAttack": 125,
      "specialDefense": 83,
      "speed": 109
    },
    "abilities": ["Protosynthesis"],
    "height": 3.5,
    "weight": 280
  },
  {
    "id": 1010,
    "name": "テツノイサハ",
    "nameEn": "Iron Leaves",
    "types": ["grass", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 130,
      "defense": 88,
      "specialAttack": 70,
      "specialDefense": 108,
      "speed": 104
    },
    "abilities": ["Quark Drive"],
    "height": 1.5,
    "weight": 125
  },
  {
    "id": 1011,
    "name": "カミッチュ",
    "nameEn": "Dipplin",
    "types": ["grass", "dragon"],
    "baseStats": {
      "hp": 80,
      "attack": 80,
      "defense": 110,
      "specialAttack": 95,
      "specialDefense": 80,
      "speed": 40
    },
    "abilities": ["Supersweet Syrup", "Gluttony", "Sticky Hold"],
    "height": 0.4,
    "weight": 4.4
  },
  {
    "id": 1012,
    "name": "チャデス (マガイモノのすがた)",
    "nameEn": "Poltchageist",
    "types": ["grass", "ghost"],
    "baseStats": {
      "hp": 40,
      "attack": 45,
      "defense": 45,
      "specialAttack": 74,
      "specialDefense": 54,
      "speed": 50
    },
    "abilities": ["Hospitality", "Heatproof"],
    "height": 0.1,
    "weight": 1.1
  },
  {
    "id": 1013,
    "name": "ヤバソチャ (ボンサクのすがた)",
    "nameEn": "Sinistcha",
    "types": ["grass", "ghost"],
    "baseStats": {
      "hp": 71,
      "attack": 60,
      "defense": 106,
      "specialAttack": 121,
      "specialDefense": 80,
      "speed": 70
    },
    "abilities": ["Hospitality", "Heatproof"],
    "height": 0.2,
    "weight": 2.2
  },
  {
    "id": 1014,
    "name": "イイネイヌ",
    "nameEn": "Okidogi",
    "types": ["poison", "fighting"],
    "baseStats": {
      "hp": 88,
      "attack": 128,
      "defense": 115,
      "specialAttack": 58,
      "specialDefense": 86,
      "speed": 80
    },
    "abilities": ["Toxic Chain", "Guard Dog"],
    "height": 1.8,
    "weight": 92
  },
  {
    "id": 1015,
    "name": "マシマシラ",
    "nameEn": "Munkidori",
    "types": ["poison", "psychic"],
    "baseStats": {
      "hp": 88,
      "attack": 75,
      "defense": 66,
      "specialAttack": 130,
      "specialDefense": 90,
      "speed": 106
    },
    "abilities": ["Toxic Chain", "Frisk"],
    "height": 1,
    "weight": 12.2
  },
  {
    "id": 1016,
    "name": "キチキギス",
    "nameEn": "Fezandipiti",
    "types": ["poison", "fairy"],
    "baseStats": {
      "hp": 88,
      "attack": 91,
      "defense": 82,
      "specialAttack": 70,
      "specialDefense": 125,
      "speed": 99
    },
    "abilities": ["Toxic Chain", "Technician"],
    "height": 1.4,
    "weight": 30.1
  },
  {
    "id": 1017,
    "name": "オーガポン (みどりのめん)",
    "nameEn": "Ogerpon",
    "types": ["grass"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 84,
      "specialAttack": 60,
      "specialDefense": 96,
      "speed": 110
    },
    "abilities": ["Defiant"],
    "height": 1.2,
    "weight": 39.8
  },
    {
    "id": "1017-w",
    "name": "オーガポン (いどのめん)",
    "nameEn": "Ogerpon-Wellspring",
    "types": ["grass", "water"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 84,
      "specialAttack": 60,
      "specialDefense": 96,
      "speed": 110
    },
    "abilities": ["Water Absorb"],
    "height": 1.2,
    "weight": 39.8
  },
  {
    "id": "1017-h",
    "name": "オーガポン (かまどのめん)",
    "nameEn": "Ogerpon-Hearthflame",
    "types": ["grass", "fire"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 84,
      "specialAttack": 60,
      "specialDefense": 96,
      "speed": 110
    },
    "abilities": ["Mold Breaker"],
    "height": 1.2,
    "weight": 39.8
  },
  {
    "id": "1017-c",
    "name": "オーガポン (いしずえのめん)",
    "nameEn": "Ogerpon-Cornerstone",
    "types": ["grass", "rock"],
    "baseStats": {
      "hp": 80,
      "attack": 120,
      "defense": 84,
      "specialAttack": 60,
      "specialDefense": 96,
      "speed": 110
    },
    "abilities": ["Sturdy"],
    "height": 1.2,
    "weight": 39.8
  },
  {
    "id": 1018,
    "name": "ブリジュラス",
    "nameEn": "Archaludon",
    "types": ["steel", "dragon"],
    "baseStats": {
      "hp": 90,
      "attack": 105,
      "defense": 130,
      "specialAttack": 125,
      "specialDefense": 65,
      "speed": 85
    },
    "abilities": ["Stamina", "Sturdy", "Stalwart"],
    "height": 2,
    "weight": 60
  },
  {
    "id": 1019,
    "name": "カミツオロチ",
    "nameEn": "Hydrapple",
    "types": ["grass", "dragon"],
    "baseStats": {
      "hp": 106,
      "attack": 80,
      "defense": 110,
      "specialAttack": 120,
      "specialDefense": 80,
      "speed": 44
    },
    "abilities": ["Supersweet Syrup", "Regenerator", "Sticky Hold"],
    "height": 1.8,
    "weight": 93
  },
  {
    "id": 1020,
    "name": "ウガツホムラ",
    "nameEn": "Gouging Fire",
    "types": ["fire", "dragon"],
    "baseStats": {
      "hp": 105,
      "attack": 115,
      "defense": 121,
      "specialAttack": 65,
      "specialDefense": 93,
      "speed": 91
    },
    "abilities": ["Protosynthesis"],
    "height": 3.5,
    "weight": 590
  },
  {
    "id": 1021,
    "name": "タケルライコ",
    "nameEn": "Raging Bolt",
    "types": ["electric", "dragon"],
    "baseStats": {
      "hp": 125,
      "attack": 73,
      "defense": 91,
      "specialAttack": 137,
      "specialDefense": 89,
      "speed": 75
    },
    "abilities": ["Protosynthesis"],
    "height": 5.2,
    "weight": 480
  },
  {
    "id": 1022,
    "name": "テツノイワオ",
    "nameEn": "Iron Boulder",
    "types": ["rock", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 120,
      "defense": 80,
      "specialAttack": 68,
      "specialDefense": 108,
      "speed": 124
    },
    "abilities": ["Quark Drive"],
    "height": 1.5,
    "weight": 162.5
  },
  {
    "id": 1023,
    "name": "テツノカシラ",
    "nameEn": "Iron Crown",
    "types": ["steel", "psychic"],
    "baseStats": {
      "hp": 90,
      "attack": 72,
      "defense": 100,
      "specialAttack": 122,
      "specialDefense": 108,
      "speed": 98
    },
    "abilities": ["Quark Drive"],
    "height": 1.6,
    "weight": 156
  },
  {
    "id": 1024,
    "name": "テラパゴス (ノーマル)",
    "nameEn": "Terapagos",
    "types": ["normal"],
    "baseStats": {
      "hp": 90,
      "attack": 65,
      "defense": 85,
      "specialAttack": 65,
      "specialDefense": 85,
      "speed": 60
    },
    "abilities": ["Tera Shift"],
    "height": 0.2,
    "weight": 6.5
  },
  {
    "id": 1025,
    "name": "モモワロウ",
    "nameEn": "Pecharunt",
    "types": ["poison", "ghost"],
    "baseStats": {
      "hp": 88,
      "attack": 88,
      "defense": 160,
      "specialAttack": 88,
      "specialDefense": 88,
      "speed": 88
    },
    "abilities": ["Poison Puppeteer"],
    "height": 0.3,
    "weight": 0.3
  },
  {
  id: 987,
  name: "ハバタクカミ",
  nameEn: "Flutter Mane",
  types: ["ghost", "fairy"],
  baseStats: {
    hp: 55,
    attack: 55,
    defense: 55,
    specialAttack: 135,
    specialDefense: 135,
    speed: 135
  },
  abilities: ["Protosynthesis"],
  height: 1.4,
  weight: 4.0
},
{
  id: 1004,
  name: "イーユイ",
  nameEn: "Chi-Yu",
  types: ["dark", "fire"],
  baseStats: {
    hp: 55,
    attack: 80,
    defense: 80,
    specialAttack: 135,
    specialDefense: 120,
    speed: 100
  },
  abilities: ["Beads of Ruin"],
  height: 0.4,
  weight: 4.9
},
  
  {
    "id": "901-b",
    "name": "ガチグマ (アカツキ)",
    "nameEn": "Ursaluna-Bloodmoon",
    "types": ["ground", "normal"],
    "baseStats": {
      "hp": 113,
      "attack": 70,
      "defense": 120,
      "specialAttack": 135,
      "specialDefense": 65,
      "speed": 52
    },
    "abilities": ["Mind's Eye"],
    "height": 2.7,
    "weight": 333
  },
  {
    "id": 892,
    "name": "ウーラオス (れんげき)",
    "nameEn": "Urshifu-Rapid-Strike",
    "types": ["fighting", "water"],
    "baseStats": {
      "hp": 100,
      "attack": 130,
      "defense": 100,
      "specialAttack": 63,
      "specialDefense": 60,
      "speed": 97
    },
    "abilities": ["Unseen Fist"],
    "height": 1.9,
    "weight": 105
  },
  {
    "id": "898-i",
    "name": "バドレックス (はくば)",
    "nameEn": "Calyrex-Ice",
    "types": ["psychic", "ice"],
    "baseStats": {
      "hp": 100,
      "attack": 165,
      "defense": 150,
      "specialAttack": 85,
      "specialDefense": 130,
      "speed": 50
    },
    "abilities": ["As One (Glastrier)"],
    "height": 2.4,
    "weight": 809.1
  },
  {
    "id": "898-s",
    "name": "バドレックス (こくば)",
    "nameEn": "Calyrex-Shadow",
    "types": ["psychic", "ghost"],
    "baseStats": {
      "hp": 100,
      "attack": 85,
      "defense": 80,
      "specialAttack": 165,
      "specialDefense": 100,
      "speed": 150
    },
    "abilities": ["As One (Spectrier)"],
    "height": 2.4,
    "weight": 53.6
  },
  {
    "id": "876-f",
    "name": "イエッサン (メス)",
    "nameEn": "Indeedee-F",
    "types": ["psychic", "normal"],
    "baseStats": {
      "hp": 70,
      "attack": 55,
      "defense": 65,
      "specialAttack": 95,
      "specialDefense": 105,
      "speed": 85
    },
    "abilities": ["Own Tempo", "Synchronize", "Psychic Surge"],
    "height": 0.9,
    "weight": 28
  },
];