import HyperVertex from "./Objects/HyperVertex.js";
import Color from "./Objects/Color.js";
 
import Cube from "./Objects/Cube.js";
import Cuboid from "./Objects/Cuboid.js";
import Plane from "./Objects/Plane.js";
import Cross from "./Objects/Cross.js";
import PseudoSphere from "./Objects/PseudoSphere.js";
import Cone from "./Objects/Cone.js";
 
export default class Engine{
    #cnv; 
    #ctx;
    #center;
    #objects = [];
    #vertices = [];
 
    constructor(canvas, sens, sensFac, prec){
        this.#cnv = canvas;
	    this.#cnv.width = this.#cnv.clientWidth;
        this.#cnv.height = this.#cnv.clientHeight;
        this.#ctx = this.#cnv.getContext("2d");
	    this.sensitivity = sens;
        this.arrowSensitivityFactor = sensFac; 
        this.precision = prec;
        this.defaultFillColor = new Color(0, 0, 90, 0.12);
        this.defaultLineColor = new Color(0, 0, 100, 0.12);
        this.defaultLineWidth = 1;
        this.rotationAxis1 = 0;
        this.rotationAxis2 = 1;
    
        this.updateCenter();
    }
 
    updateCenter(){
        this.#center = new HyperVertex([this.#cnv.width/2, this.#cnv.height/2, 0]);
        this.draw();
    }
 
    updateVertices(){
	    let newVertices = new Set();
        for(let i = 0; i < this.#objects.length; i++)
	    for(let j = 0; j < this.#objects[i].vertices.length; j++)
	        newVertices.add(this.#objects[i].vertices[j]);   
        this.vertices = Array.from(newVertices);
        this.draw();
    }
 
    addObject(obj){
        if(!this.checkType(obj)) return false;
	    this.#objects.push(obj);
	    this.updateVertices();
	    return true;
    }
 
    delObject(obj){
        let id = this.#objects.indexof(obj);
        if(id < 0) return false;
        this.#objects.splice(id, 1);
        this.updateVertices();
        return true;
    }	
 
    delObjectById(id){
    	if(id < 0 || id >= this.#objects.length) return false;
        this.#objects.splice(id, 1);
        this.updateVertices();
        return true;
    }
 
    rotateAll(deg1, deg2){
	for(let i = 0; i < this.#vertices.length; i++)
	    if(!this.#vertices[i].rotate(this.rotationAxis1, this.rotationAxis2, deg1, deg2)) return false;
	    this.draw();
        return true;	
    }
 
    setStyle(fillColor = this.defaultFillColor, lineColor = this.defaultLineColor, lineWidth = this.defaultLineWidth){
        if(fillColor instanceof Color) this.#ctx.fillStyle = fillColor.toString();
        if(lineColor instanceof Color) this.#ctx.strokeStyle = lineColor.toString();
        if(typeof lineWidth === "number" && !isNaN(lineWidth) && lineWidth >= 0) this.#ctx.lineWidth = lineWidth;
    }
 
    draw(){
        this.#ctx.clearRect(0, 0, this.#cnv.offsetWidth, this.#cnv.offsetHeight);
        for(let i = 0; i < this.#objects.length; i++){
            this.setStyle(this.#objects[i].fillColor === undefined ? this.defaultFillColor : this.#objects[i].fillColor, 
                          this.#objects[i].lineColor === undefined ? this.defaultLineColor : this.#objects[i].lineColor,
                          this.#objects[i].lineWidth === undefined ? this.defaultLineWidth : this.#objects[i].lineWidth);
		for(let j = 0; j < this.#objects[i].faces.length; j++){
		    let projection = [];
		    for(let k = 0; k < this.#objects[i].faces[j].length; k++)
		        projection.push(this.#objects[i].faces[j][k].project(2));	
 
		    this.#ctx.beginPath();
            this.#ctx.moveTo(this.#center[0] + projection[0][0], this.#center[1] + projection[0][1]);
            for(let k = 1; k < projection.length; k++)
                this.#ctx.lineTo(this.#center[0] + projection[k][0], this.#center[1] + projection[k][1]);
            this.#ctx.closePath();
            this.#ctx.stroke();
            this.#ctx.fill();
		}
        } 
    }
 
 
    #mouseClick(M){}
    #mouseStop(){}
    #mouseMove(M){}
 
    checkType(obj) {
        return [Cube, Cuboid, Plane, Cross, PseudoSphere, Cone].some(type => obj instanceof type);
    }
 
    setRotationAxises(ax1, ax2){
	    let axis1 = parseInt(ax1);
	    let axis2 = parseInt(ax2);
        if(isNaN(axis1) || isNaN(axis2) || axis1 === axis2 ||
	       ax1 < 0 || ax2 < 0 || ax1 >= this.center.getDims() || ax2 >= this.center.getDims()) return false;
	    this.rotationAxis1 = ax1;
	    this.rotationAxis2 = ax2;
    }
 
    setPrecision(prec) { 
	    if(typeof prec !== "number" || isNaN(prec) || prec <= 4) return false;
        this.precision = parsetInt(prec);
        for(let i = 0; i < this.#objects.length; i++)
		if(!this.#objects[i].setPrecision(this.precision)) return false;
	    this.updateVertices();
        return true;
    }
    setSensitivity(sens){ 
	    if(typeof sens !== "number" || isNaN(sens) || sens <= 0) return false;
        this.sensitivity = parseFloat(sens); 
	    return true;
    }
    setArrowSensitivityFactor(fac){ 
	    if(typeof fac !== "number" || isNaN(fac) || fac <= 0) return false;
        this.arrowSensitivityFactor = parseFloat(fac); 
	    return true;
    }
};