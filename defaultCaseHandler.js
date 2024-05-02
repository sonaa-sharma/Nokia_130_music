function defaultCaseHandler(button) {
  switch (button.id) {
    case "right-select-button":
      hideDefaultScreen();
      mountMenuScreen(true);
      break;

    case "power-button":
      hideDefaultScreen();
      mountMenuScreen(true);
      break;

    default:
      break;
  }
}

function showDefaultScreen() {
  mountIdleScreenWallPaper(true);
  mountDefaultMessage(true);
  screenName = "messageScreen";
}

function hideDefaultScreen() {
  mountIdleScreenWallPaper(false);
  mountDefaultMessage(false);
}

function mountDefaultMessage(show) {
  var music = document.getElementById("message-container");
  AddRemoveClassList(music, "hide", !show);
}
