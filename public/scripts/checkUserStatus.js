//import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

import {
  auth
} from "./firebase_auth.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";


var user1;
async function statechange() {

  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      document.getElementById("userState").innerHTML = "out";
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      window.value = 5;
      user1 = user.email;


      console.log(user.uid)
      console.log(user.email)

      var uid=user.uid;


        user.getIdToken( /* forceRefresh */ true).then(function(token){
           
           fetch('http://localhost:4000/users/' + uid, {
        
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

        })
        .then(response => {
          if (response.status == 200) {
            console.log(response.status)
          } else {
            alert("please register yourself. Sign In again or there is an error");
            signoutSite();
          }
          return response.json()
        })
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));

        })
       
        


      // ...
    } else {
      console.log("signed out");
      document.getElementById("userState").innerHTML = "in";
      user1 = "null";
      // User is signed out
      // ...

    }

  });


}
function signoutSite() {
  var user = localStorage.getItem("user");
  if (user == "null" || user == null) {
    alert("You are not yet signed in");
    return;
  }
  signOut(auth).then((e) => {

    localStorage.setItem("user", "null");
    alert("You need to complete your registration, please sign in again")
    //window.location.replace("./index.html");
  }).catch((error) => {
    alert("error");
  });
}
statechange();

function display() {

  //localStorage.setItem("user",user1);

}
setTimeout(display, 3000);