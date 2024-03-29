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
const modelToDoListMain = require('./models/toDoList/main');
const modelToDoListTasks = require('./models/toDoList/tasks');
const modelToDoListAttchaments = require('./models/toDoList/attchaments');
const modelToDoListComments = require('./models/toDoList/comments');



app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
const controllerCities = require('./controllers/cities');
const controllerRadio = require('./controllers/radio');
const controllerNoticies = require('./controllers/noticies');
const controllerToDolistMain = require('./controllers/toDoList/main');
const controllerToDolistTasks = require('./controllers/toDoList/tasks');
const controllerToDolistComments = require('./controllers/toDoList/comments');
const controllerToDolistAttchaments = require('./controllers/toDoList/attchaments');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));
app.use('/', express.static('uploads'));

app.use('/', controllerUser);
app.use('/', controllerUserDetails);
app.use('/', controllerFinancesGoals);
app.use('/', controllerFinancesExpense);
app.use('/', controllerFinancesEntraces);
app.use('/', controllerLogin);
app.use('/', controllerConfirmEmail);
app.use('/', controllerForgetPassword);
app.use('/', controllerCities);
app.use('/', controllerRadio);
app.use('/', controllerNoticies);
app.use('/', controllerToDolistMain);
app.use('/', controllerToDolistTasks);
app.use('/', controllerToDolistComments);
app.use('/', controllerToDolistAttchaments);

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

setInterval(() => {
    console.log('Keep Working', new Date().getTime());

}, 60000);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server Running');
});