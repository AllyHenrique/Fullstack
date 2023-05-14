const express = require('express');
const app = express();
const booksRoutes = express.Router();

let Book = require('../model/Book');

// api to add book
booksRoutes.route('/add').post(function (req, res) {
  let book = new Book(req.body);
  book.save()
  .then(book => {
    res.status(200).json({'status': 'success','mssg': 'book added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get books
booksRoutes.route('/').get(function (req, res) {
  Book.find(function (err, books){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','books': books});
    }
  });
});

// api to get book
booksRoutes.route('/book/:id').get(function (req, res) {
  let id = req.params.id;
  Book.findById(id, function (err, book){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','book': book});
    }
  });
});

// api to update route
booksRoutes.route('/update/:id').put(function (req, res) {
    Book.findById(req.params.id, function(err, book) {
    if (!book){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        book.title = req.body.name;
        book.description = req.body.email;
        book.year = req.body.phone_number;

        book.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
booksRoutes.route('/delete/:id').delete(function (req, res) {
  Book.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = booksRoutes;