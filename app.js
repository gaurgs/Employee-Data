var express = require('express');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var db=require('./models/db.js');

var route=require('./route/route.js');

var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname+ '/libs'));
app.use(express.static(__dirname+'/controller'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", route.index);
app.get("/controller/employeeController.js", function(req, res){
	res.sendFile(__dirname + "/controller/" + "employeeController.js");
})
app.post("/employeeList",route.employeeList);
app.post("/addEmployee",route.addEmployee);
app.post("/deleteEmployee",route.deleteEmployee);
app.post("/updateEmployee",route.updateEmployee);
app.post("/getEmployeeData",route.findEmployee)

var port = process.env.PORT || 8080;
var server = app.listen(port,function(req,res) {
      console.log("Server running at port " + port);
});
