var shipReady = false;
var shipImage = new Image();
shipImage.crossOrigin = "Anonymous";
shipImage.onload = function () {
	shipReady = true;
};
shipImage.src = "images/ship1.png";
var ship2Ready = false;
var ship2Image = new Image();
ship2Image.crossOrigin = "Anonymous";
ship2Image.onload = function () {
	ship2Ready = true;
};
ship2Image.src = "images/ship2.png";

var ship = [
		{"x":0, "y":420, "pic":shipImage, "name":"Player1", "live":100, "power":20, "angle":1, "weapon":0, "score":0, "turn":true},
		{"x":0, "y":420, "pic":ship2Image, "name":"Player2", "live":100, "power":20, "angle":180, "weapon":0, "score":0, "turn":false}
	];

var bckDetect;
