export default class HyperVertex{
    constructor(arr){
        if(!Array.isArray(arr) || arr.length < 3) throw "Incorrect coordinates";
        this.cords = arr;
        this.calcLength();
    }

    project(dim, camera = null, direction = null, scale = 1){ 
        if(camera !== null && direction !== null) return this.perspectiveProjection(dim, camera, direction);
        if(typeof dim !== "number" || dim < 1 || isNaN(dim)) return false;

        let arr = this.cords.slice(0, dim);
        if(scale !== 1)
            for(let i = 0; i < arr.length; i++)
                arr[i] *= scale;

        if(dim < 3)                  return arr;
        if(dim <= this.cords.length) return new HyperVertex(arr);
        for(let i = 0; i < dim - this.cords.length; i++)
            arr.push(0);
        return new HyperVertex(arr);
    }

    perspectiveProjection(dim, camera, direction, k = 1){
        if(!(camera instanceof HyperVertex) || !(direction instanceof HyperVertex)) return false;
        if(typeof k !== "number" || k == 0) return false;

        let v = this.toSubtracted(camera);
        let scale = k/(direction.dot(v));
        if(!(v instanceof HyperVertex) || typeof scale !== "number") return false;

        let arr = v.cords.slice(0, dim);
        for(let i = 0; i < arr.length; i++)
            arr[i] *= scale;

        if(dim < 3)                  return arr;
        if(dim <= this.cords.length) return new HyperVertex(arr);
        for(let i = 0; i < dim - this.cords.length; i++)
            arr.push(0);
        return new HyperVertex(arr);
    }

    dot(other){ 
        if(!(other instanceof HyperVertex) || other.getDim() < this.cords.length) return false;
        let product = 0;
        let otherArr = other.getCords();
        for(let i = 0; i < this.cords.length; i++){
            if(typeof otherArr[i] !== "number") return false;
            product += this.cords[i]*otherArr[i];
        }
        return product;
    }

    translate(arr){
        if(arr.length > this.cords.length) return false;
        let oldCords = this.cords;

        for(let i = 0; i < arr.length; i++){
            if(typeof arr[i] !== "number"){
                this.cords = oldCords;
                return false;
            }
            this.cords[i] += arr[i];
        }
        this.calcLength();
        return true;
    }

    scale(k){
        if(k === 0 || typeof k !== "number") return false;
        for(let i = 0; i < this.cords.length; i++)
            this.cords[i] *= k;
        this.calcLength();
        return true;
    }

    // Obrót o deg stopni w płaszczyźnie tworzonej przez osi o numerach(!) ax1,ax2 
    rotate(ax1, ax2, deg){
        if(typeof(ax1) !== "number" || typeof(ax2) !== "number") return false;
        let axis1 = parseInt(ax1);
        let axis2 = parseInt(ax2);

        if(axis1 < 0 || axis1 >= this.cords.length || axis2 < 0 || axis2 >= this.cords.length || isNaN(axis1) || isNaN(axis2) || axis1 === axis2) return false;
        if(axis1 > axis2) return this.rotate(axis2, axis1, deg);
        if(this.cords.length <= 3)
	    return this.rotate3D([(axis1 !== 0 ? 1 : 0), 
				              ((axis1 === 0 && axis2 === 2) ? 1 : 0), 
				              ((axis1 === 0 && axis2 === 1) ? 1 : 0)], 
				              deg);

        let xl = this.cords[axis1];
        this.cords[axis1] = xl*Math.cos(deg) - this.cords[axis2]*Math.sin(deg);
        this.cords[axis2] = xl*Math.sin(deg) + this.cords[axis2]*Math.cos(deg);
        return true;
    }

    // Obrót wokół osi ax o deg stopni
    rotate3D(ax, deg){
        if(typeof deg !== "number" || isNaN(deg) || !Array.isArray(ax) || ax.length < 3 || 
           typeof ax[0] !== "number" || isNaN(ax[0]) || typeof ax[1] !== "number" || isNaN(ax[1]) || typeof ax[2] !== "number" || isNaN(ax[2])) return false;
        let S = Math.sin(deg);
        let C = Math.cos(deg);
        let denom = Math.sqrt(ax[0]**2 + ax[1]**2 + ax[2]**2);
        let a = ax[0]*ax[0]/denom;
        let b = ax[1]*ax[1]/denom;
        let c = ax[2]*ax[2]/denom;
        let x = this.cords[0];
        let y = this.cords[1];
        let z = this.cords[2];
        let S2 = S*S;
        let SC2 = 2*S*C;
        this.cords[0] = x + S2*(x*(a*a - b*b - c*c - 1) + 2*a*(b*y + c*z)) + SC2*(b*z - c*y);
        this.cords[1] = y + S2*(y*(b*b - a*a - c*c - 1) + 2*b*(a*x + c*z)) + SC2*(c*x - a*z);
        this.cords[2] = z + S2*(z*(c*c - b*b - a*a - 1) + 2*c*(a*x + b*y)) + SC2*(a*y - b*x);
        return true;
    }

    add(other){
        if(!(other instanceof HyperVertex)) return false;
        for(let i = 0; i < other.getDim() && i < this.cords.length; i++)
            this.cords[i] += other.getCord(i);
        for(let i = this.cords.length; i < other.getDim(); i++)
            this.cords.push(other.getCord(i));
        this.calcLength();
        return true;
    }

    subtract(other){
        if(!(other instanceof HyperVertex)) return false;
        for(let i = 0; i < other.getDim() && i < this.cords.length; i++)
            this.cords[i] -= other.getCord(i);
        for(let i = this.cords.length; i < other.getDim(); i++)
            this.cords.push(-other.getCord(i));
        this.calcLength();
        return true;
    }

    toTranslated(arr){
        let vert = new HyperVertex([...this.cords]);
        if(vert.translate(arr) === false) return false;
        return vert;
    }
    toScaled(k){
        let vert = new HyperVertex([...this.cords]);
        if(vert.scale(k) === false) return false;
        return vert
    }
    toRotated(ax1, ax2, deg){
        let vert = new HyperVertex([...this.cords]);
        if(vert.rotate(ax1, ax2, deg) === false) return false;
        return vert;
    }
    toAdded(other){
        let vert = new HyperVertex([...this.cords]);
        if(vert.add(other) === false) return false;
        return vert;
    }
    toSubtracted(other){
        let vert = new HyperVertex([...this.cords]);
        if(vert.subtract(other) === false) return false;
        return vert;
    }

    calcLength(){
        this.length = 0;
        for(let i = 0; i < this.cords.length; i++)
            this.length += this.cords[i]*this.cords[i];
        this.length = Math.pow(this.length, 1/2);
        return this.length;
    }

    getCord(id){ 
        if(typeof this.cords[id] === "undefined") return false;
        return this.cords[id];
    }
    getCords(){ return [...this.cords]; }
    getLength(){ return this.length; }
    getDim(){ return this.cords.length; }
};