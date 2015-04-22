function processBase() {
	var debug = true;

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