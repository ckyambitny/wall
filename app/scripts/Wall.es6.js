'use strict';

class Wall {
    constructor() {
        let windowHeight = window.innerHeight;
        let imagesNumber = Math.floor(windowHeight / 210) + 1;
        this.wrapper = document.querySelector('.wrapper');

        // Add images to page.
        this.appendImages(imagesNumber);

        // Listen for user scrolling down.
        window.addEventListener('scroll', (e) => {
            // Update window height (could be change).
            windowHeight = window.innerHeight;

            let documentHeight = document.documentElement.offsetHeight;
            let sY = window.scrollY;

            // Calculate difference between: document height and window height.
            var diff = documentHeight - windowHeight;

            // When difference is equal current scroll size...
            if (sY === diff) {
                // ... load next image.
                this.appendImage()
            }
        });
    }
    appendImages(number) {
        console.log('appendImages', number);
        for (let i = 0; i < number; i++) {
            this.appendImage();
        } 
    }

    appendImage() {
        console.log('appendImage')
        let u = 'http://placeskull.com/950/200';
        let d = document.createElement('div');
        let src = u + '?' + Math.random();
        let img = document.createElement('img');
        img.src = src;
        d.appendChild(img);
        this.wrapper.appendChild(d);
    }
}

module.exports = Wall;
