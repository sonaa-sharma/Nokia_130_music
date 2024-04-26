function photosScreenHandler(button) {
  switch (button.id) {
    case "power-button":
      hidePhoto()
      showIdleScreen(true);
      break;
    case "right-select-button":
      hidePhoto();
      mountGalleryScreen(true);
    default:
      break;
  }
}

function showPhoto() {
  mountPhotoScreen(true);
  screenName = "photosScreen";
}

function hidePhoto() {
  mountPhotoScreen(false);
}

function mountPhotoScreen(show) {
  var photoNode = document.getElementById("photos-screen");
  AddRemoveClassList(photoNode, "hide", !show);
}
