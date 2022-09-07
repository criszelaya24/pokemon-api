import { Pokemon } from '@entities/pokemon';

export interface PokemonPorts {
    findByType(types:string[]):Promise<Pokemon[]>
}