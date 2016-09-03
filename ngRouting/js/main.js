var myapp = angular.module("routing", ["ngRoute"]);
myapp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "index.html",
        })
        .when("/Search/:searchstr?", {
            templateUrl: "Search.html",
            controller: "searchController"
        })
        .when("/loadAll", {
            templateUrl: "Search.html",
            controller: "loadAllCntroller"
        })
        .when("/edit", {
            templateUrl: "edit.html",
            controller: "editController"
        })
        .when("/newPlayer", {
            templateUrl: "edit.html",
            controller: "playerController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);
// Registering Home page Controller

myapp.controller('indexController', ['$scope', function($scope) {}]);

// Registering Search controller which will search players 

myapp.controller('searchController', ['$scope', 'Service', 'mainService', '$routeParams', '$log', function($scope, Service, mainService, $routeParams, $log) {
    console.log("Got route param: ", $routeParams.searchstr);
    this.txtSearch = $routeParams.searchstr;

    if (this.txtSearch == undefined) {
        $log.info(" please enter correct id  ");

    } else {
        mainService.Search(this.txtSearch)
            .then(function(response) {
                if (response.data == '') {
                    $log.info('not found');
                } else {
                    $scope.players = response.data;
                }
            });
    }
    $scope.editt = function(id) {
        Service.setid(id);
    }
}]);
// controller for loading all players and deleting
myapp.controller('loadAllCntroller', ['$scope', 'mainService', 'Service', function($scope, mainService, Service) {
    var start = 0;
    $scope.prev = false;
    $scope.next = true;
    mainService.load(start)
        .then(function(response) {
            $scope.players = response.data;
        });
    $scope.editt = function(id) {
        Service.setid(id);
    }
    $scope.Delete = function(id) {
        mainService.delete(id)
            .then(function(response) {});
    }

}]);
// controller for editing and updating players
myapp.controller('editController', ['$scope', 'Service', 'mainService', function($scope, Service, mainService) {
    var id = Service.getid();
    mainService.edit(id)
        .then(function(response) {
            $scope.Details = response.data;
        });

    $scope.UpdatePlayers = function(id, Details) {
        mainService.UpdatePlayers(id, Details)
            .then(function(response) {
                $scope.Details = [response];
            });
    }
}]);
// controller for Adding new players
myapp.controller('playerController', ['$scope', 'mainService', '$log', function($scope, mainService, $log) {
    $scope.AddPlayers = function(Details) {
        mainService.AddPlayers(Details)
            .then(function(response) {
                $scope.Details = [response];
            });
    }
}]);
