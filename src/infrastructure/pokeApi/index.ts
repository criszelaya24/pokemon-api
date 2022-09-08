import { Config } from '@entities/config';
import { PokemonApi, PokemonsApi } from '@entities/pokeApi';
import Axios from '@infrastructure/axios';
import { PokemonPorts } from '@ports/pokemon';

export default class PokeApi extends Axios implements PokemonPorts {

    constructor({ pokeApiBaseUrl }:Config) {
        super(pokeApiBaseUrl);
    }

    listPokemon = async(offset = 0, limit = 10):Promise<PokemonsApi> => {
        return this.get<PokemonsApi>(`/pokemon?offset=${offset}&limit=${limit}`);
    }

    getPokemon = async(id: string): Promise<PokemonApi> => {
        return this.get<PokemonApi>(`/pokemon/${id}`);
    }

}