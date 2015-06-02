'use strict';

import template from '../templates/post.handlebars';
// var template = require('../templates/post.handlebars');

class Wall {
    constructor() {
        let windowHeight = window.innerHeight;
        let imagesNumber = Math.floor(windowHeight / 210) + 1;
        this.wrapper = document.querySelector('.wrapper');
        
        // Add images to page.
        this.appendPosts(imagesNumber);

        // Listen for user scrolling down.
        window.addEventListener('scroll', (e) => {
            // Update window height (could be change).
            windowHeight = window.innerHeight; 

            let documentHeight = document.documentElement.offsetHeight;
            let sY = window.scrollY;

            // Calculate difference between: document height and window height.
            let diff = documentHeight - windowHeight;

            // When difference is equal current scroll size...
            if (sY === diff) {
                // ... load next image.
                this.appendPost();
            }
        });
    }

    appendPosts(number) {
        for (let i = 0; i < number; i++) {
            this.appendPost();
        } 
    }

    addListener(el) {
        for (let i = 0; i < el.length ; i++ ) {
            el[i].addEventListener('keypress', function (e) {
                if ( e.keyCode == '13') {
                    if ( el[i].value.trim().length > 0 ) {
                        console.log(JSON.stringify(el[i].value.trim()));                   
                    }   
                }                    
            });
        }      
    }    
    appendPost() {
        console.log('appendPost');
        let u = 'http://placeskull.com/950/200';
        let src = u + '?' + Math.random();
        let context = {url: src};
        let adding = template(context);// + '';
        this.wrapper.innerHTML += '' +  adding;
        let inputBox = document.querySelectorAll('.form-control');
        this.addListener(inputBox);
    }
}

module.exports = Wall;
