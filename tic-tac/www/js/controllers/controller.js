angular.module('tictac.controllers', [])

.controller('LoginCtrl', function ($scope, $state, $ngCordovaOauth, UserService, Config, $ionicPlatform, $ionicLoading, $cordovaPush) {

  if (UserService.current()) {
    $state.go('home');
  }
  $scope.twitter = function () {
    $ionicPlatform.ready(function () {
      $ngCordovaOauth.twitter(Config.twitterKey, Config.twitterSecret)
        .then(function (result) {
          $ionicLoading.show({
            template: 'Loading...'
          });
          UserService.login(result).then(function (user) {
            if (user.deviceToken) {
              $ionicLoading.hide();
              $state.go('home');
              return;
            }

            $ionicPlatform.ready(function () {
              $cordovaPush.register({
                badge: true,
                sound: true,
                alert: true
              }).then(function (result) {
                UserService.registerDevice({
                  user: user,
                  token: result
                }).then(function () {
                  $ionicLoading.hide();
                  $state.go('home');
                }, function (err) {
                  console.log(err);
                });
              }, function (err) {
                console.log('reg device error', err);
              });
            });
          });
        }, function (error) {
          console.log('error', error);
        });
    });
  };
})


.controller('HomeCtrl', ['$scope', '$state', '$log', '$ionicSlideBoxDelegate', '$ionicPopup','GameService',
  function ($scope, $state, $log, $ionicSlideBoxDelegate, $ionicPopup, GameService) {

    $scope.started = false;
    $scope.gameOver = false;
    //create var for page slider
    var splash_page_slider = $ionicSlideBoxDelegate.$getByHandle('splash_page_slider');
    //start game function
    $scope.startGame = function () {
      $scope.started = true;
      $ionicSlideBoxDelegate.slide(1);
    };
    //is the game running? t/f
    $scope.running = true;
    var winCount = 0;

    winCount = GameService.getWinCount();
    $scope.gameArray = GameService.getGameArray();

    $scope.playGame = function () {
      splash_page_slider.slide(1);
    };
    $scope.selectOption = function (type) {
      if (type === 3) {
        $state.go('play');
        GameService.setWinCount(3);
        GameService.setGameArray(GameService.getGameArray3by3);
        $log.log('play selected');
      } else if (type === 4) {
        $state.go('profile');
        $log.log('profile selected');
      } else if (type === 5) {
        $state.go('leaderboard');
        $log.log('leaderboard selected');
      }
    };
    //restart game
    $scope.reStartGame = function () {
      $state.go($state.current, {}, {reload: true});
    };
    // go to home state
    $scope.goToGame = function () {
      $state.go('home', {}, {reload: true});
      $scope.started = false;
    };

    $scope.pauseResumeGame = function () {
      $scope.running = !$scope.running;
    };
    // go to about state
    $scope.goToAbout = function () {
      $state.go('about', {}, {reload: true});
      $scope.started = false;
    };
    // go to privacy state
    $scope.goToPrivacy = function () {
      $state.go('privacy', {}, {reload: true});
      $scope.started = false;
      $log.log('privacy policy selected');
    };
    // go to next slide in about state
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    // direct to previous slide in about state
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

    $scope.player_num = 'First';
    $scope.clickCount = 0;
    $scope.clickedArray = [];
    $scope.playerOneArray = [];
    $scope.playerTwoArray = [];
    $scope.wonGame = {player: '', status: false};

    // declare variables for player icons
    var icons = ["<i class='icon ion-android-radio-button-off'></i>", "<i class='icon ion-android-close'></i>"];
    var css_classes = ['odd_click', 'even_click'];
    // write game logic
    $scope.cellClicked = function (val) {
      if ($scope.wonGame.status === false) {

        $scope.clickCount += 1;

        if ($scope.clickCount % 2 === 1) {
          $scope.playerOneArray.push(val);
        } else {
          $scope.playerTwoArray.push(val);
        }

        if ($scope.playerOneArray.length >= winCount && $scope.clickCount % 2 === 1) {
          angular.forEach($scope.gameArray, function (val, key) {
            var temp = 0;
            angular.forEach($scope.playerOneArray, function (pVal, pKey) {
              if (val.indexOf(pVal) >= 0) {
                temp += 1;
              }
            });
            if (temp === winCount) {
              $scope.wonGame.player = 'Player 1';
              $scope.wonGame.status = true;
              $scope.gameOver = true;
              // ionic popup alert when game is over + who won the game then restart the game
              $ionicPopup.alert({
                title: 'Game Over',
                template: $scope.wonGame.player + ' won the game'
              }).then(function () {
                $state.go($state.current, {}, {reload: true});
              })
            }
          });
        }

        if ($scope.clickCount === (winCount * winCount) && $scope.wonGame.status === false) {
          $scope.gameOver = true;
          //once game is over initiate ionic popup alert + who won the game then restart the game
          $ionicPopup.alert({
            title: 'Game Tie',
            template: 'Game tie up'
          }).then(function () {
            $state.go($state.current, {}, {reload: true});
          })
        }

        if ($scope.playerTwoArray.length >= winCount && $scope.clickCount % 2 === 0) {
          angular.forEach($scope.gameArray, function (val, key) {
            var temp = 0;

            angular.forEach($scope.playerTwoArray, function (pVal, pKey) {
              if (val.indexOf(pVal) >= 0) {
                temp += 1;
              }
            });

            if (temp === winCount) {
              $scope.wonGame.player = 'Player 2';
              $scope.wonGame.status = true;
              $scope.gameOver = true;
              // ionic game over pop up + who won + restart game
              $ionicPopup.alert({
                title: 'Game Over',
                template: $scope.wonGame.player + ' won the game'
              }).then(function () {
                $state.go($state.current, {}, {reload: true});
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
        //document.getElementById('id').classList.remove('class');
      }
    };


  }]);
