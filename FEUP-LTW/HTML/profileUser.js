const urlParams = new URLSearchParams(window.location.search);
const hashtag = urlParams.get('id');

window.onload = function loadPage() {
    createProfile();
};

function createProfile() {
    var userTypeOn;

    var url = new URL(window.location.href);
    idUser = url.searchParams.get("id");

    $.ajax({
        type: "POST",
        url: "../PHP/load_user.php",
        data: {user_id: idUser},
        success: function(dados){

            dados = dados[0];

            console.log(dados);

            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            userTypeOn = dados["userType"];

            avatar = dados["avatar"];
            document.getElementById("nameHeader").innerHTML = firstName;
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";

            document.getElementById("nameUser").innerHTML = dados["name"];
            document.getElementById("username").innerHTML = dados["username"];
            document.getElementById("email").innerHTML = dados["email"];
            document.getElementById("userType").innerHTML = dados["userType"];
            if (dados.department == null || dados.department == "") {
                    document.getElementById("department").innerHTML = "-";
            }
            document.getElementById("avatarUser").src = "img/" + avatar + ".png";


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

//CLICK SOBRE ITENS DE UM USER
document.getElementById('seeTicket').addEventListener('click', selectUser);

function selectUser(event) {
	const element = event.target;
	const idUser = data.username;
    let infoUrl = new URLSearchParams();
    infoUrl.delete("id");
	if (element.id === 'seeTicket') {
        infoUrl.append("id", idUser)
        window.location.href = "listTicketByUser.html?" + infoUrl.toString();
	}
}