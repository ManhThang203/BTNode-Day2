require("module-alias/register");
const { loadDB, saveDB } = require("@utils/jsonDB");

const RESOURCE_NAME = "posts";

class PostModel {
  static getAll() {
    return loadDB(RESOURCE_NAME);
  }

  static getById(id) {
    const posts = loadDB(RESOURCE_NAME);
    return posts.find((post) => post.id === id);
  }

  static create(postData) {
    const posts = loadDB(RESOURCE_NAME);
    const newPost = {
      id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    saveDB(RESOURCE_NAME, posts);
    return newPost;
  }

  static update(id, postData) {
    const posts = loadDB(RESOURCE_NAME);
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
      return null;
    }

    posts[index] = {
      ...posts[index],
      title: postData.title,
      content: postData.content,
    };

    saveDB(RESOURCE_NAME, posts);
    return posts[index];
  }

  static delete(id) {
    const posts = loadDB(RESOURCE_NAME);
    const index = posts.findIndex((post) => post.id === id);

    if (index === -1) {
      return false;
    }

    posts.splice(index, 1);
    saveDB(RESOURCE_NAME, posts);
    return true;
  }
}

module.exports = PostModel;
