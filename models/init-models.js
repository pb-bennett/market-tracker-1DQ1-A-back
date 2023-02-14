var DataTypes = require('sequelize').DataTypes;
var _invGroups = require('./invGroups');
var _invTypes = require('./invTypes');
var _itemLookup = require('./itemLookup');
var _priceData = require('./priceData');
var _priceDataExtended = require('./priceDataExtended');

function initModels(sequelize) {
  var invGroups = _invGroups(sequelize, DataTypes);
  var invTypes = _invTypes(sequelize, DataTypes);
  var itemLookup = _itemLookup(sequelize, DataTypes);
  var priceData = _priceData(sequelize, DataTypes);
  var priceDataExtended = _priceDataExtended(sequelize, DataTypes);

  itemLookup.belongsTo(invGroups, { as: 'group', foreignKey: 'groupID' });
  invGroups.hasMany(itemLookup, { as: 'itemLookups', foreignKey: 'groupID' });
  // priceData.belongsTo(itemLookup, { as: 'id_itemLookup', foreignKey: 'id' });
  // itemLookup.hasMany(priceData, { as: 'priceData', foreignKey: 'id' });
  priceDataExtended.belongsTo(itemLookup, { as: 'type', foreignKey: 'typeID' });
  itemLookup.hasMany(priceDataExtended, { as: 'priceDataExtendeds', foreignKey: 'typeID' });

  return {
    invGroups,
    invTypes,
    itemLookup,
    priceData,
    priceDataExtended,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
