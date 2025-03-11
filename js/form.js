document.getElementById("templeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    var templeName = document.getElementById("templeName").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var message = document.getElementById("message").value.trim();
    var submitButton = document.getElementById("submitButton");
    var confirmationMessage = document.getElementById("confirmationMessage");

    var isValid = true;

    // Validation checks
    if (templeName === "") {
        document.getElementById("templeNameError").innerText = "Temple Name is required.";
        isValid = false;
    }

    if (email === "" || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        document.getElementById("emailError").innerText = "Enter a valid email address.";
        isValid = false;
    }

    const phonePattern = /^(\+91\s?)?[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").textContent = "Enter a valid 10-digit phone number or +91 format.";
        isValid = false;
    }

    if (message.length < 10) {
        document.getElementById("messageError").innerText = "Message should be at least 10 characters.";
        isValid = false;
    }

    if (!isValid) return; // Stop submission if validation fails

    var formData = {
        templeName,
        email,
        phone,
        message
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    fetch("https://forwardrequest-q2t4p73rbq-uc.a.run.app", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-redirect-url": "https://script.google.com/macros/s/AKfycbxddlnvNUd_9fQ2LePgYin4XVyWoUnDS-H3zT7R0MtTHNp6aip7iiB4W8aJDq8Eo3jT_Q/exec"
        },
        body: JSON.stringify(formData)
    }).then(response => response.text())
        .then(data => {
            confirmationMessage.innerText = "Your request has been submitted! our team will get back to you as soon as possible.";
            confirmationMessage.style.color = "green";
            confirmationMessage.style.marginTop = "10px";
            document.getElementById("templeForm").reset();
        })
        .catch(error => {
            confirmationMessage.innerText = "Something went wrong, please try again.";
            confirmationMessage.style.color = "red";
            confirmationMessage.style.marginTop = "10px";
        }).finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Request Demo";
        });
});
