'use strict';

class Wall {
    constructor() {
        this.height = window.innerHeight;
        this.imagesNumber = Math.floor(this.height / 210) +1; 
        this.wraper = document.querySelector('.wraper');
        this.wraper.style.width = '960px';
        this.startHeight = this.imagesNumber * 210 + 'px';
        this.wraper.style.height = this.startHeight;
        console.log(this.imagesNumber);
        this.appendImages(this.imagesNumber);
    }    
    appendImages(number) {
        var url = 'http://placeskull.com/950/200?';
        for(var i = 0; i < number; i++) {
            let d = document.createElement('div');
            d.style.backgroundImage = 'url(' + url + Date().now +')';
            this.wraper.appendChild(d);
            
        } 
    }
}

module.exports = Wall;
