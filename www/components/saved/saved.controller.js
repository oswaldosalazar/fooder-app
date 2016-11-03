(function () {
  'use strict';

  angular
    .module('app')
    .controller('SavedController', SavedController);

  SavedController.$inject = ['$scope', '$state', 'authService', 'apiService'];

  function SavedController($scope, $state, authService, apiService) {
    var vm = this;
    apiService.getVisits(authService.userProfile.user_id)
      .then((results) => {
        vm.results = results;
      });
  }

} ());
