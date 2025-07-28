<?php

    session_start();

    $ticket_id = $_POST['ticket_id'];

    filter_var($ticket_id, FILTER_SANITIZE_STRING);

    $db = new SQLite3('../tickets.db');

    $query = $db->prepare('SELECT * FROM ticket_changes WHERE ticket_id = ? AND change_type = "message"');
    $query->bindValue(1, $ticket_id, SQLITE3_TEXT);
    $result = $query->execute();

    $rows = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $rows[] = $row;
    }

    header('Content-Type: application/json');

    echo json_encode($rows);
    
    exit;

?>