//core packages
//const fs = require('fs');

//custom Packages
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
exports.getAllTours = catchAsync(async (req, res, next) => {
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
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id); //Tour.findOne({_id : req.params.id})
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Writing documents to database
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  //console.log(req.body);
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //By default,method returns the original document before the update, This option specifies that you want to return the updated document after the update operation is performed
    runValidators: true, //This option instructs Mongoose to run the model's validators on the update operation
  });
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
