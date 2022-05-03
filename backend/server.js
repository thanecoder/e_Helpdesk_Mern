const express = require("express");
const colors = require("colors");
const path = require('path')
const dotenv = require("dotenv");
const morgan = require('morgan');
const connectDB = require('./config/db');
const { verifyJSONToken } = require('./middlewares/authMiddleware.js');
const { errorHandler } = require('./middlewares/errorMiddleware');
const users = require('./routes/userRoutes');
const tickets = require('./routes/ticketRoutes.js');


dotenv.config({path:path.resolve(__dirname, './config/config.env')})
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
connectDB();

app.use('/ehelpdesk/users', users);

app.use(verifyJSONToken);
app.use('/ehelpdesk/tickets', tickets);

app.use(errorHandler);

app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
);