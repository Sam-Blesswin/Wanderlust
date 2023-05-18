//additional packages
const express = require('express');
//custom imports
const tourController = require('../controllers/tourController');

const router = express.Router();

/**
 * Param Middleware
 */
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.addTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;