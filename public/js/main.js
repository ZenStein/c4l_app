'use strict';

// Declare app level module which depends on views, and components

//alert('fired');
//console.log(angular);


angular.module('main', ['ngRoute','ngGrid','ui.grid','ui.grid.selection','ui.grid.grouping','ui.grid.resizeColumns','ui.grid.moveColumns','floatingLabels','angularFileUpload'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
               //template:'<h1>This is the template</h1>',
                controller: 'mainController'
            })
            .when('/data', {
                templateUrl: 'views/data.html',
               //template:'<h1>This is the template</h1>',
                controller: 'dataController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
               //template:'<h1>This is the register template</h1>',
                controller: 'registerController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
               //template:'<h1>This is the template</h1>',
                controller: 'loginController'
            })
            .when('/employee', {
                templateUrl: 'views/employee.html',
               //template:'<h1>This is the template</h1>',
                controller: 'employeeController'
            })
            .when('/employee/create', {
                templateUrl: 'views/employee.create.html',
               //template:'<h1>This is the template</h1>',
                controller: 'employee.createController'
            })
            .when('/employee/uigrid', {
                templateUrl: 'views/employee.uigrid.html',
               //template:'<h1>This is the template</h1>',
                controller: 'employee.uigridController'
            })
            .when('/housekeeping', {
                templateUrl: 'views/housekeeping.html',
               //template:'<h1>This is the template</h1>',
                controller: 'housekeepingController'
            })
            .when('/housekeeping/schedule_daily', {
                templateUrl: 'views/housekeeping.schedule_daily.html',
               //template:'<h1>This is the template</h1>',
                controller: 'housekeeping.schedule_dailyController'
            })
            .otherwise({
                redirectTo:'/'
            });
    }])
    .value('headers',{
             first_name: 'first_name',
              last_name: 'last_name',
                  email: 'email',
                  phone: 'phone',
                 phone2: 'phone2',
                    SSN: 'SSN',
             department: 'department',
               birthday: 'birthday',
             start_date: 'start_date',
            hourly_rate: 'hourly_rate'
        })
    .controller('mainController', [ '$scope', function ($scope) {
        $scope.name = 'somename';
        //alert('maincontroller Called');
    }])
    .controller('dataController', [ '$scope', '$http', function ($scope, $http) {
        $scope.responsedata = {};

        $http.get('http://registration-lesson:8000/data').success(function(response){
            console.log(response);
            $scope.responsedata = response;
        });

        $scope.theData = [{name:'Bob',last:'miller'},{name:'Bob',last:'miller'},{name:'Bob',last:'miller'}];
        //alert('datacontroller Called');
    }])
    .controller('registerController', [ '$scope', function ($scope) {
        $scope.name = 'somename';
        //alert('registerController Called');
    }])
    .controller('loginController', [ '$scope', '$http','$location', function ($scope, $http,$location) {
        $scope. mod= {
            email:'',
            password:''
        };
        $scope.sign_in = function(){
            $http.post('/authorize',$scope.mod)
                .success(function(res){
                   $location.url(/* = employee signed in index */);
                });
        };

        //alert('loginController Called');#log
    }])
    .controller('employeeController', [ '$scope', '$http', function ($scope, $http) {

        $http.get('/employee').success(function(data){
            console.log(data);
            $scope.myData = data;
        });
        $scope.gridOptions = { data: 'myData' }

    }])
    .controller('employee.uigridController', [ '$scope', '$http', function ($scope, $http) {
        $http.get('/employee').success(function(data){
            //console.log(data);
            //$scope.myData = [{name: "Moroni", age: 50},
            //    {name: "Tiancum", age: 43},
            //    {name: "Jacob", age: 27},
            //    {name: "Nephi", age: 29},
            //    {name: "Enos", age: 34}];
            $scope.myData = data;
        });

    }])
    .controller('employee.createController', [ '$scope', '$http', function ($scope, $http) {
       // alert('employee.createController');
        var now = new Date();
        $scope.input = {
            first_name:'',
            last_name:'',
            email:'',
            phone:'',
            phone2:'',
            SSN:'',
            department:'',
            birthday:'',
            start_date: '',
            hourly_rate:''
        };
        //$model = [
        //    'first_name' => $request->first_name,
        //    'last_name' => $request->last_name,
        //    'email' => $request->email,
        //    'phone' => $request->phone,
        //    'phone2' => $request->phone2,
        //    'SSN' => $request->SSN,
        //    'department' => $request->department,
        //    'birthday' => $request->birthday,
        //    'start_date' => $request->start_date,
        //    'hourly_rate' => $request->hourly_rate
        //];
        $scope.addEmployee = function(){
            console.log('input data before sent');
            console.log($scope.input);
            $http.post('/employee', $scope.input)
                .success(function (data, status, headers, config) {
                    console.log('return data below');//marker
                    console.log(data);
                    //$scope.data = data;
                });
        };
    }])
    .controller('housekeepingController', [ '$scope', '$http', 'FileUploader',function ($scope, $http, FileUploader) {

        $scope.uploader = new FileUploader();

        $scope.gridOptions1 = {
            enableSorting: true,
            enableRowSelection: true,
            multiSelect: true,
            enableFullRowSelection: true,
            treeRowHeaderAlwaysVisible: false,
            columnDefs: [
              { field: 'location', grouping: {groupPriority: 1}, sort:{priority:1,direction:'asc'} },
              { field: 'cabin_number', displayName:'Cabin' },
              { field: 'status', grouping: {groupPriority: 0}, sort:{priority:0,direction:'asc'} },
              { field: 'linens'},
              { field: 'assigned_to'}
            ],
            onRegisterApi: function( gridApi ) {
              $scope.grid1Api = gridApi;
            }
        };

        $scope.gridOptions2 = {
            enableSorting: true,
            enableRowSelection: true,
            multiSelect: true,
            enableFullRowSelection: true,
            columnDefs: [
              { field: 'first_name', displayName:'HouseKeeper', grouping: {groupPriority: 0} },
              { field: 'status', grouping: {groupPriority: 1} },
              { field: 'cabin_number', displayName:'Cabin'},
              { field: 'ready_/_rush' }
            ],
            onRegisterApi: function( gridApi ) {
              $scope.grid2Api = gridApi;
            }
        };

        $scope.assign = function (housekeeper){
            var selectedRows = $scope.grid1Api.selection.getSelectedRows();

            var assignee = housekeeper.first_name;

            for(var x in selectedRows){

                var row = selectedRows[x];
                var assignment = {
                    first_name:assignee,
                    status:row.status,
                    cabin_number:row.cabin_number,
                    assigned_from:row.$$hashKey
                };

                if(arrayDoesNotContain(row.assigned_to, assignee)){
                    row.assigned_to.push(assignee);
                    $scope.gridOptions2.data.push(assignment);
                }
                else{
                    alert(assignee + ' has already been assigned to cabin ' + row.cabin_number);
                }
            }

            $scope.grid1Api.selection.clearSelectedRows();
        };

        $scope.unAssign = function(){
          var selectedRows = $scope.grid2Api.selection.getSelectedRows();
          var wholeModel = $scope.gridOptions1.data;
          var assignmentsModel = $scope.gridOptions2.data;

            for(var row in selectedRows){
                var selected = selectedRows[row], from = selected.assigned_from, name = selected.first_name;

                for(var index in wholeModel){
                    var model = wholeModel[index], from_identifier = model.$$hashKey;

                    if(from == from_identifier){
                        model.assigned_to = _.without(model.assigned_to, name)
                        assignmentsModel = _.without(assignmentsModel, selected);
                    }
                }
            }
            $scope.gridOptions2.data = assignmentsModel;

        };

        $scope.isAssigned = function(assignments){
            var assigned = false;
            if(assignments.length > 0){
                assigned = true;
            }
            return assigned;
        };

        $scope.thereIsNoSelection = function(){
            if($scope.grid1Api.selection.getSelectedRows().length > 0){
                return false;
            }
            else{
                return true;
            }
        };

        $scope.assignmentCount = function(){
          if($scope.gridOptions1.data){
              return propertyExistsCounter($scope.gridOptions1.data, 'assigned_to');
          }
          else{
              return 'waiting on data';
          }
        };

        $http.get('/cabin_active').success(function(cabin_active){
            angular.forEach(cabin_active,function(value){
                value.assigned_to = [];
            });
            $scope.gridOptions1.data = cabin_active;
            //$scope.assignmentCount = propertyExistsCounter(cabin_active,'assigned_to');
           // console.log($scope.gridOptions1.data);
        });

        $http.get('/housekeepers').success(function(housekeepers){
         //$scope.gridOptions2.data = housekeepers;
            $scope.gridOptions2.data = [];
            $scope.gridOptions2.housekeepers = housekeepers;
        });

        function arrayDoesNotContain(arr, toBeFound){
            var isNotFound = true;
            for (var arrValue in arr){
                console.log(arr[arrValue]);
                if (arr[arrValue] == toBeFound){
                    isNotFound = false;
                }
            }
            return isNotFound;
        }

        function propertyExistsCounter(model, property){
                var count = 0;
                for(var index in model){
                    //console.log(model[index][property]);
                    if(model[index][property].length > 0){
                        continue;
                    }
                    else{
                        count++;
                    }
                }
                //console.log(count);
                return count;
            }
    }])
    .controller('housekeeping.schedule_dailyController', [ '$scope', '$http', function ($scope, $http) {
        alert('house.daily');
    }]);

