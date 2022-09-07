import mongoose from 'mongoose';
import { Pokemon as IUpokemon, PokemonStaticModel } from '@entities/pokemon';
const PokemonSchema = new mongoose.Schema<IUpokemon>({
    name: { type: String, required: true },
    externalId: { type: Number, required: true },
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

const PokemonModel = mongoose.model<IUpokemon, PokemonStaticModel>('Pokemon', PokemonSchema);

export default PokemonModel;