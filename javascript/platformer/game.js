/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800 * DPI;
canvas.height = 480 * DPI;
canvas.style.width = "800px";
canvas.style.height = "480px";
var ctx = canvas.getContext("2d");

/*GAME FUNCTIONS AND OBJECTS*/
var cookies = new Cookies();
if (!cookies.contains("highscore")) {
	cookies.set("highscore", 0, Infinity);
}

var scrollX = 0;
var scrollY = 0;
var worldWidth = 960;
worldHeight = 480;

var paused = false;

var entities = new Array();
var platforms = new Array();
var player = new Entity("Person", 480, 250, 200, 13, 32, platforms, 6);
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
	if (e.keyCode == P && !(P in keysDown)) {
		paused = !paused;
		if (paused) {
			ctx.fillStyle = "rgba(96, 96, 108, 0.4)";
    		ctx.fillRect(0, 0, canvas.width, canvas.height);
    		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    		ctx.font = String(128 * DPI) + "px Open Sans Bold";
    		ctx.fillText("P", canvas.width / 2 - (43 * DPI), canvas.height / 2 + (43 * DPI));
		}
	}
    keysDown[e.keyCode] = true;
    if (e.keyCode == SPACE || e.keyCode == UP_ARROW || e.keyCode == DOWN_ARROW || e.keyCode == LEFT_ARROW || e.keyCode == RIGHT_ARROW) {
    	e.preventDefault(); // Prevents the page from scrolling when the arrow keys or spacebar are pressed
	}
};

document.onkeyup = function(e) {
    delete keysDown[e.keyCode];
};

/*MOBILE BUTTONS*/
if (touch) {
	document.getElementById("buttons").className = "visible";
}
var buttonsDown = new Array();

function button(direction, state) {
	buttonsDown[direction] = state;
}

function update(delta) {
    entities.forEach(function(entity) {
        entity.moving = false;
        entity.gravitate(delta);
        entity.update(delta);
        entities.forEach(function(otherEntity) {entity.checkAlive(otherEntity)});
    });
    if (SPACE in keysDown || buttonsDown[SPACE]) {
        player.shoot();
        delete buttonsDown[SPACE];
    }
    if (UP_ARROW in keysDown || W in keysDown || buttonsDown[UP]) {
        player.move(UP, delta);
    }
    if (DOWN_ARROW in keysDown || S in keysDown || buttonsDown[DOWN]) {
        player.move(DOWN, delta);
    }
    if (LEFT_ARROW in keysDown || A in keysDown || buttonsDown[LEFT]) {
        player.move(LEFT, delta);
    }
    if (RIGHT_ARROW in keysDown || D in keysDown || buttonsDown[RIGHT]) {
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
		scrollX = Math.round(player.getX() - canvas.width / (2 * DPI));
		if (scrollX < 0) scrollX = 0;
		if (scrollX > worldWidth - canvas.width / DPI) scrollX = worldWidth - canvas.width / DPI;
		// Smooth scrolling! (Most of the time)
		if (scrollX - prevScrollX > 3 && !player.moving) scrollX = prevScrollX + 3;
		if (scrollX - prevScrollX < -3 && !player.moving) scrollX = prevScrollX - 3;

		var prevScrollY = scrollY;
		scrollY = Math.round(player.getY() - canvas.height / (2 * DPI));
		if (scrollY < 0) scrollY = 0;
		if (scrollY > worldHeight - canvas.height / DPI) scrollY = worldHeight - canvas.height / DPI;
		if (scrollY - prevScrollY > 3 && !player.moving) scrollY = prevScrollY + 3;
		if (scrollY - prevScrollY < -3 && !player.moving) scrollY = prevScrollY - 3;
    }
}

function paint() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    platforms.forEach(function(platform) {platform.draw(ctx)});
    entities.forEach(function(entity) {entity.draw(ctx)});
    if (cookies.get("highscore") < player.score) cookies.set("highscore", player.score, Infinity);
    ctx.fillStyle = "#444444";
    ctx.font = String(12 * DPI) + "pt Open Sans";
    ctx.fillText("Score: " + player.score, 24 * DPI, 32 * DPI);
    ctx.fillText("Highscore: " + cookies.get("highscore"), 24 * DPI, 64 * DPI);
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
    
        if (Math.random() < 0.005 && entities.length < 10) entities.push(new AI("AI", 400, 174, 125, 13, 32, platforms, 6));
    }

    then = now;
    setTimeout(main, 1);
}

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
main();