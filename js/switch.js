var switches;
document.write("<link href=\"/css/switch.css\" rel=\"stylesheet\" type=\"text/css\">");

const ON = "on";
const OFF = "off";

function Switch(tag) {
	this.tag = tag;
	this.tag.state = OFF;

	this.tag.onclick = function() {
		if (this.state == OFF) {
			this.state = ON;
			this.className = "on";
		} else {
			this.state = OFF;
			this.className = "off";
		}
	}
}

function findSwitches() {
	switches = document.getElementsByTagName("switch");
	
	for (var i = 0; i < switches.length; i++) {
		var tag = switches[i];
		switches[i] = new Switch(tag);
	}
}

refreshMethods.push(findSwitches);
window.onload = findSwitches;