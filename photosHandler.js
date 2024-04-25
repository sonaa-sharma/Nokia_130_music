function galleryScreenHandler(button) {
  switch (button.id) {
    case "power-button":
      hideGallery();
      showIdleScreen(true);
      break;
    case "right-select-button":
      hideGallery();
      showPhotos(false);
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
