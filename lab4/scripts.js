/// validation

var errors = [];

function validateNotEmpty(inputElement) {
    if (inputElement === undefined || inputElement.value.length === 0 || !inputElement.value.trim()) {
        showError(inputElement.id);
        return;
    }
    hideError(inputElement.id);
    
}

function validatePositiveInt(inputElement) {
    var int = parseInt(inputElement.value);
    if (/^\+?[0-9]+$/.test(int)){
        hideError(inputElement.id);
        return;
    }
    showError(inputElement.id);
    
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
    errors.push(id);
    $("#" + id + "Error").show();
}

function hideError(id){
    errors.splice(errors.indexOf(id),1);
    $("#"+ id + "Error").hide();
}

//crud logic

var idCounter = 0;

function save() {
   // if (errors.length === 0){
        var li =  $("<li id=listItem"+ idCounter++ +"></li>");
        li.append(createSpanWithText($("#data")).value);
        li.append(createSpanWithText($("#pavadinimas")).value);
        li.append(createSpanWithText($("#ivertinimas")).value);
        $("#list").append(li);
    //}
}

function createSpanWithText(text){
    return $("<span>"+ text +"</span>")
}

