angular.module('MaterialApp').controller('NavController', ['navService', '$scope', function(navService, $scope)
    {
        // body...
        $scope.name = "aaaaa";
        navService
        navService.getMenus().then(function(result)
        {
            console.log(result);
            $scope.menus = result
        })
    }]);