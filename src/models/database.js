const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'react_api_db',
    'root',
    '1234',
    {
        host: '192.168.99.100',
        dialect: 'mysql'
    }
);

module.exports = sequelize;