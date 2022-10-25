const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/postDogs.js");
const dogs = require("./routes/getDogs");
const postDogs = require("./routes/postDogs.js");
const getTemp = require("./routes/getTemperaments.js");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//Routes
server.use("/dogs", dogs);
server.use("/dogs", postDogs);
server.use("/temperament", getTemp);
//server.use("/temperaments", dogsTemp);
//server.use("/dog", dog )

/////////////pruebaaa. Server is working perfectly
server.get("/", (req, res) => {
  res.send("holiii de prueba");
});

module.exports = server;
