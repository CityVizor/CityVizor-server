
const config = require("./config");

console.log("Connecting to database " + config.database.db);

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database.db, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: 'mysql'  
});

// import all model defs from models
const modelDefs = require("./models-sql");
const models = Object.entries(modelDefs)
.map(entry => [entry[0], sequelize.import(entry[0], entry[1])])
.reduce((acc,cur) => { acc[cur[0]] = cur[1]; return acc; }, {});

module.exports = {
  ...models,
  sequelize
};