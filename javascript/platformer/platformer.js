/*CREATE HTML ELEMENTS*/
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

/*IMPORT SCRIPTS*/
document.write("<sc" + "ript src=\"\/javascript\/cookies.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"constants.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"entity.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"player.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"platform.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"npc.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"weapon.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"gui.js\"><\/sc" + "ript>");
document.write("<sc" + "ript src=\"game.js\"><\/sc" + "ript>");