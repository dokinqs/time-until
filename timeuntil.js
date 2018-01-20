var year = 2038;	// target reached
var month = 0;		// 0-11 (0=jan, 1=feb, ..., 11=dec)
var day = 19;		// 1-31 
var hour = 3;		// 0-24
var minute = 14;	// 0-60
var second = 7;		// 0-60
var end = new Date(year, month, day, hour, minute, second);
// if target not yet reached
var eventtext = "Until End of Unix Time"; 
// if unix time is reached
var endtext = "32 bit overflow!"; 

function timeleft() {
	var now = new Date();
	
	// deprecated y2k problem
	// if (now.getYear() < 1900)
	// 	yr = now.getYear() + 1900;
	var yr = now.getFullYear();
	yr = year - yr;

	var sec = second - now.getSeconds();
	var min = minute - now.getMinutes();
	var hr = hour - now.getHours();
	var dy = day - now.getDate();
	var mnth = month - now.getMonth();
	var daysinmnth = 32 - new Date(now.getYear(), now.getMonth(), 32).getDate();

	if (sec < 0) {
		sec = (sec + 60) % 60;
		min--;
	}
	if (min < 0) {
		min = (min + 60) % 60;
		hr--;	
	}
	if (hr < 0) {
		hr = (hr + 24) % 24;
		dy--;	
	}
	if (dy < 0) {
		dy = (dy + daysinmnth) % daysinmnth;
		mnth--;	
	}
	if (mnth < 0) {
		mnth = (mnth + 12) % 12;
		yr--;
	}	

	var sectext = " seconds ";
	var mintext = " minutes, and ";
	var hrtext = " hours, ";
	var dytext = " days, ";
	var mnthtext = " months, ";
	var yrtext = " years, ";

	if (yr == 1)
		yrtext = " year, ";
	if (mnth == 1)
		mnthtext = " month, ";
	if (dy == 1)
		dytext = " day, ";
	if (hr == 1)
		hrtext = " hour, ";
	if (min == 1)
		mintext = " minute, and ";
	if (sec == 1)
		sectext = " second ";

	if (now >= end) {
		document.getElementById("timeleft").innerHTML = endtext;
		clearTimeout(timerID);
	}
	else {
	document.getElementById("timeleft").innerHTML = yr+yrtext + mnth+mnthtext + dy+dytext + hr+hrtext + min+mintext + sec+sectext + eventtext;
	}

	var timerID = setTimeout("timeleft()", 1000); 
}

window.onload = timeleft;