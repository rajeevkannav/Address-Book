angular.module('AddressBook')
    .controller('NavCtrl', [
        '$scope',
        '$state',
        'Auth',
        function($scope, $state, Auth){
            $scope.signedIn = Auth.isAuthenticated;
            $scope.logout = Auth.logout;

            $scope.$on('devise:new-registration', function (e, user){
                $scope.user = user;
            });

            $scope.$on('devise:login', function (e, user){
                $scope.user = user;
            });

            $scope.$on('devise:logout', function (e, user){
                $scope.user = {};
                $state.go('login');
            });
        }]);