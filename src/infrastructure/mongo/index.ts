import { Config } from '@entities/config';
import { MongoConnection } from '@entities/database';
import { PokemonStaticModel } from '@entities/pokemon';
import connection from './connection';
export default class Mongo {

    private config:Config
    private mongoConnection:MongoConnection;
    private PokemonModel:PokemonStaticModel|undefined
    constructor(config:Config) {
        this.config = config;
        this.mongoConnection = connection(this.config);
    }

    init = async() => {
        await this.mongoConnection.connect();
        const { PokemonModel } = this.mongoConnection.schemas;

        this.PokemonModel = PokemonModel;
    };

}