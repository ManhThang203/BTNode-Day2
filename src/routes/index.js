const express = require("express");
const postsRoute = require("./posts.route");
const commentsRoute = require("./comments.route");

const router = express.Router();

router.use("/posts", postsRoute);
router.use("/comments", commentsRoute);

module.exports = router;
