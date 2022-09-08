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
        serverError: {
            code: 500,
            userMessages: {
                serverError: {
                    code: 5001,
                    userMessage: {
                        original: 'Try again later',
                        es: 'Intente de nuevo más tarde',
                        pt: 'Tente novamente mais tarde',
                        ja: 'あとでもう一度試してみてください',
                    },
                    description: 'Unexpected server error',
                },
            },
        },
    },
};

export default responsesCode;