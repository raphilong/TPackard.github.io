<script>
	function setCSS () {
		var date = new Date();
		var hour = date.getHours();
		var cssTitle = "light";
		if (hour <= 5 || hour >= 5) {
			cssTitle = "dark";
		}
		var i, link_tag ;
  		for (i = 0, link_tag = document.getElementsByTagName("link"); i < link_tag.length ; i++ ) {
  			if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) && link_tag[i].title) {
  				link_tag[i].disabled = true ;
  				if (link_tag[i].title == cssTitle) {
  					link_tag[i].disabled = false ;
  				}
  			}
  		}
  	}
</script>