<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$Firstname = $_POST['Firstname'];
$Lastname = $_POST['Lastname'];
$Email = $_POST['Email'];
$Gender = $_POST['Gender'];
$Password1 = $_POST['Password1'];
$Password2 = $_POST['Password2'];

if ($Password1 !== $Password2) {
    die('Passwords do not match.');
}

$conn = new mysqli('localhost', 'root', '', 'expense_tracker');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO signup (Firstname,Lastname,Email, Gender,Password1) VALUES(?,?,?,?,?)");
    $hashedPassword = password_hash($Password1, PASSWORD_DEFAULT);
    $stmt->bind_param("sssss", $Firstname, $Lastname, $Email, $Gender, $hashedPassword);
    if ($stmt->execute()) {
        echo "<script>
            alert('Registration Successful!');
            window.location.href = '../html/signup.html';
        </script>";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
    $conn->close();
}

?>
