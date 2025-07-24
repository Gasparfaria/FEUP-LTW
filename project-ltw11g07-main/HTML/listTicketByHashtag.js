let departmentList = [];
//PRECISA-SE DO USERTYPE PARA SE NAO FOR ADMIN ESCONDER-SE POR EXEMPLO O ADD DEPARTMENT
const urlParams = new URLSearchParams(window.location.search);
const hashtag = urlParams.get('id');

window.onload = function loadPage() {
	var userTypeOn;
	document.getElementById("hashtag").innerHTML = hashtag+" ";
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
		url: "../PHP/load_ticket_hashtag.php",
		success: function (data) {
			for (let j = 0; j < data.length; j++) {
                var dataHashtags = data[j].hashtag;
                if (dataHashtags.includes(hashtag)) {
                createTicket(
                    data[j]["ticket_id"],
                    data[j].priority,
                    data[j].title,
                    data[j].status,
                    data[j].created_at,
                    data[j].updated_at,
                    data[j].assigned_agent,
                    data[j].client,
                    data[j].hashtag,
                    data[j].department);
                }
			}
		}
	});

}

//CREATED TICKET
function createTicket(id, priority, title, status, createDate, updateDate, agent, reporter, hashtag, department) {
	createDate = convertTimestampToDate(createDate)
	updateDate = convertTimestampToDate(updateDate)
	if (agent == null || agent == "") {
		agent = "-"
	}

	if(department == null || department == ""){
		department = "-";
	}

	//falta nas actions colocar o botao edit e ver ticket
	let tbody = document.getElementById("tbody");
	const rowTicket = document.createElement('tr');
	rowTicket.innerHTML = `
		<td data-indice=${id}>${id}</td>
		<td data-indice=${id}>${priority}</td>
		<td data-indice=${id}>${title}</td>
		<td data-indice=${id}>${status}</td>
		<td data-indice=${id}>${createDate}</td>
		<td data-indice=${id}>${updateDate}</td>
		<td data-indice=${id}>${department}</td>
        <td data-indice=${id}>${agent}</td>
		<td data-indice=${id}>${reporter}</td>
        <td data-indice=${id}>${hashtag}</td>
		<td  data-indice=${id}>
		    <img data-indice=${id} src="img/editing.png" alt="" id="edit">
		    <img data-indice=${id}  src="img/see.png" alt="" id="see">
		</td>`
	tbody.appendChild(rowTicket);
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

document.getElementById('tbody').addEventListener('click', selectTicket);

function selectTicket(event) {
	const element = event.target;
	const idTicket = element.dataset.indice;
	let infoUrl = new URLSearchParams();
	if (element.id === 'edit' || element.id === 'see') {
		infoUrl.append("idTicket", idTicket);
		window.location.href = `${element.id}Ticket.html?${infoUrl.toString()}`;
	}
}

function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("mytable");
	switching = true;
	dir = "asc";
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}