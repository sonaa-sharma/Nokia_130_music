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
  mountIdleScreenWallPaper(true);
  mountNavbar(true);
  mountIdleScreen(true);
  // mountDate(true);
  // showDateTimeDiv();
  lockScreenTimeoutId = setInterval(setTime, 1000);
  switchToLockScreenTimer = setTimeout(lockTimer, 5000);

  screenName = "idleScreen";
}


function lockTimer() {
  hideIdleScreen();
  showLockScreen();
}

function showDateTimeDiv(){
  mountLockScreen(true);
  mountDateTimeContainer(true);
  mountDate(false);
  mountUnlockText(false);
}

function hideIdleScreen() {
  mountIdleScreen(false);
  mountIdleScreenWallPaper(false);
  mountNavbar(false);
  // mountLockScreen(false);
  // mountDate(false);
  // mountDateTimeContainer(false);
  clearInterval(lockScreenTimeoutId);
  clearTimeout(switchToLockScreenTimer);
}

function mountIdleScreen(show) {
  var menuText = document.getElementById("menu-screen-div");
  AddRemoveClassList(menuText, "hide", !show);
}
