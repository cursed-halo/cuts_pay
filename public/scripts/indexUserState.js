var userEmail=localStorage.getItem("user")

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"; 
import {db} from "./firestore_connect.js"
import {  query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import {auth,provider} from "./firebase_auth.js"
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
if(userEmail!="null")
{
    console.log(userEmail+"signin");
    if(userEmail==null || userEmail==undefined)
    {
    console.log("i am here")
    document.getElementById("userState").innerHTML="in";
    }else
    {
      const users = collection(db, "user");
      const q1=query(users,where("Email", "==",localStorage.getItem("user")));
      const querySnapshot = await getDocs(q1);
        if(querySnapshot.size==0)
        {
        signoutSite();
        document.getElementById("userState").innerHTML="in";
        }
        else
        document.getElementById("userState").innerHTML="out";
    }

}
else
{
    console.log(userEmail +"signed out")
    document.getElementById("userState").innerHTML="In";
}   

function signoutSite()
{
  var user=localStorage.getItem("user");
  if(user=="null" || user==null)
  {
    alert("You are not yet signed in");
    return;
  }
  signOut(auth).then((e) => {
    
    localStorage.setItem("user","null");
    alert("You need to complete your registration, please sign in again")
  //window.location.replace("./index.html");
}).catch((error) => {
 alert("error");
});
}


