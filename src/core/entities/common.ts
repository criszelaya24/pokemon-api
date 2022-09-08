import Mongo from '@infrastructure/mongo';
import PokeApi from '@infrastructure/pokeApi';
export class ApiError {

    key: string;
    userMessage: string;
    info?: unknown;

    constructor(key: string, userMessage: string, info?: unknown) {
        this.key = key;
        this.userMessage = userMessage;
        this.info = info;
    }

}

export interface Ports {
    Database: Mongo
    PokemonApi: PokeApi
}

export interface ErrorBody {
    extra?: any;
    code: number;
    userMessage?: string;
}

export interface ErrorResponse {
    code: number;
    response: { extra?: any; error: Pick<ErrorBody, 'userMessage'> };
}

export interface ResponseCode {
    error: {
        [key:string]: {
            code: number,
            userMessages: {
                [key:string]: {
                    code : number
                    userMessage: { [key:string]: string }
                    description?: string,
                }
            }
        }
    }
}