const express = require('express');
const app = express();
const connection = require('./database/db');
const bodyPaser = require('body-parser');
const cors = require('cors')



app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Import Controllers
const routerUser = require('./routers/users');
const controllerTrip = require('./routers/trip');
const routerFinancesGoals = require('./routers/finances/goals');
const routerFinancesExpense = require('./routers/finances/expenses');
const routerFinancesResume = require('./routers/finances/resume');
const routerFinancesEntraces = require('./routers/finances/entraces');
const routerLogin = require('./routers/login');
const routerCities = require('./routers/cities');
const routerToDolistMain = require('./routers/toDoList/main');
const routerToDolistTasks = require('./routers/toDoList/tasks');
const routerToDolistComments = require('./routers/toDoList/comments');
const routerToDolistAttchaments = require('./routers/toDoList/attchaments');


app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/', express.static('uploads'));


app.use('/', routerUser);
app.use('/', controllerTrip);
app.use('/', routerFinancesGoals);
app.use('/', routerFinancesExpense);
app.use('/', routerFinancesEntraces);
app.use('/', routerFinancesResume);
app.use('/', routerLogin);
app.use('/', routerCities);
app.use('/', routerToDolistMain);
app.use('/', routerToDolistTasks);
app.use('/', routerToDolistComments);
app.use('/', routerToDolistAttchaments);

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