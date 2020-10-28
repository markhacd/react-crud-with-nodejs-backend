const Sequelize = require('sequelize');
const sequelize = require('./database');

let nameTable = 'roles';
let Role = sequelize.define(nameTable, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: Sequelize.STRING
},{
    timestamps: false
});

module.exports = Role;