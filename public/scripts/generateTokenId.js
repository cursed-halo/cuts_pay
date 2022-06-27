import { db } from "./firestore_connect.js";
//import {otpMail} from "./mailOtp.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"; 
let userEmail=localStorage.getItem("user")
// Create a reference to the cities collection
import {  query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
const users = collection(db, "user");

// Create a query against the collection.
const q = query(users, where("Email", "==",userEmail));
var password;
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
     password=doc.data().password;
     
    console.log(doc.id, " => ", doc.data().password);
  });
  const otp=Math.floor(1000+Math.random()*9000);
 // otpMail(userEmail,otp);