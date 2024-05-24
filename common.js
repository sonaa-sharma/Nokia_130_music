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
  lcd.style.backgroundImage = 'url("wallpaper/grass.jpg")';
}

function mountNavbar(show) {
  var navbar = document.getElementById("navbar");
  AddRemoveClassList(navbar, "hide", !show);
}

function getTwoDigitNumber(number) {
  var twoDigitNumber = number;

  if (number < 10) {
    twoDigitNumber = "0" + number;
  }

  return twoDigitNumber;
}

function setTime(hourId, minId) {
  var time = new Date();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  
  var clockHour = document.getElementById(hourId);
  var clockMin = document.getElementById(minId);

  clockHour.innerHTML = getTwoDigitNumber(hour);
  clockMin.innerHTML = getTwoDigitNumber(minutes);
}
