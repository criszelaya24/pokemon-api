import { Pokemon } from '@entities/pokemon';

export interface Database {
    init():Promise<void> // Init connection to DB
}
export interface PokemonPorts {
    findBy(params:{ _id?: string, name?: string, types?: string[] }):Promise<Pokemon[]>
    createUpdatePokemon(pokemon:Omit<Pokemon, '_id'>):Promise<Pokemon>
}