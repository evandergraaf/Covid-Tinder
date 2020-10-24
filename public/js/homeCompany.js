$(function() {
    
    $("#logOut").click(function(){
        window.localStorage.removeItem("token");
    });
});

$(function() {
    $("#logIn").click(function(){
        window.localStorage.removeItem("token");
    });
})