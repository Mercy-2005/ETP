<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$Firstname = $_POST['Firstname'];
$Lastname = $_POST['Lastname'];
$Email = $_POST['Email'];
$Gender = $_POST['Gender'];
$Password1 = $_POST['Password1'];
$Password2 = $_POST['Password2'];


$conn = new mysqli('localhost', 'root', '', 'expense_tracker');

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

else{
    $stmt = $conn->prepare(" INSERT INTO signup (Firstname,Lastname,Email, Gender,Password1,Password2)
     VALUES(?,?,?,?,?,?)");
     $hashedPassword = password_hash($Password1, PASSWORD_DEFAULT);
     $hashedPassword2 = password_hash($Password2, PASSWORD_DEFAULT);
    $stmt->bind_param("ssssss",$Firstname,$Lastname,$Email,$Gender,$hashedPassword,$hashedPassword2);
    if (!empty($Password1 && $Password2)) {
        if ($stmt->execute()) {
            echo "Registration Successful...";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "Error: Password cannot be empty.";
    }
   
    
    $stmt->close();
    $conn->close();
}

?>