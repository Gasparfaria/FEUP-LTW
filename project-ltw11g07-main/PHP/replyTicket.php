<?php
// Get the values submitted by the form
$message = $_POST['message'];
$ticket_id = $_POST['ticket_id'];
$username = $_POST['username'];
$change_type = $_POST['change_type'];

filter_var($message, FILTER_SANITIZE_STRING);
filter_var($ticket_id, FILTER_SANITIZE_STRING);
filter_var($username, FILTER_SANITIZE_STRING);
filter_var($change_type, FILTER_SANITIZE_STRING);

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');

// Insert the new user into the users table
$insert_query = "INSERT INTO ticket_changes (ticket_id ,username, change_type, new_value) VALUES ('$ticket_id', '$username', '$change_type', '$message')";
$insert_result = $db->query($insert_query);

// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  $location = 'Location: /HTML/seeTicket.html?idTicket=';
  $location = $location . $ticket_id;
  header($location);
}

// Close the database connection
$db->close();
?>
