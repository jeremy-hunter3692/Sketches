import React, { useEffect } from 'react'
import canvasSketch from 'canvas-sketch'
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  playbackRate: 'throttle',
  fps: 12,
}

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI
} //working with degrees instead of radians

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = '#eeeeee'
    context.fillRect(0, 0, width, height)

    context.fillStyle = 'black'

    const cx = width * 0.5 //start drawing points as ratios or % of width
    const cy = height * 0.5 // as above

    const w = width * 0.001 //width as 30% of canvas width
    const h = height * 0.1 //height as above

    let x, y

    // math floor to return whole intergers

    let radius = width * 0.3
    let redRadius = width * 0.3

    outerRings()
    innerRings()
    // if (frame > 50) {
    //   outerRings()
    // }

    function outerRings() {
      let outerRingMaxScale = 4
      let outerRingMinScale = 2
      let numOfSlices = 0

      if (frame > 50) {
        numOfSlices = Math.floor(random.range(400, 1300))
      }
      if (frame > 100) {
        outerRingMaxScale = 8
      }
      if (frame > 350) {
        outerRingMaxScale = 0
      }
      if (frame > 350) {
        outerRingMinScale = 1
        outerRingMaxScale = 0
      }
      if (frame > 450) {
        radius = radius * 0.7
      }

      for (let i = 0; i < numOfSlices; i++) {
        const slice = degToRad(360 / numOfSlices)
        const angle = slice * i

        x = radius * Math.sin(angle)
        y = radius * Math.cos(angle) //math for working out radius or slices circle

        context.save()
        context.translate(cx, cy)
        context.translate(x, y) //moving paper instead of pen
        context.rotate(-angle)
        context.scale(
          random.range(0.1, 1),
          random.range(outerRingMinScale, outerRingMaxScale)
        )

        context.beginPath()
        context.rect(-w * 0.5, -h * 0.5, w, h)
        context.fill()

        context.restore()
      }
    }

    function innerRings() {
      if (frame > 150) {
        redRadius = redRadius * 2
      }
      if (frame > 250) {
        redRadius = redRadius * 1.2
      }
      if (frame > 450) {
        redRadius = redRadius * 1.3
      }
      for (let i = 0; i < 100; i++) {
        const sliceMid = degToRad(360 / 12)
        const angleMid = sliceMid * i

        // xMid = redRadius * Math.sin(angleMid)
        // yMid = redRadius * Math.cos(angleMid) //math for working out radius or slices circle

        context.save()
        context.strokeStyle = 'red'
        context.lineWidth = random.range(0.4, 1.8)
        context.translate(cx, cy) // centre of curve
        context.rotate(angleMid)

        context.beginPath()
        context.arc(
          0,
          0,
          redRadius * random.range(0.3, 0.5),
          sliceMid * random.range(-2, 2),
          sliceMid * random.range(-0.3, 5)
        )
        context.stroke()

        context.restore()
      }
    }
  }
}

const Circles = () => {
  const ref = React.createRef()
  useEffect(() => {
    canvasSketch(sketch, { ...settings, canvas: ref.current })
  }, [ref])
  return <canvas ref={ref} />
}

export default Circles
