let today = new Date();
let currentQuarter;
GetDate(today);
console.log(getMondays(today));
document.addEventListener("click", elementId);
console.log(currentQuarter)

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
    //let lastClicked;
    if (clickedId == "next") {
        today.setMonth(today.getMonth() + 3);
        GetDate(today);
    } else if (clickedId == "last") {
        today.setMonth(today.getMonth() - 3);
        GetDate(today)
    } else if (clickedId >= 111 && clickedId < + 375) {
        //lastClicked = clickedId;
        //console.log(lastClicked);
        today.setMonth(monthValue - 1);
        //document.getElementById(clickedId).style.backgroundColor = "blue";
        
    }
    else {
        GetDate(today);
    }

    let mon = getMondays(today);
    let lastday = function (y, m) {
        return new Date(y, m + 1, 0).getDate();
    }

    let lastDayOfMonth = lastday(currentYear, parseInt(monthValue) - 1);
    let selectedDay = parseInt(mon[column - 1]) + parseInt(row) - 1;

    if (selectedDay > lastDayOfMonth) {
        let newDay = parseInt(selectedDay) - parseInt(lastDayOfMonth)
        let newMonth = monthValue + 1;
        finalValue = newDay + "/" + newMonth + "/" + currentYear;
    } else if(selectedDay <= lastDayOfMonth) {
        finalValue = selectedDay + "/" + monthValue + "/" + currentYear;
    }else{
        finalValue = "";
    }
    

    console.log(clickedId);
    document.getElementById("value").innerHTML = finalValue;

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

    return currentQuarter;
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