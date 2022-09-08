import { ResponseCode } from '@entities/common';

const responsesCode:ResponseCode = {
    error: {
        notFound: {
            code: 404,
            userMessages: {
                notFound: {
                    code: 4041,
                    userMessage: {
                        en: "The requested data doesn't exist",
                        es: 'No existen los datos solicitados',
                    },
                },
            },
        },
        validations: {
            code: 422,
            userMessages: {
                validations: {
                    code: 4221,
                    userMessage: {
                        en: 'Validation Errors',
                        es: 'Errores de validación',
                    },
                },
            }
        },
        serverError: {
            code: 500,
            userMessages: {
                serverError: {
                    code: 5001,
                    userMessage: {
                        en: 'Try again later',
                        es: 'Intente de nuevo más tarde',
                    },
                    description: 'Unexpected server error',
                },
            },
        },
    },
};

export default responsesCode;