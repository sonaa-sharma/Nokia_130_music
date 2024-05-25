var settingList = [
  "lock-screen-setting",
  "home-screen-setting",
  "date-time-setting",
];

var currentSettingIndex = 0;
var currentSettingId = settingList[currentSettingIndex];

function settingsHandler(button) {
currentSettingId = settingList[currentSettingIndex];

  switch (button.id) {
    case "left-select-button":
      hideSettings();
      switch(currentSettingId){
        case "lock-screen-setting":
        case "home-screen-setting":
          showWallpaperScreen(true);
          break;
        default:
          showDefaultScreen(); 
          break;
      }
      break;

    case "top-button":
      var nextSettingIndex = goUpButton(settingList, currentSettingIndex);
      setSettingOptionsBorder(settingList, nextSettingIndex);
      break;

    case "bottom-button":
      var nextSettingIndex = goDownButton(settingList, currentSettingIndex);
      setSettingOptionsBorder(settingList, nextSettingIndex);
      break;

    case "right-select-button":
      hideSettings();
      mountMenu(false);
      break;

    case "power-button":
      hideSettings();
      showIdleScreen();
      break;

    default:
      break;
  }
}


function showSettings(resetBoxPosition) {
  mountIdleScreenWallPaper(true);
  mountSettingsScreen(true);
  mountNavbar(true);
  resetBoxSelection(resetBoxPosition, settingList);
  screenName = "settingsScreen";
}

function resetBoxSelection(resetBoxPosition, settingList) {
  if (resetBoxPosition) {
    var nextSettingIndex = 0
    setSettingOptionsBorder(settingList, nextSettingIndex);
  }
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

function setSettingOptionsBorder(settingList, nextSettingIndex) {
  var currentSettingId = settingList[currentSettingIndex];
  var nextSettingId = settingList[nextSettingIndex];
  var currentBox = document.getElementById(currentSettingId);
  var nextBox = document.getElementById(nextSettingId);

  AddRemoveClassList(currentBox, "wallpaper-border", false);
  AddRemoveClassList(nextBox, "wallpaper-border", true);

  currentSettingIndex = nextSettingIndex;
}


function goUpButton(settingList, currentIndex) {
  nextIndex = currentIndex - 1;
  if (nextIndex < 0) {
    nextIndex = settingList.length - 1;
    return nextIndex;
  }
  return nextIndex;
}

function goDownButton(settingList, currentIndex) {
  nextIndex = currentIndex + 1;
  if (nextIndex === settingList.length) {
    nextIndex = 0;
    return nextIndex;
  }
  return nextIndex;
}
