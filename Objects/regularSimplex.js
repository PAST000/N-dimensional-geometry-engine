import Figure from "./base/Figure.js";
import HyperVertex from "./base/HyperVertex.js";

export default class RegularSimplex extends Figure{
    constructor(cntr, len, fillClr, lineClr, lineWdt){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        this.vertices = [];
        this.faces = [];

        this.generateVertices();
        this.generateFaces();
        console.log(this.vertices, this.faces);
    }
 
    generateVertices(){
        let arr = Array(this.center.getDim()).fill(0);
        let d = parseFloat(this.length/Math.sqrt(2));
        let u = Math.sqrt(this.center.getDim()+1);

        // Przesuwamy figurę tak, aby faktyczne centrum pokryło się z zadanym centrum, czyli o wektor: baryCentrum - zadaneCentrum
        let shift = this.center.toTranslated(-parseFloat(d*(1 + 1/(1-u)))).getCords();
        console.log(shift); 
        
        shift[0] += d;
        this.vertices.push(new HyperVertex([...shift]));

        for(let i = 1; i < this.center.getDim(); i++){
            shift[i-1] -= d;
            shift[i]   += d;
            this.vertices.push(new HyperVertex([...shift]));
        }

        arr = Array(this.center.getDim()).fill(parseFloat(d*(1 + 2/(1-u))));
        this.vertices.push(new HyperVertex(arr));
    }
 
    generateFaces(){
        for(let i = 0; i < this.vertices.length-2; i++)
            for(let j = i+1; j < this.vertices.length-1; j++)
                for(let k = j+1; k < this.vertices.length; k++)
                    this.appendFace([this.vertices[i], this.vertices[j], this.vertices[k]]);
    }
};

// https://mathoverflow.net/questions/38724/coordinates-of-vertices-of-regular-simplex