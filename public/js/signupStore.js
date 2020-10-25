// js/signupStore.js
/** JS for creating a new company account
*Ean Vandergraaf, Laura Pareja,
*Carter Williams, Seth Workman
*KC Fed Code-A-Thon - Covid Project
*10/25/2020
*/
$(function() {

    $("#signUpFormStore").submit((e) => {
        e.preventDefault();
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ $("#location").val() +"&key=AIzaSyAWd49rKgMR0RHaL9a38_tyQEEhXudKgrc",
                function(res, err){
                    var latitude = res.results[0]["geometry"].location.lat;
                    var longitude = res.results[0]["geometry"].location.lng;
                    var location =  latitude + ',' + longitude;
                    if ($("#password").val() === $("#valPass").val()) {
                        $.post("api/store/create", {
                            store_email: $("#store_email").val().toLowerCase(),
                            password: $("#valPass").val().toLowerCase(),
                            company: $("#company").val(),
                            location: location,
                            address: $("#location").val(),
                            manager_name: $("#manager").val(),
                            phone: $("#tlf").val(),
                        }, function (data, status) {
                            $(".card").slideUp();
                            setTimeout(function(){
                            window.location.href = "/logInCompany.html";
                            }, 1000);
                        });
                    } else{
                        alert("Passwords don't match");
                    }
                });

    });
})