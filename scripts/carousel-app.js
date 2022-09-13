// Initial Handshake
console.log('DEBUG - carousel-app.js: OK!');

// Carousel SETTINGS
const SLIDE_TIMER = 5000; // in ms
let activeImgIdx = 0;


// Array of Image objects
const imgCollection = [];
// FOR loop to create an Image Object for each element in imgData
for(let image of imgData) {
    imgCollection.push(new Image(...image));
}
console.log('DEBUG - imgCollection', imgCollection);


// Array of Image objects for Thumbnail
const imgThumbnails = [];
// FOR loop to create an Image Object in imgThumbnail for each element in imgData
for(let i = 0; i < imgData.length; i++) {
    const url = generateImagePath(CAROUSEL_THUMBNAIL_PATH, IMG_FORMAT, i);
    imgThumbnails.push(new Image(imgData[i][0], imgData[i][1], url));
}
console.log('DEBUG - imgThumbnails', imgThumbnails);


// BUILD CAROUSEL
buildCarousel(imgCollection, imgThumbnails, activeImgIdx);



///////////////////////////////////////////////////////////////
// DOM Elements
const carouselImg = document.querySelectorAll('.ms_carousel-img');
const carouselNavImg = document.querySelectorAll('.ms_carousel-nav-img');
console.log(carouselImg, carouselNavImg);

const prevButton = document.querySelector('.ms_previous-button');
const nextButton = document.querySelector('.ms_next-button');



///////////////////////////////////////////////////////////////
// CAROUSEL BUTTONS 
// Carousel Previous
prevButton.addEventListener('click', () => {
    console.log('DEBUG - prevButton: Clicked');
    moveCarousel(carouselImg, carouselNavImg, 'previous');
});

// Carousel Next
nextButton.addEventListener('click', () => {
    console.log('DEBUG - nextButton: Clicked');
    moveCarousel(carouselImg, carouselNavImg, 'next');
});



// CAROUSEL NAVIGATION
for (let imgIdx = 0; imgIdx < carouselNavImg.length; imgIdx++) {
    carouselNavImg[imgIdx].addEventListener('click', () => {
        console.log('DEBUG - carouselNavImg Click: OK!');
        activeImgIdx = imgIdx; // When the thumbnail is clicked, assign the thumbnail's index as the new active index

        for (let j = 0; j < carouselNavImg.length; j++) {
            if (carouselNavImg[j].classList.contains('active')) { // Remove the previously active element
                carouselImg[j].classList.remove('active');
                carouselNavImg[j].classList.remove('active');
            }
        }

        carouselImg[activeImgIdx].classList.add('active');
        carouselNavImg[activeImgIdx].classList.add('active');
    })
}