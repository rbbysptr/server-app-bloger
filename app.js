if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require("express");
const router = require("./routes");
const app = express();
const errorHandler = require('./middleware/errorHandler');

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());//parsing body bentuk json

//endpoints
app.use(router);
app.use(errorHandler);

//port dan listen pindah ke bin/www

module.exports = app;