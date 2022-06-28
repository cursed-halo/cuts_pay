import {auth,provider} from "./firebase_auth.js"
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
function signoutSite()
{
  var user=localStorage.getItem("user");
  if(user==null)
  {
    alert("You are not yet signed in");
    return;
  }
  signOut(auth).then((e) => {
    
    localStorage.setItem("user",null)
    alert("you have successfully signed out")
  window.location.replace("./index.html");
}).catch((error) => {
 alert("error");
});
}

var c2=document.getElementById("googleSignOutRedux");
c2.addEventListener('click',signoutSite);