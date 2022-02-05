const express = require('express');
const server = express();
server.use(express.json())
const morgan = require('morgan');
const { client } = require('./db');
client.connect();

server.use(morgan('dev'));
require("dotenv").config()
const { PORT } = process.env;



server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });
  const apiRouter = require('./api');
  server.use('/api', apiRouter);
server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

// stuff above here



// stuff below here

