var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var bg_temp;
var bg_ready = true;
var stop = false;
var turn = 0;
var go = false;
var frameCount = 0.1;
var startX;
var startY;
var g = 9.80;
var wind = 0;
var scale_x;
var scale_y;
var plusOrMinus;
var radians;
var coll_detect;
var coll_detect2;
var coll_detect3;
var changePowerUp = false;
var changePowerDown = false;
var changeAngleUp = false;
var changeAngleDown = false;
var tmp;
var endint;

var ship1Weapon = document.createElement("select");
var ship2Weapon = document.createElement("select");

var animReady = false;
var animImage1 = new Image();
animImage1.onload = function () {
	animReady = true;
};
animImage1.src = "images/01.png";
animReady = false;
var animImage2 = new Image();
animImage2.onload = function () {
	animReady = true;
};
animImage2.src = "images/02.png";
animReady = false;
var animImage3 = new Image();
animImage3.onload = function () {
	animReady = true;
};
animImage3.src = "images/03.png";
animReady = false;
var animImage4 = new Image();
animImage4.onload = function () {
	animReady = true;
};
animImage4.src = "images/04.png";
animReady = false;
var animImage5 = new Image();
animImage5.onload = function () {
	animReady = true;
};
animImage5.src = "images/05.png";
animReady = false;
var animImage6 = new Image();
animImage6.onload = function () {
	animReady = true;
};
animImage6.src = "images/06.png";

animReady = false;
var anim2Image1 = new Image();
anim2Image1.onload = function () {
	animReady = true;
};
anim2Image1.src = "images/201.png";
animReady = false;
var anim2Image2 = new Image();
anim2Image2.onload = function () {
	animReady = true;
};
anim2Image2.src = "images/202.png";
animReady = false;
var anim2Image3 = new Image();
anim2Image3.onload = function () {
	animReady = true;
};
anim2Image3.src = "images/203.png";
animReady = false;
var anim2Image4 = new Image();
anim2Image4.onload = function () {
	animReady = true;
};
anim2Image4.src = "images/204.png";
animReady = false;
var anim2Image5 = new Image();
anim2Image5.onload = function () {
	animReady = true;
};
anim2Image5.src = "images/205.png";
animReady = false;
var anim2Image6 = new Image();
anim2Image6.onload = function () {
	animReady = true;
};
anim2Image6.src = "images/206.png";

var animation1 = [animImage1, animImage2, animImage3, animImage4, animImage5, animImage6];
var animation2 = [anim2Image1, anim2Image2, anim2Image3, anim2Image4, anim2Image5, anim2Image6];

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var shots = [
		{"type":0, "diameter":4, "color":'black', "points":100, "damage":15},
		{"type":1, "diameter":5, "color":'blue', "points":50, "damage":25},
		{"type":2, "diameter":2, "color":'red', "points":200, "damage":35}
	];

var Cannonball = {
	x : 0,
	y : 0,
	angle : 1,
	speed : 2,
	velocity_x : 0,
	velocity_y : 0	
};

var reset = function(){	
	if (turn == 0){
		turn = 1;
		ship1Weapon.disabled = true;
		ship2Weapon.disabled = false;
	}
	else {
		turn = 0;
		ship2Weapon.disabled = true;
		ship1Weapon.disabled = false;
	}
	
	Cannonball.x = 0;
	Cannonball.y = 0;
	Cannonball.angle = ship[turn].angle;
	Cannonball.speed = ship[turn].power;
	Cannonball.velocity_x = 0;
	Cannonball.velocity_y = 0;
	frameCount = 0.1;
	
	plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	wind = plusOrMinus * Math.floor((Math.random() * 9) + 1);
}

var update = function(){
	
	if(go == false)
	{
		if ((38 in keysDown) || (changePowerUp == true)) { // Player holding up
			if (Cannonball.speed < 200)
			Cannonball.speed += 0.4;
		}
		if ((40 in keysDown) || (changePowerDown == true)) { // Player holding down
			if (Cannonball.speed > 1)
			Cannonball.speed -= 0.4;
		}
		
		if ((188 in keysDown) || (changeAngleDown == true)) { // Player holding <
			if (turn == 0)
			{
				if (Cannonball.angle > 1)
					Cannonball.angle -= 0.2;
			}
			else 
			{
				if (Cannonball.angle < 180)
					Cannonball.angle += 0.2;
			}				
		}
		if ((190 in keysDown) || (changeAngleUp == true)) { // Player holding >
			if(turn == 0)
			{
				if (Cannonball.angle < 180)
					Cannonball.angle += 0.2;
			}
			else
			{
				if (Cannonball.angle > 1)
					Cannonball.angle -= 0.2;
			}							
		}		
		
		if (37 in keysDown) { // Player holding left
			stop = false;
			if (ship[turn].x > 10) {				
				bckDetect = ctx.getImageData(ship[turn].x, ship[turn].y, 1, 60);
				for (var i = 0; i < bckDetect.data.length; i += 4)
				{
					if((bckDetect.data[i] != 0) || (bckDetect.data[i+1] != 0) 
						|| (bckDetect.data[i+2] != 0) || (bckDetect.data[i+3] != 0))
					stop = true;
				}	
				if(stop == false)
					ship[turn].x -= 0.5;
			}
		}
		if (39 in keysDown) { // Player holding right
			stop = false;
			if (ship[turn].x < 940){
				bckDetect = ctx.getImageData((ship[turn].x + 60), ship[turn].y, 1, 60);
				for (var i = 0; i < bckDetect.data.length; i += 4)
				{
					if((bckDetect.data[i] != 0) || (bckDetect.data[i+1] != 0) 
						|| (bckDetect.data[i+2] != 0) || (bckDetect.data[i+3] != 0))
					stop = true;
				}	
				if(stop == false)
					ship[turn].x += 0.5;
			}
		}
	}
	
	
	if(go == true){	
		Cannonball.velocity_x = (Cannonball.speed + wind/3 * frameCount) * scale_x;
		Cannonball.velocity_y = Cannonball.speed * scale_y;
	
		Cannonball.x = startX + Cannonball.velocity_x * frameCount;
		Cannonball.y = startY - (Cannonball.velocity_y * frameCount - (1/2 * g * (Math.pow(frameCount, 2))));
		frameCount += 0.1;
		if(Cannonball.y > 480){
			go = false;
			document.getElementById('snd_splash').play();
			reset();
		}
	}	
}

var cannonParams = function(x, y) {
    Cannonball.x = x;
    Cannonball.y = y;
	startX = Cannonball.x;
	startY = Cannonball.y;
	radians = Cannonball.angle * Math.PI/ 180;

	scale_x = Math.cos(radians);
	scale_y = Math.sin(radians);
	
	go = true;

	document.getElementById('snd_shot').play();
}

var boom = function(){
	if(((Cannonball.x > ship[0].x - 6) && (Cannonball.x < (ship[0].x + 60))) && (((Cannonball.y > ship[0].y - 6) && (Cannonball.y < (ship[0].y + 60))))) {
		go = false;
		document.getElementById('snd_expOuch').play();
		ship[0].live -= shots[ship[turn].weapon].damage;
		ship[1].score += shots[ship[turn].weapon].points;
		if(ship[0].live < 1) {
			ship[1].score += 500;
			tmp = 0;
			endint = setInterval(function(){
				if(tmp > 5) {
					clearInterval(endint);
					endint = null;
					newRound();
				}
				else {
					ship[0].pic = animation1[tmp];
					tmp ++;
				}
			},90);			
		}
	}
	else if(((Cannonball.x > ship[1].x - 6) && (Cannonball.x < (ship[1].x + 60))) && (((Cannonball.y > ship[1].y - 6) && (Cannonball.y < (ship[1].y + 60))))) {
		go = false;
		document.getElementById('snd_expOuch').play();
		ship[1].live -= shots[ship[turn].weapon].damage;
		ship[0].score += shots[ship[turn].weapon].points;
		if(ship[1].live < 1) {
			ship[0].score += 500;
			tmp = 0;
			endint = setInterval(function(){
				if(tmp > 5) {
					clearInterval(endint);
					endint = null;
					newRound();
				}
				else {
					ship[1].pic = animation2[tmp];
					tmp ++;
				}
			},90);
		}
	}
	else {
		document.getElementById('snd_exp').play();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.arc(Cannonball.x, Cannonball.y, shots[ship[turn].weapon].damage, 0, 2 * Math.PI);
		ctx.fill();
		go = false;
		bg_ready = false;
		bg_temp = ctx.getImageData(0,0,c.width,c.height);
	
	// iterate over all pixels based on x and y coordinates
        for(var y = ship[0].y; y < (ship[0].y + 60); y++) {
          // loop through each column
          for(var x = ship[0].x; x < (ship[0].x + 60); x++) {
            bg_temp.data[((1000 * y) + x) * 4] = 0;
            bg_temp.data[((1000 * y) + x) * 4 + 1] = 0;
            bg_temp.data[((1000 * y) + x) * 4 + 2] = 0;
            bg_temp.data[((1000 * y) + x) * 4 + 3] = 0;
          }
        }
		for(var y = ship[1].y; y < (ship[1].y + 60); y++) {
          // loop through each column
          for(var x = ship[1].x; x < (ship[1].x + 60); x++) {
            bg_temp.data[((1000 * y) + x) * 4] = 0;
            bg_temp.data[((1000 * y) + x) * 4 + 1] = 0;
            bg_temp.data[((1000 * y) + x) * 4 + 2] = 0;
            bg_temp.data[((1000 * y) + x) * 4 + 3] = 0;
          }
        }
		bg_ready = true;
		if(bg_ready == true)
		{
			bg_current = bg_temp;
		}	
	}
	reset();
}