var calendarConfig = null;

function getCalendarConfig() {
  var date = new Date();
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  var nextMonth = currentMonth;
  var nextYear = currentYear;
  var arrayIndex = 0;

  var initialConfig = {
    currentMonth,
    currentYear,
    nextMonth,
    nextYear,
    arrayIndex,
  };

  return initialConfig;
}

function calendarHandler(button) {
  switch (button.id) {
    case "left-button":
      showPreviousMonth();
      break;

    case "right-button":
      showNextMonth();
      break;

    case "top-button":
      showPreviousYear();
      break;

    case "bottom-button":
      showNextYear();
      break;

    case "right-select-button":
      unmountCalendar();
      mountMenu();
      break;

    case "power-button":
      unmountCalendar();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function mountCalendar() {
  calendarConfig = getCalendarConfig();
  var calendarScreenNode = document.getElementById("calendar-screen-id");
  var calendarBodyContainer = createCalendar();
  calendarScreenNode.appendChild(calendarBodyContainer);
  mountCalendarScreen(true);
  screenName = "calendarScreen";
}

function unmountCalendar() {
  var calendarScreenNode = document.getElementById("calendar-screen-id");
  var calendarBodyContainer = getCalendarBodyContainerNode();
  calendarScreenNode.removeChild(calendarBodyContainer);
  calendarConfig = null;
  mountCalendarScreen(false);
}

function mountCalendarScreen(show) {
  var calendarScreenNode = document.getElementById("calendar-screen-id");
  AddRemoveClassList(calendarScreenNode, "hide", !show);
}

function createCalendar() {
  var bodyContainer = document.createElement("div");
  bodyContainer.classList.add("calendar-body-container");
  bodyContainer.id = "bodyContainerId";

  var calendarNavbar = createCalendarNavbar();
  var calendarBody = createCalendarBody();
  var bottomNavbar = createCalendarBottomNavbar();

  bodyContainer.appendChild(calendarNavbar);
  bodyContainer.appendChild(calendarBody);
  bodyContainer.appendChild(bottomNavbar);

  return bodyContainer;
}

function getCalendarBodyContainerNode() {
  return (bodyContainer = document.getElementById("bodyContainerId"));
}

function createCalendarBody() {
  var container = document.createElement("div");
  container.classList.add("calendar-body");
  container.id = "calendarBodyId";

  var weekdaysHeader = createWeekDaysHeader();
  container.appendChild(weekdaysHeader);

  var calendar = createCalendarDays();
  container.appendChild(calendar);

  return container;
}

function createWeekDaysHeader() {
  var weekdaysContainer = document.createElement("div");
  weekdaysContainer.classList.add("weekdays-container");

  var daysName = ["S", "M", "T", "W", "T", "F", "S"];

  for (i = 0; i < 7; i++) {
    var day = createWeekDay();
    day.innerHTML = daysName[i];
    weekdaysContainer.appendChild(day);
  }

  return weekdaysContainer;
}

function createWeekDay() {
  var dayName = document.createElement("div");
  dayName.classList.add("day-name");
  return dayName;
}

function createCalendarDays() {
  var calendarNode = document.createElement("div");
  calendarNode.id = "calendarId";
  var weekDaysArray = [];
  var number;

  var currentMonth = calendarConfig.nextMonth;
  var currentYear = calendarConfig.nextYear;

  var firstDayOfCurrMonth = getFirstDate(currentYear, currentMonth, 1);
  var daysFallingInCurrMonth = firstDayOfCurrMonth;
  var todayDay = getTodayDate();
  todayDay = todayDay + daysFallingInCurrMonth - 1;

  var previousMonth = currentMonth - 1;
  if (currentMonth === 0) {
    previousMonth = 11;
  }

  var currentMonthLength = getNoOfDaysInAMonth(currentYear, currentMonth);
  var previousMonthLength = getNoOfDaysInAMonth(currentYear, previousMonth);

  var previousMonthFirstDate = previousMonthLength - daysFallingInCurrMonth + 1;
  var isLastMonth = false;
  var isNextMonth = false;
  var isToday = false;

  for (i = 0; i < 42; i++) {
    if (i < daysFallingInCurrMonth) {
      number = previousMonthFirstDate;
      previousMonthFirstDate++;
      isLastMonth = true;
    }
    if (i === daysFallingInCurrMonth) {
      number = 1;
    }
    if (i === todayDay) {
      isToday = true;
    }
    if (i === currentMonthLength + daysFallingInCurrMonth) {
      number = 1;
      isNextMonth = true;
    }

    weekDaysArray.push({ day: number, isLastMonth, isNextMonth, isToday });
    isToday = false;
    isLastMonth = false;
    number++;
  }

  var weeksNode = createCalendarWeeks(weekDaysArray);
  calendarNode.appendChild(weeksNode);
  return calendarNode;
}

function getCalendarNode() {
  return document.getElementById("calendarId");
}

function createCalendarWeeks(weekDaysArray) {
  var weekdaysContainer = document.createElement("div");

  var arrayIndex = calendarConfig.arrayIndex;
  for (i = 0; i < 6; i++) {
    var dateContainer = createCalendarDateContainer();
    for (j = 0; j < 7; j++) {
      var date = createCalendarDay(weekDaysArray[arrayIndex]);
      dateContainer.appendChild(date);
      arrayIndex++;
    }
    weekdaysContainer.appendChild(dateContainer)
  }

  return weekdaysContainer;
}

function createCalendarDay(dayDetails) {
  var date = document.createElement("span");
  date.classList.add("calendar-date");
  date.innerHTML = dayDetails.day;

  if (dayDetails.isToday) {
    AddRemoveClassList(date, "today-highlight", true);
  } else if (dayDetails.isLastMonth || dayDetails.isNextMonth) {
    AddRemoveClassList(date, "otherMonths-highlight", true);
  }

  return date;
}

function createCalendarDateContainer() {
  var container = document.createElement("div");
  container.classList.add("calendar-date-container");
  return container;
}

function getFirstDate(currentYear, currentMonth) {
  var date = new Date(currentYear, currentMonth, 1);
  return date.getDay();
}

function getTodayDate() {
  if (
    calendarConfig.currentMonth === calendarConfig.nextMonth &&
    calendarConfig.currentYear === calendarConfig.nextYear
  ) {
    var date = new Date();
    day = date.getDate();
    return day;
  } else {
    return;
  }
}

function getNoOfDaysInAMonth(currentYear, currentMonth) {
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (currentYear % 4 === 0) {
    days[1] = 29;
  }
  return days[currentMonth];
}

function goToPreviousYear() {
  calendarConfig.nextYear = calendarConfig.nextYear - 1;
}

function goToNextYear() {
  calendarConfig.nextYear = calendarConfig.nextYear + 1;
}

function goToPreviousMonth() {
  calendarConfig.nextMonth = calendarConfig.nextMonth - 1;

  if (calendarConfig.nextMonth < 0) {
    calendarConfig.nextMonth = 11;
    calendarConfig.nextYear = calendarConfig.currentYear - 1;
  }
}

function goToNextMonth() {
  calendarConfig.nextMonth = calendarConfig.nextMonth + 1;

  if (calendarConfig.nextMonth > 11) {
    calendarConfig.nextMonth = 0;
    calendarConfig.nextYear = calendarConfig.nextYear + 1;
  }
}

function showNextMonth() {
  goToNextMonth();
  reRenderCalendar();
}

function showPreviousMonth() {
  goToPreviousMonth();
  reRenderCalendar();
}

function showPreviousYear() {
  goToPreviousYear();
  reRenderCalendar();
}

function showNextYear() {
  goToNextYear();
  reRenderCalendar();
}

function reRenderCalendar() {
  removeCalendar();
  addCalendar();
  reRenderNavbar();
}

function reRenderNavbar() {
  updateNavbar(calendarConfig.nextYear, calendarConfig.nextMonth);
}

function removeCalendar() {
  var container = document.getElementById("calendarBodyId");
  var calendar = getCalendarNode();
  container.removeChild(calendar);
}

function addCalendar() {
  var container = document.getElementById("calendarBodyId");
  var calendar = createCalendarDays();
  container.appendChild(calendar);
}

function updateNavbar(clockYear, clockMonth) {
  var currentYear = document.getElementById("yearId");
  currentYear.innerHTML = clockYear;
  var currentMonth = document.getElementById("monthId");
  currentMonth.innerHTML = monthNumberToName(clockMonth);
}

function monthNumberToName(monthNumber) {
  var monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (monthNumber >= 0 && monthNumber <= 11) {
    return monthsName[monthNumber];
  } else {
    return "Invalid month number";
  }
}

function createCalendarNavbar() {
  var container = document.createElement("div");
  container.classList.add("calendar-navbar");

  var backwardIcon = createBackwardIcon();
  container.appendChild(backwardIcon);

  var dateContainer = createMonthAndYear();
  container.appendChild(dateContainer);

  var forwardIcon = createForwardIcon();
  container.appendChild(forwardIcon);

  return container;
}

function createBackwardIcon() {
  var icon = document.createElement("img");
  icon.classList.add("monthScroll-button", "rotate-180");
  icon.id = "backwardButtonId";
  icon.src = "Icons/right-chevron.png";
  return icon;
}

function createForwardIcon() {
  var icon = document.createElement("img");
  icon.classList.add("monthScroll-button");
  icon.id = "forwardButtonId";
  icon.src = "Icons/right-chevron.png";
  return icon;
}

function createMonthAndYear() {
  var dateContainer = document.createElement("div");
  dateContainer.classList.add("calendar-navbar-date");

  var month = createCalendarMonth();
  dateContainer.appendChild(month);

  var year = createCalendarYear();
  dateContainer.appendChild(year);

  return dateContainer;
}

function createCalendarMonth() {
  var container = document.createElement("span");
  container.id = "monthId";

  var clockMonth = calendarConfig.currentMonth;
  clockMonth = monthNumberToName(clockMonth);
  container.innerHTML = clockMonth;

  return container;
}

function createCalendarYear() {
  var container = document.createElement("span");
  container.id = "yearId";

  var clockYear = calendarConfig.currentYear;
  container.innerHTML = clockYear;

  return container;
}


function createCalendarBottomNavbar() {
  var navbar = document.createElement("div");
  navbar.classList.add("bottom-navbar", "bottom-navbar-color");

  var blank = document.createElement("div");
  navbar.appendChild(blank);

  var back = document.createElement("div");
  back.innerHTML = "Back";
  navbar.appendChild(back);

  return navbar;
}
