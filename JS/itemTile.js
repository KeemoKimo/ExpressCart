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

                if (limit === 5) {
                    const yourItemsContainer = document.getElementById('yourItemsContainer');
                    yourItemsContainer.innerHTML = "";

                    data.slice(0, limit).forEach(item => {
                        yourItemsContainer.innerHTML += createItemTile(item);
                    });
                }

                else {
                    const allItemContainer = document.getElementById('allItemContainer');
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

    function fetchAllItems() {
        fetch(`api/getItemData`)
            .then(response => response.json())
            .then(data => {
                const allItemContainer = document.getElementById('allItemContainer');
                allItemContainer.innerHTML = "";

                let largeItemHolder;
                data.slice(0, 25).forEach((item, index) => {

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
        const defaultNoImage = "https://res.cloudinary.com/dkgfcemw4/image/upload/v1741278160/9e5060d1-96dc-4c7d-82e3-5bdb80595928.png";

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

    if (userName) {
        fetchUserItem(userName);
    }

    fetchAllItems();

    window.fetchItems = fetchUserItem;
    window.fetchRelatedItems = fetchRelatedItems;

});