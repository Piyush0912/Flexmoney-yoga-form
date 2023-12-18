function formValidation(age, contact_number) {
  if (age < 18 || age > 65) {
    alert('Age must be between 18 and 65');
    return false;
  }
  var phoneno = /^\d{10}$/;
  if (contact_number.match(phoneno)) {
    return true;
  }
  else {
    alert("Invalid Contact Number!");
    return false;
  }
  return true;
}
document.getElementById("formdata").addEventListener("submit", function (e) {
  e.preventDefault();
  first_name = document.getElementById("first_name").value;
  last_name = document.getElementById("last_name").value;
  age = document.getElementById("age").value;
  email = document.getElementById("email").value;
  contact_number = document.getElementById("contact_number").value;
  if (document.getElementById('g1').checked) {
    gender = document.getElementById('g1').value;
  }
  if (document.getElementById('g2').checked) {
    gender = document.getElementById('g2').value;
  }
  batch_id = document.getElementById("batch_id").value;
  amount = 500;
  payment_successful = "True";
  if (formValidation(age, contact_number) == true) {
    var raw = JSON.stringify({
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "age": age,
      "mobile_number": contact_number,
      "batch_id": batch_id,
      "gender": gender,
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
        // User canceled
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
      fetch('http://127.0.0.1:8000/api/enroll_student', {
        method: 'POST',
        body: raw,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
        .then(data => {
          console.log('Success:', data);
          alert("Yay ! " + first_name + "\n\nYour details have been registered successfully\n\n.")
          document.getElementById("first_name").value = "";
          document.getElementById("last_name").value = "";
          document.getElementById("age").value = "";
          document.getElementById("email").value = "";
          document.getElementById("contact_number").value = "";
          document.getElementById("g1").checked = false;
          document.getElementById("g2").checked = false;
          document.getElementById("output-message").innerText = "Your details have been successfully registered!"
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
          alert("Oops! Error saving your details. Please try again!\n\nEmail Address and Contact Number must be unique!");
          document.getElementById("output-message").innerText = "Oops! Error saving your details. Please try again!"
          setTimeout(function () {
            document.getElementById("output-message").style.display = "none";
          }, 3000);
          setTimeout(function () {
            document.getElementById("output-message").style.display = "";
          }, 1000);
        })
    }
  }
});