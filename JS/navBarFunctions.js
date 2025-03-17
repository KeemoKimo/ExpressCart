document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("userName") || urlParams.get("loggedInUser");

    function openSellPage() {
        window.location.href = "addItemPage.html?userName=" + userName;
    }

    function openProfilePage() {
        window.location.href = "userProfilePage.html?userName=" + userName;
    }
    
    document.getElementById("lblLogo_NAV").addEventListener("click", function(){
        window.location.href = "mainPage.html?userName=" + userName;
    });

    window.openSellPage = openSellPage;
    window.openProfilePage = openProfilePage;
});