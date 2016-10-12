var app = angular.module("ChatApp", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl: "templates/home.html",
		controller: "LoginController",
	}).when("/room/:roomName", { 
		templateUrl: "templates/room.html",
		controller: "RoomController",
	}).when("/chatAvailable", {
		templateUrl: "templates/chatAvailable.html",
		controller: "ChatController",
	
	}).otherwise({ redirectTo: "/" });
}]);

app.factory("SocketService", ["$http", function($http) {
	var username = "";
	var socket;
	return {
		setConnected: function(theSocket) {
			socket = theSocket;
		},
		setUsername: function(user) {
			username = user;
		},
		getUsername: function() {
			return username;
		},
		getSocket: function() {
			return socket;
		}
	};
}]);
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
app.controller("LoginController", ["$scope", "$location", "SocketService", function($scope, $location, SocketService) {
	$scope.username = "";
	$scope.message = "";
	var socket = io.connect('http://localhost:8080');

	$scope.connect = function() {
		if(socket) {
			socket.emit("adduser", $scope.username, function(available) {
				if(available) {
					SocketService.setConnected(socket);
					SocketService.setUsername($scope.username);

					//document.location.hash = "/chatAvailable";
					$location.path("/chatAvailable");
				}
				else {
					$scope.message = "Your name is taken, please choose another";
				}
				$scope.$apply();
			}); 
		}
	};
}]);
app.controller("RoomController", ["$scope", "$routeParams", "$location", "SocketService", function($scope, $routeParams, $location, SocketService) {
	$scope.roomName = $routeParams.roomName; 
	
	$scope.currentMessage = "";

	var socket = SocketService.getSocket();

	if(socket) {
		socket.emit("joinroom", { room: $scope.roomName, pass: "" }, function(success, errorMessage) {

		});

		socket.on("updatechat", function(roomname, messageHistory) {
			console.log(messageHistory);
			$scope.messages = messageHistory;
			$scope.$apply();
		});

		socket.on("updateusers", function(room, users) {
			if(room === $scope.roomName) {
				$scope.users = users;
			}
		});
	}

	$scope.send = function() {
		if(socket) {
			console.log("I sent a message to " + $scope.roomName + ": " + $scope.currentMessage);
			socket.emit("sendmsg", { roomName: $scope.roomName, msg: $scope.currentMessage });
			$scope.currentMessage = "";
		}
	};

	$scope.keyPress = function($event) {
		if($event.keyCode === 13) {
			$scope.send();
		}
	};

	$scope.exitRoom = function() {
		//part from room
		//var socket = SocketService.getSocket();
			
		if(socket){
			socket.emit("partroom", $scope.roomName);
			$location.path("/chatAvailable");
			
		}
	};

}]);