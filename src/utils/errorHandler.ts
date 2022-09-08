import { ErrorResponse } from '@entities/common';
import responsesCode from '@utils/responseCode';

const errorHandler = (error: any): ErrorResponse => {
    const { code, userMessage, description } = responsesCode
        .error[error.key ?? 'serverError'].userMessages[error.userMessage ?? 'serverError'];

    return {
        code,
        response: {
            extra: { description, info: error.info ?? error },
            error: { ...userMessage },
        },
    };
};

export default errorHandler;