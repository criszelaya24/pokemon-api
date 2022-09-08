import { ApiError, Ports } from '@entities/common';
import { PokemonActions } from '@ports/actions';
import { PokemonServiceParams } from '@entities/params';
import { Pokemon } from '@entities/pokemon';
import { GetPokemonParam } from '../entities/params';

export default class PokemonService implements PokemonActions {

    private page:number
    private itemsPerPage:number
    private Ports:Ports
    constructor({ page = 1, itemsPerPage = 10, Ports }:PokemonServiceParams) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.Ports = Ports;
    }

    listPokemon = async() => {
        return this.Ports.Database.findBy({}, { page: Number(this.page), itemsPerPage: Number(this.itemsPerPage) });
    }

    getPokemon = async({ _id, name }:GetPokemonParam):Promise<Pokemon> => {
        const result = await this.Ports.Database
            .findBy({ _id, name }, {});

        if (result.items.length === 0) throw new ApiError('notFound', 'notFound', `Pokemon with ${_id} not found`);

        return result.items[0];
    }

}