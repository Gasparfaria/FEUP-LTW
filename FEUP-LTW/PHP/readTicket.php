<?php

    session_start();

    $ticket_id = $_POST['ticket_id'];

    filter_var($ticket_id, FILTER_SANITIZE_STRING);

    $db = new SQLite3('../tickets.db');

    $query = $db->prepare('SELECT * FROM tickets WHERE ticket_id = ?');
    $query->bindValue(1, $ticket_id, SQLITE3_TEXT);
    $result = $query->execute();

    $row;

    $row = $result->fetchArray(SQLITE3_ASSOC);

    header('Content-Type: application/json');

    echo json_encode($row);
    
    exit;

?>