const express = require('express');
const app = express();
const connection = require('./database/db');
const bodyPaser = require('body-parser');
const cors = require('cors')


// Imports Models
const modelConfirmEmail = require('./models/confirmEmail');
const modelChangePassword = require('./models/forgetPassword');
const modelUser = require('./models/users');
const modelUserDetails = require('./models/users_details');
const modelFinancesCategories = require('./models/finances/categories');
const modelFinancesExpense = require('./models/finances/expense');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization', 'http://localhost:4200');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


// Import Controllers
const controllerUser = require('./controllers/users');
const controllerUserDetails = require('./controllers/users_details');
const controllerFinancesCategories = require('./controllers/finances/categories');
const controllerFinancesExpense = require('./controllers/finances/expense');
const controllerLogin = require('./controllers/login');
const controllerConfirmEmail = require('./controllers/confirmEmail');
const controllerForgetPassword = require('./controllers/forgetPassword');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/', controllerUser);
app.use('/', controllerUserDetails);
app.use('/', controllerFinancesCategories);
app.use('/', controllerFinancesExpense);
app.use('/', controllerLogin);
app.use('/', controllerConfirmEmail);
app.use('/', controllerForgetPassword);


connection
    .authenticate()
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.log(error);
    });



app.listen(process.env.PORT || 3000, () => {
    console.log('Server Running');
});