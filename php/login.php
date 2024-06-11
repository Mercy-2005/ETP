<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$Email = $_POST['Email'];
$Password1 = $_POST['Password1'];

$conn = new mysqli('localhost', 'root', '', 'expense_tracker');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
} else {
    $stmt = $conn->prepare("SELECT Password1 FROM signup WHERE Email = ?");
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($hashedPassword);
    if ($stmt->fetch()) {
        if (password_verify($Password1, $hashedPassword)) {
            $_SESSION['user'] = $Email;
            echo "<script>
                alert('Login Successful!');
                window.location.href = '/html/homepage.html';
            </script>";
        } else {
            echo "Invalid credentials.";
        }
    } else {
        echo "No user found with that email.";
    }
    $stmt->close();
    $conn->close();
}
?>
