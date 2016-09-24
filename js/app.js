angular.module('springboard', ['ui.router']);

angular.module('springboard').config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider

    .state('courses', {
        url: '',
        templateUrl: 'course/course.html',
        controller: 'courseController'

    });

    $urlRouterProvider.otherwise('');

 });