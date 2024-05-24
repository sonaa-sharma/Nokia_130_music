var calendarConfig = null;

function getCalendarConfig() {
  var date = new Date();
  var currentDay = date.getDay();
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  var idsArray = [];
  for (i = 1; i <= 35; i++) {
    idsArray.push("day" + i);
  }

  var initialConfig = {
    currentDay,
    currentMonth,
    currentYear,
    idsArray,
  };

  return initialConfig;
}

var _calendarNode;
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
  showGreyShade(calendarConfig.currentYear, calendarConfig.currentMonth, 1);
  highlightTodayDate();
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
  var backwardIcon = createBackwardIcon();
  container.appendChild(backwardIcon);
  var dateContainer = document.createElement("div");
  dateContainer.classList.add("calendar-navbar-date");
  var month = createCalendarMonth();
  dateContainer.appendChild(month);
  var year = createCalendarYear();
  dateContainer.appendChild(year);
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

function createCalendarBody() {
  var container = document.createElement("div");
  container.classList.add("calendar-body");
  container.id = "calendarBodyId";

  var weekdaysHeader = createWeekDaysHeader();
  container.appendChild(weekdaysHeader);

  var calendar = createCalendar();
  container.appendChild(calendar);

  return container;
}

function createCalendar() {
  var calendarNode = document.createElement("div");
  calendarNode.id = "calendarId";
  var weekName = [];
  var number = 1;

  var currentMonth = calendarConfig.currentMonth;
  var currentYear = calendarConfig.currentYear;

  var firstDate = getFirstDate(currentYear, currentMonth, 1);

  var previousMonth = currentMonth - 1;
  if(currentMonth === 0){
    previousMonth = 11;
  }

  var currentMonthLength = getNoOfDaysInAMonth(currentYear, currentMonth);
  var previousMonthLength = getNoOfDaysInAMonth(currentYear, previousMonth);

  var preMonth = previousMonthLength - firstDate + 1;

  for (i = 0; i < 35; i++) {
    if (i < firstDate) {
      weekName.push(preMonth);
      preMonth++;
    } else {
      if (i === currentMonthLength + firstDate) {
        number = 1;
      }
      weekName.push(number);
      number++;
    }
  }

  var weeksNode = createCalendarWeeks(weekName);
  calendarNode.appendChild(weeksNode);
  return calendarNode;
}

function getCalendarNode(){
  return document.getElementById("calendarId");
}

function removeCalendar(){
  var container = document.getElementById("calendarBodyId");
  var calendar = getCalendarNode();
  container.removeChild(calendar);
}

function addCalendar(){
  var container = document.getElementById("calendarBodyId");
  var calendar = createCalendar();
  container.appendChild(calendar);
  showGreyShade(calendarConfig.currentYear, calendarConfig.currentMonth, 1);
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
    dates.id = calendarConfig.idsArray[i];
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
  return date.getDay();
}

function getNoOfDaysInAMonth(currentYear, currentMonth) {
  var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (currentYear % 4 === 0) {
    days[1] = 29;
  }
  return days[currentMonth];
}

function getPreviousMonth() {
  calendarConfig.currentMonth = calendarConfig.currentMonth - 1;

  if (calendarConfig.currentMonth < 0) {
    calendarConfig.currentMonth = 11;
    calendarConfig.currentYear = calendarConfig.currentYear - 1;
  }
}

function getNextMonth() {
  calendarConfig.currentMonth = calendarConfig.currentMonth + 1;

  if (calendarConfig.currentMonth > 11) {
    calendarConfig.currentMonth = 0;
    calendarConfig.currentYear = calendarConfig.currentYear + 1;
  }
}

function showGreyShade(currentYear, currentMonth, currentDay) {
  var firstDay = getFirstDate(currentYear, currentMonth, currentDay);
  var todayDay = getTodayDate();
  todayDay = todayDay + firstDay - 1;
  var node;
  var currentMonthLength = getNoOfDaysInAMonth(currentYear, currentMonth);

  for (i = 0; i < firstDay; i++) {
    id = calendarConfig.idsArray[i];
    node = document.getElementById(id);
    node.style.color = "rgb(213, 210, 210)";
  }
  i = currentMonthLength + firstDay;
  for (; i < 35; i++) {
    id = calendarConfig.idsArray[i];
    node = document.getElementById(id);
    node.style.color = "rgb(213, 210, 210)";
  }
}

function getTodayDate() {
  var date = new Date();
  day = date.getDate();
  return day;
}

function highlightTodayDate(){
  var date = new Date();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth();
  
  var firstDay = getFirstDate(currentYear, currentMonth, 1);
  var todayDay = getTodayDate();
  todayDay = todayDay + firstDay - 1;
  id = calendarConfig.idsArray[todayDay];
  node = document.getElementById(id);
  node.style.color = "red";
}

function showNextMonth(){
  getNextMonth();
  updateNavbar(calendarConfig.currentYear, calendarConfig.currentMonth);
  removeCalendar();
  addCalendar();
}

function showPreviousMonth(){
  getPreviousMonth();
  updateNavbar(calendarConfig.currentYear, calendarConfig.currentMonth);
  removeCalendar();
  addCalendar();
}