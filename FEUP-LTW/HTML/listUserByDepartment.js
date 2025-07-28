const urlParams = new URLSearchParams(window.location.search);
const department = urlParams.get('id');

window.onload = function loadPage() {
    var userTypeOn;
    $.ajax({
        type: "POST",
        url: "../PHP/load_data.php",
        success: function (dados) {
            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            userTypeOn = dados["usertype"];
            //Trazer dado da BD
            avatar = dados["avatar"];
            document.getElementById("nameHeader").innerHTML = firstName;
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";

            if (userTypeOn == "Client") {
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

    $.ajax({
        type: "POST",
        url: "../PHP/load_users.php",
        success: function(data){
            for (let j = 0; j < data.length; j++) {
                if(data[j].department == department){
                    createTableUsers(
                        data[j].username,
                        data[j].name,
                        data[j].userType,
                        data[j].department);
                } 
            }
        }
    });



}

//CREATED TICKET
function createTableUsers(username, name, userType, department) {
    if(department == null) department = "-";

    let tbody = document.getElementById("tbody");
    const rowTicket = document.createElement('tr');
    rowTicket.innerHTML = `
		<td data-indice=${username}>${username}</td>
		<td data-indice=${username}>${name}</td>
		<td data-indice=${username}>${userType}</td>
		<td data-indice=${username}>${department}</td>
		<td  data-indice=${username}>
		    <img data-indice=${username} src="img/editing.png" alt="" id="edit">
		    <img data-indice=${username} src="img/profile.png" alt="" id="profile">
		</td>`
    tbody.appendChild(rowTicket);
}

function searchUser() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        for (j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
            td = tr[i].getElementsByTagName("td")[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

document.getElementById('tbody').addEventListener('click', selectUser);

function selectUser(event) {
    const element = event.target;
    const idUser = element.dataset.indice;
    let infoUrl = new URLSearchParams();
    if (element.id === 'edit') {
        infoUrl.append("id", idUser)
        window.location.href = "editProfile.html?" + infoUrl.toString();
    } if (element.id === 'profile') {
        infoUrl.append("id", idUser)
        window.location.href = "profileUser.html?" + infoUrl.toString();
    }
}