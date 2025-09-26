const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

test('create -> get -> update -> delete flow', async () => {
  const createRes = await request(app).post('/api/bugs').send({ title: 'Test bug', description: 'desc' });
  expect(createRes.status).toBe(201);
  expect(createRes.body.title).toBe('Test bug');
});
