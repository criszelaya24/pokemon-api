import Mongo from '@infrastructure/mongo';
import PokeApi from '@infrastructure/pokeApi';
export class ApiError {

    key: string;
    userMessage?: string;
    info?: unknown;

    constructor(key: string, userMessage?: string, info?: unknown) {
        this.key = key;
        this.userMessage = userMessage;
        this.info = info;
    }

}

export interface Ports {
    Database: Mongo
    PokemonApi: PokeApi
}

export interface ResponseCode {
    error: {
        [key:string]: {
            code: number,
            userMessages: {
                [key:string]: {
                    code : number
                    userMessage: { [key:string]: string }
                }
            }
        }
    }
}