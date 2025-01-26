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
const stripTerrainSketch = (p: p5) => {
    let [width, height] = [1500, 900]
    let cols:number; let rows:number;
    let scl:number = 20; // scale
    let xCamOffset: number;
    let yCamOffset: number;
    let terrain: number[][] = [];

    let xOff:number = 0;
    let yOff:number = 0;
    let flying:number = 0;

    let perlinScale:number = 0.12; // how far apart the noise samples are (basically zooming out)
    let mapScale:number = 130; // the max which the perlin noise can be scaled to by the map function


    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        cols = width / scl;
        rows = height / scl;
        const gridWidth = cols * scl;
        const gridHeight = rows * scl;
        xCamOffset = -(gridWidth / 2); // TODO FIGURE OUT WHAT THSI IS DOING
        yCamOffset = -(gridHeight / 2);


        for( let y = 0; y < rows; y++ ){
            terrain[y] = [];
            xOff = 0;
            for( let x = 0; x < cols; x++){
                terrain[y][x] = p.map(p.noise(xOff, yOff), 0, 1, -mapScale, mapScale);
                xOff += perlinScale;
            }
            yOff += perlinScale;
        }
        
    
    };

    p.draw = () => {
        flying += -0.02;
        yOff = flying
        for( let y = 0; y < rows; y++ ){
            terrain[y] = [];
            xOff = 0;
            for( let x = 0; x < cols; x++){
                terrain[y][x] = p.map(p.noise(xOff, yOff), 0, 1, -mapScale, mapScale);
                xOff += perlinScale;
            }
            yOff += perlinScale;
        }
        p.background(200);
        
        p.push();
        p.rotateX(p.PI/3 + 0.25)
        p.translate(xCamOffset, yCamOffset+150);

        p.specularMaterial(255,10,150)
        p.stroke(255);
        p.fill(0)
        
        for( let y = 0; y < rows-1; y++ ){
            p.beginShape(p.TRIANGLE_STRIP);
            for( let x = 0; x < cols; x++){
                // p.rect(i*scl, j*scl, scl, scl);
                p.vertex(x*scl, y*scl, terrain[y][x]);
                p.vertex(x*scl, (y+1)*scl, terrain[y+1][x]);

            }
            p.endShape();
        }
        p.pop();

    };
};

export default stripTerrainSketch;
