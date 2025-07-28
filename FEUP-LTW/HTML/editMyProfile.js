var oldPassword;
var userTypeOn;
window.onload = function loadPage() {
    document.getElementById("alert").style.visibility = "hidden"
    $.ajax({
        type: "POST",
        url: "../PHP/load_data.php",
        success: function (dados) {
            console.log(dados)
            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            usernameOn = dados["username"];
            userTypeOn = dados["usertype"];
            //Trazer dado da BD
            avatar = dados["avatar"];
            document.getElementById("nameHeader").innerHTML = firstName;
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";

            if (userTypeOn == "Client") {
                document.getElementById("addFaqs").style.display="none";
                document.getElementById("menuDepartment").style.display = "none";
                document.getElementById("menuUser").style.display = "none";
                document.getElementById("allTicketMenu").style.display = "none";
            } else if (userTypeOn == "Agent") {
                document.getElementById("menuUser").style.display = "none";
                document.getElementById("addDepartment").style.display="none";
            }
            dataProfile(dados)
        }
    });
};


function dataProfile(data) {
    document.getElementById("name").setAttribute('value', data["name"]);
    document.getElementById("username").setAttribute('value', data["username"]);
    document.getElementById("email").setAttribute('value', data["email"]);
    oldPassword = data.password;
}

const form = document.getElementById('editProfile-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const confirmOldPassword = document.querySelector("#oldPassword").value;
    const password = document.querySelector("#password").value;
    const confirm_password = document.querySelector("#confirm_password").value;

    if (name.trim() === '' || email.trim() === '') {
        document.getElementById("messageAlert").innerHTML = 'All fields are mandatory!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

    if (confirmOldPassword == "" && password != "" && confirm_password != "") {
        document.getElementById("messageAlert").innerHTML = 'Write old password!';
        document.getElementById("alert").style.visibility = "visible";
    }

    if (password !== confirm_password) {
        document.getElementById("messageAlert").innerHTML = 'Passwords do not match!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

    HTMLFormElement.prototype.submit.call(form);
});

function hiddenAlert() {
    document.getElementById("alert").style.visibility = "hidden"
    document.getElementById("messageAlert").innerHTML = "";
}


