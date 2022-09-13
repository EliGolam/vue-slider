// INITIAL HANDSHAKE
console.log('SCRIPT - slider-app.js: Loaded!');

// Carousel SETTINGS
const SLIDE_TIMER = 5000; // in ms
let activeImgIdx = 0;

// ARRAY OF IMAGE OBJECTS DEBUG TESTING
/*
const imgCollection = createCollection(imgData);
const imgThumbnails = createCollection(imgData, CAROUSEL_THUMBNAIL_PATH);

console.log('DEBUG - imgCollection', imgCollection);
console.log('DEBUG - imgCollection element:', imgCollection[0]);
console.log('DEBUG - imgThumbnails element:', imgThumbnails[0]);
*/


// Vue APP
const sliderConfig = {
    el: '#slider',

    data: {
        // Creating Collections
        imgCollection: createCollection(imgData),
        imgThumbnails: createCollection(imgData, CAROUSEL_THUMBNAIL_PATH),

        // DOM Elements
        // carouselImg: document.querySelectorAll('.ms_carousel-img'),
        // carouselNavImg: document.querySelectorAll('.ms_carousel-nav-img'),

        // Collections Classes
        imgClass: IMG_CLASS_LIST,
        thumbClass: THUMBNAIL_CLASS_LIST,
    },

    methods: {
        // Next and Previous Buttons
        next: function() {
            console.log('DEBUG - next');
            moveCarousel(carouselImg, carouselNavImg, 'next');
        },
        previous: function() {
            console.log('DEBUG - previous');
            moveCarousel(carouselImg, carouselNavImg, 'previous');
        },

        // Navigation through Thumbnails
        thumbNavClick: function() {
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
        }
    }
};

const sliderApp = new Vue(sliderConfig);
console.log('DEBUG - Slider ID', sliderApp);


// DOM Elements
const carouselImg = document.querySelectorAll('.ms_carousel-img');
const carouselNavImg = document.querySelectorAll('.ms_carousel-nav-img');
carouselImg[activeImgIdx].classList.add('active');
carouselNavImg[activeImgIdx].classList.add('active');
console.log('DEBUG - Carousel', carouselImg, carouselNavImg);