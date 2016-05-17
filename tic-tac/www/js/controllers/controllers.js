angular.module('tictac.controllers', [])

/* controller for splash page */
.controller('SplashCtrl',['$scope', '$state', '$log', '&ionicSlideBoxDelegate', '$ionicPopup', 'GameService', function($scope, $state, $log, $ionicSlideBoxDelegate, $ionicPopup, GameService) {
// set parameters of the game including loading the game board state, restarts, reloads, select game types for later iterations that include bigger boards
  $scope.started = false;
  $scope.gameOver = false;

  var splash_page_slider = $ionicSlideBoxDelegate.$getByHandle('splash_page_slider');

  $scope.startGame = function() {
    $scope.started = true;
    $ionicSlideBoxDelegate.slide(1);
  };

  $scope.running = true;
  var winCount = 0;

  winCount = GameService.getWinCount();
  $scope.gameArray = GameService.getGameArray();

  $scope.playGame = function() {
    splash_page_slider.slide(1);
  };

  $scope.selectGameType = function(type) {
    if (type === 3) {
      $state.go('play-game-3by3');
      GameService.setWinCount(3);
      GameService.setGameArray(GameService.getGameArray3by3);
      $log.log('3x3 selected');
    }
  };

  $scope.reStartGame = function() {
    $state.go($state.current, {}, {reload: true});
  };

  $scope.goToGame = function() {
    $state.go('splash', {}, {reload: true});
    $scope.started = false;
  };
// set player parameters of game
  $scope.player_num = 'First';
  $scope.clickCount = 0;
  $scope.clickedArray = [];
  $scope.playerOneArray = [];
  $scope.playerTwoArray = [];
  $scope.wonGame = {player: '', status: false};

  var icons = ["<i class='icon ion-ios-circle-outline'></i>", "<i class='icon ion-ios-circle-filled'></i>"];
  var css_classes = ['odd_click', 'even_click'];

  $scope.cellClicked = function(val) {
    if ($scope.wonGame.status === false) {

      $scope.clickCount += 1;

      if ($scope.clickCount % 2 === 1) {
        $scope.playerOneArray.push(val);
      } else {
        $scope.playerTwoArray.push(val);
      }

      if($scope.playerOneArray.length >= winCount && $scope.clickCount % 2 === 1) {
        angular.forEach($scope.gameArray, function (val, key) {
          var temp = 0;
          angular.forEach($scope.playerOneArray, function (pVal, pKey) {
            if (val.indexOf(pvVal) >= 0) {
              temp += 1;
            }
          });

          if (temp === winCount) {
            $scope.wonGame.player = 'Player 1';
            $scope.wonGame.status = true;
            $scope.gameOver = true;

            $ionicPopup.alert({
              title: 'Game Over',
              template: $scope.wonGame.player + ' won the game'
            }).then(function () {
              $state.go($state.current, {}, {reload: true});
            })
          }
        });
      }
      // start here
      if ($scope.clickCount === (winCount * winCount) && $scope.wonGame.status === false) {
        $scope.gameOver = true;
        $ionicPopup.alert({
          title: 'Draw',
          template: 'Game draw'
        }).then(function() {
          $state.go($state.current, {}, {reload: true});
        })
      }
      if ($scope.playerTwoArray.length >= winCount && $scope.clickCount % 2 === 0) {
        angular.forEach($scope.gameArray, function (val, key) {
          var temp = 0;

        angular.forEach($scope.playerTwoArray, function (pVal, pkey) {
          if (val.indexOf(pVal) >= 0) {
            temp += 1;
          }
        });

        if (temp === winCount) {
          $scope.wonGame.player = 'Player 2';
          $scope.wonGame.status = true;
          $scope.gameOver = true;

          $ionicPopup.alert({
            title: 'Game Over'
            template: $scope.wonGame.player + ' won the game'
          }).then(function() {
            $state.go($state.current, {}, {reload:true});
          })
        }
    });
  }

  if ($scope.clickCount % 2 == 0) {
    $scope.player_num = 'First';
  } else {
    $scope.player_num = 'Second';
  }

  document.getElementById(val).innerHTML = icons[$scope.clickCount % 2];
  document.getElementById(val).classList.add(css_classes[$scope.clickCount % 2]);
  }
};

})];
