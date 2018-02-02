var app = angular.module("myApp",[]);

function studentController($scope,$http,$q,myfactory,httpfactory) {
            var url = "data.txt";
			var url1 = "data1.txt";
			var url2 = "data2.txt";
			var purl1 = "pdata1.txt";
			var purl2 = "pdata2.txt";
			
			$scope.message = myfactory.showmessage();
			console.log("my message"+$scope.message);
			
			// from the httpfactory
			var handleSuccess = function(data, status) {
				$scope.factstudents = data;
				console.log("this is from factory"+$scope.factstudents);
			};			
			httpfactory.getSessions().success(handleSuccess);
			
			
            $http.get(url).then( function(response) {
               $scope.students = response.data;
            });
			
			$http.get(url1).then( function(response) {
               $scope.students1 = response.data;
			   
            });
			var promise1 = $http.get(purl1)
			var promise2 = $http.get(purl2);
			var promise3 = Promise.resolve(promise1);
			promise3.then(function(value) {
			  console.log(value);
			  $scope.fsent = value.data.sent;
			  // expected output: Array [1, 2, 3]
			});
			$q.all([promise1, promise2,promise3]).then(function(results){
				console.log(results);
				$scope.mysent = $scope.fsent +" "+results[1].data.sent; 
			});
			/** working with promises
			**/
	}
	/** working with sample factory services. 
	*/
	app.factory("myfactory",function() {
		var message="Hi this is from factory";
		return {
			showmessage: function(){
				return message;
			}
			
		};
	});
	// this factory is working successfully
	app.factory("httpfactory",function($http){
		var surl = "data.txt";
		 return {
        getSessions: function() {
            return $http.get(surl, { 
                type : 'getSource',
                ID    : 'TP001'
				});
			}
		};
	});