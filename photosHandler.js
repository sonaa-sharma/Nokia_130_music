var _photoSources;
var _currentPhotoIndex;

function photosScreenHandler(button) {
  switch (button.id) {
    case "power-button":
      hidePhoto();
      showIdleScreen(true);
      break;
    case "left-select-button":
      
      break;
    case "right-select-button":
      hidePhoto();
      mountGalleryScreen(true, _currentPhotoIndex);
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
  photo.innerHTML = "Options";
  var optionBar = createBottomNavbar();
  photo.appendChild(optionBar);
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

function createBottomNavbar(){
  var opitonBox = document.createElement("div");
  opitonBox.classList.add("bottom-navbar-options");
  opitonBox.style.backgroundColor = "pink";
  return opitonBox;
}