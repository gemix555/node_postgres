const Router = require("express");
const router = new Router();

const postController = require("../controllers/post.controller.js");

router.post("/post", postController.createPost);
//router.get("/post", postController.getPost);
router.get("/post/:id", postController.getOnePost);
router.get("/post", postController.getPostByUser);
router.put("/post/:id", postController.updatePost);
router.delete("/post/:id", postController.deletePost);

module.exports = router;
