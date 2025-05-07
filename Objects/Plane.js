import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Plane extends Figure{
    constructor(cntr, len, fillClr = new Color(0, 0, 20, 0.5), lineClr = new Color(0, 0, 30, 0.7), lineWdt = 0.4){ 
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);

        this.normal = []; // Normalna
        this.D = 0;

        this.vertices = [
            new HyperVertex([this.center.x + this.length/2, this.center.y + this.length/2, this.center.z]),
            new HyperVertex([this.center.x + this.length/2, this.center.y - this.length/2, this.center.z]),
            new HyperVertex([this.center.x - this.length/2, this.center.y - this.length/2, this.center.z]),
            new HyperVertex([this.center.x - this.length/2, this.center.y + this.length/2, this.center.z])
        ];
        this.faces = [[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]];
        this.calcEquation();
    }

    constructByVertices(vert1, vert2, vert3, vert4){  
        this.center = new HyperVertex([(vert1.x + vert2.x)/2, (vert1.y + vert3.y)/2, this.center.z]);
        this.vertices = [vert1, vert2, vert3, vert4];
        this.faces = [[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]]];
        this.calcEquation();
    }

    calcEquation(){
        let v = [this.vertices[1].x - this.vertices[0].x, this.vertices[1].y - this.vertices[0].y];
        let u = [this.vertices[3].x - this.vertices[0].x, this.vertices[3].y - this.vertices[0].y];

        this.normal = [
            v[1]*u[2] - v[2]*u[1],
            v[2]*u[0] - v[0]*u[2],
            v[0]*u[1] - v[1]*u[0]
        ];
        this.D = -this.normal[0]*this.vertices[0].x 
                 -this.normal[1]*this.vertices[0].y 
                 -this.normal[2]*this.vertices[0].z;
    }
};