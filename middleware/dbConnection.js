'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Object holding all your connection strings
const connections = {}

module.exports = (opts) => {
  this.opts = _.cloneDeep(opts)
  const connect = async (dbName) => {
    dbName = dbName || this.opts;
    if (connections[dbName]) {
      // database connection already exist. Return connection object
      return connections[dbName]
    }
    // Get new connection
    connections[dbName] = await createNewConnection(dbName)

    connections[dbName].once('open', function callback() {
      console.log('connect() MongoDB connected successfully')
    })
    return connections[dbName]
  }

  return { connect }
}

function createNewConnection(dbName) {
  let url = `mongodb://127.0.0.1:27017/${dbName}`
  console.log('connect() url=%s', url);

  // Get mongo options
  const mongoOptions = { "useNewUrlParser": true }

  console.log('connect() creating a connection to %s', dbName)
  // Create & return new connection
  return mongoose.createConnection(url, mongoOptions)
}
