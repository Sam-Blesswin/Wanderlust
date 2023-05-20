//core packages
//const fs = require('fs');

//custom Model Package
const Tour = require('../models/tourModel');

/**
 * Read a file
 * read the data and cache it beforehand
 */
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

/**
 * Route Handlers
 */

//Reading documents from database
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // result: tours.length,
    // data: {
    //   tours, // == tours : tours
    // },
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

// Writing documents to database
exports.createTour = async (req, res) => {
  try {
    //console.log(req.body);
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour successfully>' },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
