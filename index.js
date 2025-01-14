const express = require("express");
const app = express();
const connection = require("./database/db");
const bodyPaser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// Import Controllers
const routerUser = require("./routers/users");
const routerTrip = require("./routers/trip");
const routerFinances = require("./routers/finances");
const routerLogin = require("./routers/login");
const routerCities = require("./routers/cities");
const routerToDolist = require("./routers/toDoList");

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.use("/", express.static("uploads"));

app.use("/", routerUser);
app.use("/", routerTrip);
app.use("/", routerFinances);
app.use("/", routerLogin);
app.use("/", routerCities);
app.use("/", routerToDolist);

app.get("/ping", (req, res) => {
	console.log("Ping running");
	res.send("Ping running");
});

connection
	.authenticate()
	.then(() => {
		console.log("Database Connected");
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server Running");
});
