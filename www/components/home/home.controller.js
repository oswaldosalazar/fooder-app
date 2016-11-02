(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'authService', '$scope', '$http'];

  function HomeController($state, authService, $scope, $http) {
    var vm = this;
    $scope.view = {}

    vm.login = login;
    vm.logout = authService.logout;

    function login() {
      authService.login()
    }

    //API queries inserted here
    var combinedArray = [];
    var searchUrl = "https://api.foursquare.com/v2/venues/explore?ll=39.74,-104.99&client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031&section=food";
    $http.get(searchUrl)
    .then(function(restaurants){
        var results = restaurants.data.response.groups[0].items;
        results.map(function(elem){
          var venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.venue.id+"/photos?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031&section=food"
          $http.get(venueSearchUrl)
          .then(function(venuePicsUrl) {
            var final = {}
            final.id = elem.venue.id;
            final.name = elem.venue.name;
            final.hours = elem.venue.hours;
            final.pic = venuePicsUrl.data.response.photos.items[1].prefix+'300x500'+venuePicsUrl.data.response.photos.items[1].suffix;
            combinedArray.push(final)
          })
        })
    })
    console.log(combinedArray);
    $scope.view.restaurants = combinedArray
  }

}());
