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

    case "top-button":
      showOperator("+");
      break;

    case "left-button":
      showOperator("×");
      break;

    case "right-button":
      showOperator("÷");
      break;

    case "bottom-button":
      showOperator("−");
      break;

    case "0":
      showNumbers(0);
      break;
    case "1":
      showNumbers(1);
      break;
    case "2":
      showNumbers(2);
      break;
    case "3":
      showNumbers(3);
      break;
    case "4":
      showNumbers(4);
      break;
    case "5":
      showNumbers(5);
      break;
    case "6":
      showNumbers(6);
      break;
    case "7":
      showNumbers(7);
      break;
    case "8":
      showNumbers(8);
      break;
    case "9":
      showNumbers(9);
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
  clearNumbers();
}

function mountCalculatorScreen(show) {
  var calculator = document.getElementById("calculator-screen-id");
  AddRemoveClassList(calculator, "hide", !show);
}

function showNumbers(no) {
  var box = document.getElementById("calculation-box-id");
  box.innerHTML += no;
}

function clearNumbers() {
  var box = document.getElementById("calculation-box-id");
  box.innerHTML = "";
}

function showOperator(operatorSign) {
  var box = document.getElementById("calculation-box-id");
  box.innerHTML = operatorSign;
}
