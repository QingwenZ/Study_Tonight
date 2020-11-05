var useremail = document.getElementById("InputEmail").value;
var userpassword =document.getElementById("InputPassword").value;
const loginErrorMsg = document.getElementById("login-error-msg");
function myFunction(){

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://studytonight.web.illinois.edu/customers", false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            alert ("Login successfully");
            window.location = "main.html"; // Redirecting to other page.
        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
        }
    };
    console.log("aboou to send!")
    xhttp.send();
    console.log("about to return!")
  }

