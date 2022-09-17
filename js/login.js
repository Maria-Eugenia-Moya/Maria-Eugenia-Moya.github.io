//Inicio de funcionalidad entrega 1

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.getElementById("regBtn").addEventListener("click", function(){

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (email && password){
/*var email_analizado = /^([^]+)@(\w+).(\w)$/.exec(email);

var usuario = email
usario.indexOf('@')

*/
        localStorage.setItem('userlog', email)
        window.location = 'index.html';

    } else {
        showAlertError();

    }

});
