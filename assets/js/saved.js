function removeGIFFromFavorite(event) {
    const likeButton = event.currentTarget;
    const gifId = likeButton.dataset.gifId;

    const gifElement = document.getElementById(gifId);
    const gifVideoUrl = gifElement.querySelector('source').src;
    const gifImageUrl = gifElement.querySelector('img').src;

    const db = window.db;

    // TODO: 6a - Open IndexedDB's database
    var dbPromise = db.open('ILoveGifs', 1);

    // TODO: 6b - Remove GIF from local database using its ID
    dbPromise.then(function(db) {
        var gifs = db.gifs;
        var item = {
            id: gifId,
            title: gifTitle,
            imageUrl: gifImageUrl,
            videoUrl: gifVideoUrl
        };
        gifs.delete(item);
      }).then(function() {
        console.log('deleted gif element from the gifs table!');
      });

    // TODO: 6c - Remove GIF media (image and video) from cache

    // Remove GIF element
    const articlesContainerElement = document.getElementById("gifs");
    articlesContainerElement.removeChild(gifElement);

}

function buildGIFCard(gifItem) {
    // Create GIF Card element
    const newGifElement = document.createElement("article");
    newGifElement.classList.add("gif-card");
    newGifElement.id = gifItem.id;

    // Append image to card
    const gifImageElement = document.createElement('video');
    gifImageElement.autoplay = true;
    gifImageElement.loop = true;
    gifImageElement.muted = true;
    gifImageElement.setAttribute('playsinline', true);

    const videoSourceElement = document.createElement('source');
    videoSourceElement.src = gifItem.videoUrl;
    videoSourceElement.type = 'video/mp4';
    gifImageElement.appendChild(videoSourceElement);

    const imageSourceElement = document.createElement('img');
    imageSourceElement.classList.add('lazyload');
    imageSourceElement.dataset.src = gifItem.imageUrl;
    imageSourceElement.alt = `${gifItem.title} image`;
    gifImageElement.appendChild(imageSourceElement);

    newGifElement.appendChild(gifImageElement);

    // Append metadata to card
    const gifMetaContainerElement = document.createElement("div");
    newGifElement.appendChild(gifMetaContainerElement);

    // Append title to card metadata
    const gifTitleElement = document.createElement("h3");
    const gifTitleNode = document.createTextNode(gifItem.title || 'No title');
    gifTitleElement.appendChild(gifTitleNode);
    gifMetaContainerElement.appendChild(gifTitleElement);

    // Append remove button to card metadata
    const removeButtonElement = document.createElement("button");
    removeButtonElement.setAttribute('aria-label', `Remove ${gifItem.title}`);
    removeButtonElement.classList.add("button");
    removeButtonElement.dataset.gifId = gifItem.id;
    removeButtonElement.onclick = removeGIFFromFavorite;
    const removeIconElement = document.createElement("i");
    removeIconElement.classList.add("fas", "fa-times");
    removeButtonElement.appendChild(removeIconElement);
    gifMetaContainerElement.appendChild(removeButtonElement);

    // Append GIF Card to DOM
    const articlesContainerElement = document.getElementById("gifs");
    articlesContainerElement.appendChild(newGifElement);
}

window.addEventListener("DOMContentLoaded", async function () {

    const db = window.db;
    // TODO: 5a - Open IndexedDB's database
    var dbPromise = db.open('ILoveGifs', 1);
    // TODO: 5b - Fetch saved GIFs from local database and display them (use function buildGIFCard)

    dbPromise.then(function(db) {
        try {
            
            const gifs = dbPromise.gifs.getAll();

            gifs.forEach(async gif => { // Display every GIF
            // TODO: 4e - Get GIF from IndexedDB's database, by its ID
            // TODO: 4f - Create a boolean `isSaved` to check if the GIF was already saved
            const isSaved = true;
            // TODO: 1g - Call the function buildGIFCard with proper parameters
            buildGIFCard(gif, isSaved);
            // TIP: Use the boolean `isSaved`               
            });
        } catch(e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    });    
});