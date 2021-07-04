'use strict'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('../models/chats-v_1_0_0')

const insertMultipleChatsData = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await global.db.connect('chatApplication');
        const usersCollection = await db.model('chats');
        let responseData;
        await usersCollection.insertMany(data)
          .then(results => {
            responseData = results
          })
        return resolve(responseData);
      } catch (error) {
        console.log('Error from repository for inserting data into chats collection', JSON.stringify(error));
        return reject(error);
      }
    });
  }

  const getChatsData = async (limit, projection) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await global.db.connect('chatApplication');
        const usersCollection = await db.model('chats');
        let responseData = await usersCollection.find({},projection).limit(limit).sort({"_id": -1})
        return resolve(responseData);
      } catch (error) {
        console.log('Error from repository in fetching data from chats collection', JSON.stringify(error));
        return reject(error);
      }
    });
  }

  module.exports = {
    insertMultipleChatsData,
    getChatsData
  }