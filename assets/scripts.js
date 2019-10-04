/* global $*/
const zipCodeURL = 'https://cst336.herokuapp.com/projects/api/cityInfoAPI.php',
    countyURL = 'https://cst336.herokuapp.com/projects/api/countyListAPI.php',
    stateURL = 'https://cst336.herokuapp.com/projects/api/state_abbrAPI.php',
    usernameURL = 'https://cst336.herokuapp.com/projects/api/usernamesAPI.php';

var usernameAvailable = false;

function getZipCode(zipcode){
    $.ajax({
        method: "GET",
        url: zipCodeURL,
        dataType: "json",
        data: {"zip": zipcode},
        success: function(data){
            $("#city").html(data.city);
        }
    });
}

function getCounty(state){
    $.ajax({
        method: "GET",
        url: countyURL,
        dataType: "json",
        data: {"state": state},
        success: function(data){
            let countyList = $("#county");
            $(countyList).html("");     //  Clear list each time
            data.forEach(function(i){
                $(countyList).append(`<option>${i.county}</option>`)
            });
        }
    });
}

function checkUsername(name){
    $.ajax({
        method: "GET",
        url: usernameURL,
        dataType: "json",
        data: {"username": name},
        success: function(data){
            if(data.available){
                $("#username_error").html("Username is available!");
                $("#username_error").css('color', "green");
                usernameAvailable = true;
            }
            else{
                $("#username_error").html("Username is unavailable!");
                $("#username_error").css('color', "red");
                usernameAvailable = false;
            }
        }
    });
}

function isFormValid(){
    let isValid = true,
        checkPassword = $("#password").val();
    if(!usernameAvailable || ($("#username").val().length == 0) )
        isValid = false;
        
    if($("#username").val().length == 0){
        $("#username_error").html("Username is required");
        $("#username_error").css('color', 'black');
        isValid = false;
    }
        
    if( (checkPassword != $("#passwordAgain").val()) ){
        $("#passwordAgainError").html("Passwords mismatch!");
        isValid = false;
    }
    
    if( (checkPassword.length < 6) ){
        $("#passwordAgainError").html("Password must be longer than 6 characters");
        isValid = false;
    }
    
    return isValid;
}

function getStates(){
    $.ajax({
        method: "GET",
        url: stateURL,
        dataType: "json",
        data: {},
        success: function(data){
            let stateList = $("#state");
            $(stateList).html("");     //  Clear list each time
            data.forEach(function(i){
                $(stateList).append(`<option value="${i.usps}">${i.state}</option>`)
            });
            getCounty($(stateList).val());
        }
    });
}

getStates();

$("#zip").on('change', function(){
    let zipcode = this.value;
    getZipCode(zipcode);
});

$("#state").on('change', function(){
   let state = this.value;
   getCounty(state);
});

$("#username").on('change', function(){
   let username = $("#username").val();
   checkUsername(name);
});

$("#form").on('submit', function(e){
    if(!isFormValid())
        e.preventDefault();
    else{
        
    }
});