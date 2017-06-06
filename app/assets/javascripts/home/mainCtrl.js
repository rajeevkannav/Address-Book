angular.module('AddressBook')
    .controller('MainCtrl', [
        '$scope',
        '$filter',
        'contacts',
        function($scope, $filter, contacts){

            $scope.contacts = contacts.contacts;

            $scope.addContact = function(){
                contacts.create($scope.contact);
            };

            $scope.edit = function(contact){
                $scope.contact = JSON.parse(JSON.stringify(contact));
            };

            $scope.updateContact = function(){
                contacts.update($scope.contact);
            };

            $scope.deleteContact = function(contact){
                contacts.destroy(contact);
            };

            $scope.load = function() {
                jQuery('#contactDob').datetimepicker({
                    timepicker:false,
                    format:'Y-m-d',
                    maxDate: new Date()
                });
            };

            $scope.openModal = function(){
                $scope.contact = {};
                $('#contactForm').modal('show');
            };
            //$scope.load();
        }
    ]);