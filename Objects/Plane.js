import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Plane extends Figure{
    constructor(cntr, len, fillClr = new Color(0, 0, 20, 0.5), lineClr = new Color(0, 0, 30, 0.7), lineWdt = 0.4){ 
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        this.normal = []; // Normalna
        this.D = 0;

        this.vertices = [
	    this.center.toTranslated( this.length/2,  this.length/2),
	    this.center.toTranslated( this.length/2, -this.length/2),
	    this.center.toTranslated(-this.length/2, -this.length/2),
	    this.center.toTranslated(-this.length/2,  this.length/2)
        ];
        this.faces = [
	    [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]
	];
        this.calcEquation();
    }

    constructByVertices(vert1, vert2, vert3){  
        this.center; // TODO vert4 również
        this.vertices = [vert1, vert2, vert3, vert4];
        this.faces = [[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]];
        this.calcEquation();
    }

    calcEquation(){
        // TODO
    }
};