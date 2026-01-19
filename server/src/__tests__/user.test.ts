// __tests__/user.test.ts

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
import User from '../models/User.models';
import { connectTestDB, disconnectTestDB } from './setup/db';

beforeAll(async() => await connectTestDB());
afterAll (async() => await disconnectTestDB());

describe('GET /user', () => {
  it("should return 200 and user data", async() => {
    await User.create({
      uid,
      name: 'test',
      email: 'abc@test.com',
    });

    const res = await request(app).get('/user');
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      userData: {
        uid: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
      }
    });
  });
});