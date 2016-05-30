var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
  
    // create an admin application
    var admin = nga.application('My First Admin')
      .baseApiUrl('http://0.0.0.0:3000/api/'); // main API endpoint

    // create a flower entity
    var flower = nga.entity('flowers');
    // set the fields of the user entity list view
    flower.listView().fields([
        nga.field('name')
          .isDetailLink(true)
          .editable(true),
        nga.field('latin_name')
    ]);
    flower.creationView().fields([
        nga.field('name'),
        nga.field('latin_name')
    ]);
    flower.showView().fields([
        nga.field('name'),
        nga.field('latin_name')
    ]);
    flower.editionView().fields([
        nga.field('name'),
        nga.field('latin_name')
    ]);
    flower.deletionView().fields([
        nga.field('name'),
        nga.field('latin_name')
    ]);
    
    // add the user entity to the admin application
    admin.addEntity(flower);
    
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}])
.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
})
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})
.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('http://0.0.0.0:3000/api/users/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
})
.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
});