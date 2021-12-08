"use strict";
const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const personalizationValidation = require("../../validations/personalization_validation");
const personalizationController = require("../../controllers/personalization_controller");
const config = require("../../config/config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../../swagger.json");
const authenticateToken = require("../../middlewares/auth");

if (config.env === "prod") {
  router.use("/", authenticateToken);
}

if (config.env === "dev") {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

router
  .route("/recommendation")
  .get(
    validate(personalizationValidation.getRecommendation),
    personalizationController.getRecommendation,
    (req, res) => {}
  );

router
  .route("/recommendation/reward/:eventId")
  .patch(
    validate(personalizationValidation.updateReward),
    personalizationController.updateReward,
    (req, res) => {}
  );

module.exports = router;
