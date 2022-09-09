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
    value:string
}

export interface PathParams {
    [key:string]: string
}