/*CANVAS*/
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 480;
var ctx = canvas.getContext("2d");

// var precanvas = document.getElementById("precanvas");
// precanvas.style.width = String(canvas.width) + "px";
// precanvas.style.background = "#EEEEEE";
precanvas.innerHTML = "";


/*KEYBOARD*/
var keysDown = new Array();

document.onkeydown = function(e) {
    keysDown[e.keyCode] = true;
    if (e.keyCode == SPACE || e.keyCode == UP_ARROW || e.keyCode == DOWN_ARROW || e.keyCode == LEFT_ARROW || e.keyCode == RIGHT_ARROW) e.preventDefault(); // Prevents the page from scrolling when the arrow keys or spacebar are pressed
};

document.onkeyup = function(e) {
    delete keysDown[e.keyCode];
};


/*GAME FUNCTIONS*/
function update(delta) {

}

function paint() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    paint();

    if (now - lastSwitch >= 64) { // 16 times per second
        lastSwitch = now;
    }

    then = now;
    setTimeout(main, 1);
}

/*START GAME*/
var lastSwitch = Date.now();
var then = Date.now();
main();