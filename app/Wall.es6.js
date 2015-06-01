'use strict';
class Wall {
    constructor() {
        this.height = window.innerHeight;
        this.imageNumber = Math.floor(this.height / 200) +1; 
        this.wraper = document.querySelector('.wraper');
        this.wraper.style.width = '960px';
        this.startHeight = this.imageNumber * 210 + 'px';
        this.wraper.style.height = this.startHeight;
        console.log(this.imageNumber);
    }
}

module.exports = Wall;
