var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination']);

app.controller('gridCtrl', [
'$scope', '$http', function($scope, $http) {


  var paginationOptions = {
    pageNumber: 1,
    pageSize: 5
  };

  $scope.gridOptions = {
	  // turn off horizontal scroll bar
    enableHorizontalScrollbar: 0,
	  // turn off horizontal scroll bar
	enableVerticalScrollbar: 0,
	// list options for items per page
    paginationPageSizes: [5, 10, 25, 50, 75, 100, 500],
	// inital number of items on page 
    paginationPageSize: 5,
    useExternalPagination: true,
	// define the columns, if you dont define them it will use the key name
    /*columnDefs: [
      { name: 'name' },
      { name: 'name2' },
      { name: 'name3'}
    ],*/
	// The function below just looks for changes in our page number like when you click the next group of items in the grid
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        getPage();
      });
    }
  };

  var getPage = function() {
    var url;
	// This is where our data is located, so for example you could have it at http://jsonplaceholder.typicode.com/posts
        url = 'data.json';

    $http.get(url)
    .success(function (data) {
		// Edited this to set the total number of pages to the length of the data coming back
      $scope.gridOptions.totalItems = data.length;
      var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
      $scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
    });
  };

  getPage();
}
]);
