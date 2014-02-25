/*DIRECTIONS*/
const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";

/*KEYS*/
const SPACE = 32;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const W = 87;
const A = 65;
const S = 83;
const D = 68;
const P = 80;

var DPI = window.devicePixelRatio;
if (DPI != 2) DPI = 1;
var imgExt = "";
if (DPI == 2) imgExt = "@2x";

var touch = false;
if ("ontouchstart" in window) { 
	touch = true;
}