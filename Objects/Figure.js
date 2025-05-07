import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Cube{
    constructor(cntr, fillClr = new Color(0, 0, 20, 0.4), lineClr = new Color(0, 0, 30, 0.6), lineWdt = 0.4){
        if(!cntr instanceof HyperVertex) throw("Center must be a HyperVertex.");
        if(!fillClr instanceof Color) throw("Fill color must be a Color.");
        if(!lineClr instanceof Color) throw("Line color must be a Color.");
        if(typeof lineWdt !== "number") throw("Line width must a number.");

        this.center = cntr;
        this.fillColor = fillClr;
        this.lineColor = lineClr;
        this.lineWidth = lineWdt;
        this.vertices = [];
        this.faces = [];
    }

    changeFillColor(fillClr){ 
        if(!fillClr instanceof Color) return false;
        this.fillColor = fillClr; 
        return true;
    }
    changeLineColor(lineClr){ 
        if(!lineClr instanceof Color) return false;
        this.lineColor = lineClr; 
        return true;
    }
    changeLineWidth(width){ 
        if(typeof width !== "number" || width < 0) return false;
        this.lineWidth = width; 
        return true;
    }
    setPrecision(prec){}
};