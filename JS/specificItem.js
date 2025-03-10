document.addEventListener("DOMContentLoaded", function () {
    const itemID = new URLSearchParams(window.location.search).get("itemId");
    const loggedInUser = new URLSearchParams(window.location.search).get("loggedInUser");

    function loadItemData() {
        fetch(`/api/item?itemID=${itemID}&loggedInUser=${loggedInUser}`)
            .then(response => response.json())
            .then(data => {

                if (data.loggedInUser === data.owner_id) {
                    const btnEdit = document.getElementById("btnEditPost");
                    btnEdit.style.display = "block";
                }

                const ownerImage = document.getElementById("ownerImage");
                ownerImage.src = data.ownerimg;

                const ownerName = document.getElementById("lblOwnerName");
                ownerName.innerText = data.ownerusername;

                const ownerEmail = document.getElementById("lblOwnerEmail");
                ownerEmail.innerText = data.owneremail;

                const ownerDateJoined = document.getElementById("lblOwnerDateJoined");
                ownerDateJoined.innerHTML = "<p><b>Member Since : </b>" + new Date(data.ownerdatejoined).toLocaleDateString("en-GB") + "</p>";

                const itemImage = document.getElementById("itemImage");
                itemImage.src = data.url || 'https://res.cloudinary.com/dkgfcemw4/image/upload/v1739280006/no-photo-or-blank-image-icon.jpg';

                const itemId = document.getElementById("lblItemId");
                itemId.innerText = "Item Id : " + data.item_id;

                const itemTitle = document.getElementById("lblItemTitle");
                itemTitle.innerText = data.name;

                const itemLocation = document.getElementById("lblLocation");
                itemLocation.innerText = data.location;

                const itemDatePosted = document.getElementById("lblDatePosted");
                itemDatePosted.innerText = new Date(data.dateposted).toLocaleDateString('en-GB');

                const itemPrice = document.getElementById("lblItemPrice");
                itemPrice.innerText = "$" + Number(data.price).toLocaleString();

                const itemCondition = document.getElementById("lblItemCondition");
                itemCondition.innerText = "(" + data.condition.toUpperCase() + ")";

                const itemCategory = document.getElementById("lblCategory");
                itemCategory.innerText = data.category;

                const itemDesc = document.getElementById("lblDescription");
                itemDesc.innerText = data.description;

            });
    }


    window.loadItemData = loadItemData;
});