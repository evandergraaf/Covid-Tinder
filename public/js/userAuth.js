

$(function() {

    $("#clearBtn").click(function(){
        window.location.reload();
        })

    $.ajax({
        url: "api/user/auth",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function() {console.log('auth') },
        error: function() {window.location.href = "/logInUser.html";}
    });

    $.ajax({
        url: "api/user/current",
        headers: {"x-auth": window.localStorage.getItem("token")},
        type: "GET",
        success: function(data) {
            $("#userName").html("Hi " + data[0].full_name + "!");
         }
    });

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value;
    }

})