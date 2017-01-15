angular.module('martaApp')
.controller('profileController', function(userService, railService) {
  console.log('profileController is alive!');
  let vm = this;
  vm.user = userService.user;
  // vm.selectedFavorite = {}
  vm.trains = railService.trains;

  vm.getUserInfo = function(){
    userService.getUser()
    .then(function(response){
      if (response.data.id){
        vm.user = response.data;
        vm.favorites = response.data.favorites;
        console.log(vm.user);
        console.log(vm.favorites);
      }
      else {
        console.log('response.data did not include user.id.\nPlease log in to continue.');
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }
  //fetch fresh user data upon loading state
  vm.getUserInfo();

  vm.removeFavorite = function(station){
    userService.deleteFavorite(station)
    .then(function(){
      userService.updateUser();
      vm.getUserInfo();
      console.log("Here is the new", vm.user.favorites);
  })
    .catch(function(err){
      console.log(err);
    })
  }

  vm.addNewFavorite = function(station){
    userService.postFavorite(vm.add)
    .then(function(){
      vm.getUserInfo();
      console.log('post successfull! here is the new user: ', vm.user.favorites)
    })
    .catch(function(err){
      console.log(err);
    })
  }

  console.log('user service user is', userService.user);

})
