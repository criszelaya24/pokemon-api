import { Config } from '@entities/config';
import { MongoConnection } from '@entities/database';
import { Pokemon, PokemonStaticModel } from '@entities/pokemon';
import { PokemonPorts } from '@ports/database';
import connection from './connection';
export default class Mongo implements PokemonPorts {

    private config:Config
    private mongoConnection:MongoConnection;
    private PokemonModel!:PokemonStaticModel
    constructor(config:Config) {
        this.config = config;
        this.mongoConnection = connection(this.config);
    }

    init = async() => {
        await this.mongoConnection.connect();
        const { PokemonModel } = this.mongoConnection.schemas;

        this.PokemonModel = PokemonModel;
    };

    findByType = async(types:string[]):Promise<Pokemon[]> => {
        return this.PokemonModel.findByType(types);
    }

}