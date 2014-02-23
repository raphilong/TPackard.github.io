Element.prototype.show = function() {
	this.className = "visible";
}

Element.prototype.hide = function() {
	this.className = "hidden";
}

var precanvas = document.getElementById("precanvas");
precanvas.style.width = String(canvas.width) + "px";
precanvas.style.background = "#EEEEEE";

var postcanvas = document.getElementById("postcanvas");
postcanvas.style.width = String(canvas.width) + "px";
postcanvas.style.background = "#EEEEEE";

var gui = document.getElementById("gui");
gui.style.width = String(canvas.width) + "px";
gui.style.height = String(canvas.height) + "px";
gui.style.background = precanvas.style.background;

var scoreBoard = document.getElementById("score");
scoreBoard.style.cssFloat = "left";
scoreBoard.style.styleFloat = "left";
scoreBoard.style.paddingLeft = "15px";

var highscoreBoard = document.getElementById("highscore");
highscoreBoard.style.cssFloat = "right";
highscoreBoard.style.styleFloat = "right";
highscoreBoard.style.paddingRight = "15px";

/*START BUTTON*/
var startButton = document.getElementById("start");
startButton.style.marginTop = String(canvas.height / 2 - 100) + "px";

function toggleMenu() {
	var className = canvas.className;
	canvas.className = gui.className;
	gui.className = className;
}

function start() {
	canvas.show();
	gui.hide();
	startButton.hide();
	paused = false;
}