'use strict'
const _ = require('lodash');
const { saveUser, findUser } = require('../repository/users')

const saveUserDetails = async (req) => {
    try {
        console.log('Enter in saveUserDetails: %j', req.body);
        let data = req.body;
        let result = await saveUser(data);
        console.log('response from db: %j', result);
        return result
    } catch (error) {
        console.log('Error at saveUserDetails', error)
        console.log('Error at saveUserDetails', JSON.stringify(error))
        return error
    }
}

const findUserDetails = async (req) => {
    try {
        console.log('Enter in findUserDetails: %j', req.body);
        let data = req.body;
        let result = await findUser(data);
        console.log('response from db: %j', result);
        return result
    } catch (error) {
        console.log('Error at findUserDetails', error)
        console.log('Error at findUserDetails', JSON.stringify(error))
        return error
    }
}

module.exports = {
    saveUserDetails,
    findUserDetails
}
