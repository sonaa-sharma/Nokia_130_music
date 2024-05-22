var calendarConfig = null;

function getCalendarConfig() {
  var currentDay;
  var currentMonth;
  var currentYear;
}

function calendarHandler(button) {
  switch (button.id) {
    case "left-button":
      break;

    case "right-button":
      break;

    case "right-select-button":
      unmountCalendar();
      showMenu();
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
  var calendarBodyContainer = createCalendarBodyContainer();
  calendarScreenNode.appendChild(calendarBodyContainer);
  mountCalendarScreen(true);
  updateNavbar(2024, 4);

  screenName = "calendarScreen";
}

function unmountCalendar() {
  var calendarScreenNode = document.getElementById("calendar-screen-id");
  var calendarBodyContainer = getCalendarBodyContainerNode();
  calendarScreenNode.removeChild(calendarBodyContainer);
  mountCalendarScreen(false);
}

function mountCalendarScreen(show) {
  var calendarScreenNode = document.getElementById("calendar-screen-id");
  AddRemoveClassList(calendarScreenNode, "hide", !show);
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
  if (monthNumber >= 1 && monthNumber <= 12) {
    return monthsName[monthNumber];
  } else {
    return "Invalid month number";
  }
}

function createCalendarBodyContainer() {
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

function createCalendarNavbar() {
  var container = document.createElement("div");
  container.classList.add("calendar-navbar");

  var month = createCalendarMonth();
  var year = createCalendarYear();
  container.appendChild(month);
  container.appendChild(year);

  return container;
}

function createCalendarMonth() {
  var container = document.createElement("span");
  container.id = "monthId";
  return container;
}

function createCalendarYear() {
  var container = document.createElement("span");
  container.id = "yearId";
  return container;
}

function createCalendarBody() {
  var container = document.createElement("div");
  container.classList.add("calendar-body");

  var weekdaysHeader = createWeekDaysHeader();
  container.appendChild(weekdaysHeader);

  var weekName = [];
  var number = 1;

  var currentMonth = getCurrentMonth();
  var currentYear = getCurrentYear();

  var firstDate = getFirstDate(currentYear, currentMonth, 1);

  var previousMonth = currentMonth - 1;
  var nextMonth = currentMonth + 1;

  var currentMonthLength = getNoOfDaysInAMonth(currentMonth);
  var previousMonthLength = getNoOfDaysInAMonth(previousMonth);
  var nextMonthLength = getNoOfDaysInAMonth(nextMonth);

  var preMonth = previousMonthLength - firstDate + 1;

  for (i = 0; i <= currentMonthLength + firstDate; i++) {
    if (i < firstDate) {
      weekName.push(preMonth);
      preMonth++;
      console.log(i);
    } else {
      if (i === currentMonthLength + firstDate) {
        number = 1;
      }
      weekName.push(number);
      number++;
    }
  }

  var weeksNode = createCalendarWeeks(weekName);
  container.appendChild(weeksNode);

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

function createCalendarWeeks(weekName) {
  var dateContainer = createCalendarDateContainer();
  for (i = 0; i < weekName.length; i++) {
    var dates = createCalendarDates();
    dates.innerHTML = weekName[i];
    dateContainer.appendChild(dates);
  }
  return dateContainer;
}

function createCalendarDateContainer() {
  var container = document.createElement("div");
  container.classList.add("calendar-date-container");
  return container;
}

function createCalendarDates() {
  var container = document.createElement("div");
  container.classList.add("calendar-date");
  return container;
}

function createCalendarBottomNavbar() {
  var navbar = document.createElement("div");
  navbar.classList.add("bottom-navbar", "bottom-navbar-color");
  var blank = document.createElement("div");
  navbar.appendChild(blank);
  var back = document.createElement("div");
  navbar.appendChild(back);
  back.innerHTML = "Back";
  return navbar;
}

function getFirstDate(currentYear, currentMonth, currentDay) {
  var date = new Date(currentYear, currentMonth, currentDay);
  return (todayDate = date.getDay());
}

function getNoOfDaysInAMonth(month) {
  var date = new Date();
  fullYear = date.getFullYear();
  console.log(fullYear);
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (fullYear % 4 === 0) {
    days[1] = 29;
  }
  console.log(days[month]);
  return days[month];
}

function getCurrentMonth() {
  var date = new Date();
  return date.getMonth();
}

function getCurrentYear() {
  var date = new Date();
  return date.getFullYear();
}
