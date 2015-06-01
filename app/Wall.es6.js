'use strict'
class Wall {
    constructor() {
        this.height = window.innerHeight;
        this.imageNumber = Math.floor(this.height / 200) +1; 
        console.log(this.imageNumber);
    }
}

module.exports = Wall;
