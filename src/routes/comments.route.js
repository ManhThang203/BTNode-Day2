const express = require("express");
const CommentController = require("../controllers/comment.controller");

const router = express.Router();

router.get("/", CommentController.getAllComments);
router.get("/:id", CommentController.getCommentById);
router.post("/", CommentController.createComment);
router.put("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.deleteComment);

module.exports = router;
