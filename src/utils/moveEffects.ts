import { Move, PokemonType, Weather, Field, Ability } from '../types';
import type { Pokemon, MoveDynamicContext, MoveDynamicProperties } from '../types';

const effectHandlers: Record<string, (baseMove: Move, context: MoveDynamicContext) => MoveDynamicProperties> = {
  Boost: (baseMove, context) => {
    if (context.uiOptionChecked && baseMove.uiOption && context.uiOptionChecked[baseMove.uiOption.key]) {
      return { power: (baseMove.power || 0) * 2 };
    }
    return {};
  },

  ivyCudgelEffect: (baseMove, context) => {
    if (context.attackerPokemon) {
      const attackerId = context.attackerPokemon.id.toString();
      switch (attackerId) {
        case '1017-w': 
          return { type: PokemonType.Water };
        case '1017-h': 
          return { type: PokemonType.Fire };
        case '1017-c': 
          return { type: PokemonType.Rock };
        default: 
          return { type: PokemonType.Grass };
      }
    }
    return {};
  },

  weatherBallEffect: (baseMove, context) => {
    const defaultPower = baseMove.power || 50;
    const defaultType = baseMove.type || PokemonType.Normal;

    switch (context.weather) {
      case 'sun':
      case 'harsh_sunlight':
        return { power: 100, type: PokemonType.Fire };
      case 'rain':
      case 'heavy_rain':
        return { power: 100, type: PokemonType.Water };
      case 'snow': 
        return { power: 100, type: PokemonType.Ice };
      case 'sandstorm':
        return { power: 100, type: PokemonType.Rock };
      default:
        return { power: defaultPower, type: defaultType };
    }
  },
  expandingForceEffect: (baseMove, context) => {
    const result: MoveDynamicProperties = {};
    if (context.field === Field.Psychic && context.attackerPokemon) {
        const attacker = context.attackerPokemon;
        const isFlyingType = attacker.types.includes(PokemonType.Flying);
        let isLevitating = false;
        if (context.attackerAbility?.id === 'levitate') { 
            isLevitating = true;
        }
        
        const isGrounded = !isFlyingType && !isLevitating; 

        if (isGrounded) {
            result.isSpread = true; 
        }
    }
    return result;
  },

  heavySlamHeatCrashPower: (baseMove, context) => {
    if (!context.attackerPokemon || !context.defenderPokemon) {
      return { power: 1 }; 
    }

    const attackerWeight = context.attackerPokemon.weight;
    const defenderWeight = context.defenderPokemon.weight;

    if (typeof attackerWeight !== 'number' || typeof defenderWeight !== 'number' || attackerWeight <= 0 || defenderWeight <= 0) {
      return { power: 1 }; 
    }

    const ratio = defenderWeight / attackerWeight; 
    let calculatedPower = 0;

    if (ratio <= 1/5) {         
      calculatedPower = 120;
    } else if (ratio <= 1/4) { 
      calculatedPower = 100;
    } else if (ratio <= 1/3) { 
      calculatedPower = 80;
    } else if (ratio <= 1/2) { 
      calculatedPower = 60;
    } else {                     
      calculatedPower = 40;
    }
    
    return { power: calculatedPower };
  },
  defenderWeightBasedPowerLowKickGrassKnot: (baseMove, context) => {
    if (!context.defenderPokemon) {
      return { power: 1 };
    }

    const defenderWeight = context.defenderPokemon.weight;

    if (typeof defenderWeight !== 'number' || defenderWeight < 0) {
      return { power: 1 }; 
    }

    let calculatedPower = 0;
    if (defenderWeight < 10.0) {         
      calculatedPower = 20;
    } else if (defenderWeight < 25.0) { 
      calculatedPower = 40;
    } else if (defenderWeight < 50.0) { 
      calculatedPower = 60;
    } else if (defenderWeight < 100.0) { 
      calculatedPower = 80;
    } else if (defenderWeight < 200.0) { 
      calculatedPower = 100;
    } else {                             
      calculatedPower = 120;
    }

    return { power: calculatedPower };
  },
  // ★ テラクラスターの効果ハンドラ
  terastarstormEffects: (baseMove, context) => {
    const props: MoveDynamicProperties = {};
    if (context.attackerPokemon?.id === "1024-s") { // テラパゴス (ステラフォルム) の場合
        props.type = PokemonType.Stellar; // 技タイプをステラに変更
        props.isSpread = true; // 範囲攻撃に変更
        // カテゴリ変更はここでは行わない (App.tsx と AttackerPanel.tsx で処理)
    }
    // 他のポケモンが使う場合は、元の技の性質 (ノーマル、単体) のまま
    return props;
  },
};

export function getEffectiveMoveProperties(originalMove: Move | null, context: MoveDynamicContext): Move | null {
  if (!originalMove) {
    return null;
  }

  let effectiveMove = { ...originalMove };

  if (originalMove.dynamicEffectId && effectHandlers[originalMove.dynamicEffectId]) {
    const dynamicProps = effectHandlers[originalMove.dynamicEffectId](originalMove, context);

    if (dynamicProps.power !== undefined) {
      effectiveMove.power = dynamicProps.power;
    }
    if (dynamicProps.type !== undefined) {
      effectiveMove.type = dynamicProps.type;
    }
    if (dynamicProps.isSpread !== undefined) {
        effectiveMove.isSpread = dynamicProps.isSpread;
    }
  }
  return effectiveMove;
}