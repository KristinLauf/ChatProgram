app.controller("ChatController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
	$scope.roomNames = [];


	var socket = io.connect('http://localhost:8080');

	socket.emit("rooms");

	$scope.addRoom = function() {
		/*$scope.roomNames.push({
			roomName: $scope.roomName
		}*/

		socket.emit("joinroom", {room: $scope.roomName}, function(success, reason) {
			socket.emit("rooms");
		});

		
	};

	$scope.joinRoom = function(room) {
		if(socket) {
			//SocketService.setConnected(socket);
			//SocketService.setRoom($scope.roomName);
			//console.log("I am joining the room: " + $scope.roomname);
			$location.path("/room/" + room);
		}
		
	};

	//til þess að fá listan yfir rooms
	socket.on("roomlist", function(roomlist){
		$scope.roomNames = [];

		for(var room in roomlist){
			console.log(room);
			$scope.roomNames.push(room);
		}
		$scope.$apply();
	});


}]);