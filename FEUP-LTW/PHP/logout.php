<?php
  declare(strict_types = 1);

  require_once(__DIR__ . '/../PHP/session.php');
  $session = new Session();
  $session->logout();

  header('Location: /html/login.html');
?>