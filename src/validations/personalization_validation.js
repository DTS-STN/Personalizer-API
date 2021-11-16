const Joi = require('joi');

const getRecommendation = {
  query: Joi.object().keys({
    province: Joi.string().min(5).max(23).required(),
    month: Joi.string().min(3).max(9).required(),
    language: Joi.string().min(6).max(7).required(),
  }),
};

const updateReward = {
  body: Joi.object().keys({
    eventId: Joi.string().min(1).required(),
    score: Joi.number().positive().min(0).max(1).required(),
  }),
};

module.exports = {
  getRecommendation,
  updateReward,
};
