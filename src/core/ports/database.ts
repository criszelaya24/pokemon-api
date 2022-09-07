import { Pokemon } from '@entities/pokemon';

export interface Database {
    init():Promise<void> // Init connection to DB
}
export interface PokemonPorts {
    findByType(types:string[]):Promise<Pokemon[]>
    createUpdatePokemon(pokemon:Omit<Pokemon, '_id'>):Promise<Pokemon>
}