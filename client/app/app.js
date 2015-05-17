angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ui.bootstrap',
    'formly',
    'formlyBootstrap'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('customers', {
        url: '/customers',
        views: {
          'body' : {
            templateUrl: 'views/customers/index.html',
            controller: 'CustomersCtrl',
          }
        }
      });

      $urlRouterProvider.otherwise('customers');
    }
  ]);
