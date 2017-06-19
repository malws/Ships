var generateIslands = function() {
	var number_of_islands = Math.floor((Math.random() * 4) + 1);
	var islands = [];
	var colors = [];
	var ok = true;
	var season = Math.floor((Math.random() * 99) + 1);
	
	if(season > 50)	{
		colors = ["#336600", "#8cff1a", "#608000", "#cccc00", "#333300", "#003300", "#009933"];
	}
	else {
		colors = ["#0099cc", "#66d9ff", "#66ffff", "#99ccff", "#0099ff", "#0000ff", "#e6ffff"];
	}

	do {
		setIslands(islands,ok,season,colors);
	}
	while( islands.length != number_of_islands);
}

var setIslands = function(islands,ok,season,colors){
	var location = Math.floor((Math.random() * 500) + 100);
	var size = Math.floor((Math.random() * 200) + 100);
	var color = Math.floor(Math.random() * 6);
	for (var i = 0; i < islands.length; i ++){	
		if(((location <= islands[i].island_location)&&((islands[i].island_location - location) < 100)) || ((location >= islands[i].island_location)&&((location - islands[i].island_location) < 100))){
			ok = false;
		}
		else {
			ok = true;
		}
	}
	if(ok == true){
		if(season > 50){
			var ctrl_point1 = Math.floor((Math.random() * 400) + 100);
			var ctrl_point2 = Math.floor((Math.random() * 400) + 100);
			islands.push({island_size : size, island_ctrl_point1 : ctrl_point1, island_ctrl_point2 : ctrl_point2, island_location : location, island_color : colors[color]});
			renderIslands(islands);
		}
		else{
			var points = Math.floor((Math.random() * 7) + 1);
			var points_height = [];
			for (var j = 0; j < points; j++){
				points_height[j] = Math.floor((Math.random() * 400) + 50);
			}
			islands.push({island_size : size, island_location : location, island_color : colors[color], iceberg_points : points_height});
			renderIcebergs(islands);
		}
	}	
}

var renderIslands = function(islands) {
	for(var k = 0; k < islands.length; k ++){		
		ctx.beginPath();
		ctx.moveTo(islands[k].island_location,500);
		ctx.bezierCurveTo(islands[k].island_location, (500 - islands[k].island_ctrl_point1), (islands[k].island_location + islands[k].island_size), (500 - islands[k].island_ctrl_point2), (islands[k].island_location + islands[k].island_size),500);
		ctx.closePath();
		var gradient = ctx.createLinearGradient(0,200,0,500);
		gradient.addColorStop(0, islands[k].island_color);
		gradient.addColorStop(1, "#00331e");
		ctx.fillStyle = gradient;
		ctx.fill();
		bg_current = ctx.getImageData(0,0,c.width,c.height);
	}
}

var renderIcebergs = function(islands){
	for(var k = 0; k < islands.length; k ++){
		ctx.beginPath();
		var prev_location = islands[k].island_location;		
		ctx.moveTo(islands[k].island_location,500);
		for(var l = 0; l < islands[k].iceberg_points.length; l++) {
			ctx.lineTo(prev_location, islands[k].iceberg_points[l]);
			prev_location += Math.floor((Math.random() * 50) + 2);
		}
		ctx.lineTo((islands[k].island_location + islands[k].island_size),500);		
		ctx.closePath();
		var gradient = ctx.createLinearGradient(0,200,0,500);
		gradient.addColorStop(0, islands[k].island_color);
		gradient.addColorStop(1, "#003366");
		ctx.fillStyle = gradient;		
		ctx.fill();
		bg_current = ctx.getImageData(0,0,c.width,c.height);
	}
}