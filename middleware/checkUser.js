'use strict'
const url = require('url');
const httpContext = require('express-http-context');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('../models/users-v_1_0_0')

/**
 * Return a middleware that check for username in users collection for authenticated login
 *
 * @return {function} Express middleware.
 */
module.exports = async function validateUserFromDb (req, res) {
    if (req.query && req.query['u'] !== undefined) {
        let name = req.query['u'];
        console.log('Login check', req.query);
        let query = {
            'name': name
        };
        const db = await global.db.connect('chatApplication');
        const usersCollection = await db.model('users');
        let result = await usersCollection.find(query);
        console.log('User who tried to login has result', result);
        if (result && result.length !== 0) {
            return true;
        } else {
            console.log('unauthorised user');
            return false;
        }
    } else {
        console.log('unauthorised user');
        return false;
    }
}
