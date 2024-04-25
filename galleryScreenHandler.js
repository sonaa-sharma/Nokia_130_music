function photosScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      mountPhotosScreen(false)
      showGallery();
      break;
    case "power-button":
      mountPhotosScreen(false)
      showGallery();
      break;
    case "right-select-button":
      mountPhotosScreen(false)
      showMenu();
    default:
      break;
  }
}

function mountPhotosScreen(show) {
  if (show) {
    mountPhotos();
  } else {
    unmountPhotos();
  }
}

function mountPhotos() {
  var photosNode = document.getElementById("photos-screen");
  var imagesNode = createImagesNode();
  photosNode.insertBefore(imagesNode, photosNode.firstChild);
  AddRemoveClassList(photosNode, "hide", false);
  screenName = "photosScreen";
}

function unmountPhotos() {
  var galleryNode = document.getElementById("photos-screen");
  var imagesNode = getImagesNode();
  galleryNode.removeChild(imagesNode);
  AddRemoveClassList(galleryNode, "hide", true);
}

var imagesNode;

function createImagesNode() {
  imagesNode = createContainerNode();
  return imagesNode;
}

function getImagesNode() {
  return imagesNode;
}

function createContainerNode() {
  var containerNode = document.createElement("div");
  containerNode.classList.add("photos-div");
  containerNode.innerText = "new div";
  return containerNode;
}
