angular.module('tictac.controllers', ['ionic', 'tictac.services'])

/* controller for splash page */
.controller('SplashController', function($state, $sanitize) {
  var self = this;
  self.join = function() {
    //sanitize the username
    var username=$sanitize(self.username)
    if (username) {
      $state.go('play', {username:username})
    }
  }
});
