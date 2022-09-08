import { PokemonPaginated } from './database';
export interface SyncDatabaseApi {
    syncDatabase(offset:number, limit:number):Promise<{ [key:string]: string | number | boolean}>
}

export interface PokemonActions {
    listPokemon():Promise<PokemonPaginated>
}