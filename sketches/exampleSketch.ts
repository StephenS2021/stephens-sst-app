"use client";
import * as p5 from "p5";


let cam: p5.MediaElement;

/* 
 function that takes a p5 object with which it draws on the canvas
    this function is not ever explicitly called in the code
    it runs from P5Wrapper.tsx when we create a new p5 instance
    `const instance = new p5(sketch, canvasRef.current);`
    the library automatically injects the `sketch` function with the p5 object required
*/
const exampleSketch = (p: p5) => {
    let [width, height] = [400, 400]
    let angle = 0;

    p.setup = () => {
        p.createCanvas(width, height, p.WEBGL);
        p.background(200);
        // cam = p.createCapture(p.VIDEO);
    };

    p.draw = () => {
        p.background(200);
        p.rectMode(p.CENTER);
        // p.fill(0, 0, 255);

        // let dx = p.mouseX - width/2;
        // let dy = p.mouseY - height/2;
        // let v = p.createVector(dx, dy, 0);
        // let v_directional = p.createVector(-dx, -dy, 1);
        // p.pointLight(255, 255, 255, v) // point light which follows the mouse
        // p.directionalLight(0, 255, 255, v_directional);


        // v_directional.normalize();

        // let fov = p.PI / 3;
        // let cameraZ = (height / 2) / p.tan(fov / 2);
        // p.perspective(fov, width / height, cameraZ / 10, cameraZ * 10 )

        let rotationAngle = p.map(p.mouseX, 0, width, -p.PI, p.PI)
        // Set camera position to rotate around the box
        let radius = 800; // distance from the center of the scene
        let camX = radius * p.cos(rotationAngle);
        let camZ = radius * p.sin(rotationAngle);
        let camY = 0; // keep the camera at the same height

        // Update camera position and orientation
        p.camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);


        
        p.ambientLight(150);


        // p.pointLight(0, 0, 255, -200, 0, 0);
        // p.pointLight(255, 0, 0, 200, 0, 0);

        // p.translate(p.mouseX - width/2, 0, p.mouseY - height/2);

        p.push(); // save drawing style and transformations
        // p.specularMaterial(255);
        p.normalMaterial()

        p.rotateX(angle);
        p.rotateY(angle * 0.3);
        p.rotateZ(angle * 0.2);
        p.noStroke();
        // p.texture(cam)

        p.box(100, 100, 100);
        p.pop() // restore default settings (won't rotate anything after)
        
        // p.specularMaterial(255)
        p.normalMaterial()
        p.noStroke()
        p.translate(0, 150)
        p.rotateX(p.HALF_PI) // rotate to make a floor looking plane
        p.plane(320, 240)
        angle += 0.01;

    };
};

export default exampleSketch;
