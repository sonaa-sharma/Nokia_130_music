
var settingList = [
    "lock-screen-setting",
    "home-screen-setting",
    "date-time-setting"
  ]
  
  var settingIndex = 0;
  var currentSettingId = settingList[settingIndex];
  var previousSettingId;
  
  function settingsHandler(button){
    switch (button.id) {
  
    case "left-select-button":
      hideSettings();
      deselectSetting();
      if(currentSettingId != "date-time-setting"){
        showWallpaperScreen();
      }
      else{
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
      deselectSetting();
      showMenu();
      break;
  
    case "power-button":
      backButtonSelectCurrentApp();
      hideSettings();
      deselectSetting();
      showIdleScreen();
      break;
      
    default:
      break;
  
    }
  }
  
  function deselectSetting(){
    var wallpaper = document.getElementById("setting");
    AddRemoveClassList(wallpaper, 'selected', false);
  }
  
  function showSettings(){
    displayIdleScreenWallPaper();
    displaySettingsScreen(false);
    displayNavbar(false);
    addSettingOptionsBorder();
    screenName = "settingsScreen";
  }
  
  function hideSettings(){
    displaySettingsScreen();
    displayIdleScreenWallPaper(false);
    displayNavbar();
  
  }
  
  function displaySettingsScreen(show){
    var setting = document.getElementById("setting-container");
    AddRemoveClassList(setting, "hide", show);
  }
  
  function addSettingOptionsBorder(){
    var option = document.getElementById(currentSettingId);
    AddRemoveClassList(option, "wallpaper-border");
  }
  
  function removeSettingOptionsBorder(){
    var option = document.getElementById(currentSettingId);
    AddRemoveClassList(option, "wallpaper-border", false);
  }
  
  function settingSelectUp(){
    
    if(settingIndex<0){
      settingIndex = settingList.length-1;
    }
    
    currentSettingId = settingList[settingIndex];
    addSettingOptionsBorder();
    

}
  
  
  function settingSelectDown(){
    if(settingIndex === settingList.length){
      settingIndex = 0;
    }
    
    currentSettingId = settingList[settingIndex];
    addSettingOptionsBorder();
  
  }
  
  function settingDeselectUp(){
    if(settingIndex<0){
      settingIndex = settingList.length-1;
    }
  
    if(settingIndex === settingList.length){
      settingIndex = 0;
    }
  
    currentSettingId = settingList[settingIndex];
    previousSettingId = currentSettingId;
    removeSettingOptionsBorder();
    
    settingIndex--;
  
  }
  
  function settingDeselectDown(){
    if(settingIndex === settingList.length){
      settingIndex = 0;
    }
  
    currentSettingId = settingList[settingIndex];
    previousSettingId = currentSettingId;
    removeSettingOptionsBorder();
    
    settingIndex++;
  
  }
  
  