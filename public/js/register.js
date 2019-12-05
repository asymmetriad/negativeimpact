function checkForm() {
   // TODO: Perform input validation
    let u = document.getElementById("u");
    let fullName = document.getElementById("fullName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordC = document.getElementById("passwordConfirm");
    let e = document.getElementById("formErrors");
    let valid = [false,false,false,false,false,false,false];

    //clear unorderedList item
    while( u.firstChild ){
        u.removeChild( u.firstChild );
    }

    // check if fullName is empty
   if(fullName.value.length <1){
        let l = document.createElement("li");
        let error = document.createTextNode("Missing full name."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        fullName.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[0]=true;

   // check if email is empty and is valid
   let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   let result = re.exec(email.value);
   if(email.value.length<=0 || result ==null){
        let l = document.createElement("li");
        let error = document.createTextNode("Invalid or missing email address."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        email.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[1]=true;

   // check if password has >=10 and <=20 character
   if(password.value.length<10 || password.value.length>20){
        let l = document.createElement("li");
        let error = document.createTextNode("Password must be between 10 and 20 characters."); // assign error
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
        let l = document.createElement("li");
        let error = document.createTextNode("Password must contain at least one lowercase character."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[3]=true;

   re = /[A-Z]/;
   result = re.exec(password.value);
   if(result == null){
        let l = document.createElement("li");
        let error = document.createTextNode("Password must contain at least one uppercase character."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[4]=true;

   re = /[0-9]/;
   result = re.exec(password.value);
   if(result == null){
        let l = document.createElement("li");
        let error = document.createTextNode("Password must contain at least one digit."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        password.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[5]=true;

   if(passwordC.value != password.value){
        let l = document.createElement("li");
        let error = document.createTextNode("Password and confirmation password don't match."); // assign error
        l.appendChild(error);
        u.appendChild(l);
        passwordC.style.border = "2px solid rgb(255, 0, 0)";
   }
   else
        valid[6]=true;


    for(let i=0;i<valid.length;i++){
        if(valid[i]==false)
            e.style.display = "block";
            return;
    }
    e.style.display = "none";
   
   const xhr = new XMLHttpRequest();
    xhr.onload=function(){
      console.log(this.responseText);
    };
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
