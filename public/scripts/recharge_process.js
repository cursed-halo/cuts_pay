var user = localStorage.getItem("user");
var str="?mail="+user;
const getbtn = document.getElementById("otpButton")
var res;
const baseUrl = "http://127.0.0.1:4000/hello"
getbtn.addEventListener('click', getInfo)
async function getInfo() {
    console.log("hi")
    const otp=otpGenerator();
     res = await fetch(baseUrl + str+"&otp="+otp, {
        method: 'GET'
    }).then((res)=>{return res.json()}).then((data)=>console.log(data))
  
   
}
function otpGenerator()
{
     const val=Math.floor(1000+Math.random()*9000).toString();
    return val;
}