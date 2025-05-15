import Figure from "./Figure.js";
import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";

export default class PseudoSphere extends Figure{
    constructor(cntr, radius, prec, fillClr = new Color(0, 0, 50, 0.3), lineClr = new Color(0, 0, 80, 0.5), lineWdt = 0.4){  //precision - liczba wierzchołków w największym przekroju
        if(prec < 4) throw "Precision cannot be lesser than 4.";
        super(cntr, fillClr, lineClr, lineWdt);
        this.r = parseFloat(radius);
        this.precision = parseInt(prec);

        this.vertices = [
	    this.center.toTranslated(this.r,  0,       0      ),
            this.center.toTranslated(0,       this.r,  0      ),
            this.center.toTranslated(-this.r, 0,       0      ),
            this.center.toTranslated(0,       -this.r, 0      ),
            this.center.toTranslated(0,       0,       this.r ),
            this.center.toTranslated(0,       0,       -this.r)
        ];
        this.faces = [
            [this.vertices[0],this.vertices[1],this.vertices[4]],
            [this.vertices[0],this.vertices[1],this.vertices[5]],
            [this.vertices[0],this.vertices[3],this.vertices[4]],
            [this.vertices[0],this.vertices[3],this.vertices[5]],
            [this.vertices[2],this.vertices[1],this.vertices[4]],
            [this.vertices[2],this.vertices[1],this.vertices[5]],
            [this.vertices[2],this.vertices[3],this.vertices[4]],
            [this.vertices[2],this.vertices[3],this.vertices[5]]
        ];
        this.createVerticies();
    }

    createVerticies(){
        this.faces = [];
        this.vertices = [];
        var theta = 2* Math.PI / this.precision;

        for(var i = 0; i < this.precision; i++){
            for(var j = 0; j < this.precision; j++)
		this.vertices.push(this.center.toTranslated(Math.cos(j*theta)*Math.cos(i*theta)*this.r, 
                                                            Math.sin(j*theta)*this.r, 
                                                            Math.cos(j*theta)*Math.sin(i*theta)*this.r));
        }

        for(var i = 0; i < this.vertices.length; i++){
            if (!this.vertices[i] instanceof HyperVertex) continue;

            if((i + this.precision) >= this.vertices.length){ 
                if((i+1) % this.precision == 0)   // Ostatni
                    this.faces.push([this.vertices[i],this.vertices[i + 1 - this.precision], this.vertices[0], this.vertices[this.precision - 1]]);
                else
                    this.faces.push([this.vertices[i],this.vertices[i + 1], this.vertices[i % this.precision + 1], this.vertices[i % this.precision]]);
            }
            else
                if((i+1) % this.precision == 0)  // Ostatni z "okręgu"
                    this.faces.push([this.vertices[i],this.vertices[i + 1 - this.precision], this.vertices[i + 1], this.vertices[i + this.precision]]);
                else
                    this.faces.push([this.vertices[i],this.vertices[i + 1], this.vertices[i + 1 + this.precision], this.vertices[i + this.precision]]);
        }
    }

    setPrecision(prec){
        if(typeof prec !== "number" || prec < 4) return false;
        this.precision = parseInt(prec);
        this.createVerticies();
        return true;
    }
};