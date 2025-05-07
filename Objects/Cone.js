import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Cone extends Figure{
    constructor(cntr, rad, height, precision, fillColor = new Color(0, 0, 50, 0.2), lineColor = new Color(0, 0, 80, 0.5), lineWidth = 0.4){  //precision - liczba wierzchołków podstawy
        super(cntr, fillColor, lineColor, lineWidth);
        this.baseCenter = new HyperVertex([cntr.x, cntr.y + height/2, cntr.z]);  // TODO
        this.radius = parseFloat(rad);
        this.height = parseFloat(height);
        this.precision = parseFloat(precision);

        this.createVerticies();
        this.createFaces();
    }

    createVerticies(){
        if(this.precision < 3) return;
        this.vertices = [new HyperVertex([this.center.x, this.center.y - this.height/2, this.center.z])];
        var theta = 2 * Math.PI / this.precision;

        for(var i = 0; i < this.precision; i++){
            this.vertices.push(new HyperVertex([this.baseCenter.x + this.radius * Math.cos(theta * i),
                                                this.baseCenter.y, 
                                                this.baseCenter.z + this.radius * Math.sin(theta * i)]));
        }
    }

    createFaces(){
        if(this.vertices.length == 0) return;
        for(let i = 1; i < this.precision; i++)
            this.faces.push([this.vertices[0], this.vertices[i], this.vertices[i + 1]]);
        this.faces.push([this.vertices[0], this.vertices[this.vertices.length - 1], this.vertices[1]]);
    }

    setPrecision(prec){
        if(typeof prec !== "number" || prec < 4) return false;
        this.precision = parseInt(prec);
        this.createVerticies();
        this.createFaces();
        return true;
    }
};