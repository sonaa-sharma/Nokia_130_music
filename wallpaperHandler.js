var themeList = ["theme1", "theme2", "theme3"];

var themeIndex = 0;
var previousThemeId;
var currentThemeId = themeList[themeIndex];

function wallpaperHandler(button) {
  switch (button.id) {
    case "left-select-button":
      hideWallpaperScreen();
      if (currentSettingId === "lock-screen-setting") {
        lockScreenWallpaperClassName = currentThemeId;
        showLockScreen();
      } else if (currentSettingId === "home-screen-setting") {
        homeScreenWallpaperClassName = currentThemeId;
        showIdleScreen();
      }
      break;

    case "top-button":
      themeDeselectUp();
      themeSelectUp();
      break;

    case "bottom-button":
      themeDeselectDown();
      themeSelectDown();
      break;

    case "right-select-button":
      hideWallpaperScreen();
      removeTheme();
      showSettings();
      break;

    case "power-button":
      hideWallpaperScreen();
      removeTheme();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function themeSelectUp() {
  if (themeIndex < 0) {
    themeIndex = themeList.length - 1;
  }

  currentThemeId = themeList[themeIndex];
  addWallpaperBorder();
  addTheme();
}

function themeSelectDown() {
  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

  currentThemeId = themeList[themeIndex];
  addWallpaperBorder();
  addTheme();
}

function themeDeselectUp() {
  if (themeIndex < 0) {
    themeIndex = themeList.length - 1;
  }

  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

  currentThemeId = themeList[themeIndex];
  previousThemeId = currentThemeId;
  removeWallpaperBorder();
  removeTheme();

  themeIndex--;
}

function themeDeselectDown() {
  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

  currentThemeId = themeList[themeIndex];
  previousThemeId = currentThemeId;
  removeWallpaperBorder();
  removeTheme();

  themeIndex++;
}

function showWallpaperScreen() {
  mountMenuText(true);
  hideMenuScreen();
  mountWallpaperScreen(true);
  mountNavbar(true);
  addWallpaperBorder();
  addTheme();

  screenName = "wallpaperScreen";
}

function hideWallpaperScreen() {
  mountWallpaperScreen(false);
  mountNavbar(false);
  removeTheme();
}

function removeTheme() {
  var backgroundWallpaper = getLcd();
  AddRemoveClassList(backgroundWallpaper, currentThemeId, false);
}

function removeWallpaperBorder() {
  var theme = document.getElementById(currentThemeId);
  AddRemoveClassList(theme, "wallpaper-border", false);
}

function addWallpaperBorder() {
  var theme = document.getElementById(currentThemeId);
  AddRemoveClassList(theme, "wallpaper-border");
}

function addTheme() {
  var backgroundWallpaper = getLcd();
  AddRemoveClassList(backgroundWallpaper, currentThemeId);
}


function mountWallpaperScreen(show) {
  var wallpaper = document.getElementById("wallpaper-container");
  AddRemoveClassList(wallpaper, "hide", !show);
}
