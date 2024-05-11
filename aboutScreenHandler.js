
function aboutScreenHandler(button) {
    switch (button.id) {
      case "left-select-button":
        
        break;
  
      case "mid-button-inner":
       
        break;
  
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
    var music = document.getElementById("about-screen-id");
    AddRemoveClassList(music, "hide", !show);
  }
  