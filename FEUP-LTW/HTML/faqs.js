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
        url: "../PHP/load_faq.php",
        success: function (data) {
            for (let j = 0; j < data.length; j++) {
				addFAQ(data[j].question, data[j].answer, data[j].faq_id)
			}

            const questions = document.querySelectorAll('.question');

            questions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
                });
            });         

        }
    });

}


function addFAQ(question, answer, id) {
    
    var faqContainer = document.getElementById("container"); 
    // Create question element
    var questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = (id) + ". " + question; 
  
    // Create answer element
    var answerElement = document.createElement("div");
    answerElement.className = "answer";
    answerElement.innerHTML = answer;
  
    // Append question and answer elements to the container
    faqContainer.appendChild(questionElement);
    faqContainer.appendChild(answerElement);
  }
  