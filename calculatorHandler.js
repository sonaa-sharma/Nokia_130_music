var calculatorHandlerConfig = {}

function getInitialConfig(){
  var 
}

function calculatorHandler(button) {
  switch (button.id) {
    case "left-select-button":
      break;

    case "mid-button-inner":
      showEqualOperatorSign();
      calculateResult();
      break;

    case "right-select-button":
      hideCalculator();
      showMenu();
      break;

    case "power-button":
      hideCalculator();
      showIdleScreen();
      break;

    case "top-button":
      highlightOperator("add-signId");
      break;

    case "left-button":
      highlightOperator("mul-signId");
      break;

    case "right-button":
      highlightOperator("div-signId");
      break;

    case "bottom-button":
      highlightOperator("sub-signId");
      break;

    case "0":
      showInput(0);
      break;
    case "1":
      showInput(1);
      break;
    case "2":
      showInput(2);
      break;
    case "3":
      showInput(3);
      break;
    case "4":
      showInput(4);
      break;
    case "5":
      showInput(5);
      break;
    case "6":
      showInput(6);
      break;
    case "7":
      showInput(7);
      break;
    case "8":
      showInput(8);
      break;
    case "9":
      showInput(9);
      break;

    default:
      break;
  }
}

function showCalculator() {
  mountCalculatorScreen(true);
  mountNavbar(true);

  screenName = "calculatorScreen";
}

function hideCalculator() {
  mountCalculatorScreen(false);
  mountNavbar(false);
  clearInput();
}

function mountCalculatorScreen(show) {
  var calculator = document.getElementById("calculator-screen-id");
  AddRemoveClassList(calculator, "hide", !show);
}

var firstParam = 0;

function getFirstParam(input){
  firstParam = firstParam * 10 + input;

  return firstParam;
}

function showInput(input) {
  var number = getFirstParam(input);

  box = document.getElementById("first-inputId");
  if (number > 9999999999) {
    return;
  }

  box.innerHTML = number;
}

function clearInput() {
  var box = document.getElementById("first-inputId");
  box.innerHTML = "";
}

function highlightOperator(operatorSignId) {
  clearInput();
  var box = document.getElementById(operatorSignId);
  box.style.backgroundColor = "orange";
}

function calculateResult() {}
