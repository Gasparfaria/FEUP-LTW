let usernameOn = "";
let userTypeOn = "";
let idTicket = 0;
let data = {};

window.onload = function loadPage() {

    var url = new URL(window.location.href);
    idTicket = url.searchParams.get("idTicket");

    $.ajax({
        type: "POST",
        url: "../PHP/readTicket.php",
        data: { ticket_id: idTicket },
        success: function (ticket) {
            data = ticket;
        }
    });

    var userTypeOn;
    $.ajax({
        type: "POST",
        url: "../PHP/load_data.php",
        success: function (dados) {

            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            document.getElementById("nameHeader").innerHTML = firstName;
            userTypeOn = dados["usertype"];
            usernameOn = dados["username"];
            avatar = dados["avatar"];
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";

            if (userTypeOn == "Client") {
                document.getElementById("addFaqs").style.display="none";
                document.getElementById("menuDepartment").style.display = "none";
                document.getElementById("menuUser").style.display = "none";
                document.getElementById("allTicketMenu").style.display = "none";
            } else if (userTypeOn == "Agent") {
                document.getElementById("menuUser").style.display = "none";
                document.getElementById("addDepartment").style.display = "none";
            }

            document.getElementById("edit").style.visibility = "hidden"
            document.getElementById("assign").style.visibility = "hidden"

            if (userTypeOn != "Client") {
                document.getElementById("edit").style.visibility = "visible"
            }
            

            console.log(data.assigned_agent);


            if (data.assigned_agent != usernameOn && userTypeOn != "Client" && data.department == dados.department) {
                document.getElementById("assign").style.visibility = "visible"
            }

        }
    });

    

    $.ajax({
        type: "POST",
        url: "../PHP/readTicket.php",
        data: { ticket_id: idTicket },
        success: function (ticket) {
            data = ticket;

            if (data.client != usernameOn && data.assigned_agent != usernameOn) {
                document.getElementById("replyMessage").style.display = "none";
                document.getElementById("replyBtn").style.display = "none";
            }

            createTicket(
                data.ticket_id,
                data.priority,
                data.title,
                data.status,
                data.created_at,
                data.updated_at,
                data.assigned_agent,
                data.client,
                data.department,
                data.description,
                data.hashtag
            );
        }
    });


    $.ajax({
        type: "POST",
        url: "../PHP/readTicketChange.php",
        data: { ticket_id: idTicket },
        success: function (ticketChange) {
            createChangesTicket(ticketChange);
        }
    });

    $.ajax({
        type: "POST",
        url: "../PHP/readMessage.php",
        data: { ticket_id: idTicket },
        success: function (ticketMessage) {
            createMessages(ticketMessage);
        }
    });

};


function createTicket(id, priority, title, status, created_at, updated_at, agent, reporter, department, description, hashtag) {

    if(department == null || department == ""){
		department = " - ";
	}

    if(agent == null || agent == ""){
		agent = " - ";
	}

    created_at = convertTimestampToDate(created_at)
    updated_at = convertTimestampToDate(updated_at)
    document.getElementById("numberTicket").innerHTML = "Ticket nº" + id;
    document.getElementById("subject").innerHTML = title;
    document.getElementById("department").innerHTML = department;
    document.getElementById("description").innerHTML = description;
    document.getElementById("createDate").innerHTML = created_at;
    document.getElementById("updateDate").innerHTML = updated_at;
    document.getElementById("agent").innerHTML = agent;
    document.getElementById("reporter").innerHTML = reporter;
    document.getElementById("status").innerHTML = status;
    document.getElementById("priority").innerHTML = priority;

    var arrayHashtags = hashtag.split(" ");
    var container = document.getElementById("container");
    for (let i = 0; i < arrayHashtags.length - 1; i++) {
        var button = document.createElement("a");
        button.innerHTML = arrayHashtags[i];
        button.className = "link-hashtag";
        let infoUrl = new URLSearchParams();
        infoUrl.append("idTicket", arrayHashtags[i]);
        button.href = "listTicketByHashtag.html?" + infoUrl.toString();
        container.appendChild(button);
    }
}



function createChangesTicket(dataChange) {
    var container = document.getElementById("changeTicket");

    for (let i = 0; i < dataChange.length; i++) {
        var paragraph = document.createElement("p");
        if (dataChange[i].change_type == "message") paragraph.innerHTML = dataChange[i].username + " sent a " + dataChange[i].change_type + " at " + convertTimestampToDate(dataChange[i].change_time);
        else paragraph.innerHTML = dataChange[i].username + " " + dataChange[i].change_type + " " + convertTimestampToDate(dataChange[i].change_time);
        container.appendChild(paragraph);
    }
}

function createMessages(dataMessage) {
    var parentElement = document.getElementById('allMessage');// seleciona o elemento pai onde o novo elemento será adicionado

    for (let i = 0; i < dataMessage.length; i++) {
        var messageDiv = document.createElement('div');// cria um novo elemento div

        if (dataMessage[i].username == data.client) {
            messageDiv.classList.add('message-reporter');// adiciona a classe "message-reporter" ao elemento div 
        } else {
            messageDiv.classList.add('message-agent');// adiciona a classe "message-agent" ao elemento div
        }

        var flexRowDiv = document.createElement('div');// cria um novo elemento div com a classe "flex-row"
        flexRowDiv.classList.add('flex-row');// define a class de CSS

        // cria um novo elemento label para o nome do agente
        var nameLabel = document.createElement('label');
        nameLabel.textContent = dataMessage[i].username;
        nameLabel.style.width = '80%';

        // cria um novo elemento label para a data
        var dateLabel = document.createElement('label');
        dateLabel.textContent = convertTimestampToDate(dataMessage[i].change_time);
        dateLabel.style.width = '20%';

        // adiciona os elementos label ao div "flex-row"
        flexRowDiv.appendChild(nameLabel);
        flexRowDiv.appendChild(dateLabel);

        // cria um novo elemento p para a mensagem do agente
        var messageP = document.createElement('p');
        messageP.textContent = dataMessage[i].new_value;

        messageDiv.appendChild(flexRowDiv);
        messageDiv.appendChild(messageP);
        parentElement.appendChild(messageDiv);
    }
}

function convertTimestampToDate(timestamp) {
	var dateFormat = new Date(timestamp);
	const year = String(dateFormat.getFullYear()).padStart(4, '0');
	var monthAux = dateFormat.getMonth() + 1;
	const month = String(monthAux).padStart(2, '0');
	const day = String(dateFormat.getDate()).padStart(2, '0');
	const hour = String(dateFormat.getHours()).padStart(2, '0');
	const minutes = String(dateFormat.getMinutes()).padStart(2, '0');

	return date = year + "/" + month + "/" + day + " " + hour + ":" + minutes;
}


//CLICK SOBRE ITENS DE UM USER
document.getElementById('edit').addEventListener('click', optionSelect);
document.getElementById('assign').addEventListener('click', optionSelect);

function optionSelect(event) {
    //falta o botao hastag
    const element = event.target;
    let infoUrl = new URLSearchParams();
    infoUrl.delete("idTicket");
    if (element.id === 'edit') {
        infoUrl.append("idTicket", idTicket)
        window.location.href = "editTicket.html?" + infoUrl.toString();
    } else if (element.id === 'assign') {

        var s = null;

        if(data.assigned_agent == null) s = "assigned";
        
        $.ajax({
            type: "POST",
            url: "../PHP/assignMe.php",
            data: { 
                ticket_id: idTicket,
                username: usernameOn,
                status: s,
             },
            success: function (dados) {
            }
        });

        var change = "assign this ticket";
        location.reload();
    }
}

const reply = document.getElementById('reply-form');
reply.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector("#replyMessage").value;
    document.querySelector("#replyId").value = idTicket;
    document.querySelector("#replyUsername").value = usernameOn;
    document.querySelector("#replyType").value = "message";

    if (message.trim() === '') {
        alert('All fields are mandatory!');
        return;
    }

    HTMLFormElement.prototype.submit.call(reply)
});