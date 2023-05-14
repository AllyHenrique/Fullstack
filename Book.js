const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  year: {
    type: Number
  },
  
},{
    collection: 'book'
});

module.exports = mongoose.model('Book', Book);