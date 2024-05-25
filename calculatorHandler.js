var calculatorHandlerConfig = null;

const operators = {
  add: "+",
  multiply: "*",
  divide: "/",
  subtract: "-",
};

function getInitialCalculatorConfig() {
  return {
    maxValue: 9999999999,
    firstParam: 0,
    secondParam: 0,
    selectedOperator: null,
    operatorIds: {
      [operators.add]: "add-signId",
      [operators.multiply]: "mul-signId",
      [operators.divide]: "div-signId",
      [operators.subtract]: "sub-signId",
    },
  };
}

function calculatorHandler(button) {
  switch (button.id) {
    case "left-select-button":
      showResult();
      break;
    case "right-select-button":
      unmountCalculator();
      mountMenu();
      break;
    case "power-button":
      unmountCalculator();
      showIdleScreen();
      break;
    case "top-button":
      selectOperator(operators.add);
      break;
    case "left-button":
      selectOperator(operators.multiply);
      break;
    case "right-button":
      selectOperator(operators.divide);
      break;
    case "bottom-button":
      selectOperator(operators.subtract);
      break;
    case "value-0":
      updateParam(0);
      break;
    case "value-1":
      updateParam(1);
      break;
    case "value-2":
      updateParam(2);
      break;
    case "value-3":
      updateParam(3);
      break;
    case "value-4":
      updateParam(4);
      break;
    case "value-5":
      updateParam(5);
      break;
    case "value-6":
      updateParam(6);
      break;
    case "value-7":
      updateParam(7);
      break;
    case "value-8":
      updateParam(8);
      break;
    case "value-9":
      updateParam(9);
      break;
    default:
      break;
  }
}

function mountCalculator() {
  calculatorHandlerConfig = getInitialCalculatorConfig();
  mountCalculatorScreen(true);
  mountNavbar(true);
  updateParamInDocument(0);
  screenName = "calculatorScreen";
}

function unmountCalculator() {
  mountCalculatorScreen(false);
  mountNavbar(false);
  var operator = calculatorHandlerConfig.selectedOperator;
  if (operator) {
    var operatorId = calculatorHandlerConfig.operatorIds[operator];
    highlightOperator(operatorId, false);
  }
  calculatorHandlerConfig = null;
}

function mountCalculatorScreen(show) {
  var calculator = document.getElementById("calculator-screen-id");
  AddRemoveClassList(calculator, "hide", !show);
}

function updateParam(number) {
  var currentOperator = calculatorHandlerConfig.selectedOperator;
  if (currentOperator) {
    var currentId = calculatorHandlerConfig.operatorIds[currentOperator];
    highlightOperator(currentId, false);
    updateAndShowSecondParam(number);
    return;
  }

  updateAndShowFirstParam(number);
}

function updateFirstParam(input) {
  return (calculatorHandlerConfig.firstParam = addDigitToNumber(
    input,
    calculatorHandlerConfig.firstParam
  ));
}

function updateAndShowFirstParam(input) {
  var number = updateFirstParam(input);
  updateParamInDocument(number);
}

function updateParamInDocument(number) {
  var box = document.getElementById("first-inputId");
  box.innerHTML = number;
}

function updateAndShowSecondParam(input) {
  var number = updateSecondParam(input);
  updateParamInDocument(number);
}

function updateSecondParam(input) {
  return (calculatorHandlerConfig.secondParam = addDigitToNumber(
    input,
    calculatorHandlerConfig.secondParam
  ));
}

function addDigitToNumber(digit, number) {
  if (number > calculatorHandlerConfig.maxValue) {
    return number;
  }
  return number * 10 + digit;
}

function highlightOperator(operatorSignId, show) {
  var box = document.getElementById(operatorSignId);
  AddRemoveClassList(box, "highlight-operator-box", show);
}

function updateValueAfterSelectingOperator() {
  calculateResult();
  calculatorHandlerConfig.secondParam = 0;
}

function selectOperator(operator) {
  var currentOperator = calculatorHandlerConfig.selectedOperator;
  if (currentOperator) {
    var currentId = calculatorHandlerConfig.operatorIds[currentOperator];
    updateValueAfterSelectingOperator();
    highlightOperator(currentId, false);
  }

  var nextId = calculatorHandlerConfig.operatorIds[operator];
  calculatorHandlerConfig.selectedOperator = operator;
  highlightOperator(nextId, true);
}

function calculateResult() {
  var selectOperator = calculatorHandlerConfig.selectedOperator;
  if (!selectOperator) {
    return;
  }
  var firstParam = calculatorHandlerConfig.firstParam;
  var secondParam = calculatorHandlerConfig.secondParam;
  var result;
  switch (selectOperator) {
    case operators.add:
      result = firstParam + secondParam;
      break;
    case operators.multiply:
      result = firstParam * secondParam;
      break;
    case operators.divide:
      result = firstParam / secondParam;
      break;
    case operators.subtract:
      result = firstParam - secondParam;
      break;
    default:
      break;
  }

  calculatorHandlerConfig.firstParam = result;
  return result;
}

function resetValuesToInitial() {
  calculatorHandlerConfig.secondParam = 0;
  calculatorHandlerConfig.selectedOperator = null;
}

function showResult(){
  var result = calculateResult();
  updateParamInDocument(result);
  resetValuesToInitial();
}