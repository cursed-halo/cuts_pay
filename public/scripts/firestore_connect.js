
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
 // Required for side-effects



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyC1VhQ3qEY1tB4_myH8CYjUlxyzUgnMb8w",
    authDomain: "cuts4-4ebba.firebaseapp.com",
    databaseURL: "https://cuts4-4ebba-default-rtdb.firebaseio.com",
    projectId: "cuts4-4ebba",
    storageBucket: "cuts4-4ebba.appspot.com",
    messagingSenderId: "828942630848",
    appId: "1:828942630848:web:026d8f33d4e976e8a9d225"
  };
  
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const db = getFirestore(app);
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"; 

 async function  push(a)
 {
  console.log(a);
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
var c=document.getElementById("SubmitLogin");
c.addEventListener('click',function(){
  push(5);
});

// Initialize Cloud Firestore and get a reference to the service
 function  get_db()
{
  document.getElementById("SubmitLogin");
  console.log("hi");
return db;
}

export{get_db};