angular.module('AddressBook')
    .controller('AuthCtrl', [
        '$scope',
        '$state',
        'Auth',
        'notificationService',
        function($scope, $state, Auth, notificationService){
            $scope.user = {};

            $scope.login = function() {
                Auth.login($scope.user).then(function(response){
                    notificationService.success('Welcome back!');
                    $state.go('home');
                }, function(response){
                    notificationService.error(response.data.error);
                    $scope.user.password = '';
                });
            };

            $scope.register = function() {
                Auth.register($scope.user).then(function(){
                    $state.go('home');
                },function(response){
                        $scope.user.errors = response.data.errors;
                    }
                );
            };

            Auth.currentUser().then(function (user){
                $scope.user = user;
            });

            $scope.forgot_password = function() {
                Auth.sendResetPasswordInstructions($scope.user).then(function(response) {
                   console.log(response);
                },
                function(response){
                    $scope.user.errors = response.data.errors;
                });
            }
        }]);
