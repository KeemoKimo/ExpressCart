const urlParams = new URLSearchParams(window.location.search);
var userName = urlParams.get('userName');
var loggedInUser = urlParams.get('loggedInUser');

function openItem(idIn) {
    window.location.href = `itemPage.html?loggedInUser=${userName !== null ? userName : loggedInUser}&itemId=${idIn}`;
}

document.addEventListener('DOMContentLoaded', function () {

    function fetchUserItem(userName, limit) {
        fetch(`api/getItemData?userName=${encodeURIComponent(userName)}`)
            .then(response => response.json())
            .then(data => {

                const yourItemsContainer = document.getElementById('yourItemsContainer');
                const allItemContainer = document.getElementById('allItemContainer');

                if (limit === 5) {
                    yourItemsContainer.innerHTML = "";

                    data.slice(0, limit).forEach(item => {
                        yourItemsContainer.innerHTML += createItemTile(item);
                    });
                }

                else {
                    allItemContainer.innerHTML = "";
                    let largeItemHolder;
                    data.slice(0, limit).forEach((item, index) => {
                        if (index % 5 === 0) {
                            largeItemHolder = document.createElement('div');
                            largeItemHolder.classList.add('fullWidthContainer');
                            allItemContainer.appendChild(largeItemHolder);
                        }
                        largeItemHolder.innerHTML += createItemTile(item);
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    }

    //For sold items, replace with horiontal bars later

    function fetchSoldItems(userName, limit) {
        fetch(`api/getItemData?userName=${encodeURIComponent(userName)}&viewAsSold=True`)
            .then(response => response.json())
            .then(data => {

                const soldItemContainer = document.getElementById('SoldItemsContainer');

                soldItemContainer.innerHTML = "";
                let largeItemHolder;
                data.slice(0, limit).forEach((item, index) => {
                    if (index % 5 === 0) {
                        largeItemHolder = document.createElement('div');
                        largeItemHolder.classList.add('fullWidthContainer');
                        soldItemContainer.appendChild(largeItemHolder);
                    }
                    soldItemContainer.innerHTML += createSoldItemTile(item);
                });

            })
            .catch(error => console.error('Error:', error));
    }

    function fetchAllItems(amount) {
        fetch(`api/getItemData`)
            .then(response => response.json())
            .then(data => {
                const allItemContainer = document.getElementById('allItemContainer');
                allItemContainer.innerHTML = "";

                let largeItemHolder;
                data.slice(0, amount).forEach((item, index) => {

                    if (index % 5 == 0) {
                        largeItemHolder = document.createElement('div');
                        largeItemHolder.classList.add('fullWidthContainer');
                        allItemContainer.appendChild(largeItemHolder);
                    }

                    largeItemHolder.innerHTML += createItemTile(item);
                });
            });
    }

    function fetchSpecificCategory(amount, category) {
        fetch(`api/getItemData?category=${category}`)
            .then(response => response.json())
            .then(data => {
                const allItemContainer = document.getElementById('allItemContainer');
                allItemContainer.innerHTML = "";

                let largeItemHolder;
                data.slice(0, amount).forEach((item, index) => {

                    if (index % 5 == 0) {
                        largeItemHolder = document.createElement('div');
                        largeItemHolder.classList.add('fullWidthContainer');
                        allItemContainer.appendChild(largeItemHolder);
                    }

                    largeItemHolder.innerHTML += createItemTile(item);
                });
            });
    }


    function fetchRelatedItems(itemID) {
        fetch(`api/getRelatedPostData?itemID=${itemID}`)
            .then(response => response.json())
            .then(data => {
                console.log("Related item data : " + JSON.stringify(data, null, 2));
                const allItemContainer = document.getElementById('allItemContainer');
                allItemContainer.innerHTML = "";

                let largeItemHolder;
                data.slice(0, 10).forEach((item, index) => {

                    if (index % 5 == 0) {
                        largeItemHolder = document.createElement('div');
                        largeItemHolder.classList.add('fullWidthContainer');
                        allItemContainer.appendChild(largeItemHolder);
                    }

                    largeItemHolder.innerHTML += createItemTile(item);
                });
            });
    }

    function createItemTile(data) {
        const defaultNoImage = "https://res.cloudinary.com/dkgfcemw4/image/upload/v1742222613/49b22b6c-2664-4271-bda2-576e84661667.png";

        const imageUrls = data.image_urls ? data.image_urls.split(',') : [];

        const validImages = imageUrls.filter(url => url.trim() !== defaultNoImage);

        const imageUrl = validImages.length > 0 ? validImages[0] : defaultNoImage;

        return `
            <div class="itemTile" onclick="openItem(${data.id})">
                <img src="${imageUrl}" alt="Item Image">
                <div class="itemTile_lowerDesc">
                    <p class="lblItemTitle">${data.name}</p>
                    <p class="lblLocation">${data.location}</p>
                    <p class="lblDatePosted">${new Date(data.dateposted).toLocaleDateString('en-GB')}</p>
                    <div class="itemTile_bottom">
                        <p class="lblItemPrice">$${Number(data.price).toLocaleString()}</p>
                        <p class="lblItemCondition">${data.condition.toUpperCase()}</p>
                    </div>  
                </div>
            </div>
        `;
    }

    function createSoldItemTile(data) {
        const defaultNoImage = "https://res.cloudinary.com/dkgfcemw4/image/upload/v1742222613/49b22b6c-2664-4271-bda2-576e84661667.png";

        const imageUrls = data.image_urls ? data.image_urls.split(',') : [];

        const validImages = imageUrls.filter(url => url.trim() !== defaultNoImage);

        const imageUrl = validImages.length > 0 ? validImages[0] : defaultNoImage;

        return `
            <div class="individualSoldItems">
                <div id="imageCover">
                    <img src="${imageUrl}" alt="">
                </div>
                <div id="infoDiv">
                    <h2 style="margin-top: 35px;">${data.name}</h2>
                    <p id="lblPrice"><i>$${Number(data.price).toLocaleString()} CAD</i></p>
                    <p id="lblLocation">Location : ${data.location}</p>
                    <p id="lblDatePosted">Date Posted : ${new Date(data.dateposted).toLocaleDateString('en-GB')}</p>
                </div>
                <div id="soldDiv">
                    <h2 style="margin-top: 35%; margin-left: 45px;">SOLD DATE</h2>
                    <p style="margin-left: 70px;">${new Date(data.solddate).toLocaleDateString('en-GB')}</p>
                </div>
            </div>
        `;
    }



    if (userName) {
        fetchUserItem(userName);
    }

    window.fetchItems = fetchUserItem;
    window.fetchRelatedItems = fetchRelatedItems;
    window.fetchAllItems = fetchAllItems;
    window.fetchSpecificCategory = fetchSpecificCategory;
    window.fetchSoldItems = fetchSoldItems;

});