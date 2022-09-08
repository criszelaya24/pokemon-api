import { Ports } from '@entities/common';
import { PokemonActions } from '@ports/actions';
import { PokemonServiceParams } from '@entities/params';

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

}