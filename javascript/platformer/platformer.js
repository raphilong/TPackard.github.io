// Insert HTML
document.write("<br>");
document.write("<center>");
document.write("<canvas id=\"canvas\"><\/canvas>");
document.write("<br>");
document.write("<div id=\"buttons\" class=\"hidden\">");
document.write("<a ontouchstart=\"button(LEFT, true);\" ontouchend=\"button(LEFT, false);\" class=\"left-arrow\"><\/a>");
document.write("<a ontouchstart=\"button(RIGHT, true);\" ontouchend=\"button(RIGHT, false);\" class=\"right-arrow\"><\/a>");
document.write("<a ontouchstart=\"button(UP, true);\" ontouchend=\"button(UP, false);\" class=\"up-arrow\"><\/a>");
document.write("<a ontouchstart=\"button(SPACE, true);\" ontouchend=\"button(SPACE, false)\"><div class=\"circle\"><\/div><\/a>");
document.write("<\/div>");
document.write("<\/center>");

/*CONSTANTS*/
// Directions
const RIGHT = "right";
const LEFT = "left";
const UP = "up";
const DOWN = "down";

// Keys
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

/*SETUP*/
var DPI = window.devicePixelRatio;
if (DPI != 2) DPI = 1;
var imgExt = "";
if (DPI == 2) imgExt = "@2x";

// Detect touch
var touch = false;
if ("ontouchstart" in window) { 
	touch = true;
}

// Set up canvas
var canvas = document.getElementById("canvas");
canvas.width = 800 * DPI; // Multiplied by DPI for retina and 4k displays
canvas.height = 480 * DPI;
canvas.style.width = "800px";
canvas.style.height = "480px";
var ctx = canvas.getContext("2d");

// Preload fonts
ctx.font = String(128 * DPI) + "px Open Sans Bold";

/*IMPORT SCRIPTS*/
document.import = function (src) {
	var script = document.createElement("script");
	script.src = src + ".js";
	document.body.appendChild(script);
}

document.import("\/js\/filer");
document.import("entity");
document.import("player");
document.import("platform");
document.import("npc");
document.import("weapon");
document.import("gui");
document.import("game");