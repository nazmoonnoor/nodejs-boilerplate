import controller from '../src/controllers/domainController';
import { mockRequest, mockResponse } from '../src/utils/interceptor';

describe("Check method \'domainController\' ", () => {
  test('should return 200 and return correct value', async () => {
    let req = mockRequest();
    req.params.id = 1;
    const res = mockResponse();

    await controller.createDomainHandler(req, res);

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith('Hello i am todo controller');
  });

  test('should 404 and return correct value', async () => {
    let req = mockRequest();
    req.params.id = null;
    const res = mockResponse();

    await controller.createDomainHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });
});