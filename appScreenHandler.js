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
      backButtonSelectCurrentApp();
      goToBackScreen();
      break;

    case "mid-button-inner":
      hideMenuScreen();
      var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
      console.log(currentAppId);
      findAppSelection(currentAppId);
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
  AddRemoveClassList(nextApp, "selected");
  var currentId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var currentApp = document.getElementById(currentId);
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
      showSettings();
      break;

    default:
      showDefaultMessage();
      break;
  }
}

function showMenu() {
  displayAppScreen(false);
  displayNavbar(false);
  displaySelectText(false);
  displayBackText(false);
  displayAppScreenContainer(false);
  displayIdleScreenWallPaper();
  var itemId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var firstApp = document.getElementById(itemId);

  AddRemoveClassList(firstApp, "selected");

  screenName = "appScreen";
}

function hideMenuScreen() {
  displayIdleScreenWallPaper(false);
  displayAppScreen(false);
  displayNavbar();
  displayAppScreen();
  displaySelectText();
  displayBackText();
  displayAppScreenContainer();
}

function goToBackScreen() {
  hideMenuScreen();
  showIdleScreen();
}

function displayAppScreen(show) {
  var apps = document.getElementById("apps-div");
  AddRemoveClassList(apps, "hide", show);
}

function displayAppScreenContainer(show) {
  var apps = document.getElementById("app-screen-container");
  AddRemoveClassList(apps, "hide", show);
}
