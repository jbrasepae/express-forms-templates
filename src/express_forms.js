const express = require('../node_modules/express');
const bodyParser = require('../node_modules/body-parser');
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('../node_modules/mongoose');
var mongoDB = 'mongodb://127.0.0.1/VisitorsDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;  
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/visitor', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/visitor', (req, res) => {
  console.log(req.body)
  addNewVisitor(req.body)
res.send(req.body);
});

function addNewVisitor(req){  
db.collection("New_Visitor").insertOne(req);
}

app.listen(port, () => console.log(`server running on ://localhost:${port}`));