import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"; 
import {db} from "./firestore_connect.js"
import {  query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
const trans = collection(db, "Transactions");
const users = collection(db, "user");
let userEmail=localStorage.getItem("user")
// Create a query against the collection.
const q1=query(users,where("Email", "==",userEmail));
var cutsId;
const querySnapshotUsers = await getDocs(q1);
var userName;
querySnapshotUsers.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
     cutsId=doc.data().CUTSID;
     userName=doc.data().Name;
     document.getElementById("username").innerHTML=userName;
     document.getElementById("CUTSID").innerHTML=cutsId;
     document.getElementById("phone").innerHTML=doc.data().Phone;
    console.log(doc.id, " => ",doc.data());
  });
  
const q = query(trans, where("CUTSID", "==",cutsId));
var transactionList=[];
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
     //password=doc.data().password;
     transactionList.push(doc.data());
    console.log(doc.id, " => ", doc.data());
  });
  var i;
for( i=0;i<transactionList.length;i++)
{
console.log(transactionList[i].Amount);
}