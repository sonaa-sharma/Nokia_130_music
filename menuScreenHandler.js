var menuItemIds = [
  "gallery",
  "snake-game",
  "video",
  "about",
  "music",
  "calculator",
  "calendar",
  "torch",
  "setting",
];

var WIDTH_LENGTH = 3;

var currentMenuIndex = 0;

function appScreenHandler(button) {
  var nextAppIndex;

  switch (button.id) {
    case "left-select-button":
      hideMenuScreen();
      var currentAppId = menuItemIds[currentMenuIndex];
      findAppSelection(currentAppId);
      break;

    case "power-button":

    case "right-select-button":
      goToBackScreen();
      break;

    case "top-button":
      nextAppIndex = goUp(menuItemIds, currentMenuIndex);
      console.log(currentMenuIndex, nextAppIndex);
      itemsScrolling(menuItemIds, nextAppIndex, 'selected');
      break;

    case "left-button":
      nextAppIndex = goLeft(menuItemIds, currentMenuIndex);
      console.log(currentMenuIndex, nextAppIndex);
      itemsScrolling(menuItemIds, nextAppIndex, 'selected');

      break;

    case "right-button":
      nextAppIndex = goRight(menuItemIds, currentMenuIndex);
      console.log(currentMenuIndex, nextAppIndex);
      itemsScrolling(menuItemIds, nextAppIndex, 'selected');

      break;

    case "bottom-button":
      nextAppIndex = goDown(menuItemIds.length, currentMenuIndex, WIDTH_LENGTH);
      itemsScrolling(menuItemIds, nextAppIndex, 'selected');

      break;

    default:
      break;
  }
}

function itemsScrolling(menuItemIds, nextMenuIndex, selectedClassName) {
  var itemId = menuItemIds[nextMenuIndex];
  var nextApp = document.getElementById(itemId);
  var currentId = menuItemIds[currentMenuIndex];
  var currentApp = document.getElementById(currentId);

  AddRemoveClassList(currentApp, selectedClassName, false);
  AddRemoveClassList(nextApp, selectedClassName, true);
  currentApp.scrollIntoView({ behavior: "smooth", inline: "center", block: 'center' });

  currentMenuIndex = nextMenuIndex;
}

function goRight(menuItemIds, x) {
  var nextIndex = x + 1;

  if (nextIndex === menuItemIds.length) {
    nextIndex = 0;
  }

  return nextIndex;
}

function goLeft(menuItemIds, x) {
  var nextIndex = x - 1;

  if (nextIndex < 0) {
    nextIndex = menuItemIds.length - 1;
  }

  return nextIndex;
}

function goUp(menuItemIds, x) {
  var nextIndex = x - 3;

  if (nextIndex < 0) {
    nextIndex = menuItemIds.length - 1;
  }

  return nextIndex;
}

function goDown(menuItemsLength, currentPosition, widthSize) {
  var nextPosition = currentPosition + widthSize;

  if (nextPosition < menuItemsLength) {
    return nextPosition;
  }

  var gridSize = getGridSize(menuItemsLength, widthSize, currentPosition);

  if (currentPosition === gridSize - 1) {
    return 0;
  }

  nextPosition = nextPosition - gridSize + 1;

  if (nextPosition >= menuItemsLength) {
    return 0;
  }

  return nextPosition;
}

function getGridSize(menuItemsLength, widthSize, currentPosition) {
  var lines = Math.ceil(menuItemsLength / widthSize);
  var gridSize = lines * widthSize;
  var smallerGridSize = gridSize - widthSize;

  if (currentPosition < smallerGridSize) {
    return smallerGridSize;
  }

  return gridSize;
}

function findAppSelection(currentAppId) {
  switch (currentAppId) {
    case "gallery":
      mountGalleryScreen(true);
      break;
    case "about":
      showAboutScreen();
      break;
    case "music":
      showMusicPlayer();
      break;
    case "calculator":
      mountCalculator();
      break;
    case "setting":
      showSettings(true);
      break;
    case "torch":
      showTorchScreen();
      break;
    default:
      showDefaultScreen();
      break;
  }
}

function resetSelectedApp(resetAppPosition) {
  if (resetAppPosition) {
    highlightApp(false, currentMenuIndex);
    currentMenuIndex = 0;
  }
  highlightApp(true, currentMenuIndex);
}

function highlightApp(showHide, highlightAppIndex) {
  var highlightAppId = menuItemIds[highlightAppIndex];
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
