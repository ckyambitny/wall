'use strict';

import Utils from './Utils.es6';
import template from '../templates/post.handlebars';

class Wall {
    constructor() {
        // Object with key (as post id) and value (as post object).
        this.posts = Utils.getLocalStorage('posts') || {}; 
        // checking if posts is empty (if we have any data to process )
        // przydalaby sie metoda render odpowiadajaca tylko za podpinanie do dom bez dodawania do LS spowrotem tego co odczytaliśmy
        
        //
        Utils.isObjEmpty(this.posts) ? console.log('emptyLs') : console.log(this.posts);
        //Utils.isObjEmpty(this.posts) ? renderBezDanych() : renderDanymiNaWejsciu);
        
        this.$wrapper = document.querySelector('.wrapper');
        // Add images to page.
        let windowHeight = window.innerHeight;
        let imagesNumber = Math.floor(windowHeight / 210) + 1;
        this.buildPosts(imagesNumber);

        // Listen for user scrolling down.
        window.addEventListener('scroll', () => {
            // Update window height (could be change).
            windowHeight = window.innerHeight;

            let documentHeight = document.documentElement.offsetHeight;
            let sY = window.scrollY;

            // Calculate difference between: document height and window height.
            let diff = documentHeight - windowHeight;

            // When difference is equal current scroll size...
            if (sY === diff) {
                // ... load next image.
                this.addPost();
            }
        });
    }
    
   
    buildPosts(number) {
        for (let i = 0; i < number; i++) {
            this.addPost();
        }
    }

    addListener($post) {
        let input = $post.querySelector('input');
        let time =  new Date(Number($post.dataset.time));
        
        let img = $post.querySelector('img');
        img.addEventListener('click', (e) => {
            alert(time);
        });
        input.addEventListener('keypress', (e) => {
            let comment = input.value.trim();

            if (Utils.isEnter(e) && comment.length > 0) {
                // Clear input.
                input.value = '';

                this.addComment($post, comment);
            }
        });
    }

    addComment($post, comment) {
        console.log('addComment: %s', comment);
        let time = new Date();
        let $div = document.createElement('div');
        $div.classList.add('list-group-item');
        $div.innerText = Utils.formatDate(time) + ' : ' +  comment;
        $post.querySelector('.comments').appendChild($div);
        // Push new comment to comments list in post object. DONE
        let id = $post.id;
        this.posts[id].commentList.push(comment);
        this.save();
    }
    

    addPost() {
        let u = 'http://placeskull.com/950/200';
        let random = String(Math.random()).slice(2); //ASK/FIND why not let?
        let url = u + '?' + random;
        let id = 'id-' + random; 
        let time = Date.now();
        let context = { id, url, time };

        // Render
        let $fragment = document.createElement('div');
        $fragment.innerHTML = String(template(context));
        this.$wrapper.appendChild($fragment.firstChild);

        // Catch rendered Node.
        let $post = document.querySelector('#' + id);
        this.addListener($post);
        
        // Save post object to `this.posts`.
        let commentList = [];
        this.posts[id] = { commentList, url };
       
        // Save data to storage.
        this.save();
    }

    save() {
        // Save `this.posts` to localStorage.
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }
    
   }

module.exports = Wall;
