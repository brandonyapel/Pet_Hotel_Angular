console.log('client.js is sources');

var app = angular.module('PetHotelApp', []);

app.controller('OwnerController', ['$http', function ($http){
    console.log('OwnerController has been loaded')
    var self = this;
    self.message = 'Zip zap partner!';
    self.ownerArray = [];

    self.newOwner = {};

    

    self.getOwners = function () {
        console.log('in getOwners();')
        $http({
            method: 'GET',
            url: '/registration'
        }).then(function(response) {
            console.log('response', response.data);
            self.ownerArray = response.data;
        });
    };
    self.getOwners();

    self.addOwner= function(newOwner) {
        console.log('in addOwner();')
        $http({
            method: 'POST',
            url: '/registration',
            data: newOwner
        }).then(function(response) {
            console.log('response', response);
            self.newOwner = {};
            self.getOwners();
        });
    }

    self.petArray = [];
    
    self.newPet = {};

    self.getPets = function () {
        console.log('in getPets();')
        $http({
            method: 'GET',
            url: '/pet'
        }).then(function(response) {
            console.log('response', response.data);
            self.petArray = response.data;
        });
    };

    self.getPets();

    self.addPet= function(newPet) {
        console.log('in addOwner();')
        $http({
            method: 'POST',
            url: '/pet',
            data: newPet
        }).then(function(response) {
            console.log('response', response);
            self.newPet = {};
            self.getPets();
        });
    }
    
    
}]);




// function addNewPet(){
// console.log('add pets button was clicked');
// var newPetName = $('#pet_name').val();
// var newBreedName = $('#breed').val();
// var newColor = $('#color').val();
// var newOwnerId = $('#owner-options option:selected').attr('data-id')
// $.ajax({
//     method: 'POST',
//     url: '/pet',
//     data: { 
//         pet_name: newPetName,
//         breed: newBreedName,
//         color: newColor,
//         owner_id: newOwnerId
//         }
    
//     })
//     success: getAllInfo() 
// }



// function getAllInfo(){
//         console.log( 'in getAllInfo' );
//         // ajax call to server to get List
//         $.ajax({
//           method: 'GET',
//           url: '/pet',
//         }).then(function(response){ //this .then is a promise which is used in a syncronise code
//             console.log('response', response)
//             $('#table-body').empty()
//             for (let i = 0; i < response.length; i++) {
//                 var customer = response[i]
//             $('#table-body').append('<tr><td>' + customer.first_name + '</td><td>' + customer.last_name + `</td>
//             <td>` + customer.name + '</td><td>' + customer.breed + '</td><td>' + customer.color + '</td></tr>');
//             }//end for loop
//         });//end then
//       } // end getAllInfo

// $(document).ready(function () {
//     console.log('jQuery .ready has been loaded');
//     getAllInfo();


//     $('#register').on('click', addNewOwner);
//     $('#add-pet').on('click', addNewPet )

//     });
    
//     function addNewOwner(){
//         console.log('addNewOwner called');
//         var newFirstName=$('#first_name').val();
//         var newLastName=$('#last_name').val();
//         //var ownerName=newFirstName + newLastName;
//         $.ajax({
//           method: 'POST',
//           url: '/registration',
//           data: {
//             first_name: newFirstName,
//             last_name: newLastName
//           }
//       }).then(function(response){
//           console.log('response', response);
//           $('#first_name').val('');
//           $('#last_name').val('');
//           ownerOptionUpdate();
//       })
//       }

//       function ownerOptionUpdate(){
//         $('#owner-options').empty();
//           $.ajax({
//               method: 'GET',
//               url: '/registration',
              
//           }).then(function(response){
//             for (let index = 0; index < response.length; index++) {
//                 $('#owner-options').append('<option data-id="' + response[index].id + '">' + response[index].first_name + '</option>')
                
//             }
//           });
//       }

