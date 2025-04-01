function loadRegister(){
    document.getElementById("frmLogin").style.display = "none"
    document.getElementById("frmSignUp").style.display = "block"
    document.getElementById("coverImage").src = "../register.jpg";
}

function loadSignIn(){
    document.getElementById("frmLogin").style.display = "block"
    document.getElementById("frmSignUp").style.display = "none"
    document.getElementById("coverImage").src = "../loginCover.jpg";
}
