<?php
// Get the values submitted by the form
$username = $_POST['username'];
$email = $_POST['email'];
$name = $_POST['name'];
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];
$avatar = $_POST['avatar'];

filter_var($username, FILTER_SANITIZE_STRING);
filter_var($email, FILTER_SANITIZE_STRING);
filter_var($name, FILTER_SANITIZE_STRING);
filter_var($password, FILTER_SANITIZE_STRING);
filter_var($confirm_password, FILTER_SANITIZE_STRING);
filter_var($avatar, FILTER_SANITIZE_STRING);


// Validate all data of the form
if (empty($name) || empty($username)|| empty($email) || empty($password) || empty($confirm_password)) {
  echo "All fields are mandatory!";
  exit;
}

// Check if the passwords match
if ($password !== $confirm_password) {
  echo "Passwords do not match";
  exit;
}

// Hash the password
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');

// Insert the new user into the users table
$insert_query = "INSERT INTO users (username, email, name, password, userType, avatar) VALUES ('$username', '$email', '$name', '$password_hash', 'Client', '$avatar')";
$insert_result = $db->query($insert_query);

// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  header('Location: /html/signUpSuccess.html');
}

// Close the database connection
$db->close();
?>
