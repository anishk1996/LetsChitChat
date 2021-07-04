'use strict'
const _ = require('lodash');
const { getChatsData } = require('../repository/chats')
const getMessagesDetails = async (req) => {
    try {
        console.log('Enter in getMessagesDetails: %j', req.body);
        let data = req.query && req.query['limit'] ? req.query['limit'] : 5;
        data = parseInt(data);
        let projection = {
            name: 1,
            message: 1,
            created_on: 1,
            _id: 0
        }
        let result = await getChatsData(data, projection);
        console.log('response from db: %j', result);
        return result
    } catch (error) {
        console.log('Error at getMessagesDetails', error)
        console.log('Error at getMessagesDetails', JSON.stringify(error))
        return error
    }
}

module.exports = {
    getMessagesDetails
}
