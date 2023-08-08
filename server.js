
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnect = require('./database/db');

app.get('/', (req,res) => {
    res.send('hello world');
})

dbConnect();

app.listen(process.env.PORT , () => {
    console.log(`server is running on port ${process.env.PORT}`);
})
