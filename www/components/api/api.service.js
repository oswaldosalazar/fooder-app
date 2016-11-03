(function() {

  'use strict';

  angular
    .module('app')
    .service('apiService', apiService);

  apiService.$inject = ['$http'];

  function apiService($http) {

    this.getVisits = function(user_id) {
      return $http.get(`http://fooder-api.herokuapp.com/visits?id=${user_id}`);
    }

    this.postVisit = function(user_id, restaurant_id) {
      return $http({
        method: 'POST',
        url: 'http://fooder-api.herokuapp.com/visits',
        data: {
          user_id,
          restaurant_id
        }
      });
    }

  }

})();
