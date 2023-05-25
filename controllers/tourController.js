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
    //Filter Method 1
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    //Filter Method 2
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    console.log(req.query);

    //BUILD QUERY
    //1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    console.log(queryObj);

    //1B) Advance Filtering
    //req.query : {difficulty : 'easy', duration : {gte : 5}}
    //mongoose query : {difficulty : 'easy', duration : {$gte : 5}}
    //gte, gt, lte, lt

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr)); //return a query

    //2) SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      //eg : sort('price ratingsAverage')
      //console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query.sort('-createdAt'); //to sort it based on when it was created, latest at the top
    }

    //3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      //eg : select('name duration price')
      //console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select('-__v'); //to exclude the __v field //'- fieldname' to exclude a field
    }

    //4) Pagination
    const page = req.query.page * 1 || 1; //page=3 or by default page=1
    const limit = req.query.limit * 1 || 100; //limit=10 or by default limit=100

    //skip(10) : skip the first 10 documents
    const skip = (page - 1) * limit; //if page=3 then skip the first 20 documents

    //page=3&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments(); //to get number of entries in the database
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    //EXECUTE QUERY
    const tours = await query;
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
