const request = require('supertest');
const app = require('../index');

describe('API Connection', () => {
    it('should successfully connect to the API', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});