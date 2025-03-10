document.getElementById("templeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    var templeName = document.getElementById("templeName").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var message = document.getElementById("message").value.trim();

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

    fetch("https://script.google.com/macros/s/AKfycbwNWbDSx4dC8qvXNPv7dtOR9VjmoOh7qK3Bx-vVDE43wg_hI8yu17psmmuiN6kFuV9iFA/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(response => response.text())
        .then(data => {
            alert("Form Submitted Successfully!");
            document.getElementById("templeForm").reset(); // Clear form after submission
        })
        .catch(error => alert("Error submitting form."));
});
