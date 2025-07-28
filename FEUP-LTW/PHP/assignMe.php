<?php

$ticket_id = $_POST['ticket_id'];
$agent = $_POST['username'];
$status = $_POST['status'];

filter_var($ticket_id, FILTER_SANITIZE_STRING);
filter_var($agent, FILTER_SANITIZE_STRING);
filter_var($status, FILTER_SANITIZE_STRING);


// Connect to the SQLite database
$db = new SQLite3('../tickets.db');

if($status == null) $insert_query = "UPDATE tickets SET assigned_agent = '$agent' WHERE ticket_id = '$ticket_id'";
if($status != null) $insert_query = "UPDATE tickets SET status = '$status', assigned_agent = '$agent' WHERE ticket_id = '$ticket_id'";


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
