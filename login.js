function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.getElementById("regBtn").addEventListener("click", function(){

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (email && password){

        window.location = "index.html";

    } else {
        showAlertError();

    }

});