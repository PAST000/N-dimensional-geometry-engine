import Figure from "./base/Figure.js";
import Color from "./base/Color.js";

export default class Cross extends Figure{
    constructor(cntr, len, frame, fillClr = new Color(0, 0, 50, 0.5), lineClr = new Color(0, 0, 80, 0.7), lineWdt = 0.4){ 
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        this.frameFactor = parseFloat(frame);   // Z przedziału (0; 0.5), współczynnik szerokości ramki do ogólnej szerokości
        this.frameSize = parseFloat(this.length*this.frameFactor);

        this.vertices = [  
            this.center.toTranslated([-this.length/2                 ,  this.length/2                 ,  this.length/2                 ]),
            this.center.toTranslated([-this.length/2 + this.frameSize,  this.length/2                 ,  this.length/2 - this.frameSize]),
            this.center.toTranslated([-this.length/2 + this.frameSize,  this.length/2 - this.frameSize,  this.length/2                 ]),
            this.center.toTranslated([-this.length/2 + this.frameSize,  this.length/2 - this.frameSize,  this.length/2 - this.frameSize]),
            this.center.toTranslated([-this.length/2                 ,  this.length/2 - this.frameSize,  this.length/2 - this.frameSize]),

            this.center.toTranslated([ this.length/2                 ,  this.length/2                 ,  this.length/2                 ]),
            this.center.toTranslated([ this.length/2 - this.frameSize,  this.length/2                 ,  this.length/2 - this.frameSize]),
            this.center.toTranslated([ this.length/2                 ,  this.length/2 - this.frameSize,  this.length/2 - this.frameSize]),
            this.center.toTranslated([ this.length/2 - this.frameSize,  this.length/2 - this.frameSize,  this.length/2 - this.frameSize]),
            this.center.toTranslated([ this.length/2 - this.frameSize,  this.length/2 - this.frameSize,  this.length/2                 ]),

            this.center.toTranslated([ this.length/2                 ,  this.length/2                 , -this.length/2                 ]),
            this.center.toTranslated([ this.length/2 - this.frameSize,  this.length/2                 , -this.length/2 + this.frameSize]),
            this.center.toTranslated([ this.length/2 - this.frameSize,  this.length/2 - this.frameSize, -this.length/2                 ]),
            this.center.toTranslated([ this.length/2 - this.frameSize,  this.length/2 - this.frameSize, -this.length/2 + this.frameSize]),
            this.center.toTranslated([ this.length/2                 ,  this.length/2 - this.frameSize, -this.length/2 + this.frameSize]),

            this.center.toTranslated([-this.length/2                 ,  this.length/2                 , -this.length/2                 ]),
            this.center.toTranslated([-this.length/2 + this.frameSize,  this.length/2                 , -this.length/2 + this.frameSize]),
            this.center.toTranslated([-this.length/2                 ,  this.length/2 - this.frameSize, -this.length/2 + this.frameSize]),
            this.center.toTranslated([-this.length/2 + this.frameSize,  this.length/2 - this.frameSize, -this.length/2 + this.frameSize]),
            this.center.toTranslated([-this.length/2 + this.frameSize,  this.length/2 - this.frameSize, -this.length/2                 ]),

            this.center.toTranslated([-this.length/2                 , -this.length/2                 ,  this.length/2                 ]),
            this.center.toTranslated([-this.length/2 + this.frameSize, -this.length/2                 ,  this.length/2 - this.frameSize]),
            this.center.toTranslated([-this.length/2 + this.frameSize, -this.length/2 + this.frameSize,  this.length/2                 ]),
            this.center.toTranslated([-this.length/2 + this.frameSize, -this.length/2 + this.frameSize,  this.length/2 - this.frameSize]),
            this.center.toTranslated([-this.length/2                 , -this.length/2 + this.frameSize,  this.length/2 - this.frameSize]),

            this.center.toTranslated([ this.length/2                 , -this.length/2                 ,  this.length/2                 ]),
            this.center.toTranslated([ this.length/2 - this.frameSize, -this.length/2                 ,  this.length/2 - this.frameSize]),
            this.center.toTranslated([ this.length/2                 , -this.length/2 + this.frameSize,  this.length/2 - this.frameSize]),
            this.center.toTranslated([ this.length/2 - this.frameSize, -this.length/2 + this.frameSize,  this.length/2 - this.frameSize]),
            this.center.toTranslated([ this.length/2 - this.frameSize, -this.length/2 + this.frameSize,  this.length/2                 ]),

            this.center.toTranslated([ this.length/2                 , -this.length/2                 , -this.length/2                 ]),
            this.center.toTranslated([ this.length/2 - this.frameSize, -this.length/2                 , -this.length/2 + this.frameSize]),
            this.center.toTranslated([ this.length/2 - this.frameSize, -this.length/2 + this.frameSize, -this.length/2                 ]),
            this.center.toTranslated([ this.length/2 - this.frameSize, -this.length/2 + this.frameSize, -this.length/2 + this.frameSize]),
            this.center.toTranslated([ this.length/2                 , -this.length/2 + this.frameSize, -this.length/2 + this.frameSize]),

            this.center.toTranslated([-this.length/2                 , -this.length/2                 , -this.length/2                 ]),
            this.center.toTranslated([-this.length/2 + this.frameSize, -this.length/2                 , -this.length/2 + this.frameSize]),
            this.center.toTranslated([-this.length/2                 , -this.length/2 + this.frameSize, -this.length/2 + this.frameSize]),
            this.center.toTranslated([-this.length/2 + this.frameSize, -this.length/2 + this.frameSize, -this.length/2 + this.frameSize]),
            this.center.toTranslated([-this.length/2 + this.frameSize, -this.length/2 + this.frameSize, -this.length/2                 ])
        ];

        this.faces = [ 
            [this.vertices[0], this.vertices[1], this.vertices[6], this.vertices[5]],
            [this.vertices[5], this.vertices[6], this.vertices[11], this.vertices[10]],
            [this.vertices[10], this.vertices[11], this.vertices[16], this.vertices[15]],
            [this.vertices[15], this.vertices[16], this.vertices[1], this.vertices[0]],

            [this.vertices[0], this.vertices[2], this.vertices[9], this.vertices[5]],
            [this.vertices[5], this.vertices[7], this.vertices[14], this.vertices[10]],
            [this.vertices[10], this.vertices[12], this.vertices[19], this.vertices[15]],
            [this.vertices[15], this.vertices[17], this.vertices[4], this.vertices[0]],
        ];
    }
};