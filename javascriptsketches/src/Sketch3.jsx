import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1000, 1000],

  animate: true,
  playbackRate: 'throttle',
  fps: 12,
}

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    // console.log(frame)
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
    if (frame > 400) {
      innerCircleColour = 'white'
      h = height * 0.9
    }
    if (frame > 250) {
      innerCircleColour = 'black'
    }

    for (let i = 0; i < numOfLines; i++) {
      //iterateor for drawing the outer lines and more
      //if random is set outside loop the circle will be consisent b/c random is generate once not each loop
      frame > 50 && frame < 150
        ? (radiusChange = random.range(0.2, 0.8))
        : (radiusChange = 0.5)
      const slice = math.degToRad(360 / numOfLines) //size of the slice making them even
      const angle = slice * i //angle of rotation?

      x = cx + radius * Math.sin(angle) //math for moving around a circle
      y = cy + radius * Math.cos(angle)

      context.save()
      context.translate(x, y)
      context.rotate(-angle)
      if (frame > 250) {
        context.scale(3, 1)
      } // scales x and y from the center.

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

const Sketch3 = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Sketch3
