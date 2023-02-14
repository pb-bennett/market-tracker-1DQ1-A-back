const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('priceDataExtended', {
    entryID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'itemLookup',
        key: 'typeID'
      }
    },
    dq1aSell: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    dq1aBuy: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    jitaSell: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    jitaBuy: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    amarrSell: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    amarrBuy: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    dq1aSellVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    dq1aBuyVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    jitaSellVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    jitaBuyVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amarrSellVolume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amarrBuyVolume: {
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
    tableName: 'priceDataExtended',
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
        name: "typeID",
        using: "BTREE",
        fields: [
          { name: "typeID" },
        ]
      },
    ]
  });
};
