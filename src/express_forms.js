// const express = require('../node_modules/express');
// const bodyParser = require('../node_modules/body-parser');
// const app = express();
// const port = 3000;
// const path = require('path');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// var mongoose = require('../node_modules/mongoose');
// var mongoDB = 'mongodb://127.0.0.1/VisitorsDB';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// var db = mongoose.connection;  
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.get('/visitor', (request, response) => {
//   response.sendFile(path.join(__dirname + '/index.html'));
// });

// app.post('/visitor', (req, res) => {
//   console.log(req.body)
//   addNewVisitor(req.body)
// res.send(req.body);
// res.render('express'{
//   name
// })
// });

// function addNewVisitor(req){  
// db.collection("New_Visitor").insertOne(req);
// }

// app.listen(port, () => console.log(`server running on ://localhost:${port}`));
const express = require('../node_modules/express');
const bodyParser = require('../node_modules/body-parser');
const app = express();
const port = 3000;
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('../node_modules/mongoose');
var mongoDB = 'mongodb://127.0.0.1/UmuziDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', (req, res) => {
  addNewVisitor(req.body)
  db.collection("New_Visitor").find().sort({_id: -1}).limit(1).toArray( function(err, result) {
    if (err) throw err;
    console.log(result[0].VisitorName);
  console.log(req.body)
  res.render("forms", {
    name: result[0].VisitorName
    ,assistedBy: result[0].AssistentName
    ,age: result[0].VisitorAge
    ,dateOfVisit: result[0].DateOfVisit
    ,timeOfVisit: result[0].TimeOfVisit
    ,comments: result[0].Comments

  })
});
})
function addNewVisitor(req){  
db.collection("New_Visitor").insertOne(req);
}

app.listen(port, () => console.log(`running on ://localhost:${port}`));