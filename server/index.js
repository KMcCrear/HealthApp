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

app.use(express.json());

/*sets the methods that will be used and the port the app is running on
credentials need to be set to true for the cookie to work, needs to be
set on the front-end too.
*/
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
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
  const id = req.body.id;

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

    db.query(
      "INSERT INTO profile(users_id, Firstname, Surname, Email) SELECT users.id, users.firstname, users.surname, users.email FROM users WHERE NOT EXISTS(SELECT id FROM profile WHERE profile.users_id = users.id)",
      [firstname, surname, id, email],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
});

/*This is a GET method, checks to see if the use is logged in
sends info on if the user is logged in to the front end.*/

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

app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/profile", (req, res) => {
  const userAge = req.body.age;
  const userHeight = req.body.height;
  const userSex = req.body.sex;
  const userWeight = req.body.weight;
  const userBloodType = req.body.bloodtype;
  const userBloodPressure = req.body.bloodpressure;
  const userDiabetic = req.body.diabetic;
  const userDisabilities = req.body.disabilities;
  const users_id = req.body.users_id;

  db.query(
    "UPDATE profile SET Age = ?, Sex = ?, Height = ?, Weight = ?, Blood Type = ?, Blood Pressure = ?, Diabetic = ?, Disabilities = ? WHERE users_id = '';",
    [
      users_id,
      userAge,
      userHeight,
      userSex,
      userWeight,
      userBloodType,
      userBloodPressure,
      userDiabetic,
      userDisabilities,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "Profile Details Saved" });
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(serverPort, () => {
  console.log("Server running on port {}");
});
