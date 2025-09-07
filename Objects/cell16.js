import Figure from "./base/Figure.js";
import HyperVertex from "./base/HyperVertex.js";
import Color from "./base/Color.js";

export default class Cell16 extends Figure{
    constructor(cntr, len, fillClr, lineClr, lineWdt){
        super(cntr, fillClr, lineClr, lineWdt);
        this.length = parseFloat(len);
        this.vertices = [];
        this.faces = [];

        this.generateVertices();
        this.generateFaces();
    }
 
    generateVertices(){
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
        if(this.center.getDim == 2){
            this.appendFace([this.vertices[0,2,3]]);
            this.appendFace([this.vertices[1,2,3]]);
            return;
        }

        let arr = Array(this.center.getDim());
        arr[0] = arr[1] = arr[2] = 1;
        let perms = generatePermutations(arr);

        for(let i = 0; i < perms.length; i++){
            // TODO: od razu generować indeksy
            let idx = [];
            for(let j = 0; j < perms[i].length; j++)
                if(perms[i][j] === 1)
                    idx.push(2*j);

            this.appendFace([this.vertices[idx[0]  ], this.vertices[idx[1]  ], this.vertices[idx[2]  ]]);
            this.appendFace([this.vertices[idx[0]  ], this.vertices[idx[1]  ], this.vertices[idx[2]+1]]);
            this.appendFace([this.vertices[idx[0]  ], this.vertices[idx[1]+1], this.vertices[idx[2]  ]]);
            this.appendFace([this.vertices[idx[0]  ], this.vertices[idx[1]+1], this.vertices[idx[2]+1]]);
            this.appendFace([this.vertices[idx[0]+1], this.vertices[idx[1]  ], this.vertices[idx[2]  ]]);
            this.appendFace([this.vertices[idx[0]+1], this.vertices[idx[1]  ], this.vertices[idx[2]+1]]);
            this.appendFace([this.vertices[idx[0]+1], this.vertices[idx[1]+1], this.vertices[idx[2]  ]]);
            this.appendFace([this.vertices[idx[0]+1], this.vertices[idx[1]+1], this.vertices[idx[2]+1]]);
        }
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