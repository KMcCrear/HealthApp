const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const serverPort = 3001;

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(express.json());

/*sets the methods that will be used and the port the app is running on
credentials need to be set to true for the cookie to work, needs to be
set on the front-end too.
*/
app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT"],
		credentials: true,
	})
);

//allows the app to use cookies
app.use(cookieParser());
//Not sure what this does but the docs say it needs to be set to true.
app.use(bodyParser.urlencoded({ extended: true }));

/*This sets up the session the cookie uses
a key and a secret need to be set*/
app.use(
	session({
		key: "userId",
		secret: "cookieSecret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24,
		},
	})
);

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "HealthApp",
});

app.post("/register", (req, res) => {
	const firstname = req.body.firstname;
	const surname = req.body.surname;
	const email = req.body.email;
	const password = req.body.password;
	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		db.query("select email from users",(err,result)=>{
			const registeredEmails = [];
			result.forEach((data)=>registeredEmails.push(data.email));
			if(err){
				res.send({message:"We encountered an error"});
			}
			if(registeredEmails.includes(email)){
				res.send({message: "Account with this email already exists!"});
			} else{
				db.query(
					"INSERT INTO users(firstname, surname, email, password) VALUES (? ,? ,? ,?)",
					[firstname, surname, email, hash],
					(err, result) => {
						if (err) {
							console.log(err);
							res.send({ message: "Registration unsuccessful" });
						} else {
							req.session.user = result;
							res.send(result);
						}
					}
				);
				db.query(
					"INSERT INTO userdetails(userid) SELECT id FROM users WHERE NOT EXISTS(SELECT userid FROM userdetails WHERE userdetails.userid = users.id)",
					(err, result) => {
						if (err) {
							console.log(err);
						}
					}
				);
			}
		})

	});
});

/*This is a GET method, checks to see if the use is logged in
sends info on if the user is logged in to the front end.*/
app.post("/resetField",(req,res)=>{
	const table = req.body.table;
	const field = req.body.field;
	const id = req.body.id;
	const idField = (table==='users') ? 'id' : 'userid';
	db.query(`UPDATE ${table} SET ${field} = NULL where ${idField} = ${id};`,(err,result)=>{
		if(err){
			console.log('error ', err);
		} else {
			res.send(result);
		}
	})
})

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

app.put("/logout", (req, res) => {
	req.session.destroy();
});

app.get("/home/reminders-get", (req, res) => {
	const userId = req.query.userId;
	console.log("USER QUERY IS ", req.query);
	db.query(
		`SELECT * FROM reminders WHERE userid = ${userId};`,
		(err, result) => {
			if (err) {
				res.send({ err: err });
			} else {
				res.send(result);
			}
		}
	);
});

app.post('/editTable', (req,res)=>{
	const table = req.body.table;
	const field = req.body.field;
	const value = req.body.value;
	const userId = req.body.userId;

	const idField = (table==='users') ? 'id' : 'userid';

	db.query(`UPDATE ${table} SET ${field}='${value}' WHERE ${idField}=${userId}`, (err,result)=>{
		if(err){
			console.log(err);
		} else {
			res.send(result);
		}
	})
});

app.post("/home/reminders-add", (req, res) => {
	const info = req.body.info;
	const date = req.body.date;
	const location = req.body.location;
	const time = req.body.time;
	const userid = req.body.userId;

	db.query(
		`INSERT INTO reminders(userid, info, date, time, location) VALUES(?, ?, ?, ?, ?)`,
		[userid, info, date, time, location],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.post("/home/reminders-delete", (req, res) => {
	const id = req.body.id;
	console.log('deleting from reminders with id ', id);
	db.query(`DELETE FROM reminders where id = ${id}`, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.post("/login", (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	console.log("response is ", res);

	db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
		if (err) {
			res.send({ err: err });
		} else {
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (response) {
						req.session.user = result;
						res.send(result);
					} else {
						res.send({ message: "Wrong Email/Password" });
					}
				});
			} else {
				res.send({ message: "User dosen't exist" });
			}
		}
	});
});

app.get("/loadActivity", (req, res) => {
	console.log(res);
	db.query("SELECT * FROM activities;", (err, result) => {
		if (err) {
			res.send({ Error: err });
		} else {
			if (result.length > 0) {
				req.session.activtyName = result;
				console.log(result);
				res.send(result);
			}
		}
	});
});

app.post("/loadworkoutdata", (req, res) => {
	const id = req.body.id;
	console.log("userID: ", id);
	db.query(`SELECT * FROM workouts WHERE userid = ${id};`, (err, result) => {
		if (err) {
			res.send({ message: err });
		} else {
			if (result.length > 0) {
				req.session.workouts = result;
				console.log(result);
				res.send(result);
			}
		}
	});
});

app.post("/submitworkout", (req, res) => {
	const id = req.body.id;
	const workoutName = req.body.workoutName;
	const time = req.body.totalTime;
	const distance = req.body.distance;
	const calories = req.body.calories;
	const heartRate = req.body.heartRate;
	const location = req.body.location;

	console.log("Info: ", id, time, distance, calories, heartRate, location);
	db.query(
		"INSERT INTO workouts(userid, workoutname, totaltime, distance, calories, avgheartrate, location) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[id, workoutName, time, distance, calories, heartRate, location],
		(err, result) => {
			if (err) {
				res.send({ message: err });
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.post("/addworkout", (req, res) => {
	const workoutName = req.body.workoutName;
	console.log("Workout Name: ", workoutName);

	db.query(
		"INSERT INTO activities(activityName) VALUES (?)",
		[workoutName],
		(err, result) => {
			if (err) {
				res.send({ message: err });
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

app.get("/load-workouts", (req, res) => {
	db.query("SELECT activityName FROM activities", (err, result) => {
		if (err) {
			console.log(err);
			res.send({ message: err });
		} else {
			console.log(result);
			res.send(result);
		}
	});
});

app.post("/deleteworkout", (req, res) => {
	const workoutName = req.body.toDelete;

	db.query(
		`DELETE FROM activities WHERE activityName = "${workoutName}"`,
		(err, result) => {
			if (err) {
				console.log(err);
				res.send({ message: err });
			} else {
				console.log(result);
				res.send(result);
			}
		}
	);
});

app.post("/getUserDetails", (req, res) => {
	const id = req.body.id;

	db.query(`SELECT * FROM userdetails WHERE userid = ${id}`, (err, result) => {
		if (err) {
			console.log(err);
			res.send({ mesage: err });
		} else {
			console.log(result);
			res.send(result);
		}
	});
});

app.post("/updateUserDetails", (req, res) => {
	const id = req.body.id;
	const firstName = req.body.firstName;
	const surName = req.body.surName;
	const email = req.body.email;
	const age = req.body.age;
	const height = req.body.height;
	const weight = req.body.weight;
	const contact = req.body.emergeContact;
	const gender = req.body.gender;
	const bloodType = req.body.bloodType;
	const isDiabetic = req.body.isDiabetic;

	db.query(
		`UPDATE userdetails SET  age = ?, height = ?, weight = ?, contact = ?, gender = ?, bloodtype = ?, isdiabetic = ? WHERE userid = ${id};`,
		[age, height, weight, contact, gender, bloodType, isDiabetic],
		(err, result) => {
			if (err) {
				console.log(err);
				res.send({ error: err });
			} else {
				res.send(result);
			}
		}
	);

	db.query(
		`UPDATE users SET firstname = ?, surname = ?, email = ? WHERE id = ${id};`,
		[firstName, surName, email],
		(err, result) => {
			if (err) {
				console.log(err);
			}
		}
	);
});

app.listen(serverPort, () => {
	console.log(`Server running on port ${serverPort}`);
});
