import { ApiError } from '@entities/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AxiosResponse<T = any> extends Promise<T> {}
}

export default class Axios {

    protected readonly instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });

        this._initializeResponseInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.instance?.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    };

    private _handleResponse = ({ data }: AxiosResponse) => data;

    protected _handleError = (error: any) => Promise.reject(new ApiError('notFound', 'notFound', error));

    protected async get<T>(url: string, config?: any): Promise<T> {
        const response = await this.instance.get(url, { ...config });

        return response as T;
    }

}
