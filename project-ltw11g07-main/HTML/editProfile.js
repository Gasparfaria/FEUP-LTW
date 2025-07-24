let param = new URLSearchParams(window.location.search);
const id = param.get("id");

window.onload = function loadPage() {
  document.getElementById("alert").style.visibility = "hidden"
  var userTypeOn;
  $.ajax({
    type: "POST",
    url: "../PHP/load_department.php",
    success: function (departments) {
      addOptiondepartment(departments);
    }
  });

  $.ajax({
    type: "POST",
    url: "../PHP/load_data.php",
    success: function (dados) {

      fullNameOn = dados["name"];
      firstName = fullNameOn.split(' ')[0];
      usernameOn = dados["username"];
      userTypeOn = dados["usertype"];
      //Trazer dado da BD
      avatar = dados["avatar"];
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
        document.getElementById("addDepartment").style.display="none";
      }

      if (userTypeOn == "Admin") {
        document.getElementById("onlyAdmin").style.display = "block"
      } else {
        document.getElementById("onlyAdmin").style.display = "none"
      }
    }
  });

  var url = new URL(window.location.href);
  idUser = url.searchParams.get("id");
  
  $.ajax({
    type: "POST",
    url: "../PHP/load_user.php",
    data: {user_id: idUser},
    success: function (dados) {

      dataProfile(dados[0]);
    }
  });
};


function dataProfile(data) {
  document.getElementById("name").setAttribute('value', data["name"]);
  document.getElementById("username").setAttribute('value', data["username"]);
  document.getElementById("email").setAttribute('value', data["email"]);
  document.querySelector("#typeUser").value = data.userType;

  if (data.department == null || data.department == "") {
    document.querySelector("#department").value = "";
  }
  else {
    document.querySelector("#department").value = data.department;

  }

}

function addOptiondepartment(department) {
  for (let j = 0; j < department.length; j++) {
    var option = new Option(department[j].name, department[j].name);
    var select = document.getElementById("department");
    select.add(option);
  }
}

const form = document.getElementById('editProfile-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const typeUser = document.querySelector("#typeUser").value;

  console.log(document.querySelector("#department").value)

  if (name.trim() === '' || username.trim() === '' || email.trim() === '' || typeUser.trim() === '') {
    document.getElementById("messageAlert").innerHTML = 'All fields are mandatory!';
    document.getElementById("alert").style.visibility = "visible";
    return;
  }

  HTMLFormElement.prototype.submit.call(form);
});

function hiddenAlert() {
  document.getElementById("alert").style.visibility = "hidden"
  document.getElementById("messageAlert").innerHTML = "";
}


