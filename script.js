let today = new Date();
let currentQuarter;
let numberOfTasks = document.getElementsByClassName("task").length - 1;
GetDate(today);
taskRange();
document.addEventListener("click", elementId);

function elementId() {

    let finalValue;
    let monthValue;

    let clickedId = event.srcElement.id;
    let clickedValues = Array.from(clickedId);

    let quarter1 = [0, 1, 2];
    let quarter2 = [3, 4, 5];
    let quarter3 = [6, 7, 8];
    let quarter4 = [9, 10, 11];

    let selectedMonth = clickedValues[0] - 1;
    let currentYear = today.getFullYear();
    let row = clickedValues[1];
    let column = clickedValues[2];

    if (currentQuarter == 1) {
        monthValue = quarter1[selectedMonth] + 1;
    } else if (currentQuarter == 2) {
        monthValue = quarter2[selectedMonth] + 1;
    } else if (currentQuarter == 3) {
        monthValue = quarter3[selectedMonth] + 1;
    } else {
        monthValue = quarter4[selectedMonth] + 1;
    }

    if (clickedId == "next") {
        today.setMonth(today.getMonth() + 3);
        GetDate(today);
        clearTables();
    } else if (clickedId == "last") {
        today.setMonth(today.getMonth() - 3);
        GetDate(today);
        clearTables();
    } else if (clickedId >= 111 && clickedId < + 375) {
        today.setMonth(monthValue - 1);

    } else {
        GetDate(today);
    }

    let mon = getMondays(today);
    let lastday = function (y, m) {
        return new Date(y, m + 1, 0).getDate();
    }

    let lastDayOfMonth = lastday(currentYear, parseInt(monthValue) - 1);
    let selectedDay = parseInt(mon[column - 1]) + parseInt(row) - 1;

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

    let quarter1 = [0, 1, 2];
    let quarter2 = [3, 4, 5];
    let quarter3 = [6, 7, 8];
    let quarter4 = [9, 10, 11];

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
        //let description = taskNumber[3];

        for (q = 1; q <= 4; q++) {

            if (getQuarter() == q) {

                let qq = "quarter" + q;
                let month1;
                let month2;

                let tableNumber1;
                let tableNumber2;

                if (qq == "quarter1") {
                    month1 = quarter1[startmonth] + 1;
                    month2 = quarter1[endmonth] + 1;

                    tableNumber1 = month1;
                    tableNumber2 = month2;

                } else if (qq == "quarter2") {
                    month1 = quarter2[startmonth] + 1;
                    month2 = quarter2[endmonth] + 1;

                    tableNumber1 = month1 - 3;
                    tableNumber2 = month2 - 3;

                } else if (qq == "quarter3") {
                    month1 = quarter3[startmonth] + 1;
                    month2 = quarter3[endmonth] + 1;

                    tableNumber1 = month1 - 6;
                    tableNumber2 = month2 - 6;

                } else if (qq == "quarter4") {
                    month1 = quarter4[startmonth] + 1;
                    month2 = quarter4[endmonth] + 1;

                    tableNumber1 = month1 - 9;
                    tableNumber2 = month2 - 9;

                } else {
                    month1 = 1;
                    month2 = 1;

                    tableNumber1 = 1;
                    tableNumber2 = 1;
                }

                //Start date
                let selectedMondays1 = getMondays("2023, " + month1);
                let selectedColumn1;

                for (l = 0; l <= selectedMondays1.length; l++) {
                    if (startDay >= selectedMondays1[l] && startDay < selectedMondays1[l + 1]) {
                        selectedColumn1 = l + 1;
                    }
                }

                //end date
                let selectedMondays2 = getMondays("2023, " + month2)
                let selectedColumn2;

                for (e = 0; e <= selectedMondays2.length; e++) {
                    if (endDay >= selectedMondays2[e] && endDay < selectedMondays2[e + 1]) {
                        selectedColumn2 = e + 1;
                    }
                }

                let randomColor = "#" + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                document.getElementById(tableNumber1.toString() + i + selectedColumn1).style.backgroundColor = randomColor;
                document.getElementById(tableNumber1.toString() + i + selectedColumn1).innerHTML = "Start";
                document.getElementById(tableNumber2.toString() + i + selectedColumn2).style.backgroundColor = randomColor;
                document.getElementById(tableNumber2.toString() + i + selectedColumn2).innerHTML = "End";

            }
        }

    }
}

function addNew() {
    document.getElementsByClassName("task")[2].removeAttribute("hidden");
    numberOfTasks = numberOfTasks + 1;
    taskRange();
}

function getQuarter() {

    let quarter1 = [0, 1, 2];
    let quarter2 = [3, 4, 5];
    let quarter3 = [6, 7, 8];
    let quarter4 = [9, 10, 11];
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
    for (x = 111; x <= 375; x++) {
        let checkElement = document.getElementById(x);

        if (checkElement) {
            document.getElementById(x).style.backgroundColor = "white";
            document.getElementById(x).innerHTML = "";
        }
    }
}

function GetDate(date) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentDate = new Date(date);
    let currentYear = currentDate.getFullYear();

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
    var d = new Date(date),
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