'use strict';

//import template from '../templates/post.handlebars';
var template = require('../templates/post.handlebars');

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
            let diff = documentHeight - windowHeight;

            // When difference is equal current scroll size...
           console.log(sY+' .......... ' + diff);
            if (sY === diff) {
                // ... load next image.
                this.appendPost();
            }
        });
    }
    appendImages(number) {
        console.log('appendImages', number);
        for (let i = 0; i < number; i++) {
            this.appendPost();
        } 
    }

    appendPost() {
        console.log('appendPost');
        let u = 'http://placeskull.com/950/200';
        let src = u + '?' + Math.random();
        let context = {url: src};
        let adding = template(context) + '';
        //console.log(this.wrapper.innerHTML);
        this.wrapper.innerHTML += adding;
        //debuger;
    }
}

module.exports = Wall;
