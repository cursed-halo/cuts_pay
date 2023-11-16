import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
var stripe = Stripe('pk_live_51O2RX5SCi3KIkJE3IcjHOBMHG0hosIEx902U1Hra5yJRexbHoGECsmJKKpXkGDtIwgAU6NvIttysvPNoVQ8ZqUKu00V1cbkS0q');
import {
    auth
} from "./firebase_auth.js";
import {
    db
  } from "./firestore_connect.js"
  import {
    query,
    where,
    getDocs
  } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
var user = localStorage.getItem("user");
var str = "?mail=" + user;
var matchCount = 0;
const getbtn = document.getElementById("otpButton")
const otpCard = document.getElementById("otp_div")
const prev_otpCard = otpCard.innerHTML;
otpCard.innerHTML = null;
otpCard
var res;
var resultOtp;
const baseUrl = "https://cuts-pay-no-deadlines.herokuapp.com/hello"
var recharge_amt = document.getElementById("recharge_amount");
const recharge_field = document.getElementById("recharge_amount");
recharge_field.addEventListener('keyup', recharge_amt_checker);

function recharge_amt_checker() {
    if (recharge_amt.value <= 500 && recharge_amt.value > 0) {
        document.getElementById("recharge_icon").innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
    } else {
        document.getElementById("recharge_icon").innerHTML = '<i class="fa fa-times-circle-o" aria-hidden="true"></i>';
    }
}
getbtn.addEventListener('click', getInfo)
async function getInfo() {


    if (recharge_amt.value <= 200 && recharge_amt.value > 0) {
        console.log("hi")
        otpTimer();

        onAuthStateChanged(auth, (user) => {
            try {
                console.log()
                otpGenerator(user.email);
            } catch (e) {
                console.log(e);
            }
        })
    } else {
        alert("please enter a valid amount");
    }


}

async function matchOtp(email) {

    var otp = document.getElementById("text1").value + document.getElementById("text2").value + document.getElementById("text3").value + document.getElementById("text4").value
    try {
        const response = await fetch('https://cuts-pay-no-deadlines.herokuapp.com/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail: email,
                otp: otp
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            matchCount++;
            if (matchCount > 2) {
                alert("Please ask for a new otp.\nExceeded maximum attempts")
                otpCard.innerHTML = null;
            } else {
                
                alert("Wrong otp: Enter correct otp or request for a new one");
            }
            console.error('Error verifying OTP:', errorData.error);
            alert('Error verifying OTP: ' + errorData.error);
        } else {
            const successData = await response.json();
            matchCount = 0;
            
            // localStorage.setItem("userOtp", null)
            // Function to call the /recharge endpoint and perform a recharge operation

  // Example usage:
             //performRecharge(user.email, );
  
            //  document.cookie = ""+recharge_amt.value;
            // alert("You are verified \n Press enter to proceed to payments");

            // window.location.replace("Payment_self.html");
            fetch('https://cuts-pay-no-deadlines.herokuapp.com/create-checkout-session', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: recharge_amt.value }), // Send the price in the request body
              })
              .then(response => {
                console.log(recharge_amt.value)
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(session => {
                return stripe.redirectToCheckout({ sessionId: session.id });
              })
              .catch(error => {
                console.error('Error:', error);
                // Display error message to the user, or handle it as needed
              });
            
            console.log(successData.message);
            
        }
    } catch (error) {
        console.error('Error sending verify OTP request:', error);
        alert('An error occurred while verifying OTP. Please try again.');
    }
}

  


// function matchOtp() {

//     var enteredOtp = document.getElementById("text1").value + document.getElementById("text2").value + document.getElementById("text3").value + document.getElementById("text4").value
//     verifyOtp(email, enteredOtp);
//     if (enteredOtp == localStorage.getItem("userOtp") && matchCount < 3) {
//         console.log(localStorage.getItem("userOtp"))
//         console.log(enteredOtp)
//         matchCount = 0;
//         localStorage.setItem("userOtp", null)
//         alert("You are verified \n Press enter to proceed to payments");
//         window.location.replace("Payment_self.html");
//     } else {
//         matchCount++;
//         if (matchCount > 2) {
//             alert("Please ask for a new otp.\nExceeded maximum attempts")
//             otpCard.innerHTML = null;
//         } else {
//             console.log(localStorage.getItem("userOtp"))
//             console.log(enteredOtp)
//             alert("Wrong otp: Enter correct otp or request for a new one");
//         }

//     }

// }

async function otpGenerator(mailId) {
    try {
        const response = await fetch(`https://cuts-pay-no-deadlines.herokuapp.com/hello?mail=${mailId}`);
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
            otpCard.innerHTML = prev_otpCard;
            const tokenIdbtn = document.getElementById("tokenId")
            tokenIdbtn.addEventListener('click', ()=>matchOtp(mailId))
            matchCount = 0;
            console.log("OTP sent successfully to " + data.mail);
        } else if (data.status === "failure") {
            console.log("Failed to send OTP to " + data.mail);
        } else {
            console.log("An error occurred");
        }
    } catch (error) {
        console.error("Error fetching OTP:", error);
    }
}
// var countDownDate = new Date("July 27, 2022 15:37:25").getTime();
// var today= new Date().toLocaleTimeString();
// console.log(today)

function otpTimer() {
    var k = 10;
    var x = setInterval(function () {
        if (k >= 0) {
            document.getElementById("otpButton").innerHTML = "please Wait";
            document.getElementById("otpButton").disabled = true;
            document.getElementById("timer").innerHTML = "Did not receive otp? Please wait for " + k + " s";
            console.log(k--)
        } else {
            document.getElementById("timer").innerHTML = "Request for otp again";
            document.getElementById("otpButton").innerHTML = "Send OTP";
            document.getElementById("otpButton").disabled = false;
            clearInterval(x);
        }
    }, 1000)
}
// Function to call the /encrypt endpoint and get the encrypted data
function encryptData(plaintext) {
    // URL of the server endpoint
    const url = '/encrypt';
  
    // Data to be sent in the request body
    const data = { plaintext };
  
    // Use the fetch API to post the data to the server
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // convert the JavaScript object to a JSON string
    })
    .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON in the response
    })
    .then(data => {
      console.log('Encrypted data:', data.encrypted);
      // Do something with the encrypted data here
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Handle any errors here
    });
  }
  
  // Example usage:
  
  