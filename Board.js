import HyperVertex from "./Objects\HyperVertex.js";
import Color from "./Objects\Color.js";
import Engine from "./Engine.js";
 
import Cube from "./Objects\Cube.js";
import Cuboid from "./Objects\Cuboid.js";
import Plane from "./Objects\Plane.js";
import Cross from "./Objects\Cross.js";
import PseudoSphere from "./Objects\PseudoSphere.js";
import Cone from "./Objects\Cone.js";
 
export default class Board{
    #engine;
    #sizes = [];
    #counts = [1]; 
    #fields = [];
    #pawns = [];
    #pawnsColors = [];
    #fieldLen;
    #defaultFillColor;
    #defaultLineColor;
    #defaultLineWidth

    constructor(canvas, sizes, fieldLen, prec, sens, sensFac,
                fillClr = new Color(0, 0, 120, 0.2), lineClr = new Color(0, 0, 180, 0.2), lineWidth = 0.1, pawnClr = new Color(40, 40, 40, 0.35)){
        if(!Array.isArray(sizes) || sizes.length < 3) throw "Incorrect sizes";
        if(typeof fieldLen !== "number" || isNaN(fielLen) || fieldLen <= 0) throw "Incorrect field length.";
        if(!fillClr instanceof Color) throw "Filling color must be an instance of Color.";
        if(!lineClr instanceof Color) throw "Line color must be an instance of Color.";
        if(!pawnClr instanceof Color) throw "Pawn color must be an instance of Color.";
        if(typeof lineWidth !== "number" || isNaN(lineWidth) || lineWidth < 0) throw "Incorrect line width.";
    
        this.#engine = new Engine(canvas, sens, sensFac, prec);
        this.#sizes = [...sizes];
        this.#fieldLen = parseFloat(fieldLen);   
    
        this.#defaultFillColor = fillClr;
        this.#defaultLineColor = lineClr;
        this.#defaultLineWidth = pawnClr;
        this.#pawnsColors = [pawnClr];
    
        for(let i = 0; i < this.#sizes.length; i++){
            if(!Number.isInteger(this.#sizes[i])) throw "All sizes must be integers";
            this.#counts[i + 1] = this.#counts[i] * this.#sizes[i];
        }
        this.#pawns = new Array(this.#counts[this.#counts.length - 1]); 
        this.generateFields();
    }
 
    generateFields(){
        let fieldCenter = new FieldCenter(this.#engine.getDims(), this.#fieldLen, [...this.#sizes]);
        for(let i = 0; i < this.#counts[this.#counts.length - 1]; i++){
            this.#fields.push(new Cube(fieldCenter.toVertex(), this.#fieldLen, this.#defaultFillColor, this.#defaultLineColor, this.#defaultLineWidth));
            fieldCenter.increment();
        }
    }
    
    draw(){ this.#engine.draw(); }
    setSensitivity(sens){
        newSens = parseFloat(sens);
        if(isNaN(newSens) || newSens < 0) return false;
        this.sens = newSens;
    }
    setPrecision(prec){ return this.#engine.setPrecision(prec); }
    setPawnsColors(colors){
        if(!Array.isArray(colors) || colors.length < 1) return false;
        for(let i = 0; i < colors.length; i++){
            if(!colors[i] instanceof Color) return false;
            this.#pawnsColors[i] = colors[i];
        }
    }
 
    getSizes(){ return [...this.#sizes]; }
    getPawns(){ return [...this.#pawns]; }
    getFieldLen(){ return this.#fieldLen; }
};
 
class FieldCenter{
    #cords = [];
    #dimension;
    #fieldLen;
    #sizes = [];  // TODO czy na pewno najniższy...najwyższy czy może najwyższy...najniższy(wymiar)
 
    constructor(dim, fieldLen, sizes){
        if(!Number.isInteger(dim) || dim < 3) throw "Incorrect dimension.";
        if(typeof fieldLen !== "number" || fieldLen < 0) throw "Incorrect field length.";
        if(!Array.isArray(sizes)) throw "Incorrect sizes.";

        this.#dimension = parseInt(dim);
        this.#fieldLen = parseFloat(fieldLen);
        this.#cords = new Array(this.#dimension);
        for(let i = 0; i < this.#dimension; i++)
            this.#cords[i] = 0;
        this.#sizes = [...sizes];
    }
 
    increment(dim = null){
        if(dim === null) dim = this.#dimension - 1;
        if(!Number.isInteger(dim) || dim < 0 || dim >= this.#dimension) return false;
        this.#cords[dim]++;
        if(this.#cords[dim] >= this.#sizes[dim]){
            this.#cords[dim] = 0;
            this.increment(dim - 1);
        }
        return true;
    }
 
    toVertex(){
    	let vertArr = [];
        for(let i = 0; i < this.#dimension; i++)
            vertArr[i] = this.#fieldLen*(this.#cords[i] * - this.#sizes[i]/2);
        return new HyperVertex([...vertArr]);
    }
}