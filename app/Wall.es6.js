'use strict';

class Wall {
    constructor() {
        let windowHeight = window.innerHeight;
        let documentHeight = document.documentElement.offsetHeight;

        this.imagesNumber = Math.floor(this.height / 210) +1; 
        this.wraper = document.querySelector('.wraper');
        this.wraper.style.width = '960px';
        this.startHeight = this.imagesNumber * 210 + 'px';
        this.wraper.style.height = this.startHeight;
        this.appendImages(this.imagesNumber);

        window.addEventListener('scroll', (e) => {
            var sY = window.scrollY;
            if ( sY == documentHeight - windowHeight ) {
                var actualHeight = parseInt(this.wraper.style.height);
                var wantedHeight = actualHeight + sY;
                this.wraper.style.height = wantedHeight + 'px';    
            }
        });        
    }
    appendImages(number) {
        var u = 'http://placeskull.com/950/200';
        for(var i = 0; i < number; i++) {
            let d = document.createElement('div');
            var src = u + '?' + i;
            var img = document.createElement('img');
            img.src = src;
            d.appendChild(img);
            this.wraper.appendChild(d);
        } 
    }
}

module.exports = Wall;
