"use client";
import { Size } from "aws-cdk-lib/core";
import * as p5 from "p5";
import { off } from "process";


// let cam: p5.MediaElement;

/* 
 function that takes a p5 object with which it draws on the canvas
    this function is not ever explicitly called in the code
    it runs from P5Wrapper.tsx when we create a new p5 instance
    `const instance = new p5(sketch, canvasRef.current);`
    the library automatically injects the `sketch` function with the p5 object required
*/
const discoSketch = (p: p5) => {
    let [width, height] = [400, 400]

    let noiseMap: number[][] = [];
    let cols:number; let rows:number; let size:number = 10;
    let xoff:number = 0; let yoff:number = 0; let zoff:number = 0;
    let offset:number = 0;
    let inc:number = 0.1; // 

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(200);
        p.rectMode(p.CENTER)
        // cam = p.createCapture(p.VIDEO);
        cols = width/size;
        rows = height/size;
        
        p.fill(0);
        p.noStroke();
        
    };

    p.draw = () => {
        p.background(200);
        p.rectMode(p.CENTER);
        xoff = 0;
        for( let i = 0; i < cols; i++ ){
            noiseMap[i] = [] // making 2d array
            yoff = 0;
            for( let j = 0; j < rows; j++){ // sample noise and fill arr column by column
                noiseMap[i][j] = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, size);
                yoff += inc;
                
                p.rect(size/2 + i*size, size/2 + j*size, noiseMap[i][j], noiseMap[i][j]) // making a box at coords i, j of size 50
            }
            xoff += inc;
            zoff += 0.0005;
        }

    };
};

export default discoSketch;
