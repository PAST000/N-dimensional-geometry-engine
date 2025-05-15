import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Cross extends Figure{
    constructor(cntr, len, arm = 0.11, fillClr = new Color(0, 0, 50, 0.5), lineClr = new Color(0, 0, 80, 0.7), lineWdt = 0.4){ 
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        this.armFactor = parseFloat(arm);   // Z przedziału (0;1), współczynnik szerokości ramienia do ogólnej szerokości
        this.armSize = parseFloat(len*arm);

	// Kolejność wierzchołków: góra, prawo, dół, lewo, za, przed, środek
        this.vertices = [  
	    this.center.toTranslated( this.armSize/2, this.length/2,  this.armSize/2),
            this.center.toTranslated( this.armSize/2, this.length/2, -this.armSize/2),
            this.center.toTranslated(-this.armSize/2, this.length/2, -this.armSize/2),
            this.center.toTranslated(-this.armSize/2, this.length/2,  this.armSize/2),

            this.center.toTranslated( this.length/2,  this.length/2,  this.armSize/2),
            this.center.toTranslated( this.length/2, -this.length/2,  this.armSize/2),
            this.center.toTranslated( this.length/2, -this.length/2, -this.armSize/2),
            this.center.toTranslated( this.length/2,  this.length/2, -this.armSize/2),

            this.center.toTranslated( this.armSize/2, -this.length/2,  this.armSize/2),
            this.center.toTranslated( this.armSize/2, -this.length/2, -this.armSize/2),
            this.center.toTranslated(-this.armSize/2, -this.length/2, -this.armSize/2),
            this.center.toTranslated(-this.armSize/2, -this.length/2,  this.armSize/2),

            this.center.toTranslated(-this.length/2,  this.armSize/2,  this.armSize/2),
            this.center.toTranslated(-this.length/2, -this.armSize/2,  this.armSize/2),
            this.center.toTranslated(-this.length/2, -this.armSize/2, -this.armSize/2),
            this.center.toTranslated(-this.length/2,  this.armSize/2, -this.armSize/2),

            this.center.toTranslated( this.armSize/2,  this.armSize/2, this.length/2),
            this.center.toTranslated( this.armSize/2, -this.armSize/2, this.length/2),
            this.center.toTranslated(-this.armSize/2, -this.armSize/2, this.length/2),
            this.center.toTranslated(-this.armSize/2,  this.armSize/2, this.length/2),

	    this.center.toTranslated( this.armSize/2,  this.armSize/2, -this.length/2),
            this.center.toTranslated( this.armSize/2, -this.armSize/2, -this.length/2),
            this.center.toTranslated(-this.armSize/2, -this.armSize/2, -this.length/2),
            this.center.toTranslated(-this.armSize/2,  this.armSize/2, -this.length/2),

            this.center.toTranslated( this.armSize/2,  this.armSize/2,  this.armSize/2),
            this.center.toTranslated( this.armSize/2, -this.armSize/2,  this.armSize/2),
            this.center.toTranslated(-this.armSize/2, -this.armSize/2,  this.armSize/2),
            this.center.toTranslated(-this.armSize/2,  this.armSize/2,  this.armSize/2),
            this.center.toTranslated( this.armSize/2,  this.armSize/2, -this.armSize/2),
            this.center.toTranslated( this.armSize/2, -this.armSize/2, -this.armSize/2),
            this.center.toTranslated(-this.armSize/2, -this.armSize/2, -this.armSize/2),
            this.center.toTranslated(-this.armSize/2,  this.armSize/2, -this.armSize/2) 
        ];

        this.faces = [ 
            [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
            [this.vertices[0], this.vertices[24], this.vertices[28], this.vertices[1]],
            [this.vertices[1], this.vertices[28], this.vertices[31], this.vertices[2]],
            [this.vertices[2], this.vertices[31], this.vertices[27], this.vertices[3]],
            [this.vertices[3], this.vertices[27], this.vertices[24], this.vertices[0]],

            [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
            [this.vertices[4], this.vertices[24], this.vertices[25], this.vertices[5]],
            [this.vertices[5], this.vertices[25], this.vertices[29], this.vertices[6]],
            [this.vertices[6], this.vertices[29], this.vertices[28], this.vertices[7]],
            [this.vertices[7], this.vertices[28], this.vertices[24], this.vertices[4]],

            [this.vertices[9], this.vertices[8], this.vertices[11], this.vertices[10]],
            [this.vertices[9], this.vertices[29], this.vertices[25], this.vertices[8]],
            [this.vertices[8], this.vertices[25], this.vertices[26], this.vertices[11]],
            [this.vertices[11], this.vertices[26], this.vertices[30], this.vertices[10]],
            [this.vertices[10], this.vertices[30], this.vertices[29], this.vertices[9]],

            [this.vertices[15], this.vertices[14], this.vertices[13], this.vertices[12]],
            [this.vertices[15], this.vertices[31], this.vertices[30], this.vertices[14]],
            [this.vertices[14], this.vertices[30], this.vertices[26], this.vertices[13]],
            [this.vertices[13], this.vertices[26], this.vertices[27], this.vertices[12]],
            [this.vertices[12], this.vertices[27], this.vertices[31], this.vertices[15]],

            [this.vertices[19], this.vertices[18], this.vertices[17], this.vertices[16]],
            [this.vertices[19], this.vertices[27], this.vertices[26], this.vertices[18]],
            [this.vertices[18], this.vertices[26], this.vertices[25], this.vertices[17]],
            [this.vertices[17], this.vertices[25], this.vertices[24], this.vertices[16]],
            [this.vertices[16], this.vertices[24], this.vertices[27], this.vertices[19]],

            [this.vertices[20], this.vertices[21], this.vertices[22], this.vertices[23]],
            [this.vertices[20], this.vertices[28], this.vertices[29], this.vertices[21]],
            [this.vertices[21], this.vertices[29], this.vertices[30], this.vertices[22]],
            [this.vertices[22], this.vertices[30], this.vertices[31], this.vertices[23]],
            [this.vertices[23], this.vertices[31], this.vertices[28], this.vertices[20]]
        ];
    }
};