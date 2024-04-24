function galleryScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      hideGallery();
      showMenu(false);
      break;
    case "power-button":
      hideGallery();
      showMenu(true);
      break;
    case "right-select-button":
      hideGallery();
      showMenu(false);
    default:
      break;
  }
}

function showGallery() {
  mountGalleryScreen(true);
  mountIdleScreenWallPaper(true);
  mountNavbar(true);

  screenName = "galleryScreen";
}

function hideGallery() {
  mountGalleryScreen(false);
  mountIdleScreenWallPaper(false);
  mountNavbar(false);
}

function mountGalleryScreen(show) {
  var menuText = document.getElementById("gallery-screen");
  AddRemoveClassList(menuText, "hide", !show);
}
