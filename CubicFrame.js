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

        this.appendFace([this.vertices[0], this.vertices[1], this.vertices[6], this.vertices[5]]);
        this.appendFace([this.vertices[5], this.vertices[6], this.vertices[11], this.vertices[10]]);
        this.appendFace([this.vertices[10], this.vertices[11], this.vertices[16], this.vertices[15]]);
        this.appendFace([this.vertices[15], this.vertices[16], this.vertices[1], this.vertices[0]]);

        this.appendFace([this.vertices[0], this.vertices[2], this.vertices[9], this.vertices[5]]);
        this.appendFace([this.vertices[5], this.vertices[7], this.vertices[14], this.vertices[10]]);
        this.appendFace([this.vertices[10], this.vertices[12], this.vertices[19], this.vertices[15]]);
        this.appendFace([this.vertices[15], this.vertices[17], this.vertices[4], this.vertices[0]]);

        this.appendFace([this.vertices[2], this.vertices[3], this.vertices[8], this.vertices[9]]);
        this.appendFace([this.vertices[3], this.vertices[8], this.vertices[6], this.vertices[1]]);
        this.appendFace([this.vertices[7], this.vertices[8], this.vertices[13], this.vertices[14]]);
        this.appendFace([this.vertices[8], this.vertices[13], this.vertices[11], this.vertices[6]]);

        this.appendFace([this.vertices[12], this.vertices[13], this.vertices[18], this.vertices[19]]);
        this.appendFace([this.vertices[13], this.vertices[18], this.vertices[16], this.vertices[11]]);
        this.appendFace([this.vertices[17], this.vertices[18], this.vertices[3], this.vertices[4]]);
        this.appendFace([this.vertices[18], this.vertices[3], this.vertices[1], this.vertices[16]]);

        this.appendFace([this.vertices[20], this.vertices[21], this.vertices[26], this.vertices[25]]);
        this.appendFace([this.vertices[25], this.vertices[26], this.vertices[31], this.vertices[30]]);
        this.appendFace([this.vertices[30], this.vertices[31], this.vertices[36], this.vertices[35]]);
        this.appendFace([this.vertices[35], this.vertices[36], this.vertices[21], this.vertices[20]]);

        this.appendFace([this.vertices[20], this.vertices[22], this.vertices[29], this.vertices[25]]);
        this.appendFace([this.vertices[25], this.vertices[27], this.vertices[34], this.vertices[30]]);
        this.appendFace([this.vertices[30], this.vertices[32], this.vertices[39], this.vertices[35]]);
        this.appendFace([this.vertices[35], this.vertices[37], this.vertices[24], this.vertices[20]]);

        this.appendFace([this.vertices[22], this.vertices[23], this.vertices[28], this.vertices[29]]);
        this.appendFace([this.vertices[23], this.vertices[28], this.vertices[26], this.vertices[21]]);
        this.appendFace([this.vertices[27], this.vertices[28], this.vertices[33], this.vertices[34]]);
        this.appendFace([this.vertices[28], this.vertices[33], this.vertices[31], this.vertices[26]]);
        
        this.appendFace([this.vertices[32], this.vertices[33], this.vertices[38], this.vertices[39]]);
        this.appendFace([this.vertices[33], this.vertices[38], this.vertices[36], this.vertices[31]]);
        this.appendFace([this.vertices[37], this.vertices[38], this.vertices[23], this.vertices[24]]);
        this.appendFace([this.vertices[38], this.vertices[23], this.vertices[21], this.vertices[36]]);

        this.appendFace([this.vertices[0], this.vertices[2], this.vertices[22], this.vertices[20]]);
        this.appendFace([this.vertices[2], this.vertices[22], this.vertices[23], this.vertices[3]]);
        this.appendFace([this.vertices[3], this.vertices[23], this.vertices[24], this.vertices[4]]);
        this.appendFace([this.vertices[4], this.vertices[24], this.vertices[20], this.vertices[0]]);

        this.appendFace([this.vertices[5], this.vertices[9], this.vertices[29], this.vertices[25]]);
        this.appendFace([this.vertices[9], this.vertices[8], this.vertices[28], this.vertices[29]]);
        this.appendFace([this.vertices[8], this.vertices[7], this.vertices[27], this.vertices[28]]);
        this.appendFace([this.vertices[7], this.vertices[5], this.vertices[25], this.vertices[27]]);


        this.appendFace([this.vertices[10], this.vertices[14], this.vertices[34], this.vertices[30]]);
        this.appendFace([this.vertices[14], this.vertices[13], this.vertices[33], this.vertices[34]]);
        this.appendFace([this.vertices[13], this.vertices[12], this.vertices[32], this.vertices[33]]);
        this.appendFace([this.vertices[12], this.vertices[10], this.vertices[30], this.vertices[32]]);

        this.appendFace([this.vertices[15], this.vertices[19], this.vertices[39], this.vertices[35]]);
        this.appendFace([this.vertices[19], this.vertices[18], this.vertices[38], this.vertices[39]]);
        this.appendFace([this.vertices[18], this.vertices[17], this.vertices[37], this.vertices[38]]);
        this.appendFace([this.vertices[17], this.vertices[15], this.vertices[35], this.vertices[37]]);

        console.log(this.vertices, this.faces);
    }
};