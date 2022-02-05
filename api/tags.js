const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

const { getAllTags } = require('../db');

// UPDATE
tagsRouter.get('/', async (req, res, next) => {
   // try {
    const tags = await getAllTags();

    res.send({
        tags
    });
    // }
    // catch (error){
    // console.error(error);
    // next(error);
    // }
 
});
module.exports = tagsRouter;