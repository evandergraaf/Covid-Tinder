$(function() {
    
    console.log("in");
    $("#logOut").click(function(){
        window.localStorage.removeItem("token");
    });
})
