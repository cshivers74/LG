var express = require('express');
var app = express();
var path = require('path');

var mongoUtil = require('./mongoUtil');
mongoUtil.connect();

//app.use(express.static('public'));

// app.configure('development', function(){
//     app.use(express.static(__dirname + '/../client'));
//     app.use(express.static(__dirname + '/../dist'));
// });

    app.use(express.static(__dirname + '/../client'));
    app.use(express.static(__dirname + '/../dist'));
  // app.use(express.static('../client'));
  // app.use(express.static('../dist'));
 // app.use("../client", express.static(__dirname + "../client"));
 // app.use("../dist", express.static(__dirname + "../dist"));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

//app.use('/scripts', express.static(__dirname + '/node_modules/angular-material/angular-materials.css'));

app.get("/propertyTypes", (request, response) => {
	var propertyTypes = mongoUtil.propertyTypes();
	propertyTypes.find().toArray((err, docs) => {
		console.log(JSON.stringify(docs, null, 4));
	    var propertyTypeNames = docs.map((propertyType) => propertyType.name);
	    response.json(propertyTypeNames);
	});
});

app.listen(8080, function() {
	console.log('Listening on port 8080...');
});
