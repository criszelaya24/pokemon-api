import { Ports } from '@entities/common';
import { Config } from '@entities/config';
import Mongo from '@infrastructure/mongo';
import loadConfig from '@infrastructure/loadConfig';

const initPorts = async():Promise<Ports> => {
    const config:Config = await loadConfig();

    return {
        Database: new Mongo(config),
    };
};

export default initPorts;
