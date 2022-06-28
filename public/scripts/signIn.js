import {auth,provider} from "./firebase_auth.js"
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

function signIn(){
  if(localStorage.getItem("user")!="null" && localStorage.getItem("user")!=null)
  {
    alert("You are already signed in as " +localStorage.getItem("user"));
    return;
  }
    signInWithPopup(auth, provider)
    .then((result) => {


      
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info
      localStorage.setItem("user",result.user.email);
      window.location.replace("./index.html");
     
     // document.location.reload()
     //window.location = "./recharge.html";
      const useremail = result.user.email;

      alert(useremail);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
    var c=document.getElementById("googleSignIn");
    c.addEventListener('click',signIn);
    export{auth};