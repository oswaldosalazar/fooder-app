(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController)
    .controller('CardCtrl', CardCtrl)
    .factory('venueService', function() {
      return {
          venue: {},
          sendVenue: function (venue) {
              this.venue = venue;
          }
      }
    });

  HomeController.$inject = ['$state', 'authService', '$scope', '$http', 'TDCardDelegate', 'venueService'];
  CardCtrl.$inject = ['$scope', 'authService', 'TDCardDelegate', 'venueService'];

  function HomeController($state, authService, $scope, $http, TDCardDelegate, venueService) {
    var vm = this;
    vm.login = login;
    vm.logout = authService.logout;
    vm.user = authService.userProfile;

    function login() {
      authService.login()
    }
    //API queries inserted here
    var cardTypes = [];
    var searchUrl = "https://api.foursquare.com/v2/venues/explore?ll=39.74,-104.99&client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031&section=food&openNow=1";
    $http.get(searchUrl)
    .then(function(restaurants){
        var results = restaurants.data.response.groups[0].items;
        results.map(function(elem){
          var venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.venue.id+"/photos?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031"
          $http.get(venueSearchUrl)
          .then(function(venuePicsUrl) {
            var final = {};
            final.venueId = elem.venue.id;
            final.name = elem.venue.name;
            final.hours = elem.venue.hours;
            final.address = elem.venue.location.address;
            final.image = venuePicsUrl.data.response.photos.items[2].prefix+'300x400'+venuePicsUrl.data.response.photos.items[2].suffix;
            cardTypes.push(final);
          })
        })
    })
    $scope.cards = cardTypes;
    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };
    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
    venueService.sendVenue(cardTypes);
  }

  function CardCtrl($scope, authService, TDCardDelegate, venueService) {
    var vm = this;
    vm.user_id = authService.userProfile.user_id;

    // function login() {
    //   authService.login()
    // }
    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    }
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      vm.venue = venueService.venue[index].venueId;
      console.log(vm.user_id);
      console.log(vm.venue);
      $scope.addCard();
    }
  }
}());
