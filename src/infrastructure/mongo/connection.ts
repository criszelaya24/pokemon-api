import { Config } from '@entities/config';
import { MongoConnection } from '@entities/database';
import mongoose from 'mongoose';
import create from './models';

const connection = (config:Config):MongoConnection => {
    return {
        getConnection() {
            return mongoose.connection;
        },
        connect() {
            // Open Connection to Mongo DB
            return mongoose.connect(config.databaseUrl, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        },
        close() {
            return mongoose.connection.close();
        },
        models: create(),
    };
};

export default connection;