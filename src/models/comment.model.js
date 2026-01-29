const { loadDB, saveDB } = require("../../utils/jsonDB");

const RESOURCE_NAME = "comments";

class CommentModel {
  static getAll() {
    return loadDB(RESOURCE_NAME);
  }

  static getById(id) {
    const comments = loadDB(RESOURCE_NAME);
    return comments.find((comment) => comment.id === id);
  }

  static create(commentData) {
    const comments = loadDB(RESOURCE_NAME);
    const newComment = {
      id: Date.now().toString(),
      postId: commentData.postId,
      content: commentData.content,
      createdAt: new Date().toISOString(),
    };
    comments.push(newComment);
    saveDB(RESOURCE_NAME, comments);
    return newComment;
  }

  static update(id, commentData) {
    const comments = loadDB(RESOURCE_NAME);
    const index = comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return null;
    }

    comments[index] = {
      ...comments[index],
      content: commentData.content,
    };

    saveDB(RESOURCE_NAME, comments);
    return comments[index];
  }

  static delete(id) {
    const comments = loadDB(RESOURCE_NAME);
    const index = comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    comments.splice(index, 1);
    saveDB(RESOURCE_NAME, comments);
    return true;
  }
}

module.exports = CommentModel;
