 var app = angular.module("app",[]);
app.controller("employeeController", ['$scope', '$http', function($scope, $http){

  $scope.employeeData = [];

   var gridFormation = function(employeeData) {
      $scope.employeeData = employeeData;
   }

   $scope.addEmployee = function() {
      var employeeReqObj = {
        "name":"",
        "email":"",
        "dob":"",
        "department":"",
        "gender":"",
        "age":""
      };

      if(!$scope.employee.name || !$scope.employee.email || !$scope.employee.dob || !$scope.employee.department || !$scope.employee.gender) {
          return;
      }

      employeeReqObj.name=$scope.employee.name.toUpperCase();
      employeeReqObj.email=$scope.employee.email.toUpperCase();
      employeeReqObj.dob=$scope.employee.dob;
      employeeReqObj.department=$scope.employee.department.toUpperCase();
      employeeReqObj.gender=$scope.employee.gender.toUpperCase();
      employeeReqObj.age= getAge(employeeReqObj.dob);

      if(employeeReqObj.age<0) {
        $scope.Error = "Invalid DOB.";
        return;
      }

    $http({
        method: 'POST',
        url: '/addEmployee',
        data: employeeReqObj,
        headers: {'Content-Type': 'application/JSON'}
      }).success(function(data){
          $scope.employee = {};
          if(data.employeeList) {
              gridFormation(data.employeeList);
              $scope.Success = "Successfully added.";
          } else {
            $scope.Error = "Duplicate data not allowed.";
          }
      }).error(function(error){
          console.log(error);
      })
   };

   $scope.deleteRecord = function(index) {
      var obj = {
        "name":  $scope.employeeData[index].name,
        "email": $scope.employeeData[index].email
      }

      $http({
        method: 'POST',
        url: '/deleteEmployee',
        data: obj,
        headers: {'Content-Type': 'application/JSON'}
      }).success(function(data){
          gridFormation(data.employeeList);
          $scope.Success = "Successfully deleted.";
      }).error(function(error){
          console.log(error);
      })
   };

  
   $scope.editRecord = function(employee) {
      var obj = {"name": employee.name, "email": employee.email};
      $http({
        method: 'POST',
        url: '/getEmployeeData',
        data: obj,
        headers: {'Content-Type': 'application/JSON'}
      }).success(function(data){
          $scope.employee = data.employeeList[0];
      }).error(function(error){
          console.log(error);
      })
   };

   $scope.updateRecord = function() {
      var employeeReqObj = {
        "name":"",
        "email":"",
        "dob":"",
        "department":"",
        "gender":"",
        "age":"",
        "_id":""
      };

      if(!$scope.employee.name || !$scope.employee.email || !$scope.employee.dob || !$scope.employee.department || !$scope.employee.gender) {
          return;
      }

      employeeReqObj.name=$scope.employee.name.toUpperCase();
      employeeReqObj.email=$scope.employee.email.toUpperCase();
      employeeReqObj.dob=$scope.employee.dob;
      employeeReqObj.department=$scope.employee.department.toUpperCase();
      employeeReqObj.gender=$scope.employee.gender.toUpperCase();
      employeeReqObj.age= getAge(employeeReqObj.dob);
      employeeReqObj._id = $scope.employee._id;

      if(employeeReqObj.age<0) {
        $scope.Error = "Invalid DOB.";
        return;
      }

      $http({
        method: 'POST',
        url: '/updateEmployee',
        data: employeeReqObj,
        headers: {'Content-Type': 'application/JSON'}
      }).success(function(data){
          gridFormation(data.employeeList);
          $scope.employee = "";
          $scope.Success = "Successfully updated.";
      }).error(function(error){
          console.log(error);
      })
   };

   var getAge = function(birthDate) {
        var today = new Date();
        var birthDate = new Date(birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
   };

   $scope.closeAlert = function(){
     $scope.Error = false;
     $scope.Success = false;
   }

   $scope.init = function() {
      $http({
        method: 'POST',
        url: '/employeeList',
        data: {},
        headers: {'Content-Type': 'application/JSON'}
      }).success(function(data){
          gridFormation(data.employeeList)
      }).error(function(error){
          console.log(error);
      })
   }

   $scope.init();

}]);