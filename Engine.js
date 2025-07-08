import HyperVertex from "./Objects/base/HyperVertex.js";
import Color from "./Objects/base/Color.js";
 
import Cross from "./Objects/Cross.js";
import PseudoSphere from "./Objects/PseudoSphere.js";
import Cone from "./Objects/Cone.js";
import HyperCube from "./Objects/HyperCube.js";
import HyperCuboid from "./Objects/HyperCuboid.js";
import CubicFrame from "./Objects/CubicFrame.js";
import Arrow from "./Objects/Arrow.js";
 
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
        this.mouseDown = false;
        this.mouseInitialX = 0;
        this.mouseInitialY = 0;

        this.updateCenter();
        this.#camera = new HyperVertex([0,0,230,0]);
        this.#direction = new HyperVertex([0,0,-1,0]);

        this.#cnv.addEventListener("mousedown", this.#mouseClick.bind(this));
        document.addEventListener("mousemove", this.#mouseMove.bind(this));
        document.addEventListener("mouseup", this.#mouseStop.bind(this));
        document.addEventListener("keydown", (e) => {
            if(e.ctrlKey) return;
            let deg = this.arrowSensitivityFactor * this.sensitivity * Math.PI / 180;

            if(e.code === "ArrowRight") this.rotateAll(this.#rotationAxisMain, this.#rotationAxis1,  deg);
            if(e.code === "ArrowLeft")  this.rotateAll(this.#rotationAxisMain, this.#rotationAxis1, -deg);
            if(e.code === "ArrowUp")    this.rotateAll(this.#rotationAxisMain, this.#rotationAxis2,  deg);
            if(e.code === "ArrowDown")  this.rotateAll(this.#rotationAxisMain, this.#rotationAxis2, -deg);
        });
    }
 
    updateCenter(){
        this.#center = new HyperVertex([this.#cnv.width/2, this.#cnv.height/2, 0]);
        this.draw();
    }
 
    updateVertices(){
	    let newVertices = new Set();
        for(let obj of this.#objects)
            for(let vert of obj.vertices)
                newVertices.add(vert);   
        this.#vertices = Array.from(newVertices);
        this.draw();
    }
 
    addObject(obj){
        if(!this.checkType(obj)) return false;
	    this.#objects.push(obj);
	    this.updateVertices();
	    return true;
    }
 
    addObjects(objs){
        let error = false;
        for(let obj of objs)
            if(!this.checkType(obj)) {
                error = true;
                break;
            }
            else 
                this.#objects.push(obj);
        this.updateVertices();
        return !error;
    }

    delObject(obj){
        let id = this.#objects.indexOf(obj);
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
 
    rotateAll(ax1, ax2, deg){
        for(let vert of this.#vertices)
            if(!vert.rotate(ax1, ax2, deg))
                return false;
        this.draw();
        return true;
    }
 
    setStyle(fillColor, lineColor, lineWidth, setFillColor = true, setLineColor = true, setLineWidth = true){
        if(setFillColor) this.#ctx.fillStyle =   ((fillColor instanceof Color)    ? fillColor.toString() : this.defaultFillColor.toString());
        if(setLineColor) this.#ctx.strokeStyle = ((lineColor instanceof Color)    ? lineColor.toString() : this.defaultLineColor.toString());
        if(setLineWidth) this.#ctx.lineWidth =   ((typeof lineWidth === "number") ? lineWidth            : this.defaultLineWidth);
    }
 
    draw(){
        this.#ctx.clearRect(0, 0, this.#cnv.offsetWidth, this.#cnv.offsetHeight);
        for(let obj of this.#objects){ 
            let j = 0;
            for(let face of obj.faces){
                let projection = face.perspectiveProjection(2, this.#camera, this.#direction, 60);
                if(projection.length === 0) continue;

                this.setStyle(
                    (face.fillColor       ?? obj.fillColor       ?? null),
                    (face.lineColors?.[0] ?? obj.lineColors?.[0] ?? null),
                    (face.lineWidths?.[0] ?? obj.lineWidths?.[0] ?? null)
                );

                this.#ctx.beginPath();
                this.#ctx.moveTo(
                    this.#center.getCord(0) + projection[0][0],
                    this.#center.getCord(1) + projection[0][1]
                );

                for (let k = 1; k < projection.length; k++) {
                    this.#ctx.lineTo(
                        this.#center.getCord(0) + projection[k][0],
                        this.#center.getCord(1) + projection[k][1]
                    );
                }
                this.#ctx.closePath();
                this.#ctx.fill();

                for (let k = 0; k < projection.length; k++) {
                    let a = projection[k];
                    let b = projection[(k + 1) % projection.length];

                    this.setStyle(
                        null,
                        face.lineColors?.[k] ?? obj.lineColors?.[k] ?? null,
                        face.lineWidths?.[k] ?? obj.lineWidths?.[k] ?? null,
                        false
                    );

                    this.#ctx.beginPath();
                    this.#ctx.moveTo(
                        this.#center.getCord(0) + a[0],
                        this.#center.getCord(1) + a[1]
                    );
                    this.#ctx.lineTo(
                        this.#center.getCord(0) + b[0],
                        this.#center.getCord(1) + b[1]
                    );
                    this.#ctx.stroke();
                }

                j++;
            }
        } 
    }
 
    #mouseClick(M){
        this.mouseX = M.clientX;
        this.mouseY = M.clientY;
        this.mouseDown = true;
    } 
    #mouseStop(){ 
        this.mouseDown = false; 
    }
    #mouseMove(M){
        if(!this.mouseDown) return;
        this.rotateAll(this.#rotationAxisMain, this.#rotationAxis1, (M.clientX - this.mouseX) * Math.PI / 360);
        this.rotateAll(this.#rotationAxisMain, this.#rotationAxis2, (this.mouseY - M.clientY) * Math.PI / 360);
        this.mouseX = M.clientX;
        this.mouseY = M.clientY;
    }
 
    checkType(obj) {
        return [Cross, PseudoSphere, Cone, HyperCube, HyperCuboid, CubicFrame, Arrow].some(type => obj instanceof type);
    }
 
    setRotationAxises(m, ax1, ax2){
        let main = parseInt(m);
	    let axis1 = parseInt(ax1);
	    let axis2 = parseInt(ax2);
        if(main === axis1 || main === axis2 || axis1 === axis2) return false;

        if(!isNaN(main) && main >= 0 && main <= this.#center.getDim())
            this.#rotationAxisMain = main;
        if(!isNaN(axis1) && axis1 >= 0 && axis1 <= this.#center.getDim())
            this.#rotationAxis1 = axis1;
        if(!isNaN(axis2) && axis2 >= 0 && axis2 <= this.#center.getDim())
            this.#rotationAxis2 = axis2;
    }
 
    setPrecision(prec) { 
	    if(typeof prec !== "number" || isNaN(prec) || prec <= 4) return false;
        this.precision = parseInt(prec);
        for(let obj of this.#objects)
		    if(!obj.setPrecision(this.precision)) return false;
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

    getDim(){ return this.#center.getDim(); }
};