// INITIAL HANDSHAKE
console.log('SCRIPT - slider-app.js: Loaded!');

// Carousel SETTINGS
const SLIDE_TIMER = 10 * 1000; // in ms


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
        autoSlideInterval: undefined,
    },

    // METHODS
    methods: {
        // Active Image
        activeImg: function (index) {
            return (index === this.activeImgIdx) ? 'active' : '';
        },

        // Next and Previous Buttons
        moveImg: function(direction) {
            this.activeImgIdx = getNextIndex(this.imgCollection, this.activeImgIdx, direction); 
            
            this.deleteAnimationInverval();
            this.createAnimationInterval();
        },

        // Navigate through thumbnails
        thumbNavClick: function(index) {
            this.activeImgIdx = index;
        },

        // AutoPlay FUNCTIONS
        autoSlider: function() {
            if(this.isAutoSliderOn) {
                let direction = this.isForwardDir? 'next' : 'previous';
                this.moveImg(direction);

            } else {
                this.deleteAnimationInverval();
            }
        },

        // Toggle Animation action on / off
        toggleAnimation: function (action) {
            if(action === 'off') {
                this.deleteAnimationInverval();
            }
            else if (action === 'on') {
                this.createAnimationInterval();
            }    
        },

        // Stop Animation
        deleteAnimationInverval: function () {
            clearInterval(this.autoSlideInterval);
        },

        // Start Animation
        createAnimationInterval: function () {
            this.autoSlideInterval = setInterval(this.autoSlider, SLIDE_TIMER);
        }
    },

    // After HTML has been mounted
    mounted() {
        this.createAnimationInterval();
    },
};

const slider = new Vue(sliderConfig);