'use strict';

import template from '../templates/post.handlebars';

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

    addListener($element) {
        if (!$element) {
            throw new Error('$element is not exists');
        }

        let input = $element.querySelector('input');
        let comments = [];

        input.addEventListener('keypress', function (e) {
            let comment = input.value.trim();

            if (Wall.isEnter(e) && comment.length > 0) {
                // Add to list of comments.
                comments.push(comment);

                // Clear input.
                input.value = '';

                let $div = document.createElement('div');
                $div.classList.add('list-group-item');
                $div.innerText = comment;
                $element.querySelector('.comments').appendChild($div);
            }
        });
    }

    appendPost() {
        let u = 'http://placeskull.com/950/200';
        let url = u + '?' + Math.random();
        let id = 'id-' + this._uniqueId;
        let context = { id, url };
        this.wrapper.innerHTML += String(template(context));

        // Number of milliseconds for timeout to waiting for post render.
        const TIME_TO_RENDER = 300;

        // Waiting for comment render.
        setTimeout(() => {
            let $post = document.querySelector('#' + id);
            this.addListener($post);
        }, TIME_TO_RENDER);
    }

    /**
     * Building unique identyfikator.
     *
     * @returns {number}
     * @private
     */
    get _uniqueId() {
        if (!this._uid) {
            this._uid = 0;
        }

        return ++this._uid;
    }

    static isEnter(e) {
        return e.keyCode === 13;
    }
}

module.exports = Wall;
