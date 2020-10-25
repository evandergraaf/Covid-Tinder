$(function() {
    
    $("#logOut").click(function(){
        window.localStorage.removeItem("token");
    });
        $("#searchBtn").click(() => {
            console.log($("#keywords").val());
    });
    
     $.get("api/job/list",(data)=>{
         console.log(data);
     });
})

