/*	The Filer Object
	The filer object lets you read files from a url. Using the importScript function also lets you import other javascript files onto your webpage
*/

function Filer() {
	this.request = new XMLHttpRequest();

	this.request.onFinish = function(text) {
	};

	this.request.onreadystatechange = function() {
		if (this.readyState == 4) {
			this.onFinish(this.responseText);
		}
	};
}

Filer.prototype.read = function(url, onFinish) {
	this.request.open("GET", url);
	this.request.send();
	if (typeof onFinish === "function") {
		this.request.onFinish = onFinish;
	}
};

Filer.prototype.importScript = function(src) {
	var script = document.createElement("script");
	script.src = src + ".js";
	document.body.appendChild(script);
};

Filer.prototype.include = function(src, id) {
	var parent = document.getElementById(id);
	this.read(src, function(content) {
		parent.innerHTML = content;
	});
}