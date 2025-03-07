document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get('userName');

    fetch(`api/getUserData?userName=${encodeURIComponent(userName)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("imgUserProfile").src = data.profileimg;
            document.getElementById("lblUserName").innerHTML = data.username;
            document.getElementById("lblMemberSince").innerHTML =
                "Member Since : <b>" + new Date(data.datejoined).toLocaleDateString('en-GB') + "</b>";
        });
    document.getElementById("passwordChangeContent").action = `/api/changePassword?userName=${userName}`;
});    