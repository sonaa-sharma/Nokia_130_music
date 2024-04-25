function galleryScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      mountGalleryScreen(false)
      showPhoto();
      break;
    case "power-button":
      mountGalleryScreen(false)
      showIdleScreen();
      break;
    case "right-select-button":
      mountGalleryScreen(false)
      showMenu();
    default:
      break;
  }
}

function mountGalleryScreen(show) {
  if (show) {
    mountGallery();
  } else {
    unmountGallery();
  }
}

function mountGallery() {
  var galleryNode = document.getElementById("gallery-screen");
  var imagesNode = createImagesNode();
  galleryNode.insertBefore(imagesNode, galleryNode.firstChild);
  AddRemoveClassList(galleryNode, "hide", false);
  screenName = "galleryScreen";
}

function unmountGallery() {
  var galleryNode = document.getElementById("gallery-screen");
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
  containerNode.classList.add("gallery-div");
  containerNode.innerText = "new div";
  return containerNode;
}
