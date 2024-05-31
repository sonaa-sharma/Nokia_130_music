var selectOptionList = ["set-as-home", "set-as-lock"];

var currentOptionIndex = 0;
var currentOptionId = selectOptionList[currentOptionIndex];

function setPhotoOptionsHandler(button) {
  var currentOptionId = selectOptionList[currentOptionIndex];

  switch (button.id) {
    case "power-button":
      hidePhoto();
      mountGalleryScreen(true, _currentPhotoIndex);
      break;
    case "left-select-button":
      switch (currentOptionId) {
        case "set-as-home":
          setImageAsWallpaper("home");
          hidePhoto();
          mountMenu();
          break;
        case "set-as-lock":
          setImageAsWallpaper("lock");
          hidePhoto();
          mountMenu();
          break;
        default:
          break;
      }
      break;
    case "right-select-button":
      hidePhoto();
      showPhoto(_photoSources, _currentPhotoIndex, !_showPhotoOptions);
      break;
    case "top-button":
      var nextOptionIndex = goUpButton(selectOptionList, currentOptionIndex);
      setPhotoOptionsBorder(selectOptionList, nextOptionIndex);
      break;
    case "bottom-button":
      var nextOptionIndex = goDownButton(selectOptionList, currentOptionIndex);
      setPhotoOptionsBorder(selectOptionList, nextOptionIndex);
      break;
    default:
      break;
  }
}

function setPhotoOptionsBorder(selectOptionList, nextOptionIndex) {
  var currentOptionId = selectOptionList[currentOptionIndex];
  var nextOptionId = selectOptionList[nextOptionIndex];
  var currentBox = document.getElementById(currentOptionId);
  var nextBox = document.getElementById(nextOptionId);

  AddRemoveClassList(currentBox, "wallpaper-border", false);
  AddRemoveClassList(nextBox, "wallpaper-border", true);

  currentOptionIndex = nextOptionIndex;
}

function setImageAsWallpaper(screen) {
  var imageNode = _photoSources[_currentPhotoIndex];
  if(screen === "home"){
    homeScreenWallpaperClassName = "url" + "(" + imageNode + ")";
  }
  else if(screen === "lock"){
    lockScreenWallpaperClassName = "url" + "(" + imageNode + ")";
  }
}
