var _photoSources;
var _currentPhotoIndex;

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
    case "bottom-button":
    case "right-button":
      nextImage(_photoSources, _currentPhotoIndex);
      break;
    case "left-button":
    case "top-button":
      previousImage(_photoSources, _currentPhotoIndex);
      break;
    default:
      break;
  }
}

function showPhoto(photoSources, currentPhotoIndex) {
  _photoSources = photoSources;
  _currentPhotoIndex = currentPhotoIndex;
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

function nextImage(photoSources, currentPhotoIndex) {
  hidePhoto();
  currentPhotoIndex++;
  if(currentPhotoIndex === photoSources.length){
    currentPhotoIndex = 0;
  }
  showPhoto(photoSources, currentPhotoIndex);
  console.log(currentPhotoIndex);
}

function previousImage(photoSources, currentPhotoIndex) {
  hidePhoto();
  currentPhotoIndex--;
  if(currentPhotoIndex < 0){
    currentPhotoIndex = photoSources.length-1;
  }
  showPhoto(photoSources, currentPhotoIndex);
  console.log(currentPhotoIndex);
}
