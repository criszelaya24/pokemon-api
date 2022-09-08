import { PokemonsApi, PokemonApi } from '@entities/pokeApi';

export interface PokemonPorts {
    listPokemon(offset:number, limit:number):Promise<PokemonsApi>
    getPokemon(id:string):Promise<PokemonApi>
}