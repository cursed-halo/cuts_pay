import { auth } from "./firebase_auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";


onAuthStateChanged(auth, (user) => {
  if (user) {
    
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid)
    console.log(user.email)
    // ...
  } else {
    window.location.replace("./signin.html")
 
    
    // User is signed out
    // ...

  }
});