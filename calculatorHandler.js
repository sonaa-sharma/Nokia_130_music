

function calculatorHandler(button) {
  switch (button.id) {
    case "left-select-button":
    
      break;

    case "mid-button-inner":
     
      break;

    case "right-select-button":
      hideCalculator();
      showMenu();
      break;

    case "power-button":
      hideCalculator();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function showCalculator() {
  mountCalculatorScreen(true);

  screenName = "calculatorScreen";
}

function hideCalculator() {
  mountCalculatorScreen(false);
}

function mountCalculatorScreen(show) {
  var calculator = document.getElementById("calculator-screen-id");
  AddRemoveClassList(calculator, "hide", !show);
}


function addToInput(value) {
  document.getElementById('result').innerHTML += value;
}

function clearInput() {
  document.getElementById('result').innerHTML = '';
}

function calculate() {
  var result = eval(document.getElementById('result').innerHTML);
  document.getElementById('result').innerHTML = result;
}
