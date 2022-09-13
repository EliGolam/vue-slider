// INITIAL HANDSHAKE
console.log('SCRIPT - slider-app.js: Loaded!');

// Carousel SETTINGS
const SLIDE_TIMER = 10 * 1000; // in ms
// let activeImgIdx = 0;
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

        // Keep track of the active image through its index
        activeImgIdx: 0,

        // Auto Slider Settings
        isForwardDir: true,
        isAutoSliderOn: true,
        autoSlideInterval,
    },

    methods: {
        // Active Image
        activeImg: function (index) {
            return (index === this.activeImgIdx) ? 'active' : '';
        },

        // Next and Previous Buttons
        moveImg: function(direction) {
            clearInterval(this.autoSlideInterval);
            this.activeImgIdx = getNextIndex(this.imgCollection, this.activeImgIdx, direction);  
            this.autoSlideInterval = setInterval(this.autoSlider, SLIDE_TIMER);
        },

        // Navigate through thumbnails
        thumbNavClick: function(index) {
            this.activeImgIdx = index;
        },

        // Function Autoplay
        autoSlider: function() {
            if(this.isAutoSliderOn) {
                let direction = isSlideForward ? 'next' : 'previous';
                this.moveImg(direction);
            } else {
                clearInterval(this.autoSlideInterval);
            }
        }
    },

    // After HTML has been mounted
    mounted() {
        // DOM Elements
        this.carouselImg.push(...document.querySelectorAll(CAROUSEL_IMG_SELECTOR));
        this.carouselNavImg.push(...document.querySelectorAll(THUMBNAIL_IMG_SELECTOR));

        this.autoSlider();
    },
};

const sliderApp = new Vue(sliderConfig);
console.log('DEBUG - Slider ID', sliderApp);