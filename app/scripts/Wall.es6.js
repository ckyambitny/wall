'use strict';

import template from '../templates/post.handlebars';
// var template = require('../templates/post.handlebars');

class Wall {
    constructor() {
        let windowHeight = window.innerHeight;
        let imagesNumber = Math.floor(windowHeight / 210) + 1;
        this.wrapper = document.querySelector('.wrapper');
        this.posts =[];
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
    
    // TODO: try to implement for of
    addListener(el) {
        
        for (let i = 0; i < el.length ; i++ ) {
            let input = el[i].lastElementChild.lastElementChild;
            //console.log(input);
            let comments = [];
            input.addEventListener('keypress', function (e) {
                if ( e.keyCode == '13') {
                    if ( input.value.trim().length > 0 ) {
                        //comments.push(JSON.stringify(el[i].value.trim()));
                        //document.querySelector()     
                        //console.log(JSON.stringify(input.value));                   
                        //console.log(el[i]);
                        comments.push(input.value);
                        input.value ='';
                        console.log(comments);
                        
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
        let adding = template(context) + '';
        this.wrapper.innerHTML +=  adding;
        let inputBox = document.querySelectorAll('.post');
        this.addListener(inputBox);
    }
}

module.exports = Wall;
