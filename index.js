const datePickerEle = document.querySelector(".date-picker-container");
const selectedDateEle = document.querySelector(" .selected-date");
const datesEle = document.querySelector(".dates-container");
const monthEle = document.querySelector(".month .month-item");
const nextMonthEle = document.querySelector(".month .next-month");
const prevMonthEle = document.querySelector(".month .prev-month");
const daysEle = document.querySelector(".days-container");

const months = [
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

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

if(monthEle != null){
  monthEle.textContent = months[month] + " " + year;
}

if(selectedDateEle != null){
  selectedDateEle.textContent = formatDate(date);
  selectedDateEle.dataset.value = selectedDate;
}


populateDates();

datePickerEle.addEventListener("click", toggleDatePicker);
nextMonthEle.addEventListener("click", goToNextMonth);
prevMonthEle.addEventListener("click", goToPrevMonth);

function toggleDatePicker(e) {
  if (!checkClassExist(e.path, "dates-container")) {
    datesEle.classList.toggle("active");
  }
}

function checkClassExist(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}

function goToNextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }

  monthEle.textContent = months[month] + " " + year;
  populateDates();
}

function goToPrevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  monthEle.textContent = months[month] + " " + year;
  populateDates();
}

function populateDates() {
  daysEle.innerHTML = "";
  let totalDays;

  if (month == 1) {
    totalDays = 28;
  } else if (month % 2 === 0) {
    totalDays = 31;
  } else {
    totalDays = 30;
  }

  for (let i = 0; i < totalDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      selectedDateEle.textContent = formatDate(selectedDate);
      selectedDateEle.dataset.value = selectedDate;

      populateDates();
    });

    daysEle.appendChild(dayElement);
  }
}

function formatDate(selectedDate) {
  let day = selectedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = selectedDate.getMonth() ;
  if (month < 10) {
    month = "0" + month;
  }

  let year = selectedDate.getFullYear();

  return day + " / " + month + " / " + year;
}
