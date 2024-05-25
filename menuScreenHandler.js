var menuItems =[
  {class:'gallery-item', id: 'gallery', src: 'Icons/picture.png', label: 'gallery', iconContainerClass: 'gallery-icon-container', iconClass: 'gallery-icon'},
  {class:'snake-game-item', id: 'snake-game', src: 'Icons/icons8-snake-48.png', label: 'snake-game', iconContainerClass: 'snake-game-icon-container', iconClass: 'snake-game-icon'},
  {class:'video-player-item', id: 'video-player', src: 'Icons/icons8-video-player-48.png', label: 'video-player', iconContainerClass: 'video-player-icon-container', iconClass: 'video-player-icon'},
  {class:'about-item', id: 'about', src: 'Icons/icons8-about (1).svg', label: 'about', iconContainerClass: 'about-icon-container', iconClass: 'about-icon'},
  {class:'music-player-item', id: 'music-player', src: 'wallpaper/musical-note-1314942_1280.png', label: 'music-player', iconContainerClass: 'music-player-icon-container', iconClass: 'music-player-icon'},
  {class:'calculator-item', id: 'calculator', src: 'Icons/icons8-math-48.png', label: 'calculator', iconContainerClass: 'calculator-icon-container', iconClass: 'calculator-icon'},
  {class:'calendar-item', id: 'calendar', src: 'wallpaper/calendar (1).png', label: 'calendar', iconContainerClass: 'calendar-icon-container', iconClass: 'calendar-icon'},
  {class:'torch-item', id: 'torch', src: 'wallpaper/torch.png', label: 'torch', iconContainerClass: 'torch-icon-container', iconClass: 'torch-icon'},
  {class:'setting-item', id: 'setting', src: 'wallpaper/gear-1807204_1920.png', label: 'setting', iconContainerClass: 'setting-icon-container', iconClass: 'setting-icon'},
]

var WIDTH_LENGTH = 3;
var currentMenuIndex = 0;
var RESET = true;

function appScreenHandler(button) {
  var nextMenuIndex;
  var menuItemsLength = menuItems.length;
  var currentAppId = menuItems[currentMenuIndex].id;

  switch (button.id) {
    case "left-select-button":
      unmountMenu();
      openApp(currentAppId);
      break;

    case "power-button":

    case "right-select-button":
      unmountMenu();
      showIdleScreen();
      break;

    case "top-button":
      nextMenuIndex = goUp(menuItemsLength, currentMenuIndex, WIDTH_LENGTH, RESET);
      menuScrolling(menuItems, nextMenuIndex, "selected");
      break;

    case "left-button":
      nextMenuIndex = goLeft(menuItemsLength, currentMenuIndex, RESET);
      menuScrolling(menuItems, nextMenuIndex, "selected");

      break;

    case "right-button":
      nextMenuIndex = goRight(menuItemsLength, currentMenuIndex, RESET);
      menuScrolling(menuItems, nextMenuIndex, "selected");

      break;

    case "bottom-button":
      nextMenuIndex = goDown(menuItemsLength, currentMenuIndex, WIDTH_LENGTH, RESET);
      menuScrolling(menuItems, nextMenuIndex, 'selected');
      var currentAppId = menuItems[currentMenuIndex];

      break;

    default:
      break;
  }
}

function openApp(currentAppId) {
  switch (currentAppId) {
    case "gallery":
      mountGalleryScreen(true);
      break;
    case "video-player":
      showVideoPlayer();
      break;
  
    case "music-player":
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

 function mountMenu(resetAppPosition) {
  var menuScreenNode = document.getElementById("menu-screen-container");
  var menuItemsNode = createMenuItemsNode(menuItems);
  var menuContainerNode = document.getElementById("menu-containerId");
  menuContainerNode.appendChild(menuItemsNode);

  resetSelectedApp(resetAppPosition);
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
  mountNavbar(false);
  mountIdleScreenWallPaper(false);
  AddRemoveClassList(menuScreenNode, "hide", true);
}

var menuItemsContainerNode;

function getMenuContainerNode() {
  return menuItemsContainerNode;
}

function createMenuItemsNode(menuItems) {
  menuItemsContainerNode = createMenuItemsContainerNode();
  for (var menuItem of menuItems) {
    var appContainer = createMenuItem(menuItem);

    menuItemsContainerNode.appendChild(appContainer);
  }
  return menuItemsContainerNode;
}


function createMenuItemsContainerNode() {
  var menuContainerNode = document.createElement("div");
  menuContainerNode.classList.add("menuItems-container");
  return menuContainerNode;
}

function createMenuItem(menuItem) {
  var appContainerNode = document.createElement("div");
  appContainerNode.classList.add("app-container");
  var iconContainer = createIconContainer(menuItem);
  appContainerNode.appendChild(iconContainer);

  appContainerNode.id = menuItem.id;
  
  return appContainerNode;
}

function createIconContainer(menuItem) {
  var iconContainerNode = document.createElement("div");
  iconContainerNode.classList.add("icon-container", menuItem.iconContainerClass);
  
  var icon = createIconNode(menuItem);
  iconContainerNode.appendChild(icon);
  return iconContainerNode;
}


function createIconNode(menuItem) {
  var iconNode = document.createElement("img");

  iconNode.classList.add("iconClass", menuItem.iconClass);
  
  iconNode.src = menuItem.src;

  return iconNode;
}

function resetSelectedApp(resetAppPosition) {
  if (resetAppPosition) {
    highlightApp(false, currentMenuIndex);
    currentMenuIndex = 0;
  }
  highlightApp(true, currentMenuIndex);
}

function highlightApp(showHide, highlightAppIndex) {
  var highlightAppId = menuItems[highlightAppIndex].id;
  var highlightNode = document.getElementById(highlightAppId);
  AddRemoveClassList(highlightNode, "selected", showHide);
}

function menuScrolling(menuItemIds, nextMenuIndex, selectedClassName) {
  var itemId = menuItemIds[nextMenuIndex].id;
  var nextApp = document.getElementById(itemId);
  var currentId = menuItemIds[currentMenuIndex].id;
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
