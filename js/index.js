var loginButton = document.getElementById("login");
var errorMessage = document.getElementById("error-message");
var error;

loginButton.addEventListener("click", () => {
    let retrieveUserData = getFormValue();
    verifyAllData(retrieveUserData.username, retrieveUserData.password)
});

function getFormValue(){
    var regUsername = document.getElementById("username");
    var regPassword = document.getElementById("password");

    var userData = {
        "username" : regUsername.value.toLowerCase(),
        "password" : regPassword.value,
    }
    return userData;
}

function verifyAllData(regUsername,regPassword){
    const confirmPassword = emptyPassword(regPassword);
    const confirmUsername = checkUsername(regUsername);
    if(confirmPassword && confirmUsername){
       compareWithDb(regUsername,regPassword);
    }
}

function checkUsername(regUsername){
    if(regUsername.length > 3){
      return true;
    }else{
        errorDisplay("Username is too Short");
      return false;
    }
}

function emptyPassword(regPassword){
    if(regPassword.length > 0){
        return true;
    }else{
        console.log(regPassword.length)
        errorDisplay("Password Cannot be Empty");
        return false;
    }
}

function compareWithDb (confirmUsername,confirmPassword){
    let getUser = getDbValues("profile");
    let rowUsername = getUser.name.toLowerCase();

    if(rowUsername.search(confirmUsername) >= 0){
        if(getUser.password === confirmPassword){
           login();
        }else{
            errorDisplay("Password is incorrect!!");
        }
    }else{
        errorDisplay("Username does not exist, kindly register an account");
    }
}

function getDbValues(rowId){
    let userData = JSON.parse(localStorage.getItem(rowId));
    if(userData !== null) {
        return userData;
    }else{
        errorDisplay("Account Not Found, kindly Register!!!");
    }
  
}

function errorDisplay(errorName){
    error = errorName;
    errorMessage.innerText = error;
    errorMessage.style.color = "red";
    errorMessage.style.fontFamily= "monospace";
}

function login(){
    error = "";
    errorMessage.innerText =  "Logging in...";
    errorMessage.style.color = "purple";
    errorMessage.style.fontFamily = "sans-serif";
    location.href = "quiz.html";
}

