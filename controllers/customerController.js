const express = require('express');
const app = express();
const joi = require('joi');
const Customer = require('../models/customers');
const customerDto = require('../dto/userdto');
const jwt = require('jsonwebtoken');
const JWTService = require('../services/jwt');

const customerController = {
    home(req, res, next) {
        res.send('Welcome to the home page');
        },
    async register(req, res, next) {
    
        const regSchema = joi.object({
            name: joi.string().min(3).max(30).required(),
            email: joi.string().email().required(),
            balance: joi.number().required(),
            dateOfBirth: joi.date()
        });
        // const date = new Date(req.body.dateOfBirth)
        // console.log(req.body.dateOfBirth);
        // console.log(date);
        const result = regSchema.validate(req.body);
    
    
        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        let accessToken;
        let refreshToken;
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            balance: req.body.balance,
            dateOfBirth: req.body.dateOfBirth
        });
        accessToken = JWTService.signAccessToken({id: customer._id, email: customer.email}, '1h');
        refreshToken = JWTService.signRefreshToken({id: customer._id, email: customer.email}, '10h');

        // store refresh token in db
        JWTService.storeRefreshToken(refreshToken, customer._id);
        //store access token in cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        });
        // store refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 10 * 60 * 60 * 1000,
            httpOnly: true
        });
        const userDto = new customerDto(customer);
        await customer.save()
        .then(res.json({user: userDto, auth: true, token: accessToken, refreshToken: refreshToken}))
        .catch(err => res.send(err.message));
        
    },
    async login(req,res,next) {
        const schema = joi.object({
            email: joi.string().email().required(),
            balance: joi.number().required()
        });

        const result = schema.validate(req.body);

        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        let custom = await Customer.exists({email: req.body.email, balance: req.body.balance});

        if(custom)
        {
            let accessToken;
            let refreshToken;
            accessToken = JWTService.signAccessToken({id: customer._id, email: customer.email}, '1h');
            refreshToken = JWTService.signRefreshToken({id: customer._id, email: customer.email}, '10h');

            // store refresh token in db
            JWTService.storeRefreshToken(refreshToken, customer._id);
            //store access token in cookie
            res.cookie('accessToken', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            });
            // store refresh token in cookie
            res.cookie('refreshToken', refreshToken, {
                maxAge: 10 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.status(200).json(custom);
        }
        else
        {
            res.send('Login Failed');
        }



    },
    async customers(req, res, next) {
        const customers = await Customer.find();
        res.send(customers);
        
    },
    async purchase(req, res, next) {

        const customer = await Customer.findOne({email: req.params.email});
        if(!customer) return res.status(404).send('Customer not found');

        customer.balance = customer.balance - req.body.amount;
        await customer.save()
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
    }
};







module.exports = customerController;