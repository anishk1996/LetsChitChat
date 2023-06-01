'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-long')(mongoose)
var SchemaTypes = mongoose.Schema.Types

const usersSchema = new Schema({
    id: SchemaTypes.Long,
    name: {
        type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
}, {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'updated_on'
      }
}, {
  collection: 'users'
})

module.exports = mongoose.model('users', usersSchema)
