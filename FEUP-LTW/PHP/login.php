<?php
// Conexão com o banco de dados
$db = new SQLite3('../tickets.db');

// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtém as credenciais do formulário
    $username = $_POST['username'];
    $password = $_POST['password'];

    filter_var($username, FILTER_SANITIZE_STRING);
    filter_var($password, FILTER_SANITIZE_STRING);

    // Consulta o banco de dados para validar o usuário
    $query = $db->prepare('SELECT * FROM users WHERE username = ?');
    $query->bindValue(1, $username, SQLITE3_TEXT);
    $result = $query->execute();
    $user = $result->fetchArray(SQLITE3_ASSOC);
    // Verifica se a senha está correta
    if ($user && password_verify($password, $user['password'])) {
        // Inicia a sessão e redireciona para a página principal
        session_start();

        $_SESSION['name'] = $user['name'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['usertype'] = $user['userType'];
        $_SESSION['avatar'] = $user['avatar'];
        $_SESSION['department'] = $user['department'];

        
        header('Location: /html/main.html');
        exit();
    } else {
        // Exibe uma mensagem de erro
        $error = 'Usuário ou senha inválidos';
        echo $error;
    }
}
?>
