import HyperVertex from "./HyperVertex.js";
import Color from "./Color.js";
import Face from "./Face.js";

export default class Figure{
    constructor(cntr, fillClr, lineClr, lineWdt, fillClrs, lineClrs, lineWdts){
        if(!(cntr instanceof HyperVertex))                                throw("Center must be a HyperVertex.");
        if(!(fillClr instanceof Color || typeof fillClr === "undefined")) throw("Fill color must be a Color or left empty.");
        if(!(lineClr instanceof Color || typeof lineClr === "undefined")) throw("Line color must be a Color or left empty.");
        if(typeof lineWdt !== "number" && typeof lineWdt !== "undefined") throw("Line width must a number or left empty.");
        if(typeof fillClrs !== "undefined" && fillClrs.length === 0)      throw("Filling colors must be an array of Colors or left empty.");
        if(typeof lineClrs !== "undefined" && lineClrs.length === 0)      throw("Line colors must be an array of Colors or left empty.");
        if(typeof lineWdts !== "undefined" && lineWdts.length === 0)      throw("Line widths must be an array of numbers or left empty.");

        // Wartości domyślne (gdy nie jest zdefiniowana wartość w Face)
        this.fillColor = fillClr;
        this.lineColor = lineClr;  
        this.lineWidth = lineWdt;  
        
        this.fillColors = fillClrs;   // Przekazywane do konstruktora Face(), gdy nie podano wartości przy dodawaniu ściany.
        this.lineColors = lineClrs;   // Przekazywany jest wiersz o indeksie dodawanej ściany.
        this.lineWidths = lineWdts;   // Tylko fillColors jest jednowymiarowa, reszta jest dwuwymiarowa

        this.center = cntr;
        this.vertices = [];
        this.faces = [];
    }

    appendFace(verts, fillClr, lineClrs, lineWdts){
        this.faces.push(
            new Face(verts, 
                     fillClr ?? this.fillColors?.[this.faces.length],
                     lineClrs ?? this.lineColors?.[this.faces.length],
                     lineWdts ?? this.lineWidths?.[this.faces.length]
                    )
        );
    }

    setFillColor(fillClr){ 
        if(!(fillClr instanceof Color || typeof fillClr !== "undefined")) return false;
        this.fillColor = fillClr; 
        return true;
    }
    setLineColor(lineClr){ 
        if(!(lineClr instanceof Color || typeof lineClr !== "undefined")) return false;
        this.lineColor = lineClr; 
        return true;
    }
    setLineWidth(width){ 
        if((typeof width !== "number" && typeof width !== "undefined") || (typeof width === "number" && width < 0)) return false;
        this.lineWidth = width; 
        return true;
    }

    setFillColors(fillClrs, idx){
        if(typeof idx === "undefined"){
            if(typeof fillClrs !== "undefined" && fillClrs.length === 0) return false;
            this.fillColors = fillClrs;
            return true;
        }
        else if(typeof idx !== "number") return false;
            
        if(!(fillClrs instanceof Color)) return false;
        this.fillColors[idx] = fillClrs;
        return true;        
    }
    setLineColors(lineClrs, row, col){
        if(typeof row === "undefined"){
            if(typeof lineClrs !== "undefined" && lineClrs.length === 0) return false;
            this.lineColors = lineClrs;
            return true;
        }
        else if(typeof row !== "number") return false;

        if(typeof col === "undefined"){
            if(typeof lineClrs !== "undefined" && lineClrs.length === 0) return false;
            this.lineColors[row] = lineClrs;
            return true;
        }
        else if(typeof col !== "number") return false;
            
        if(!(lineClrs instanceof Color)) return false;
        this.lineColors[row][col] = lineClrs;
        return true;    
    }
    setLineWidths(lineWdts, row, col){
        if(typeof row === "undefined"){
            if(typeof lineWdts !== "undefined" && lineWdts.length === 0) return false;
            this.lineWidths = lineWdts;
            return true;
        }
        else if(typeof row !== "number") return false;

        if(typeof col === "undefined"){
            if(typeof lineWdts !== "undefined" && lineWdts.length === 0) return false;
            this.lineWidths[row] = lineWdts;
            return true;
        }
        else if(typeof col !== "number") return false;
            
        if(typeof lineWdts !== "number") return false;
        this.lineWidths[row][col] = lineWdts;
        return true; 
    }

    setPrecision(prec){}
};