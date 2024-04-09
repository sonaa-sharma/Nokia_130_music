function setTime() {
  var time = new Date();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  var clockHour = document.getElementById("clock-hour");
  var clockMin = document.getElementById("clock-min");
  var clockYear = time.getFullYear();
  var clockMonth = time.getMonth() + 1;
  var clockDay = time.getDate();
  var currentYear = document.getElementById("year");
  var currentMonth = document.getElementById("month");
  var currentDay = document.getElementById("day");

  clockHour.innerHTML = getTwoDigitNumber(hour);
  clockMin.innerHTML = getTwoDigitNumber(minutes);
  currentYear.innerHTML = getTwoDigitNumber(clockYear);
  currentMonth.innerHTML = getTwoDigitNumber(clockMonth);
  currentDay.innerHTML = getTwoDigitNumber(clockDay);
}

// var currentMenuIndex = [0,0];
var currentMenuIndexX = 0
var currentMenuIndexY = 0

var  menuItemIds = [
  ['calls','contact', 'alarm'],
  ['fm', 'music', 'message'],
  ['calendar', 'torch', 'setting'],
]

function getTwoDigitNumber(number) {
  var twoDigitNumber = number;

  if (number < 10) {
    twoDigitNumber = "0" + number;
  }

  return twoDigitNumber;
}

// screen functions------

var screenName = "turnedOff";
var isSelectkeyPressed = false;
var clearGoBackId;

var keypadButton = document.getElementById("keypad-box");
keypadButton.addEventListener("click", clickEventFunction);

function clickEventFunction(event) {
  var targetNode = event.target;
  var button = getButtonNode(targetNode);

  if (!button || !isDeviceOn) {
    return;
  }

  buttonClicked(button);
}

function buttonClicked(button) {
  switch (screenName) {
    case "lockScreen":
      lockScreenHandler(button);
      break;
    case "idleScreen":
      idleScreenHandler(button);
      break;
    case "appScreen":
      appScreenHandler(button);
      break;
  }
}

function lockScreenHandler(button) {
  switch (button.id) {
    case "left-select-button":
      selectButtonPressed(button);
      break;
    case "star-key":
      starKeyPressed(button);
      break;
    default:
      clearTimeout(clearGoBackId);
      goBacktoLockScreen();
      break;
  }
}

function idleScreenHandler(button) {
  clearTimeout(switchToLockScreenTimer);
  switch (button.id) {
    case "left-select-button":
      hideIdleScreen();
      showMenu(false);
      break;
      default:
        switchToLockScreenTimer = setTimeout(lockTimer, 3000);
      break;
  }
}

function appScreenHandler(button) {
  var nextAppIndex;

  switch (button.id) {
    case "left-select-button":
      break;
    case "right-select-button":
      var currentAppId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
      var currentApp = document.getElementById(currentAppId);
      
      AddRemoveClassList(currentApp, "selected", false);
      goToBackScreen();

      break;
    case "mid-button-inner":
      break;
    case "top-button":
      nextAppIndex = goUp(menuItemIds, currentMenuIndexX, currentMenuIndexY);

      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;
    case "left-button":
      nextAppIndex = goLeft(menuItemIds, currentMenuIndexX, currentMenuIndexY);

      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;
    case "right-button":
      nextAppIndex = goRight(menuItemIds, currentMenuIndexX, currentMenuIndexY);

      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;
    case "bottom-button":
      nextAppIndex = goDown(menuItemIds, currentMenuIndexX, currentMenuIndexY);

      menuScrolling(nextAppIndex[0], nextAppIndex[1]);
      break;
    default:
      break;
  }
}


function menuScrolling(nextMenuIndexX, nextMenuIndexY){
  var itemId = menuItemIds[nextMenuIndexX][nextMenuIndexY];
  var nextApp = document.getElementById(itemId);
  AddRemoveClassList(nextApp, "selected");
  var currentId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var currentApp = document.getElementById(currentId);
  AddRemoveClassList(currentApp, "selected", false);
  currentMenuIndexX =  nextMenuIndexX;
  currentMenuIndexY = nextMenuIndexY;

}

function goRight(menuItemIds, x, y){
  var nextIndexX = x;
  var nextIndexY = y+1;

  if(nextIndexY === menuItemIds[x].length){
    nextIndexX++;
    nextIndexY = 0;
  }

  if(nextIndexX === menuItemIds.length){
    nextIndexX = 0;
  }

  return [nextIndexX,nextIndexY]

}

function goLeft(menuItemIds, x, y){
  var backIndexX = x; 
  var backIndexY = y-1; 
  
  if(backIndexY<0){
    backIndexY = menuItemIds[x].length-1 ;
    backIndexX--;
  }

  if(backIndexX<0){
    backIndexX = menuItemIds.length-1;
  }
  
  return [backIndexX,backIndexY]

}

function goUp(menuItemIds, x, y){
  var backIndexX = x-1;
  var backIndexY = y;

  if(backIndexX<0){
    backIndexX = menuItemIds.length-1;
    backIndexY--;
  }
  
  if(backIndexY<0){
    backIndexY = menuItemIds[x].length-1 ;
  }
  
  return [backIndexX,backIndexY]

}

function goDown(menuItemIds, x, y){
  var nextIndexX = x+1;
  var nextIndexY = y;

  if(nextIndexX === menuItemIds.length){
    nextIndexX = 0;
    nextIndexY++;
  }
  
  if(nextIndexY === menuItemIds[x].length){
    nextIndexY = 0;
  }

  return [nextIndexX,nextIndexY]

}

var switchToLockScreenTimer ;

function showIdleScreen() {
  displayWallPaper();
  displayLockScreen(false);
  displayNavbar(false);
  displayDate();
  displayMenuText(false);
  displayDateTimeContainer(false);
  lockScreenTimeoutId = setInterval(setTime, 1000);

  switchToLockScreenTimer = setTimeout(lockTimer, 3000);

  screenName = "idleScreen";
}  

function lockTimer(){
  hideIdleScreen();
  showLockScreen();

}  

function hideIdleScreen() {
  displayLockScreen();
  displayWallPaper(false);
  displayNavbar();
  displayDate(false);
  displayMenuText();
  displayDateTimeContainer();
  clearInterval(lockScreenTimeoutId);
}  

function selectButtonPressed() {
  isSelectkeyPressed = true;
  showUnlockMessage();
}  

function starKeyPressed(button) {
  if (!isSelectkeyPressed) {
    return;
  }  

  clearTimeout(clearGoBackId);
  hideUnlockMessage();
  hideLockScreen();
  showIdleScreen();
}  

function showMenu() {
  displayNavbar(false);
  displayAppScreen(false);
  displaySelectText(false);
  displayBackText(false);
  displayAppScreenContainer(false);
  currentMenuIndexX = 0;
  currentMenuIndexY = 0;
  var itemId = menuItemIds[currentMenuIndexX][currentMenuIndexY];
  var firstApp = document.getElementById(itemId);


  AddRemoveClassList(firstApp, "selected");

  screenName = "appScreen";
}  

function goToBackScreen() {
  hideMenuScreen();
  showIdleScreen();
}

function hideMenuScreen() {
  displayAppScreen(false);
  displayNavbar();
  displayAppScreen();
  displaySelectText();
  displayBackText();
  displayAppScreenContainer();
}

function displayAppScreen(show) {
  var apps = document.getElementById("apps-div");
  AddRemoveClassList(apps, "hide", show);
}

function BackToLockScreen() {
  displayDateTimeContainer(false);
  displayUnlockWithoutSpace(false);
}

function showUnlockMessage() {
  displayUnlockMessage(false);
  displayUnlock();
  clearGoBackId = setTimeout(goBacktoLockScreen, 2000);
}

function hideUnlockMessage() {
  displayUnlockMessage();
  displayUnlock();
}

function goBacktoLockScreen() {
  displayUnlockMessage();
  displayUnlock(false);

  isSelectkeyPressed = false;
}

function displayDate(show) {
  var date = document.getElementById("date");
  AddRemoveClassList(date, "hide", show);
}

function displayTime(show) {
  var time = document.getElementById("time");
  AddRemoveClassList(time, "hide", show);
}

function displayBackText(show) {
  var backText = document.getElementById("back");
  AddRemoveClassList(backText, "hide", show);
}

function displayMenuText(show) {
  var menuText = document.getElementById("menu");
  AddRemoveClassList(menuText, "hide", show);
}

function displaySelectText(show) {
  var selectText = document.getElementById("select");
  AddRemoveClassList(selectText, "hide", show);
}

function displayDateTime(show) {
  displayDate(show);
  displayTime(show);
}

function displayDateTimeContainer(show) {
  var newScreen = document.getElementById("date-time-div");
  AddRemoveClassList(newScreen, "hide", show);
}

function displayUnlockMessage(show) {
  var message = document.getElementById("unlockMessage");
  AddRemoveClassList(message, "hide", show);
}

function displayUnlock(show) {
  var unlockText = document.getElementById("unlock");
  AddRemoveClassList(unlockText, "hide-taking-space", show);
}

function displayUnlockWithoutSpace(show) {
  var unlockText = document.getElementById("unlock");
  AddRemoveClassList(unlockText, "hide", show);
}

function displayAppScreenContainer(show) {
  var apps = document.getElementById("app-screen-container");
  AddRemoveClassList(apps, "hide", show);
}

function getButtonNode(node) {
  var dataName = node.dataset.name;

  while (dataName !== "buttons" && dataName !== "keypad-container") {
    var newNode = node.parentNode;
    dataName = newNode.dataset.name;
    node = newNode;
  }

  if (dataName === "keypad-container") {
    return null;
  }

  return node;
}

// power button usecases------------

var powerButton = document.getElementById("power-button");
var timeoutId;
var isDeviceOn = true;
var brandAnimation = document.getElementById("brand-animation");
brandAnimation.addEventListener("ended", onBrandAnimationFinish);

function setInitialState() {
  var deviceOn = localStorage.getItem("deviceOn");
  if (deviceOn === "true") {
    showLockScreen();
    isDeviceOn = true;
  }
}

function showBrandAnimation() {
  displayWhiteScreen();
  displayBrandAnimation(false);
  brandAnimation.play();
}

function displayBrandAnimation(show) {
  var animationContainer = document.getElementById("brand-animation-screen");
  AddRemoveClassList(animationContainer, "hide", show);
}
var lockScreenTimeoutId;

function showLockScreen() {
  displayUnlock(false);
  displayDateTimeContainer(false);
  displayWallPaper();
  displayNavbar(false);
  displayLockScreen(false);
  setTime();
  isSelectkeyPressed = false;
  lockScreenTimeoutId = setInterval(setTime, 1000);
  screenName = "lockScreen";
}

function hideLockScreen() {
  displayWallPaper(false);
  displayNavbar();
  displayLockScreen();
  displayDateTimeContainer();
  clearInterval(lockScreenTimeoutId);
}

function getNavbar() {
  return document.getElementById("navbar");
}

function displayNavbar(show) {
  var navbar = getNavbar();
  AddRemoveClassList(navbar, "hide", show);
}

function displayLockScreen(show) {
  var lockScreen = document.getElementById("lock-screen-div");
  AddRemoveClassList(lockScreen, "hide", show);
}

function displayWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-on", show);
}

function displayWhiteScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-white", show);
}

function displayBlackScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, "lcd-off", show);
}

function AddRemoveClassList(node, className, show) {
  if (show === false) {
    node.classList.remove(className);
  } else {
    node.classList.add(className);
  }
}

function onBrandAnimationFinish() {
  displayBrandAnimation();
  displayWhiteScreen(false);
  showLockScreen();
  localStorage.setItem("deviceOn", true);
}

function handlePowerOn() {
  if (isDeviceOn) {
    turnOfflcd();
  } else {
    turnOnlcd();
  }
  isDeviceOn = !isDeviceOn;
}

function startPoweringOn(event) {
  timeoutId = setTimeout(handlePowerOn, 2000);
}

function stopPoweringOn(event) {
  clearTimeout(timeoutId);
}
function getLcd() {
  return document.getElementById("lcd");
}

function turnOnlcd() {
  displayBlackScreen(false);
  showBrandAnimation();
}

function turnOfflcd() {
  switch (screenName) {
    case "lockScreen":
      hideLockScreen();

    default:
      break;
  }
  displayBlackScreen();

  localStorage.setItem("deviceOn", false);
}

powerButton.addEventListener("mousedown", startPoweringOn);
powerButton.addEventListener("mouseup", stopPoweringOn);
powerButton.addEventListener("mouseleave", stopPoweringOn);
powerButton.addEventListener("touchstart", startPoweringOn);
powerButton.addEventListener("touchend", stopPoweringOn);
powerButton.addEventListener("touchcancel", stopPoweringOn);

setInitialState();
