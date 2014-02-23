/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 480;
var ctx = canvas.getContext("2d");

/*GAME FUNCTIONS AND OBJECTS*/
var cookies = new Cookies();

var scrollX = 0;
var scrollY = 0;
var worldWidth = 960;
worldHeight = 480;

var paused = true;

var entities = new Array();
var platforms = new Array();
var player = new Entity("Person.png", 480, 250, 200, 13, 32, platforms, 6);
entities.push(player);

platforms.push(new Platform(18, 13, 24, 1));
platforms.push(new Platform(0, 18, 18, 1));
platforms.push(new Platform(42, 18, 18, 1));
platforms.push(new Platform(18, 23, 24, 1));
platforms.push(new Platform(0, 28, 18, 1));
platforms.push(new Platform(0, 29, 27, 1));
platforms.push(new Platform(42, 28, 18, 1));
platforms.push(new Platform(33, 29, 27, 1));

var keysDown = new Array();

document.onkeydown = function(e) {
	if (e.keyCode == P && !(P in keysDown)) paused = !paused;
    keysDown[e.keyCode] = true;
    if (e.keyCode == SPACE || e.keyCode == UP_ARROW || e.keyCode == DOWN_ARROW || e.keyCode == LEFT_ARROW || e.keyCode == RIGHT_ARROW) e.preventDefault(); // Prevents the page from scrolling when the arrow keys or spacebar are pressed
};

document.onkeyup = function(e) {
    delete keysDown[e.keyCode];
};

function update(delta) {
    entities.forEach(function(entity) {
        entity.moving = false;
        entity.gravitate(delta);
        entity.update(delta);
        entities.forEach(function(otherEntity) {entity.checkAlive(otherEntity)});
    });
    if (SPACE in keysDown) {
        player.shoot();
    }
    if (UP_ARROW in keysDown || W in keysDown) {
        player.move(UP, delta);
    }
    if (DOWN_ARROW in keysDown || S in keysDown) {
        player.move(DOWN, delta);
    }
    if (LEFT_ARROW in keysDown || A in keysDown) {
        player.move(LEFT, delta);
    }
    if (RIGHT_ARROW in keysDown || D in keysDown) {
        player.move(RIGHT, delta);
    }
    for (var i = 0; i < entities.length; i++) {
        entities[i].jump(delta);
        entities[i].checkOnGround();
        if (!entities[i].alive && entities[i] != player) {
            entities.splice(i, 1);
            i--;
        }
    }
}

function scroll() {
    if (player.alive) {
    	var prevScrollX = scrollX;
		scrollX = Math.round(player.getX() - canvas.width / 2);
		if (scrollX < 0) scrollX = 0;
		if (scrollX > worldWidth - canvas.width) scrollX = worldWidth - canvas.width;
		// Smooth scrolling! (Most of the time)
		if (scrollX - prevScrollX > 3 && !player.moving) scrollX = prevScrollX + 3;
		if (scrollX - prevScrollX < -3 && !player.moving) scrollX = prevScrollX - 3;

		var prevScrollY = scrollY;
		scrollY = Math.round(player.getY() - canvas.height / 2);
		if (scrollY < 0) scrollY = 0;
		if (scrollY > worldHeight - canvas.height) scrollY = worldHeight - canvas.height;
		if (scrollY - prevScrollY > 3 && !player.moving) scrollY = prevScrollY + 3;
		if (scrollY - prevScrollY < -3 && !player.moving) scrollY = prevScrollY - 3;
    }
}

function paint() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    platforms.forEach(function(platform) {platform.draw(ctx)});
    entities.forEach(function(entity) {entity.draw(ctx)});
    if (canvas.className == "visible") {
    	if (cookies.get("score") < player.score) cookies.set("score", player.score, Infinity);
    	scoreBoard.innerHTML = "Score: " + player.score;
    	highscoreBoard.innerHTML = "Highscore: " + cookies.get("score");
    }
    else precanvas.innerHTML = "<br>";
}

function main() {
    var now = Date.now();
    var delta = now - then;

    if (!paused) {
    	update(delta / 1000);
        scroll();
        paint();
    
        if (now - lastSwitch >= 64) { // 16 times per second
            for (var i = 0; i < entities.length; i++) entities[i].moving ? entities[i].nextFrame() : entities[i].setFrame(0);
            lastSwitch = now;
        }
    
        if (Math.random() < 0.005 && entities.length < 10) entities.push(new AI("AI.png", 400, 174, 125, 13, 32, platforms, 6));
    }

    then = now;
    setTimeout(main, 1);
}

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
main();