import { SyncDatabaseApi } from '@ports/actions';
import { PokemonApi } from '@entities/pokeApi';
import { Pokemon } from '@entities/pokemon';
import { SyncServiceParams } from '@entities/params';
import { Ports } from '@entities/common';

export default class SyncService implements SyncDatabaseApi {

    private offset!:number
    private limit!:number
    private Ports!:Ports
    constructor(
        params:SyncServiceParams,
    ) {
        Object.assign(this, params);
    }

    syncDatabase = async() => {
        const pokemonList = await this.Ports.PokemonApi.listPokemon(this.offset, this.limit);
        const ids = pokemonList.results.map(pokemon => pokemon.url.split('pokemon/')[1]);

        const promisesApi = ids.map(id => this.Ports.PokemonApi.getPokemon(id));
        const pokemonResults = await Promise.allSettled(promisesApi);
        const pokemonApi = this.getFulfilledPromises<PokemonApi>(pokemonResults);

        const promisesDatabase = pokemonApi.map(pokemon => {
            const { ['id']: id, ['types']: types, ...rest } = pokemon;
            const pokemonToCreateUpdate:Pokemon = {
                ...rest,
                _externalId: id,
                types: types.map(attr => attr.type.name),
            };

            return this.Ports.Database.createUpdatePokemon(pokemonToCreateUpdate);
        });

        const databaseResult = await Promise.allSettled(promisesDatabase);
        const pokemonUpdated = this.getFulfilledPromises<Pokemon>(databaseResult).length;

        return { data: true, pokemonUpdated };
    }

    private getFulfilledPromises = <T>(result:PromiseSettledResult<T>[]):T[] => {
        return result.reduce((acc:T[], res) => {
            if (res.status === 'fulfilled') {
                acc.push({ ...res.value });
            }

            return acc;
        }, []);
    }

}