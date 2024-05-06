var selectOptionId = [
  "set-as-lock",
  "set-as-home",
];

index = 0;
currentOptionId = selectOptionId[index];
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
    case "bottom-button":
console.log(currentOptionId);

      removeBorder();
console.log(currentOptionId);

      setBorder();
      break;
    case "top-button":
console.log(currentOptionId);

      removeBorder();
console.log(currentOptionId);
      
      setBorder();
      break;
    default:
      break;
  }
}

function selectUpOption(){
  if(index < 0){
    index = selectOptionId.length-1
  }
  index--;
  return index;
}

function selectDownOption(){
  if(index === selectOptionId.length){
    index = 0
  }
  index++;
  return index;
}

function setBorder() {
  var option = document.getElementById(currentOptionId);
  AddRemoveClassList(option, "wallpaper-border", true);
}

function removeBorder() {
  var option = document.getElementById(currentOptionId);
  AddRemoveClassList(option, "wallpaper-border", false);
}