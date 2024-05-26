var themeList = ['url("wallpaper/grass.jpg")', 'url("wallpaper/wp1.jpg")', 'url("wallpaper/wp2.jpg")'];
var themeIds = ["theme1", "theme2", "theme3"];
var themeIndex = 0;

function wallpaperHandler(button) {
var currentTheme = themeList[themeIndex];
  switch (button.id) {
    case "left-select-button":
      hideWallpaperScreen();
      if (currentSettingId === "lock-screen-setting") {
        lockScreenWallpaperClassName = currentTheme;
        showSettings();
      } else if (currentSettingId === "home-screen-setting") {
        homeScreenWallpaperClassName = currentTheme;
        showSettings();
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
      showSettings(false);
      break;

    case "power-button":
      hideWallpaperScreen();
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

  addWallpaperBorder();
  addTheme();
}

function themeSelectDown() {
  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

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

  removeWallpaperBorder();
  themeIndex--;
}

function themeDeselectDown() {
  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

  removeWallpaperBorder();
  themeIndex++;
}

function showWallpaperScreen(resetCondition) {
  mountWallpaperScreen(true);
  mountNavbar(true);
  resetWallapperTheme(resetCondition);

  screenName = "wallpaperScreen";
}

function hideWallpaperScreen() {
  mountWallpaperScreen(false);
  mountNavbar(false);
  removeWallpaperBorder();
}


function removeWallpaperBorder() {
  var currentThemeId = themeIds[themeIndex];
  var theme = document.getElementById(currentThemeId);
  AddRemoveClassList(theme, "wallpaper-border", false);
}

function addWallpaperBorder() {
  var currentThemeId = themeIds[themeIndex];
  var theme = document.getElementById(currentThemeId);
  AddRemoveClassList(theme, "wallpaper-border", true);
}

function addTheme() {
  setWallPaper(themeList[themeIndex]);
}

function mountWallpaperScreen(show) {
  var wallpaper = document.getElementById("wallpaper-container");
  AddRemoveClassList(wallpaper, "hide", !show);
}

function resetWallapperTheme(resetCondition) {
  if (resetCondition) {
    removeWallpaperBorder();
    themeIndex = 0;
  }
  addWallpaperBorder();
  addTheme();
}
