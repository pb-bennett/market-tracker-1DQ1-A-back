const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('priceData', {
    entryID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'itemLookup',
        key: 'typeID'
      }
    },
    sell: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    sellVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    buy: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    buyVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAtSource: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'priceData',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "entryID" },
        ]
      },
      {
        name: "id",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
