window.onload = function loadPage() {
	var userTypeOn;
    document.getElementById("alert").style.visibility = "hidden"
	$.ajax({
		type: "POST",
		url: "../PHP/load_data.php",
		success: function (dados) {
			fullNameOn = dados["name"];
			firstName = fullNameOn.split(' ')[0];
			userTypeOn = dados["usertype"];

			//Trazer dado da BD
			var avatar = "avatar1"
			document.getElementById("nameHeader").innerHTML = firstName;
			document.getElementById("avatarHeader").src = "img/" + avatar + ".png";
			if (userTypeOn == "Client" || userTypeOn == "Agent") {
                window.location.href = `main.html`;
            }

            if (userTypeOn == "Client") {
                document.getElementById("addFaqs").style.display="none";
                document.getElementById("menuDepartment").style.display = "none";
                document.getElementById("menuUser").style.display = "none";
                document.getElementById("allTicketMenu").style.display = "none";
            } else if (userTypeOn == "Agent") {
                document.getElementById("menuUser").style.display = "none";
                document.getElementById("addDepartment").style.display = "none";
            }
		}
	});
}

const form = document.getElementById('signup-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements['name'].value;
    const username = form.elements['username'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const confirm_password = form.elements['confirm_password'].value;
    const typeUser = form.elements['typeUser'].value;

    const avatarElement = document.querySelector('input[name="avatar"]:checked');
    const avatar = avatarElement ? avatarElement.value : null;

    if (name.trim() === '' || username.trim() === '' || email.trim() === '' || password.trim() === '' || confirm_password.trim() === '' || avatar === null || typeUser.trim() === "") {
        document.getElementById("messageAlert").innerHTML ='All fields are mandatory!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

    if (password !== confirm_password) {
        document.getElementById("messageAlert").innerHTML ='Passwords do not match!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

    HTMLFormElement.prototype.submit.call(form)
});

function hiddenAlert(){
    document.getElementById("alert").style.visibility = "hidden"
    document.getElementById("messageAlert").innerHTML ="";
}
