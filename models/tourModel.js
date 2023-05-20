const mongoose = require('mongoose');

/**
 * Define Schema
 */
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true, //making sure only one tour with same name is allowed
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

/**
 * Create a  Model from Schema
 */
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
