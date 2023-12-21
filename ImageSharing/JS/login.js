$(document).ready(function () {
  $("#loginBtn").click(function () {
    // Get username and password from input fields
    var username = $("#username").val();
    var password = $("#password").val();

    // Make API request for authentication
    fetch('https://prod-34.eastus.logic.azure.com/workflows/b8aa14d8de91446d9c44c451f9506e69/triggers/manual/paths/invoke/rest/v1/login?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rtOU_n_ftJVzPj4FQ1RuGr3fWBOm9OIpaVdHWFY9Y_Y', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: username, Password: password }),
    })
    .then(response => response.json())
    .then(data => {
      // Check the response data to determine login success
      if (Object.keys(data).length !== 0) {
        // If authentication is successful, redirect to the main page
        window.location.href = "../AssetTracking/index.html";
      } else {
        // If authentication fails (user not found), show an alert
        alert("Invalid username or password. Please try again.");
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      // Handle other errors here
    });
  });
});
