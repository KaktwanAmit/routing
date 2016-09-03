myapp.factory('Service', function() {
    var obj = {};
    obj.getid = function() {
        return obj.id;
    }
    obj.setid = function(id) {
        obj.id = id;
    }
    return obj;
});
myapp.factory('mainService', ['$http', function($http) {
    var obj1 = {};
    obj1.Search = function(txtSearch) {
        return $http.get('http://localhost:8080/players?id=' + txtSearch);
    }

    obj1.load = function(start) {
        return $http.get('http://localhost:8080/players?_start=' + start + '&_limit=10')
    }
    obj1.delete = function(id) {
        return $http.delete('http://localhost:8080/players/' + id);
    }
    obj1.edit = function(id) {
        return $http.get('http://localhost:8080/players/' + id);
    }
    obj1.UpdatePlayers = function(id, Details) {
        return $http.put('http://localhost:8080/players/' + id, Details);
    }
    obj1.AddPlayers = function(Details) {
        return $http.post('http://localhost:8080/players/', Details);
    }
    return obj1;
}]);
