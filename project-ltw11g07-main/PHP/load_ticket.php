<?php

    session_start();

    $client = $_SESSION['username'];

    $db = new SQLite3('../tickets.db');

    $query = $db->prepare('SELECT * FROM tickets');
    $result = $query->execute();

    $rows = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $rows[] = $row;
    }

    header('Content-Type: application/json');

    echo json_encode($rows);
    
    exit;
?>