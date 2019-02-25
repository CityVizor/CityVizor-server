
const config = require("./config");

module.exports = function(){

  console.log("Connecting to database " + config.database.db);

  const Sequelize = require('sequelize');
  const sequelize = new Sequelize(config.database.db, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: 'mysql'
  });

  const Event = sequelize.define('event', {
    srcId: Sequelize.STRING,
    name: Sequelize.STRING,
    description: Sequelize.STRING
  });

  const Accounting = sequelize.define('record', {
    "type": Sequelize.STRING,
    "paragraph": Sequelize.STRING,
    "item": Sequelize.STRING,
    "event": Sequelize.STRING,
    "amount": Sequelize.DECIMAL(10, 2),
    "date": Sequelize.DATE,
    "counterpartyId": Sequelize.STRING,
    "counterpartyName": Sequelize.STRING,
    "description": Sequelize.STRING,
  });

  return sequelize.sync().then(() => console.log("Connected."));
}