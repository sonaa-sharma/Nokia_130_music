var powerButton = document.getElementById("power-button");

var timeoutId;
var isDeviceOn = false;

var brandAnimation = document.getElementById("brand-animation");
brandAnimation.addEventListener("ended", onBrandAnimationFinish);

function setInitialState(){
  var deviceOn = localStorage.getItem("deviceOn");

  if(deviceOn === 'true'){
    showLockScreen();
    isDeviceOn = true;
  }
}

function showBrandAnimation() {
  displayWhiteScreen();
  displayBrandAnimation();
  brandAnimation.play();
}

function displayBrandAnimation(show) {
  var animationContainer = document.getElementById("brand-animation-screen");
  
  if (show === false) {
    animationContainer.classList.add("hide");
  } else {
    animationContainer.classList.remove("hide");
  }
}

function showLockScreen() {
  displayWallPaper();
  displayNavbar();
  displayLockScreen();
}

function getNavbar() {
  return document.getElementById("navbar");
}
function displayNavbar(show) {
  var navbar = getNavbar();

  if (show === false) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
  }
}

function displayLockScreen(show) {
    var lockScreen = document.getElementById("lock-screen-div");
    if(show === false){
        lockScreen.classList.add("hide");
    }
    else{
        lockScreen.classList.remove("hide");
    }
}

function displayWallPaper(show) {
  var lcd = getLcd();

  if (show === false) {
    lcd.classList.remove("lcd-on");
  } else {
    lcd.classList.add("lcd-on");
  }
}

function displayWhiteScreen(show) {
  var lcd = getLcd();

  if (show === false) {
    lcd.classList.remove("lcd-white");
  } else {
    lcd.classList.add("lcd-white");
  }
}

function displayBlackScreen(show) {
  var lcd = getLcd();

  if (show === false) {
    lcd.classList.remove("lcd-off");
  } else {
    lcd.classList.add("lcd-off");
  }
}

function onBrandAnimationFinish() {
  displayBrandAnimation(false);
  displayWhiteScreen(false);
  showLockScreen();
  localStorage.setItem("deviceOn", true)
}

function handlePowerOn() {
  if (isDeviceOn) {
    turnOfflcd();
  } else {
    turnOnlcd();
  }

  isDeviceOn = !isDeviceOn;
}

function startPoweringOn(event) {
  timeoutId = setTimeout(handlePowerOn, 2000);
}

function stopPoweringOn(event) {
  clearTimeout(timeoutId);
}
function getLcd() {
  return document.getElementById("lcd");
}

function turnOnlcd() {
  displayBlackScreen(false);
  showBrandAnimation();
}

function turnOfflcd() {
  var lcd = getLcd();
  displayWhiteScreen(false);
  displayWallPaper(false);
  displayNavbar(false);
  displayBlackScreen();
  displayLockScreen(false);
  localStorage.setItem("deviceOn", false);
}

powerButton.addEventListener("mousedown", startPoweringOn);
powerButton.addEventListener("mouseup", stopPoweringOn);
powerButton.addEventListener("mouseleave", stopPoweringOn);
powerButton.addEventListener("touchstart", startPoweringOn);
powerButton.addEventListener("touchend", stopPoweringOn);
powerButton.addEventListener("touchcancel", stopPoweringOn);

setInitialState();