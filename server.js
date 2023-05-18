//additional packages
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//exported module
const app = require('./app');

//console.log(process.env);

/**
 * Server Starts Here
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
