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
    },
};

export default responsesCode;