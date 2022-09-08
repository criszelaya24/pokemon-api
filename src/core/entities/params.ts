import { Ports } from './common';

export interface SyncServiceParams {
    offset?:number
    limit?:number
    Ports: Ports
}

export interface PokemonServiceParams extends Pagination {
    Ports: Ports
}

export interface GetPokemonParam {
    _id?:string,
    name?:string
}