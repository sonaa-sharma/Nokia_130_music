function photosScreenHandler(button) {
    switch (button.id) {
      case "left-select-button":
        hidePhotos();
        showGallery();
        break;
      case "power-button":
        hidePhotos();
        showGallery();
        break;
      case "right-select-button":
        hidePhotos();
        showMenu();
      default:
        break;
    }
  }
  
  function showPhotos() {
    mountPhotosScreen(true);
    
    // mountIdleScreenWallPaper(true);
    // mountNavbar(true);
  
  
    screenName = "photosScreen";
  }
  
  function hidePhotos() {
    mountPhotosScreen(false);
    // mountIdleScreenWallPaper(false);
    // mountNavbar(false);
  }
  
  function mountPhotosScreen(show) {
    var menuText = document.getElementById("photos-screen");
    AddRemoveClassList(menuText, "hide", !show);
  }
  