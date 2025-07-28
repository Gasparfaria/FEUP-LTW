<?php

$department = $_POST['department'];
$hashtag = $_POST['hashtag'];
$priority = $_POST['priority'];
$status = $_POST['status'];
$agent = $_POST['agent'];
$ticket_id = $_POST['ticket_id'];

filter_var($department, FILTER_SANITIZE_STRING);
filter_var($hashtag, FILTER_SANITIZE_STRING);
filter_var($priority, FILTER_SANITIZE_STRING);
filter_var($status, FILTER_SANITIZE_STRING);
filter_var($agent, FILTER_SANITIZE_STRING);
filter_var($ticket_id, FILTER_SANITIZE_STRING);


// Connect to the SQLite database
$db = new SQLite3('../tickets.db');


// Insert the new user into the users table
$insert_query = "UPDATE tickets SET department = '$department', hashtag = '$hashtag', priority = '$priority', status = '$status', assigned_agent = '$agent' WHERE ticket_id = '$ticket_id'";
$insert_result = $db->query($insert_query);

// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  header('Location: /html/myListTicket.html');
}

// Close the database connection
$db->close();
?>
