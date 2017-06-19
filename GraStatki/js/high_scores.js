var hs = new Array();
var addScore = function(name, score) {
	var newscore = {"name": name, "score": score};
	// Check browser support
	if (typeof(Storage) !== "undefined") {
    // Store
		if (localStorage.getItem("hss") === null) {
			hs.push(newscore);
		}
		else {
		// Retrieve
			hs = JSON.parse(window.localStorage.getItem("hss"));
			hs.push(newscore);
		}
		hs.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);});
		if(hs.length > 10)
		{
			for(var j = hs.length; j > 10; j--){
				hs.pop();
			}
		}
		window.localStorage.setItem("hss", JSON.stringify(hs));
	} else {
		document.getElementById("scores").innerHTML = "Sorry, your browser does not support Web Storage...";
	} 
}