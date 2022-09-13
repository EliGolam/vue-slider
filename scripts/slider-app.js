// INITIAL HANDSHAKE
console.log('SCRIPT - slider-app.js: Loaded!');

// Carousel SETTINGS
const SLIDE_TIMER = 2000; // in ms
let activeImgIdx = 0;
let isSlideForward = true;
let autoSlideInterval;

// Vue APP
const sliderConfig = {
    el: '#slider',

    data: {
        // Creating Collections
        imgCollection: createCollection(imgData),
        imgThumbnails: createCollection(imgData, CAROUSEL_THUMBNAIL_PATH),

        // Node Lists
        carouselImg: [],
        carouselNavImg: [],
        
        // Collections Classes
        imgClass: IMG_CLASS_LIST,
        thumbClass: THUMBNAIL_CLASS_LIST,
    },

    methods: {
        // Next and Previous Buttons
        next: function() {
            console.log('DEBUG - next');
            this.moveCarousel(this.carouselImg, this.carouselNavImg, 'next');
        },
        previous: function() {
            console.log('DEBUG - previous');
            this.moveCarousel(this.carouselImg, this.carouselNavImg, 'previous');
        },

        moveCarousel: function (direction) {
            // Clear previous Animation
            clearInterval(autoSlideInterval);
        
            for (let imgIdx = 0; imgIdx < this.carouselImg.length; imgIdx++) {
                // Define direction: 
                direction = (direction === 'previous' || direction === 'back' || direction === -1) ? -1 : 1;
        
                // Find currently active image
                if (!this.carouselImg[imgIdx].classList.contains('active')) continue;
        
                // When active image is found we need to make sure the new image will not be out of bounds
                activeImgIdx = getNextIndex(this.carouselImg, imgIdx, direction);
        
                // Activate new image on carousel trhough position
                this.carouselImg[activeImgIdx].classList.add('active');
                this.carouselNavImg[activeImgIdx].classList.add('active');
        
                // Remove previously active image
                this.carouselImg[imgIdx].classList.remove('active');
                this.carouselNavImg[imgIdx].classList.remove('active');
                break;   
            }
        
            autoSlideInterval = setInterval(this.autoSlide, SLIDE_TIMER);
        },

        // Navigation through Thumbnails
        thumbNavClick: function() {
            for (let imgIdx = 0; imgIdx < this.carouselNavImg.length; imgIdx++) {
                this.carouselNavImg[imgIdx].addEventListener('click', () => {
                    console.log('DEBUG - carouselNavImg Click: OK!');
                    activeImgIdx = imgIdx; // When the thumbnail is clicked, assign the thumbnail's index as the new active index
            
                    for (let j = 0; j < this.carouselNavImg.length; j++) {
                        if (this.carouselNavImg[j].classList.contains('active')) { // Remove the previously active element
                            this.carouselImg[j].classList.remove('active');
                            this.carouselNavImg[j].classList.remove('active');
                        }
                    }
                    this.carouselImg[activeImgIdx].classList.add('active');
                    this.carouselNavImg[activeImgIdx].classList.add('active');
                })
            }
        },
        
        // AutoSlide
        autoSlide: function() {
            const direction = isSlideForward ? 'next' : 'previous';
            this.moveCarousel(direction);
        }
    },

    // After HTML has been mounted
    mounted() {
        // DOM Elements
        this.carouselImg.push(...document.querySelectorAll('.ms_carousel-img'));
        this.carouselNavImg.push(...document.querySelectorAll('.ms_carousel-nav-img'));
        console.log('Carousel Img', this.carouselImg, this.carouselNavImg);

        this.carouselImg[activeImgIdx].classList.add('active');
        this.carouselNavImg[activeImgIdx].classList.add('active');
        
        autoSlideInterval = setInterval(this.autoSlide, SLIDE_TIMER);
    },
};

const sliderApp = new Vue(sliderConfig);
console.log('DEBUG - Slider ID', sliderApp);