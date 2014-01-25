var currentTime = new Date().getHours();
var waitTime = 0;
if (0 <= currentTime && currentTime <= 5) {
	document.write("<link rel='stylesheet' href='/css/dark.css' type='text/css'>");
	waitTime = (5 - currentTime) * 60 * 60 * 1000;
}
if (5 < currentTime&&currentTime <= 17) {
	document.write("<link rel='stylesheet' href='/css/light.css' type='text/css'>");
	waitTime = (12 - currentTime) * 60 * 60 * 1000;
}
if (17 < currentTime&&currentTime <= 24) {
	document.write("<link rel='stylesheet' href='/css/dark.css' type='text/css'>");
	waitTime = (6 - currentTime) * 60 * 60 * 1000;
}
console.log(waitTime);