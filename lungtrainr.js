function processBase() {
	var debug = false;

	// Grab "form" values
	var base = Math.floor(document.getElementById("base").value);
	var decr = Math.floor(document.getElementById("decr").value);
	var set = Math.floor(document.getElementById("set").value);
	if (debug) {
		console.log("base", base);
		console.log("decr", decr);
		console.log("set", set);
	}

	// Process breath hold table
	var hold = [];
	var rest = [];
	var subtr = base;
	while (set != 0) {
		if (subtr < 0)
			break;
		var formattedbase = ((base/60)|0) + ":" + ((base%60) > 9 ? (base%60) : "0"+(base%60));
		var formattedsubtr = ((subtr/60)|0) + ":" + ((subtr%60) > 9 ? (subtr%60) : "0"+(subtr%60));
		hold.push(formattedbase);
		rest.push(formattedsubtr);
		subtr = subtr - decr;
		set--;
	}

	// Print breath hold table
	if (debug) {
		for (var i=0; i<hold.length; i++) {
			console.log("hold", hold[i]);
		}
		for (var i=0; i<rest.length; i++) {
			console.log("rest", rest[i]);
		}
	}
	var outputstr	= "";
	for (var i=0; i<hold.length; i++) {
		outputstr = outputstr + "HOLD: " + hold[i] + ", REST: " + rest[i] + "</br>";
	}
	if (debug)
		console.log("outputstr", outputstr);
	document.getElementById("output").innerHTML = outputstr;
}

window.onload = function() {
	window.h1 = document.getElementsByTagName('h1')[0],
		window.start = document.getElementById('start'),
		window.stop = document.getElementById('stop'),
		window.clear = document.getElementById('clear'),
		window.seconds = 0, window.minutes = 0, window.hours = 0,
		window.t, window.state = 0;
}

function startTimer() {
	if (window.state != 1)
		timer();
}

function timer() {
	window.state = 1;
	window.t = setTimeout(add, 1000);
}

function add() {
	window.seconds++;
	if (window.seconds >= 60) {
		window.seconds = 0;
		window.minutes++;
		if (window.minutes >= 60) {
			window.minutes = 0;
			window.hours++;
		}
	}
	
	window.h1.textContent = (window.hours ? (window.hours > 9 ? window.hours : "0" + window.hours) : "00") + ":" + (window.minutes ? (window.minutes > 9 ? window.minutes : "0" + window.minutes) : "00") + ":" + (window.seconds > 9 ? window.seconds : "0" + window.seconds);

	timer();
}

function stopTimer() {
	window.state = 2;
	clearTimeout(window.t);
}

function resetTimer() {
	window.state = 3;
	window.h1.textContent = "00:00:00";
	window.seconds = 0; window.minutes = 0; window.hours = 0;
}