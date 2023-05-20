//additional packages
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    //default configuration
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('DB connection successful');
    //console.log(con.connections);
  });

//exported module
const app = require('./app');

//console.log(process.env);

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

/**
 * Usage
 */
const newTour = new Tour({
  name: 'The Mountain Hiker',
  rating: 4.5,
  price: 1000,
});

/**
 * Save To Database
 */

newTour
  .save()
  .then((doc) => {
    console.log('Tour saved successfully');
  })
  .catch((err) => {
    console.log('ERROR😵', err);
  });

/**
 * Server Starts Here
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
