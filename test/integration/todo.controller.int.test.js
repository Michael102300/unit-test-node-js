const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

describe(endpointUrl, () => {
  test("GET" + endpointUrl, async () => {
    const res = await request(app).get(endpointUrl);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0].title).toBeDefined();
    expect(res.body[0].done).toBeDefined();
  });
  it("POST" + endpointUrl, async () => {
    const res = await request(app).post(endpointUrl).send(newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newTodo.title);
    expect(res.body.done).toBe(newTodo.done);
  });
  it("should return error 500 on malformed data with POST", async () => {
    const res = await request(app)
      .post(endpointUrl)
      .send({ title: "Missing done property" });
    expect(res.statusCode).toBe(500);
    expect(res.body).toStrictEqual({
      message: "Todo validation failed: done: Path `done` is required.",
    });
  });
});
