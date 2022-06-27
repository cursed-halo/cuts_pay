//import { getAuth } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

import { auth } from "./firebase_auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";


 var user1;
  async function statechange(){
    
    await onAuthStateChanged(auth,   (user) => {
  if (user) {
    
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
   window.value=5;
    user1=user.email;
   
    
    console.log(user.uid)
    console.log(user.email)
    
   
    // ...
  } else {
    console.log("signed out");
    // User is signed out
    // ...

  }

});


}
statechange();
 
function display()
{
    
    localStorage.setItem("user",user1);
    
}
setTimeout(display,3000);


