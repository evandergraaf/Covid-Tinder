$(function() {

    $("#addJobForm").submit((e)=>{
        console.log('test');
        e.preventDefault();
        console.log('add job');
        $.post("api/job/create", {
            job_name: $("#job_name").val(),
            scheduled_hours: $("#scheduled_hours").val(),
            pay: $("#pay").val(),
            certifications: $("#certifications").val(),
            start_date: $("#start_date").val(),
            end_date: $("#end_date").val(),
            description: $("#description").val(),
        }, function (data, status) {
            console.log(data);
            window.location.href = "/homeCompanies.html";
        });
    });
});
