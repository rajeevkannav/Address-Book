angular.module('AddressBook')
    .factory('contacts', [
        '$http',
        '$filter',
        'notificationService',
        function($http, $filter, notificationService){
        var object = {
            contacts: [],
            index: function(){
                return $http.get('/contacts.json').then(function(response){
                    angular.copy(response.data, object.contacts);
                    _.forEach(_.filter(response.data, function(contact) { return !_.isNull(contact.dob); }), function(contact){
                        console.log(contact);
                        console.log(moment().diff(contact.birthday, 'years', true));
                    ////    contact.age = moment().diff(contact.birthday, 'years', true);
                    });
                }, function(error){
                    console.log(error);
                })
            },
            create: function(contact){
                return $http.post('/contacts.json', contact).then(function(response){
                    $('#contactForm').modal('hide');
                    object.contacts.push(response.data);
                    notificationService.success('Contact successfully created.');
                }, function(response){
                    contact.errors = response.data.errors;
                })
            },
            destroy: function(contact){
                return $http.delete('/contacts/'+ contact.id+'.json').then(function(response){
                    _.remove(object.contacts, function(con){return con.id == contact.id });
                    notificationService.success('Contact successfully destroyed.');
                }, function(response){
                    contact.errors = response.data.errors;
                })
            },
            update: function(contact){
                resource_url = '/contacts/'+ contact.id+'.json';
                return $http.put(resource_url, contact).then(function(response){
                    $('#contactForm').modal('hide');
                    notificationService.success('Contact successfully updated.');
                    $http.get(resource_url).then(function(response){
                        contact = {};
                        _.assign(_.find(object.contacts, {id: response.data.id }), response.data);

                    },function(response){
                        console.log(response);
                    });
                }, function(response){
                    contact.errors = response.data.errors;
                })
            }
        };
        return object;
    }]);