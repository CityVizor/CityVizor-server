module.exports = (sequelize,DataTypes) => sequelize.define("counterparty", {
  orgId: DataTypes.STRING,
  name: DataTypes.STRING
});