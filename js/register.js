var regButton = document.getElementById("registration-button");
var errorMessage = document.getElementById("error-message");
var biodata = {};
var error;

regButton.addEventListener("click", () => {
    
    let retrieveUserData = getFormValue();
    verifyAllData(retrieveUserData.username, retrieveUserData.email, retrieveUserData.password, retrieveUserData.confirmPassword);

});

function getFormValue(){
    var regUsername = document.getElementById("username");
    var regEmail = document.getElementById("email");
    var regPassword = document.getElementById("password");
    var regConfirmpassword = document.getElementById("confirm-password");

    var userData = {
        "username" : regUsername.value,
        "email"    : regEmail.value,
        "password" : regPassword.value,
        "confirmPassword" : regConfirmpassword.value
    }

    return userData;

}



function verifyAllData(regUsername, regEmail, regPassword, regConfirmpassword){
    const confirmPassword = emptyPassword(regPassword,regConfirmpassword);
    const confirmEmail = checkEmail(regEmail);
    const confirmUsername = checkUsername(regUsername);
    if(confirmPassword && confirmEmail && confirmUsername){
       confirmRegistration();
    }else{
        errorMessage.innerText = error;
        errorMessage.style.color = "red";
        errorMessage.style.fontFamily= "monospace";
    }
}

function checkUsername(regUsername){
    if(regUsername.length > 3){
      biodata.name = regUsername;
      return true;
    }else{
        errorDisplay("Username is too Short");
    }
}

function emptyPassword(regPassword,regConfirmpassword){
    if(regPassword.length > 0){
      if( emptyConfirmPassword(regPassword,regConfirmpassword) ) { return true } 
    }else{
        errorDisplay("Password Cannot be Empty");
    }
}
    
function emptyConfirmPassword(regPassword,regConfirmpassword){
    if(regConfirmpassword.length > 0){
      if(checkPassword(regPassword,regConfirmpassword) ) { return true }
    }else{
        errorDisplay("Confirm password cannot be empty");
    }
}

function checkPassword(regPassword,regConfirmpassword){
    var confirm = comparePassword(regPassword,regConfirmpassword);
    if(confirm){
        biodata.password = regPassword;
        biodata.confirmpassword = regConfirmpassword;
        return true;
    }else{
        errorDisplay("Password does not match");
    }

}

function comparePassword(regPassword,regConfirmpassword){
        if(regPassword === regConfirmpassword){
            return true;
        }else{
            errorDisplay("Password does not matches");
        }
    }

function checkEmail(regEmail){
    if(regEmail.length > 9){
        biodata.email = regEmail;
        return true;
    }else{
        errorDisplay("Invalid Email address");
    }
}


function confirmRegistration () {
    let storeUser = localStorage.setItem("profile", JSON.stringify(biodata));
        errorMessage.innerText =  "Registration Successfuly Done!"
        errorMessage.style.color = "purple";
        errorMessage.style.fontFamily = "sans-serif";
    
}

function errorDisplay(errorName){
    error = errorName;
    return false;
    
}


