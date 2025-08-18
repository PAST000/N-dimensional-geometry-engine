import Figure from "./base/Figure.js";
import Color from "./base/Color.js";

export default class Arrow extends Figure{
    constructor(cntr, len, pin, headW, headL, fillClr, lineClr, lineWdt){ 
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);

        this.pinFactor = parseFloat(pin);          // Współczynnik szerokości trzonu do długości strzałki
        this.headWidthFactor = parseFloat(headW);  // Współczynnik szerokości główki do długości strzałki
        this.headLengthFactor = parseFloat(headL); // Współczynnik długości główki do długości strzałki
        this.pinWidth = this.length * this.pinFactor;
        this.headWidth = this.length * this.headWidthFactor;
        this.headLength = this.length * this.headLengthFactor

        console.log(this.center, this.length, this.pinWidth, this.headLength, this.headWidth);

        this.vertices = [  
            this.center.toTranslated([ this.pinWidth, -this.length/2,  this.pinWidth]),
            this.center.toTranslated([-this.pinWidth, -this.length/2,  this.pinWidth]),
            this.center.toTranslated([-this.pinWidth, -this.length/2, -this.pinWidth]),
            this.center.toTranslated([ this.pinWidth, -this.length/2, -this.pinWidth]),

            this.center.toTranslated([ this.pinWidth,  this.length/2 - this.headLength,  this.pinWidth]),
            this.center.toTranslated([-this.pinWidth,  this.length/2 - this.headLength,  this.pinWidth]),
            this.center.toTranslated([-this.pinWidth,  this.length/2 - this.headLength, -this.pinWidth]),
            this.center.toTranslated([ this.pinWidth,  this.length/2 - this.headLength, -this.pinWidth]),

            this.center.toTranslated([ this.headWidth,  this.length/2 - this.headLength,  this.headWidth]),
            this.center.toTranslated([-this.headWidth,  this.length/2 - this.headLength,  this.headWidth]),
            this.center.toTranslated([-this.headWidth,  this.length/2 - this.headLength, -this.headWidth]),
            this.center.toTranslated([ this.headWidth,  this.length/2 - this.headLength, -this.headWidth]),

            this.center.toTranslated([0, this.length/2, 0])
        ];

        console.log(this.vertices);

        this.appendFace([this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]);
        this.appendFace([this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4]]);
        this.appendFace([this.vertices[1], this.vertices[2], this.vertices[6], this.vertices[5]]);
        this.appendFace([this.vertices[2], this.vertices[3], this.vertices[7], this.vertices[6]]);
        this.appendFace([this.vertices[3], this.vertices[7], this.vertices[4], this.vertices[0]]);
        this.appendFace([this.vertices[4], this.vertices[5], this.vertices[9], this.vertices[8]]);
        this.appendFace([this.vertices[5], this.vertices[6], this.vertices[10], this.vertices[9]]);
        this.appendFace([this.vertices[6], this.vertices[7], this.vertices[11], this.vertices[10]]);
        this.appendFace([this.vertices[7], this.vertices[4], this.vertices[8], this.vertices[11]]);
        this.appendFace([this.vertices[8], this.vertices[9], this.vertices[12]]);
        this.appendFace([this.vertices[9], this.vertices[10], this.vertices[12]]);
        this.appendFace([this.vertices[10], this.vertices[11], this.vertices[12]]);
        this.appendFace([this.vertices[11], this.vertices[8], this.vertices[12]]);
    }
};