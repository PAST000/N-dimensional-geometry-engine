import HyperVertex from "./Objects/HyperVertex.js";
import Color from "./Objects/Color.js";
 
import Cube from "./Objects/Cube.js";
import Cuboid from "./Objects/Cuboid.js";
import Plane from "./Objects/Plane.js";
import Cross from "./Objects/Cross.js";
import PseudoSphere from "./Objects/PseudoSphere.js";
import Cone from "./Objects/Cone.js";
import HyperCube from "./Objects/HyperCube.js";
 
export default class Engine{
    #cnv; 
    #ctx;
    #center;
    #objects = [];
    #vertices = [];
    #rotationAxisMain = 0;
    #rotationAxis1 = 1;
    #rotationAxis2 = 2;
    #camera;
    #direction;

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

        this.updateCenter();
        this.#camera = new HyperVertex([0,0,25,0]);
        this.#direction = new HyperVertex([0,0,1,0]);

        let a1 = new HyperVertex([1,0,0]);
        let b1 = new HyperVertex([0,1,0]);
        let a2 = new HyperVertex([1,2,3]);
        let b2 = new HyperVertex([2,4,6]);
        let a3 = new HyperVertex([1,2,3]);
        let b3 = new HyperVertex([-1,-2,-3]);

        console.log(a1.dot(b1));
        console.log(a2.dot(b2));
        console.log(a3.dot(b3));

        this.#cnv.addEventListener("mousedown", () =>{
            this.rotateAll(this.#rotationAxis1, 5);
        });
        document.addEventListener("keydown", (e) => {
            if(e.ctrlKey) return;
            let deg = this.arrowSensitivityFactor * this.sensitivity * Math.PI / 180;

            if(e.code === "ArrowRight") this.rotateAll(this.#rotationAxis1,  deg);
            if(e.code === "ArrowLeft")  this.rotateAll(this.#rotationAxis1, -deg);
            if(e.code === "ArrowUp")    this.rotateAll(this.#rotationAxis2,  deg);
            if(e.code === "ArrowDown")  this.rotateAll(this.#rotationAxis2, -deg);
        });
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
        this.#vertices = Array.from(newVertices);
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
 
    rotateAll(ax, deg){
        for(let i = 0; i < this.#vertices.length; i++)
            if(!this.#vertices[i].rotate(this.#rotationAxisMain, ax, deg)){
                console.log('error');
                return false;
            }	
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
		        projection.push(this.#objects[i].faces[j][k].perspectiveProjection(2, this.#camera, this.#direction));	

		    this.#ctx.beginPath();
            this.#ctx.moveTo(this.#center.getCord(0) + projection[0][0], this.#center.getCord(1) + projection[0][1]);
            for(let k = 1; k < projection.length; k++)
                this.#ctx.lineTo(this.#center.getCord(0) + projection[k][0], this.#center.getCord(1) + projection[k][1]);
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
        return [Cube, Cuboid, Plane, Cross, PseudoSphere, Cone, HyperCube].some(type => obj instanceof type);
    }
 
    setRotationAxises(m, ax1, ax2){
        let main = parseInt(m);
	    let axis1 = parseInt(ax1);
	    let axis2 = parseInt(ax2);
        if(main === axis1 || main === axis2 || axis1 === axis2) return false;

        if(!isNaN(main) && main >= 0 && main <= this.center.getDim())
            this.#rotationAxisMain = main;
        if(!isNaN(axis1) && axis1 >= 0 && axis1 <= this.center.getDim())
            this.#rotationAxis1 = axis1;
        if(!isNaN(axis2) && axis2 >= 0 && axis2 <= this.center.getDim())
            this.#rotationAxis2 = axis2;
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