<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "your-email@example.com"; // Replace with your email
    $subject = "New Contact Form Submission";
    
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    $headers = "From: $email";
    
    mail($to, $subject, $email_content, $headers);
    
    // Redirect back to the portfolio with a success message
    header("Location: index.html?message=success");
}
?> 