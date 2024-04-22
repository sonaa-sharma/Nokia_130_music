var timeoutId;
var isDeviceOn = false;
var screenName = "turnedOff";

function clickEventFunction(event) {
  var targetNode = event.target;
  var button = getButtonNode(targetNode);

  if (!button || !isDeviceOn) {
    return;
  }

  buttonClicked(button);
}

// button click events----------->

function buttonClicked(button) {
  switch (screenName) {
    case "lockScreen":
      lockScreenHandler(button);
      break;
    case "idleScreen":
      idleScreenHandler(button);
      break;
    case "appScreen":
      appScreenHandler(button);
      break;
    case "musicPlayerScreen":
      musicPlayerHandler(button);
      break;
    case "settingsScreen":
      settingsHandler(button);
      break;
    case "wallpaperScreen":
      wallpaperHandler(button);
      break;
    default:
      defaultCaseHandler(button);
      break;
  }
}

function getButtonNode(node) {
  var dataName = node.dataset.name;

  while (dataName !== "buttons" && dataName !== "keypad-container") {
    var newNode = node.parentNode;
    dataName = newNode.dataset.name;
    node = newNode;
  }

  if (dataName === "keypad-container") {
    return null;
  }

  return node;
}

// phone on-off handlers------------

function setInitialState() {
  initialEvent();
  var deviceOn = localStorage.getItem("deviceOn");
  if (deviceOn === "true") {
    showLockScreen();
    isDeviceOn = true;
  }
}

function showBrandAnimation() {
  var brandAnimation = getBrandAnimationNode();
  displayWhiteScreen();
  displayBrandAnimation(false);
  brandAnimation.play();
}

function displayBrandAnimation(show) {
  var animationContainer = document.getElementById("brand-animation-screen");
  AddRemoveClassList(animationContainer, "hide", show);
}

function getNavbar() {
  return document.getElementById("navbar");
}

function displayNavbar(show) {
  var navbar = getNavbar();
  AddRemoveClassList(navbar, "hide", show);
}

function displayWhiteScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-white", show);
}

function displayBlackScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-off-wallpaper", show);
}

function AddRemoveClassList(node, className, show) {
  if (show === false) {
    node.classList.remove(className);
  } else {
    node.classList.add(className);
  }
}

function onBrandAnimationFinish() {
  displayBrandAnimation();
  displayWhiteScreen(false);
  showLockScreen();
  localStorage.setItem("deviceOn", true);
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
  switch (screenName) {
    case "lockScreen":
      hideLockScreen();
      break;
    case "idleScreen":
      hideIdleScreen();
    case "appScreen":
      hideMenuScreen();
      break;
    case "settingsScreen":
      hideSettings();
      break;
    case "wallpaperScreen":
      hideWallpaperScreen();
      break;
    default:
      displayDefaultMessage();
      break;
  }

  displayBlackScreen();

  localStorage.setItem("deviceOn", false);
}

function getBrandAnimationNode(){
  return document.getElementById("brand-animation");
}

function initialEvent() {
  var keypadButton = document.getElementById("keypad-box");
  var powerButton = document.getElementById("power-button");
  var brandAnimation = getBrandAnimationNode();

  brandAnimation.addEventListener("ended", onBrandAnimationFinish);
  keypadButton.addEventListener("click", clickEventFunction);
  powerButton.addEventListener("mousedown", startPoweringOn);
  powerButton.addEventListener("mouseup", stopPoweringOn);
  powerButton.addEventListener("mouseleave", stopPoweringOn);
  powerButton.addEventListener("touchstart", startPoweringOn);
  powerButton.addEventListener("touchend", stopPoweringOn);
  powerButton.addEventListener("touchcancel", stopPoweringOn);
}

setInitialState();
