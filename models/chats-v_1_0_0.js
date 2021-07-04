'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-long')(mongoose)
var SchemaTypes = mongoose.Schema.Types

const chatsSchema = new Schema({
    id: SchemaTypes.Long,
    name: {
        type: String
    },
    message: {
      type: String
    }
}, {
    timestamps: {
        createdAt: 'created_on',
        updatedAt: 'updated_on'
      }
}, {
  collection: 'chats'
})

module.exports = mongoose.model('chats', chatsSchema)
