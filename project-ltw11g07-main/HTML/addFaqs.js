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

            //Trazer dado da BD
            var avatar = "avatar1"
            document.getElementById("nameHeader").innerHTML = firstName;
            document.getElementById("avatarHeader").src = "img/" + avatar + ".png";

            if(userTypeOn == "Client"){
                window.location.href = `main.html`;
            }

            if(userTypeOn == "Client"){
                document.getElementById("menuDepartment").style.display="none";
                document.getElementById("menuUser").style.display="none";
                document.getElementById("allTicketMenu").style.display="none";
                document.getElementById("addFaqs").style.display="none";
            } else if (userTypeOn == "Agent"){
                document.getElementById("menuUser").style.display="none";
                document.getElementById("addDepartment").style.display="none";
            }
        }
    });
}


const form = document.getElementById("faqs-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = form.elements["question"].value;
    const answer = form.elements["answer"].value;

    if (question.trim() === "" || answer.trim() === "") {
        document.getElementById("messageAlert").innerHTML ='All fields are mandatory!';
        document.getElementById("alert").style.visibility = "visible";
        return;
    }

   HTMLFormElement.prototype.submit.call(form);
});


function hiddenAlert() {
    document.getElementById("alert").style.visibility = "hidden"
    document.getElementById("messageAlert").innerHTML = "";
}


