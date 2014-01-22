function getStylesheet() {
      var currentTime = new Date().getHours();
      if (0 <= currentTime && currentTime <= 5) {
       document.write("<link rel='stylesheet' href='/assets/css/dark.css' type='text/css'>");
      }
      if (5 < currentTime&&currentTime <= 5) {
       document.write("<link rel='stylesheet' href='/assets/css/light.css' type='text/css'>");
      }
      if (5 < currentTime&&currentTime < 23) {
       document.write("<link rel='stylesheet' href='/assets/css/dark.css' type='text/css'>");
      }
}