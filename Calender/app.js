// Get the calendar element from the DOM
let calendar = document.querySelector('.calendar');

// Define an array of month names
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Function to check if a year is a leap year
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
}

// Function to get the number of days in February for a given year
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

// Function to generate the calendar for a given month and year
generateCalendar = (month, year) => {

    // Get elements for the calendar days and year header
    let calendar_days = calendar.querySelector('.calendar-days');
    let calendar_header_year = calendar.querySelector('#year');

    // Define an array of days in each month
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Clear the existing calendar days
    calendar_days.innerHTML = '';

    // Get the current date to be used as a reference
    let currDate = new Date();
    if (!month) month = currDate.getMonth(); // If the month is not provided, use the current month
    if (!year) year = currDate.getFullYear(); // If the year is not provided, use the current year

    // Get the name of the current month
    let curr_month = `${month_names[month]}`;

    // Update the month and year in the calendar header
    month_picker.innerHTML = curr_month;
    calendar_header_year.innerHTML = year;

    // Get the first day of the given month and year
    let first_day = new Date(year, month, 1);

    // Loop to create calendar days for the given month
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) { // Start creating days when the first day of the month is reached
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - first_day.getDay() + 1; // Set the day number
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                // Add a class to the current date in the calendar
                day.classList.add('curr-date');
            }
        }
        calendar_days.appendChild(day); // Add the day element to the calendar
    }
}

// Generate the initial calendar with the current month and year
let month_list = calendar.querySelector('.month-list');

// Create month selection elements and attach event listeners to them
month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div data-month="${index}">${e}</div>`;
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show');
        curr_month.value = index; // Update the selected month
        generateCalendar(index, curr_year.value); // Generate the calendar for the selected month and the current year
    }
    month_list.appendChild(month); // Add the month selection element to the list
});

// Handle the click event for the month picker element
let month_picker = calendar.querySelector('#month-picker');
month_picker.onclick = () => {
    month_list.classList.add('show'); // Show the month selection list on click
}

// Initialize the current date and year
let currDate = new Date();
let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

// Generate the initial calendar with the current month and year
generateCalendar(curr_month.value, curr_year.value);

// Handle the click event for the previous year button
document.querySelector('#prev-year').onclick = () => {
    --curr_year.value; // Decrement the current year
    generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the updated year
}

// Handle the click event for the next year button
document.querySelector('#next-year').onclick = () => {
    ++curr_year.value; // Increment the current year
    generateCalendar(curr_month.value, curr_year.value); // Generate the calendar for the updated year
}

// Handle the click event for the dark mode toggle switch
let dark_mode_toggle = document.querySelector('.dark-mode-switch');
dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light'); // Toggle the 'light' class on the body element
    document.querySelector('body').classList.toggle('dark'); // Toggle the 'dark' class on the body element
}
