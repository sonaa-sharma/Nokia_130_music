function defaultCaseHandler(button){
    switch(button.id){
      case "right-select-button":
        mountDefaultMessage(false);
        showMenu(false);
        break;
  
      case "power-button":
        mountDefaultMessage(false);
        showMenu(true);
        break;
  
      default:
        break;
    }
  }
  
  function showDefaultMessage(){
    mountDefaultMessage(true);
    screenName = "messageScreen";
  }

  function mountDefaultMessage(show){
    var music = document.getElementById("message-container");
    AddRemoveClassList(music, "hide", !show);
  }
  
  
  