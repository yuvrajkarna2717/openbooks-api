import request from "supertest";
import { app } from "../server.js";
import { describe, it, expect } from "vitest";

describe("Rate Limiting Tests", () => {
  it("should allow up to 100 requests", async () => {
    for (let i = 0; i < 100; i++) {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
    }
  });

  it("should block the 6th request", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app).get("/");
    }
    const res = await request(app).get("/");
    expect(res.status).toBe(429);
    expect(res.body.message).toBe("Too many requests, please try again later.");
  });
});
