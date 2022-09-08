import { GetPokemonParam } from '@entities/params';
import { Pokemon } from '@entities/pokemon';
import { PokemonPaginated } from './database';
export interface SyncDatabaseApi {
    syncDatabase(offset:number, limit:number):Promise<{ [key:string]: string | number | boolean}>
}

export interface PokemonActions {
    listPokemon():Promise<PokemonPaginated>
    getPokemon(params:GetPokemonParam):Promise<Pokemon>
}