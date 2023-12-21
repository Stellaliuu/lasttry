$(document).ready(function () {
    $("#submitBtn").click(function () {
        // Get username and password from input fields
        var username = $("#username").val();
        var password = $("#password").val();
    
        // Check if username and password are not null or empty
        if (!username || !password) {
            alert("Username and Password can't be Null.");
            window.location.reload();
        }

        // Make API request to register a new user
        fetch('https://prod-26.eastus.logic.azure.com/workflows/f474bb01f87745bfb2ff118e46317171/triggers/manual/paths/invoke/rest/v1/register?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iKt_ZsJqLJwre_TXdkyqbeWdYQCLG2QGa_WwJh1GDec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Username: username, Password: password }),
        })
        .then(response => {
            if (response.status === 200) {
                // Check if there is a valid JSON response
                if (response.headers.get('content-type') && response.headers.get('content-type').includes('application/json')) {
                    return response.json();
                } else {
                    // If no JSON, return an empty object
                    return {};
                }
            } else {
                alert("Registration failed. Please try again.");
                window.location.reload();
                throw new Error('Registration failed');
            }
        })
        .then(data => {
            // Handle data if needed
            alert("Registration successful!");
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error('Error during registration:', error);
            // Handle other errors here
        });
    });
});
