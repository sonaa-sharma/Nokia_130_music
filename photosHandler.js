function photosScreenHandler(button) {
  switch (button.id) {
    case "power-button":
      hidePhoto();
      showIdleScreen(true);
      break;
    case "right-select-button":
      hidePhoto();
      mountGalleryScreen(false, true);
      break;
    case "right-button":
      nextImage();
      break;
    case "left-button":
      previousImage();
      break;
    default:
      break;
  }
}

function showPhoto(photoSources, currentPhotoIndex) {
  var photoScreen = document.getElementById("photos-screen");
  var photoNode = createImage(photoSources, currentPhotoIndex);
  photoScreen.appendChild(photoNode);
  mountPhotoScreen(true);
  screenName = "photosScreen";
}

function hidePhoto() {
  mountPhotoScreen(false);
  var photoScreen = document.getElementById("photos-screen");
  var photoNode = document.getElementById("image");
  photoScreen.removeChild(photoNode);
}

var photo;

function createImage(photoSources, currentPhotoIndex) {
  var photo = document.createElement("img");
  photo.classList.add("image-width");
  photo.id = "image";
  photo.src = photoSources[currentPhotoIndex];
  return photo;
}

function getPhoto() {
  console.log(photo);
  return photo;
}

function mountPhotoScreen(show) {
  var photoNode = document.getElementById("photos-screen");
  AddRemoveClassList(photoNode, "hide", !show);
}

function nextImage() {
  hidePhoto();
  currentImageIndex++;
  if(currentImageIndex === imageSources.length){
    currentImageIndex = 0;
  }
  showPhoto(imageSources, currentImageIndex);
  console.log(currentImageIndex);
}

function previousImage() {
  hidePhoto();
  currentImageIndex--;
  if(currentImageIndex < 0){
    currentImageIndex = imageSources.length-1;
  }
  showPhoto(imageSources, currentImageIndex);
  console.log(currentImageIndex);
}
