<?php

    $username = $_POST["user_id"];

    filter_var($username, FILTER_SANITIZE_STRING);

    $db = new SQLite3('../tickets.db');
    
    $query = $db->prepare('SELECT * FROM users WHERE username = ?');
    $query->bindValue(1, $username, SQLITE3_TEXT);
    $result = $query->execute();

    $rows = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $rows[] = $row;
    }

    header('Content-Type: application/json');

    echo json_encode($rows);
    
    exit;
?>