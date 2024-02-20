const APIGatewayRequest = ({
    body,
    method,
    path = '',
    queryStringObject,
    pathParametersObject,
    stageVariables = null,
}) => {
    const request = {
        body: body ? JSON.stringify(body) : null,
        headers: {},
        multiValueHeaders: {},
        httpMethod: method,
        isBase64Encoded: false,
        path,
        pathParameters: pathParametersObject || null,
        queryStringParameters: queryStringObject || null,
        multiValueQueryStringParameters: null,
        stageVariables,
        requestContext: {
            accountId: '',
            apiId: '',
            httpMethod: method,
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
            },
            path,
            stage: '',
            requestId: '',
            requestTimeEpoch: 3,
            resourceId: '',
            resourcePath: '',
        },
        resource: '',
    };
    return request;
};

const isApiGatewayResponse = response => {
    const { body, headers, statusCode } = response;

    if (!body || !headers || !statusCode) return false;
    if (typeof statusCode !== 'number') return false;
    if (typeof body !== 'string') return false;
    if (!isCorrectHeaders(headers)) return false;
    return true;
};

const isCorrectHeaders = headers => {
    if (headers['Content-Type'] !== 'application/json') return false;
    // if (headers['Access-Control-Allow-Methods'] !== '*') return false;
    // if (headers['Access-Control-Allow-Origin'] !== '*') return false;
    return true;
};

module.exports = {
    APIGatewayRequest,
    isApiGatewayResponse,
    isCorrectHeaders,
};
