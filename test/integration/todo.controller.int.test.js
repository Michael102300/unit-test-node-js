const request = require("supertest");
const { response } = require("../../app");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo;

describe(endpointUrl, () => {
  test("GET" + endpointUrl, async () => {
    const res = await request(app).get(endpointUrl);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0].title).toBeDefined();
    expect(res.body[0].done).toBeDefined();
    firstTodo = res.body[0];
  });

  test("GET by id" + endpointUrl + ":todoId", async () => {
    const res = await request(app).get(endpointUrl + firstTodo._id);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(firstTodo.title);
    expect(res.body.done).toBe(firstTodo.done);
  });

  test("GET todoById doesnt exits" + endpointUrl + ":todoId", async () => {
    const res = await request(app).get(
      endpointUrl + "63b77789208d4daba8e53fe4"
    );
    expect(res.statusCode).toBe(404);
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
