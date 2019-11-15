function checkForm() {
   // TODO: Perform input validation
    var formError = document.getElementById("unorderedList");
    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmP = document.getElementById("passwordConfirm");
    var test = [false,false,false,false,false,false,false];

    //clear unorderedList item
    while( formError.firstChild ){
        formError.removeChild( formError.firstChild );
    }

    // check if fullName is empty
   if(fullName.value.length <=0){
        var item = document.createElement("li");
        var error = document.createTextNode("Missing full name."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        fullName.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[0]=true;

   // check if email is empty and is valid
   var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   var result = re.exec(email.value);
   if(email.value.length<=0 || result ==null){
        var item = document.createElement("li");
        var error = document.createTextNode("Invalid or missing email address."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        email.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[1]=true;

   // check if password has >=10 and <=20 character
   if(!(password.value.length>=10 && password.value.length<=20)){
        var item = document.createElement("li");
        var error = document.createTextNode("Password must be between 10 and 20 characters."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[2]=true;


   // check if password contain at least one lowercase character
   re = /[a-z]/;
   result = re.exec(password.value);
   if(result == null){
        var item = document.createElement("li");
        var error = document.createTextNode("Password must contain at least one lowercase character."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[3]=true;

   re = /[A-Z]/;
   result = re.exec(password.value);
   if(result == null){
        var item = document.createElement("li");
        var error = document.createTextNode("Password must contain at least one uppercase character."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[4]=true;

   re = /[0-9]/;
   result = re.exec(password.value);
   if(result == null){
        var item = document.createElement("li");
        var error = document.createTextNode("Password must contain at least one digit."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[5]=true;

   if(!(confirmP.value == password.value)){
        var item = document.createElement("li");
        var error = document.createTextNode("Password and confirmation password don't match."); // assign error
        item.appendChild(error);
        formError.appendChild(item);
        confirmP.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        test[6]=true;

   document.getElementById("formErrors").style.display = "block";

    for(var i=0;i<test.length;i++){
        if(test[i]==false)
            return;
    }

    document.getElementById("formErrors").style.display = "none";

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
}


document.getElementById("submit").addEventListener("click", function(event) {
   checkForm();

   // Prevent default form action. DO NOT REMOVE THIS LINE
   event.preventDefault();
});
