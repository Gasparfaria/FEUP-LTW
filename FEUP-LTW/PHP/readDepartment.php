<?php

    $db = new SQLite3('../tickets.db');

    $query = $db->prepare('SELECT * FROM departments');
    $result = $query->execute();

    $rows = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $rows[] = $row;
    }

    $jsonData = json_encode($rows);

    // URL-encode the JSON data and append it as a query parameter
    $encodedData = urlencode($jsonData);

    // Redirect the user to the target page with the data as a query parameter
    header('Location: /html/addDepartment.html?data=' . $encodedData);

?>