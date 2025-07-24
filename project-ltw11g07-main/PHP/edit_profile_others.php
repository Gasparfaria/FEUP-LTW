<?php
// Get the values submitted by the form
$username = $_POST['username'];
$email = $_POST['email'];
$name = $_POST['name'];
$department = $_POST['department'];
$usertype = $_POST['typeUser'];

filter_var($username, FILTER_SANITIZE_STRING);
filter_var($email, FILTER_SANITIZE_STRING);
filter_var($name, FILTER_SANITIZE_STRING);
filter_var($department, FILTER_SANITIZE_STRING);
filter_var($usertype, FILTER_SANITIZE_STRING);

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');


// Validate all data of the form
if (empty($name) || empty($username)|| empty($email)) {
  echo "All fields are mandatory!";
  exit;
}


// Insert the new user into the users table
$insert_query = "UPDATE users SET username = '$username', email = '$email', name = '$name', department = '$department', userType = '$usertype'  WHERE username = '$username'";
$insert_result = $db->query($insert_query);


// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  header('Location: /html/listUser.html');
}

// Close the database connection
$db->close();
?>
