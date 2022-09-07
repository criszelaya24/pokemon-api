import { Config } from '@entities/config';
import { MongoConnection } from '@entities/database';
import { Pokemon, PokemonStaticModel } from '@entities/pokemon';
import { PokemonPorts } from '@ports/database';
import connection from './connection';
import { Database } from '../../core/ports/database';
export default class Mongo implements PokemonPorts, Database {

    private config:Config
    private mongoConnection:MongoConnection;
    PokemonModel!:PokemonStaticModel
    constructor(config:Config) {
        this.config = config;
        this.mongoConnection = connection(this.config);
    }

    init = async():Promise<void> => {
        await this.mongoConnection.connect();
        const { PokemonModel } = this.mongoConnection.models;

        this.PokemonModel = PokemonModel;
    };

    findByType = async(types:string[]):Promise<Pokemon[]> => {
        return this.PokemonModel.findByType(types);
    }

    createUpdatePokemon = async(pokemon: Omit<Pokemon, '_id'>):Promise<Pokemon> => {
        return this.PokemonModel
            .findOneAndUpdate({ _externalId: pokemon._externalId }, {
                ...pokemon,
            }, { new: true, upsert: true }).lean();
    }

}