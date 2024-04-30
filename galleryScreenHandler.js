var imageSources = [
  "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/532168/pexels-photo-532168.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1545582/pexels-photo-1545582.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/424134/pexels-photo-424134.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1550618/pexels-photo-1550618.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/298246/pexels-photo-298246.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/133081/pexels-photo-133081.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/369433/pexels-photo-369433.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/639086/pexels-photo-639086.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1089855/pexels-photo-1089855.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/533080/pexels-photo-533080.jpeg?auto=compress&cs=tinysrgb&w=400",
];

var imageIds = [
  "image-box0",
  "image-box1",
  "image-box2",
  "image-box3",
  "image-box4",
  "image-box5",
  "image-box6",
  "image-box7",
  "image-box8",
  "image-box9",
  "image-box10",
  "image-box11",
  "image-box12",
  "image-box13",
  "image-box14",
];

// var currentMenuIndex = 0;
var WIDTH_LENGTH_IMAGE = 3;
var RE_SET = false;

function galleryScreenHandler(button) {
  var nextImageIndex;
  var imagesLength = imageSources.length;
  switch (button.id) {
    case "left-select-button":
      mountGalleryScreen(false);
      showPhoto();
      break;

    case "power-button":
      mountGalleryScreen(false);
      showIdleScreen();
      break;

    case "right-select-button":
      mountGalleryScreen(false);
      showMenu();
      break;

    case "top-button":
      nextImageIndex = goUp(imagesLength, currentMenuIndex, WIDTH_LENGTH_IMAGE, RE_SET);
      console.log(currentMenuIndex);

      itemsScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    case "left-button":
      nextImageIndex = goLeft(imagesLength, currentMenuIndex, RE_SET);
      console.log(currentMenuIndex);

      itemsScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    case "right-button":
      nextImageIndex = goRight(imagesLength, currentMenuIndex, RE_SET);
      console.log(currentMenuIndex);

      itemsScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    case "bottom-button":
      nextImageIndex = goDown(imagesLength, currentMenuIndex, WIDTH_LENGTH_IMAGE, RE_SET);
      console.log(currentMenuIndex);
      
      itemsScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

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
  var imagesNode = createImagesNode(imageSources);
  var imagesContainer = document.getElementById("images-container");
  imagesContainer.appendChild(imagesNode);
  var currentMenuIndex = 0;

  var id = imageIds[currentMenuIndex];
  firstImage = document.getElementById(id);
  AddRemoveClassList(firstImage, "pic-selected", true);

  AddRemoveClassList(galleryNode, "hide", false);
  screenName = "galleryScreen";
}

function unmountGallery() {
  var galleryNode = document.getElementById("gallery-screen");
  var imagesContainer = document.getElementById("images-container");

  var imagesContainerNode = getImagesNode();
  imagesContainer.removeChild(imagesContainerNode);

  currentMenuIndex = 0;

  AddRemoveClassList(galleryNode, "hide", true);
}

var imagesNode;

function getImagesNode() {
  return imagesNode;
}

function createImagesNode(imageSources) {
  imagesNode = createContainerNode();

  for (i = 0; i < imageSources.length; i++) {
    var id = "image-box" + i;
    var imageContainerBox = createImageContainer(id, imageSources[i]);
    imagesNode.appendChild(imageContainerBox);
  }
  return imagesNode;
}

function createImageContainer(id, src) {
  var containerNode = document.createElement("div");
  containerNode.classList.add("picture-container");
  var image = createImageNode(id, src);
  containerNode.appendChild(image);
  return containerNode;
}

function createContainerNode() {
  var containerNode = document.createElement("div");
  containerNode.classList.add("gallery-div");
  return containerNode;
}

function createImageNode(id, src) {
  var imageNode = document.createElement("img");
  imageNode.classList.add("pic");
  imageNode.src = src;
  imageNode.id = id;

  return imageNode;
}
