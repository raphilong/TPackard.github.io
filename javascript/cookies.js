function Cookies() {
	
}

Cookies.prototype.valueIndex = function(name) {
	var begin = document.cookie.indexOf(name + "=");
	if (begin != -1) {
		return begin + name.length + 1;
	}
	return -1;
}

Cookies.prototype.contains = function(name) {
	if (this.valueIndex(name) == -1) {
		return false;
	}
	return true;
}

Cookies.prototype.get = function(name) {
	var begin = document.cookie.indexOf(name + "=");
	if (begin != -1) {
		begin += name.length + 1;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) end = document.cookie.length;
		return decodeURIComponent(document.cookie.substring(begin, end));
	}
	return null;
}

Cookies.prototype.set = function(name, value, expirationDate) {
	var index = this.valueIndex(name);
	if (expirationDate == Infinity) {
		expirationDate = " expires=Fri, 31 Dec 9999 23:59:59 GMT;";
	}
	document.cookie = name + "=" + encodeURIComponent(value) + ";" + expirationDate;
}

Cookies.prototype.remove = function(name) {
	if (this.valueIndex(name) != -1) {
		document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
	}
}