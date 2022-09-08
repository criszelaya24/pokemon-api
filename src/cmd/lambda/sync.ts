import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import response from '@utils/response';
import { SyncServiceParams } from '@entities/params';
import initPorts from '@infrastructure/index';
import SyncService from '@services/sync';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        const Ports = await initPorts();
        const params:Omit<SyncServiceParams, 'Ports'> = event.queryStringParameters ?? {};

        const syncService = new SyncService({ ...params, Ports });

        const result = await syncService.syncDatabase();

        return response({ statusCode: 200, body: result });
    } catch (error) {
        return response({ statusCode: 500, body: error });
    }
};