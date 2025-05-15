import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Cube extends Figure{
    constructor(cntr, len, fillClr = new Color(0, 0, 20, 0.4), lineClr = new Color(0, 0, 30, 0.6), lineWdt = 0.4){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        
        this.vertices = [
 	    this.center.toTranslated( this.length/2,  this.length/2,  this.length/2),
 	    this.center.toTranslated( this.length/2,  this.length/2, -this.length/2),
 	    this.center.toTranslated(-this.length/2,  this.length/2, -this.length/2),
 	    this.center.toTranslated(-this.length/2,  this.length/2,  this.length/2),
 	    this.center.toTranslated( this.length/2, -this.length/2,  this.length/2),
 	    this.center.toTranslated( this.length/2, -this.length/2, -this.length/2),
 	    this.center.toTranslated(-this.length/2, -this.length/2, -this.length/2),
            this.center.toTranslated(-this.length/2, -this.length/2,  this.length/2)
        ];

	// Kolejność ścian: Góra, prawo, dół, lewo, za, przed
        this.faces = [
            [this.vertices[0], this.vertices[1], this.vertices[2],this.vertices[3]],
            [this.vertices[0], this.vertices[4], this.vertices[5],this.vertices[1]],
            [this.vertices[4], this.vertices[5], this.vertices[6],this.vertices[7]],
            [this.vertices[2], this.vertices[6], this.vertices[7],this.vertices[3]],
            [this.vertices[0], this.vertices[4], this.vertices[7],this.vertices[3]],
            [this.vertices[1], this.vertices[5], this.vertices[6],this.vertices[2]]
        ];
    }

    checkClick(P){ 
        // TODO ?
    }
};