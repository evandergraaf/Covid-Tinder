$(function(){

    function htmlBody(){
        $.ajax({
            url: "api/job/list/company",
            type: "GET",

            headers: {"x-auth": window.localStorage.getItem("token")},
            success: function(data) {

                var counter = 0;
                var html = "";
                var idList = [];
                for (var j=0; j<data.length; j++){

                    // every 4 entries we have to create a new row or close the row
                    if((counter%3 == 0)){
                        html += "<div class='row'>\n";
                    }

                    var btnID = "delete" + data[j].job_id;
                    idList.push(btnID);
                    
                    // create the card for the job
                    html += "<div class='col-sm'>\n <div class='card' style='width: 20rem;'>\n <div class='card-body'>\n <h5 class='card-title'>" + data[j].job_name + "</h5>\n <p class='card-text'>" + data[j].description + "</p>\n </div>\n <ul class='list-group list-group-flush'>\n <li class='list-group-item'>Duration: " + data[j].start_date + "-" + data[j].end_date + "</li>\n <li class='list-group-item'>Schedule: " + data[j].scheduled_hours + "</li>\n <li class='list-group-item'>Location: " + data[j].address + "</li>\n <li class='list-group-item'>Salary: " + data[j].pay + "$/h</li>\n <li class='list-group-item'>Certifications needed: " + data[j].certifications_needed + "</li>\n <li class='list-group-item'>\n <button type='button' class='btn btn-outline-warning' id=" + btnID + " " + ">Delete Job</button>\n  </li>\n </ul>\n </div>\n </div>\n ";

                    if((counter != 0) && (counter%3 == 2) || (counter >= data.length+1)){
                        html += "</div>";
                    }
                    counter = counter + 1;
                }

                // place job cards back in html
                $("#jobCards").html(html);
                
                //delete job function
                deleteBtn(idList);
            },
            error: function() {console.log('error')}
        });
    };

    function deleteBtn(idList){
        for (let i = 0; i < idList.length; i++){
            $("#" + idList[i]).click(function(){
                $.post('/api/job/delete',{job_id: idList[i].slice(-1)}, function(data){
                    console.log(data);
                })
            });
        }
    }
    
     htmlBody();
   
});

               