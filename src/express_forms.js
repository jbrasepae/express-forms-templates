const express = require("../node_modules/express");
const bodyParser = require("../node_modules/body-parser");
const app = express();
const port = 3000;
const path = require("path");

var mongoose = require("../node_modules/mongoose");
var mongoDB = "mongodb://127.0.0.1/Visitors";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function addNewVisitor(name) {
  db.collection("Visitors").insertOne(name);
  console.log("Data saved");
}

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/new_visit", (request, response) => {
  response.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/new_visit", (req, res) => {
  addNewVisitor(req.body);
  setTimeout(function () {
    db.collection("Visitors")
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray(function (err, result) {
        if (err) throw err;
        res.render("forms", {
          id: result[0]._id,
          name: result[0].VisitorName,
          assistedBy: result[0].AssistentName,
          age: result[0].VisitorAge,
          dateOfVisit: result[0].DateOfVisit,
          timeOfVisit: result[0].TimeOfVisit,
          comments: result[0].Comments
        });
        console.log("data retrieved");
      });
  }, 1000);
});

app.listen(port, () => console.log(`running on ://localhost:${port}`));

module.exports = { addNewVisitor, app, mongoose, db, mongoDB };