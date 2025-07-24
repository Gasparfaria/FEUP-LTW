<?php
// Get the values submitted by the form
$question = $_POST['question'];
$answer = $_POST['answer'];

filter_var($question, FILTER_SANITIZE_STRING);
filter_var($answer, FILTER_SANITIZE_STRING);

// Connect to the SQLite database
$db = new SQLite3('../tickets.db');

// Insert the new user into the users table
$insert_query = "INSERT INTO faqs (question, answer) VALUES ('$question', '$answer')";
$insert_result = $db->query($insert_query);

// Check if the insert was successful
if (!$insert_result) {
  echo "Error: " . $db->lastErrorMsg();
} else {
  header('Location: /html/faqs.html');
}

// Close the database connection
$db->close();
?>
