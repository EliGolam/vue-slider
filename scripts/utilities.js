// Initial Handshake
console.log('DEBUG - utilities.js: OK!');

// OBJECTS
class Image {
    constructor(title, description, url) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.active = 'active';
    }
}


// FUNCTIONS
function createCollection(data, newPath) {
    const collection = [];

    data.forEach((element, i) => {
        collection.push(new Image(...element));

        if(newPath !== undefined) {
            collection[i].url = generateImagePath(newPath, IMG_FORMAT, i);
        }
    });
    return collection;
}


function generateImagePath (folderPath, imgFormat, imageIndex) {
    if(folderPath === undefined || folderPath === '' || folderPath === null) return null;
    imageIndex++; // Necessary because the images start counting from 01 instead of 00
    const filename = imageIndex < 10 ? '0' + imageIndex : imageIndex;
    const url = folderPath + filename + imgFormat;
    return url;
} 


function moveCarousel (imgs, nav, direction) {
    // Clear previous autoSlide
    clearInterval(autoSlideInterval);

    for (let imgIdx = 0; imgIdx < imgs.length; imgIdx++) {
        // Define direction: 
        direction = (direction === 'previous' || direction === 'back' || direction === -1) ? -1 : 1;

        // Find currently active image
        if (!imgs[imgIdx].classList.contains('active')) continue;

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

    autoSlideInterval = setInterval(autoSlide, SLIDE_TIMER, imgs, nav);
}

function autoSlide (imgs, nav) {
    const direction = isSlideForward ? 'next' : 'previous';
    moveCarousel(imgs, nav, direction);
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