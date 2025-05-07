export default class HyperVertex{
    constructor(arr){
        if(!Array.isArray(arr) || arr.length < 3) throw "Incorrect coordinates";
        this.cords = arr;
        this.dims = arr.length;

        for(let i = 0; i < this.dims; i++)
            this.length += this.cords[i]*this.cords[i];
        this.length = Math.pow(this.length, 1/this.dims);
    }

    project(dim){ 
        if(typeof dim !== "number" || dim < 1 || isNaN(dim)) return false;
        if(dim < 3) return this.cords.slice(0, dim);
        if(dim <= this.dims) return new HyperVertex(this.cords.slice(0, dim));
        return new HyperVertex(this.cords.concat(new Array(dim - this.dims).fill(0)));
    }
    
    dot(other){ 
        if(!other instanceof HyperVertex) return false;
        if(other.getLength() < this.dims) return false;

        let product = 0;
        let otherArr = other.getCords();

        for(let i = 0; i < this.dims; i++){
            if(typeof otherArr[i] !== "number") return false;
            product += this.arr[i]*otherArr[i];
        }
        return product;
    }

    translate(arr, getNew = false){
        if(arr.length > this.dims) return false;

        if(getNew){
            let translatedCords = this.cords;
            for(let i = 0; i < arr.length; i++){
                if(typeof arr[i] !== "number")
                    return false;
                translatedCords[i] += arr[i];
            }
            return new HyperVertex(translatedCords);
        }

        let oldCords = this.cords;
        for(let i = 0; i < arr.length; i++){
            if(typeof arr[i] !== "number"){
                this.cords = oldCords;
                return false;
            }
            this.cords[i] += arr[i];
        }
        return true;
    }

    // Obrót o deg stopni w płaszczyźnie tworzonej przez osi o numerach(!) ax1,ax2
    // Jeśli obrót trójwymiarowy to ax1 jest osią (a nie numerem) obrotu 
    rotate(deg, ax1, ax2){
        if(typeof(ax1) !== "number" || typeof(ax2) !== "number") return false;
        let axis1 = parseInt(ax1);
        let axis2 = parseInt(ax2);
        if(axis1 < 0 || axis1 >= this.dims || axis2 < 0 || axis2 >= this.dims || isNaN(axis1) || isNaN(axis2) || axis1 === axis2) return false;
        if(axis1 > axis2) return this.rotate(deg, axis2, axis1);
        if(this.dims <= 3) return this.rotate3D(deg, axis1);

        let xl = this.cords[axis1];
        this.cords[axis1] = xl*Math.cos(deg) - this.cords[axis2]*Math.sin(deg);
        this.cords[axis2] = xl*Math.sin(deg) + this.cords[axis2]*Math.cos(deg);
        return true;
    }

    // Obrót wokół osi ax o deg stopni
    rotate3D(deg, ax){
        if(!is_numeric(deg) || !Array.isArray(ax) || ax.length < 3 || !is_numeric(ax[0]) || !is_numeric(ax[1]) || !is_numeric(ax[2])) return false;

        let S = Math.sin(deg);
        let C = Math.cos(deg);
        let a = ax[0]*ax[0]/Math.sqrt(ax[0]*ax[0] + ax[1]*ax[1] + ax[2]*ax[2]);
        let b = ax[1]*ax[1]/Math.sqrt(ax[0]*ax[0] + ax[1]*ax[1] + ax[2]*ax[2]);
        let c = ax[2]*ax[2]/Math.sqrt(ax[0]*ax[0] + ax[1]*ax[1] + ax[2]*ax[2]);
        let x = this.cords[0];
        let y = this.cords[1];
        let z = this.cords[2];
        let S2 = S*S;
        let SC2 = 2*S*C; 

        this.cords[0] = x + S2*(x*(a*a - b*b - c*c - 1) + 2*a*(b*y + c*z)) + SC2*(b*z - c*y);
        this.cords[1] = y + S2*(y*(b*b - a*a - c*c - 1) + 2*b*(a*x + c*z)) + SC2*(c*x - a*z);
        this.cords[2] = z + S2*(z*(c*c - b*b - a*a - 1) + 2*c*(a*x + b*y)) + SC2*(a*y - b*x);
    }

    getCord(id){ 
        if(id < 0 || id >= this.dims) return false;
        return this.arr[id];
    }
    getCords(){ return this.arr; }
    getLength(){ return this.length; }
};