const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1000, 1000],

  animate: true,
  playbackRate: 'throttle',
  fps: 12,
}

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
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.fillStyle = 'black'

    const cx = width * 0.5 //centre of the circle co-ords. i.e half the wight and height of canvas
    const cy = height * 0.5

    const w = width * 0.003 // width and hieght of outer circle lines
    let h = height * 0.1
    let x, y

    const numOfLines = Math.floor(random.range(150, 200)) //math floor because decimals create mistake in slice calculation
    const radius = width * 0.3 //the radius of the circle that the outer lines are drawn
    let radiusChange
    let innerCircleColour = 'black'
    if (frame> 300){
      innerCircleColour = 'white'
      h = height * 0.9
    }

    for (let i = 0; i < numOfLines; i++) {
      //iterateor for drawing the outer lines and more
      //if random is set outside loop the circle will be consisent b/c random is generate once not each loop
      (frame > 50 && frame < 300) 
        ? (radiusChange = random.range(0.2, 0.8))
        : (radiusChange = 0.5)
      const slice = math.degToRad(360 / numOfLines) //size of the slice making them even
      const angle = slice * i //angle of rotation?

      x = cx + radius * Math.sin(angle) //math for moving around a circle
      y = cy + radius * Math.cos(angle)

      context.save()
      context.translate(x, y)
      context.rotate(-angle)
      frame > 450 ? context.scale(3, 1) : ' ' // scales x and y from the center.
      context.beginPath()
      context.rect(-w * 0.5, -h * 0.5, w, h + random.range(1, 150))
      context.fill()
      context.restore()

      context.save()
      context.translate(cx, cy)
      context.rotate(-angle)
    
      context.beginPath()
      context.lineWidth = random.range(0.2, 0.5)
      context.arc(0, 0, radius * radiusChange, 0, slice * 0.5)
      context.strokeStyle = innerCircleColour
      context.stroke()
      context.restore()
    }
  }
}

canvasSketch(sketch, settings)
