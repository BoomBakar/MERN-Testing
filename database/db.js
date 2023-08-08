const express = require('express');
const { ServerDescription } = require('mongodb');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}


module.exports = dbConnect;
