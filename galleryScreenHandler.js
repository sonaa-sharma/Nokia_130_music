var galleryScreenConfig = null;

function galleryScreenHandler(button) {
  var nextImageIndex;
  var imagesLength = galleryScreenConfig.imageSources.length;
  var currentImageIndex = galleryScreenConfig.currentImageIndex;
  var imagePerRow = galleryScreenConfig.imagePerRow;
  var allowRotation = galleryScreenConfig.allowRotation;
  var imageSources = galleryScreenConfig.imageSources;

  switch (button.id) {
    case "left-select-button":
      mountGalleryScreen(false, false);
      showPhoto(imageSources, currentImageIndex);
      break;

    case "power-button":
      mountGalleryScreen(true, false);
      showIdleScreen();
      break;

    case "right-select-button":
      mountGalleryScreen(true, false);
      mountMenuScreen(true);
      break;

    case "top-button":
      nextImageIndex = goUp(
        imagesLength,
        currentImageIndex,
        imagePerRow,
        allowRotation
      );
      imageScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    case "left-button":
      nextImageIndex = goLeft(imagesLength, currentImageIndex, allowRotation);
      imageScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    case "right-button":
      nextImageIndex = goRight(imagesLength, currentImageIndex, allowRotation);
      imageScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    case "bottom-button":
      nextImageIndex = goDown(
        imagesLength,
        currentImageIndex,
        imagePerRow,
        allowRotation
      );
      imageScrolling(imageIds, nextImageIndex, "pic-selected");
      break;

    default:
      break;
  }
}

function mountGalleryScreen(reset, show) {
  if (show) {
    mountGallery();
  } else {
    unmountGallery(reset);
  }
}

function getInitialConfig() {
  return {
    imageSources: [
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
    ],
    imagePerRow: 3,
    allowRotation: false,
    currentImageIndex: 0,
  };
}

function mountGallery() {
  galleryScreenConfig = getInitialConfig();

  var galleryNode = document.getElementById("gallery-screen");
  var imagesNode = createImagesNode(galleryScreenConfig.imageSources);
  var imagesContainer = document.getElementById("images-container");
  imagesContainer.appendChild(imagesNode);

  var id = imageIds[galleryScreenConfig.currentImageIndex];
  firstImage = document.getElementById(id);
  AddRemoveClassList(firstImage, "pic-selected", true);
  AddRemoveClassList(galleryNode, "hide", false);
  screenName = "galleryScreen";
}

function unmountGallery(reset) {
  var galleryNode = document.getElementById("gallery-screen");
  var imagesContainer = document.getElementById("images-container");
  var imagesContainerNode = getImagesNode();
  imagesContainer.removeChild(imagesContainerNode);
  AddRemoveClassList(galleryNode, "hide", true);
  galleryScreenConfig = null;
}

var imagesNode;
var imageIds = [];

function getImagesNode() {
  return imagesNode;
}

function createImagesNode(imageSources) {
  imagesNode = createContainerNode();
  for (i = 0; i < imageSources.length; i++) {
    var id = "image-box" + i;
    imageIds[i] = id;
    var imageContainer = createImageContainer(id, imageSources[i]);
    imagesNode.appendChild(imageContainer);
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

function imageScrolling(menuItemIds, nextMenuIndex, selectedClassName) {
  var itemId = menuItemIds[nextMenuIndex];
  var nextApp = document.getElementById(itemId);
  var currentId = menuItemIds[galleryScreenConfig.currentImageIndex];
  var currentApp = document.getElementById(currentId);

  AddRemoveClassList(currentApp, selectedClassName, false);
  AddRemoveClassList(nextApp, selectedClassName, true);
  currentApp.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "center",
  });
  galleryScreenConfig.currentImageIndex = nextMenuIndex;
}
