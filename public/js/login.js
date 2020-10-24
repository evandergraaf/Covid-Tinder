//js/login.js
//
//js for login screen

const DEBUG = true;
$(function() {   
   //will post the user to verify is they are in the system or not
   function login(username, password) {
       
       if(DEBUG){
            console.log("requesting data");
            console.log(username);
            console.log(password);
       }
       
       var requestData = { username: username, password: password };
       
       if(DEBUG){
           console.log(requestData);
       }
       //posting to the api to check the SQL server user table to see if the username and password submitted matches the data in the table
       $.post("api/auth", requestData, function(data, status) {
          if(DEBUG){
            console.log("posting");
          }
         //a verified token has been returned -> user has been authenticated
         if (data.token) {
             if(DEBUG){
                console.log("inside");
             }
             //adds the token and username to the local storage
             window.localStorage.setItem("token", data.token);
             window.localStorage.setItem("username", data.username);
             
             window.location.href = "/homeUsers.html";
         }
         //the user sumbitted something wrong -> user has not been authenticated
         else {
             if(DEBUG){
                console.log("error");
                console.log(data.error);
             }
             //the user submitted a wrong username
             if(data.error == "bad username"){
                 $("#errorMsg").html("Wrong username");
             }
             //the user submitted a wrong password
             else if(data.error == "bad password"){
                 $("#errorMsg").html("Wrong password");
            }
         }
          
       if(DEBUG){  
           console.log("outside");
       }
    }); 
   }
   //when the user clicks login will check their username and password
   $("#loginBtn").click(function(e) {
       //must prevent the standard SQL call of a get call in the url
       e.preventDefault();
        if(DEBUG){
            console.log("logging in");
        }
       
      login($("#username").val(), $("#password").val());        
   });
    
});
