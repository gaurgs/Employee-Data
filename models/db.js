var mongoose=require('mongoose');
//var dbURI = "mongodb://localhost/Employee";

var dbURI = "mongodb://Employee:emp_123@ds161008.mlab.com:61008/employeedata";

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log(console.log('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(console.log('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(console.log('Mongoose disconnected'));
});


var employeeSchema = new mongoose.Schema({
	"name": {type: String},
	"email":{type: String, unique:true},
	"dob":{type:Date},
	"department": {type: String},
	"gender": {type: String},
	"age": {type: String}
});

mongoose.model('Employee', employeeSchema);