var powerButton = document.getElementById("power-button");

var timeoutId;
var isDeviceOn = false


function handlePowerOn() {
    if(isDeviceOn){
        turnOfflcd();
    }
    else{
        turnOnlcd();
    }

    isDeviceOn = !isDeviceOn
}

function startPoweringOn(event) {
  timeoutId = setTimeout(handlePowerOn, 2000);
}

function stopPoweringOn(event) {
  clearTimeout(timeoutId);
}
function getLcd(){
    return document.getElementById("lcd");
}

function turnOnlcd(){
     var lcd = getLcd();
    if(lcd.classList.contains("lcd-off")){
        lcd.classList.remove('lcd-off');
    }
    
    lcd.classList.add("lcd-white");
    
}

function turnOfflcd(){
    var lcd = getLcd();
    if(lcd.classList.contains("lcd-white")){
        lcd.classList.remove('lcd-white');
    }
        lcd.classList.add("lcd-off");

}

powerButton.addEventListener("mousedown", startPoweringOn);
powerButton.addEventListener("mouseup", stopPoweringOn);
powerButton.addEventListener("mouseleave", stopPoweringOn);
powerButton.addEventListener("touchstart", startPoweringOn);
powerButton.addEventListener("touchend", stopPoweringOn);
powerButton.addEventListener("touchcancel", stopPoweringOn);
