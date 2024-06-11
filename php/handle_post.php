
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the search term and cinema selection from the form
    $search = isset($_POST['search']) ? htmlspecialchars($_POST['search']) : "";
    $cinema = isset($_POST['cinema']) ? htmlspecialchars($_POST['cinema']) : "";

    // Process the search and generate the result dynamically
    // For demonstration purposes, let's just display the search term and selected cinema
    $result = "<h2>Search Results for: $search</h2>";
    $result .= "<p>Cinema: " . ($cinema ? $cinema : "Not selected") . "</p>";

    // Render the result back to the user
    include "../html/result.html";
}
?>

