//core packages
const fs = require('fs');

//Additional packages
const express = require('express');
const app = express();

const morgan = require('morgan');

/**
 * Middleware
 */
app.use(morgan('dev'));
app.use(express.json());

//Custom Middlewares
app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * Read a file
 * read the data and cache it beforehand
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * Route handlers
 */
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours, // == tours : tours
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const tour = tours.find((el) => el.id == req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const addTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  //write to a file Async
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const tour = tours.find((el) => el.id == req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour successfully>' },
  });
};

const deleteTour = (req, res) => {
  const tour = tours.find((el) => el.id == req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const addUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

/**
 * Routes
 */

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', addTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//Tour Routes
const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(addTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//user Routes
const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(addUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//Mounting the Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
/**
 * Server Starts Here
 */

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
