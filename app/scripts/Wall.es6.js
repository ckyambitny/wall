'use strict';

import template from '../templates/post.handlebars';

class Wall {
    constructor() {
        // Object with key (as post id) and value (as post object).
        this.posts = {}; 

        let windowHeight = window.innerHeight;
        let imagesNumber = Math.floor(windowHeight / 210) + 1;
        this.$wrapper = document.querySelector('.wrapper');

        // Add images to page.
        this.addPosts(imagesNumber);

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

    addPosts(number) {
        for (let i = 0; i < number; i++) {
            this.addPost();
        }
    }

    addListener($post) {
        let input = $post.querySelector('input');

        input.addEventListener('keypress', (e) => {
            let comment = input.value.trim();

            if (Wall.isEnter(e) && comment.length > 0) {
                // Clear input.
                input.value = '';

                this.addComment($post, comment);
            }
        });
    }

    addComment($post, comment) {
        console.log('addComment: %s', comment);

        let $div = document.createElement('div');
        $div.classList.add('list-group-item');
        $div.innerText = comment;
        $post.querySelector('.comments').appendChild($div);

        // TODO: push new comment to comments list in post object.
        // get id of $post were adding comment
        let $id = $post.id;
        //debug CL
        //console.log($id);
        //console.log(this.posts[$id]);//Great return :D!!!!!
         
        //change value of given id in this,posts by adding new comment to comment list
        this.posts[$id].commentList.push(comment);

        // just to be sure were saving ok console log all commentList for given post when comment added    
        console.log(this.posts[$id].commentList);
        // Save data to storage.
        this.save();
    }

    addPost() {
        let u = 'http://placeskull.com/950/200';
        var random = String(Math.random()).slice(2);//why not let?
        let url = u + '?' + random;
        let id = 'id-' + random;//this probably should be $id, but handlebars etc.
        let context = { id, url };
        //ASK %s C type console log
        //console.log('addPost id=%s', id);

        // Render
        let $fragment = document.createElement('div');
        $fragment.innerHTML = String(template(context));
        this.$wrapper.appendChild($fragment.firstChild);

        // Catch rendered Node.
        let $post = document.querySelector('#' + id);
        this.addListener($post);

        // TODO: save post object to `this.posts`.
        let commentList = [];
        //debug addings
        //commentList.push('LOL');
        //commentList.push('Ajwaj');
        //console.log(id);
        //adding debug LOL, Ajwaj comments to list to console log it out
        this.posts[id] = { commentList, url };// not this.posts.id - easy to mix up with let id 8X line
        //debug log
        //console.log(this.posts.id);
        //console.log(this.posts.id.commentList[1]);//returning great:D

        // Save data to storage.
        this.save();
    }

    save() {
        // TODO: Save `this.posts` to localStorage.
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }

    static isEnter(e) {
        return e.keyCode === 13;
    }
}

module.exports = Wall;
