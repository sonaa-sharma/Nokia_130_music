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
    case "snakeGameOverScreen":
      snakeGameOverHandler(button);
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
  if(show){
    setWallPaper("white");
  }
  else{
    setWallPaper("");
  }
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
      unmountMenu();
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
    case "snakeGameScreen":
      unmountSnakeGame();
      break;
    case "snakeGameOverScreen":
      unmountSnakeGame();
      break;
    case "videoPlayerScreen":
      hideVideoPlayer();
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

  setWallPaper("rgb(10, 10, 10)");
  localStorage.setItem("deviceOn", false);
}

function getBrandAnimationNode() {
  return document.getElementById("brand-animation");
}

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
  [keyCodeMap.arrowLeft]: { id: "left-button", class: "left-active" },
  [keyCodeMap.arrowUp]: { id: "top-button", class: "up-active" },
  [keyCodeMap.arrowRight]: { id: "right-button", class: "right-active" },
  [keyCodeMap.arrowDown]: { id: "bottom-button", class: "low-active" },
  [keyCodeMap.enterKey]: { id: "left-select-button", class: "key-active" },
  [keyCodeMap.backSpaceKey]: { id: "right-select-button", class: "key-active" },
  [keyCodeMap.escapeKey]: { id: "power-button", class: "key-active" },
  [keyCodeMap.starKey]: { id: "star-key", class: "key-active" },
  [keyCodeMap.key0]: { id: "value-0", class: "key-active" },
  [keyCodeMap.key1]: { id: "value-1", class: "key-active" },
  [keyCodeMap.key2]: { id: "value-2", class: "key-active" },
  [keyCodeMap.key3]: { id: "value-3", class: "key-active" },
  [keyCodeMap.key4]: { id: "value-4", class: "key-active" },
  [keyCodeMap.key5]: { id: "value-5", class: "key-active" },
  [keyCodeMap.key6]: { id: "value-6", class: "key-active" },
  [keyCodeMap.key7]: { id: "value-7", class: "key-active" },
  [keyCodeMap.key8]: { id: "value-8", class: "key-active" },
  [keyCodeMap.key9]: { id: "value-9", class: "key-active" },
  [keyCodeMap.numPad0]: { id: "value-0", class: "key-active" },
  [keyCodeMap.numPad1]: { id: "value-1", class: "key-active" },
  [keyCodeMap.numPad2]: { id: "value-2", class: "key-active" },
  [keyCodeMap.numPad3]: { id: "value-3", class: "key-active" },
  [keyCodeMap.numPad4]: { id: "value-4", class: "key-active" },
  [keyCodeMap.numPad5]: { id: "value-5", class: "key-active" },
  [keyCodeMap.numPad6]: { id: "value-6", class: "key-active" },
  [keyCodeMap.numPad7]: { id: "value-7", class: "key-active" },
  [keyCodeMap.numPad8]: { id: "value-8", class: "key-active" },
  [keyCodeMap.numPad9]: { id: "value-9", class: "key-active" },
};

function onKeyDown(event) {
  var keyData = keyIdMaping[event.keyCode];

  if (!keyData || !isDeviceOn) {
    return;
  }

  var buttonNode = document.getElementById(keyData.id);
  if (!buttonNode) {
    return;
  }
  AddRemoveClassList(buttonNode, keyData.class, true);

  buttonMouseDown(buttonNode);
}

function onKeyUp(event) {
  var keyData = keyIdMaping[event.keyCode];

  if (!keyData || !isDeviceOn) {
    return;
  }

  var buttonNode = document.getElementById(keyData.id);

  if (!buttonNode) {
    return;
  }

  AddRemoveClassList(buttonNode, keyData.class, false);
  buttonClicked(buttonNode);

  buttonMouseUp(buttonNode);
}

function onKeypadMousedown(event) {
  event.stopPropagation();
  var targetNode = event.target;
  var button = getButtonNode(targetNode);

  if (!button || !isDeviceOn) {
    return;
  }

  buttonMouseDown(button);
}

function onKeypadMouseup(event) {
  var targetNode = event.target;
  var button = getButtonNode(targetNode);

  if (!button || !isDeviceOn) {
    return;
  }

  buttonMouseUp(button);
}

function buttonMouseDown(button) {
  switch (screenName) {
    case "lockScreen":
      lockScreenMouseDownHandler(button);
      break;
    case "videoPlayerScreen":
      videoPlayerMouseDownHandler(button);
      break;
    case "musicPlayerScreen":
      audioPlayerMouseDownHandler(button);
      break;
    case "calendarScreen":
      calendarMouseDownHandler(button);
      break;
    case "appScreen":
      menuMouseDownHandler(button);
      break;
    default:
      break;
  }
}

function buttonMouseUp(button) {
  switch (screenName) {
    case "lockScreen":
      lockScreenMouseUpHandler(button);
      break;
    case "videoPlayerScreen":
      videoPlayerMouseUpHandler(button);
      break;
    case "musicPlayerScreen":
      audioPlayerMouseUpHandler(button);
      break;
    case "calendarScreen":
      calendarMouseUpHandler(button);
      break;
    case "appScreen":
      menuMouseUpHandler(button);
      break;
    default:
      break;
  }
}

function initializeEvent() {
  var keypadButton = document.getElementById("keypad-box");
  var powerButton = document.getElementById("power-button");

  keypadButton.addEventListener("click", clickEventFunction);
  keypadButton.addEventListener("mousedown", onKeypadMousedown);
  keypadButton.addEventListener("mouseup", onKeypadMouseup);

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
