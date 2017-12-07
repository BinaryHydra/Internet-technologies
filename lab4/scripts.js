var events = [];
$(document).ready(createCalendar(new Date()));
var calendarDate;

//calendar

function createCalendar(monthDate) {
    monthDate.setDate(1)
    calendarDate = monthDate;
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
            row.append($("<td id=\"td"+j +"\">"+ (j++)+"</td>"));;
        }
    }
    calendar.append(row);
}

function daysInMonth(date) {
    return new Date(date.getYear(), date.getMonth()+1, 0).getDate();
}

function addEvent(idVar,nameVar, dateVar, numberVar){
    events.push({id:idVar, name:nameVar, date:dateVar, number:numberVar});
}

function findEventById(id){
    return events.find(event => event.id = id);
}

function findEventIndexById(id){
    return events.findIndex(event => event.id = id);
}

function removeEvent(id) {
    var event = findEventById(id);
    var date = event.date;
    events.splice(findEventIndexById(id), 1);
    redrawDate(date);
}

function updateEvent(id, name, date, number) {
    var event = findEventById(id);
    oldDate = event.date;
    event.name = name;
    event.date = date;
    event.number = number;
    redrawDate(oldDate);
    redrawDate(date);
}

function drawEvents(){
    for (var i = 0; i< events.length; i++) {
        var event = events[i]   
        date = parseDate(event.date);
        if (date.getMonth() === calendarDate.getMonth() && date.getYear() === calendarDate.getYear()){
            addStyle($("#td" + date.getDate()));
        }
    }
}

function addStyle(element){
    element.css(
        {
            "border-color": "rgb(20,235,10)"
        }
    )
}

function redrawDate(date){
    jsDate = parseDate(date);
    if (jsDate.getMonth() !== calendarDate.getMonth() || jsDate.getYear() !== calendarDate.getYear()){
        console.log("no");
        return;
    }
    var td = $("#td" + jsDate.getDate());
    td.removeAttr("style");
    for (var i = 0; i< events.length; i++) {
        var event = events[i];
        if (event.date === date) {   
            addStyle(td);
        } 
    }
}

function parseDate(dateString){
    var elements = dateString.split("-");
    return new Date(elements[0],elements[1]-1,elements[2]);
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
    addEvent(idCounter,name, date, assessment);
    appendList(name, date, assessment);
    idCounter++;
    drawEvents()
}

function appendList(name, date, assessment) {
    var li =  $("<li id=\"listItem"+idCounter+"\" onClick=\"edit(this)\"></li>");
    li.append(createSpanWithText(date, "date" + idCounter));
    li.append(createSpanWithText(name, "name" + idCounter));
    li.append(createSpanWithText(assessment,"assessment" +idCounter));
    $("#list").append(li);
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
    if (edit === undefined) {
        return
    }
    $("#"+editId).remove();
    changeEditMode(false);
    removeEvent(editId);
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
    updateEvent(editId,name,date,assessment);
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

// saving(

var saveUri;

function updateUri(uri){
    saveUri = uri;
    showUri();
}
function showUri() {
   console.log($("#uri"));
    $("#uri").text(saveUri);
}


function initialize() {
    $("#status").text("");
    var data = JSON.stringify(events);
    $.ajax({
        url:"https://api.myjson.com/bins",
        type:"POST",
        data: data,
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data, textStatus, jqXHR){
            $("#status").text(textStatus);
            saveUri = data.uri;
            showUri();
        },
        error: function (jqXHR, textStatus, errorThrown){
            $("#status").text(textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
        }
    });
    
}

function serialize(){
    $("#status").text("");
    var data = JSON.stringify(events);
    $.ajax({
        url: saveUri,
        type: "PUT",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            $("#status").text(textStatus);
        },
        error: function (jqXHR, textStatus, errorThrown){
            $("#status").text(textStatus);
            console.log(jqXHR);
            console.log(errorThrown);
        }
    });
}

function deserialize(){
    $("#status").text("");
    $.get(saveUri, function (data, textStatus, jqXHR) {
        $("#status").text(textStatus);
        if (textStatus === "success") {
            events = data;
            console.log(events);
            events.forEach(event => {
                addEvent(event.id, event.name, event.date, event.number);
                appendList(event.name, event.date, event.number);
            });
            drawEvents()
        }
    });
}