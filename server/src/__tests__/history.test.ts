// __tests__/history.test.ts

// Intercept actual middleware with mock middleware
// attach 'user' property to HTTP reqs
import { uid } from './setup/auth';

jest.mock("../middlewares/auth", () => ({
  __esModule: true,
  default: (req: any, _res: any, next: any) => {
    req.user = { uid };
    next();
  },
}));

import request from 'supertest';
import app from '../app';
import { connectTestDB, disconnectTestDB } from './setup/db';
import History from '../models/History.models';

// db connect & disconnect
beforeAll(async () => {
  await connectTestDB();
});
afterAll(async () => {
  await disconnectTestDB();
});

// GET
describe('GET /history', () => {
  it("should return 200 for authenticated user", async () => {
    const res = await request(app).get('/history');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      page: expect.any(Number),
      limit: expect.any(Number),
      totalCount: expect.any(Number),
      userHistory: expect.any(Array),
    })
  });
});


// DELETE
describe('DELETE /history', () => {
  it("should return 204 and delete user's own record", async () => {
    const record = await History.create({
      uid,
      modelType: "bird",
      prediction: {
        label: 'Bald Eagle',
        confidence: 100,
      }
    });
    const res = await request(app).delete(`/history/${record._id}`);

    expect(res.status).toBe(204);

    const found = await History.findById(record._id);
    expect(found).toBeNull();
  });

  it("should return 404 when deleting non-existent record", async () => {
    const fakeId = '000000000000000000000000';
    const res = await request(app).delete(`/history/${fakeId}`);

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      error: "Record not found"
    });
  });
});