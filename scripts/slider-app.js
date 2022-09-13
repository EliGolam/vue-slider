// INITIAL HANDSHAKE
console.log('SCRIPT - slider-app.js: Loaded!');

// Carousel SETTINGS
const SLIDE_TIMER = 5000; // in ms
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

        activeImgIdx: 0,
    },

    methods: {
        // Active Image
        activeImg: function (index) {
            console.log('DEBUG - ELEMENT', index, this.activeImgIdx);
            return (index === this.activeImgIdx) ? 'active' : '';
        },

        // Next and Previous Buttons
        next: function() {
            this.activeImgIdx = getNextIndex(this.imgCollection, this.activeImgIdx, 1);
            console.log('DEBUG - Next', this.activeImgIdx);
        },

        previous: function() {
            this.activeImgIdx = getNextIndex(this.imgCollection, this.activeImgIdx, -1);
            console.log('DEBUG - Previous', this.activeImgIdx);
        },

        thumbNavClick: function(index) {
            this.activeImgIdx = index;
        }
        // Function Autoplay
    },

    // After HTML has been mounted
    mounted() {
        // DOM Elements
        this.carouselImg.push(...document.querySelectorAll('.ms_carousel-img'));
        this.carouselNavImg.push(...document.querySelectorAll('.ms_carousel-nav-img'));
    },
};

const sliderApp = new Vue(sliderConfig);
console.log('DEBUG - Slider ID', sliderApp);