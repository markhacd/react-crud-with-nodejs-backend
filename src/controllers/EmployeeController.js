const sequelize = require('../models/database');
const Employee = require('../models/Employee');
const Role = require('../models/Role');

const controller = {};

sequelize.sync();

controller.list = async (req, res) => {
    const response = await Employee.findAll({
        include: [ Role ],
        order: [
            ['id', 'DESC']
        ],
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        return err;
    });

    res.send({
        success: true,
        data: response
    });
};

controller.roleList = async (req, res) => {
    const response = await Role.findAll()
    .then((data) => {
        return data;
    })
    .catch((err) => {
        return err;
    })
    res.send({
        success: true,
        data: response
    });
};

controller.get = async (req, res) => {
    const { id } = req.params;

    const data = await Employee.findAll({
        where: { id : id },
        include: [ Role ]
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        return err;
    });

    res.status(200).send({
        success: true,
        data: data
    });

};

controller.create = async (req, res) => {
    const { name, email, address, phone, role } = req.body;

    const data = await Employee.create({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err);
        return err;
    });

    res.status(200).send({
        success: true,
        msg: 'Employee created successfully',
        data: data
    });

    
};

controller.update = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, phone, role } = req.body;

    const data = await Employee.update({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role
    },{
        where: { id: id }
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err);
        return err;
    });

    if(data.length === 0){
        res.status(204).send({
            success: false,
            msg: "Update unsuccessfully"
        })
    } else {
        res.status(200).send({
            success: true,
            msg: 'Employee Update successfully',
            data: data
        });
    }
};

controller.delete = async (req, res) => {
    const { id } = req.body;
    
    const data = await Employee.findAll({ 
        where: { id : id }, 
        limit: 1 
    })
    .then((result) => {
        if(result.length === 0){
            res.send({
                success: false,
                msg: "Employee not found."
            });
        }
        return result;
    })
    .catch((err) => {
        console.log(err);
        res.send({
            success: false,
            msg: JSON.stringify(err)
        });
    });
    console.log(data);
    if(data.length === 1){
        await Employee.destroy({ 
            where: { id : id }
        })
        .then((result) => {
            res.send({
                success: true,
                msg: "Employee deleted successfully"
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                success: false,
                msg: JSON.stringify(err)
            });
        });
        
    }else{
        res.send({
            success: false,
            msg: "Something when wrong"
        });
    }
    
};

// controller.mockData = async (req, res) => {
//     // Role.create({
//     //     role: 'Project Manager'
//     // });

//     // Employee.create({
//     //     name: 'monkey dog',
//     //     email: 'monkey.dog@gmail.com',
//     //     address: '87/559 asfgwwr twdaqf safsf',
//     //     phone: 759546263,
//     //     roleId: 2
//     // });

//     let response = await sequelize.sync()
//     .then(() => {
//         let data = Employee.findAll();
//         return data;
//     })
//     .catch((err) => {
//         return err;
//     });
//     res.send({
//         success: true,
//         data: response
//     })
// };

// controller.test = (req, res) => {
//     res.send({
//         success: true,
//         url: 'test'
//     })
// };

module.exports = controller;