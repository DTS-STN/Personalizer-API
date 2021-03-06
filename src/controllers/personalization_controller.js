const personalizationService = require("../services/personalization_service");

const getRecommendation = (req, res) => {
  personalizationService.createRank(req, res);
};

const updateReward = (req, res) => {
  personalizationService.updateReward(req, res);
};

module.exports = {
  getRecommendation,
  updateReward,
};
