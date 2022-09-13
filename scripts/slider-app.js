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
        },

        toggleAnimation: function (action) {
            console.log('TOGGLE');
            if (action === 'off') {
                console.log('DEBUG - Enter Mouse');
                clearInterval(this.autoSlideInterval);
            } else if (action === 'on') {
                console.log('DEBUG - Leave Mouse');
                this.autoSlideInterval = setInterval(this.autoSlider, SLIDE_TIMER);
            }
            
        }
    },

    // After HTML has been mounted
    mounted() {
        this.autoSlideInterval = setInterval(this.autoSlider, SLIDE_TIMER);
    },
};

const sliderApp = new Vue(sliderConfig);
console.log('DEBUG - Slider ID', sliderApp);