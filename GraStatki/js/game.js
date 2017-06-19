// Create the canvas
var c = document.createElement("canvas");
c.id = "myCanvas";
var ctx = c.getContext("2d");
c.width = 1000;
c.height = 500;
var cc = document.createElement("canvas");
cc.id = "controlCanvas";
var cctx = cc.getContext("2d");
cc.width = 1000;
cc.height = 55;
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
var myReq;
var round_counter = 0;
var gamescreen = document.getElementById("game-screen");
gamescreen.appendChild(c);
gamescreen.appendChild(cc);
c.style.backgroundImage = "url(images/background1.png)";
cc.style.backgroundColor = "#e5e5e5";
gamescreen.className = "inactive";
var endcheck = false;
var bg_current;

var butEnd = document.createElement("button");
butEnd.className = "menubuttons";
butEnd.innerHTML = "High scores";
butEnd.style.position = "absolute";
butEnd.style.left = "350px";
butEnd.style.top = "250px";

var butMenu = document.createElement("button");
butMenu.innerHTML = "Main menu";
butMenu.className = "menubuttons";
butMenu.style.position = "absolute";
butMenu.style.left = "350px";
butMenu.style.top = "340px";
	
var butPowerDown = document.createElement("button");
gamescreen.appendChild(butPowerDown);
butPowerDown.style.position = "absolute";
butPowerDown.style.borderRadius = "10px";
butPowerDown.style.border = "none";
butPowerDown.style.left = "290px";
butPowerDown.style.top = "532px";
butPowerDown.style.height = "17px";
butPowerDown.style.width = "17px";
butPowerDown.style.backgroundImage = "url(images/power_down.png)";

var butPowerUp = document.createElement("button");
gamescreen.appendChild(butPowerUp);
butPowerUp.style.position = "absolute";
butPowerUp.style.borderRadius = "10px";
butPowerUp.style.border = "none";
butPowerUp.style.left = "412px";
butPowerUp.style.top = "532px";
butPowerUp.style.height = "17px";
butPowerUp.style.width = "17px";
butPowerUp.style.backgroundImage = "url(images/power_up.png)";

var butAngleDown = document.createElement("button");
gamescreen.appendChild(butAngleDown);
butAngleDown.style.position = "absolute";
butAngleDown.style.borderRadius = "10px";
butAngleDown.style.border = "none";
butAngleDown.style.left = "440px";
butAngleDown.style.top = "532px";
butAngleDown.style.height = "17px";
butAngleDown.style.width = "17px";
butAngleDown.style.backgroundImage = "url(images/angle_down.png)";

var butAngleUp = document.createElement("button");
gamescreen.appendChild(butAngleUp);
butAngleUp.style.position = "absolute";
butAngleUp.style.borderRadius = "10px";
butAngleUp.style.border = "none";
butAngleUp.style.left = "557px";
butAngleUp.style.top = "532px";
butAngleUp.style.height = "17px";
butAngleUp.style.width = "17px";
butAngleUp.style.backgroundImage = "url(images/angle_up.png)";

var liveBar0 = document.createElement("progress");
gamescreen.appendChild(liveBar0);
liveBar0.style.position = "absolute";
liveBar0.style.borderRadius = "10px";
liveBar0.style.left = "115px";
liveBar0.style.top = "532px";
liveBar0.style.width = "70px";
liveBar0.max = 100;

var liveBar1 = document.createElement("progress");
gamescreen.appendChild(liveBar1);
liveBar1.style.position = "absolute";
liveBar1.style.borderRadius = "10px";
liveBar1.style.left = "815px";
liveBar1.style.top = "532px";
liveBar1.style.width = "70px";
liveBar1.max = 100;


gamescreen.appendChild(ship1Weapon);
ship1Weapon.style.position = "absolute";
ship1Weapon.style.borderRadius = "10px";
ship1Weapon.style.left = "200px";
ship1Weapon.style.top = "530px";
ship1Weapon.style.width = "80px";

var option1 = document.createElement("option");
option1.text = "Cannon";
ship1Weapon.add(option1);
var option2 = document.createElement("option");
option2.text = "Canister";
ship1Weapon.add(option2);
var option3 = document.createElement("option");
option3.text = "Hot";
ship1Weapon.add(option3);

ship1Weapon.addEventListener("change", function() {
	if(go == false){
		if(turn == 0) {
			ship[0].weapon = ship1Weapon.options[ship1Weapon.selectedIndex].index;
		}
	}    
});


gamescreen.appendChild(ship2Weapon);
ship2Weapon.style.position = "absolute";
ship2Weapon.style.borderRadius = "10px";
ship2Weapon.style.left = "720px";
ship2Weapon.style.top = "530px";
ship2Weapon.style.width = "80px";

var option4 = document.createElement("option");
option4.text = "Cannon";
ship2Weapon.add(option4);
var option5 = document.createElement("option");
option5.text = "Canister";
ship2Weapon.add(option5);
var option6 = document.createElement("option");
option6.text = "Hot";
ship2Weapon.add(option6);

ship2Weapon.addEventListener("change", function() {
	if(go == false){
		if(turn == 1) {
			ship[1].weapon = ship2Weapon.options[ship2Weapon.selectedIndex].index;
		}
	}  
});

var main = function(){
	update();
	render();
	if(round_counter == 10){
		end();			
	}
	else {
		myReq = requestAnimationFrame(main);
	}	
}

var render = function(){
	ctx.globalCompositeOperation = 'source-over';
	ctx.clearRect(0, 0, c.width, c.height);
	if(bg_ready == true)
	{
		ctx.putImageData(bg_current,0,0);
	}	
	
	cctx.clearRect(0, 0, c.width, c.height);
	cctx.putImageData(bg_current,0,0);
	
	cctx.font = "20px Helvetica";
	
	cctx.textAlign = "left";
	cctx.textBaseline = "top";
	
	if(turn == 0) {
		cctx.fillStyle = "red";
		cctx.fillText(ship[0].name, 5, 5);
		cctx.fillStyle = "#3A474D";
		cctx.fillText(ship[1].name, 900, 5);
	}
	else {
		cctx.fillStyle = "#3A474D";
		cctx.fillText(ship[0].name, 5, 5);
		cctx.fillStyle = "red";
		cctx.fillText(ship[1].name, 900, 5);
	}	
	
	cctx.fillStyle = "#3A474D";
	cctx.fillText(ship[0].score, 20, 30);
	liveBar0.value = ship[0].live;
	
	
	cctx.fillText(ship[1].score, 912, 30);
	liveBar1.value = ship[1].live;
	
	cctx.fillText("Power: " + Math.floor(Cannonball.speed / 2), 300, 15);
	
	if(turn == 1)
	{
		cctx.fillText("Angle: " + (180 - Math.floor(Cannonball.angle)), 450, 15);
	}
	else cctx.fillText("Angle: " + Math.floor(Cannonball.angle), 450, 15);
	
	if(turn == 1)
	{
		cctx.fillText("Wind: " + (wind * -1), 600, 15);
	}
	else cctx.fillText("Wind: " + wind, 600, 15);
	
	if (shipReady && ship2Ready) {
		ctx.drawImage(ship[0].pic, ship[0].x, ship[0].y);
		ctx.drawImage(ship[1].pic, ship[1].x, ship[1].y);
	}
	
	if(go == true){
		ctx.beginPath();
		ctx.fillStyle = shots[ship[turn].weapon].color;
		ctx.arc(Cannonball.x, Cannonball.y, shots[ship[turn].weapon].diameter, 0, 2 * Math.PI);
		ctx.fill();
		coll_detect = ctx.getImageData((Cannonball.x + 6), Cannonball.y, 1, 1);
		coll_detect2 = ctx.getImageData((Cannonball.x + 6), (Cannonball.y + 6), 1, 1);
		coll_detect3 = ctx.getImageData((Cannonball.x), (Cannonball.y + 6), 1, 1);
		if((coll_detect.data[coll_detect.data.length - 1] != 0) || (coll_detect2.data[coll_detect2.data.length - 1] != 0) 
			|| (coll_detect3.data[coll_detect3.data.length - 1] != 0)){	
			boom();
		}
	}	
}

var showScreen = function(active, inactive){
	document.getElementById(active).style.display = "none";
	document.getElementById(inactive).style.display = "block";
	if (inactive === 'game-screen') {
		round_counter = 0;
		ctx.clearRect(0, 0, c.width, c.height);
		start();
	}
	if(inactive === 'high-scores') {
		var hsc = new Array();
		if (typeof(Storage) !== "undefined") {
			// Store
			if (localStorage.getItem("hss") != null) {
				hsc = JSON.parse(window.localStorage.getItem("hss"));
				document.getElementById("scorestable").innerHTML = null;
				for (var i = 0; i < hsc.length; i++) {
					document.getElementById("scorestable").innerHTML += "<tr><td>" + hsc[i].name + "</td><td>" + hsc[i].score + "</td></tr>";
				}	
			}	
		}
		else {
			document.getElementById("scores").innerHTML = "Sorry, your browser does not support Web Storage...";
		} 		
	}
}

var InitShip = function(ship, ranOffset, ranEnd) {
	ship.x = Math.floor((Math.random() * ranEnd) + ranOffset);
	bckDetect = ctx.getImageData(ship.x, ship.y, 60, 60);
	for (var i = 0; i < bckDetect.data.length; i += 4)
	{
		if((bckDetect.data[i] != 0) || (bckDetect.data[i+1] != 0) 
			|| (bckDetect.data[i+2] != 0) || (bckDetect.data[i+3] != 0))
		InitShip(ship, ranOffset, ranEnd);
	}	
}



var start = function() {
	endcheck = false;
	generateIslands();
	ship[0].name = document.getElementById("player1").value;
	ship[1].name = document.getElementById("player2").value;
	addEventListener('keydown', function k(e){
		if(endcheck == true) {
			removeEventListener('keydown', k);
			return;
		}
		if (32 == e.keyCode) {
			if(endint == null) {
				if(turn == 0) {
				cannonParams ((ship[turn].x + 60),ship[turn].y);
				}
				else if(turn == 1) {
					cannonParams ((ship[turn].x),ship[turn].y);
				}
		
				ship[turn].power = Cannonball.speed;
				ship[turn].angle = Cannonball.angle;
			}
			
		}		
	},false);

	butPowerDown.addEventListener("mousedown", function m1() {		
		changePowerDown = true;
		if(endcheck == true) {
			butPowerDown.removeEventListener("mousedown", m1);
			return;
		}
	});
	butPowerDown.addEventListener("mouseup", function m2() {
		changePowerDown = false;
		if(endcheck == true) {
			butPowerDown.removeEventListener("mouseup", m2);
			return;
		}
	});
	butPowerUp.addEventListener("mousedown", function m3() {
		changePowerUp = true;
		if(endcheck == true) {
			butPowerUp.removeEventListener("mousedown", m3);
			return;
		}
	});
	butPowerUp.addEventListener("mouseup", function m4() {
		changePowerUp = false;
		if(endcheck == true) {
			butPowerUp.removeEventListener("mouseup", m4);
			return;
		}
	});
	butAngleUp.addEventListener("mousedown", function m5() {
		changeAngleUp = true;	
		if(endcheck == true) {
			butAngleUp.removeEventListener("mousedown", m5);
			return;
		}
	});
	butAngleUp.addEventListener("mouseup", function m6() {
		changeAngleUp = false;
		if(endcheck == true) {
			butAngleUp.removeEventListener("mouseup", m6);
			return;
		}
	});
	butAngleDown.addEventListener("mousedown", function m7() {
		changeAngleDown = true;	
		if(endcheck == true) {
			butAngleDown.removeEventListener("mousedown", m7);
			return;
		}
	});
	butAngleDown.addEventListener("mouseup", function() {
		changeAngleDown = false;
		if(endcheck == true) {
			butAngleDown.removeEventListener("mouseup", m7);
			return;
		}
	});
	if(butEnd.parentNode == gamescreen) {
		gamescreen.removeChild(butEnd);
		gamescreen.removeChild(butMenu);
	}	
	InitShip(ship[0], 10, 430);
	InitShip(ship[1], 500, 430);
	ship[0].live = 100;
	ship[1].live = 100;
	ship[0].power = 20;
	ship[1].power = 20;
	ship[0].angle = 1;
	ship[1].angle = 180;
	ship[0].weapon = 0;
	ship[1].weapon = 0;
	ship[0].score = 0;
	ship[1].score = 0;
	ship1Weapon.selectedIndex = 0;
	ship2Weapon.selectedIndex = 0;
	reset();
	main();
}

var newRound = function() {
	round_counter += 1;
	ctx.clearRect(0, 0, c.width, c.height);
	generateIslands();
	ship[0].live = 100;
	ship[1].live = 100;
	ship[0].pic.src = "images/ship1.png";
	ship[1].pic.src = "images/ship2.png";
	InitShip(ship[0], 10, 430);
	InitShip(ship[1], 500, 430);	
}

var end = function() {
	endcheck = true;
	render();
	gamescreen.appendChild(butEnd);
	butEnd.onclick = function(){
		showScreen('game-screen', 'high-scores')
	};
	gamescreen.appendChild(butMenu);
	butMenu.onclick = function(){
		showScreen('game-screen', 'main-menu')
	};
	
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "50px Helvetica";
	if(ship[0].score > ship[1].score) {
		ctx.fillText(ship[0].name + " wins!", 350, 170);
		addScore(ship[0].name, ship[0].score);
	}
	else if(ship[0].score < ship[1].score) {
		ctx.fillText(ship[1].name + " wins!", 350, 170);
		addScore(ship[1].name, ship[1].score);
	}
	else {
		ctx.fillText("Draw!", 450, 170);
		addScore(ship[0].name, ship[0].score);
		addScore(ship[1].name, ship[1].score);
	}	
	window.cancelAnimationFrame(myReq);
}