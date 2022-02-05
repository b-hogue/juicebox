// api/users.js
const express = require('express');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

const { getAllUsers } = require('../db');

// UPDATE
usersRouter.get('/', async (req, res, next) => {
    try {
    const users = await getAllUsers();

    res.send({
        users
    });
    }
    catch (error){
    console.error(error);
    next(error);
    }
 
});
module.exports = usersRouter;