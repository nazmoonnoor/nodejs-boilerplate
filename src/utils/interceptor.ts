export function mockRequest(): any {
    let req: any;
    req = {
        body: jest.fn().mockReturnValue(req),
        params: jest.fn().mockReturnValue(req),
    };
    return req;
}

export function mockResponse(): any {
    let res: any;
    res = {
        send: jest.fn().mockReturnValue(res),
        status: jest.fn().mockReturnValue(res),
        json: jest.fn().mockReturnValue(res),
    };
    return res;
}
