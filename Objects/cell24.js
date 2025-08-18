import Figure from "./base/Figure.js";
import HyperVertex from "./base/HyperVertex.js";

export default class Cell24 extends Figure{
    constructor(cntr, len, fillClr, lineClr, lineWdt){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        this.vertices = [];
        this.faces = [];

        this.generateVertices();
        this.generateFaces();
    }
 
    generateVertices(){
        let arr1 = Array(this.center.getDim());
        arr1[0] = arr1[1] = 1;

        for(let i = 0; i < this.center.getDim(); i++){
            let cords = Array(this.center.getDim());
            for(let j = 0; j < cords.length; j++)
                cords[j] = (i === j ? this.length : 0);
            
            this.vertices.push(new HyperVertex([...cords]));
            cords[i] *= -1;
            this.vertices.push(new HyperVertex([...cords]));
        }
    }
 
    generateFaces(){
        
    }
};

function generatePermutations(nums) {
    const result = [];

    function backtrack(start) {
        if (start === nums.length) {
            result.push([...nums]);
            return;
        }
        const set = new Set();

        for (let i = start; i < nums.length; i++) {
            if (set.has(nums[i])) 
                continue;
            set.add(nums[i]);

            [nums[start], nums[i]] = [nums[i], nums[start]];
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }

    backtrack(0);
    return result;
};