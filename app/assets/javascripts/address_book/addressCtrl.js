angular.module('AddressBook')
    .controller('AddressCtrl', [
        '$scope',
        'contacts',
        function($scope, contacts){
            $scope.button_text = 'Add Contact';
            $scope.defaultAction = 'addContact()';
            $scope.contacts = contacts.contacts;

            $scope.addContact = function(){
                $scope.contact.id = $scope.contacts.length + 1;
                $scope.contacts.push(JSON.parse(JSON.stringify($scope.contact)));
                $('#newContact').modal('hide');
                $scope.contact = {};
            };

            $scope.edit = function(contact){
                scope.button_text = 'Update Contact';
                $scope.contact = JSON.parse(JSON.stringify($scope.contact));
            };

            $scope.updateContact = function(){
                $scope.contact.id = $scope.contacts.length + 1;
                $scope.contacts.push(JSON.parse(JSON.stringify($scope.contact)));
                $scope.contact = {};
            };

            $scope.deleteContact = function(contact){
                $scope.contacts.pop(contact);
            };
        }
    ]);