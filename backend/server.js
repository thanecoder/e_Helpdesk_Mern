const express = require("express");
const path = require('path')
const dotenv = require("dotenv").config({path:path.resolve(__dirname, './config/config.env')});
const colors = require("colors");
const connectDB = require('./config/db');
const users = require('./routes/userRoutes');
const tickets = require('./routes/ticketRoutes.js');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/ehelpdesk/users', users);
app.use('/api/ehelpdesk/tickets', tickets);
const PORT = process.env.PORT;
app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);