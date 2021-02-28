const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
	user: "healthapp",
	host: "localhost",
	password: "password",
	database: "healthapp",
})

app.post("/register", (req, res) => {
	const firstname = req.body.firstname;
	const surname = req.body.surname;
	const email = req.body.email;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}

		db.query(
			"INSERT INTO users(firstname, surname, email, password) VALUES (? ,? ,? ,?)",
			[firstname, surname, email, hash],
			(err, result) => {
				if (err) {
					console.log(err);
					res.send({ message: "Registration unsuccessful" });
				} else {
					res.send(result);
				}
			}
		);
	});
});

app.post("/login", (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	console.log('response is ', res)

	db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
		if (err) {
			res.send({ err: err });
		} else {
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (response) {

						result.data.message = 'success';
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

app.listen(3001, () => {
	console.log("Server running on port 3001");
});
