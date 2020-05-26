const Sequelize = require('sequelize');
const config = require('./database.config')
const driver = require('./models/driver')
const transaction = require('./models/transaction')
const user = require('./models/user');

const sql = new Sequelize(config.database_name, config.username, config.password, {
    dialect: config.dialect
});

driver(sql, Sequelize);
user(sql, Sequelize);