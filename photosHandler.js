var _photoSources;
var _currentPhotoIndex;
var _showPhotoOptions;

function photosScreenHandler(button) {
  switch (button.id) {
    case "power-button":
      hidePhoto();
      showIdleScreen(true);
      break;
    case "left-select-button":
      hidePhoto();
      showPhoto(_photoSources, _currentPhotoIndex, !_showPhotoOptions);
      break;
    case "right-select-button":
      hidePhoto();
      mountGalleryScreen(true, _currentPhotoIndex);
      break;
    case "bottom-button":
    case "right-button":
      nextImage(_photoSources, _currentPhotoIndex, _showPhotoOptions);
      break;
    case "left-button":
    case "top-button":
      previousImage(_photoSources, _currentPhotoIndex, _showPhotoOptions);
      break;
    default:
      break;
  }
}

function showPhoto(photoSources, currentPhotoIndex, showPhotoOptions) {
  if(showPhotoOptions === false){
    screenName = "setPhotoOptionsScreen";
  }
  else{
    screenName = "photosScreen";
  }

  _photoSources = photoSources;
  _currentPhotoIndex = currentPhotoIndex;
  _showPhotoOptions = showPhotoOptions;

  var photoScreen = document.getElementById("photos-screen");
  var photoBackgroundNode = createPhotoBackground(photoSources, currentPhotoIndex, showPhotoOptions);
  photoScreen.appendChild(photoBackgroundNode);
  mountPhotoScreen(true);
}

function hidePhoto() {
  mountPhotoScreen(false);
  var photoScreen = document.getElementById("photos-screen");
  var photoBackgroundNode = document.getElementById("image_background");
  photoScreen.removeChild(photoBackgroundNode);
}


function createPhotoBackground(photoSources, currentPhotoIndex, showPhotoOptions){
  var screen = document.createElement("div");
  screen.classList.add("background-photo");
  screen.id = "image_background";
  var photoNode = createImage(photoSources, currentPhotoIndex);
  screen.style.backgroundImage = "url('" + photoNode.src + "')";
  var setAsOptions = createOptionsContainer();
  if(showPhotoOptions){
    AddRemoveClassList(setAsOptions, "hide-taking-space", true);
  }
  var bottomBar = createBottomNavbar();
  screen.appendChild(setAsOptions);
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
  optionsContainer.classList.add("bottom-navbar", "bottom-navbar-color", "bottom-navbar-container");

  var opitonSelect = document.createElement("div");
  var opitonBack = document.createElement("div");
  if(screenName === "setPhotoOptionsScreen"){
    opitonSelect.innerHTML = "Select";
  }
  else{
    opitonSelect.innerHTML = "Options";
  }
  opitonBack.innerHTML = "Back";

  optionsContainer.appendChild(opitonSelect);
  optionsContainer.appendChild(opitonBack);

  return optionsContainer;
}

function createOptionsContainer(){
  var container = document.createElement("div");
  container.classList.add("option-div");
  var optionsNode = createOptions();
  var setOptionsNode = createSetAsOptions();
  container.appendChild(optionsNode);
  container.appendChild(setOptionsNode);

  return container;
}

function createOptions(){
  var text = document.createElement("h3");
  text.classList.add("select-wallpaper-text");
  text.innerHTML = "Options";
  return text;
}

function createSetAsOptions(){
  var setAsOptionParentContainer = document.createElement("div");
  var setAsNode = createSetAsTextOptions();
  setAsOptionParentContainer.appendChild(setAsNode);
  return setAsOptionParentContainer;
}

function createSetAsTextOptions(){
  var setAsOptionContainer = document.createElement("div");
  setAsOptionContainer.classList.add("theme-container");

  var text1 = document.createElement("div");
  text1.id = "set-as-home";
  text1.innerHTML = "Set As Home Screen";
  text1.classList.add("theme");
  text1.classList.add("wallpaper-border");

  var text2 = document.createElement("div");
  text2.id = "set-as-lock";
  text2.innerHTML = "Set As Lock Screen";
  text2.classList.add("theme");

  setAsOptionContainer.appendChild(text1);
  setAsOptionContainer.appendChild(text2);
  return setAsOptionContainer;
}

function mountPhotoScreen(show) {
  var photoNode = document.getElementById("photos-screen");
  AddRemoveClassList(photoNode, "hide", !show);
}

function nextImage(photoSources, currentPhotoIndex, showPhotoOptions) {
  hidePhoto();
  currentPhotoIndex++;
  if(currentPhotoIndex === photoSources.length){
    currentPhotoIndex = 0;
  }
  showPhoto(photoSources, currentPhotoIndex, showPhotoOptions);
}

function previousImage(photoSources, currentPhotoIndex, showPhotoOptions) {
  hidePhoto();
  currentPhotoIndex--;
  if(currentPhotoIndex < 0){
    currentPhotoIndex = photoSources.length-1;
  }
  showPhoto(photoSources, currentPhotoIndex, showPhotoOptions);
}

