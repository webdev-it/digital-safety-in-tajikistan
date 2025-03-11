<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Ваш email, на который будут отправляться сообщения
    $to = "abdumalikabdumalikov72@gmail.com";
    $subject = "Новое сообщение с сайта";
    $body = "Имя: $name\nE-Mail: $email\nСообщение:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение отправлено успешно!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>