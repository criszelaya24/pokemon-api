import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import response from '@utils/response';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        const {
            requestContext: { httpMethod },
        } = event;

        return response({ statusCode: 200, body: { data: true, httpMethod } });
    } catch (error) {
        return response({ statusCode: 500, body: error });
    }
};