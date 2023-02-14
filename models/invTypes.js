const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invTypes', {
    typeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    groupID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    typeName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mass: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    volume: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    capacity: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    portionSize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    raceID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    basePrice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    marketGroupID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    iconID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    soundID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    graphicID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'invTypes',
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
        name: "ix_invTypes_groupID",
        using: "BTREE",
        fields: [
          { name: "groupID" },
        ]
      },
    ]
  });
};
