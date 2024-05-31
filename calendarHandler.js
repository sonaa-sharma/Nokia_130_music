var calendarConfig = null;

function getCalendarConfig() {
  var date = new Date();
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  var nextMonth = currentMonth;
  var nextYear = currentYear;

  var initialConfig = {
    currentMonth,
    currentYear,
    nextMonth,
    nextYear,
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

function createCalendarDays() {
  var calendarNode = document.createElement("div");
  calendarNode.id = "calendarId";
  var weekDaysArray = [];
  var number = 1;

  var currentMonth = calendarConfig.nextMonth;
  var currentYear = calendarConfig.nextYear;

  var firstDate = getFirstDate(currentYear, currentMonth, 1);
  var daysFallingInCurrMonth = firstDate;

  var previousMonth = currentMonth - 1;
  if (currentMonth === 0) {
    previousMonth = 11;
  }

  var currentMonthLength = getNoOfDaysInAMonth(currentYear, currentMonth);
  var previousMonthLength = getNoOfDaysInAMonth(currentYear, previousMonth);

  var previousMonthFirstDate = previousMonthLength - daysFallingInCurrMonth + 1;

  for (i = 0; i < 35; i++) {
    if (i < firstDate) {
      weekDaysArray.push(previousMonthFirstDate);
      previousMonthFirstDate++;
    } else {
      if (i === currentMonthLength + daysFallingInCurrMonth) {
        number = 1;
      }
      weekDaysArray.push(number);
      number++;
    }
  }

  var weeksNode = createCalendarWeeks(weekDaysArray, currentYear, currentMonth);
  calendarNode.appendChild(weeksNode);
  return calendarNode;
}

function getCalendarNode() {
  return document.getElementById("calendarId");
}

function createWeekDaysHeader() {
  var weekdaysContainer = document.createElement("div");
  weekdaysContainer.classList.add("weekdays-container");

  var daysName = ["S", "M", "T", "W", "T", "F", "S"];

  for (i = 0; i < 7; i++) {
    var day = createDaysName();
    day.innerHTML = daysName[i];
    weekdaysContainer.appendChild(day);
  }

  return weekdaysContainer;
}

function createDaysName() {
  var dayName = document.createElement("div");
  dayName.classList.add("day-name");
  return dayName;
}

function createCalendarWeeks(weekDaysArray, currentYear, currentMonth) {
  var currentMonthLength = getNoOfDaysInAMonth(currentYear, currentMonth);
  var firstDay = getFirstDate(currentYear, currentMonth);
  var daysFallingInCurrMonth = firstDay;
  var todayDay = getTodayDate();
  todayDay = todayDay + firstDay - 1;
  var currentMonth;
  var dateContainer = createCalendarDateContainer();

  for (i = 0; i < weekDaysArray.length; i++) {
    var date = createCalendarDay();
    date.innerHTML = weekDaysArray[i];

    if (i < daysFallingInCurrMonth) {
      AddRemoveClassList(date, "otherMonths-highlight", true);
    } else if (i >= currentMonthLength + daysFallingInCurrMonth) {
      AddRemoveClassList(date, "otherMonths-highlight", true);
    } else if (i === todayDay) {
      AddRemoveClassList(date, "today-highlight", true);
    }

    dateContainer.appendChild(date);
  }

  return dateContainer;
}

function createCalendarDateContainer() {
  var container = document.createElement("div");
  container.classList.add("calendar-date-container");
  return container;
}

function createCalendarDay() {
  var date = document.createElement("div");
  date.classList.add("calendar-date");
  return date;
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
    return 0;
  }
}

function getNoOfDaysInAMonth(currentYear, currentMonth) {
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (currentYear % 4 === 0) {
    days[1] = 29;
  }
  return days[currentMonth];
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

function reRenderCalendar() {
  removeCalendar();
  addCalendar();
  reRenderNavbar();
}

function reRenderNavbar() {
  updateNavbar(calendarConfig.nextYear, calendarConfig.nextMonth);
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

