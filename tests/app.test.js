const request = require("supertest");

const app = require("../src/app");

describe("POST /api/v1/records", () => {
  describe("given request payload is in desired format", () => {
    test("should response with success", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2015-01-01",
        endDate: "2016-01-01",
        minCount: 0,
        maxCount: 100,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("code", 0);
      expect(response.body).toHaveProperty("msg", "success");
      expect(response.body).toHaveProperty("records");
    });
  });

  describe("given request payload is in desired format but not match to any records", () => {
    test("should response with a code field and not found message", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2015-01-01",
        endDate: "2016-01-01",
        minCount: 0,
        maxCount: 0,
      });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("code", 1);
      expect(response.body).toHaveProperty("msg", "Not found");
    });
  });

  describe("given request payload's date format is wrong", () => {
    test("should response with bad request to [DD-MM-YYYY]", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "01-01-2016",
        endDate: "2016-01-01",
        minCount: 0,
        maxCount: 100,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe(
        '"startDate" must be in [YYYY-MM-DD] format'
      );
    });

    test("should response with bad request to [YYYY/MM/DD]", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2015/01/01",
        endDate: "2016-01-01",
        minCount: 0,
        maxCount: 100,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe(
        '"startDate" must be in [YYYY-MM-DD] format'
      );
    });
  });

  describe("given request payload's count range format is wrong", () => {
    test("should response with bad request to string input", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2015-01-01",
        endDate: "2016-01-01",
        minCount: "s",
        maxCount: 100,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('"minCount" must be a number');
    });

    test("should response with bad request to float input", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2015-01-01",
        endDate: "2016-01-01",
        minCount: 0.1,
        maxCount: 100,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('"minCount" must be an integer');
    });
  });

  describe("given request payload has extra fields", () => {
    test("should response with bad request to extra fields", async () => {
      const response = await request(app).post("/api/v1/records").send({
        startDate: "2015-01-01",
        endDate: "2016-01-01",
        minCount: 0,
        maxCount: 100,
        extra: "extra",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('"extra" is not allowed');
    });
  });
});
