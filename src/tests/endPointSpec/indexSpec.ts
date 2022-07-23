// import myFunc from '../index';

//end point
import supertest from 'supertest';
import index from '../../index';

const request = supertest(index.app);
describe('Test endpoint responses', () => {
  it('gets the api image endpoint', async () => {
    const response = await request.get(
      '/image?filename=icelandwaterfall&width=200&height=600'
    );
    expect(response.status).toBe(200);
  });
});
