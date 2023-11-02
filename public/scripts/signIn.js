import {
  auth,
  provider
} from "./firebase_auth.js"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
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
async function signIn() {
  if (localStorage.getItem("user") != "null" && localStorage.getItem("user") != null) {
    alert("You are already signed in as " + localStorage.getItem("user"));
    return;
  }
  await signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log("heello");
      try {
        // const users = collection(db, "user");

        // const q1=query(users,where("Email", "==",result.user.email));
        // const querySnapshot = await getDocs(q1);
        // console.log(querySnapshot.size);

        const url = "http://localhost:4000/linkFirebaseUser";
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in.
            user.getIdToken( /* forceRefresh */ true).then(function (token) {
              // Send token to your backend via HTTPS
              fetch(url, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  },
                })
                .then(response => {
                  return response.json();
                  // if(response.status==400)
                  // {
                  //   console.log("user not found");

                  // }
                  // if(response.status==200)
                  // {


                  // //  var msg= response.json().
                  // //  console.log(msg);
                  // //   if(msg=="Redirect")
                  // //   {
                  // //     window.location.replace("/signup.html");
                  // //   }
                  //  // else
                  //    // window.location.replace("/index.html")
                  // }
                })
                .then(data => {
                  console.log(data)
                  if (data.message == "Redirect")
                    window.location.replace("signup.html");
                  else
                    window.location.replace("index.html")

                })
                .catch(error => console.error('Error:', error));
            }).catch(function (error) {
              console.error('Error getting token:', error);
            });
          } else {
            // No user is signed in.
            window.location.replace("/signin.html");
          }
        });


      } catch (e) {
        console.log(e);
      }


      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info

      localStorage.setItem("user", result.user.email);
      const useremail = result.user.email;

      alert(useremail);
      if (querySnapshot.size == 0)
        window.location.replace("./signup.html");
      else
        window.location.replace("./index.html");

      // document.location.reload()
      //window.location = "./recharge.html";

      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
var c = document.getElementById("googleSignIn");
c.addEventListener('click', signIn);
export {
  auth
};