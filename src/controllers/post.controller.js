const PostModel = require("../models/post.model");

class PostController {
  static getAllPosts(req, res) {
    const posts = PostModel.getAll();
    res.json(posts);
  }

  static getPostById(req, res) {
    const { id } = req.params;
    const post = PostModel.getById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  }

  static createPost(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newPost = PostModel.create({ title, content });
    res.status(201).json(newPost);
  }

  static updatePost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const updatedPost = PostModel.update(id, { title, content });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  }

  static deletePost(req, res) {
    const { id } = req.params;
    const deleted = PostModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(204).send();
  }
}

module.exports = PostController;
