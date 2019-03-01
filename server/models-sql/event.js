module.exports = (sequelize,DataTypes) => sequelize.define("event", {
  srcId: DataTypes.STRING,
  name: DataTypes.STRING,
  description: DataTypes.STRING
});