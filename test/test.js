const { APIGatewayRequest, isApiGatewayResponse, isCorrectHeaders } = require('../index.js');

describe('APIGatewayRequest function', () => {
  test('should create a valid API Gateway request object', () => {
    const request = APIGatewayRequest({
      body: { key: 'value' },
      method: 'POST',
      path: '/example',
      queryStringObject: { key: 'value' },
      pathParametersObject: { id: '123' },
      stageVariables: { stage: 'dev' },
    });

    expect(request).toEqual({
      body: '{"key":"value"}',
      headers: {},
      multiValueHeaders: {},
      httpMethod: 'POST',
      isBase64Encoded: false,
      path: '/example',
      pathParameters: { id: '123' },
      queryStringParameters: { key: 'value' },
      multiValueQueryStringParameters: null,
      stageVariables: { stage: 'dev' },
      requestContext: {
        accountId: '',
        apiId: '',
        httpMethod: 'POST',
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
        path: '/example',
        stage: '',
        requestId: '',
        requestTimeEpoch: 3,
        resourceId: '',
        resourcePath: '',
      },
      resource: '',
    });
  });
});

describe('isApiGatewayResponse function', () => {
  test('should return true for a valid API Gateway response', () => {
    const response = {
      body: '{"key":"value"}',
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
    };

    expect(isApiGatewayResponse(response)).toBe(true);
  });

  test('should return false if body or headers or statusCode is missing', () => {
    const response = {};

    expect(isApiGatewayResponse(response)).toBe(false);
  });

  test('should return false if statusCode is not a number', () => {
    const response = {
      body: '{"key":"value"}',
      headers: { 'Content-Type': 'application/json' },
      statusCode: '200',
    };

    expect(isApiGatewayResponse(response)).toBe(false);
  });

  test('should return false if body is not a string', () => {
    const response = {
      body: { key: 'value' },
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
    };

    expect(isApiGatewayResponse(response)).toBe(false);
  });

  test('should return false if headers are incorrect', () => {
    const response = {
      body: '{"key":"value"}',
      headers: { 'Content-Type': 'text/plain' },
      statusCode: 200,
    };

    expect(isApiGatewayResponse(response)).toBe(false);
  });
});

describe('isCorrectHeaders function', () => {
  test('should return true for correct headers', () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    expect(isCorrectHeaders(headers)).toBe(true);
  });

  test('should return false for incorrect headers', () => {
    const headers = {
      'Content-Type': 'text/plain',
    };

    expect(isCorrectHeaders(headers)).toBe(false);
  });
});
