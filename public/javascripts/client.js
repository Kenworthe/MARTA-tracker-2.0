angular.module('martaApp', ['ui.router']) //Kenny deleted the ngResource dependency in the deployed version
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/javascripts/ng-templates/index.html',
    controller: 'homeController',
    controllerAs: '$ctrl'
  })
  .state('results', {
    url: '/results',
    templateUrl: '/javascripts/ng-templates/results.html',
    controller: 'resultsController',
    controllerAs: '$ctrl'
  })
  .state('favorites', {
    url: '/favorites',
    templateUrl: '/javascripts/ng-templates/favorites.html',
    controller: 'userController',
    controllerAs: '$ctrl'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: '/javascripts/ng-templates/profile.html',
    controller: 'profileController',
    controllerAs: '$ctrl'
  });
  $urlRouterProvider
  .otherwise('/');
  // $locationProvider
  // .html5Mode({ enabled: true, requireBase: false });

})
.controller('homeController', function() {
  console.log('homeController is alive!');
  this.title = 'Homepage';
})
.controller('resultsController', function() {
  console.log('resultsController is alive!');
  this.title = 'results page';
})
.controller('favoritesController', function() {
  console.log('favoritesController is alive!');
  this.title = 'favorites page';
})
