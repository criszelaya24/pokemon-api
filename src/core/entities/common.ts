export class ApiError {

    key: string;
    userMessage?: string;
    info?: unknown;

    constructor(key: string, userMessage?: string, info?: unknown) {
        this.key = key;
        this.userMessage = userMessage;
        this.info = info;
    }

}