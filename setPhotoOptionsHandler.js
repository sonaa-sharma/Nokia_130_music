var selectOptionList = ["set-as-lock", "set-as-home"];

var currentOptionIndex = 0;
var currentOptionId = selectOptionList[currentOptionIndex];
console.log(currentOptionId);

function setPhotoOptionsHandler(button) {
  switch (button.id) {
    case "power-button":
      hidePhoto();
      mountGalleryScreen(true, _currentPhotoIndex);
      break;
    case "left-select-button":
      hidePhoto();
      showPhoto(_photoSources, _currentPhotoIndex, _showPhotoOptions);
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
