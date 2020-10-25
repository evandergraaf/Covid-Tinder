$(function(){

    function htmlBody() {
        var token = window.localStorage.getItem("token");
        var url = "api/job?u=" + token;


        //get all job aviable in the data base
        $.get("api/job/list", (data) => {
            
            var counter = 0;
            var html = "";
            var idList = [];
            for (var j = 0; j < data.length; j++) {

                // every 4 entries we have to create a new row or close the row
                if ((counter % 3 == 0)) {
                    html += "<div class='row'>\n";
                }

                var btnID = "apply" + data[j].job_id;
                idList.push(btnID);
                // create the card for the job
                html += "<div class='col-sm'>\n <div class='card' style='width: 30rem;'>\n <div class='card-body'>\n <h5 class='card-title'>" + data[j].job_name + "</h5>\n <p class='card-text'>" + data[j].description + "</p>\n </div>\n <ul class='list-group list-group-flush'>\n <li class='list-group-item'><b>Duration: </b>" + data[j].start_date + "-" + data[j].end_date + "</li>\n <li class='list-group-item'><b>Schedule: </b>" + data[j].scheduled_hours + "</li>\n <li class='list-group-item'><b>Location: </b>" + data[j].address + "</li>\n <li class='list-group-item'><b>Salary: </b>" + data[j].pay + "$/h</li>\n <li class='list-group-item'><b>Certifications needed: </b>" + data[j].certifications_needed + "</li>\n  <li class='list-group-item'>\n <button type='button' class='btn btn-outline-warning' id=" + btnID + " " + ">Apply</button>\n  </li>\n </ul>\n </div>\n </div>\n ";

                if ((counter != 0) && (counter % 3 == 2) || (counter >= data.length + 1)) {
                    html += "</div>";
                }
                counter = counter + 1;
            }
            
            $("#jobCards").html(html);
            applyButton(idList);
            
     $("#searchBtn").click(() => {
        $(".col-sm").slideUp();
        setTimeout(function(){


        var jobs = []
            var keyword = $("#keywords").val().toLowerCase();
        var radius = $("#demo").html();
            $.ajax({
                url: "api/job/searchInRadius",
                type: "POST",
                data: {keyword: keyword, radius: Number(radius)},
                headers: {"x-auth": window.localStorage.getItem("token")},
                success: function(data) {
                    //search based off name
                    for(var i = 0; i<data.length; i++){
                        var job_name = data[i].job_name.toLowerCase();
                        if(job_name.includes(keyword)){
                            jobs.push(data[i]);
                            data[i]="";
                        }
                    }
//                console.log(data);
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


                    var counter = 0;
                    var html = "";
                    for (var j=0; j<jobs.length; j++){
                        if((counter%3 == 0)){
                            html += "<div class='row'>\n";
                        }
                        // create the card for the job
                        html += "<div class='col-sm'>\n <div class='card' style='width: 30rem;' id='searchCards'>\n <div class='card-body'>\n <h5 class='card-title'>" + jobs[j].job_name + "</h5>\n <p class='card-text'>" + jobs[j].description + "</p>\n </div>\n <ul class='list-group list-group-flush'>\n <li class='list-group-item'><b>Duration: </b>" + jobs[j].start_date + "-" + jobs[j].end_date + "</li>\n <li class='list-group-item'><b>Schedule: </b>" + jobs[j].scheduled_hours + "</li>\n <li class='list-group-item'><b>Location: </b>" + jobs[j].address + "</li>\n <li class='list-group-item'><b>Salary: </b>" + jobs[j].pay + "$/h</li>\n <li class='list-group-item'><b>Certifications needed: </b>" + jobs[j].certifications_needed + "</li>\n  <li class='list-group-item'><b>Distance: </b>" + jobs[j].distance + " miles </li>\n   <li class='list-group-item'>\n <button type='button' class='btn btn-outline-warning' id=" + btnID + " " + ">Apply</button>\n  </li>\n </ul>\n </div>\n </div>\n ";

                        if((counter != 0) && (counter%3 == 2) || (counter >= data.length+1)){
                            html += "</div>";
                        }
                        counter = counter + 1;
                    }

                    $("#jobCards").html(html);

                    applyButton(idList);
                }
            });
        }, 1000);
     });
        })
    }


    function applyButton(idList){
        for (let i = 0; i < idList.length; i++){
            $("#" + idList[i]).click(function(){
                $.ajax({
                    url: "api/job/apply",
                    type: "POST",
                    data: {job_id: idList[i].slice(-1)},
                    headers: {"x-auth": window.localStorage.getItem("token")},
                    success: function(data) {
                        window.location.reload();
                    }
                });
            });
        }
    }

    htmlBody();
        $.ajax({
            url: "api/job/user/apply/list",
            type: "GET",
            headers: {"x-auth": window.localStorage.getItem("token")},
            success: function(data) {
                var html="<div class='row'>";
                
                for (var j = 0; j < data.length; j++) {
                    html += "<div class='col-sm-6'><div class='card'><div class='card-body'>";
                    html += "<h5 class='card-title'>"+data[j].job_name+"</h5><p class='card-text'>" + data[j].description + "</p></div></div></div>"
                }
                html += "</div>";
                $("#jobApply").html(html);
            }
        }); 

})
