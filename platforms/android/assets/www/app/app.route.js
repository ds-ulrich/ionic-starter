starter.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('app',{
      url: '/',
      views: {
        'header':{
          templateUrl: 'app/shared/header/headerView.html',
          controller: 'headerController'
        },
        'content': {
          templateUrl: 'app/components/home/homeView.html',
          controller: 'homeController'
        },
        'sidebar':{
          templateUrl: 'app/shared/sidebar/sidebarView.html',
          controller: 'sidebarController'
        }
      },
      ncyBreadcrumb: {
        label: 'Accueil'
      }
    }).state('app.screen', {
      url: 'screen',
      views: {
        'content@': {
          templateUrl: 'app/components/screen/screenView.html',
          controller: 'screenController'
        }
      }

    // }).state('app.example', {
    //   url: 'example/:id',
    //   views: {
    //     'content@': {
    //       templateUrl: 'app/components/example/exampleView.html',
    //       controller: 'exampleController'
    //     }
    //   }
    });
});