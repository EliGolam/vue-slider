// Initial Handshake
console.log('DEBUG - image-data.js: OK!');

// DATA PATH
const IMG_FORMAT = '.jpg';
const CAROUSEL_IMG_PATH = './assets/img/';
const CAROUSEL_THUMBNAIL_PATH = './assets/img/thumbnails/';

// DOM-IDs
const CAROUSEL_IMG_SELECTOR = '.ms_carousel-img';
const THUMBNAIL_IMG_SELECTOR = '.ms_carousel-nav-img';

// Images Data
const imgData = [
    ['Sunflower Field', 'Woman with black hair seen from the back in an endless sunflower field'],
    ['Mountain Lake', 'Serene Landscape of a lake surrounded by a forested mountain range'],
    ['Endless Dunes', 'A view of golden ondulating desert dunes'],
    ['Green Valley', 'A green luscious valley between hills'],
    ['Sunset', "Sitting woman's silhouette from the back as she makes the heart sign with her hands, between which the glow of the sunset can be seen"]
]
console.log('DEBUG - imgData', imgData);



// Update Images Data with url / image path
for(let imgIdx = 0; imgIdx < imgData.length; imgIdx++) {
    const imgPath = generateImagePath(CAROUSEL_IMG_PATH, IMG_FORMAT, imgIdx);
    imgData[imgIdx].push(imgPath);
}
console.log('DEBUG - updated imgData', imgData);