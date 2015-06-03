'use strict';

import Utils from './Utils.es6';
import template from '../templates/post.handlebars';

class Wall {
    constructor() {
        this.$wrapper = document.querySelector('.wrapper');

        // Object with key (as post id) and value (as post object).
        this.posts = Utils.getLocalStorage('posts') || {};

        // Add images to page if we cant process localStorage or empty, otherwise load saved posts and comments
        Utils.isObjEmpty(this.posts) ? this.fakePosts() : this.loadPosts(this.posts);
        //Utils.isObjEmpty(this.posts) ? renderBezDanych() : renderDanymiNaWejsciu);


        // Listen for user scrolling down.
        window.addEventListener('scroll', () => {
            // Update window height (could be change).
            let windowHeight = window.innerHeight;

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

    loadPosts(data) {
        for (let i in data) {
            let url = data[i].url;
            let id = i;
            this.addPost(url, id);
            let commentList = data[i].commentList;
            let $post = document.querySelector('#' + id);
            for (let j = 0, k = commentList.length; j < k; j++) {
                let body = commentList[j].body;
                let time = commentList[j].time;
                this.addComment($post, body, time);
            }
        }
    }

    fakePosts() {
        let windowHeight = window.innerHeight;
        let imagesNumber = Math.floor(windowHeight / 210) + 1;
        for (let i = 0; i < imagesNumber; i++) {
            this.addPost();
        }
    }

    addListener($post) {
        let input = $post.querySelector('input');
        let time = new Date(Number($post.dataset.time));

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

    addComment($post, body, loadedTime) {
        //console.log('addComment: %s', comment);
        let time = loadedTime || new Date();
        let $div = document.createElement('div');
        $div.classList.add('list-group-item');
        if (!loadedTime) {
            time = Utils.formatDate(time);
            $div.innerText = time + ' : ' + body;
        } else {
            $div.innerText = time + ' : ' + body;
        }

        $post.querySelector('.comments').appendChild($div);
        // Push new comment to comments list in post object. DONE
        if (!loadedTime) {
            let id = $post.id;
            let comment = { body, time };
            this.posts[id].commentList.push(comment);
            this.save();
        }
    }


    addPost(...args) {
        let u = 'http://placeskull.com/950/200';
        let random = String(Math.random()).slice(2); //ASK/FIND why not let?
        let url = args[0] || u + '?' + random;
        let id = args[1] || 'id-' + random;
        let time = Date.now();
        let context = { id, url, time };

        // Render
        let $fragment = document.createElement('div');
        $fragment.innerHTML = String(template(context));
        this.$wrapper.appendChild($fragment.firstChild);

        // Catch rendered Node.
        let $post = document.querySelector('#' + id);
        this.addListener($post);

        //save data only when its new data
        if (args.length === 0) {

            // Save post object to `this.posts`.
            let commentList = [];
            this.posts[id] = { commentList, url };

            // Save data to storage.
            this.save();
        }
    }


    save() {
        // Save `this.posts` to localStorage.
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }

}

module.exports = Wall;
