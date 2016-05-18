angular.module('tictac.services', [])

.service('GameService', ['$log', function($log) {
  this.getGameArray3by3 = [
    ['11', '12', '13'],
    ['21', '22', '23'],
    ['31', '32', '33'],
    ['11', '21', '31'],
    ['12', '22', '32'],
    ['13', '23', '33'],
    ['11', '22', '33'],
    ['13', '22', '31'],
  ];

  this.winCount = 0;
  this.setWinCount = function(winCount) {
    this.winCount = winCount;
  };
  this.getWinCount = function() {
    return this.winCount;
  };

  this.gameArray = [];
  this.setGameArray = function(gameArray) {
    this.gameArray = gameArray;
  };
  this.getGameArray = function() {
    return this.gameArray;
  };
}]);
