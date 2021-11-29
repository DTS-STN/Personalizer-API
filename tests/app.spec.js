const request = require("supertest");
const app = require("../src/app");
const httpStatus = require("http-status");

describe("app test", () => {
  it("should test that server is running", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      status: "server is up",
    });
  });

  it("should test that api sending 404 for invalid url", async () => {
    const response = await request(app).get("/test404");
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toEqual({
      code: httpStatus.NOT_FOUND,
      message: "Not found",
    });
  });

  it("should test that invalid input", async () => {
    const response = await request(app).get("/api/v1");
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });

  it("should test that province, month and language parameters are missing", async () => {
    const response = await request(app).get("/api/v1/recommendation");
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      code: httpStatus.BAD_REQUEST,
      message: "province is required, month is required, language is required",
    });
  });

  it("should test that score is missing", async () => {
    const response = await request(app).patch(
      "/api/v1/recommendation/reward/32323"
    );
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      code: httpStatus.BAD_REQUEST,
      message: "score is required",
    });
  });

  it("should test that eventId parameter is missing", async () => {
    const response = await request(app).patch("/api/v1/recommendation/reward/");
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
});
