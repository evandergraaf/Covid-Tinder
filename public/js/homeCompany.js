$(function() {
    
    $("#logOut").click(function(){
        window.localStorage.removeItem("token");
    });
});