const express = require("../node_modules/express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("server listening on 3000");
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/visitor", (request, response) => {
  console.log(request.body);
});

var mongoDB = 'mongodb://127.0.0.1/umuzi';
//mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(mongoDB, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  
});