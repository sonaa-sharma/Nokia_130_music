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

function displayWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, lockScreenWallpaperClassName, show);
}

function displayLockScreen(show) {
  var lockScreen = document.getElementById("lock-screen-div");
  AddRemoveClassList(lockScreen, "hide", show);
}

function BackToLockScreen() {
  displayDateTimeContainer(false);
  displayUnlockWithoutSpace(false);
}

function showUnlockMessage() {
  displayUnlockMessage(false);
  displayUnlock();
  clearGoBackId = setTimeout(goBacktoLockScreen, 3000);
}

function hideUnlockMessage() {
  displayUnlockMessage();
  displayUnlock();
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

function displayTime(show) {
  var time = document.getElementById("time");
  AddRemoveClassList(time, "hide", show);
}

function displayBackText(show) {
  var backText = document.getElementById("back");
  AddRemoveClassList(backText, "hide", show);
}

function displaySelectText(show) {
  var selectText = document.getElementById("select");
  AddRemoveClassList(selectText, "hide", show);
}

function displayDateTime(show) {
  displayDate(show);
  displayTime(show);
}

function displayDateTimeContainer(show) {
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

function showLockScreen() {
  displayUnlock(false);
  displayDateTimeContainer(false);
  displayWallPaper();
  displayNavbar(false);
  displayLockScreen(false);
  displayDateTime(false);

  setTime();
  isSelectkeyPressed = false;
  lockScreenTimeoutId = setInterval(setTime, 1000);
  screenName = "lockScreen";
}

function hideLockScreen() {
  displayWallPaper(false);
  displayNavbar();
  displayLockScreen();
  displayDateTimeContainer();
  clearInterval(lockScreenTimeoutId);
}
