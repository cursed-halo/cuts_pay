var userEmail=localStorage.getItem("user")

if(userEmail!="null")
{
    console.log(userEmail+"signin");
    if(userEmail==null || userEmail==undefined)
    {
    console.log("i am here")
    document.getElementById("userState").innerHTML="in";
    }else
    {
        document.getElementById("userState").innerHTML="out";
    }

}
else
{
    console.log(userEmail +"signed out")
    document.getElementById("userState").innerHTML="In";
}   