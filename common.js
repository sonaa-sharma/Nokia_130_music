function AddRemoveClassList(node, className, show) {
  if (show === true) {
    node.classList.add(className);
  } 
  else if(show === false) {
    node.classList.remove(className);
  }
  else{
    throw new Error("Invalid argument");
  }
}

var homeScreenWallpaperClassName = 'url("wallpaper/grass.jpg")';

function mountIdleScreenWallPaper() {
  setWallPaper(homeScreenWallpaperClassName);
}

function setWallPaper(imageUrl) {
  var lcd = getLcd();
  lcd.style.background = "top / cover " + imageUrl;
}

function mountNavbar(show) {
  var navbar = document.getElementById("navbar");
  AddRemoveClassList(navbar, "hide", !show);
}

function getTwoDigitNumber(number) {
  var twoDigitNumber = number;

  if (number < 10) {
    twoDigitNumber = "0" + number;
  }

  return twoDigitNumber;
}

function setTime(hourId, minId) {
  var time = new Date();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  
  var clockHour = document.getElementById(hourId);
  var clockMin = document.getElementById(minId);

  clockHour.innerHTML = getTwoDigitNumber(hour);
  clockMin.innerHTML = getTwoDigitNumber(minutes);
}


function goRight(menuItemsLength, currentPosition, rotation_allowed) {
  var nextPosition = currentPosition + 1;

  if (nextPosition === menuItemsLength && rotation_allowed === true) {
    nextPosition = 0;
  }

  if (nextPosition === menuItemsLength && rotation_allowed === false) {
    return currentPosition;
  }

  return nextPosition;
}

function goLeft(menuItemsLength, currentPosition, rotation_allowed) {
  var nextPosition = currentPosition - 1;

  if (nextPosition < 0 && rotation_allowed === true) {
    nextPosition = menuItemsLength - 1;
  }

  if (nextPosition < 0 && rotation_allowed === false) {
    return currentPosition;
  }

  return nextPosition;
}

function goUp(menuItemsLength, currentPosition, widthSize, rotation_allowed) {
  var nextPosition = currentPosition - widthSize;

  if (nextPosition < 0 && rotation_allowed === false) {
    return currentPosition;
  }

  if(menuItemsLength === 1){
    return 0;
  }

  var gridSizeSmaller = getGridSizeSmaller(menuItemsLength, widthSize);

  if (nextPosition < 0 && gridSizeSmaller > menuItemsLength) {
    nextPosition = nextPosition + gridSizeSmaller - 1;
    if (nextPosition >= menuItemsLength) {
      return nextPosition - widthSize;
    }
    if(nextPosition<0){
      nextPosition = nextPosition + gridSizeSmaller - 1;
      return nextPosition;
    }
  }

  if (nextPosition < 0 && gridSizeSmaller === menuItemsLength) {
    nextPosition = nextPosition + gridSizeSmaller - 1;

  }

  if (currentPosition === 0 && rotation_allowed === true && gridSizeSmaller === menuItemsLength) {
    nextPosition = menuItemsLength - 1;

    return nextPosition;
  }

  return nextPosition;
}

function goDown(menuItemsLength, currentPosition, widthSize, rotation_allowed) {
  var nextPosition = currentPosition + widthSize;

  if (nextPosition >= menuItemsLength && rotation_allowed === false) {
    return currentPosition;
  }

  if (nextPosition < menuItemsLength) {
    return nextPosition;
  }

  var gridSize = getGridSize(menuItemsLength, widthSize, currentPosition);

  if (currentPosition === gridSize - 1 && rotation_allowed === true) {
    return 0;
  }

  nextPosition = nextPosition - gridSize + 1;

  if (nextPosition >= menuItemsLength && rotation_allowed === true) {
    return 0;
  }

  return nextPosition;
}

function getGridSize(menuItemsLength, widthSize, currentPosition) {
  var lines = Math.ceil(menuItemsLength / widthSize);
  var gridSize = lines * widthSize;
  var smallerGridSize = gridSize - widthSize;

  if (currentPosition < smallerGridSize) {
    return smallerGridSize;
  }

  return gridSize;
}

function getGridSizeSmaller(menuItemsLength, widthSize) {
  var lines = Math.ceil(menuItemsLength / widthSize);
  var gridSize = lines * widthSize;
  return gridSize;
}
