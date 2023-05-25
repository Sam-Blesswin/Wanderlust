//additional packages
const express = require('express');
//custom imports
const tourController = require('../controllers/tourController');

const router = express.Router();

/**
 * Param Middleware
 */
//router.param('id', tourController.checkID);

//Alias Route with preQueried
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
