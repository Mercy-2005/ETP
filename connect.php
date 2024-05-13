<?php

$Firstname = $_POST['Firstname'];
$Lastname = $_POST['Lastname'];
$Email = $_POST['Email'];
$Gender = $_POST['Gender'];
$Password = $_POST['Password'];
$Password1 = $_POST['Password1'];


$conn = new mysqli('localhost', 'root', '', 'expense_tracker');

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

else{
    $stmt = $conn->prepare("INSERT INTO sign-up (Firstname,Lastname,Email, Gender,Password,Password1)
     values(?,?,?,?,?,?)");
     $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
    $stmt->bind_param("ssssss",$Firstname,$Lastname,$Email,$Gender,$hashedPassword,$Password1);
    if ($stmt->execute()){
    echo "Registration Successful...";}
    else {
        echo "Error: ". $conn->error_clear_last;
    }
    $stmt->close();
    $conn->close();
}

?>