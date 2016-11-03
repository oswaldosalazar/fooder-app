(function () {

  'use strict';

  angular
    .module('app')
    .controller('Location', Location)

    function Location() {
      var onSuccess = function(position) {
        console.log('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }



    // .controller('MyCtrl', MyCtrl);
    //
    // MyCtrl.$inject = ['$scope', '$cordovaGeolocation'];
    //
    // function MyCtrl($scope, $cordovaGeolocation) {
    //   var posOptions = {timeout: 10000, enableHighAccuracy: false};
    //   $cordovaGeolocation
    //   .getCurrentPosition(posOptions)
    //
    //   .then(function (position) {
    //     var lat  = position.coords.latitude
    //     var long = position.coords.longitude
    //     console.log(lat + '   ' + long)
    //   }, function(err) {
    //     console.log(err)
    //   });
    //
    //   var watchOptions = {timeout : 3000, enableHighAccuracy: false};
    //   var watch = $cordovaGeolocation.watchPosition(watchOptions);
    //
    //   watch.then(
    //     null,
    //
    //     function(err) {
    //       console.log(err)
    //     },
    //
    //     function(position) {
    //       var lat  = position.coords.latitude
    //       var long = position.coords.longitude
    //       console.log(lat + '' + long)
    //     }
    //   );
    //
    //   watch.clearWatch();
    //
    // }

  }());
