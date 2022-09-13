// Initial Handshake
console.log('DEBUG - utilities.js: OK!');

// OBJECTS
class Image {
    constructor(title, description, url) {
        this.title = title;
        this.url = url;
        this.description = description;
    }
}


// FUNCTIONS
function buildCarousel(imgCollection, imgThumbnails, activeIdx) {
    buildCollectionDOM(imgCollection, CAROUSEL_IMG_ID, activeIdx);
    buildCollectionDOM(imgThumbnails, THUMBNAIL_IMG_ID, activeIdx);
}


function buildCollectionDOM(collectionArray, containerDomId, activeIndex) {
    const container = document.getElementById(containerDomId);
    const classDom = containerDomId === CAROUSEL_IMG_ID ? IMG_CLASS_LIST : THUMBNAIL_CLASS_LIST;

    for(let element of collectionArray) {
        const image = document.createElement('img');
        image.src = element.url;
        image.alt = element.title + ': ' + element.description;
        image.classList.add(...classDom);
        if (collectionArray.indexOf(element) === activeIndex) {
            image.classList.add('active');
        }
        container.append(image);
    }
}


function generateImagePath (folderPath, imgFormat, imageIndex) {
    imageIndex++; // Necessary because the images start counting from 01 instead of 00
    const filename = imageIndex < 10 ? '0' + imageIndex : imageIndex;
    const url = folderPath + filename + imgFormat;
    return url;
} 


function generateImagePaths (amountImages, path, imgFormat) {
    const imgPaths = [];

    for(let i = 1; i <= amountImages; i++) {
        const filename = i < 10 ? '0' + i : i;
        const url = path + filename + imgFormat;
        imgPaths.push(url);
    }

    return imgPaths;
}


function moveCarousel (imgs, nav, direction) {
    for (let imgIdx = 0; imgIdx < imgs.length; imgIdx++) {
        console.log('DEBUG - renderImages: OK!');
        // Define direction: 
        direction = (direction === 'previous' || direction === 'back' || direction === -1) ? -1 : 1;

        // Find currently active image
        if (imgs[imgIdx].classList.contains('active') ) {
            // When active image is found we need to make sure the new image will not be out of bounds
            activeImgIdx = getNextIndex(imgs, imgIdx, direction);

            // Activate new image on carousel trhough position
            imgs[activeImgIdx].classList.add('active');
            nav[activeImgIdx].classList.add('active');

            // Remove previously active image
            imgs[imgIdx].classList.remove('active');
            nav[imgIdx].classList.remove('active');
            break;
        }
    }
}


function getNextIndex(array, index, change) {
    switch (index + change) {
        case (array.length): {
            return 0; // Next image would be out of bounds, so it goes back to the beginning
        }
        case (-1): {
            return array.length - 1; 
        }
        default: {
            return index + change;
        }
    }
}