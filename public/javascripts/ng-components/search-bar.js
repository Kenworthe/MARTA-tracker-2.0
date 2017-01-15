angular.module('martaApp')
    .component('searchBar', {
        templateUrl: '/javascripts/ng-templates/search-bar.html',
        controller: searchBarController,
        controllerAs: '$ctrl'
    })

function searchBarController(busService, railService, userService, $filter) {
    console.log('searchBarController is alive!');
    let self = this;
    self.bothFilter =  null;
    self.trains = railService.trains;
    // self.buses = busService.buses;
    // self.both = self.trains.concat(self.buses);

    self.setBothFilter = function(input){
      self.bothFilter = input;
    }

    self.userSelection = userService.userSelection;
    self.setSelection = function(input){
        userService.userSelection = input;
        self.userSelection = input;
    };
}
