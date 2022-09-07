import { StaticModels } from '@entities/database';
import PokemonModel from './Pokemon';

const create = ():StaticModels => ({
    PokemonModel,
});

export default create;