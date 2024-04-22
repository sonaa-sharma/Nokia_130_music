function backButtonSelectCurrentApp() {
  var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var currentApp = document.getElementById(currentAppId);
  console.log(currentAppId);
  AddRemoveClassList(currentApp, "selected", false);

  currentMenuIndexX = 0;
  currentMenuIndexY = 0;
  var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var currentApp = document.getElementById(currentAppId);
  console.log(currentAppId);
  AddRemoveClassList(currentApp, "selected", false);
}
