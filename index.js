
const datePickerElement = document.querySelector(".date-picker-container");
const selectedDateElement = document.querySelector(".selected-date");
const datesElement = document.querySelector(".dates-container");
const monthElement = document.querySelector("#month");
const nextMonthelement = document.querySelector(".next-month");
const preMonthElement = document.querySelector(".prev-month");
const daysElement = document.querySelector(".days-container");

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
]

let date = new Date();
let today = date.getDate();
console.log(today)
let month = date.getMonth() + 1;
console.log(month);
let year = date.getFullYear();
console.log(year);

let selectedDate = date;
let selectedDay = today;
let selectedMonth = month;
let selectedYear = year;

if (monthElement != null) {
  monthElement.innerHTML = months[month] + " " + year
}

if (selectedDateElement != null) {
  selectedDateElement.innerHTML = formatDate(selectedDate);
  selectedDateElement.dataset.value = selectedDate;

}

populateDates();

if (datePickerElement != null && nextMonthelement != null && preMonthElement != null) {
  datePickerElement.addEventListener("click", toggleDatePicker);
  nextMonthelement.addEventListener("click", goToNextMonth);
  preMonthElement.addEventListener("click", goToPrevMonth);
}


function toggleDatePicker(e) {
  if (!checkClassExist(e.path, "dates-container")) {
    if (datesElement) {
      datesElement.classList.toggle("active");
    }

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
  if (monthElement != null) {
    monthElement.textContent = months[month] + " " + year;
  }

  populateDates();
}

function goToPrevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  if (monthElement != null) {
    monthElement.textContent = months[month] + " " + year;
  }

  populateDates();
}

function formatDate(selectedDate) {
  let day = selectedDate.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = selectedDate.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = selectedDate.getFullYear();

  return day + " / " + month + " / " + year;
}

function populateDates() {
  let totalDays;
  if (daysElement != null) {
    daysElement.innerHTML = ""


    if (month == 1) {
      totalDays = 28;
    } else if (month % 2 === 0) {
      totalDays = 31;
    } else {
      totalDays = 30;
    }
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
      if (selectedDateElement != null) {
        selectedDateElement.textContent = formatDate(selectedDate);
        // selectedDateElement.dataset.value = selectedDate;
      }


      populateDates();
    });

    if (daysElement != null) {
      daysElement.appendChild(dayElement);
    }

  }
}

module.exports = date-picker