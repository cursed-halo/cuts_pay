var user = localStorage.getItem("user");
var str="?mail="+user;
var matchCount=0;
const getbtn = document.getElementById("otpButton")
var res;
var resultOtp;
const baseUrl = "https://cuts-pay-no-deadlines.herokuapp.com/hello"
var recharge_amt=document.getElementById("recharge_amount");
const recharge_field=document.getElementById("recharge_amount");
recharge_field.addEventListener('keyup',recharge_amt_checker);
function recharge_amt_checker()
{
    if(recharge_amt.value<=500 && recharge_amt.value>0)
    {
        document.getElementById("recharge_icon").innerHTML='<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
    }
    else
    {
        document.getElementById("recharge_icon").innerHTML='<i class="fa fa-times-circle-o" aria-hidden="true"></i>';
    }
}
getbtn.addEventListener('click', getInfo)
async function getInfo() {
    
    
    if(recharge_amt.value<=500 && recharge_amt.value>0)
    {
    console.log("hi")
    otpTimer();
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
else
{
    alert("please enter a valid amount");
}
  
   
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
// var countDownDate = new Date("July 27, 2022 15:37:25").getTime();
// var today= new Date().toLocaleTimeString();
// console.log(today)

function otpTimer()
{
    var k=10;
    var x=setInterval(function(){
        if(k>=0)
        {
            document.getElementById("otpButton").innerHTML="please Wait";
            document.getElementById("otpButton").disabled=true;
            document.getElementById("timer").innerHTML="Did not receive otp? Please wait for "+k+" s";
            console.log(k--)
        }
       
        else{
            document.getElementById("timer").innerHTML="Request for otp again";
            document.getElementById("otpButton").innerHTML="Send OTP";
            document.getElementById("otpButton").disabled=false;
            clearInterval(x);
        }
    },1000)
}


