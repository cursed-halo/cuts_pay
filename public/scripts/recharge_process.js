var user = localStorage.getItem("user");
var str="?mail="+user;
const getbtn = document.getElementById("otpButton")
var res;
const baseUrl = "https://cuts-pay-no-deadlines.herokuapp.com/hello"
getbtn.addEventListener('click', getInfo)
async function getInfo() {
    console.log("hi")
    const otp=otpGenerator();
     res = await fetch(baseUrl + str+"&otp="+otp, {
        method: 'GET'
    }).then((res)=>{return res.json()}).then((data)=>alert(data.status+""+data.mail))
  
   
}
function otpGenerator()
{
     const val=Math.floor(1000+Math.random()*9000).toString();
    return val;
}