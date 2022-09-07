const response = ({ statusCode, body }) => ({
    statusCode,
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json',
    },
});

export default response;
