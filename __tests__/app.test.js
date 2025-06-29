const request = require('supertest');
const app = require('../index');

jest.mock('../utils/db', () => {
  return {
    connectDB: jest.fn().mockResolvedValue({
      request: () => ({
        query: jest.fn().mockResolvedValue({ recordset: [{ id: 1, section: 'sec', content: 'text', type: 't' }] }),
        input: jest.fn().mockReturnThis()
      })
    }),
    sql: { Int: 'Int', NVarChar: 'NVarChar' }
  };
});

describe('API Endpoints', () => {
  it('GET / should return root message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('encreage-api-full-send🚀');
  });

  it('GET /api/content should return content list', async () => {
    const res = await request(app).get('/api/content');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});