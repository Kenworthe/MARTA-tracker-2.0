angular.module('martaApp')
.component('navBar', {
  templateUrl: '/javascripts/ng-templates/nav-bar.html',
  controller: navBarController,
  controllerAs: '$ctrl'
})
function navBarController(userService){
  var vm = this;
  vm.user = {};
  vm.userSelection = userService.userSelection;
  
  vm.setSelection = function(input){
      userService.userSelection = input;
  };

  vm.getUserInfo = function(){
    userService.getUser()
    .then(function(response){
      if (response.data.id){
        vm.user = response.data;
        // console.log(vm.user);
      }
      else {
        console.log('response.data did not include user.id.\nPlease log in to continue.');
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }

  vm.getUserInfo();

  vm.removeFavorite = function(station){
    userService.deleteFavorite(station)
    .then(function(){
      vm.getUserInfo();
      console.log("Here is the new", vm.user.favorites);
  })
    .catch(function(err){
      console.log(err);
    })
  }
}

// this.removeFavorite = function(station){
//   userService.deleteFavorite(station)
//   .then(function(){
//     vm.getUserInfo();
//     console.log("Here is the new", vm.user.favorites);
// })
//   .catch(function(err){
//     console.log(err);
//   })
// }
