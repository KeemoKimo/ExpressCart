document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("userName") || urlParams.get("loggedInUser");

    function openSellPage() {
        window.location.href = "addItemPage.html?userName=" + userName;
    }

    function openProfilePage() {
        window.location.href = "userProfilePage.html?userName=" + userName;
    }

    function openAllPostPage() {
        window.location.href = "specificCategoryPage.html?category=" + encodeURIComponent("All Categories") + "&loggedInUser=" + userName;
    }

    document.getElementById("lblLogo_NAV").addEventListener("click", function () {
        window.location.href = "mainPage.html?userName=" + userName;
    });

    document.getElementById("txtItems_NAV").addEventListener("keydown", function (event) {
        if (event.key == 'Enter') {
            const selectedValue = document.getElementById("cmbCategories_NAV").value;
            window.location.href = "specificCategoryPage.html?category=" + encodeURIComponent(selectedValue) + "&loggedInUser=" + userName;
        }
    });

    const categoryBlocks = document.querySelectorAll(".categoryBlock");

    categoryBlocks.forEach(block => {
        block.addEventListener("click", function () {
            const category = this.querySelector("p").innerText;
            window.location.href = "specificCategoryPage.html?category=" + encodeURIComponent(category) + "&loggedInUser=" + userName;
        });
    });

    window.openSellPage = openSellPage;
    window.openProfilePage = openProfilePage;
    window.openAllPostPage = openAllPostPage;
});