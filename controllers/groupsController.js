const db = require('../db');
const initModels = require('../models/init-models');
const { Op, where } = require('sequelize');

const models = initModels(db);
const searchBuilder = require('sequelize-search-builder');

exports.getAllGroups = async function (req, res, next) {
  try {
    let whereObj = {};
    if (Object.keys(req.query).length !== 0) {
      //console.log(req.query.id.split(','));
      const groupID = req.query.id.split(',').map(el => Number(el));
      //console.log(groupID);
      const start = new Date(req.query.start);
      const end = new Date(req.query.end);
      whereObj = { groupID, start, end };
      // console.log(groupIDs, start, end);
    } else {
      const data = await models.itemLookup.findAll();
      const groupID = [...new Set(data.map(el => el.dataValues.groupID))];
      whereObj = { groupID };
    }
    console.log(where);

    options.include = [{
      model: model.Vehicle,
      attributes: ['ID', 'ModelID'],
      include: [
          {
              model: model.VehicleModel,
              attributes: ['ID', 'IsDiesel']
              where: {
                  IsDiesel: false
              },
              required: false
          }],
      required: false
  
  }];
    // console.log(groupIDs);
    const results = await models.invGroups.findAll({
      where: {
        groupID: {
          [Op.or]: whereObj.groupID,
        },
        
        },
        include: [
          {
            model: model.priceDataExtended,
            attributes: [ ""]
          }
        ]
      },
     // [Op.and]: {
       // '$priceDataExtended.date$': {
         // [Op.between]: ['2021/10/01', '2021/10/10'],
       // },
      //include: [{ all: true, nested: true, duplicating: false }],
    //}
    );

    return res.status(200).json({
      status: 'success',
      length: results.length,
      results: results,
    });
  } catch (error) {
    console.error(error);
  }
};
