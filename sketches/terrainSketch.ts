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
const terrainSketch = (p: p5) => {
    let [width, height] = [800, 800]

    let noiseMap: number[][] = [];
    let cols:number = 40; let rows:number = 40; let size:number = 10;
    let xoff:number = 0; let yoff:number = 0; let zoff:number = 0;
    let inc:number = 0.1;
    let xDim = cols * size;
    let yDim = rows * size;

    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.angleMode(p.DEGREES)
        p.rectMode(p.CENTER)
    };

    p.draw = () => {
        p.background(200);
        let x = p.map(p.mouseY, 0, width, 0, 360)
        let y = p.map(p.mouseX, 0, height, 0, 360)

        p.rotateX(x);
        p.rotateY(y);

        // p.noFill()

        xoff = 0;
        for( let i = 0; i < cols; i++ ){
            noiseMap[i] = [] // making 2d array
            yoff = 0;
            for( let j = 0; j < rows; j++){ // sample noise and fill arr column by column
                noiseMap[i][j] = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, 100); // mapping noise from 0-1 => 0-100
                yoff += inc;

                p.fill(76, 187, 23);

                p.push();
                p.translate(i*size - xDim/2, noiseMap[i][j], j*size - yDim/2); // translate boxes to the center and adjust height by the sampled noise to move up and down
                p.box(size, 100, size);
                p.pop()

            }
            xoff += inc;
            zoff += 0.0001;
        }

    };
};

export default terrainSketch;
