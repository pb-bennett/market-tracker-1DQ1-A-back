const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invGroups', {
    groupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    iconID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    useBasePrice: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    anchored: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    anchorable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    fittableNonSingleton: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'invGroups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "groupID" },
        ]
      },
      {
        name: "ix_invGroups_categoryID",
        using: "BTREE",
        fields: [
          { name: "categoryID" },
        ]
      },
    ]
  });
};
