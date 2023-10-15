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
const modelFinancesGoals = require('./models/finances/goals');
const modelFinancesExpense = require('./models/finances/expense');
const modelFinancesEntraces = require('./models/finances/entraces');

app.use(cors());
app.use(cors({ origin: '*' }));

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
const controllerFinancesGoals = require('./controllers/finances/goals');
const controllerFinancesExpense = require('./controllers/finances/expenses');
const controllerFinancesEntraces = require('./controllers/finances/entraces');
const controllerLogin = require('./controllers/login');
const controllerConfirmEmail = require('./controllers/confirmEmail');
const controllerForgetPassword = require('./controllers/forgetPassword');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/', controllerUser);
app.use('/', controllerUserDetails);
app.use('/', controllerFinancesGoals);
app.use('/', controllerFinancesExpense);
app.use('/', controllerFinancesEntraces);
app.use('/', controllerLogin);
app.use('/', controllerConfirmEmail);
app.use('/', controllerForgetPassword);

app.use('/', express.static('./public'));
app.use('/', express.static('./uploads'));

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