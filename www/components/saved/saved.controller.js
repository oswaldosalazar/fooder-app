(function () {
  'use strict';

  angular
    .module('app')
    .controller('SavedController', SavedController);

  SavedController.$inject = ['$http', '$scope', '$state', 'authService', 'apiService'];

  function SavedController($http, $scope, $state, authService, apiService) {
    var vm = this;
    vm.results =[];
    var savedResults = [];
    apiService.getVisits(authService.userProfile.user_id)
      .then((results) => {
        vm.results = results.data;
        vm.results.map(function(elem){
          var venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.restaurant_id+"?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031"
          $http.get(venueSearchUrl)
          .then(function(venue) {
            var final = {};
            final.name = venue.data.response.venue.name;
            final.status = venue.data.response.venue.hours.status;
            final.address = venue.data.response.venue.location.address;
            final.image = venue.data.response.venue.photos.groups[0].items[2].prefix+'100x100'+venue.data.response.venue.photos.groups[0].items[2].suffix;
            savedResults.push(final);
          })
        })
      });
      vm.finalResults = savedResults;
  }
} ());
