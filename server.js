
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./database/db');
const router = require('./routes/router');


app.use(express.json());

app.use(router);

dbConnect();

app.listen(process.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`);
})
