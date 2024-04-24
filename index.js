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
  initializeEvent();

  var deviceOn = localStorage.getItem("deviceOn");

  if (deviceOn === "true") {
    showLockScreen();
    isDeviceOn = true;
  }
}

function showBrandAnimation() {
  var brandAnimation = getBrandAnimationNode();
  mountWhiteScreen(true);
  mountBrandAnimation(true);
  brandAnimation.play();
  const videoDuration = brandAnimation.duration*1000;
  setTimeout(onBrandAnimationFinish, videoDuration);
}

function onBrandAnimationFinish() {
  mountBrandAnimation(false);
  mountWhiteScreen(false);
  showLockScreen();
  localStorage.setItem("deviceOn", true);
  isDeviceOn = true;
}

function mountBrandAnimation(show) {
  var animationContainer = document.getElementById("brand-animation-screen");
  AddRemoveClassList(animationContainer, "hide", !show);
}

function mountWhiteScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-white", show);
}

function mountBlackScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-off-wallpaper", show);
}

function handlePowerOn() {
  if (isDeviceOn) {
    turnOfflcd();
    isDeviceOn = false;
  } else {
    turnOnlcd();
  }
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
  mountBlackScreen(false);
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
    case "musicPlayerScreen":
      hideMusicPlayer();
      break;
    case "settingsScreen":
      hideSettings();
      break;
    case "wallpaperScreen":
      hideWallpaperScreen();
      break;
    case "messageScreen":
      hideDefaultScreen();
      break;
    default:
      break;
  }

  mountBlackScreen(true);

  localStorage.setItem("deviceOn", false);
}

function getBrandAnimationNode() {
  return document.getElementById("brand-animation");
}

function initializeEvent() {
  var keypadButton = document.getElementById("keypad-box");
  var powerButton = document.getElementById("power-button");
  keypadButton.addEventListener("click", clickEventFunction);
  powerButton.addEventListener("mousedown", startPoweringOn);
  powerButton.addEventListener("mouseup", stopPoweringOn);
  powerButton.addEventListener("mouseleave", stopPoweringOn);
  powerButton.addEventListener("touchstart", startPoweringOn);
  powerButton.addEventListener("touchend", stopPoweringOn);
  powerButton.addEventListener("touchcancel", stopPoweringOn);
}

setInitialState();
