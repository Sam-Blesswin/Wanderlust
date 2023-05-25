//core packages
//const fs = require('fs');

//custom Model Package
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

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

//custom middleware
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

//Reading documents from database
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);

    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query) //Tour.find() : returns a query; [we can also directly pass the Tour model instead we pass the query]
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;
    //query.sort().select().skip().limit()

    //RESPONSE
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours, // == tours : tours
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //Tour.findOne({_id : req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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

exports.updateTour = async (req, res) => {
  //console.log(req.body);
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
