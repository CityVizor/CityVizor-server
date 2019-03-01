module.exports = (sequelize, DataTypes) => sequelize.define('import', {
  "type": DataTypes.STRING,
  "paragraph": DataTypes.STRING,
  "item": DataTypes.STRING,
  "eventId": DataTypes.STRING,
  "eventName": DataTypes.STRING,
  "amount": DataTypes.DECIMAL(10, 2),
  "date": DataTypes.DATE,
  "counterpartyId": DataTypes.STRING,
  "counterpartyName": DataTypes.STRING,
  "description": DataTypes.STRING,
}, { freezeTableName: true } );