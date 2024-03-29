function setTime(){
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

function getTwoDigitNumber(number){
  var twoDigitNumber = number;
  
  if(number<10){
    twoDigitNumber = '0'+number;
  }

  return twoDigitNumber;
}

var keypadButton = document.getElementById("keypad-box");
keypadButton.addEventListener("click", clickEventFunction);

function clickEventFunction(event){
  var targetNode = event.target;
  var button = getButtonNode(targetNode);
  if(!button){
    return;
  }
  buttonClicked(button);
}

function buttonClicked(button){
  console.log(button.id);
  // switch(button.id) {
  //   case 'left-select-button':
  //     // displayUnlockMessage();
  //     unlockScreenWithStar(button);
  //     break;
  //   case 'star-key':
  //     // break;
  //   default:
  //     // code block
  // }

}


// function unlockScreenWithStar(button){
//   if(button.id === 'left-select-button'){
//     displayUnlockMessage(false);
//     displayUnlock();
//     var showMessageTimeoutId = setTimeout(displayUnlockMessage, 2000)
//   }
//   else if(button.id === 'star-key'){
//     displayDateTime();
//   }
//   else{
//     displayUnlockMessage();
//   }

// }

// function displayUnlockMessage(show){
//   var message = document.getElementById("unlockMessage");
//   AddRemoveClassList(message, 'hide', show);
// }


// function displayUnlock(show){
//   var unlockText = document.getElementById("unlock");
//   AddRemoveClassList(unlockText, 'hide-taking-space', show);
// }

// function displayDateTime(show){
//   var message = document.getElementById("lock-screen-div");
//   AddRemoveClassList(message, 'hide', show);
// }

function getButtonNode(node){
  var dataName = node.dataset.name;

  while(dataName !== 'buttons' && dataName !== 'keypad-container'){
    var newNode = node.parentNode;
    dataName = newNode.dataset.name;
    node = newNode;
  }

  if(dataName === 'keypad-container'){
    return null;
  }

  return node;
}

var powerButton = document.getElementById("power-button");
var timeoutId;
var lockScreenTimeoutId;
var unlockTimeoutId;
var isDeviceOn = false;
var brandAnimation = document.getElementById("brand-animation");
brandAnimation.addEventListener("ended", onBrandAnimationFinish);

function setInitialState(){
  var deviceOn = localStorage.getItem("deviceOn");
  if(deviceOn === 'true'){
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
  AddRemoveClassList(animationContainer, 'hide', show);
}

function showLockScreen() {
  displayWallPaper();
  displayNavbar(false);
  displayLockScreen(false);
  setTime()
  lockScreenTimeoutId = setInterval(setTime, 1000);
}

function hideLockScreen(){
  displayWallPaper(false);
  displayNavbar();
  displayLockScreen();
  displayUnlockMessage(false);
  clearInterval(lockScreenTimeoutId);
}

function getNavbar() {
  return document.getElementById("navbar");
}
function displayNavbar(show) {
  var navbar = getNavbar();
  AddRemoveClassList(navbar, 'hide', show);
}

function displayLockScreen(show) {
  var lockScreen = document.getElementById("lock-screen-div");
  AddRemoveClassList(lockScreen, 'hide', show);
}

function displayWallPaper(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, 'lcd-on', show);
}

function displayWhiteScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, 'lcd-white', show);
}

function displayBlackScreen(show) {
  var lcd = getLcd();
  AddRemoveClassList(lcd, 'lcd-off', show);
}

function AddRemoveClassList(node, className, show){
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
  localStorage.setItem("deviceOn", true)
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
  hideLockScreen();
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