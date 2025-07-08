export default class Face{
    constructor(arr, fillClr, lineClrs, lineWdts){
        if(typeof arr === "undefined" || arr.length == 0)            throw("Vertices array must not be empty.");
        if(typeof fillClr !== "undefined" && fillClr.length === 0) throw("Filling colors must be an array of Colors or left empty.");
        if(typeof lineClrs !== "undefined" && lineClrs.length === 0) throw("Line colors must be an array of Colors or left empty.");
        if(typeof lineWdts !== "undefined" && lineWdts.length === 0) throw("Line widths must be an array of numbers or left empty.");

        this.vertices = arr;
        this.fillColor = fillClr;
        this.lineColors = lineClrs;
        this.lineWidths = lineWdts;
    }

    perspectiveProjection(dimention, camera, direction, scale = 1){
        if(this.vertices.length == 0) return false;
        let projected = [this.vertices[0].perspectiveProjection(dimention, camera, direction, scale)];
        if(projected[0] === false) return false;

        for(let i = 1; i < this.vertices.length; i++)
            projected.push(this.vertices[i].perspectiveProjection(dimention, camera, direction, scale));
        return projected;
    }

    setFillColor(fillClr, id){
        if(typeof id !== "undefined"){
            if(typeof id !== "number" || !(fillClr instanceof Color)) return false;
            this.fillColor[id] = fillClr;
            return true;
        }
    
        if(typeof fillClr !== "undefined" && fillClr.length === 0) return false;
        this.fillColor = fillClr;
        return true;
    }
    setLineColors(lineClrs, id){
        if(typeof id !== "undefined"){
            if(typeof id !== "number" || !(lineClrs instanceof Color)) return false;
            this.lineColors[id] = lineClrs;
            return true;
        }
    
        if(typeof lineClrs !== "undefined" && lineClrs.length === 0) return false;
        this.lineColors = lineClrs;
        return true;
    }
    setLineWidths(lineWdts, id){
        if(typeof id !== "undefined"){
            if(typeof id !== "number" || typeof lineWdts !== "number") return false;
            this.lineWidths[id] = lineWdts;
            return true;
        }
    
        if(typeof lineWdts !== "undefined" && lineWdts.length === 0) return false;
        this.lineWidths = lineWdts;
        return true;
    }
}