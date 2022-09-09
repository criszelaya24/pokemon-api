import { ApiError, Ports } from '@entities/common';
import { PokemonActions } from '@ports/actions';
import { PokemonServiceParams } from '@entities/params';
import { Pokemon } from '@entities/pokemon';
import { GetPokemonParam, PathParams } from '../entities/params';

export default class PokemonService implements PokemonActions {

    private page:number
    private itemsPerPage:number
    private Ports:Ports
    constructor({ page = 1, itemsPerPage = 10, Ports }:PokemonServiceParams) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.Ports = Ports;
    }

    listPokemon = async(filter:PathParams = {}) => {
        return this.Ports.Database.findBy({ ...filter },
            { page: Number(this.page), itemsPerPage: Number(this.itemsPerPage) });
    }

    getPokemon = async({ value }:GetPokemonParam):Promise<Pokemon> => {
        const key = this.Ports.Database.validateId(value) ? '_id' : 'name';
        const result = await this.Ports.Database
            .findBy({ [key]: value }, {});

        if (result.items.length === 0) throw new ApiError('notFound', 'notFound', `Pokemon with ${value} not found`);

        return result.items[0];
    }

}