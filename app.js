

function studentController($scope,$http,$q) {
            var url = "data.txt";
			var url1 = "data1.txt";
			var url2 = "data2.txt";
			var purl1 = "pdata1.txt";
			var purl2 = "pdata2.txt";
            $http.get(url).then( function(response) {
               $scope.students = response.data;
            });
			
			$http.get(url1).then( function(response) {
               $scope.students1 = response.data;
			   
            });
			var promise1 = $http.get(purl1)
			var promise2 = $http.get(purl2);
			$q.all([promise1, promise2]).then(function(results){
				console.log(results);
				$scope.mysent = results[0].data.sent +" "+results[1].data.sent; 
			});
			
			
			
			
			
	}