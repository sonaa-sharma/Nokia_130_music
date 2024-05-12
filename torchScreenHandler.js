torchFlag = 0;

function torchScreenHandler(button) {
  switch (button.id) {
    case "mid-button-inner":
      if (torchFlag === 1) {
        turnOffTorch();
      } else {
        turnOnTorch();
      }
      break;

    case "right-select-button":
      hideTorchScreen();
      showMenu();
      break;

    case "power-button":
      hideTorchScreen();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function showTorchScreen() {
  mountTorchScreen(true);
  screenName = "torchScreen";
}

function hideTorchScreen() {
  mountTorchScreen(false);
}

function mountTorchScreen(show) {
  var torchScreen = document.getElementById("torch-screen-containerId");
  AddRemoveClassList(torchScreen, "hide", !show);
}

function turnOnTorch(){
  var torchScreen = document.getElementById("torch-screen-containerId");
  torchScreen.style.backgroundColor = "white";
  var text = document.getElementById("text-content");
  text.innerHTML = "Turn off";
  torchFlag = 1;
}

function turnOffTorch() {
  var torchScreen = document.getElementById("torch-screen-containerId");
  torchScreen.style.backgroundColor = "rgb(22, 21, 21)";
  var text = document.getElementById("text-content");
  text.innerHTML = "Turn on";
  torchFlag = 0;
}
