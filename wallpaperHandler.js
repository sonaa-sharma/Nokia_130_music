var themeList = [
  "wallpaper/grass.jpg",
  "wallpaper/wp1.jpg",
  "wallpaper/wp2.jpg",
];

var themeIndex = 0;
var previousThemeId;
var currentTheme = themeList[themeIndex];

function wallpaperHandler(button) {
  switch (button.id) {
    case "left-select-button":
      hideWallpaperScreen();
      if (currentSettingId === "lock-screen-setting") {
        var lcd = getLcd();
        lcd.style.backgroundImage = url(currentTheme);
    
        mountLockScreenWallPaper(true);
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

  currentTheme = themeList[themeIndex];
  addWallpaperBorder();
  addTheme();
}

function themeSelectDown() {
  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

  currentTheme = themeList[themeIndex];
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

  currentTheme = themeList[themeIndex];
  previousThemeId = currentTheme;
  removeWallpaperBorder();
  removeTheme();

  themeIndex--;
}

function themeDeselectDown() {
  if (themeIndex === themeList.length) {
    themeIndex = 0;
  }

  currentTheme = themeList[themeIndex];
  previousThemeId = currentTheme;
  removeWallpaperBorder();
  removeTheme();

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
  removeTheme();
}

function removeTheme() {
  var backgroundWallpaper = getLcd();
  AddRemoveClassList(backgroundWallpaper, currentTheme, false);
}

function removeWallpaperBorder() {
  var theme = document.getElementById(currentTheme);
  AddRemoveClassList(theme, "wallpaper-border", false);
}

function addWallpaperBorder() {
  var theme = document.getElementById(currentTheme);
  AddRemoveClassList(theme, "wallpaper-border", true);
}

function addTheme() {
  var backgroundWallpaper = getLcd();
  AddRemoveClassList(backgroundWallpaper, currentTheme, true);
}

function mountWallpaperScreen(show) {
  var wallpaper = document.getElementById("wallpaper-container");
  AddRemoveClassList(wallpaper, "hide", !show);
}

function resetWallapperTheme(resetCondition) {
  if (resetCondition) {
    removeWallpaperBorder();
    removeTheme();
    themeIndex = 0;
    currentTheme = themeList[themeIndex];
  }
  addWallpaperBorder();
  addTheme();
}
