const mongoose = require('mongoose');
//const validator = require('validator');

/**
 * Define Schema
 */
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true, //making sure only one tour with same name is allowed
    trim: true, //removes all the white spaces from the beginning and end of the string
    maxlength: [40, 'A tour name must have less or equal then 40 characters'], //only for type string
    minlength: [10, 'A tour name must have more or equal then 10 characters'], //only for type string
    //validate: [validator.isAlpha, 'Tour name must only contain characters'], //available from external package
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: "Difficulty is either: 'easy', 'medium', 'difficult'",
    },
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String], //To store a array of strings
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //To permanently hide a data in the response
  },
  startDates: [Date],
});

/**
 * Create a  Model from Schema
 */
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
