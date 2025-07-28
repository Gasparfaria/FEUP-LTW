let departmentList = [];

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
    loadDepartments();
}

function loadDepartments() {
    $.ajax({
        type: "POST",
        url: "../PHP/load_department.php",
        success: function (dados) {
            departmentList = dados;

            for (let j = 0; j < departmentList.length; j++) {
                let tbody = document.getElementById("tbody");
                const rowTicket = document.createElement('tr');
                rowTicket.innerHTML = `
                    <td data-indice=${departmentList[j].name}>${departmentList[j].name}</td>
                    <td  data-indice=${departmentList[j].name}>
                        <img data-indice=${departmentList[j].name} src="img/list.png" alt="" id="listTicket">
                        <img data-indice=${departmentList[j].name} src="img/profile.png" alt="" id="listUser">
                    </td>`
                tbody.appendChild(rowTicket);
            }
        }
    });
}

document.getElementById('tbody').addEventListener('click', selectButton);

const addDepartment = document.getElementById('addDepartment');
if (addDepartment !== null) {
    addDepartment.addEventListener('click', selectButton);
}

function selectButton(event) {
    const element = event.target;
    const idDepartment = element.dataset.indice;
    let infoUrl = new URLSearchParams();

    if(userTypeOn=="Agent" &&  element.id === 'listUser'){
        document.getElementById("messageAlert").innerHTML = "You don't have permissions!";
        document.getElementById("alert").style.visibility = "visible";
        return
    }

    if (element.id === 'listTicket' || element.id === 'listUser') {
        infoUrl.append("id", idDepartment);
        window.location.href = `${element.id}ByDepartment.html?${infoUrl.toString()}`;
    }
}

function hiddenAlert() {
    document.getElementById("alert").style.visibility = "hidden"
    document.getElementById("messageAlert").innerHTML = "";
}
