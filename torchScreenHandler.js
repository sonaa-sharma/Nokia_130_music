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
      mountMenu();
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

function turnOnTorch() {
  changeBackgroundColor(true);
  var text = document.getElementById("text-content");
  text.innerHTML = "Turn off";
  torchFlag = 1;
}

function turnOffTorch() {
  changeBackgroundColor(false);
  var text = document.getElementById("text-content");
  text.innerHTML = "Turn on";
  torchFlag = 0;
}

function changeBackgroundColor(change){
  var torchScreen = document.getElementById("torch-screen-containerId");
  AddRemoveClassList(torchScreen, "white-background", change);
  AddRemoveClassList(torchScreen, "torch-background", !change);
}