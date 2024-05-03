
var menuIconSources = [
  "Icons/picture.png",
  "Icons/icons8-snake-48.png",
  "Icons/icons8-video-player-48.png",
  "Icons/icons8-about (1).svg",
  "wallpaper/musical-note-1314942_1280.png",
  "Icons/icons8-math-48.png",
  "wallpaper/calendar (1).png",
  "wallpaper/torch.png",
  "wallpaper/gear-1807204_1920.png",
];

var WIDTH_LENGTH = 3;
var currentMenuIndex = 0;
var RESET = true;
var menuItemIds = [];

function appScreenHandler(button) {
  var nextAppIndex;
  var menuItemsLength = menuItemIds.length;
  var currentAppId = menuItemIds[currentMenuIndex];

  switch (button.id) {
    case "left-select-button":
      mountMenuScreen(false);
      console.log(currentAppId);
      openApp(currentAppId);
      break;

    case "power-button":

    case "right-select-button":
      mountMenuScreen(false);
      showIdleScreen();
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
      var currentAppId = menuItemIds[currentMenuIndex];
      console.log(currentAppId);

      break;

    default:
      break;
  }
}

function openApp(currentAppId) {
  console.log(currentAppId);
  switch (currentAppId) {
    case "app-no-0":
      mountGalleryScreen(true, true);
      break;
    case "app-no-4":
      showMusicPlayer();
      break;
    case "app-no-8":
      showSettings(true);
      break;

    default:
      showDefaultScreen();
      break;
  }
}

function mountMenuScreen(show) {
  if (show) {
    mountMenu();
  } else {
    unmountMenu();
  }
}

 function mountMenu() {
  var menuScreenNode = document.getElementById("menu-screen-container");
  var menuItemsNode = createMenuItemsNode(menuIconSources);
  var menuContainerNode = document.getElementById("menu-containerId");
  menuContainerNode.appendChild(menuItemsNode);
  var currentMenuIndex = 0;

  var iconId = menuItemIds[currentMenuIndex];
  firstAppIcon = document.getElementById(iconId);
  AddRemoveClassList(firstAppIcon, "selected", true);
  mountNavbar(true);
  mountIdleScreenWallPaper(true);
  AddRemoveClassList(menuScreenNode, "hide", false);
  
  screenName = "appScreen";
}

function unmountMenu() {
  var menuScreenNode = document.getElementById("menu-screen-container");
  var menuContainer = document.getElementById("menu-containerId");
  var menuContainerNode = getMenuContainerNode();
  menuContainer.removeChild(menuContainerNode);
  currentMenuIndex = 0;
  mountNavbar(false);
  mountIdleScreenWallPaper(false);
  AddRemoveClassList(menuScreenNode, "hide", true);
}

var iconsNode;

function getMenuContainerNode() {
  return iconsNode;
}

function createMenuItemsNode(menuIconSources) {
  iconsNode = createMenuItemsContainerNode();
  for (i = 0; i < menuIconSources.length; i++) {
    var IconId = "app-no-" + i;
    var id = "appIcon-" + i;
    menuItemIds[i] = IconId;
    var appContainer = createAppContainer(id, menuIconSources[i]);
    appContainer.id = IconId;
    iconsNode.appendChild(appContainer);
  }
  return iconsNode;
}


function createMenuItemsContainerNode() {
  var menuContainerNode = document.createElement("div");
  menuContainerNode.classList.add("menuItems-container");
  return menuContainerNode;
}

function createAppContainer(id, src) {
  var appContainerNode = document.createElement("div");
  appContainerNode.classList.add("app-container");
  var iconContainer = createIconContainer(id, src);
  appContainerNode.appendChild(iconContainer);
  return appContainerNode;
}

function createIconContainer(id, src) {
  var iconContainerNode = document.createElement("div");
  iconContainerNode.classList.add("icon-container");
  if(id === "appIcon-4"){
    iconContainerNode.classList.add("music");
  }
  if(id === "appIcon-7"){
    iconContainerNode.classList.add("torch");
  }
  var icon = createIconNode(id, src);
  iconContainerNode.appendChild(icon);
  return iconContainerNode;
}


function createIconNode(id, src) {
  var iconNode = document.createElement("img");
  iconNode.classList.add("iconClass");
  if(id === "appIcon-4" || id === "appIcon-7"){
    iconNode.classList.add("music-icon");
  }
  iconNode.src = src;
  iconNode.id = id;

  return iconNode;
}

// function resetSelectedApp(resetAppPosition) {
//   if (resetAppPosition) {
//     highlightApp(false, currentMenuIndex);
//     currentMenuIndex = 0;
//   }
//   highlightApp(true, currentMenuIndex);
// }

// function highlightApp(showHide, highlightAppIndex) {
//   var highlightAppId = menuItemIds[highlightAppIndex];
//   var highlightNode = document.getElementById(highlightAppId);
//   AddRemoveClassList(highlightNode, "selected", showHide);
// }

