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
  for(i=0; i<10; i++){
    var imageContainerBox = createImageContainerBox();
    imagesNode.appendChild(imageContainerBox);
  }
  screenName = "galleryScreen";
}

function unmountGallery() {
  var galleryNode = document.getElementById("gallery-screen");
  var imagesNode = getImagesNode();
  galleryNode.removeChild(imagesNode);
  AddRemoveClassList(galleryNode, "hide", true);
  idName = 1;
}
function abc(){
  var imageContainerBox = createImageContainerBox();
  galleryNode.insertBefore(imageContainerBox, galleryNode.firstChild);
}

var idName = 1;

function createImageContainerBox(){
    var containerNode = document.createElement("div");
    containerNode.classList.add("picture-container", "center");
    // containerNode.innerText = "image-box";
    containerNode.id = "image-box" + idName;
    containerNode.style.backgroundImage = 'url("https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=400")';
    idName++;
    return containerNode;
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
  // containerNode.innerText = "gallery";
  return containerNode;
}


