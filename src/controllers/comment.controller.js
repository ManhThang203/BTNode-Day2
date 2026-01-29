const CommentModel = require("../models/comment.model");

class CommentController {
  static getAllComments(req, res) {
    const comments = CommentModel.getAll();
    res.json(comments);
  }

  static getCommentById(req, res) {
    const { id } = req.params;
    const comment = CommentModel.getById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  }

  static createComment(req, res) {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res
        .status(400)
        .json({ message: "PostId and content are required" });
    }

    const newComment = CommentModel.create({ postId, content });
    res.status(201).json(newComment);
  }

  static updateComment(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const updatedComment = CommentModel.update(id, { content });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(updatedComment);
  }

  static deleteComment(req, res) {
    const { id } = req.params;
    const deleted = CommentModel.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(204).send();
  }
}

module.exports = CommentController;
