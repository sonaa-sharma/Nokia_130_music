function aboutScreenHandler(button) {
  switch (button.id) {
    case "right-select-button":
      hideAboutScreen();
      showMenu();
      break;

    case "power-button":
      hideAboutScreen();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function showAboutScreen() {
  mountAboutScreen(true);
  screenName = "aboutScreen";
}

function hideAboutScreen() {
  mountAboutScreen(false);
}

function mountAboutScreen(show) {
  var aboutScreen = document.getElementById("about-screen-id");
  AddRemoveClassList(aboutScreen, "hide", !show);
}
