import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class HyperCube extends Figure{
    constructor(cntr, len, fillClr = new Color(0, 0, 20, 0.4), lineClr = new Color(0, 0, 30, 0.6), lineWdt = 0.4){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
		console.log(len, parseFloat(len), this.length);
        this.vertices = [];
        this.faces = [];
		this.vertexCode = new Array(this.center.getDim());

		this.clearCode();
		this.generateVertices();
		this.generateFaces();
    }
 
    generateVertices(){
		for(let i = 0; i < Math.pow(2, this.center.getDim()); i++){
			this.vertices.push(this.codeToVertex());
			this.incrementCode();
		}
    }
 
    generateFaces(){
        for(let i = 0; i < this.center.getDim() - 1; i++)
			for(let j = i + 1; j < this.center.getDim(); j++){
				this.clearCode();
				for(let k = 0; k < Math.pow(2, this.center.getDim() - 2); k++){
					let code0 = [...this.vertexCode];
					let code1 = [...code0]; code1[i] = 1;
					let code2 = [...code0]; code2[i] = 1; code2[j] = 1;
					let code3 = [...code0]; code3[j] = 1;

					this.faces.push([this.vertices[this.codeToId(code0)],
									 this.vertices[this.codeToId(code1)],
									 this.vertices[this.codeToId(code2)],
									 this.vertices[this.codeToId(code3)]]);
					this.incrementCode([i,j]);
				}
 
			}
    }
 
    incrementCode(skip = []){
        for(let i = this.center.getDim() - 1; i >= 0; i--){
			if(skip.includes(i)) continue;
				if(this.vertexCode[i] === 1) 
					this.vertexCode[i] = 0;
				else{
					this.vertexCode[i] = 1;
					break;
				}
		}
    }
    codeToVertex(){
		let vertArr = this.center.getCords();
		for(let i = 0; i < this.vertexCode.length; i++)
			vertArr[i] += this.length/2  * (this.vertexCode[i] === 1 ? 1 : -1);
		return new HyperVertex(vertArr);
    }
    codeToId(code){ 
		if(!Array.isArray(code) || code.length !== this.center.getDim()) return false;
		return parseInt(code.join(""), 2);
    }
    clearCode(){
		for(let i = 0; i < this.vertexCode.length; i++)
			this.vertexCode[i] = 0;
    }
};