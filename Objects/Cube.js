import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class Cube extends Figure{
    constructor(cntr, len, fillClr = new Color(0, 0, 20, 0.4), lineClr = new Color(0, 0, 30, 0.6), lineWdt = 0.4){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        
        this.vertices = [
            new HyperVertex([cntr.x + len/2, cntr.y + len/2, cntr.z + len/2]), 
            new HyperVertex([cntr.x + len/2, cntr.y + len/2, cntr.z - len/2]), 
            new HyperVertex([cntr.x - len/2, cntr.y + len/2, cntr.z - len/2]), 
            new HyperVertex([cntr.x - len/2, cntr.y + len/2, cntr.z + len/2]), 
            new HyperVertex([cntr.x + len/2, cntr.y - len/2, cntr.z + len/2]), 
            new HyperVertex([cntr.x + len/2, cntr.y - len/2, cntr.z - len/2]), 
            new HyperVertex([cntr.x - len/2, cntr.y - len/2, cntr.z - len/2]), 
            new HyperVertex([cntr.x - len/2, cntr.y - len/2, cntr.z + len/2])
        ];

        this.faces = [  // Kolejność ścian: Góra, prawo, dół, lewo, tył, przód
            [this.vertices[0], this.vertices[1], this.vertices[2],this.vertices[3]],
            [this.vertices[0], this.vertices[4], this.vertices[5],this.vertices[1]],
            [this.vertices[4], this.vertices[5], this.vertices[6],this.vertices[7]],
            [this.vertices[2], this.vertices[6], this.vertices[7],this.vertices[3]],
            [this.vertices[0], this.vertices[4], this.vertices[7],this.vertices[3]],
            [this.vertices[1], this.vertices[5], this.vertices[6],this.vertices[2]]
        ];
    }

    checkClick(P){ 
        if(!(P instanceof HyperVertex)) return false;
        let point = P.project(2);
        for(let i = 0; i < this.faces.length; i++){
            if(withinQuad(this.faces[i][0].project(), 
                          this.faces[i][1].project(), 
                          this.faces[i][2].project(), 
                          this.faces[i][3].project(), 
                          point))
                return true;
        }
        return false;
    }
};