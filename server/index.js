const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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

	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
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

app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

app.post("/login", (req, res) => {
	const password = req.body.password;
	const email = req.body.email;

	db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
		if (err) {
			res.send({ err: err });
		} else {
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (response) {
						req.session.user = result;
						console.log(req.session.user);
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
