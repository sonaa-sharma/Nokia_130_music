function defaultCaseHandler(button){
    switch(button.id){
      case "right-select-button":
        var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
        var currentApp = document.getElementById(currentAppId);
        console.log(currentAppId);
        displayDefaultMessage();
        showMenu();
        break;
  
      case "power-button":
        backButtonSelectCurrentApp();
        displayDefaultMessage();
        showMenu();
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
  
  
  