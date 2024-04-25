var switchToLockScreenTimer;

function idleScreenHandler(button) {
  clearTimeout(switchToLockScreenTimer);
  switch (button.id) {
    case "left-select-button":
      hideIdleScreen();
      showMenu(true);
      break;
    case "mid-button-inner":
      hideIdleScreen();
      showMusicPlayer();
      break;
    default:
      switchToLockScreenTimer = setTimeout(lockTimer, 5000);
      break;
  }
}

function showIdleScreen() {
  mountIdleScreenWallPaper(true);
  mountNavbar(true);
  mountIdleScreen(true);
  switchToLockScreenTimer = setTimeout(lockTimer, 5000);

  screenName = "idleScreen";
}

function lockTimer() {
  hideIdleScreen();
  showLockScreen();
}

function hideIdleScreen() {
  mountIdleScreen(false);
  mountIdleScreenWallPaper(false);
  mountNavbar(false);
  clearInterval(IdleScreenTimeoutId);
  clearTimeout(switchToLockScreenTimer);
}

function mountIdleScreen(show) {
  var menuText = document.getElementById("menu-screen-div");
  AddRemoveClassList(menuText, "hide", !show);
}

function mountTime1(show) {
  var time = document.getElementById("time1");
  AddRemoveClassList(time, "hide", !show);
}
