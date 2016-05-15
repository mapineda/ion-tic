angular.module('tictac.controllers', ['ionic', 'tictac.services'])

/* controller for splash page */
.controller('SplashCtrl', function($scope, $state, User) {
  //attempt to sign-in/login via User.auth
  $scope.submitForm = function(username, signingUp) {
    User.auth(username, signingUp).then(function() {
      //session set, redirect to game page
      $state.go('/ ');

    }, function() {
      // error handling
      alert('Username taken...try another username.');
    });
  }

});
