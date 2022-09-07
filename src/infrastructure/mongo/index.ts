import { Config } from '@entities/config';
export default class Mongo {

    private config:Config
    constructor(config:Config) {
        this.config = config;
    }

}