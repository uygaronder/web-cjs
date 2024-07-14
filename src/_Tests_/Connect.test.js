const request = require('supertest');
const app = require('../app'); // Replace '../app' with the path to your app file

describe('API Connection Test', () => {
    it('should connect to the API', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'API connected' });
    });
});