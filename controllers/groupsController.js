const db = require('../db');
const initModels = require('../models/init-models');
const { Op } = require('sequelize');

const models = initModels(db);
const searchBuilder = require('sequelize-search-builder');

exports.getAllGroups = async function (req, res, next) {
  try {
    let where = {};
    if (req.query) {
      // console.log(req.query);
      const groupID = req.query.groupid.split(',').map(el => Number(el));
      const start = new Date(req.query.start);
      const end = new Date(req.query.end);
      where = { groupID, start, end };
      // console.log(groupIDs, start, end);
    } else {
      const data = await models.itemLookup.findAll();
      const groupID = [...new Set(data.map(el => el.dataValues.groupID))];
    }
    console.log(where);
    // console.log(groupIDs);
    const results = await models.invGroups.findAll({
      where: {
        groupID: {
          [Op.or]: groupIDs,
        },
      },
      include: [{ all: true, nested: true, duplicating: false }],
    });

    return res.status(200).json({
      status: 'success',
      length: results.length,
      results: results,
    });
  } catch (error) {
    console.error(error);
  }
};
