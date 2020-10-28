const Sequelize = require('sequelize');
const sequelize = require('./database');
const Role = require('./Role');

let nameTable = 'employees';
let Employee = sequelize.define(nameTable, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    roleId: {
        type: Sequelize.INTEGER,
        refences:{
            model: Role,
            key: 'id'
        }

    }
});
Employee.belongsTo(Role);

module.exports = Employee;