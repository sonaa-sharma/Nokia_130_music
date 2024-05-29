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
    result: 0,
    clearDisplay: 0,
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
      if(calculatorHandlerConfig.clearDisplay === 1){
        clearDisplay();
      }
      else{
        unmountCalculator();
        mountMenu();
      }
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
  if (calculatorHandlerConfig.selectedOperator) {
    var operatorId = calculatorHandlerConfig.operatorIds[calculatorHandlerConfig.selectedOperator];
    highlightOperator(operatorId, false);
  }
  calculatorHandlerConfig = null;
}

function showClearDisplayOption(){
  calculatorHandlerConfig.clearDisplay = 1;
  var clearButton = document.getElementById("clear-back-button");
  clearButton.innerHTML = "Clear";
}

function showBackOption(){
  calculatorHandlerConfig.clearDisplay = 0;
  var clearButton = document.getElementById("clear-back-button");
  clearButton.innerHTML = "Back";
}

function clearDisplay(){
  if (calculatorHandlerConfig.selectedOperator) {
    console.log(calculatorHandlerConfig.selectedOperator);
    var operatorId = calculatorHandlerConfig.operatorIds[calculatorHandlerConfig.selectedOperator];
    highlightOperator(operatorId, false);
  }
  calculatorHandlerConfig.firstParam = 0;
  calculatorHandlerConfig.secondParam = 0;
  calculatorHandlerConfig.result = 0;
  calculatorHandlerConfig.selectedOperator = null;
  updateParamInDocument(0);
  showBackOption();
}

function mountCalculatorScreen(show) {
  var calculator = document.getElementById("calculator-screen-id");
  AddRemoveClassList(calculator, "hide", !show);
}

function updateParam(number) {
  showClearDisplayOption();
  if (calculatorHandlerConfig.selectedOperator) {
    calculatorHandlerConfig.secondParam = addDigitToNumber(number, calculatorHandlerConfig.secondParam);
    updateParamInDocument(calculatorHandlerConfig.secondParam);
  } else {
    if(calculatorHandlerConfig.result){
      calculatorHandlerConfig.firstParam = 0;
      calculatorHandlerConfig.result = 0;
    }
    calculatorHandlerConfig.firstParam = addDigitToNumber(number, calculatorHandlerConfig.firstParam);
    updateParamInDocument(calculatorHandlerConfig.firstParam);
  }
}

function updateParamInDocument(number) {
  var box = document.getElementById("first-inputId");
  box.innerHTML = number;
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

function selectOperator(operator) {
  showClearDisplayOption();
  var currentOperator = calculatorHandlerConfig.selectedOperator;
  if (currentOperator) {
    var currentId = calculatorHandlerConfig.operatorIds[currentOperator];
    highlightOperator(currentId, false);
    showResult();
  }

  var nextId = calculatorHandlerConfig.operatorIds[operator];
  calculatorHandlerConfig.selectedOperator = operator;
  highlightOperator(nextId, true);
}

function calculateResult() {
  var selectOperator = calculatorHandlerConfig.selectedOperator;

  if (!selectOperator) {
    return calculatorHandlerConfig.firstParam;
  }

  if(!calculatorHandlerConfig.secondParam){
    removeOperatorHighlight();
    return calculatorHandlerConfig.firstParam;
  }

  var firstParam = calculatorHandlerConfig.firstParam;
  var secondParam = calculatorHandlerConfig.secondParam;
  var result = calculatorHandlerConfig.result;

  switch (selectOperator) {
    case operators.add:
      result = firstParam + secondParam;
      removeOperatorHighlight();
      break;
    case operators.multiply:
      result = firstParam * secondParam;
      removeOperatorHighlight();
      break;
    case operators.divide:
      result = firstParam / secondParam;
      removeOperatorHighlight();
      break;
    case operators.subtract:
      result = firstParam - secondParam;
      removeOperatorHighlight();
      break;
    default:
      break;
  }
  return result;
}

function showResult() {
  if (calculatorHandlerConfig.selectedOperator) {
    var result = calculateResult();
    calculatorHandlerConfig.result = result;
    calculatorHandlerConfig.firstParam = result;
    calculatorHandlerConfig.secondParam = 0;
    calculatorHandlerConfig.selectedOperator = null;
    updateParamInDocument(result);
  }
}

function removeOperatorHighlight(){
  var id = calculatorHandlerConfig.operatorIds[calculatorHandlerConfig.selectedOperator] 
  highlightOperator(id, false);
}