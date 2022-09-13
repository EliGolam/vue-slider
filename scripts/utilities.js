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

function getNextIndex(array, index, change) {
    change = (change === 'previous' || change === 'back' || change === -1) ? -1 : 1;

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