const db = require("../db.js");

class PostController {
  async createPost(req, res) {
    console.log("Create_Start");

    const { title, content, userId } = req.body;

    const newPost = await db.query(
      `INSERT INTO post (title, content, user_id) VALUES ($1,$2,$3) RETURNING *`,
      [title, content, userId]
    );
    res.json(newPost.rows[0]);
  }

  async getPost(req, res) {
    const posts = await db.query(`SELECT * FROM post`);
    console.log("getPost")
    res.json(posts.rows);
  }

  async getOnePost(req, res) {
    const id = req.params.id;
console.log("getOnePost",id)
    console.log("ID", id);
    const post = await db.query(`SELECT * FROM post WHERE user_id = $1`, [id]);
    res.json(post.rows[0]);
  }

  async getPostByUser(req, res) {
    const id = req.query.id;
console.log("getPostByUser")
    console.log("getPostByUser_ID", id);
    const post = await db.query(`SELECT * FROM post WHERE user_id = $1`, [id]);
    res.json(post.rows[0]);
  }

  async updatePost(req, res) {
    const { title, content, user_id } = req.body;
    const post = await db.query(
      `UPDATE post SET title = $1, content = $2 where user_id = $3 RETURNING *`,
      [title, content, user_id]
    );
    res.json(post.rows[0]);
  }

  async deletePost(req, res) {
    const id = req.query.id;
    await db.query(`DELETE FROM post  where id = $1`, [id]);
  }
}

module.exports = new PostController();
