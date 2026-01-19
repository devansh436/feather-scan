// __tests__/health.test.ts

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

describe('GET /health', () => {
  it("should return ok", async () => {
    const res = await request(app).get('/health');
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  })
});
