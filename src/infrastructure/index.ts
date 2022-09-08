import { Ports } from '@entities/common';
import { Config } from '@entities/config';
import Mongo from '@infrastructure/mongo';
import loadConfig from '@infrastructure/loadConfig';
import PokeApi from './pokeApi';

const initPorts = async():Promise<Ports> => {
    const config:Config = await loadConfig();
    const Database = new Mongo(config);

    await Database.init();

    return {
        Database,
        PokemonApi: new PokeApi(config),
    };
};

export default initPorts;
