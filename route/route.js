var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

exports.index=function(req, res){
	 res.render('index',{
        heading: "Emplyoee Record Data",
        title: "Employee Record Data"
    });
};

exports.findEmployee=function(req, res){
	var name=req.body.name;
	var email=req.body.email;

	var query = {"name":name,"email":email};

	Employee.find(query, function(err,employee){
	  	res.send({"employeeList":employee});
	});
};	

exports.addEmployee=function(req,res){
	
	var name=req.body.name;
	var email=req.body.email;
	var dob=req.body.dob;
	var department=req.body.department;
	var gender=req.body.gender;
	var age=req.body.age;

	var employee = new Employee();
	employee.name=name;
	employee.email=email;
	employee.dob=dob;
	employee.department=department;
	employee.gender=gender;
	employee.age=age;

	employee.save(function(err, savedData){
		if(err){
	     console.log("Error : While saving the Data");
	     return res.send({"Error": "Data not saved."});
	    }else{
	    	Employee.find({}, function(err,employee){
	  			return res.send({"Success": "Data saved successfully.","employeeList":employee});
			});	
	   	}
	});
};

exports.employeeList=function(req,res){
	Employee.find({}, function(err,employee){
	  	res.send({"employeeList":employee});
	});
};


exports.deleteEmployee=function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	Employee.remove({"name":name,"email":email}, function(err, employeeList){
		Employee.find({}, function(err,employee){
	  		res.send({"employeeList":employee});
		});
	});
};

exports.updateEmployee=function(req,res){
	var name=req.body.name;
	var email=req.body.email;
	var dob=req.body.dob;
	var department=req.body.department;
	var gender=req.body.gender;
	var age=req.body.age;
	var id = req.body._id;
	var query = {"_id": id};
	var updateObj = {"name":name,"email":email,"dob":dob,"department":department,"gender":gender,"age":age};

	Employee.where('_id', id).update({$set: updateObj}, function(err, employee){
		Employee.find({}, function(err,employee){
			res.send({"Success":"Updated successfully.","employeeList":employee});
		});
	})
};