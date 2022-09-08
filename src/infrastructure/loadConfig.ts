import { Config } from '@entities/config';
import { ApiError } from '@entities/common';
const getSanitizedConfig = (config:Config):Config => {
    for (const [ key, value ] of Object.entries(config)) {
        if (value === undefined || value === 'undefined') throw new ApiError('notFound', 'notFound', `Missing key ${key} in config.env`);

        if (typeof value === 'object'
            && Object.values(value).length === 0)
            throw new ApiError('notFound', 'notFound', `Missing values on ${key} configuration`);
    }

    return config;
};
const loadConfig = async ():Promise<Config> => {
    if (process.env.NODE_ENV === 'local') {
        await import('dotenv/config');
    }

    return getSanitizedConfig({
        NODE_ENV: `${process.env.NODE_ENV}`,
        databaseUrl: `${process.env.DB_URI}`,
        pokeApiBaseUrl: `${process.env.POKE_API_BASE_URL}`,
    });
};

export default loadConfig;

