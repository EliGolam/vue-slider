// INITIAL HANDSHAKE
console.log('SCRIPT - slider-app.js: Loaded!');

// Carousel SETTINGS
const SLIDE_TIMER = 5000; // in ms
let activeImgIdx = 0;
let isSlideForward = true;

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
            moveCarousel(this.carouselImg, this.carouselNavImg, 'next');
        },
        previous: function() {
            console.log('DEBUG - previous');
            moveCarousel(this.carouselImg, this.carouselNavImg, 'previous');
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
        }
        // Function Autoplay
    },

    // After HTML has been mounted
    mounted() {
        // DOM Elements
        this.carouselImg.push(...document.querySelectorAll('.ms_carousel-img'));
        this.carouselNavImg.push(...document.querySelectorAll('.ms_carousel-nav-img'));
        console.log('Carousel Img', this.carouselImg, this.carouselNavImg);

        this.carouselImg[activeImgIdx].classList.add('active');
        this.carouselNavImg[activeImgIdx].classList.add('active');
        // Autoplay
        // this.autoPlay();
    },
};

const sliderApp = new Vue(sliderConfig);
console.log('DEBUG - Slider ID', sliderApp);