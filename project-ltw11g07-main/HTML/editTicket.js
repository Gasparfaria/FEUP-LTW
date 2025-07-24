


var url = new URL(window.location.href);
idTicket = url.searchParams.get("idTicket");

let usernameON;
let data = {};
let tags = [];
const urlParams = new URLSearchParams(window.location.search);
const hashtag = urlParams.get('idTicket');


window.onload = function loadPage() {
    var userTypeOn;
    document.getElementById("alert").style.visibility = "hidden"

    $.ajax({
        type: "POST",
        url: "../PHP/load_data.php",
        success: function (dados) {
            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            usernameON = dados["username"];
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

    $.ajax({
        type: "POST",
        url: "../PHP/readTicket.php",
        data: { ticket_id: idTicket },
        success: function (ticket) {
            data = ticket;
        }
    });

    $.ajax({
        type: "POST",
        url: "../PHP/load_department.php",
        success: function (dados) {
            addOptionDepartament(dados);
        }
    });

    $.ajax({
        type: "POST",
        url: "../PHP/load_agents.php",
        success: function (dados) {
            addOptionAgent(dados);
        }
    });

    $.ajax({
        type: "POST",
        url: "../PHP/readTicket.php",
        data: { ticket_id: idTicket },
        success: function (ticket) {
            dataTicket(ticket);
        }
    });

};

function addOptionDepartament(dados) {
    for (let j = 0; j < dados.length; j++) {
        var option = new Option(dados[j].name, dados[j].name);
        var select = document.getElementById("department");
        select.add(option);
    }
    let stringHashtag = data.hashtag;
    if (stringHashtag != null) convertStringtoArrayHashtag(stringHashtag);
    dataTicket(data);

}

function addOptionAgent(userList) {
    for (let j = 0; j < userList.length; j++) {
        if (userList[j].userType != "Client"  && userList[j].department == data.department ) {
            var option = new Option(userList[j].username, userList[j].username);
            var select = document.getElementById("agent");
            select.add(option);
        }
    }
}

function dataTicket(data) {
    document.querySelector("#department").value = data.department;
    document.querySelector("#agent").value = data.assigned_agent;
    document.querySelector("#status").value = data.status;
    document.querySelector("#priority").value = data.priority;
    createTag();
}

function convertStringtoArrayHashtag(stringHashtag) {
    var arrayHashtags = stringHashtag.split(" ");
    for (let i = 0; i < arrayHashtags.length - 1; i++) {
        tags.push(arrayHashtags[i])
    }
}

const departmentSelect = document.querySelector("#department");
const agentSelect = document.querySelector("#agent");
departmentSelect.addEventListener("change", () => {
    const selectedDepartment = departmentSelect.value;
});

const form = document.getElementById('editicket-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const department = document.querySelector("#department").value;
    const agent = document.querySelector("#agent").value;
    const status = document.querySelector("#status").value;
    const priority = document.querySelector("#priority").value;
    var hashtags = "";
    tags.forEach(tag => hashtags += tag + " ");
    hashtags.trim();
    form.hashtag.value = hashtags;
    form.ticket_id.value = idTicket;

    if (status.trim() === '' || priority.trim() === '' || department.trim() === '') {
        document.getElementById("messageAlert").innerHTML = 'All fields are mandatory!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

    if (department == 0) {
        document.getElementById("messageAlert").innerHTML = 'It is mandatory to select the department!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

    $change_department = null;
    $change_agent = null;
    $change_status = null;
    $change_priority = null;
    $change_hashtag = null;

    $let = true;

    

    //array que vai para o php e se for diferente de vazio regista na BD todas as alteracoes realizadas 
    let arrayChanges = [];
    if (department != data.department) {
        arrayChanges.push("changed the department to " + department)
        $change_department = department;
    }

    if(agent != ""){

        if (data.assigned_agent == null) {
            arrayChanges.push("changed the agent to " + agent)
            $change_agent = agent;
            $let = false;
            $change_status = "assigned";
            arrayChanges.push("changed the status " + data.status + " to assigned");
            form.status.value = "assigned";
        } 

        if (agent != data.assigned_agent && data.assigned_agent != null) {
            arrayChanges.push("changed the agent " + data.agent + " to " + agent)
            $change_agent = agent;
        }   
    }

    if (status != data.status && $block) {
        arrayChanges.push("changed the status " + data.status + " to " + status)
        $change_status = status;
    }

    if (priority != data.priority) {
        arrayChanges.push("changed the priority " + data.priority + " to " + priority)
        $change_priority = priority;
    }

    if (hashtags != data.hashtag) {
        arrayChanges.push("changed hashtag")
        $change_hashtag = hashtags;
    }


    $.ajax({
        type: "POST",
        url: "../PHP/assignChanges.php",
        data: {
            change_department : $change_department,
            change_agent : $change_agent,
            change_hashtag : $change_hashtag,
            change_priority : $change_priority,
            change_status : $change_status,
            arraychanges : arrayChanges,
            ticket_id : idTicket,
            username : usernameON
        },
        success: function (dados) {

        }
    });


    HTMLFormElement.prototype.submit.call(form)
});


function createTag() {
    const ul = document.querySelector('#tag-list');
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
}

function addTag(e) {
    if (e.key == " ") {
        let tag = e.target.value.replace(/\s+/g, ' ');
        if (tag.length > 1 && !tags.includes(tag)) {
            if (tag.startsWith("#")) {
                tags.push(tag);
            } else {
                tags.push("#" + tag);
            }
            createTag();
        }
        e.target.value = "";
    }
}

function remove(element, tag) {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
}

const input = document.querySelector('#tag-input');
input.addEventListener("keydown", function (e) {
    addTag(e)
});


function hiddenAlert() {
    document.getElementById("alert").style.visibility = "hidden"
    document.getElementById("messageAlert").setAttribute('value', "");
}

