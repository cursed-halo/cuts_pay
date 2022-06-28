var userEmail=localStorage.getItem("user")
if(userEmail!="null")
{
    console.log(userEmail+"signin");
document.getElementById("userState").innerHTML="out";
}
else
{
    console.log(userEmail +"signed out")
    document.getElementById("userState").innerHTML="In";
}   