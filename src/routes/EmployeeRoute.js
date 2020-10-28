const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.get('/list', EmployeeController.list);
router.post('/create', EmployeeController.create);
router.get('/get/:id', EmployeeController.get);
router.put('/update/:id', EmployeeController.update);
router.delete('/delete', EmployeeController.delete);

router.get('/role/list', EmployeeController.roleList);
// router.get('/mockData', EmployeeController.mockData);
// router.get('/test', EmployeeController.test);


module.exports = router;