angular.module('martaApp')
.component('liveTicker', {
	templateUrl: '/javascripts/ng-templates/live-ticker.html',
	controller: liveTickerController,
	controllerAs: '$ctrl'
})
function liveTickerController(railService, busService, userService, $filter, $timeout){
	console.log('liveTickerController is alive!');
	let vm = this;
	vm.selectedStation = userService.userSelection;
	vm.station = [];
	// vm.selectedBusStop = userService.userSelection;
	// vm.busStop = [];
	vm.repeat = true;

	vm.getStationRepeat = function(stationName){
		console.log(stationName);
		railService.getAllTrains()
		.then( (response) => {
			vm.station = $filter('filter')(response.data, { 'STATION': stationName });
			console.log(vm.station);
			if (vm.repeat){
				$timeout(() => { vm.getStationRepeat(stationName) }, 3000);
			}
			else { return }
		});
	}
	if(vm.selectedStation){
		vm.getStationRepeat(vm.selectedStation);
	}

	// vm.getBusStopRepeat = function(stopName){
	// 	console.log(stopName);
	// 	busService.getAllBuses()
	// 	.then( (response) => {
	// 		vm.busStop = $filter('filter')(response.data, { 'TIMEPOINT': stopName });
	// 		console.log(vm.busStop);
	// 		if (vm.repeat){
	// 			$timeout(() => { vm.getBusStopRepeat(stopName) }, 3000);
	// 		}
	// 		else { return }
	// 	});
	// }
	// vm.getBusStopRepeat(vm.selectedBusStop);

  vm.addNewFavorite = function(station){
    userService.postFavorite(station)
    .then(function(){
      console.log('post successfull!')
    })
    .catch(function(err){
      console.log(err);
    })
  }



//timeout function to stop refresh after a set duration.
	$timeout(function(){
		vm.repeat = false;
		console.log('Repeat set to false!');
	}, (2*60*1000));

//stop timeout if user changes URL
	// $rootScope.$on('$locationChangeStart', function(){
	// 	vm.repeat = false;
	// })
}
