import { Config } from '@entities/config';
import { MongoConnection } from '@entities/database';
import { Pokemon, PokemonStaticModel } from '@entities/pokemon';
import connection from './connection';
import { Database, PokemonPaginated } from '../../core/ports/database';
export default class Mongo implements Database {

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

    findBy = async(findBy, { page = 1, itemsPerPage = 10 }:Pagination):Promise<PokemonPaginated> => {
        let query = {};

        if (findBy.types) query = { ...query, types: { $in: findBy.types } };

        const pokemonDocuments = await this.PokemonModel.find({
            ...query,
        }).limit(itemsPerPage)
            .skip((page - 1) * itemsPerPage);

        const pokemonDocumentCounts = await this.PokemonModel.countDocuments({ ...query }).lean();

        return {
            items: pokemonDocuments,
            total: Number(pokemonDocumentCounts / itemsPerPage),
            page,
            itemsPerPage: pokemonDocumentCounts,
        };
    }

    createUpdatePokemon = async(pokemon: Omit<Pokemon, '_id'>):Promise<Pokemon> => {
        return this.PokemonModel
            .findOneAndUpdate({ _externalId: pokemon._externalId }, {
                ...pokemon,
            }, { new: true, upsert: true, strict: false }).lean();
    }

}