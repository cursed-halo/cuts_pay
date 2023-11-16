// Client-side JavaScript to call the encryption endpoint

// Function to call the encrypt endpoint and handle the response
function encryptData(plaintext) {
    // The URL of the endpoint
    const url = 'https://cuts-pay-no-deadlines.herokuapp.com/encrypt';
  
    // The data you want to send in the POST request
    const data = { plaintext };
  
    // Use the fetch API to send the POST request
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // convert the JavaScript object to a JSON string
    })
    .then(response => response.json()) // parse the JSON response
    .then(data => {
      console.log('Success:', data);
      // Do something with the encrypted data here
      // For example, you could update the DOM to display the encrypted data
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  // Example usage of the function
  encryptData('12547AB');
  