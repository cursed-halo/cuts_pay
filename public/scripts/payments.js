const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('session_id');
var rechargeAmt=0;
fetch(`/retrieve-session?session_id=${sessionId}`)
  .then(response => response.json())
  .then(data => {
    console.log("Transaction amount:", data.amount);
    rechargeAmt=data.amount
    // Display or use the transaction amount in your page
  })
  .catch(error => console.error("Error fetching session details:", error));


function performRecharge(userId, rechargeToken) {
    // URL of the server endpoint
    const url = 'https://cuts-pay-no-deadlines.herokuapp.com/recharge';
    console.log("recarge token received:",rechargeToken);
    //console.log(userId);
    // Data to be sent in the request body
    const data = { "userId":userId, "rechargeToken":rechargeToken };
  
    // Use the fetch API to post the data to the server
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // convert the JavaScript object to a JSON string
    })
    .then(async response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        // Convert non-2xx HTTP responses into errors
        const json = await response.json();
          return await Promise.reject(json);
      }
      return response.json(); // Parse the JSON in the response
    })
    .then(data => {
      console.log('Recharge successful:', data);
      alert("heres your recharge token \n"+String(rechargeToken))
      // Do something with the rechargeId here
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Handle any errors here, including displaying error messages from the server
    });
  }
  function encryptData(userId) {
    // URL of the server endpoint
    const url = 'https://cuts-pay-no-deadlines.herokuapp.com/encrypt';
  
    // Data to be sent in the request body
    //const data = { plaintext };
   // var rechargeAmt=document.cookie;

  
    // Use the fetch API to post the data to the server
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({"amt":rechargeAmt,"userId":userId})
       // convert the JavaScript object to a JSON string
    })
    .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON in the response
    })
    .then(data => {
      console.log(userId)
      performRecharge(userId,String(data.encrypted));
      console.log('Encrypted data:', data.encrypted);
      return data;
      // Do something with the encrypted data here
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      return error;
      // Handle any errors here
    });
  }
  //document.getElementById("pay_btn").addEventListener("click",displayToken);
   function displayToken()
  {
    var userId=localStorage.getItem("user");
    var token=encryptData(userId)
    
    
  }

  displayToken()