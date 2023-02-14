const db = require('../db');
const initModels = require('../models/init-models');

const models = initModels(db);
const searchBuilder = require('sequelize-search-builder');

exports.getAllGroups = async function (req, res, next) {
  try {
    const results = await models.invGroups.findAll();

    return res.status(200).json({
      status: 'success',
      length: results.length,
      results: results,
    });
  } catch (error) {
    console.error(error);
  }
};
