function setPhotoOptionsHandler(button) {
  switch (button.id) {
    case "power-button":
      hidePhoto();
      mountGalleryScreen(true, _currentPhotoIndex);
      break;
    case "left-select-button":
      hidePhoto();
      showPhoto(_photoSources, _currentPhotoIndex, _showOptions);
      break;
    case "right-select-button":
      hidePhoto();
      showPhoto(_photoSources, _currentPhotoIndex, !_showOptions);
      break;
    case "bottom-button":
    case "right-button":
    //   nextImage(_photoSources, _currentPhotoIndex, showOptions);
      break;
    case "left-button":
    case "top-button":
    //   previousImage(_photoSources, _currentPhotoIndex, showOptions);
      break;
    default:
      break;
  }
}
