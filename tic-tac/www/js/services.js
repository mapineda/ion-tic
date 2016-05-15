angular.module('tictac.services', ['ionic.utils'])

.factory('User', function($http, $q, $localstorage, SERVER) {

  var o = {
    username: false,
    session_id: false //TODO: session token should expire after x days
  }

  // attempt login or signup
  o.auth = function(username, signingUp) {

    var authRoute;

    if (signingUp) {
      authRoute = 'signup';
    } else {
      authRoute = 'login '
    }

    return $http.post(SERVER.url + '/' + authRoute, {username: username})
      .success(function(data) {
        o.setSession(data.username, data.session_id)
    })
  }

  //set session data
  o.setSession = function(username, session_id) {
    if (username) o.username = username;
    if (session_id) o.session_id = session_id;

    //set data to localstorage object
    $localstorage.setObject('user', {username: username, session_id: session_id });
  }
  
});
