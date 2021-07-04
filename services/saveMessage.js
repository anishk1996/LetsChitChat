'use strict'

const { insertMultipleChatsData } = require('../repository/chats')
const saveMessagesDetails = async (req) => {
    try {
        console.log('Enter in saveMessagesDetails: %j', req.body);
        let data = req.body;
        let dataArr = [];
        if(data.length === 1) {
            dataArr.push(data);
        } else {
            dataArr = data;
        }
        let result = await insertMultipleChatsData(dataArr)
        console.log('response from db: %j', result);
        return result
    } catch (error) {
        console.log('Error at saveMessagesDetails', error)
        console.log('Error at saveMessagesDetails', JSON.stringify(error))
        return error
    }
}

module.exports = {
    saveMessagesDetails
}
