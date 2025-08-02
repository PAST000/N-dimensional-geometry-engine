import HyperCuboid from "./Objects/HyperCuboid.js";

export default class Binomial{
    #objects;
    constructor(cntr, n, a, b, fillClrs, lineClrs, lineWdts){
        this.center = cntr;
        this.degree = parseInt(n);
        this.A = parseFloat(a);
        this.B = parseFloat(b);
        this.fillColors = fillClrs;
        this.lineColors = lineClrs;
        this.lineWidths = lineWdts;
        this.#objects = new Array();

        for(let i = 0; i <= this.degree; i++){
            let arr = generatePermutations(this.degree-i, i, this.A, this.B);
            for(let comb of arr)
                this.#objects.push(new HyperCuboid(this.center.toTranslated([...comb].map((x) => (x == this.A ? -this.B/2 : this.A/2))),
                                                   comb, 
                                                   this.fillColors?.[i], 
                                                   this.lineColors?.[i], 
                                                   this.lineWidths?.[i]));
        }
    }

    getObjects(){ return [...this.#objects]; }
}

function generatePermutations(aCount, bCount, a, b) {
    if (aCount === 0 && bCount === 0) return [[]];
    const result = [];

    if (aCount > 0) 
        result.push(...generatePermutations(aCount - 1, bCount, a, b).flatMap(p => [[a, ...p]]));

    if (bCount > 0) 
        result.push(...generatePermutations(aCount, bCount - 1, a, b).flatMap(p => [[b, ...p]]));

  return result;
}