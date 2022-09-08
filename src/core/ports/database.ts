import { Pokemon } from '@entities/pokemon';

export interface PokemonPaginated extends Pagination{
    items: Pokemon[],
    total: number
}
export interface Database {
    init():Promise<void> // Init connection to DB
    findBy(params:any, pagination?:Pagination):Promise<PokemonPaginated>
    createUpdatePokemon(pokemon:Omit<Pokemon, '_id'>):Promise<Pokemon>
}