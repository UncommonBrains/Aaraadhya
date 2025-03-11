const proxyUrl = "https://forwardrequest-q2t4p73rbq-uc.a.run.app";
const templeFormSubmissionUrl = "https://script.google.com/macros/s/AKfycbxddlnvNUd_9fQ2LePgYin4XVyWoUnDS-H3zT7R0MtTHNp6aip7iiB4W8aJDq8Eo3jT_Q/exec";
const popupFormSubmissionUrl = "https://script.google.com/macros/s/AKfycbx-ugr6qiZo76SB1XYEecMpINBVMoEEcnwGtp7RY44tJM9YcSRsAM5XjEi7Vg7eCnqXCw/exec";

document.getElementById("templeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    const templeName = document.getElementById("templeName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitButton = document.getElementById("submitButton");
    const confirmationMessage = document.getElementById("confirmationMessage");

    let isValid = true;

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

    const formData = {
        templeName,
        email,
        phone,
        message
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    fetch(proxyUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-redirect-url": templeFormSubmissionUrl,
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

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    const name = document.getElementById("nameInput").value.trim();
    const phone = document.getElementById("whatsappNumber").value.trim();
    const submitButton = document.getElementById("popupSubmitButton");
    const confirmationMessage = document.getElementById("popupFormConfirmationMessage");

    let isValid = true;

    // Validation checks
    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required.";
        isValid = false;
    }

    const phonePattern = /^(\+91\s?)?[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("whatsappNumberError").textContent = "Enter a valid 10-digit phone number or +91 format";
        isValid = false;
    }

    if (!isValid) return; // Stop submission if validation fails

    const formData = {
        name,
        phone
    };

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    fetch(proxyUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-redirect-url": popupFormSubmissionUrl,
        },
        body: JSON.stringify(formData)
    }).then(response => response.text())
        .then(data => {
            confirmationMessage.innerText = "Submitted successfully! we’ll get back to you shortly.";
            confirmationMessage.style.color = "green";
            confirmationMessage.style.marginTop = "10px";
            document.getElementById("contact-form").reset();
        })
        .catch(error => {
            confirmationMessage.innerText = "Something went wrong, please try again.";
            confirmationMessage.style.color = "red";
            confirmationMessage.style.marginTop = "10px";
        }).finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Submit";
        });
});
