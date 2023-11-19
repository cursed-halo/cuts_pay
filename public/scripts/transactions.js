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
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// const trans = collection(db, "Transactions");
// const users = collection(db, "user");
// let userEmail=localStorage.getItem("user")
// // Create a query against the collection.
// const q1=query(users,where("Email", "==",userEmail));
// var cutsId;
// const querySnapshotUsers = await getDocs(q1);
// var userName;
// querySnapshotUsers.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//      cutsId=doc.data().CUTSID;
//      userName=doc.data().Name;
//      document.getElementById("username").innerHTML=userName;
//      document.getElementById("CUTSID").innerHTML=cutsId;
//      document.getElementById("phone").innerHTML=doc.data().Phone;
//     console.log(doc.id, " => ",doc.data());
//   });

// const q = query(trans, where("CUTSID", "==",cutsId));
// var transactionList=[];
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//      //password=doc.data().password;
//      transactionList.push(doc.data());
//     console.log(doc.id, " => ", doc.data());
//   });
//   var i;
// const tbody = document.getElementById('transactionBody');

// for( i=0;i<transactionList.length;i++)
// {

// row=document.createElement('tr');
// row.innerHTML=`<td>${transactionList[i].CUTSID}</td>
//               <td>${transactionList[i].CUTSID}</td>
//               <td>${transactionList[i].CUTSID}</td>
//               <td>${transactionList[i].CUTSID}</td>`;
//                tbody.appendChild(row);

// }


var signedUser=null;
const url = "https://cuts-pay-no-deadlines.herokuapp.com/linkFirebaseUser";
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    signedUser=user;
    user.getIdToken( /* forceRefresh */ true).then(function (token) {
      // Send token to your backend via HTTPS
      fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }).catch(function (error) {
      console.error('Error getting token:', error);
    });
  } else {
    // No user is signed in.
    window.location.replace("/signin.html");
  }
});
const userid=signedUser.email;
fetch('https://cuts-pay-no-deadlines.herokuapp.com/fetch-transactions/${userid}')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    //document.getElementById('dataDisplay').textContent = JSON.stringify(data);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });