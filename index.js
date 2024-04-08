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

// screen functions------

var screenName = "turnedOff";
var isSelectkeyPressed = false;
var clearGoBackId;

var keypadButton = document.getElementById("keypad-box");
keypadButton.addEventListener("click", clickEventFunction);

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
  }
}

function lockScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      selectButtonPressed(button);
      break;
    case "star-key":
      starKeyPressed(button);
      break;
    default:
      clearTimeout(clearGoBackId);
      goBacktoLockScreen();
      break;
  }
}

function idleScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      showApps(false);
      break;
   case "mid-button-inner":
    showApps(false);
      break;
    default:
      break;
  }
}

function showIdleScreen() {
  displayWallPaper();
  displayNavbar(false);
  displayUnlockWithoutSpace();
  displayDate();
  displayMenuText(false);
  screenName = "idleScreen";
}

function selectButtonPressed() {
  isSelectkeyPressed = true;
  showUnlockMessage();
}

function starKeyPressed(button) {
  if (!isSelectkeyPressed) {
    return;
  }

  hideLockScreen();
  showIdleScreen();
}

function appsScreen() {}

function showApps(show) {
  var apps = document.getElementById("apps-div");
  AddRemoveClassList(apps, "hide", show);
  manageAppsScreen();
}

function manageAppsScreen() {
  displayUnlockWithoutSpace();
  displayDateTimeWithoutSpace();
  displayMenuText();
  displaySelectText(false);
  displayBackText(false);
  displayWallPaper(false);
}

function AppsScreenRemove() {
  showApps();
  displayDateTimeWithoutSpace(false);
  displaySelectText();
  displayBackText();
}

function playMusicApp() {
  var music = document.getElementById("music");
  music.style.border = "2px solid white";
}

function changeDiv() {
  var div = document.getElementById("calls");
  div.style.border = "2px solid white";
}

function BackToLockScreen() {
  displayDateTime(false);
  displayUnlockWithoutSpace(false);
}

function showUnlockMessage() {
  displayUnlockMessage(false);
  displayUnlock();
  clearGoBackId = setTimeout(goBacktoLockScreen, 3000);
}

function goBacktoLockScreen() {
  displayUnlockMessage();
  displayUnlock(false);

  isSelectkeyPressed = false;
}

function displayDate(show) {
  var date = document.getElementById("date");
  AddRemoveClassList(date, "hide", show);
}

function displayBackText(show) {
  var backText = document.getElementById("back");
  AddRemoveClassList(backText, "hide", show);
}

function displayMenuText(show) {
  var menuText = document.getElementById("menu");
  AddRemoveClassList(menuText, "hide", show);
}

function displaySelectText(show) {
  var selectText = document.getElementById("select");
  AddRemoveClassList(selectText, "hide", show);
}

function displayDateTime(show) {
  var newScreen = document.getElementById("date-time-div");
  AddRemoveClassList(newScreen, "hide-taking-space", show);
}

function displayDateTimeWithoutSpace(show) {
  var newScreen = document.getElementById("date-time-div");
  AddRemoveClassList(newScreen, "hide", show);
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

// power button usecases------------

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
    screenName = "lockScreen";
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
  lockScreenTimeoutId = setInterval(setTime, 1000);
  screenName = "lockScreen";
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
  switch (screenName) {
    case "lockScreen":
      hideLockScreen();

    default:
      break;
  }
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
