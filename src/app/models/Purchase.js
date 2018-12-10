const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Purchase = new mongoose.Schema({
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

Purchase.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', Purchase)
