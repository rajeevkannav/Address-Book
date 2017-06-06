angular.module('AddressBook')
    .controller('ResetPasswordCtrl', [
        '$scope',
        '$state',
        '$location',
        'Auth',
        'notificationService',
        function($scope, $state, $location, Auth, notificationService){
            $scope.user = {reset_password_token: $location.search().reset_password_token};

            $scope.resetPassword = function(){
                Auth.resetPassword($scope.user).then(function(new_data) {
                }, function(response) {
                    if(response.data.errors.reset_password_token){
                        notificationService.error('Reset password token ' + response.data.errors.reset_password_token.join() + '.');
                    }
                    $scope.user.errors = response.data.errors;
                });
            };

            $scope.$on('devise:reset-password-successfully', function(event) {
                notificationService.success('Password successfully updated.');
                $state.go('login');
            });
        }]);
