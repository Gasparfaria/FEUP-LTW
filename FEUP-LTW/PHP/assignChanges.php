<?php

$department = $_POST['change_department'];
$agent = $_POST['change_agent'];
$hashtag = $_POST['change_hashtag'];
$priority = $_POST['change_priority'];
$status = $_POST['change_status'];
$changes = $_POST['arraychanges'];
$ticket_id = $_POST['ticket_id'];
$username = $_POST['username'];

filter_var($department, FILTER_SANITIZE_STRING);
filter_var($agent, FILTER_SANITIZE_STRING);
filter_var($hashtag, FILTER_SANITIZE_STRING);
filter_var($priority, FILTER_SANITIZE_STRING);
filter_var($status, FILTER_SANITIZE_STRING);
filter_var($changes, FILTER_SANITIZE_STRING);
filter_var($ticket_id, FILTER_SANITIZE_STRING);
filter_var($username, FILTER_SANITIZE_STRING);

$db = new SQLite3('../tickets.db');

foreach($changes as $change){

    if($department != null){

        $insert_query = "INSERT INTO ticket_changes (ticket_id, username, change_type, new_value) VALUES ('$ticket_id', '$username', '$change','$department')";
        $insert_result = $db->query($insert_query);
        $department = null;
        continue;
    } 

    if($agent != null){

        $insert_query = "INSERT INTO ticket_changes (ticket_id, username, change_type, new_value) VALUES ('$ticket_id', '$username', '$change','$agent')";
        $insert_result = $db->query($insert_query);
        $agent = null;
        continue;

    }

    if($status != null){

        $insert_query = "INSERT INTO ticket_changes (ticket_id, username, change_type, new_value) VALUES ('$ticket_id', '$username', '$change','$status')";
        $insert_result = $db->query($insert_query);
        $status = null;
        continue;

    }

    if($priority != null){

        $insert_query = "INSERT INTO ticket_changes (ticket_id, username, change_type, new_value) VALUES ('$ticket_id', '$username', '$change','$priority')";
        $insert_result = $db->query($insert_query);
        $priority = null;
        continue;

    }

    if($hashtag != null){

        $insert_query = "INSERT INTO ticket_changes (ticket_id, username, change_type, new_value) VALUES ('$ticket_id', '$username', '$change','$hashtag')";
        $insert_result = $db->query($insert_query);
        $hashtag = null;
        continue;

    }

}


// Close the database connection
$db->close();
?>
