window.onload = function () {
    console.log('Page has fully loaded');



    // Initialize EmailJS with your user ID
    emailjs.init("DNeq0uJrxAVLV--JE");  // Replace YOUR_USER_ID with your actual EmailJS User ID

    // Log if emailjs was initialized
    console.log("EmailJS initialized");

    const form = document.getElementById('contact.html');
    
    // Check if the form is loaded correctly
    if (!form) {
        console.error("Form element not found!");
        return;  // Exit if form is not found
    }
    console.log("Form found");

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form from submitting the traditional way
        console.log("Form submitted!");  // Debugging: Check if submit event is triggered
        if (validateForm()) {
            sendEmail();  // If valid, send the email
        }
    });

    // Function to validate form fields
    function validateForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        let valid = true;

        // Validate name
        if (name.trim() === '') {
            alert('Name is required.');
            valid = false;
        }

        // Validate email
        if (email.trim() === '' || !isValidEmail(email)) {
            alert('Please enter a valid email.');
            valid = false;
        }

        // Validate message
        if (message.trim() === '') {
            alert('Message is required.');
            valid = false;
        }

        return valid;
    }

    // Helper function to check if the email is valid using a basic regex pattern
    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    // Function to send the email via EmailJS
    function sendEmail() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const templateParams = {
            name: name,
            email: email,
            message: message
        };

        // Log to check if parameters are correct
        console.log("Sending email with params: ", templateParams);

        // Send the email using EmailJS
        emailjs.send('service_6aqouvr', 'template_dsxwwws', templateParams)
            .then(function (response) {
                console.log("Email sent successfully:", response);
                alert('Your message has been sent successfully!');
                form.reset();  // Reset the form after submission
            }, function (error) {
                console.log("Error sending email:", error);
                alert('Failed to send the message. Please try again.');
            });
    }
};
