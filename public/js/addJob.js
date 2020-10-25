// js/addJob.js
/** JS for creating a new job screen
*Ean Vandergraaf, Laura Pareja,
*Carter Williams, Seth Workman
*KC Fed Code-A-Thon - Covid Project
*10/25/2020
*/
$(function() {

    $("#addJobForm").submit((e)=>{
        e.preventDefault();
        $.ajax({
            url: "api/job/create",
            type: "POST",
            data: {
                job_name: $("#job_name").val(),
                scheduled_hours: $("#scheduled_hours").val(),
                pay: $("#pay").val(),
                certifications: $("#certifications").val(),
                start_date: $("#start_date").val(),
                end_date: $("#end_date").val(),
                description: $("#description").val(),
            },
            headers: {"x-auth": window.localStorage.getItem("token")},
            success: function() {
                window.location.href = "/homeCompanies.html"; },
            error: function() {window.location.href = "/logInUser.html";}
        });
    });
    $("#cancelBtn").click(function(){
        window.location.href = "/homeCompanies.html";
    })
});
