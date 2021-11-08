'use strict';
const express = require('express');
const router = express.Router();
const validate = require('../../middlewares/validate');
const personalizationValidation = require('../../validations/personalization_validation');
const personalizationController = require('../../controllers/personalization_controller');

router
  .route('/recommendation')
  .get(
    validate(personalizationValidation.getRecommendation),
    personalizationController.getRecommendation,
    (req, res) => {},
  );

router
  .route('/recommendation/reward')
  .put(
    validate(personalizationValidation.updateReward),
    personalizationController.updateReward,
    (req, res) => {},
  );

module.exports = router;
