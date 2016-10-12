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
