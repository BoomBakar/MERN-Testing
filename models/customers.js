const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    balance: { type: Number, required: true },
    dateOfBirth: { type: Date }
},

    { timestamps: true}

);

const Customer = mongoose.model('Customer', customerSchema, 'customers');

module.exports = Customer;
