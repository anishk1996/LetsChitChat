'use strict'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('../models/users-v_1_0_0')

const saveUser = async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await global.db.connect('chatApplication');
        const usersCollection = await db.model('users');
        let responseData;
        await usersCollection.insertMany([data])
          .then(results => {
            responseData = results
          })
        return resolve(responseData);
      } catch (error) {
        console.log('Error from repository for inserting data into users collection', JSON.stringify(error));
        return reject(error);
      }
    });
  }

  const getAllUserData = async (limit, projection) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await global.db.connect('chatApplication');
        const usersCollection = await db.model('users');
        let responseData = await usersCollection.find({},projection).limit(limit).sort({"_id": -1})
        return resolve(responseData);
      } catch (error) {
        console.log('Error from repository in fetching data from chats collection', JSON.stringify(error));
        return reject(error);
      }
    });
  }

  const findUser = async (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await global.db.connect('chatApplication');
        const usersCollection = await db.model('users');
        let responseData = await usersCollection.find({email: email}).sort({"_id": -1})
        return resolve(responseData);
      } catch (error) {
        console.log('Error from repository in fetching data from chats collection', JSON.stringify(error));
        return reject(error);
      }
    });
  }

  module.exports = {
    saveUser,
    getAllUserData,
    findUser
  }