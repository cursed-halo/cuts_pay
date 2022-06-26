import {auth,provider} from "./firebase_auth.js"
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
function signoutSite()
{
  signOut(auth).then((e) => {
    alert(auth.currentUser);
  window.location.replace("./signin.html");
}).catch((error) => {
 alert("error");
});
}
var c2=document.getElementById("googleSignOut");
c2.addEventListener('click',signoutSite);