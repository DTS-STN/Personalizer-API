'use strict';

const { v4: uuidv4 } = require('uuid');
const httpStatus = require('http-status');
require('dotenv/config');

const CognitiveServicesCredentials =
  require('@azure/ms-rest-azure-js').CognitiveServicesCredentials;
const Personalizer = require('@azure/cognitiveservices-personalizer');
const actions = require('./actions.json');
const config = require('../config/config');
const logger = require('../config/logger');

// create connection to personalizer end-point
function createPersonalizerClient() {
  const serviceKey = config.serviceKey;
  const baseUri = config.baseUri;
  const credentials = new CognitiveServicesCredentials(serviceKey);
  return new Personalizer.PersonalizerClient(credentials, baseUri);
}

// rank feature and return rewardActionId to front-end
async function createRank(req, res) {
  const personalizerClient = createPersonalizerClient();
  const rankRequest = {};

  rankRequest.eventId = uuidv4();
  rankRequest.contextFeatures = getFeaturesList(
    req.query.province,
    req.query.month,
    req.query.month,
  );
  // Get the actions list to choose from personalization with their features.
  rankRequest.actions = actions;
  // Exclude an action for personalization ranking. This action will be held at its current position.
  rankRequest.excludedActions = getExcludedActionsList();

  rankRequest.deferActivation = false;

  // Rank the actions based on user input features
  await personalizerClient
    .rank(rankRequest)
    .then((rankResponse) => {
      logger.info('Recommendation given');
      const results = {
        eventId: rankRequest.eventId,
        recommendation: rankResponse.rewardActionId,
        rankings: rankResponse.ranking,
      };

      res.status(httpStatus.OK).json(results);
      res.end();
    })
    .catch((err) => {
      logger.log('catch error for getRecommendation');
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: 'Encountered error during processing your request',
      });
      res.end();
    });
  // </rank>
}

// update reward depending on user action on recommendation
async function updateReward(body, res) {
  const personalizerClient = createPersonalizerClient();

  const rewardRequest = {
    value: body.score,
  };

  await personalizerClient.events
    .reward(body.eventId, rewardRequest)
    .then((result) => {
      logger.info('Reward added');
      res
        .status(httpStatus.OK)
        .json({ status: httpStatus.OK, info: 'Reward added' });
      res.end();
    })
    .catch((err) => {
      res.status(httpStatus.NOT_MODIFIED).json({
        status: httpStatus.NOT_MODIFIED,
        errorMessage: 'Error encountered during reward update',
      });
      logger.log('catch error reward');
      logger.error(err);
    });
}

// need  changes depending on features
function getFeaturesList(province, month, language) {
  return [
    {
      province: province,
      month: month,
      language: language,
    },
  ];
}

// for future use if need to be excluded any
function getExcludedActionsList() {
  return ['optional'];
}

module.exports = { createRank, updateReward };
