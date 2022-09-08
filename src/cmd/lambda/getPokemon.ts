import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import response from '@utils/response';
import PokemonService from '@services/pokemon';
import initPorts from '@infrastructure/index';
import errorHandler from '@utils/errorHandler';
import { ApiError } from '@entities/common';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(JSON.stringify(event, null, 2));
        const Ports = await initPorts();
        const _id = event.pathParameters?._id ?? '';
        const pokemonService = new PokemonService({ Ports });

        if (!_id.match(/^[0-9a-fA-F]{24}$/))
            throw new ApiError('validations', 'validations', `${_id} is not a valid ID`);

        const result = await pokemonService.getPokemon({ _id });

        return response({ statusCode: 200, body: result });
    } catch (error) {
        const { code, response: body } = errorHandler(error);

        return response({ statusCode: code, body });
    }
};