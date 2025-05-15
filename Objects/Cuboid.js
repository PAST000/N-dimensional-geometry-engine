import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Cuboid extends Figure{
    constructor(cntr, X, Y, Z, fillClr = new Color(0, 0, 20, 0.5), lineClr = new Color(0, 0, 30, 0.7), lineWdt = 0.4){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(X);
        this.height = parseFloat(Y);
        this.width = parseFloat(Z);
        
        this.vertices = [
	    this.center.toTranslated( this.length/2,  this.height/2,  this.width/2),
	    this.center.toTranslated( this.length/2,  this.height/2, -this.width/2),
	    this.center.toTranslated(-this.length/2,  this.height/2, -this.width/2),
	    this.center.toTranslated(-this.length/2,  this.height/2,  this.width/2),
	    this.center.toTranslated( this.length/2, -this.height/2,  this.width/2),
	    this.center.toTranslated( this.length/2, -this.height/2, -this.width/2),
	    this.center.toTranslated(-this.length/2, -this.height/2, -this.width/2),
	    this.center.toTranslated(-this.length/2, -this.height/2,  this.width/2),
        ];

	// Kolejność ścian: Góra, prawo, dół, lewo, tył, przód
        this.faces = [             
            [this.vertices[0], this.vertices[1], this.vertices[2],this.vertices[3]],
            [this.vertices[0], this.vertices[4], this.vertices[5],this.vertices[1]],
            [this.vertices[4], this.vertices[5], this.vertices[6],this.vertices[7]],
            [this.vertices[2], this.vertices[6], this.vertices[7],this.vertices[3]],
            [this.vertices[0], this.vertices[4], this.vertices[7],this.vertices[3]],
            [this.vertices[1], this.vertices[5], this.vertices[6],this.vertices[2]]
        ];
    }
};