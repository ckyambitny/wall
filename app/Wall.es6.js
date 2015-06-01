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
        for(var i = 0; i < number; i++) {
            let d = document.createElement('DIV');
            this.wraper.appendChild(d);
        } 
    }
}

module.exports = Wall;
