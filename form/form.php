<?php

    require_once($LIB.'jformer.php');

    // Create the form
$contactForm = new JFormer('contactForm', array(
    'submitButtonText' => 'Send Message',
    'title' => '<h1>Contact Us</h1>',
));

// Add components to the form
$contactForm->addJFormComponentArray(array(
    new JFormComponentSingleLineText('fname', 'First Name:', array(
        'validationOptions' => array('required'),
        'tip' => '<p>Please enter your first name.</p>'
    )),
    new JFormComponentSingleLineText('lname', 'Last Name:', array(
        'validationOptions' => array('required'),
        'tip' => '<p>Please enter your last name.</p>'
    )),
    new JFormComponentSingleLineText('email', 'E-mail address:', array(
        'validationOptions' => array('required', 'email'),
    )),
    new JFormComponentSingleLineText('subject', 'Subject:', array(
        'validationOptions' => array('required'),
    )),
    new JFormComponentTextArea('message', 'Message:', array(
        'validationOptions' => array('required'),
    )),
));

// Set the function for a successful form submission
function onSubmit($formValues) {
    
    $name = $formValues->fname . ' ' . $formValues->lname;

    // Prepare the variables for sending the mail
    $toAddress = 'noreply@gravitee.ca';
    $fromAddress = $formValues->email;
    $fromName = $name;
    $subject = $formValues->subject.' from '.$fromName;
    $message = $formValues->message;

    // Use the PHP mail function
    $mail = mail($toAddress, $subject, $message, 'From: '.$fromAddress."\r\n".'Reply-To: '.$fromAddress."\r\n".'X-Mailer: PHP/'.phpversion());

    // Send the message
    if($mail) {
        $response['successPageHtml'] = '
            <h1>Thanks for Contacting Us</h1>
            <p>Your message has been sent successfully.</p>
        ';
    }
    else {
        $response['failureNoticeHtml'] = '
            There was a problem sending your message.
        ';
    }

    return $response;
}

// Process any request to the form
$contactForm->processRequest();
?>