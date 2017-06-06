
angular.module('AddressBook', ['ui.router', 'templates', 'Devise', 'jlareau.pnotify'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        'notificationServiceProvider',
        function($stateProvider,  $urlRouterProvider, notificationServiceProvider) {
            notificationServiceProvider
                .setDefaults({
                    styling: 'bootstrap3',
                    delay: 4000,
                    buttons: {
                        closer: false,
                        closer_hover: false,
                        sticker: false,
                        sticker_hover: false
                    },
                    type: 'error'
                });

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'MainCtrl',
                    onEnter: ['$state', 'Auth', 'notificationService', function($state, Auth, notificationService) {
                        Auth.currentUser().then(function (){}, function(response){
                            notificationService.error(response.data.error);
                            $state.go('login');
                        })

                    }],
                    resolve: {
                        contactPromise: ['contacts', function(contacts){
                            return contacts.index();
                        }]
                    }
                })
                .state('login', {
                    url: '/users/sign_in',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', 'notificationService', function($state, Auth, notificationService) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        });
                    }]
                })
                .state('forgot_password', {
                    url: '/forgot_password',
                    templateUrl: 'auth/_forgot_password.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })
                .state('reset_password', {
                    url: '/users/password/edit',
                    templateUrl: 'reset_password/_reset_password.html',
                    controller: 'ResetPasswordCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })
                .state('register', {
                    url: '/users/sign_up',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                });
            $urlRouterProvider.otherwise('home');
        }]);