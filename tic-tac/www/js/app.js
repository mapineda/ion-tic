// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tictac', [
  'ionic',
  'tictac.controllers',
  'tictac.services'
])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        cache: false,
        controller: 'HomeCtrl',
        templateUrl: 'templates/splash.html'
      })
      .state('play', {
        url: '/play',
        cache: false,
        controller: 'HomeCtrl',
        templateUrl: 'templates/play.html'
      })
      .state('profile', {
        url: '/profile',
        cache: false,
        controller: 'HomeCtrl',
        templateUrl: 'templates/profile.html'
      })
      .state('leaderboard', {
        url: '/leaderboard',
        cache: false,
        controller: 'HomeCtrl',
        templateUrl: 'templates/leaderboard.html'
      });

    $urlRouterProvider.otherwise('/home')

  });
