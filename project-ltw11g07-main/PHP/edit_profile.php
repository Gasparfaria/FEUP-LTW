<?php
// Get the values submitted by the form
$username = $_POST['username'];
$email = $_POST['email'];
$name = $_POST['name'];
$old_password = $_POST['old_password'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

filter_var($username, FILTER_SANITIZE_STRING);
filter_var($email, FILTER_SANITIZE_STRING);
filter_var($name, FILTER_SANITIZE_STRING);
filter_var($old_password, FILTER_SANITIZE_STRING);
filter_var($password, FILTER_SANITIZE_STRING);
filter_var($confirm_password, FILTER_SANITIZE_STRING);

$change_password = false;

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');


// Validate all data of the form
if (empty($name) || empty($username)|| empty($email)) {
  echo "All fields are mandatory!";
  exit;
}

// Consulta o banco de dados para validar o usuário
$query = $db->prepare('SELECT * FROM users WHERE username = ?');
$query->bindValue(1, $username, SQLITE3_TEXT);
$result = $query->execute();
$user = $result->fetchArray(SQLITE3_ASSOC);

if($old_password != null){

    if ($user && password_verify($old_password, $user['password'])){

      if($password == null || $confirm_password == null){
        echo "Write A New Password";
        exit;
      }
      
      if ($password !== $confirm_password) {
        echo "Passwords do not match";
        exit;
      } else {

        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $change_password = true;

      }


  } else {
    echo "Password Incorrect";
    exit;
  }
}


// Insert the new user into the users table
$insert_query = "UPDATE users SET username = '$username', email = '$email', name = '$name' WHERE username = '$username'";
$insert_result = $db->query($insert_query);

if($change_password){

  $insert_query = "UPDATE users SET password = '$password_hash' WHERE username = '$username'";
  $insert_result = $db->query($insert_query);

}

session_start();

$_SESSION['name'] = $name;
$_SESSION['username'] = $username;
$_SESSION['email'] = $email;

// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  header('Location: /html/myProfile.html');
}

// Close the database connection
$db->close();
?>
