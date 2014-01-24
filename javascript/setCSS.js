var currentTime = new Date().getHours();
var waitTime = 0;
if (0 <= currentTime && currentTime <= 6) {
	document.write("<link rel='stylesheet' href='/css/dark.css' type='text/css'>");
	waitTime = (7 - currentTime) * 60 * 60 * 1000;
}
if (6 < currentTime&&currentTime <= 18) {
	document.write("<link rel='stylesheet' href='/css/light.css' type='text/css'>");
	waitTime = (18 - currentTime) * 60 * 60 * 1000;
}
if (18 < currentTime&&currentTime <= 24) {
	document.write("<link rel='stylesheet' href='/css/dark.css' type='text/css'>");
	waitTime = (24 - currentTime) * 60 * 60 * 1000;
}

setTimeout(function(){
   window.location.reload(1);
}, waitTime);