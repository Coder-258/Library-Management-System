let create_account=document.getElementById("create_account");
let signDiv=document.getElementById("signDiv");
let loginDiv=document.getElementById("loginDiv");
create_account.addEventListener("click",()=>{
    signDiv.style.display="flex";
    loginDiv.style.display="none";
    create_account.style.display="none";
})