document.addEventListener("click", elementId);

let today = new Date();
let currentYear2 = today.getFullYear();
let numberOfTasks = document.getElementsByClassName("task").length - 1;

let quarter1 = [0, 1, 2];
let quarter2 = [3, 4, 5];
let quarter3 = [6, 7, 8];
let quarter4 = [9, 10, 11];

GetDate(today);
taskRange();


function elementId() {

    let finalValue;
    let monthValue;

    let clickedId = event.srcElement.id;
    let clickedValues = Array.from(clickedId);


    let selectedMonth = clickedValues[0] - 1;
    let currentYear = today.getFullYear();
    let row = clickedValues[1];
    let column = clickedValues[2];

    //Displays clicked month
    if (currentQuarter == 1) {
        monthValue = quarter1[selectedMonth] + 1;
    } else if (currentQuarter == 2) {
        monthValue = quarter2[selectedMonth] + 1;
    } else if (currentQuarter == 3) {
        monthValue = quarter3[selectedMonth] + 1;
    } else {
        monthValue = quarter4[selectedMonth] + 1;
    }

    //Quarter navigation
    if (clickedId == "next") {
        today.setMonth(today.getMonth() + 3);
        GetDate(today);
        clearTables();
    } else if (clickedId == "last") {
        today.setMonth(today.getMonth() - 3);
        GetDate(today);
        clearTables();
    } else if (clickedId >= 111 && clickedId <= 375) {
        today.setMonth(monthValue - 1);
    } else {
        GetDate(today);
    }

    //Gets last day of the month
    let mon = getMondays(today);
    let lastday = function (y, m) {
        return new Date(y, m + 1, 0).getDate();
    }

    let lastDayOfMonth = lastday(currentYear, parseInt(monthValue) - 1);
    let selectedDay = parseInt(mon[column - 1]) + parseInt(row) - 1;

    //If selected higher number than current month has displays next month
    if (selectedDay > lastDayOfMonth) {
        let newDay = parseInt(selectedDay) - parseInt(lastDayOfMonth);
        let newMonth = monthValue + 1;
        finalValue = newDay + "/" + newMonth + "/" + currentYear;
    } else if (selectedDay <= lastDayOfMonth) {
        finalValue = selectedDay + "/" + monthValue + "/" + currentYear;
    } else {
        finalValue = "";
    }

    document.getElementById("value").innerHTML = finalValue;

}

function taskRange() {

    //Sets colours for each task start and end date

    for (i = 1; i <= numberOfTasks; i++) {

        let taskNumber = document.getElementsByClassName("task" + i);

        let startDate = taskNumber[1].textContent;
        let endtDate = taskNumber[2].textContent;

        let startArray = startDate.split(".");
        let endArray = endtDate.split(".");

        let startmonth = parseInt(startArray[1]) - 1
        let endmonth = parseInt(endArray[1]) - 1

        let startDay = parseInt(startArray[0])
        let endDay = parseInt(endArray[0])

        for (q = 1; q <= 4; q++) {

            if (getQuarter() == q) {

                let qq = "quarter" + q;
                let month1;
                let month2;

                if (qq == "quarter1") {
                    month1 = quarter1[startmonth] + 1;
                    month2 = quarter1[endmonth] + 1;
                } else if (qq == "quarter2") {
                    month1 = quarter2[startmonth] + 1;
                    month2 = quarter2[endmonth] + 1;
                } else if (qq == "quarter3") {
                    month1 = quarter3[startmonth] + 1;
                    month2 = quarter3[endmonth] + 1;
                } else if (qq == "quarter4") {
                    month1 = quarter4[startmonth] + 1;
                    month2 = quarter4[endmonth] + 1;
                } else {
                    month1 = 1;
                    month2 = 1;
                }

                //Start date
                let selectedMondays1 = getMondays(currentYear2 + ", " + month1);
                let selectedColumn1;

                for (l = 0; l <= selectedMondays1.length; l++) {
                    if (startDay >= selectedMondays1[l] && startDay < selectedMondays1[l + 1]) {
                        selectedColumn1 = l + 1;
                    }
                }

                //end date
                let selectedMondays2 = getMondays(currentYear2 + ", " + month2)
                let selectedColumn2;

                for (e = 0; e <= selectedMondays2.length; e++) {
                    if (endDay >= selectedMondays2[e] && endDay < selectedMondays2[e + 1]) {
                        selectedColumn2 = e + 1;
                    }
                }

                //sets random colours for each row start and end date
                let randomColor = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                document.getElementById(month1.toString() + i + selectedColumn1).style.backgroundColor = randomColor;
                document.getElementById(month1.toString() + i + selectedColumn1).innerHTML = "Start";
                document.getElementById(month2.toString() + i + selectedColumn2).style.backgroundColor = randomColor;
                document.getElementById(month2.toString() + i + selectedColumn2).innerHTML = "End";

            }
        }

    }
}

function addNew() {

    //Temporary add new to showcase start and end date working
    document.getElementsByClassName("task")[2].removeAttribute("hidden");
    numberOfTasks = numberOfTasks + 1;
    taskRange();
}

function getQuarter() {

    //Gets current quarter value and prints it
    let currentMonth = today.getMonth();

    if (quarter1.includes(currentMonth)) {
        currentQuarter = 1;
    } else if (quarter2.includes(currentMonth)) {
        currentQuarter = 2;
    } else if (quarter3.includes(currentMonth)) {
        currentQuarter = 3;
    } else if (quarter4.includes(currentMonth)) {
        currentQuarter = 4;
    }
    document.getElementById("qvalue").innerHTML = "Quarter " + currentQuarter;

    return currentQuarter;
}

function clearTables() {

    //Temporary - clears table designs
    for (x = 111; x <= 375; x++) {
        let checkElement = document.getElementById(x);

        if (checkElement) {
            document.getElementById(x).style.backgroundColor = "white";
            document.getElementById(x).innerHTML = "";
        }
    }
}

function GetDate(date) {

    //Sets all the right headers with correct month names
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentYear = date.getFullYear();

    if (getQuarter() == 2) {

        document.getElementById("header1").innerHTML = months[3];
        getElements(1, months[3] + ', ' + currentYear);

        document.getElementById("header2").innerHTML = months[4];
        getElements(2, months[4] + ', ' + currentYear);

        document.getElementById("header3").innerHTML = months[5];
        getElements(3, months[5] + ', ' + currentYear);

    } else if (getQuarter() == 3) {

        document.getElementById("header1").innerHTML = months[6];
        getElements(1, months[6] + ', ' + currentYear);

        document.getElementById("header2").innerHTML = months[7];
        getElements(2, months[7] + ', ' + currentYear);

        document.getElementById("header3").innerHTML = months[8];
        getElements(3, months[8] + ', ' + currentYear);

    } else if (getQuarter() == 4) {

        document.getElementById("header1").innerHTML = months[9];
        getElements(1, months[9] + ', ' + currentYear);

        document.getElementById("header2").innerHTML = months[10];
        getElements(2, months[10] + ', ' + currentYear);

        document.getElementById("header3").innerHTML = months[11];
        getElements(3, months[11] + ', ' + currentYear)

    } else {

        document.getElementById("header1").innerHTML = months[0];
        getElements(1, months[0] + ', ' + currentYear);

        document.getElementById("header2").innerHTML = months[1];
        getElements(2, months[1] + ', ' + currentYear);

        document.getElementById("header3").innerHTML = months[2];
        getElements(3, months[2] + ', ' + currentYear);

    }
}

function getMondays(date) {

    let d = new Date(date),
        month = d.getMonth(),
        mondays = [];

    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(d.getDate());
        d.setDate(d.getDate() + 7);
    }

    return mondays;

}

function getElements(element, date) {

    //Adds or removes columns if necessary
    let numberOfMondays = getMondays(date).length;
    let LastColumn = document.getElementsByClassName("last" + element);

    if (5 > numberOfMondays) {
        document.getElementById("header" + element).colSpan = "4";

        for (i = 0; i <= 6; i++) {
            LastColumn[i].hidden = true;
        }

    } else {
        document.getElementById("header" + element).colSpan = "5";
        for (i = 0; i <= 6; i++) {
            LastColumn[i].hidden = false;
        }
    }
}