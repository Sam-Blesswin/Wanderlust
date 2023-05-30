//additional packages
const mongoose = require('mongoose');

const dotenv = require('dotenv');

/**
 * Uncaught Exception
 * Safety net code : try using as the last option to catch error
 */
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Down...');
  console.log(`${err.name}: ${err.message}`);
  process.exit(1);
});

//setting up
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
 * Server Starts Here
 */
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

/**
 * Unhandled Rejections
 * Safety net code : try using as the last option to catch error
 */

//Event Listeners
//The process.on function allows you to attach event listeners to specific events emitted by the process
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting Down...');
  console.log(`${err.name} \n${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
//change db password in config file to test unhandled rejection

//console.log(x); //Testing uncaught exception
