//core packages
const fs = require('fs');

//Additional packages
const express = require('express');
const app = express();

/**
 * Middleware
 */
app.use(express.json());

/**
 * Read a file
 * read the data and cache it beforehand
 */
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * HTTP Methods
 */

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours, // == tours : tours
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
