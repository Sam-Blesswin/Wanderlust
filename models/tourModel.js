const mongoose = require('mongoose');

/**
 * Define Schema
 */
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true, //making sure only one tour with same name is allowed
    trim: true, //removes all the white spaces from the beginning and end of the string
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
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
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
  priceDiscount: Number,
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
  },
  startDates: [Date],
});

/**
 * Create a  Model from Schema
 */
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
