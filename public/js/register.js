function checkForm() {
   // TODO: Perform input validation
    var u = document.getElementById("u");
    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var passwordC = document.getElementById("passwordConfirm");
    var e = document.getElementById("formErrors");
    var valid = [false,false,false,false,false,false,false];

    //clear unorderedList item
    while( u.firstChild ){
        u.removeChild( u.firstChild );
    }

    // check if fullName is empty
   if(fullName.value.length <1){
        var l = document.createElement("li");
        var error = document.createTextNode("Missing full name."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        fullName.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[0]=true;

   // check if email is empty and is valid
   var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   var result = re.exec(email.value);
   if(email.value.length<=0 || result ==null){
        var l = document.createElement("li");
        var error = document.createTextNode("Invalid or missing email address."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        email.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[1]=true;

   // check if password has >=10 and <=20 character
   if(password.value.length<10 || password.value.length>20){
        var l = document.createElement("li");
        var error = document.createTextNode("Password must be between 10 and 20 characters."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[2]=true;


   // check if password contain at least one lowercase character
   re = /[a-z]/;
   result = re.exec(password.value);
   if(result == null){
        var l = document.createElement("li");
        var error = document.createTextNode("Password must contain at least one lowercase character."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[3]=true;

   re = /[A-Z]/;
   result = re.exec(password.value);
   if(result == null){
        var l = document.createElement("li");
        var error = document.createTextNode("Password must contain at least one uppercase character."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[4]=true;

   re = /[0-9]/;
   result = re.exec(password.value);
   if(result == null){
        var l = document.createElement("li");
        var error = document.createTextNode("Password must contain at least one digit."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[5]=true;

   if(passwordC.value != password.value){
        var l = document.createElement("li");
        var error = document.createTextNode("Password and confirmation password don't match."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        passwordC.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[6]=true;


    for(var i=0;i<valid.length;i++){
        if(valid[i]==false){
            e.style.display = "block";
            return;
          }
    }
    e.style.display = "none";

   const xhr = new XMLHttpRequest();
    xhr.onload=function(){
      console.log(this.responseText);
    }
    xhr.open('POST',"register");
    xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      username:fullName.value,
      password:password.value,
      email:email.value
    }));
    console.log("sent");


}


document.getElementById("submit").addEventListener("click", function(event) {
   checkForm();

   // Prevent default form action. DO NOT REMOVE THIS LINE
   event.preventDefault();
});
