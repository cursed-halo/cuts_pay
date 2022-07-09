import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"; 
import {db} from "./firestore_connect.js"
import {  query, where,getDocs } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";
var isPassOkay=false;
var isCutsIdOkay=false;
var isPhoneNoOkay=false;
var isNameOkay=false;
var idField = document.getElementById("cuts_ID")
idField.addEventListener(
    "keyup", displayID);

async function displayID(e) {
    const users = collection(db, "user");
    const q1=query(users,where("CUTSID", "==",e.target.value));
    const querySnapshotUsers = await getDocs(q1);
    if(querySnapshotUsers.size==0 && e.target.value.length>0 && containsLowerCase(e.target.value) && !containsSpecialCharacter(e.target.value))
    {
        document.getElementById("cuts_id_icon").innerHTML='<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
        console.log("okay");
        isCutsIdOkay=true;
    }
    
    else
    {
        console.log("Not okay")
        console.log(e.target.value);
        document.getElementById("cuts_id_icon").innerHTML='<i class="fa fa-times-circle-o" aria-hidden="true"></i>'
        isCutsIdOkay=false;
    }
    
}
var nameField = document.getElementById("user_name");
nameField.addEventListener(
    "keyup", displayName
);
function displayName(e)
{
    
    
    if(e.target.value.length>0)
    {
        document.getElementById("name_icon").innerHTML='<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
        isNameOkay=true;
        console.log("okay")
    }
   else
   {
    console.log("Not okay")
    document.getElementById("name_icon").innerHTML='<i class="fa fa-times-circle-o" aria-hidden="true"></i>'
    isNameOkay=false;
   }
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
            document.getElementById("phone_icon").innerHTML='<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
            isPhoneNoOkay=true;
        }
        
        else
        {
            document.getElementById("phone_icon").innerHTML='<i class="fa fa-times-circle-o" aria-hidden="true"></i>'
            console.log("Not okay")
            isPhoneNoOkay=false;
        }
        
        
    }
    var passwordField = document.getElementById("pass")
    passwordField.addEventListener(
        "keyup", displayPassword);
        async function displayPassword(e) {
           
            
            if( e.target.value.length>=8 && continsNumber(e.target.value) && containsSpecialCharacter(e.target.value) && containsLowerCase(e.target.value))
            {

                //console.log(querySnapshotUsers.doc.data());
                document.getElementById("password_icon").innerHTML='<i class="fa fa-check-circle-o" aria-hidden="true"></i>'
                console.log("okay");
                isPassOkay=true;
            }
            
            else
            {
                console.log("Not okay")
                document.getElementById("password_icon").innerHTML='<i class="fa fa-times-circle-o" aria-hidden="true"></i>'
                isPassOkay=false;
            }
            
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
    if(isCutsIdOkay&&isPassOkay&&isPhoneNoOkay&&isNameOkay)
    {
        console.log("okay");
       
        const newUser = await addDoc(collection(db, "user"), {
            CUTSID:idField.value,
            Email:localStorage.getItem("user") ,
            Name:nameField.value,
            Phone:Number(phoneField.value),
            password:passwordField.value
          });
        
        await getInfo();
        window.location.replace("./index.html")
    }
    else
    {
        alert("Please fill all fields properly")
    }

}
 document.getElementById("submit_button").addEventListener('click', onsubmit)
 const baseUrl = "https://cuts-pay-no-deadlines.herokuapp.com/register"
 async function getInfo() {
    var user = localStorage.getItem("user");
    var str="?mail="+user;
    console.log("hi")
   
     var res = await fetch(baseUrl + str, {
        method: 'GET'
    }).then((res)=>{return res.json()}).then((data)=>
    {
        alert(data.status=='success'?"\nmail has been sent successfuly to "+data.mail:"mail sending failed");
        
    })
  
   
}