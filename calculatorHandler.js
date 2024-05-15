var calculatorHandlerConfig = null;

function getInitialCalculatorConfig() {
  return { firstParam: 0, secondParam: 0 };
}

function calculatorHandler(button) {
  switch (button.id) {
    case "left-select-button":
      break;

    case "mid-button-inner":
      showEqualOperatorSign();
      // calculateResult();
      break;

    case "right-select-button":
      unmountCalculator();
      showMenu();
      break;

    case "power-button":
      unmountCalculator();
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
      updateAndShowFirstParam(0);
      break;
    case "1":
      updateAndShowFirstParam(1);
      break;
    case "2":
      updateAndShowFirstParam(2);
      break;
    case "3":
      updateAndShowFirstParam(3);
      break;
    case "4":
      updateAndShowFirstParam(4);
      break;
    case "5":
      updateAndShowFirstParam(5);
      break;
    case "6":
      updateAndShowFirstParam(6);
      break;
    case "7":
      updateAndShowFirstParam(7);
      break;
    case "8":
      updateAndShowFirstParam(8);
      break;
    case "9":
      updateAndShowFirstParam(9);
      break;

    default:
      break;
  }
}

function mountCalculator() {
  calculatorHandlerConfig = getInitialCalculatorConfig();
  mountCalculatorScreen(true);
  mountNavbar(true);
  updateFirstParamInDocument(0);
  screenName = "calculatorScreen";
}

function unmountCalculator() {
  mountCalculatorScreen(false);
  mountNavbar(false);
  calculatorHandlerConfig = null;
}

function mountCalculatorScreen(show) {
  var calculator = document.getElementById("calculator-screen-id");
  AddRemoveClassList(calculator, "hide", !show);
}

function updateFirstParam(input) {
  if (calculatorHandlerConfig.firstParam > 9999999999) {
    return calculatorHandlerConfig.firstParam;
  }
  return (calculatorHandlerConfig.firstParam =
    calculatorHandlerConfig.firstParam * 10 + input);
}

function updateAndShowFirstParam(input) {
  var number = updateFirstParam(input);
  updateFirstParamInDocument(number);
}

function updateFirstParamInDocument(number) {
  var box = document.getElementById("first-inputId");
  box.innerHTML = number;
}

function highlightOperator(operatorSignId) {
  var box = document.getElementById(operatorSignId);
  box.style.backgroundColor = "orange";
}

function removeHighlightedOperator(operatorSignId) {
  var box = document.getElementById(operatorSignId);
  box.style.backgroundColor = "none";
}

function calculateResult() {}
