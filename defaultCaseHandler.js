function defaultCaseHandler(button){
    switch(button.id){
      case "right-select-button":
        displayDefaultMessage();
        showMenu(false);
        break;
  
      case "power-button":
        displayDefaultMessage();
        showMenu(true);
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
  
  
  