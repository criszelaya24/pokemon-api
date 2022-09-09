import { StaticModels } from '@entities/mongo';
import PokemonModel from './Pokemon';

const create = ():StaticModels => ({
    PokemonModel,
});

export default create;