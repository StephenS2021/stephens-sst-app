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
const noiseSampleSketch = (p: p5) => {
    let [width, height] = [400, 400]

    let noiseMap: number[][] = [];
    let cols:number; let rows:number; let size:number = 50;
    let xoff:number = 0; let yoff:number = 0;
    let offset:number = 0;
    let inc:number = 0.1;

    p.setup = () => {
        p.createCanvas(width, height);
        p.background(200);
        // cam = p.createCapture(p.VIDEO);
        cols = width/size;
        rows = height/size;

        for( let i = 0; i < cols; i++ ){
            noiseMap[i] = [] // making 2d array
            yoff = 0;
            for( let j = 0; j < rows; j++){ // sample noise and fill arr column by column
                noiseMap[i][j] = p.noise(xoff, yoff);
                yoff += inc;
            }
            xoff += inc;
        }
        
    };

    p.draw = () => {
        p.background(200);
        // p.rectMode(p.CENTER);
        for( let i = 0; i < cols; i++ ){
            for( let j = 0; j < rows; j++){
                p.rect(i*size, j*size, size, size) // making a box at coords i, j of size 50
                p.textAlign(p.CENTER)
                p.text(p.round(noiseMap[i][j], 3), size/2 + i*size, size/2 + j*size) // put text in center (size/2)
            }

        }
    };
};

export default noiseSampleSketch;
