var user = localStorage.getItem("user");
var str="?mail="+user;
var matchCount=0;
const getbtn = document.getElementById("otpButton")
var res;
var resultOtp;
const baseUrl = "https://cuts-pay-no-deadlines.herokuapp.com/hello"
getbtn.addEventListener('click', getInfo)
async function getInfo() {
    console.log("hi")
    const otp=otpGenerator();
     res = await fetch(baseUrl + str+"&otp="+otp, {
        method: 'GET'
    }).then((res)=>{return res.json()}).then((data)=>
    {
        localStorage.setItem("userOtp",data.otp);
        matchCount=0;
        alert(data.status=='success'?"\nmail has been sent successfuly "+data.mail:"mail sending failed")
        
    })
  
   
}
const tokenIdbtn = document.getElementById("tokenId")
tokenIdbtn.addEventListener('click',matchOtp)

function matchOtp()
{

    var enteredOtp=document.getElementById("text1").value+document.getElementById("text2").value+document.getElementById("text3").value+document.getElementById("text4").value
    if(enteredOtp==localStorage.getItem("userOtp") && matchCount<3)
    {
        console.log(localStorage.getItem("userOtp"))
        console.log(enteredOtp)
        matchCount=0;
        localStorage.setItem("userOtp",null)
        alert("You are verified");
    }
    else
    {
        matchCount++;
        if(matchCount>2)
        alert("Please ask for a new otp.\nExceeded maximum attempts")
        else
        {
            console.log(localStorage.getItem("userOtp"))
            console.log(enteredOtp)
            alert("Wrong otp: Enter correct otp or request for a new one");
        }
       
    }

}

function otpGenerator()
{
     const val=Math.floor(1000+Math.random()*9000).toString();
    return val;
}