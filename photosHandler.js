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
  var photoBackgroundNode = createPhotoBackground(photoSources, currentPhotoIndex);
  photoScreen.appendChild(photoBackgroundNode);
  mountPhotoScreen(true);
  screenName = "photosScreen";
}

function hidePhoto() {
  mountPhotoScreen(false);
  var photoScreen = document.getElementById("photos-screen");
  var photoBackgroundNode = document.getElementById("image_background");
  photoScreen.removeChild(photoBackgroundNode);
}


function createPhotoBackground(photoSources, currentPhotoIndex){
  var screen = document.createElement("div");
  screen.classList.add("background-photo");
  screen.id = "image_background";
  var photoNode = createImage(photoSources, currentPhotoIndex);
  screen.style.backgroundImage = "url('" + photoNode.src + "')";
  var bottomBar = createBottomNavbar();
  screen.appendChild(bottomBar);
  return screen;
}
function createImage(photoSources, currentPhotoIndex) {
  var photo = document.createElement("img");
  photo.src = photoSources[currentPhotoIndex];
  return photo;
}

function createBottomNavbar(){
  var optionsContainer = document.createElement("div");
  optionsContainer.classList.add("bottom-navbar");
  optionsContainer.classList.add("bottom-navbar-color");
  optionsContainer.classList.add("bottom-navbar-container");

  var opitonSelect = document.createElement("div");
  var opitonBack = document.createElement("div");
  opitonSelect.innerHTML = "Options";
  opitonBack.innerHTML = "Back";

  optionsContainer.appendChild(opitonSelect);
  optionsContainer.appendChild(opitonBack);

  return optionsContainer;
}

function createOptions(){
  var optionsContainer = document.createElement("div");
  optionsContainer.classList.add("bottom-navbar");
  optionsContainer.classList.add("bottom-navbar-color");
  optionsContainer.classList.add("bottom-navbar-container");

  var opitonSelect = document.createElement("div");
  var opitonBack = document.createElement("div");
  opitonSelect.innerHTML = "Options";
  opitonBack.innerHTML = "Back";

  optionsContainer.appendChild(opitonSelect);
  optionsContainer.appendChild(opitonBack);

  return optionsContainer;
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

