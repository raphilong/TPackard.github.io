var currentTime = new Date().getHours();
if (0 <= currentTime && currentTime <= 5) {
	document.write("<link rel='stylesheet' href='/css/dark.css' type='text/css'>");
}
if (5 < currentTime&&currentTime <= 17) {
	document.write("<link rel='stylesheet' href='/css/light.css' type='text/css'>");
}
if (17 < currentTime&&currentTime < 23) {
	document.write("<link rel='stylesheet' href='/css/dark.css' type='text/css'>");
}