const express = require('express');
const app = express();
const employeeRouters = require('./routes/EmployeeRoute');

app.set('port',process.env.PORT || 3000);

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/employee', employeeRouters);

app.use('/', (req, res) => {
    res.send('Hello World form node.js server');

});


app.listen(app.get('port'), () => {
    console.log("Starting server Node.js");
});