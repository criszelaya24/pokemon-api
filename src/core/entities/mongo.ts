import { PokemonStaticModel } from './pokemon';
export interface StaticModels {
    PokemonModel: PokemonStaticModel
}
export interface MongoConnection {
    connect(): void
    close():void
    getConnection():void
    models: StaticModels
}