function AddRemoveClassList(node, className, show) {
  if (show === true) {
    node.classList.add(className);
  } 
  else if(show === false) {
    node.classList.remove(className);
  }
  else{
    throw new Error("Invalid argument");
  }
}

var homeScreenWallpaperClassName = "theme1";

function mountIdleScreenWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, homeScreenWallpaperClassName, show);
}

function mountNavbar(show) {
  var navbar = document.getElementById("navbar");
  AddRemoveClassList(navbar, "hide", !show);
}