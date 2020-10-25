$(function() {
    
    $("#logOut").click(function(){
        window.localStorage.removeItem("token");
    });
    
    $("#searchBtn").click(() => {
        var jobs = []
            var keyword = $("#keywords").val().toLowerCase();
            $.get("api/job/list",(data)=>{
                //search based off name
                for(var i = 0; i<data.length; i++){
                    var job_name = data[i].job_name.toLowerCase();
                    if(job_name.includes(keyword)){
                           jobs.push(data[i]);
                           data[i]="";
                    }
                }
                console.log(data);
                for(var i = 0; i<data.length; i++){
                    if(data[i] != ""){
                        var desc = data[i].description.toLowerCase();
                        var email = data[i].store_email.toLowerCase();
                        var cert = data[i].certifications_needed.toLowerCase();
                        
                        var rest = desc + email + cert;
                        if(rest.includes(keyword)){
                            jobs.push(data[i]);
                        }
                    }
                }
     });
        console.log(jobs);
    });
    
     
})

