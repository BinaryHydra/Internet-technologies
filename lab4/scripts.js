
var input = [];
$(document).ready(createCalendar(new Date()));

//calendar

function createCalendar(monthDate) {
    monthDate.setDate(1)
    var startingWeekDay = monthDate.getDay();
    var calendar = $("#cal");
   
    if (startingWeekDay == 0) // Sunday 
        {startingWeekDay = 7;}
    startingWeekDay = startingWeekDay -1;
    var row;
    var monthDays = daysInMonth(monthDate);
    for (var i=0,j=1; i < monthDays+startingWeekDay; i++)  { // Week start fix 
        if (i % 7 === 0) {
            row = $("<tr/>");
        }
        calendar.append(row);
        if (i < startingWeekDay) {
            row.append($("<td/>")) 
        } else {
            row.append($("<td>"+ (j++)+"</td>"));;
        }
    }
    calendar.append(row);
}

function daysInMonth(date) {
    return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
}

function addEvent(nameVar, dateVar, numberVar){
    input.push({name:nameVar, date: dateVar, number:numberVar});
}

function drawEvents(){
    $("td")
}

// validation

function validateNotEmpty(inputElement) {
    if (checkIfEmpty(inputElement.value)) {
        showError(inputElement.id);
        return;
    }
    hideError(inputElement.id);
    
}
function checkIfEmpty(input){
        return input.trim().length === 0
}

function validatePositiveInt(inputElement) {
    if (checkIfIntIsPositive(inputElement.value)){
        hideError(inputElement.id);
        return;
    }
    showError(inputElement.id);
    
}

function checkIfIntIsPositive(input){
    return /^\+?[0-9]+$/.test(input)
}

function validateDate(inputElement) {
    if (checkIfDateIsValid(inputElement.value)) {
        hideError(inputElement.id);
    } else {
        showError(inputElement.id);
    }
}

function checkIfDateIsValid (input) {
    var elements = input.split("-");
    var year = parseInt(elements[0]);
    var month = parseInt(elements[1])-1;
    var day = parseInt(elements[2]);
    if ((day < 10 && elements[2].length > 1)|| elements[2].length > 2) {
        return false;
    }
    if (year === undefined || month === undefined || day === undefined || Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day) || year < 1900 || year >9999 || month < 0 || month > 11 || day < 1 || day > 31){
        return false;
    }
    var newdate = new Date(year,month,day);
    if (newdate.getDate() != day) {
        return false;
    }
    return true;
} 

function showError(id){
    $("#" + id + "Error").show();
}

function hideError(id){
    $("#"+ id + "Error").hide();
}

//save logic

var idCounter = 0;

function save() {
    var name = $("#pavadinimas").val()
    var date = $("#data").val()
    var assessment = $("#ivertinimas").val();
    if (checkIfEmpty(name) || !checkIfDateIsValid(date) || !checkIfIntIsPositive(assessment)) {
        //console.log("cannot save" + checkIfEmpty(name) + !checkIfDateIsValid(date) + !checkIfIntIsPositive(assessment) )
        return;
    }
    if (editMode) {
        changeEditMode(false);
    }
    appendList(name, date, assessment);
}

function appendList(name, date, assessment) {
    var li =  $("<li id=\"listItem"+idCounter+"\" onClick=\"edit(this)\"></li>");
    li.append(createSpanWithText(date, "date" + idCounter));
    li.append(createSpanWithText(name, "name" + idCounter));
    li.append(createSpanWithText(assessment,"assessment" +idCounter));
    $("#list").append(li);
    idCounter++;
}

function createSpanWithText(text, id){
    return $("<span id="+ id +">"+ text +"</span>")
}

// editLogic

var editMode  = false;
var editId;

function edit(li){
    $("#pavadinimas").val($("#"+li.id+ " > " + "span[id^=name]").text());
    $("#data").val($("#"+li.id+ " > " + "span[id^=date]").text());
    $("#ivertinimas").val($("#"+li.id+ " > " + "span[id^=assessment]").text());
    editId = li.id;
    changeEditMode(true);
}

function deleteNode(){
    if (edit !== undefined) {
        $("#"+editId).remove();
        changeEditMode(false);
    }
}

function saveEdit(){
    if (edit === undefined) {
        return;
    }
    var name = $("#pavadinimas").val()
    var date = $("#data").val()
    var assessment = $("#ivertinimas").val();
    if (checkIfEmpty(name) || !checkIfDateIsValid(date) || !checkIfIntIsPositive(assessment)) {
        //console.log("cannot save" + checkIfEmpty(name) + !checkIfDateIsValid(date) + !checkIfIntIsPositive(assessment) )
        return;
    }
    if (editMode) {
        changeEditMode(false);
    }
    $("#"+editId+ " > " + "span[id^=name]").text(name);
    $("#"+editId+ " > " + "span[id^=date]").text(date);
    $("#"+editId+ " > " + "span[id^=assessment]").text(assessment) ;
}

function changeEditMode(boolean) {
    editMode = boolean;
    if (editMode) {
        $("#saveEditButton").show();
        $("#deleteButton").show();
    } else {
        $("#saveEditButton").hide();
        $("#deleteButton").hide();
    }
}
