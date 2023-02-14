const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('itemLookup', {
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    groupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invGroups',
        key: 'groupID'
      }
    },
    typeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "typeName"
    },
    volume: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    marketGroupID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    iconID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'itemLookup',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "typeID" },
        ]
      },
      {
        name: "typeName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "typeName" },
        ]
      },
      {
        name: "groupID",
        using: "BTREE",
        fields: [
          { name: "groupID" },
        ]
      },
    ]
  });
};
