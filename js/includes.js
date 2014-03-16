function makeHeader() {
	var filer = new Filer();
	filer.include("/snippets/header.html", "header");
}

function makeNav() {
	var filer = new Filer();
	filer.include("/snippets/nav.html", "nav");
}

function makeFooter() {
	var filer = new Filer();
	filer.include("/snippets/footer.html", "footer");
}

var currentSection;

function codeContent() {
	var filer = new Filer();
	var section = window.location.hash.substring(1);
	filer.include("/" + section + "/content.html", "content");
	if (section.indexOf("/") == -1) {
		currentSection = section;
		document.getElementById(section + "Button").className = "selected";
	}
}

function setSection(section) {
	if (section.indexOf("/") == -1) {
		document.getElementById(section + "Button").className = "selected";
		document.getElementById(currentSection + "Button").className = "";
	}
	var filer = new Filer();
	filer.include("/" + section + "/content.html", "content");
	currentSection = section;
	window.location.hash = "#" + section;
}