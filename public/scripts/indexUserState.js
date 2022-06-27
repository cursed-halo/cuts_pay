var userEmail=localStorage.getItem("user")
if(userEmail!=null)
{
    console.log(window.value);
document.getElementById("userState").innerHTML="out";
}
else
{
    document.getElementById("userState").innerHTML="In";
}   