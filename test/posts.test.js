const request = require("supertest");
const app = require("../index.js");
const Post = require("../models/Post.js");

describe("testing/posts", () => {
  //lo que pasaríamos por el body en el postman
  const post = {
    title: "Post 1",
    body: "Body post 1",
  };
  //cuando terminan los test vacía toda la colección de Posts
  afterAll(() => {
    return Post.deleteMany();
  });

  test("Create a post", async () => {
    // contamos los documentos que tenemos en nuestra colección de posts
    let postsCount = await Post.countDocuments({});
    expect(postsCount).toBe(0); //no deberían haber
    //creamos un post
    const res = await request(app).post("/create").send(post).expect(201);
    //volvemos a contar nuestra colección de posts
    postsCount = await Post.countDocuments({});
    expect(postsCount).toBe(1); // ahora debería haber un post
    expect(res.body.post._id).toBeDefined(); //ahora nuestro post debería tener un _id
    expect(res.body.post.createdAt).toBeDefined(); //ahora nuestro post debería tener un createdAt
    expect(res.body.post.updatedAt).toBeDefined(); //ahora nuestro post debería tener un updatedAt
  });
  test("Get posts", async () => {
    //hacemos la petición de get Posts
    const res = await request(app).get("/").expect(200);
    //los posts deberían venir en un array y lo comprobamos
    expect(res.body).toBeInstanceOf(Array);
  });
});
