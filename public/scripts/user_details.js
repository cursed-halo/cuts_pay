import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"; 
import {db} from "./firestore_connect.js"
import {  query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
var isPassOkay=false;
var isCutsIdOkay=false;
var isPhoneNoOkay=false;
var idField = document.getElementById("cuts_ID")
idField.addEventListener(
    "keyup", displayID);

async function displayID(e) {
    const users = collection(db, "user");
    const q1=query(users,where("CUTSID", "==",e.target.value));
    const querySnapshotUsers = await getDocs(q1);
    if(querySnapshotUsers.size==0)
    {
        console.log("okay");
        isCutsIdOkay=true;
    }
    
    else
    console.log("Not okay")
    console.log(e.target.value);
}
var phoneField = document.getElementById("phn_no")
phoneField.addEventListener(
    "keyup", displayPhone);
    async function displayPhone(e) {
        console.log(typeof(e.target.value))
        const users = collection(db, "user");
        const q1=query(users,where("Phone", "==",Number(e.target.value)));
        const querySnapshotUsers = await getDocs(q1);
        console.log(querySnapshotUsers.size)
        if(querySnapshotUsers.size==0 && e.target.value.length==10)
        {
            //console.log(querySnapshotUsers.doc.data());
            console.log("okay");
            isPhoneNoOkay=true;
        }
        
        else
        console.log("Not okay")
        
    }
    var passwordField = document.getElementById("pass")
    passwordField.addEventListener(
        "keyup", displayPassword);
        async function displayPassword(e) {
           
            
            if( e.target.value.length>=8 && continsNumber(e.target.value) && containsSpecialCharacter(e.target.value) && containsLowerCase(e.target.value))
            {

                //console.log(querySnapshotUsers.doc.data());
                console.log("okay");
                isPassOkay=true;
            }
            
            else
            console.log("Not okay")
            
        }
        function continsNumber(str)
        {
            return /\d/.test(str)
        }
        function containsSpecialCharacter(str)
        {
            const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return specialChars.test(str);
        }
        function containsLowerCase(str)
        {
            
                return (/[a-z]/.test(str));
            
        }

async function onsubmit()
{
    if(isCutsIdOkay&&isPassOkay&&isPhoneNoOkay)
    {
        console.log("okay");
        try{
        const newUser = await addDoc(collection(db, "user"), {
            CUTSID:idField.value,
            Email:localStorage.getItem("user") ,
            Name:"",
            Phone:Number(phoneField.value),
            password:passwordField.value
          });
        }
        catch
        {
            alert("error")
        }
         
          window.location.replace("./index.html")
    }
    else
    {
        alert("Please fill all fields properly")
    }

}
document.getElementById("submit_button").addEventListener('click',onsubmit)
