document.addEventListener("DOMContentLoaded", function () {
    const itemID = new URLSearchParams(window.location.search).get("itemId");

    function loadItemData() {
        fetch(`/api/item?itemID=${itemID}`)
            .then(response => response.json())
            .then(data => {

                console.log(data);

                const itemImage = document.getElementById("itemImage");
                itemImage.src = data.url || 'https://res.cloudinary.com/dkgfcemw4/image/upload/v1739280006/no-photo-or-blank-image-icon.jpg';

                const itemId = document.getElementById("lblItemId");
                itemId.innerText = data.id;
                
                const itemTitle = document.getElementById("lblItemTitle");
                itemTitle.innerText = data.name;
                
                const itemLocation = document.getElementById("lblLocation");
                itemLocation.innerText = data.location;
                
                const itemDatePosted = document.getElementById("lblDatePosted");
                itemDatePosted.innerText = data.dateposted;
                
                const itemPrice = document.getElementById("lblItemPrice");
                itemPrice.innerText = data.price;
                
                const itemCondition = document.getElementById("lblItemCondition");
                itemCondition.innerText = data.condition;

            });
    }

    window.loadItemData = loadItemData;
});