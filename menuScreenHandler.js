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
  var menuItemsLength = menuItemIds.length;
  var RESET = true;

  switch (button.id) {
    case "left-select-button":
      hideMenuScreen();
      var currentAppId = menuItemIds[currentMenuIndex];
      openApp(currentAppId);
      break;

    case "power-button":

    case "right-select-button":
      goToBackScreen();
      break;

    case "top-button":
      nextAppIndex = goUp(menuItemsLength, currentMenuIndex, WIDTH_LENGTH, RESET);
      itemsScrolling(menuItemIds, nextAppIndex, "selected");
      break;

    case "left-button":
      nextAppIndex = goLeft(menuItemsLength, currentMenuIndex, RESET);
      itemsScrolling(menuItemIds, nextAppIndex, "selected");

      break;

    case "right-button":
      nextAppIndex = goRight(menuItemsLength, currentMenuIndex, RESET);
      itemsScrolling(menuItemIds, nextAppIndex, "selected");

      break;

    case "bottom-button":
      nextAppIndex = goDown(menuItemsLength, currentMenuIndex, WIDTH_LENGTH, RESET);
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
  currentApp.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "center",
  });

  currentMenuIndex = nextMenuIndex;
}

function goRight(menuItemsLength, currentPosition, rotation_allowed) {
  var nextPosition = currentPosition + 1;

  if (nextPosition === menuItemsLength && rotation_allowed === true) {
    nextPosition = 0;
  }

  if (nextPosition === menuItemsLength && rotation_allowed === false) {
    return currentPosition;
  }

  return nextPosition;
}

function goLeft(menuItemsLength, currentPosition, rotation_allowed) {
  var nextPosition = currentPosition - 1;

  if (nextPosition < 0 && rotation_allowed === true) {
    nextPosition = menuItemsLength - 1;
  }

  if (nextPosition < 0 && rotation_allowed === false) {
    return currentPosition;
  }

  return nextPosition;
}

function goUp(menuItemsLength, currentPosition, widthSize, rotation_allowed) {
  var nextPosition = currentPosition - widthSize;

  if (nextPosition < 0 && rotation_allowed === false) {
    return currentPosition;
  }

  if(menuItemsLength === 1){
    return 0;
  }

  var gridSize1 = getGridSize1(menuItemsLength, widthSize);

  if (nextPosition < 0 && gridSize1 > menuItemsLength) {
    nextPosition = nextPosition + gridSize1 - 1;
    if (nextPosition >= menuItemsLength) {
      return nextPosition - widthSize;
    }
    if(nextPosition<0){
      nextPosition = nextPosition + gridSize1 - 1;
      return nextPosition;
    }
  }

  if (nextPosition < 0 && gridSize1 === menuItemsLength) {
    nextPosition = nextPosition + gridSize1 - 1;

  }

  if (currentPosition === 0 && rotation_allowed === true && gridSize1 === menuItemsLength) {
    nextPosition = menuItemsLength - 1;

    return nextPosition;
  }

  return nextPosition;
}

function goDown(menuItemsLength, currentPosition, widthSize, rotation_allowed) {
  var nextPosition = currentPosition + widthSize;

  if (nextPosition >= menuItemsLength && rotation_allowed === false) {
    return currentPosition;
  }

  if (nextPosition < menuItemsLength) {
    return nextPosition;
  }

  var gridSize = getGridSize(menuItemsLength, widthSize, currentPosition);

  if (currentPosition === gridSize - 1 && rotation_allowed === true) {
    return 0;
  }

  nextPosition = nextPosition - gridSize + 1;

  if (nextPosition >= menuItemsLength && rotation_allowed === true) {
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

function getGridSize1(menuItemsLength, widthSize) {
  var lines = Math.ceil(menuItemsLength / widthSize);
  var gridSize1 = lines * widthSize;
  return gridSize1;
}
function openApp(currentAppId) {
  switch (currentAppId) {
    case "gallery":
      mountGalleryScreen(true);
      break;
    case "music":
      showMusicPlayer();
      break;
    case "setting":
      showSettings(true);
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
