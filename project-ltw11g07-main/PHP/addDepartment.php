<?php
// Get the values submitted by the form
$department = $_POST['department'];

filter_var($department, FILTER_SANITIZE_STRING);

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');

// Insert the new user into the users table
$insert_query = "INSERT INTO departments (name) VALUES ('$department')";
$insert_result = $db->query($insert_query);

// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  header('Location: /php/readDepartment.php');
}

// Close the database connection
$db->close();
?>
