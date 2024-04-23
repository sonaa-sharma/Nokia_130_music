var settingList = [
  "lock-screen-setting",
  "home-screen-setting",
  "date-time-setting",
];

var settingIndex = 0;
var currentSettingId = settingList[settingIndex];
var previousSettingId;

function settingsHandler(button) {
  switch (button.id) {
    case "left-select-button":
      hideSettings();
      deselectSettingBorder();
      if (currentSettingId != "date-time-setting") {
        showWallpaperScreen();
      } else {
        showDefaultMessage();
      }
      break;

    case "top-button":
      settingDeselectUp();
      settingSelectUp();
      break;

    case "bottom-button":
      settingDeselectDown();
      settingSelectDown();
      break;

    case "right-select-button":
      hideSettings();
      deselectSettingBorder();
      showMenu();
      break;

    case "power-button":
      hideSettings();
      deselectSettingBorder();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function deselectSettingBorder() {
  var wallpaper = document.getElementById("setting");
  AddRemoveClassList(wallpaper, "selected", false);
}

function showSettings() {
  mountIdleScreenWallPaper(true);
  mountSettingsScreen(true);
  mountNavbar(true);
  addSettingOptionsBorder();
  screenName = "settingsScreen";
}

function hideSettings() {
  mountSettingsScreen(false);
  mountIdleScreenWallPaper(false);
  mountNavbar(false);
}

function mountSettingsScreen(show) {
  var setting = document.getElementById("setting-container");
  AddRemoveClassList(setting, "hide", !show);
}

function addSettingOptionsBorder() {
  var option = document.getElementById(currentSettingId);
  AddRemoveClassList(option, "wallpaper-border");
}

function removeSettingOptionsBorder() {
  var option = document.getElementById(currentSettingId);
  AddRemoveClassList(option, "wallpaper-border", false);
}

function settingSelectUp() {
  if (settingIndex < 0) {
    settingIndex = settingList.length - 1;
  }
  currentSettingId = settingList[settingIndex];
  addSettingOptionsBorder();
}

function settingSelectDown() {
  if (settingIndex === settingList.length) {
    settingIndex = 0;
  }
  currentSettingId = settingList[settingIndex];
  addSettingOptionsBorder();
}

function settingDeselectUp() {
  if (settingIndex < 0) {
    settingIndex = settingList.length - 1;
  }
  if (settingIndex === settingList.length) {
    settingIndex = 0;
  }
  currentSettingId = settingList[settingIndex];
  previousSettingId = currentSettingId;
  removeSettingOptionsBorder();
  settingIndex--;
}

function settingDeselectDown() {
  if (settingIndex === settingList.length) {
    settingIndex = 0;
  }
  currentSettingId = settingList[settingIndex];
  previousSettingId = currentSettingId;
  removeSettingOptionsBorder();
  settingIndex++;
}
