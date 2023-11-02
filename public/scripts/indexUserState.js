var userEmail = localStorage.getItem("user")

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import {
  db
} from "./firestore_connect.js"
import {
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
import {
  auth,
  provider
} from "./firebase_auth.js"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { PassThrough } from "nodemailer/lib/xoauth2/index.js";


if (userEmail != "null") {
  alert("welcome")
  console.log(userEmail + "signin");
  if (userEmail == null || userEmail == undefined) {
    console.log("i am here")
    document.getElementById("userState").innerHTML = "in";
  } else {
    console.log("hey there register");
    onAuthStateChanged(auth, (user) => {
      uid=user.uid;
      user.getIdToken( /* forceRefresh */ true).then(function (token) {
        fetch('http://localhost:4000/users'+uid, {
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
    })

    const users = collection(db, "users");
    const q1 = query(users, where("Email", "==", localStorage.getItem("user")));
    const querySnapshot = await getDocs(q1);
    if (querySnapshot.size == 0) {
      signoutSite();
      document.getElementById("userState").innerHTML = "in";
    } else
      document.getElementById("userState").innerHTML = "out";
  }

} else {
  console.log(userEmail + "signed out")
  document.getElementById("userState").innerHTML = "In";
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