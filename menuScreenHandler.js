var menuItemIds = [
  ["calls", "contact", "alarm"],
  ["fm", "music", "message"],
  ["calendar", "torch", "setting"],
];

var currentMenuIndexX = 0;
var currentMenuIndexY = 0;

function appScreenHandler(button) {
  var nextAppIndex;

  switch (button.id) {
    case "left-select-button":
      hideMenuScreen();
      var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
      findAppSelection(currentAppId);
      break;

    case "power-button":

    case "right-select-button":
      goToBackScreen();
      break;

    case "top-button":
      nextAppIndex = goUp(menuItemIds, currentMenuIndexX, currentMenuIndexY);
      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;

    case "left-button":
      nextAppIndex = goLeft(menuItemIds, currentMenuIndexX, currentMenuIndexY);
      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;

    case "right-button":
      nextAppIndex = goRight(menuItemIds, currentMenuIndexX, currentMenuIndexY);
      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;

    case "bottom-button":
      nextAppIndex = goDown(menuItemIds, currentMenuIndexX, currentMenuIndexY);
      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;

    default:
      break;
  }
}

function menuScrolling(nextMenuIndexX, nextMenuIndexY) {
  var itemId = menuItemIds[nextMenuIndexX][nextMenuIndexY];
  var nextApp = document.getElementById(itemId);
  var currentId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var currentApp = document.getElementById(currentId);

  AddRemoveClassList(nextApp, "selected", true);
  AddRemoveClassList(currentApp, "selected", false);
  
  currentMenuIndexX = nextMenuIndexX;
  currentMenuIndexY = nextMenuIndexY;
}

function goRight(menuItemIds, x, y) {
  var nextIndexX = x;
  var nextIndexY = y + 1;

  if (nextIndexY === menuItemIds[x].length) {
    nextIndexX++;
    nextIndexY = 0;
  }

  if (nextIndexX === menuItemIds.length) {
    nextIndexX = 0;
  }

  return [nextIndexX, nextIndexY];
}

function goLeft(menuItemIds, x, y) {
  var backIndexX = x;
  var backIndexY = y - 1;

  if (backIndexY < 0) {
    backIndexY = menuItemIds[x].length - 1;
    backIndexX--;
  }

  if (backIndexX < 0) {
    backIndexX = menuItemIds.length - 1;
  }

  return [backIndexX, backIndexY];
}

function goUp(menuItemIds, x, y) {
  var backIndexX = x - 1;
  var backIndexY = y;

  if (backIndexX < 0) {
    backIndexX = menuItemIds.length - 1;
    backIndexY--;
  }

  if (backIndexY < 0) {
    backIndexY = menuItemIds[x].length - 1;
  }

  return [backIndexX, backIndexY];
}

function goDown(menuItemIds, x, y) {
  var nextIndexX = x + 1;
  var nextIndexY = y;

  if (nextIndexX === menuItemIds.length) {
    nextIndexX = 0;
    nextIndexY++;
  }

  if (nextIndexY === menuItemIds[x].length) {
    nextIndexY = 0;
  }

  return [nextIndexX, nextIndexY];
}

function findAppSelection(currentAppId) {
  switch (currentAppId) {
    case "music":
      showMusicPlayer();
      break;
    case "setting":
      showSettings(true);
      break;

    default:
      showDefaultMessage();
      break;
  }
}

function resetSelectedApp(resetAppPosition) {
  if (resetAppPosition) {
    highlightApp(false, currentMenuIndexX, currentMenuIndexY);
    currentMenuIndexX = 0;
    currentMenuIndexY = 0;
  }
  highlightApp(true, currentMenuIndexX, currentMenuIndexY);
}

function highlightApp(showHide, highlightAppIndexX, highlightAppIndexY) {
  var highlightAppId = menuItemIds[highlightAppIndexX][highlightAppIndexY];
  var highlightNode = document.getElementById(highlightAppId);
  AddRemoveClassList(highlightNode, "selected", showHide);
}

function showMenu(resetAppPosition) {
  mountAppScreen(true);
  mountNavbar(true);
  mountSelectText(true);
  mountBackText(true);
  mountAppScreenContainer(true);
  mountIdleScreenWallPaper(true);
  resetSelectedApp(resetAppPosition);
  screenName = "appScreen";
}

function hideMenuScreen() {
  mountIdleScreenWallPaper(false);
  mountAppScreen(false);
  mountNavbar(false);
  mountSelectText(false);
  mountBackText(false);
  mountAppScreenContainer(false);
}

function goToBackScreen() {
  hideMenuScreen();
  showIdleScreen();
}

function mountSelectText(show) {
  var selectText = document.getElementById("select");
  AddRemoveClassList(selectText, "hide", !show);
}

function mountBackText(show) {
  var backText = document.getElementById("back");
  AddRemoveClassList(backText, "hide", !show);
}

function mountAppScreen(show) {
  var apps = document.getElementById("apps-div");
  AddRemoveClassList(apps, "hide", !show);
}

function mountAppScreenContainer(show) {
  var apps = document.getElementById("app-screen-container");
  AddRemoveClassList(apps, "hide", !show);
}


