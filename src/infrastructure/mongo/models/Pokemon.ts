import mongoose from 'mongoose';
import { Pokemon as IUpokemon, PokemonStaticModel } from '@entities/pokemon';
const PokemonSchema = new mongoose.Schema<IUpokemon>({
    name: { type: String, required: true },
    _externalId: { type: Number, required: true, unique: true },
    types: [ {
        type: String,
    } ],
}, {
    timestamps: true,
});

PokemonSchema.pre<IUpokemon>('save', async function(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const pokemon:IUpokemon = this;

    pokemon.types = [ ...new Set([ ...pokemon.types ]) ];

    next();
});

PokemonSchema.statics.findByType = async(types:string[]):Promise<IUpokemon[]> => {
    const pokemon = await PokemonModel.find({
        types: { $in: types },
    }).lean();

    if (!pokemon.length)
        throw { key: 'validations', userMessage: 'notFound', extra: 'There are no pokemon to display' };

    return pokemon as IUpokemon[];
};

const PokemonModel = mongoose.model<IUpokemon, PokemonStaticModel>('Pokemon', PokemonSchema);

export default PokemonModel;