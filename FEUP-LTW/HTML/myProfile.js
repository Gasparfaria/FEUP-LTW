window.onload = function loadPage() {
    createProfile();
};

function createProfile() {
    var userTypeOn;

    $.ajax({
        type: "POST",
        url: "../PHP/load_data.php",
        success: function (dados) {
            console.log(dados)
            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            userTypeOn = dados["usertype"];

            avatar = dados["avatar"];
            document.getElementById("nameHeader").innerHTML = firstName;
            document.getElementById("avatarUser").src = "img/" + avatar + ".png";

            document.getElementById("nameUser").innerHTML = dados["name"];
            document.getElementById("username").innerHTML = dados["username"];
            document.getElementById("email").innerHTML = dados["email"];
            document.getElementById("userType").innerHTML = dados["usertype"];
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";
            
            if (dados.department == null || dados.department == "") {
                document.getElementById("department").innerHTML = "-";
            } else document.getElementById("department").innerHTML = dados.department;

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



function selectUser(event) {
    const element = event.target;
    const idUser = data.username;
    let infoUrl = new URLSearchParams();
    infoUrl.delete("id");
    if (element.id === 'seeTicket') {
        infoUrl.append("id", idUser)
        window.location.href = "listTicketByUser.html" + infoUrl.toString();
    }
}