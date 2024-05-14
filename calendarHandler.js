function calendarHandler(button) {
  switch (button.id) {
    case "left-select-button":
      break;

    case "mid-button-inner":
      break;

    case "right-select-button":
      hideCalendar();
      showMenu();
      break;

    case "power-button":
      hideCalendar();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function showCalendar() {
  mountCalendarScreen(true);
  // mountNavbar(true);
  updateNavbar();

  screenName = "calendarScreen";
}

function hideCalendar() {
  mountCalendarScreen(false);
  // mountNavbar(false);
}

function mountCalendarScreen(show) {
  var calendarScreenNode = document.getElementById("calendar-screen-id");
  AddRemoveClassList(calendarScreenNode, "hide", !show);
}

function updateNavbar() {
  var date = new Date();
  var clockYear = date.getFullYear();
  var clockMonth = date.getMonth() + 1;

  var currentYear = document.getElementById("yearId");
  currentYear.innerHTML = getTwoDigitNumber(clockYear);
  convertNameToAlphabet(clockMonth);
}

function convertNameToAlphabet(no) {
  var currentMonth = document.getElementById("monthId");
  console.log(no);
  switch (no) {
    case "1":
      currentMonth.innerHTML = "January";
      break;
    case "2":
      currentMonth.innerHTML = "February";
      break;
    case "3":
      currentMonth.innerHTML = "March";
      break;
    case "4":
      currentMonth.innerHTML = "April";
      break;
    case "5":
      currentMonth.innerHTML = "May";
      break;
    case "6":
      currentMonth.innerHTML = "June";
      break;
    case "7":
      currentMonth.innerHTML = "July";
      break;
    case "8":
      currentMonth.innerHTML = "August";
      break;
    case "9":
      currentMonth.innerHTML = "September";
      break;
    case "10":
      currentMonth.innerHTML = "October";
      break;
    case "11":
      currentMonth.innerHTML = "November";
      break;
    case "12":
      currentMonth.innerHTML = "December";
      break;
  }
}
