import { Config } from '@entities/config';
import mongoose from 'mongoose';
import create from './models';

const connection = (config:Config) => {
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
        schemas: create(),
    };
};

export default connection;