
document.getElementById("update").addEventListener("click", function (e) {
    e.preventDefault();
    email = document.getElementById("email").value;
    batch_id = document.getElementById("batch_id").value;
    amount = 500;
    payment_successful = "True";
    var raw = JSON.stringify({
        "email": email,
        "batch_id": batch_id,
        "amount": 500,
        "payment_successful": true
    });
    console.log(raw);
    promptPayment();
    function promptPayment() {
        const confirmPayment = confirm("Do you want to proceed with the payment?");

        // Check if the user confirmed
        if (confirmPayment) {
            completePayment();
        } else {
            alert("Payment canceled. You can submit the form again if you change your mind.");
            return;
        }
    }
    function completePayment() {
        // This is a mock function
        alert("Payment completed successfully!");
        APICall();
    }
    function APICall() {

        fetch('http://127.0.0.1:8000/api/update_student', {
            method: 'POST',
            body: raw,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Yay ! Your details have been updated successfully\n\n")

                document.getElementById("email").value = "";

                document.getElementById("output-message").innerText = "Your details have been successfully updated!"
                setTimeout(function () {
                    document.getElementById("output-message").style.display = "none";
                }, 3000);
                setTimeout(function () {
                    document.getElementById("output-message").style.display = "";
                }, 1000);
            })
            .catch(error => {
                console.log('Error:', error);
                console.error('Error:', error);
                alert("Oops! Error saving your details. Please try again!\n\nYou might not be registered!");
                document.getElementById("output-message").innerText = "Oops! Error saving your details. Please try again!\nYou might not be registered"
                setTimeout(function () {
                    document.getElementById("output-message").style.display = "none";
                }, 3000);
                setTimeout(function () {
                    document.getElementById("output-message").style.display = "";
                }, 1000);
            })
    }
});