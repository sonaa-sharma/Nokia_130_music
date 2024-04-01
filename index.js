function setTime() {
  var time = new Date();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  var clockHour = document.getElementById("clock-hour");
  var clockMin = document.getElementById("clock-min");
  var clockYear = time.getFullYear();
  var clockMonth = time.getMonth() + 1;
  var clockDay = time.getDate();
  var currentYear = document.getElementById("year");
  var currentMonth = document.getElementById("month");
  var currentDay = document.getElementById("day");

  clockHour.innerHTML = getTwoDigitNumber(hour);
  clockMin.innerHTML = getTwoDigitNumber(minutes);
  currentYear.innerHTML = getTwoDigitNumber(clockYear);
  currentMonth.innerHTML = getTwoDigitNumber(clockMonth);
  currentDay.innerHTML = getTwoDigitNumber(clockDay);
}

function getTwoDigitNumber(number) {
  var twoDigitNumber = number;

  if (number < 10) {
    twoDigitNumber = "0" + number;
  }

  return twoDigitNumber;
}

var keypadButton = document.getElementById("keypad-box");
keypadButton.addEventListener("click", clickEventFunction);

function clickEventFunction(event) {
  var targetNode = event.target;
  var button = getButtonNode(targetNode);
  if (!button) {
    return;
  }
  buttonClicked(button);
}

function buttonClicked(button) {
  switch (button.id) {
    case "left-select-button":
      selectButtonPressed(button);
      break;
    case "star-key":
      starKeyPressed(button);
    default:
      clearTimeout(clearGoBackId);
      goBacktoLockScreen();
  }
}

var isSelectkeyPressed = false;
var clearGoBackId;

function selectButtonPressed(button) {
  isSelectkeyPressed = true;

  displayUnlockMessage(false);
  displayUnlock();
  clearGoBackId = setTimeout(goBacktoLockScreen, 3000);
}

function goBacktoLockScreen() {
  displayUnlockMessage();
  displayUnlock(false);
  isSelectkeyPressed = false;
}

// displayDateTime();

function starKeyPressed(button) {
  if (!isSelectkeyPressed) {
    return;
  }

  // displayLockScreen();
  displayDateTime();
  displayMenuText(false);
  displayGotoText(false);
  displayAlarmText(false);
  displayUnlockWithoutSpace();
  displayUnlockMessage(false);

}

function displayGotoText(show) {
  var gotoText = document.getElementById("goto");
  AddRemoveClassList(gotoText, "hide", show);
}

function displayMenuText(show) {
  var menuText = document.getElementById("menu");
  AddRemoveClassList(menuText, "hide", show);

}

function displayAlarmText(show) {
  var newScreen = document.getElementById("alarm");
  AddRemoveClassList(newScreen, "hide", show);
}

function displayDateTime(show) {
  var newScreen = document.getElementById("date-time-div");
  AddRemoveClassList(newScreen, "hide-taking-space", show);
}

function displayUnlockMessage(show) {
  var message = document.getElementById("unlockMessage");
  AddRemoveClassList(message, "hide", show);
}

function displayUnlock(show) {
  var unlockText = document.getElementById("unlock");
  AddRemoveClassList(unlockText, "hide-taking-space", show);
}

function displayUnlockWithoutSpace(show) {
  var unlockText = document.getElementById("unlock");
  AddRemoveClassList(unlockText, "hide", show);
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

var powerButton = document.getElementById("power-button");
var timeoutId;
var isDeviceOn = false;
var brandAnimation = document.getElementById("brand-animation");
brandAnimation.addEventListener("ended", onBrandAnimationFinish);

function setInitialState() {
  var deviceOn = localStorage.getItem("deviceOn");
  if (deviceOn === "true") {
    showLockScreen();
    isDeviceOn = true;
  }
}

function showBrandAnimation() {
  displayWhiteScreen();
  displayBrandAnimation(false);
  brandAnimation.play();
}

function displayBrandAnimation(show) {
  var animationContainer = document.getElementById("brand-animation-screen");
  AddRemoveClassList(animationContainer, "hide", show);
}

function showLockScreen() {
  displayWallPaper();
  displayNavbar(false);
  displayLockScreen(false);
  setTime();
  // displayDateTime();
  
  lockScreenTimeoutId = setInterval(setTime, 1000);
}

function hideLockScreen() {
  displayWallPaper(false);
  displayNavbar();
  displayLockScreen();
  displayUnlockMessage();
  clearInterval(lockScreenTimeoutId);
}

function getNavbar() {
  return document.getElementById("navbar");
}

function displayNavbar(show) {
  var navbar = getNavbar();
  AddRemoveClassList(navbar, "hide", show);
}

function displayLockScreen(show) {
  var lockScreen = document.getElementById("lock-screen-div");
  AddRemoveClassList(lockScreen, "hide", show);
}

function displayWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-on", show);
}

function displayWhiteScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-white", show);
}

function displayBlackScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-off", show);
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
  hideLockScreen();
  displayBlackScreen();
  localStorage.setItem("deviceOn", false);
}

powerButton.addEventListener("mousedown", startPoweringOn);
powerButton.addEventListener("mouseup", stopPoweringOn);
powerButton.addEventListener("mouseleave", stopPoweringOn);
powerButton.addEventListener("touchstart", startPoweringOn);
powerButton.addEventListener("touchend", stopPoweringOn);
powerButton.addEventListener("touchcancel", stopPoweringOn);

setInitialState();
