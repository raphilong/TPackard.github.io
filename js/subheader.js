function makeSubheader() {
	var subheader = document.getElementById("subheader");
	var random = Math.random() * 100;
	var text;
	if (random <= 50) {
		text = "Fuses: harness the power of assumptions";
	} else if (random <= 55) {
		text = "The official site of that tall skinny kid";
	} else if (random <= 100) {
		text = "<span class=\"spread\">帕泰<\/span>乐";
	}
	subheader.innerHTML = text;
}