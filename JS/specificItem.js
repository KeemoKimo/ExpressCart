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

                    const btnDelete = document.getElementById("btnDeletePost");
                    btnDelete.style.display = "block";

                    const btnMarkAsSold = document.getElementById("btnMarkAsSold");
                    btnMarkAsSold.style.display = "block";

                    const btnAddImage = document.getElementById("btnAddImage");
                    if (data.images.length == 6) {
                        btnAddImage.style.display = "none";
                    } else {
                        btnAddImage.style.display = "block";
                    }

                }else{
                    const btnContact = document.getElementById("btnContactUser");
                    btnContact.style.display = "block";
                }



                const ownerImage = document.getElementById("ownerImage");
                ownerImage.src = data.ownerimg;

                const ownerName = document.getElementById("lblOwnerName");
                ownerName.innerText = data.ownerusername;

                const ownerEmail = document.getElementById("lblOwnerEmail");
                ownerEmail.innerText = data.owneremail;

                const ownerDateJoined = document.getElementById("lblOwnerDateJoined");
                ownerDateJoined.innerHTML = "<p><b>Member Since : </b>" + new Date(data.ownerdatejoined).toLocaleDateString("en-GB") + "</p>";

                displayImages(data);

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

                //FOR MODAL BOX DATA

                document.getElementById("txtName").value = data.name;

                document.getElementById("txtLocation").value = data.location;

                document.getElementById("txtPrice").value = data.price;

                document.getElementById("cmbCategories").value = data.category;

                document.getElementById("cmbConditions").value = data.condition;

                document.getElementById("txtDescription").value = data.description;

                document.getElementById("txtDescription").innerText = data.description;

                document.getElementById("lblHeaderPopup").innerText += ` (Item No. ${data.item_id})`;

            });
    }
    function displayImages(data) {
        const images = data.images;
    
        const itemImage = document.getElementById("itemImage");
    
        itemImage.src = images.length > 1 ? images[1] : "https://res.cloudinary.com/dkgfcemw4/image/upload/v1742222613/49b22b6c-2664-4271-bda2-576e84661667.png";
    
        if (images.length <= 1) {
            document.getElementById("addMoreImageDiv").style.display = "none";
        }
    
        const previewDivs = document.querySelectorAll(".imagePrev");
    
        // Start looping from images[2] instead of images[1] to avoid duplication
        for (let i = 0; i < previewDivs.length; i++) {
            const imageTag = previewDivs[i].querySelector("img");
    
            if (images[i + 2]) { // Start from images[2]
                imageTag.src = images[i + 2];
                previewDivs[i].style.display = "block";
            } else {
                previewDivs[i].style.display = "none";
            }
        }
    }


    window.loadItemData = loadItemData;
});