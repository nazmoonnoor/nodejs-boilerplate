"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
function mockRequest() {
    let req;
    req = {
        body: jest.fn().mockReturnValue(req),
        params: jest.fn().mockReturnValue(req),
    };
    return req;
}
exports.mockRequest = mockRequest;
function mockResponse() {
    let res;
    res = {
        send: jest.fn().mockReturnValue(res),
        status: jest.fn().mockReturnValue(res),
        json: jest.fn().mockReturnValue(res),
    };
    return res;
}
exports.mockResponse = mockResponse;
