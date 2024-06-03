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
    case "galleryScreen":
      galleryScreenHandler(button);
      break;
    case "photosScreen":
      photosScreenHandler(button);
      break;
    case "setPhotoOptionsScreen":
      setPhotoOptionsHandler(button);
      break;
    case "snakeGameScreen":
      snakeGameHandler(button);
      break;
    case "videoPlayerScreen":
      videoPlayerHandler(button);
      break;
    case "aboutScreen":
      aboutScreenHandler(button);
      break;
    case "musicPlayerScreen":
      musicPlayerHandler(button);
      break;
    case "calculatorScreen":
      calculatorHandler(button);
      break;
    case "calendarScreen":
      calendarHandler(button);
      break;
    case "torchScreen":
      torchScreenHandler(button);
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
  const videoDuration = brandAnimation.duration * 1000;
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
      break;
    case "appScreen":
      hideMenuScreen();
      break;
    case "galleryScreen":
      mountGalleryScreen(false);
      break;
    case "photosScreen":
      hidePhoto();
      break;
    case "setPhotoOptionsScreen":
      hidePhoto();
      break;
    case "aboutScreen":
      hideAboutScreen();
      break;
    case "musicPlayerScreen":
      hideMusicPlayer();
      break;
    case "calculatorScreen":
      unmountCalculator();
      break;
    case "calendarScreen":
      unmountCalendar();
      break;
    case "torchScreen":
      hideTorchScreen();
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

function onKeyDown(event) {}

var keyCodeMap = {
  arrowLeft: 37,
  arrowUp: 38,
  arrowRight: 39,
  arrowDown: 40,
  enterKey: 13,
  backSpaceKey: 8,
  escapeKey: 27,
  starKey: 106,
  key0: 48,
  key1: 49,
  key2: 50,
  key3: 51,
  key4: 52,
  key5: 53,
  key6: 54,
  key7: 55,
  key8: 56,
  key9: 57,
  numPad0: 96,
  numPad1: 97,
  numPad2: 98,
  numPad3: 99,
  numPad4: 100,
  numPad5: 101,
  numPad6: 102,
  numPad7: 103,
  numPad8: 104,
  numPad9: 105,
};

var keyIdMaping = {
  [keyCodeMap.arrowLeft]: "left-button",
  [keyCodeMap.arrowUp]: "top-button",
  [keyCodeMap.arrowRight]: "right-button",
  [keyCodeMap.arrowDown]: "bottom-button",
  [keyCodeMap.enterKey]: "left-select-button",
  [keyCodeMap.backSpaceKey]: "right-select-button",
  [keyCodeMap.escapeKey]: "power-button",
  [keyCodeMap.starKey]: "star-key",
  [keyCodeMap.key0]: "value-0",
  [keyCodeMap.key1]: "value-1",
  [keyCodeMap.key2]: "value-2",
  [keyCodeMap.key3]: "value-3",
  [keyCodeMap.key4]: "value-4",
  [keyCodeMap.key5]: "value-5",
  [keyCodeMap.key6]: "value-6",
  [keyCodeMap.key7]: "value-7",
  [keyCodeMap.key8]: "value-8",
  [keyCodeMap.key9]: "value-9",
  [keyCodeMap.numPad0]: "value-0",
  [keyCodeMap.numPad1]: "value-1",
  [keyCodeMap.numPad2]: "value-2",
  [keyCodeMap.numPad3]: "value-3",
  [keyCodeMap.numPad4]: "value-4",
  [keyCodeMap.numPad5]: "value-5",
  [keyCodeMap.numPad6]: "value-6",
  [keyCodeMap.numPad7]: "value-7",
  [keyCodeMap.numPad8]: "value-8",
  [keyCodeMap.numPad9]: "value-9",
};

function onKeyUp(event) {
  var id = keyIdMaping[event.keyCode];

  if (!id || !isDeviceOn) {
    return;
  }

  var node = document.getElementById(id);

  buttonClicked(node);
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
  document.body.addEventListener("keydown", onKeyDown);
  document.body.addEventListener("keyup", onKeyUp);
}

setInitialState();
