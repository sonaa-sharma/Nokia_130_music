var isSelectkeyPressed = false;
var lockScreenTimeoutId;
var clearGoBackId;

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

function selectButtonPressed() {
  isSelectkeyPressed = true;
  showUnlockMessage();
}

function starKeyPressed(button) {
  if (!isSelectkeyPressed) {
    return;
  }

  clearTimeout(clearGoBackId);
  hideUnlockMessage();
  hideLockScreen();
  showIdleScreen();
}

var lockScreenWallpaperClassName = "theme1";

function mountLockScreenWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, lockScreenWallpaperClassName, show);
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
  mountLockScreenWallPaper(true);
  mountUnlockText(true);
  mountDateTimeContainer(true);
  mountNavbar(true);
  mountLockScreen(true);
  mountDateTime(true);
  setTime();
  isSelectkeyPressed = false;
  lockScreenTimeoutId = setInterval(setTime, 1000);
  screenName = "lockScreen";
}

function hideLockScreen() {
  mountLockScreenWallPaper(false);
  mountNavbar(false);
  mountLockScreen(false);
  mountDateTimeContainer(false);
  clearInterval(lockScreenTimeoutId);
}