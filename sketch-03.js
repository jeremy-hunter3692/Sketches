const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [ 1000, 1000 ],

  animate: true,
  playbackRate: "throttle",
  fps: 4



};

/*onst degToRad = (degrees) => {
  return degrees /180 * Math.PI;

  };


const randomLimits = (max, min) =>{
  return Math.random() * (max -min +1) + min;
}

*/

//let randomLimitsOutput = randomLimits(2,5);
//console.log(randomLimitsOutput);


//const rOne = random.range(0.01,1); //random numbers for animating the middle scale
//const rTwo = random.range(0,2);


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;    //centre of the circle co-ords. i.e half the wight and height of canvas
    const cy = height * 0.5;

    const w = width * 0.01;   // width and hieght of outer circle lines
    const h = height * 0.1;
    let x, y;  

    const numOfLines =  12//Math.floor(random.range(12,40));//math floor because decimals create mistake in slice calculation
    const radius = width * 0.3; //the radius of the circle that the outer lines are drawn


    for (let i = 0; i < numOfLines; i++){  //iterateor for drawing the outer lines and more

      const slice = math.degToRad(360 / numOfLines); //size of the slice making them even
      const angle = slice * i; //angle of rotation? 

      x = cx + radius * Math.sin(angle);  //math for moving around a circle 
      y = cy + radius * Math.cos(angle);

      
      context.save();
       
        context.translate(x, y); 
        context.rotate(-angle);
        //context.scale(3, 1);  // scales x and y from the center. 

        context.beginPath();
        context.rect(-w * 0.5, -h * 0.5, w, h + random.range(1,150));
        context.fill();
      context.restore();


      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = 5//random.range(1,2);

      context.beginPath();
      context.arc(0, 0, radius * 0.5, 0 , slice  * 0.6);
      context.stroke();
      context.restore();
      
      
    };
    

  };
};

canvasSketch(sketch, settings);
