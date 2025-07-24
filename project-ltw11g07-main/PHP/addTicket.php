<?php
// Get the values submitted by the form
$title = $_POST['title'];
$description = $_POST['description'];
$department = $_POST['department'];
$hashtag = $_POST['hashtag'];

filter_var($title, FILTER_SANITIZE_STRING);
filter_var($description, FILTER_SANITIZE_STRING);
filter_var($department, FILTER_SANITIZE_STRING);
filter_var($hashtag, FILTER_SANITIZE_STRING);


session_start();

$client = $_SESSION['username'];

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');

// Insert the new user into the users table
$insert_query = "INSERT INTO tickets (title, description, client, department, hashtag, status, priority) VALUES ('$title', '$description', '$client','$department', '$hashtag', 'open', 'low')";
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
