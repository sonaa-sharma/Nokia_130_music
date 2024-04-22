function defaultCaseHandler(button){
    switch(button.id){
      case "right-select-button":
        var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
        var currentApp = document.getElementById(currentAppId);
        AddRemoveClassList(currentApp, "selected", false);
        displayDefaultMessage();
        showMenu();
        break;
  
      case "power-button":
        var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
        var currentApp = document.getElementById(currentAppId);
        AddRemoveClassList(currentApp, "selected", false);
        displayDefaultMessage();
        showIdleScreen();
        break;
  
      default:
        break;
    }
  }
  
  function showDefaultMessage(){
    displayDefaultMessage(false);
  
    screenName = "messageScreen";
  }
  function displayDefaultMessage(show){
    var music = document.getElementById("message-container");
    AddRemoveClassList(music, "hide", show);
  }
  
  
  