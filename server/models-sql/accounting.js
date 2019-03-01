module.exports = (sequelize, DataTypes) => sequelize.define('accounting', {
  "type": DataTypes.STRING,
  "paragraph": DataTypes.STRING,
  "item": DataTypes.STRING,
  "eventId": DataTypes.STRING,
  "amount": DataTypes.DECIMAL(10, 2),
  "date": DataTypes.DATE,
  "counterpartyId": DataTypes.STRING,  
  "description": DataTypes.STRING,
}, { freezeTableName: true } );