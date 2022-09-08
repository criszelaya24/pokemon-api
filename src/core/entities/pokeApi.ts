import { Pokemon } from './pokemon';
export interface PokemonApi extends Omit<Pokemon, 'types'> {
    types:      Type[];
    id:         Number
}

export interface Localizable {
    name: string;
    url:  string;
}

export interface Type {
    slot: number;
    type: Localizable;
}

export interface PokemonsApi {
    count:    number;
    next:     string;
    previous: null;
    results:  Localizable[];
}

