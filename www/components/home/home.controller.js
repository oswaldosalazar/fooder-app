(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController)
    .controller('CardCtrl', CardCtrl);

  HomeController.$inject = ['$state', 'authService', '$scope', '$http', 'TDCardDelegate'];
  CardCtrl.$inject = ['$scope', 'TDCardDelegate'];

  function HomeController($state, authService, $scope, $http, TDCardDelegate) {
    var vm = this;
    vm.login = login;
    vm.logout = authService.logout;

    function login() {
      authService.login()
    }
    //API queries inserted here
    var cardTypes = [];
    var searchUrl = "https://api.foursquare.com/v2/venues/explore?ll=39.74,-104.99&client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031&section=food";
    $http.get(searchUrl)
    .then(function(restaurants){
        var results = restaurants.data.response.groups[0].items;
        results.map(function(elem){
          var venueSearchUrl = "https://api.foursquare.com/v2/venues/"+elem.venue.id+"/photos?client_id=NHF0X5EXQLHYJ3IG5FIYSJYD2R33BLQSKGGQUBSIYMXWFYA4&client_secret=5TRQLKFODOFFJW55T0FHBH3BWNW3RFAOBK24BK2BSPB2QD3C&v=20161031&section=food"
          $http.get(venueSearchUrl)
          .then(function(venuePicsUrl) {
            var final = {};
            final.id = elem.venue.id;
            final.name = elem.venue.name;
            final.hours = elem.venue.hours;
            final.image = venuePicsUrl.data.response.photos.items[0].prefix+'300x500'+venuePicsUrl.data.response.photos.items[0].suffix;
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
  }
  function CardCtrl($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    }
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    }
  }

}());
