const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo, newTodoId;
let nonExistingTodoId = "63b77789208d4daba8e53fe4";
const testData = { title: "Make integration test to PUT", done: true };

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
    const res = await request(app).get(endpointUrl + nonExistingTodoId);
    expect(res.statusCode).toBe(404);
  });

  it("POST" + endpointUrl, async () => {
    const res = await request(app).post(endpointUrl).send(newTodo);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newTodo.title);
    expect(res.body.done).toBe(newTodo.done);
    newTodoId = res.body._id;
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
  it("PUT" + endpointUrl, async () => {
    const res = await request(app)
      .put(endpointUrl + newTodoId)
      .send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
  it("PUT 404" + endpointUrl, async () => {
    const testData = { title: "Make integration test to PUT", done: true };
    const res = await request(app)
      .put(endpointUrl + nonExistingTodoId)
      .send(testData);
    expect(res.statusCode).toBe(404);
  });
  test("DELETE" + endpointUrl, async () => {
    const res = await request(app)
      .delete(endpointUrl + newTodoId)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
  test("DELETE 404" + endpointUrl, async () => {
    const res = await request(app)
      .delete(endpointUrl + nonExistingTodoId)
      .send();
    expect(res.statusCode).toBe(404);
  });
});
