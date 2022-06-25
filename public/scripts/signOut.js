function signoutSite()
{
  signOut(auth).then(() => {
    alert(user.email);
  window.location.replace("./signin.html");
}).catch((error) => {
 alert("error");
});
}
var c2=document.getElementById("googleSignOut");
c2.addEventListener('click',signoutSite);