var isSelectkeyPressed = false;
var lockScreenTimeoutId;
var clearGoBackId;

function setDate() {
  var time = new Date();
  var clockYear = time.getFullYear();
  var clockMonth = time.getMonth() + 1;
  var clockDay = time.getDate();

  var currentYear = document.getElementById("year");
  var currentMonth = document.getElementById("month");
  var currentDay = document.getElementById("day");

  currentYear.innerHTML = getTwoDigitNumber(clockYear);
  currentMonth.innerHTML = getTwoDigitNumber(clockMonth);
  currentDay.innerHTML = getTwoDigitNumber(clockDay);
}

function setDateTime() {
  setDate();
  setTime("clock-hour", "clock-min");
}

function lockScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      selectButtonPressed();
      break;
    case "star-key":
      starKeyPressed();
      break;
    default:
      clearTimeout(clearGoBackId);
      goBacktoLockScreen();
      break;
  }
}

function selectButtonPressed() {
  isSelectkeyPressed = true;
  showUnlockMessage();
  showButtonPressed("left-select-button", "unlock");
}

function showButtonPressed(buttonId, elementId) {
  var buttonClick = document.getElementById(buttonId);
  buttonClick.addEventListener("mousedown", function () {
    showShadow(elementId);
  });
  buttonClick.addEventListener("mouseup", function () {
    hideShadow(elementId);
  });
}

function showShadow(elementId) {
  var backwardButton = document.getElementById(elementId);
  backwardButton.style.boxShadow = "1px 1px 10px white";
}

function hideShadow(elementId) {
  var backwardButton = document.getElementById(elementId);
  backwardButton.style.boxShadow = "none";
}

function starKeyPressed() {
  if (!isSelectkeyPressed) {
    return;
  }

  clearTimeout(clearGoBackId);
  hideUnlockMessage();
  hideLockScreen();
  showIdleScreen();
}

var lockScreenWallpaperClassName = 'url("wallpaper/grass.jpg")';

function mountLockScreenWallPaper() {
  setWallPaper(lockScreenWallpaperClassName);
}

function mountLockScreen(show) {
  var lockScreen = document.getElementById("lock-screen-div");
  AddRemoveClassList(lockScreen, "hide", !show);
}

function BackToLockScreen() {
  mountDateTimeContainer(true);
  mountUnlockWithoutSpace(false);
}

function showUnlockMessage() {
  mountUnlockMessage(true);
  mountUnlockText(false);
  clearGoBackId = setTimeout(goBacktoLockScreen, 3000);
}

function hideUnlockMessage() {
  mountUnlockMessage(false);
  mountUnlockText(true);
}

function goBacktoLockScreen() {
  mountUnlockMessage(false);
  mountUnlockText(true);

  isSelectkeyPressed = false;
}

function mountDate(show) {
  var date = document.getElementById("date");
  AddRemoveClassList(date, "hide", !show);
}

function mountTime(show) {
  var time = document.getElementById("time");
  AddRemoveClassList(time, "hide", !show);
}

function mountDateTime(show) {
  mountDate(show);
  mountTime(show);
}

function mountDateTimeContainer(show) {
  var newScreen = document.getElementById("date-time-div");
  AddRemoveClassList(newScreen, "hide", !show);
}

function mountUnlockMessage(show) {
  var message = document.getElementById("unlockMessage");
  AddRemoveClassList(message, "hide", !show);
}

function mountUnlockText(show) {
  var unlockText = document.getElementById("unlock");
  AddRemoveClassList(unlockText, "hide-taking-space", !show);
}

function mountUnlockWithoutSpace(show) {
  var unlockText = document.getElementById("unlock");
  AddRemoveClassList(unlockText, "hide", !show);
}

function showLockScreen() {
  mountLockScreenWallPaper();
  mountUnlockText(true);
  mountDateTimeContainer(true);
  mountNavbar(true);
  mountLockScreen(true);
  mountDateTime(true);
  setDateTime();
  isSelectkeyPressed = false;
  lockScreenTimeoutId = setInterval(setDateTime, 1000);
  screenName = "lockScreen";
}

function hideLockScreen() {
  mountNavbar(false);
  mountLockScreen(false);
  mountDateTimeContainer(false);
  clearInterval(lockScreenTimeoutId);
}
