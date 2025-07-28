<?php

    session_start();

    $var = Array(
        'name' =>   $_SESSION['name'],
        'username' =>     $_SESSION['username'],
        'usertype' => $_SESSION['usertype'],
        'email' => $_SESSION['email'],
        'avatar' => $_SESSION['avatar'],
        'department' => $_SESSION['department']
    );

    header('Content-Type: application/json');

    echo json_encode($var);
    
    exit;
?>