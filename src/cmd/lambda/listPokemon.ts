import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import response from '@utils/response';
import PokemonService from '@services/pokemon';
import { PokemonServiceParams } from '@entities/params';
import initPorts from '@infrastructure/index';
import errorHandler from '@utils/errorHandler';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(JSON.stringify(event, null, 2));
        const Ports = await initPorts();
        const params:Omit<PokemonServiceParams, 'Ports'> = event.queryStringParameters ?? {};
        const pokemonService = new PokemonService({ ...params, Ports });
        const result = await pokemonService.listPokemon();

        return response({ statusCode: 200, body: result });
    } catch (error) {
        const { code, response: body } = errorHandler(error);

        return response({ statusCode: code, body });
    }
};