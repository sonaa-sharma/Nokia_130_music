var switchToLockScreenTimer;

function idleScreenHandler(button) {
  clearTimeout(switchToLockScreenTimer);
  switch (button.id) {
    case "left-select-button":
      hideIdleScreen();
      showMenu(true);
      break;
    default:
      switchToLockScreenTimer = setTimeout(lockTimer, 5000);
      break;
  }
}

function showIdleScreen() {
  displayIdleScreenWallPaper();
  displayLockScreen(false);
  displayNavbar(false);
  displayDate();
  displayMenuText(false);
  displayDateTimeContainer(false);
  lockScreenTimeoutId = setInterval(setTime, 1000);

  switchToLockScreenTimer = setTimeout(lockTimer, 5000);

  screenName = "idleScreen";
}

var homeScreenWallpaperClassName = "theme1";

function displayIdleScreenWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, homeScreenWallpaperClassName, show);
}

function lockTimer() {
  hideIdleScreen();
  showLockScreen();
}

function hideIdleScreen() {
  displayLockScreen();
  displayIdleScreenWallPaper(false);
  displayNavbar();
  displayDate(false);
  displayMenuText();
  displayDateTimeContainer();
  clearInterval(lockScreenTimeoutId);
  clearTimeout(switchToLockScreenTimer);
}

function displayMenuText(show) {
  var menuText = document.getElementById("menu-screen-div");
  AddRemoveClassList(menuText, "hide", show);
}
