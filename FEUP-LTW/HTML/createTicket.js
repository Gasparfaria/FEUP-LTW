
window.onload = function loadPage() {
    var userTypeOn;
    document.getElementById("alert").style.visibility = "hidden"

    $.ajax({
        type: "POST",
        url: "../PHP/load_data.php",
        success: function(dados){
            fullNameOn = dados["name"];
            firstName = fullNameOn.split(' ')[0];
            userTypeOn = dados["usertype"];

            //Trazer dado da BD
            avatar = dados["avatar"];
            document.getElementById("nameHeader").innerHTML = firstName;
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";
            if(userTypeOn == "Client"){
                document.getElementById("addFaqs").style.display="none";
                document.getElementById("menuDepartment").style.display="none";
                document.getElementById("menuUser").style.display="none";
                document.getElementById("allTicketMenu").style.display="none";
            } else if (userTypeOn == "Agent"){
                document.getElementById("menuUser").style.display="none";
                document.getElementById("addDepartment").style.display="none";
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "../PHP/load_department.php",
        success: function(dados){
            addOptionDepartament(dados);
        }
    });

};

function addOptionDepartament(departament) {
    for (let j = 0; j < departament.length; j++) {
            var option = new Option(departament[j].name, departament[j].name);
            var select = document.getElementById("department");
            select.add(option);
    }
}

const form = document.getElementById("createticket-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = form.elements["title"].value;
    const description = form.elements["description"].value;
    const department = form.elements["department"].value;
    var hashtags = "";
    tags.forEach(tag => hashtags += tag + " ");
    hashtags.trim();
    form.hashtag.value = hashtags;
    
    if (title.trim() === "" || description.trim() === "" || hashtags === "") {
        document.getElementById("messageAlert").innerHTML ='All fields are mandatory!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

   HTMLFormElement.prototype.submit.call(form);
});

let tags = [];

const input = document.querySelector('#tag-input');
input.addEventListener("keydown", function (e) {
    addTag(e)
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
        tag = tag.replace(/ /g, "");
        if (tag.length > 1 && !tags.includes(tag)) {
            if (tag.startsWith("#")) {
                tags.push(tag);
            } else {
                tags.push("#"+tag);
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

function hiddenAlert(){
    document.getElementById("alert").style.visibility = "hidden"
    document.getElementById("messageAlert").innerHTML ="";
}
