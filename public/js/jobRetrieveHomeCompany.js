$(function(){


    $.ajax({
        url: "api/job/list/company",
        type: "GET",

        headers: {"x-auth": window.localStorage.getItem("token")},
        success: function(data) {
            console.log("data:" + data);

            //for(var i=0; i< data.length; i++){
            //        console.log(data[i].job_name);
            //  }

            var counter = 0;
            var html = "";
            for (var j=0; j<data.length; j++){

                    console.log("job name: " + data[j].job_name);
                    console.log("schedule hours: " + data[j].scheduled_hours);
                    console.log("payment: " + data[j].pay);
                    console.log("certification: " + data[j].certifications);
                    console.log("starting date: " + data[j].start_date);
                    console.log("endidng date: " + data[j].end_date);
                    console.log("description: " + data[j].description);
                    console.log("location: " + data[j].location);


                // every 4 entries we have to create a new row or close the row
                console.log("counter: " + counter);
                if((counter%3 == 0)){
                    console.log("inside first if");
                    html += "<div class='row'>\n";
                }


                // create the card for the job
                html += "<div class='col-sm'>\n <div class='card' style='width: 20rem;'>\n <div class='card-body'>\n <h5 class='card-title'>" + data[j].job_name + "</h5>\n <p class='card-text'>" + data[j].description + "</p>\n </div>\n <ul class='list-group list-group-flush'>\n <li class='list-group-item'><b>Duration: </b>" + data[j].start_date + "-" + data[j].end_date + "</li>\n <li class='list-group-item'><b>Schedule: </b>" + data[j].scheduled_hours + "</li>\n <li class='list-group-item'><b>Location: </b>" + data[j].location + "</li>\n <li class='list-group-item'><b>Salary: </b>" + data[j].pay + "$/h</li>\n <li class='list-group-item'><b>Certifications needed: </b>" + data[j].certifications_needed + "</li>\n <li class='list-group-item'>\n <button type='button' class='btn btn-outline-warning'>Delete Job</button>\n  </li>\n </ul>\n </div>\n </div>\n ";

                console.log(counter);
                if((counter != 0) && (counter%3 == 2) || (counter >= data.length+1)){
                    console.log("inside second if");
                    html += "</div>";
                }
                counter = counter + 1;
            }

            console.log("html to add: " + html);
            $("#jobCards").html(html);
        },
        error: function() {window.location.href = "/logInUser.html";}
    });
})