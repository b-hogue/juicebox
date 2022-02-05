const express = require('express');
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

const { getAllPosts } = require('../db');

// UPDATE
postsRouter.get('/', async (req, res, next) => {
    try {
    const posts = await getAllPosts();

    res.send({
        posts
    });
    }
    catch (error){
    console.error(error);
    next(error);
    }
 
});
module.exports = postsRouter;